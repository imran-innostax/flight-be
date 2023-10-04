const { logToDatabase } = require('../helpers')
const prismaClient = require('../prismaClient')
const { prisma } = prismaClient
const RabbitMQClient = require('../rabbitmq/client')

const getbookingsbyuser = async (req, res, next) => {
	try {
		const request_27014ed7_1aa9_40d9_b588_6e75f2c4a421 = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const IdPAuthentication_9c2620e0_ee88_4209_be3a_7b59f2616056 = {
			input: request_27014ed7_1aa9_40d9_b588_6e75f2c4a421,
			params: request_27014ed7_1aa9_40d9_b588_6e75f2c4a421,
			secrets: process.env,
		}

		const request_9c2620e0_ee88_4209_be3a_7b59f2616056 =
			IdPAuthentication_9c2620e0_ee88_4209_be3a_7b59f2616056.input

		const messageData_9c2620e0_ee88_4209_be3a_7b59f2616056 = {
			service: 'authorize',
			authTable: 'Users',
			externalDBUrl: process.env.DATABASE_URL,
			headers: request_9c2620e0_ee88_4209_be3a_7b59f2616056.headers,
			body: request_9c2620e0_ee88_4209_be3a_7b59f2616056.body,
		}

		const idp_queue_9c2620e0_ee88_4209_be3a_7b59f2616056 =
			process.env.RABBITMQ_IDP_QUEUE
		const output_9c2620e0_ee88_4209_be3a_7b59f2616056 =
			await RabbitMQClient.produce({
				data: messageData_9c2620e0_ee88_4209_be3a_7b59f2616056,
				queueName: idp_queue_9c2620e0_ee88_4209_be3a_7b59f2616056,
			})
		if (output_9c2620e0_ee88_4209_be3a_7b59f2616056.response.error)
			throw (
				output_9c2620e0_ee88_4209_be3a_7b59f2616056.response.error ||
				'Server Error.'
			)
		const RunJavaScriptCode_f32f130f_0277_437e_81ac_82ec7dfda530 = {
			input: output_9c2620e0_ee88_4209_be3a_7b59f2616056,
			params: request_27014ed7_1aa9_40d9_b588_6e75f2c4a421,
			secrets: process.env,
		}
		const rjc_f32f130f_0277_437e_81ac_82ec7dfda530 =
			RunJavaScriptCode_f32f130f_0277_437e_81ac_82ec7dfda530

		const runJavascriptCode_f32f130f_0277_437e_81ac_82ec7dfda530 =
			async function () {
				const getUserEmail = (data) => {
					const response = data.response

					return response.status === 200
						? { email: response?.decodedUserInfo?.email }
						: res.send({
								error: 'Invalid User, Please try again with valid token',
								status: 401,
								response: {},
						  })
				}
				return getUserEmail(rjc_f32f130f_0277_437e_81ac_82ec7dfda530.input)
			}
		const output_f32f130f_0277_437e_81ac_82ec7dfda530 =
			await runJavascriptCode_f32f130f_0277_437e_81ac_82ec7dfda530()
		const GetMultiRecordsbyQuery_5c1f7cd7_ad78_4f83_ad9a_61bf1c21aa26 = {
			input: output_f32f130f_0277_437e_81ac_82ec7dfda530,
			params: request_27014ed7_1aa9_40d9_b588_6e75f2c4a421,
			secrets: process.env,
		}
		const getMultiObjectByQuery_5c1f7cd7_ad78_4f83_ad9a_61bf1c21aa26 =
			await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
				`SELECT * FROM "Booking" WHERE "userEmail"= '${GetMultiRecordsbyQuery_5c1f7cd7_ad78_4f83_ad9a_61bf1c21aa26.input.email}' OFFSET 0 ROWS FETCH NEXT '20' ROWS ONLY`
			)}`
		const result_5c1f7cd7_ad78_4f83_ad9a_61bf1c21aa26 =
			getMultiObjectByQuery_5c1f7cd7_ad78_4f83_ad9a_61bf1c21aa26
		const RunJavaScriptCode_d579bfda_c084_4be3_88c8_e201b75a5e44 = {
			input: result_5c1f7cd7_ad78_4f83_ad9a_61bf1c21aa26,
			params: request_27014ed7_1aa9_40d9_b588_6e75f2c4a421,
			secrets: process.env,
		}
		const rjc_d579bfda_c084_4be3_88c8_e201b75a5e44 =
			RunJavaScriptCode_d579bfda_c084_4be3_88c8_e201b75a5e44

		const runJavascriptCode_d579bfda_c084_4be3_88c8_e201b75a5e44 =
			async function () {
				const getRoutes = async (bookings) => {
					let mappedBookings = []
					for (let booking of bookings) {
						let mappedItinerariesData = []
						let itineraries =
							await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
								`SELECT * FROM "Itinerary" WHERE "bookingId" = '${booking.id}';`
							)} `
						for (const Itinerary of itineraries) {
							let routes =
								await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
									`SELECT * FROM "Route" where "itineraryId" = '${Itinerary.id}'`
								)} `
							mappedItinerariesData.push({ routes })
							booking = { ...booking, itineraries: mappedItinerariesData }
						}
						let price =
							await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
								`SELECT * FROM "Price" WHERE "bookingId" = '${booking.id}';`
							)} `
						booking.itineraries = mappedItinerariesData
						booking.price = price[0]
						mappedBookings = [...mappedBookings, booking]
					}
					return mappedBookings
				}
				return getRoutes(rjc_d579bfda_c084_4be3_88c8_e201b75a5e44.input)
			}
		const output_d579bfda_c084_4be3_88c8_e201b75a5e44 =
			await runJavascriptCode_d579bfda_c084_4be3_88c8_e201b75a5e44()
		const ReturnSuccessResponse_3d1c7ef8_ca4e_4b1c_8270_2ba33885bbef = {
			output: output_d579bfda_c084_4be3_88c8_e201b75a5e44,
			params: request_27014ed7_1aa9_40d9_b588_6e75f2c4a421,
			secrets: process.env,
		}
		const updatedReturnSuccessResponse = {
			...ReturnSuccessResponse_3d1c7ef8_ca4e_4b1c_8270_2ba33885bbef,
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
		const errorMessage = error.message
		return res
			.status(400)
			.json(
				errorMessage.includes(`Message:`)
					? errorMessage.split(`Message:`)[1]
					: errorMessage
			)
	}
}

module.exports = {
	getbookingsbyuser,
}
