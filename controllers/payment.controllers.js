const { logToDatabase } = require('../helpers')
const prismaClient = require('../prismaClient')
const { prisma } = prismaClient
const axios = require('axios')
const qs = require('qs')

const payment = async (req, res, next) => {
	try {
		const request_e9494340_7a49_4c3b_9d09_ff0f6a69b83b = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const ifTrue_e679092c_ad9d_4d4c_89b6_6c300b194be4 = {
			input: request_e9494340_7a49_4c3b_9d09_ff0f6a69b83b,
			params: request_e9494340_7a49_4c3b_9d09_ff0f6a69b83b,
			secrets: process.env,
		}
		if (
			ifTrue_e679092c_ad9d_4d4c_89b6_6c300b194be4.input.body
				.selectedPaymentPortal === 'stripe'
		) {
			const GetRecordValue_4cc0a134_d278_4ba2_8d11_6a31ff1a0b0f = {
				input: ifTrue_e679092c_ad9d_4d4c_89b6_6c300b194be4,
				params: request_e9494340_7a49_4c3b_9d09_ff0f6a69b83b,
				secrets: process.env,
			}
			const pickedValue_4cc0a134_d278_4ba2_8d11_6a31ff1a0b0f =
				GetRecordValue_4cc0a134_d278_4ba2_8d11_6a31ff1a0b0f.input.input.body
			const CreateCheckoutSession_b5f912ee_5253_42cd_bfc4_dd463c730ba0 = {
				input: pickedValue_4cc0a134_d278_4ba2_8d11_6a31ff1a0b0f,
				params: request_e9494340_7a49_4c3b_9d09_ff0f6a69b83b,
				secrets: process.env,
			}
			const data_b5f912ee_5253_42cd_bfc4_dd463c730ba0 = {
				line_items:
					CreateCheckoutSession_b5f912ee_5253_42cd_bfc4_dd463c730ba0.input
						.lineItems,
				metadata: {
					bookingId:
						CreateCheckoutSession_b5f912ee_5253_42cd_bfc4_dd463c730ba0.input
							.bookingId,
				},
				mode: 'payment',

				success_url:
					CreateCheckoutSession_b5f912ee_5253_42cd_bfc4_dd463c730ba0.input
						.successUrl,
				cancel_url:
					CreateCheckoutSession_b5f912ee_5253_42cd_bfc4_dd463c730ba0.input
						.cancelUrl,
				payment_method_types: ['card'],

				phone_number_collection: {
					enabled: true,
				},
			}
			let config_b5f912ee_5253_42cd_bfc4_dd463c730ba0 = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'https://api.stripe.com/v1/checkout/sessions',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${btoa(process.env.STRIPE_SECRET_KEY)}`,
				},
				data: qs.stringify(data_b5f912ee_5253_42cd_bfc4_dd463c730ba0),
			}

			const output_b5f912ee_5253_42cd_bfc4_dd463c730ba0 = await axios
				.request(config_b5f912ee_5253_42cd_bfc4_dd463c730ba0)
				.then((response) => response.data)
			const UpdateRecordFieldsbyId_0ea2d91e_617a_4875_9d4c_ee8a0baca4ef = {
				pickedValue: pickedValue_4cc0a134_d278_4ba2_8d11_6a31ff1a0b0f,
				params: request_e9494340_7a49_4c3b_9d09_ff0f6a69b83b,
				secrets: process.env,
				input: output_b5f912ee_5253_42cd_bfc4_dd463c730ba0,
			}
			const updated_0ea2d91e_617a_4875_9d4c_ee8a0baca4ef =
				await prisma.Booking.update({
					where: {
						id: UpdateRecordFieldsbyId_0ea2d91e_617a_4875_9d4c_ee8a0baca4ef
							.pickedValue.bookingId,
					},
					data: {
						stripeSessionId: `${UpdateRecordFieldsbyId_0ea2d91e_617a_4875_9d4c_ee8a0baca4ef.input.id}`,
					},
				})
			const ReturnSuccessResponse_ead0ab0c_8d80_474c_aaed_6777c26b1ab9 = {
				output: output_b5f912ee_5253_42cd_bfc4_dd463c730ba0,
				params: request_e9494340_7a49_4c3b_9d09_ff0f6a69b83b,
				secrets: process.env,
			}
			const updatedReturnSuccessResponse = {
				...ReturnSuccessResponse_ead0ab0c_8d80_474c_aaed_6777c26b1ab9,
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
		const ifTrue_2f041145_4787_49e4_a62c_cb069fd86aa3 = {
			input: request_e9494340_7a49_4c3b_9d09_ff0f6a69b83b,
			params: request_e9494340_7a49_4c3b_9d09_ff0f6a69b83b,
			secrets: process.env,
		}
		if (
			ifTrue_2f041145_4787_49e4_a62c_cb069fd86aa3.input.body
				.selectedPaymentPortal === 'razorpay'
		) {
			const GetRecordValue_d0015303_fd28_4b2b_9d1a_948ec51112be = {
				input: ifTrue_2f041145_4787_49e4_a62c_cb069fd86aa3,
				params: request_e9494340_7a49_4c3b_9d09_ff0f6a69b83b,
				secrets: process.env,
			}
			const pickedValue_d0015303_fd28_4b2b_9d1a_948ec51112be =
				GetRecordValue_d0015303_fd28_4b2b_9d1a_948ec51112be.input.input.body
			const CreatePaymentObject_31ee6e9d_3859_42ce_bff6_b74785de4780 = {
				input: pickedValue_d0015303_fd28_4b2b_9d1a_948ec51112be,
				params: request_e9494340_7a49_4c3b_9d09_ff0f6a69b83b,
				secrets: process.env,
			}
			const currency =
				CreatePaymentObject_31ee6e9d_3859_42ce_bff6_b74785de4780.input.currency
			const amount =
				CreatePaymentObject_31ee6e9d_3859_42ce_bff6_b74785de4780.input.amount *
				100

			const data_31ee6e9d_3859_42ce_bff6_b74785de4780 = {
				amount,
				currency,
			}

			const config_31ee6e9d_3859_42ce_bff6_b74785de4780 = {
				method: 'post',
				url: 'https://api.razorpay.com/v1/orders',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic ${btoa(
						process.env.RAZORPAY_KEY_ID + ':' + process.env.RAZORPAY_KEY_SECRET
					)}`,
				},
				data: JSON.stringify(data_31ee6e9d_3859_42ce_bff6_b74785de4780),
			}

			const output_31ee6e9d_3859_42ce_bff6_b74785de4780 = await axios(
				config_31ee6e9d_3859_42ce_bff6_b74785de4780
			).then((response) => response.data)
			const UpdateRecordFieldsbyId_2d3c0206_8135_4bf7_bdfb_ce2841967bcb = {
				pickedValue: pickedValue_d0015303_fd28_4b2b_9d1a_948ec51112be,
				params: request_e9494340_7a49_4c3b_9d09_ff0f6a69b83b,
				secrets: process.env,
				input: output_31ee6e9d_3859_42ce_bff6_b74785de4780,
			}
			const updated_2d3c0206_8135_4bf7_bdfb_ce2841967bcb =
				await prisma.Booking.update({
					where: {
						id: UpdateRecordFieldsbyId_2d3c0206_8135_4bf7_bdfb_ce2841967bcb
							.pickedValue.bookingId,
					},
					data: {
						razorpayOrderId: `${UpdateRecordFieldsbyId_2d3c0206_8135_4bf7_bdfb_ce2841967bcb.input.id}`,
					},
				})
			const ReturnSuccessResponse_763f6e17_d7bd_419e_b659_de3f850df8ff = {
				output: output_31ee6e9d_3859_42ce_bff6_b74785de4780,
				params: request_e9494340_7a49_4c3b_9d09_ff0f6a69b83b,
				secrets: process.env,
			}
			const updatedReturnSuccessResponse = {
				...ReturnSuccessResponse_763f6e17_d7bd_419e_b659_de3f850df8ff,
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
		const ReturnErrorResponse_17970ef5_a974_4339_8e95_282d933d97ea = {}
		const createErrorData_17970ef5_a974_4339_8e95_282d933d97ea =
			ReturnErrorResponse_17970ef5_a974_4339_8e95_282d933d97ea
		delete createErrorData_17970ef5_a974_4339_8e95_282d933d97ea.params
		delete createErrorData_17970ef5_a974_4339_8e95_282d933d97ea.secrets
		return res
			.status(400)
			.json(
				Object.keys(createErrorData_17970ef5_a974_4339_8e95_282d933d97ea).length
					? createErrorData_17970ef5_a974_4339_8e95_282d933d97ea
					: error
			)
		const ReturnErrorResponse_f3fafb43_f121_4766_b826_53e0f5ba4237 = {}
		const createErrorData_f3fafb43_f121_4766_b826_53e0f5ba4237 =
			ReturnErrorResponse_f3fafb43_f121_4766_b826_53e0f5ba4237
		delete createErrorData_f3fafb43_f121_4766_b826_53e0f5ba4237.params
		delete createErrorData_f3fafb43_f121_4766_b826_53e0f5ba4237.secrets
		return res
			.status(400)
			.json(
				Object.keys(createErrorData_f3fafb43_f121_4766_b826_53e0f5ba4237).length
					? createErrorData_f3fafb43_f121_4766_b826_53e0f5ba4237
					: error
			)
		const ReturnErrorResponse_c80a5c85_a959_43ac_805e_42fcf1ebe58b = {}
		const createErrorData_c80a5c85_a959_43ac_805e_42fcf1ebe58b =
			ReturnErrorResponse_c80a5c85_a959_43ac_805e_42fcf1ebe58b
		delete createErrorData_c80a5c85_a959_43ac_805e_42fcf1ebe58b.params
		delete createErrorData_c80a5c85_a959_43ac_805e_42fcf1ebe58b.secrets
		return res
			.status(400)
			.json(
				Object.keys(createErrorData_c80a5c85_a959_43ac_805e_42fcf1ebe58b).length
					? createErrorData_c80a5c85_a959_43ac_805e_42fcf1ebe58b
					: error
			)
		const ReturnErrorResponse_f40c6da7_68b0_4945_a9f6_7f2cab33ee40 = {}
		const createErrorData_f40c6da7_68b0_4945_a9f6_7f2cab33ee40 =
			ReturnErrorResponse_f40c6da7_68b0_4945_a9f6_7f2cab33ee40
		delete createErrorData_f40c6da7_68b0_4945_a9f6_7f2cab33ee40.params
		delete createErrorData_f40c6da7_68b0_4945_a9f6_7f2cab33ee40.secrets
		return res
			.status(400)
			.json(
				Object.keys(createErrorData_f40c6da7_68b0_4945_a9f6_7f2cab33ee40).length
					? createErrorData_f40c6da7_68b0_4945_a9f6_7f2cab33ee40
					: error
			)
	}
}

module.exports = {
	payment,
}
