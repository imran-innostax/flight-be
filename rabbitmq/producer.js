const { randomUUID } = require('crypto')

class Producer {
	constructor(channel, replyQueueName, eventEmitter) {
		this.channel = channel
		this.replyQueueName = replyQueueName
		this.eventEmitter = eventEmitter
	}
	async produceMessages({ data, queueName }) {
		const uuid = randomUUID()
		try {
			this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
				replyTo: this.replyQueueName,
				correlationId: uuid,
				expiration: 1000,
			})

			return new Promise((resolve, reject) => {
				const timeoutId = setTimeout(() => {
					const error = new Error()
					error.statusCode = 502
					error.message = `Message delivery to queue "${queueName}" timed out`
					reject(error)
				}, 10000)

				this.eventEmitter.once(uuid, (value) => {
					clearTimeout(timeoutId)
					const reply = JSON.parse(value.content.toString())
					resolve(reply)
				})
			})
		} catch (error) {
			await this.connection.close()
			console.error(
				`Error sending message to queue "${queueName}":`,
				error.message
			)
			return new Error({ error: { statusCode: 404, message: error.message } })
		}
	}
}

module.exports = Producer
