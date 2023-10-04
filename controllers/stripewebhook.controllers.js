const { logToDatabase } = require('../helpers')
const prismaClient = require('../prismaClient')
const { prisma } = prismaClient
const axios = require('axios')

const stripe = async (req, res, next) => {
	try {
		const request_714664b2_a821_405c_aad7_d318814d9c5a = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const ifTrue_4ab81b8f_7489_4dc9_9c56_a2b07b522c52 = {
			input: request_714664b2_a821_405c_aad7_d318814d9c5a,
			params: request_714664b2_a821_405c_aad7_d318814d9c5a,
			secrets: process.env,
		}
		if (
			ifTrue_4ab81b8f_7489_4dc9_9c56_a2b07b522c52.input.body.type ===
			'checkout.session.completed'
		) {
			const UpdateRecordFieldsbyId_c287df5d_0310_4f2f_ab5c_411ebc1d0d20 = {
				input: ifTrue_4ab81b8f_7489_4dc9_9c56_a2b07b522c52,
				params: request_714664b2_a821_405c_aad7_d318814d9c5a,
				secrets: process.env,
			}
			const updated_c287df5d_0310_4f2f_ab5c_411ebc1d0d20 =
				await prisma.Booking.update({
					where: {
						id: UpdateRecordFieldsbyId_c287df5d_0310_4f2f_ab5c_411ebc1d0d20
							.input.input.body.data.object.metadata.bookingId,
					},
					data: {
						paymentIntentId: `${UpdateRecordFieldsbyId_c287df5d_0310_4f2f_ab5c_411ebc1d0d20.input.input.body.data.object.payment_intent}`,
						paymentStatus: `SUCCEEDED`,
					},
				})
			const CallRESTAPIEndpoint_ab86b0c7_ea4d_4cf5_8908_06ec2dec2391 = {
				input: updated_c287df5d_0310_4f2f_ab5c_411ebc1d0d20,
				params: request_714664b2_a821_405c_aad7_d318814d9c5a,
				secrets: process.env,
			}

			const params_ab86b0c7_ea4d_4cf5_8908_06ec2dec2391 = new URLSearchParams()
			params_ab86b0c7_ea4d_4cf5_8908_06ec2dec2391.append(
				`id`,
				`${CallRESTAPIEndpoint_ab86b0c7_ea4d_4cf5_8908_06ec2dec2391.input.id}`
			)

			let output_ab86b0c7_ea4d_4cf5_8908_06ec2dec2391
			try {
				output_ab86b0c7_ea4d_4cf5_8908_06ec2dec2391 = await axios
					.post(
						`${CallRESTAPIEndpoint_ab86b0c7_ea4d_4cf5_8908_06ec2dec2391.secrets.BACKEND_DEPLOYED_INSTANCE_URL}/book?`,
						params_ab86b0c7_ea4d_4cf5_8908_06ec2dec2391,
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
			const ReturnSuccessResponse_a9e284eb_77cc_437f_87eb_a11b488d64f9 = {
				output: output_ab86b0c7_ea4d_4cf5_8908_06ec2dec2391,
				params: request_714664b2_a821_405c_aad7_d318814d9c5a,
				secrets: process.env,
			}
			const updatedReturnSuccessResponse = {
				...ReturnSuccessResponse_a9e284eb_77cc_437f_87eb_a11b488d64f9,
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
		}
		const ifTrue_6afebdf0_0c92_4fe2_bd09_dda7ac5820ec = {
			input: request_714664b2_a821_405c_aad7_d318814d9c5a,
			params: request_714664b2_a821_405c_aad7_d318814d9c5a,
			secrets: process.env,
		}
		if (
			ifTrue_6afebdf0_0c92_4fe2_bd09_dda7ac5820ec.input.body.type ===
			'payment_intent.canceled'
		) {
			const UpdateRecordFieldsbyId_13180fd7_b829_4979_84c6_8c0701ab9927 = {
				input: ifTrue_6afebdf0_0c92_4fe2_bd09_dda7ac5820ec,
				params: request_714664b2_a821_405c_aad7_d318814d9c5a,
				secrets: process.env,
			}
			const updated_13180fd7_b829_4979_84c6_8c0701ab9927 =
				await prisma.Booking.update({
					where: {
						id: UpdateRecordFieldsbyId_13180fd7_b829_4979_84c6_8c0701ab9927
							.input.input.body.data.object.metadata.bookingId,
					},
					data: { paymentStatus: `CANCELLED` },
				})
			const ReturnSuccessResponse_e309086c_3480_4fb1_906f_63d66cc5bdfe = {
				updated: updated_13180fd7_b829_4979_84c6_8c0701ab9927,
				params: request_714664b2_a821_405c_aad7_d318814d9c5a,
				secrets: process.env,
			}
			const updatedReturnSuccessResponse = {
				...ReturnSuccessResponse_e309086c_3480_4fb1_906f_63d66cc5bdfe,
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
		}
	} catch (error) {
		const ReturnErrorResponse_d3773278_17f0_49ed_8641_4041ed326b50 = {}
		const createErrorData_d3773278_17f0_49ed_8641_4041ed326b50 =
			ReturnErrorResponse_d3773278_17f0_49ed_8641_4041ed326b50
		delete createErrorData_d3773278_17f0_49ed_8641_4041ed326b50.params
		delete createErrorData_d3773278_17f0_49ed_8641_4041ed326b50.secrets
		return res
			.status(400)
			.json(
				Object.keys(createErrorData_d3773278_17f0_49ed_8641_4041ed326b50).length
					? createErrorData_d3773278_17f0_49ed_8641_4041ed326b50
					: error
			)
		const ReturnErrorResponse_a5a93fba_25be_4271_b44a_1dbd831f84a1 = {}
		const createErrorData_a5a93fba_25be_4271_b44a_1dbd831f84a1 =
			ReturnErrorResponse_a5a93fba_25be_4271_b44a_1dbd831f84a1
		delete createErrorData_a5a93fba_25be_4271_b44a_1dbd831f84a1.params
		delete createErrorData_a5a93fba_25be_4271_b44a_1dbd831f84a1.secrets
		return res
			.status(400)
			.json(
				Object.keys(createErrorData_a5a93fba_25be_4271_b44a_1dbd831f84a1).length
					? createErrorData_a5a93fba_25be_4271_b44a_1dbd831f84a1
					: error
			)
	}
}

module.exports = {
	stripe,
}
