const { logToDatabase } = require('../helpers')
const RabbitMQClient = require('../rabbitmq/client')

const signup = async (req, res, next) => {
	try {
		const request_6fcb89b5_9c39_45c9_9a0f_875e5db8798e = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const IdPAuthentication_0b53692d_41d1_478e_a1ea_b1c4fbd3ef2f = {
			input: request_6fcb89b5_9c39_45c9_9a0f_875e5db8798e,
			params: request_6fcb89b5_9c39_45c9_9a0f_875e5db8798e,
			secrets: process.env,
		}

		const request_0b53692d_41d1_478e_a1ea_b1c4fbd3ef2f =
			IdPAuthentication_0b53692d_41d1_478e_a1ea_b1c4fbd3ef2f.input

		const messageData_0b53692d_41d1_478e_a1ea_b1c4fbd3ef2f = {
			service: 'signup',
			authTable: 'Users',
			externalDBUrl: process.env.DATABASE_URL,
			headers: request_0b53692d_41d1_478e_a1ea_b1c4fbd3ef2f.headers,
			body: request_0b53692d_41d1_478e_a1ea_b1c4fbd3ef2f.body,
		}

		const idp_queue_0b53692d_41d1_478e_a1ea_b1c4fbd3ef2f =
			process.env.RABBITMQ_IDP_QUEUE
		const output_0b53692d_41d1_478e_a1ea_b1c4fbd3ef2f =
			await RabbitMQClient.produce({
				data: messageData_0b53692d_41d1_478e_a1ea_b1c4fbd3ef2f,
				queueName: idp_queue_0b53692d_41d1_478e_a1ea_b1c4fbd3ef2f,
			})
		if (output_0b53692d_41d1_478e_a1ea_b1c4fbd3ef2f.response.error)
			throw (
				output_0b53692d_41d1_478e_a1ea_b1c4fbd3ef2f.response.error ||
				'Server Error.'
			)
		const ReturnSuccessResponse_19395d5d_6c44_44ef_8743_e1babe5cf81e = {
			output: output_0b53692d_41d1_478e_a1ea_b1c4fbd3ef2f,
			params: request_6fcb89b5_9c39_45c9_9a0f_875e5db8798e,
			secrets: process.env,
		}
		const updatedReturnSuccessResponse = {
			...ReturnSuccessResponse_19395d5d_6c44_44ef_8743_e1babe5cf81e,
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
		const ReturnErrorResponse_e0f118c6_31de_42f0_b710_9298f4b69c6f = {}
		const createErrorData_e0f118c6_31de_42f0_b710_9298f4b69c6f =
			ReturnErrorResponse_e0f118c6_31de_42f0_b710_9298f4b69c6f
		delete createErrorData_e0f118c6_31de_42f0_b710_9298f4b69c6f.params
		delete createErrorData_e0f118c6_31de_42f0_b710_9298f4b69c6f.secrets
		return res
			.status(400)
			.json(
				Object.keys(createErrorData_e0f118c6_31de_42f0_b710_9298f4b69c6f).length
					? createErrorData_e0f118c6_31de_42f0_b710_9298f4b69c6f
					: error
			)
	}
}

module.exports = {
	signup,
}
