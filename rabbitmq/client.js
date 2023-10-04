const { connect } = require('amqplib')
const EventEmitter = require('events')
const Consumer = require('./consumer')
const Producer = require('./producer')
const serverUrl = process.env.RABBITMQ_SERVER

class RabbitMQClient {
	constructor() {
		this.isInitialized = false
		this.replyQueueName = ''
		this.eventEmitter = new EventEmitter()
		this.channel = null
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new RabbitMQClient()
		}
		return this.instance
	}

	async initialize() {
		if (this.isInitialized) {
			return
		}
		try {
			this.connection = await connect(serverUrl)
			this.channel = await this.connection.createChannel()
			const { queue: replyQueueName } = await this.channel.assertQueue('', {
				durable: false,
				autoDelete: true,
			})
			this.replyQueueName = replyQueueName
			this.producer = new Producer(
				this.channel,
				replyQueueName,
				this.eventEmitter
			)
			this.consumer = new Consumer(
				this.channel,
				replyQueueName,
				this.eventEmitter
			)
			this.consumer.consumeMessages()
			this.isInitialized = true
			this.connection.on('error', (error) => {
				this.initialize()
				console.error('RabbitMQ connection error:', error.message)
			})
		} catch (error) {
			console.error('rabbitmq error during initialization...', error)
			return new Error({ error: { statusCode: 503, message: error.message } })
		}
	}

	async produce(data) {
		if (!this.isInitialized) {
			await this.initialize()
		}
		return await this.producer.produceMessages(data)
	}
}

module.exports = RabbitMQClient.getInstance()
