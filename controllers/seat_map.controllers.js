const { logToDatabase } = require('../helpers')
const axios = require('axios')

const seatmap = async (req, res, next) => {
	try {
		const request_67a2590e_357d_4282_b52f_3320dd67667d = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const GetRecordValue_cf73cc3f_9a3b_4864_95c3_0ba3319c0d8b = {
			input: request_67a2590e_357d_4282_b52f_3320dd67667d,
			params: request_67a2590e_357d_4282_b52f_3320dd67667d,
			secrets: process.env,
		}
		const pickedValue_cf73cc3f_9a3b_4864_95c3_0ba3319c0d8b =
			GetRecordValue_cf73cc3f_9a3b_4864_95c3_0ba3319c0d8b.input.body
		const CallRESTAPIEndpoint_9fea2b0e_cbee_40cd_a3a0_9f6fd74fc02c = {
			input: request_67a2590e_357d_4282_b52f_3320dd67667d,
			params: request_67a2590e_357d_4282_b52f_3320dd67667d,
			secrets: process.env,
		}

		const params_9fea2b0e_cbee_40cd_a3a0_9f6fd74fc02c = new URLSearchParams()
		params_9fea2b0e_cbee_40cd_a3a0_9f6fd74fc02c.append(
			`client_secret`,
			`${CallRESTAPIEndpoint_9fea2b0e_cbee_40cd_a3a0_9f6fd74fc02c.secrets.AMADEUS_CLIENT_SECRET}`
		)
		params_9fea2b0e_cbee_40cd_a3a0_9f6fd74fc02c.append(
			`grant_type`,
			`${CallRESTAPIEndpoint_9fea2b0e_cbee_40cd_a3a0_9f6fd74fc02c.secrets.AMADEUS_GRANT_TYPE}`
		)
		params_9fea2b0e_cbee_40cd_a3a0_9f6fd74fc02c.append(
			`client_id`,
			`${CallRESTAPIEndpoint_9fea2b0e_cbee_40cd_a3a0_9f6fd74fc02c.secrets.AMADEUS_CLIENT_ID}`
		)

		let output_9fea2b0e_cbee_40cd_a3a0_9f6fd74fc02c
		try {
			output_9fea2b0e_cbee_40cd_a3a0_9f6fd74fc02c = await axios
				.post(
					`${CallRESTAPIEndpoint_9fea2b0e_cbee_40cd_a3a0_9f6fd74fc02c.secrets.AMADEUS_API_BASE_URL}/v1/security/oauth2/token?`,
					params_9fea2b0e_cbee_40cd_a3a0_9f6fd74fc02c,
					{ headers: {} }
				)
				.then(async (res) => {
					await logToDatabase(corelationId, 'Request', url, res)
					await logToDatabase(corelationId, 'Response', url, res)
					return res.data
				})
		} catch (error) {
			const { status, data } = error?.response
			await logToDatabase(corelationId, 'Error', url, error)
			return res.status(status).json(data)
		}
		const CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352 = {
			inputBody: pickedValue_cf73cc3f_9a3b_4864_95c3_0ba3319c0d8b,
			params: request_67a2590e_357d_4282_b52f_3320dd67667d,
			secrets: process.env,
			input: output_9fea2b0e_cbee_40cd_a3a0_9f6fd74fc02c,
		}

		let output_16cbc054_b21a_4bc4_9a99_c9237f68a352
		try {
			output_16cbc054_b21a_4bc4_9a99_c9237f68a352 = await axios
				.post(
					`${CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.secrets.AMADEUS_API_BASE_URL}/v1/shopping/seatmaps?`,
					CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.inputBody,
					{
						headers: {
							Authorization: `Bearer ${CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.input.access_token}`,
						},
					}
				)
				.then(async (res) => {
					await logToDatabase(corelationId, 'Request', url, res)
					await logToDatabase(corelationId, 'Response', url, res)
					return res.data
				})
		} catch (error) {
			const { status, data } = error?.response
			await logToDatabase(corelationId, 'Error', url, error)
			return res.status(status).json(data)
		}
		const ReturnSuccessResponse_d1fa7c37_108d_4ba8_8bd1_13c1abe53db2 = {
			output: output_16cbc054_b21a_4bc4_9a99_c9237f68a352,
			params: request_67a2590e_357d_4282_b52f_3320dd67667d,
			secrets: process.env,
		}
		const updatedReturnSuccessResponse = {
			...ReturnSuccessResponse_d1fa7c37_108d_4ba8_8bd1_13c1abe53db2,
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
		const ReturnErrorResponse_a968598f_0e4a_44c9_8de3_c5af4a9e22ec = {}
		const createErrorData_a968598f_0e4a_44c9_8de3_c5af4a9e22ec =
			ReturnErrorResponse_a968598f_0e4a_44c9_8de3_c5af4a9e22ec
		delete createErrorData_a968598f_0e4a_44c9_8de3_c5af4a9e22ec.params
		delete createErrorData_a968598f_0e4a_44c9_8de3_c5af4a9e22ec.secrets
		return res
			.status(400)
			.json(
				Object.keys(createErrorData_a968598f_0e4a_44c9_8de3_c5af4a9e22ec).length
					? createErrorData_a968598f_0e4a_44c9_8de3_c5af4a9e22ec
					: error
			)
	}
}

module.exports = {
	seatmap,
}
