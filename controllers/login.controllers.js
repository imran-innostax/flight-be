const { logToDatabase } = require('../helpers')
const RabbitMQClient = require('../rabbitmq/client')

const login = async (req, res, next) => {
	try {
		const request_6fcb89b5_9c39_45c9_9a0f_875e5db8798e = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const IdPAuthentication_162243d9_ca76_485c_93b7_f3bae715e577 = {
			input: request_6fcb89b5_9c39_45c9_9a0f_875e5db8798e,
			params: request_6fcb89b5_9c39_45c9_9a0f_875e5db8798e,
			secrets: process.env,
		}

		const request_162243d9_ca76_485c_93b7_f3bae715e577 =
			IdPAuthentication_162243d9_ca76_485c_93b7_f3bae715e577.input

		const messageData_162243d9_ca76_485c_93b7_f3bae715e577 = {
			service: 'login',
			authTable: 'Users',
			externalDBUrl: process.env.DATABASE_URL,
			headers: request_162243d9_ca76_485c_93b7_f3bae715e577.headers,
			body: request_162243d9_ca76_485c_93b7_f3bae715e577.body,
		}

		const idp_queue_162243d9_ca76_485c_93b7_f3bae715e577 =
			process.env.RABBITMQ_IDP_QUEUE
		const output_162243d9_ca76_485c_93b7_f3bae715e577 =
			await RabbitMQClient.produce({
				data: messageData_162243d9_ca76_485c_93b7_f3bae715e577,
				queueName: idp_queue_162243d9_ca76_485c_93b7_f3bae715e577,
			})
		if (output_162243d9_ca76_485c_93b7_f3bae715e577.response.error)
			throw (
				output_162243d9_ca76_485c_93b7_f3bae715e577.response.error ||
				'Server Error.'
			)
		const ReturnSuccessResponse_5c5df1e9_a394_4833_848f_e67f839bc549 = {
			output: output_162243d9_ca76_485c_93b7_f3bae715e577,
			params: request_6fcb89b5_9c39_45c9_9a0f_875e5db8798e,
			secrets: process.env,
		}
		const updatedReturnSuccessResponse = {
			...ReturnSuccessResponse_5c5df1e9_a394_4833_848f_e67f839bc549,
		}
		delete updatedReturnSuccessResponse.params
		delete updatedReturnSuccessResponse.secrets

		if (Object.keys(updatedReturnSuccessResponse).length) {
			await logToDatabase(corelationId, 'Response', url, {
				status: 200,
				data: updatedReturnSuccessResponse,
			})
			return res.json(updatedReturnSuccessResponse)
		} else return res.json('successfully run')
	} catch (error) {
		const ReturnErrorResponse_01287c0b_1982_403e_964a_d3a248877386 = {}
		const createErrorData_01287c0b_1982_403e_964a_d3a248877386 =
			ReturnErrorResponse_01287c0b_1982_403e_964a_d3a248877386
		delete createErrorData_01287c0b_1982_403e_964a_d3a248877386.params
		delete createErrorData_01287c0b_1982_403e_964a_d3a248877386.secrets
		return res
			.status(400)
			.json(
				Object.keys(createErrorData_01287c0b_1982_403e_964a_d3a248877386).length
					? createErrorData_01287c0b_1982_403e_964a_d3a248877386
					: error
			)
	}
}

module.exports = {
	login,
}
