const ejs = require('ejs')
const { convert } = require('html-to-text')
const axios = require('axios')
const RabbitMQClient = require('../rabbitmq/client')
const fs = require('fs')
const { logToDatabase } = require('../helpers')
const prismaClient = require('../prismaClient')
const { prisma } = prismaClient

const getbookingbyid = async (req, res, next) => {
	try {
		const request_05c43472_6c7a_4bfa_8b90_be30d34eaa2c = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const GetSingleRecordbyId_350754c0_ad76_49c7_9b61_c65e5a9ec3e0 = {
			input: request_05c43472_6c7a_4bfa_8b90_be30d34eaa2c,
			params: request_05c43472_6c7a_4bfa_8b90_be30d34eaa2c,
			secrets: process.env,
		}
		const found_350754c0_ad76_49c7_9b61_c65e5a9ec3e0 =
			await prisma.Booking.findUnique({
				where: {
					id: GetSingleRecordbyId_350754c0_ad76_49c7_9b61_c65e5a9ec3e0.params
						.params.id,
				},
			})
		const notFound_350754c0_ad76_49c7_9b61_c65e5a9ec3e0 =
			GetSingleRecordbyId_350754c0_ad76_49c7_9b61_c65e5a9ec3e0.input
		if (found_350754c0_ad76_49c7_9b61_c65e5a9ec3e0) {
			const GetMultiRecordsbyQuery_21a5f16f_8412_4dc1_ac26_f0cac52c39aa = {
				input: found_350754c0_ad76_49c7_9b61_c65e5a9ec3e0,
				params: request_05c43472_6c7a_4bfa_8b90_be30d34eaa2c,
				secrets: process.env,
			}
			const getMultiObjectByQuery_21a5f16f_8412_4dc1_ac26_f0cac52c39aa =
				await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
					`SELECT * FROM "Passenger" WHERE "bookingId"= '${GetMultiRecordsbyQuery_21a5f16f_8412_4dc1_ac26_f0cac52c39aa.input.id}' OFFSET 0 ROWS FETCH NEXT '20' ROWS ONLY`
				)}`
			const result_21a5f16f_8412_4dc1_ac26_f0cac52c39aa =
				getMultiObjectByQuery_21a5f16f_8412_4dc1_ac26_f0cac52c39aa
			const GetMultiRecordsbyQuery_738afd5d_90fa_40dc_80cc_4cdcfa6add8d = {
				input: found_350754c0_ad76_49c7_9b61_c65e5a9ec3e0,
				params: request_05c43472_6c7a_4bfa_8b90_be30d34eaa2c,
				secrets: process.env,
			}
			const getMultiObjectByQuery_738afd5d_90fa_40dc_80cc_4cdcfa6add8d =
				await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
					`SELECT * FROM "Itinerary" WHERE "bookingId"= '${GetMultiRecordsbyQuery_738afd5d_90fa_40dc_80cc_4cdcfa6add8d.input.id}' OFFSET 0 ROWS FETCH NEXT '20' ROWS ONLY`
				)}`
			const result_738afd5d_90fa_40dc_80cc_4cdcfa6add8d =
				getMultiObjectByQuery_738afd5d_90fa_40dc_80cc_4cdcfa6add8d
			const GetMultiRecordsbyQuery_4c924a2b_3376_4dd7_a607_d2dddf1ed13d = {
				input: found_350754c0_ad76_49c7_9b61_c65e5a9ec3e0,
				params: request_05c43472_6c7a_4bfa_8b90_be30d34eaa2c,
				secrets: process.env,
			}
			const getMultiObjectByQuery_4c924a2b_3376_4dd7_a607_d2dddf1ed13d =
				await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
					`SELECT * FROM "Price" WHERE "bookingId"= '${GetMultiRecordsbyQuery_4c924a2b_3376_4dd7_a607_d2dddf1ed13d.input.id}' OFFSET 0 ROWS FETCH NEXT '20' ROWS ONLY`
				)}`
			const result_4c924a2b_3376_4dd7_a607_d2dddf1ed13d =
				getMultiObjectByQuery_4c924a2b_3376_4dd7_a607_d2dddf1ed13d
			const RunJavaScriptCode_38ec16a9_974e_454e_88c6_dec7accba4bd = {
				input: found_350754c0_ad76_49c7_9b61_c65e5a9ec3e0,
				params: request_05c43472_6c7a_4bfa_8b90_be30d34eaa2c,
				secrets: process.env,
			}
			const rjc_38ec16a9_974e_454e_88c6_dec7accba4bd =
				RunJavaScriptCode_38ec16a9_974e_454e_88c6_dec7accba4bd

			const runJavascriptCode_38ec16a9_974e_454e_88c6_dec7accba4bd =
				async function () {
					function bookingMapper(data) {
						return data
					}

					return bookingMapper(rjc_38ec16a9_974e_454e_88c6_dec7accba4bd.input)
				}
			const output_38ec16a9_974e_454e_88c6_dec7accba4bd =
				await runJavascriptCode_38ec16a9_974e_454e_88c6_dec7accba4bd()
			const RunJavaScriptCode_32593604_4ff3_4acb_bc26_915bfd7bbc29 = {
				price: result_4c924a2b_3376_4dd7_a607_d2dddf1ed13d,
				params: request_05c43472_6c7a_4bfa_8b90_be30d34eaa2c,
				secrets: process.env,
				booking: output_38ec16a9_974e_454e_88c6_dec7accba4bd,
				passenger: result_21a5f16f_8412_4dc1_ac26_f0cac52c39aa,
				itinerary: result_738afd5d_90fa_40dc_80cc_4cdcfa6add8d,
			}
			const rjc_32593604_4ff3_4acb_bc26_915bfd7bbc29 =
				RunJavaScriptCode_32593604_4ff3_4acb_bc26_915bfd7bbc29

			const runJavascriptCode_32593604_4ff3_4acb_bc26_915bfd7bbc29 =
				async function () {
					async function bookingMapper(
						prices,
						booking,
						passengers,
						itineraries
					) {
						if (prices.length > 0) {
							const price = prices[0]
							const fees = await prisma.fee.findMany({
								where: {
									priceId: price.id,
								},
							})
							if (fees.length) {
								price.fee = fees
							}

							booking.price = price
						}

						const mappedPassenger = passengers.map(async (passenger) => {
							const docs = await prisma.document.findMany({
								where: {
									passengerId: passenger.id,
								},
							})

							if (docs.length) {
								passenger.document = docs
							}
							const bags = await prisma.baggage.findMany({
								where: {
									passengerId: passenger.id,
								},
							})
							if (bags.length) {
								passenger.baggage = bags
							}
							return passenger
						})
						const resolvedPassenger = await Promise.all(mappedPassenger)
						if (resolvedPassenger) {
							booking.passenger = resolvedPassenger
						}

						const mappedItineraries = itineraries.map(async (itinerary) => {
							const routes = await prisma.route.findMany({
								where: {
									itineraryId: itinerary.id,
								},
							})
							if (routes.length) {
								itinerary.route = routes
							}
							return itinerary
						})
						const resolvedItineraries = await Promise.all(mappedItineraries)
						if (resolvedItineraries) {
							booking.itinerary = resolvedItineraries
						}

						return booking
					}

					return bookingMapper(
						rjc_32593604_4ff3_4acb_bc26_915bfd7bbc29.price,
						rjc_32593604_4ff3_4acb_bc26_915bfd7bbc29.booking,
						rjc_32593604_4ff3_4acb_bc26_915bfd7bbc29.passenger,
						rjc_32593604_4ff3_4acb_bc26_915bfd7bbc29.itinerary
					)
				}
			const output_32593604_4ff3_4acb_bc26_915bfd7bbc29 =
				await runJavascriptCode_32593604_4ff3_4acb_bc26_915bfd7bbc29()
			const ReturnSuccessResponse_5f2023d3_c6a4_42aa_a670_890c45c803d0 = {
				output: output_32593604_4ff3_4acb_bc26_915bfd7bbc29,
				params: request_05c43472_6c7a_4bfa_8b90_be30d34eaa2c,
				secrets: process.env,
			}
			const updatedReturnSuccessResponse = {
				...ReturnSuccessResponse_5f2023d3_c6a4_42aa_a670_890c45c803d0,
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
		if (!found_350754c0_ad76_49c7_9b61_c65e5a9ec3e0) {
			const ReturnErrorResponse_97a9eee6_1f90_4d1c_9f24_b69036256acd = {}
			const createErrorData_97a9eee6_1f90_4d1c_9f24_b69036256acd =
				ReturnErrorResponse_97a9eee6_1f90_4d1c_9f24_b69036256acd
			delete createErrorData_97a9eee6_1f90_4d1c_9f24_b69036256acd.params
			delete createErrorData_97a9eee6_1f90_4d1c_9f24_b69036256acd.secrets
			return res
				.status(400)
				.json(
					Object.keys(createErrorData_97a9eee6_1f90_4d1c_9f24_b69036256acd)
						.length
						? createErrorData_97a9eee6_1f90_4d1c_9f24_b69036256acd
						: 'Error: not able to run properly'
				)
		}
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

const createbooking = async (req, res, next) => {
	try {
		const request_2bbf447f_736e_49d0_b523_cbdf8848f038 = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const GetSingleRecordbyId_df859666_c1f4_4723_a88c_ce60b3829cc4 = {
			input: request_2bbf447f_736e_49d0_b523_cbdf8848f038,
			params: request_2bbf447f_736e_49d0_b523_cbdf8848f038,
			secrets: process.env,
		}
		const found_df859666_c1f4_4723_a88c_ce60b3829cc4 =
			await prisma.Booking.findUnique({
				where: {
					id: GetSingleRecordbyId_df859666_c1f4_4723_a88c_ce60b3829cc4.params
						.body.id,
				},
			})
		const notFound_df859666_c1f4_4723_a88c_ce60b3829cc4 =
			GetSingleRecordbyId_df859666_c1f4_4723_a88c_ce60b3829cc4.input
		if (found_df859666_c1f4_4723_a88c_ce60b3829cc4) {
			const GetMultiRecordsbyQuery_82e85c46_5ca5_4533_bbc7_06b44cedcc8d = {
				input: found_df859666_c1f4_4723_a88c_ce60b3829cc4,
				params: request_2bbf447f_736e_49d0_b523_cbdf8848f038,
				secrets: process.env,
			}
			const getMultiObjectByQuery_82e85c46_5ca5_4533_bbc7_06b44cedcc8d =
				await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
					`SELECT * FROM "Passenger" WHERE "bookingId"= '${GetMultiRecordsbyQuery_82e85c46_5ca5_4533_bbc7_06b44cedcc8d.input.id}' OFFSET 0 ROWS FETCH NEXT '20' ROWS ONLY`
				)}`
			const result_82e85c46_5ca5_4533_bbc7_06b44cedcc8d =
				getMultiObjectByQuery_82e85c46_5ca5_4533_bbc7_06b44cedcc8d
			const GetMultiRecordsbyQuery_6074340b_2e23_49b4_9367_f14623ac71e9 = {
				input: found_df859666_c1f4_4723_a88c_ce60b3829cc4,
				params: request_2bbf447f_736e_49d0_b523_cbdf8848f038,
				secrets: process.env,
			}
			const getMultiObjectByQuery_6074340b_2e23_49b4_9367_f14623ac71e9 =
				await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
					`SELECT * FROM "Price" WHERE "bookingId"= '${GetMultiRecordsbyQuery_6074340b_2e23_49b4_9367_f14623ac71e9.input.id}' OFFSET 0 ROWS FETCH NEXT '20' ROWS ONLY`
				)}`
			const result_6074340b_2e23_49b4_9367_f14623ac71e9 =
				getMultiObjectByQuery_6074340b_2e23_49b4_9367_f14623ac71e9
			const GetMultiRecordsbyQuery_d63e1389_6cdb_47bc_a6fe_e9dd2adfeb98 = {
				input: found_df859666_c1f4_4723_a88c_ce60b3829cc4,
				params: request_2bbf447f_736e_49d0_b523_cbdf8848f038,
				secrets: process.env,
			}
			const getMultiObjectByQuery_d63e1389_6cdb_47bc_a6fe_e9dd2adfeb98 =
				await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
					`SELECT * FROM "Itinerary" WHERE "bookingId"= '${GetMultiRecordsbyQuery_d63e1389_6cdb_47bc_a6fe_e9dd2adfeb98.input.id}' OFFSET 0 ROWS FETCH NEXT '20' ROWS ONLY`
				)}`
			const result_d63e1389_6cdb_47bc_a6fe_e9dd2adfeb98 =
				getMultiObjectByQuery_d63e1389_6cdb_47bc_a6fe_e9dd2adfeb98
			const RunJavaScriptCode_8d084d77_43b2_491a_8f04_bbf6880b1c0e = {
				passengerData: result_82e85c46_5ca5_4533_bbc7_06b44cedcc8d,
				params: request_2bbf447f_736e_49d0_b523_cbdf8848f038,
				secrets: process.env,
				priceData: result_6074340b_2e23_49b4_9367_f14623ac71e9,
				itinerariesData: result_d63e1389_6cdb_47bc_a6fe_e9dd2adfeb98,
			}
			const rjc_8d084d77_43b2_491a_8f04_bbf6880b1c0e =
				RunJavaScriptCode_8d084d77_43b2_491a_8f04_bbf6880b1c0e

			const runJavascriptCode_8d084d77_43b2_491a_8f04_bbf6880b1c0e =
				async function () {
					const returnRequest = async (
						passengerData,
						priceData,
						itinerariesData
					) => {
						let carrierCodes = []
						const mapItinerariesData = async (itinerariesData) => {
							let mappedItinerariesData = []
							for (let itinerary of itinerariesData) {
								let mappedSegmentsData = []
								const segmentData =
									await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
										`SELECT * FROM "Route" WHERE "itineraryId" = '${itinerary.id}' OFFSET 0 ROWS FETCH NEXT '20' ROWS ONLY`
									)}`
								for (let segment of segmentData) {
									carrierCodes = [...carrierCodes, segment?.carrierCode]
									mappedSegmentsData = [
										...mappedSegmentsData,
										{
											departure: {
												iataCode: segment.departIataCode || '',
												terminal: segment.departTerminal || '',
												at: segment.departAt || '',
											},
											arrival: {
												iataCode: segment.arrivalIataCode || '',
												terminal: segment.arrivalTerminal || '',
												at: segment.arrivalAt || '',
											},
											carrierCode: segment.carrierCode || '',
											number: segment.flightNumber || '',
											aircraft: {
												code: segment.aircraftCode || '',
											},
											operating: {
												carrierCode: segment.carrierCode || '',
											},
											duration: segment.duration || '',
											id: segment.routeId || '',
											numberOfStops: segment.numberOfStops || 0,
										},
									]
								}
								mappedItinerariesData = [
									...mappedItinerariesData,
									{
										duration: itinerary.duration,
										segments: mappedSegmentsData,
									},
								]
							}
							return mappedItinerariesData
						}

						const mapPriceData = async (priceData) => {
							const price = priceData[0]
							const feeData =
								await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
									`SELECT * FROM "Fee" WHERE "priceId" = '${price.id}' OFFSET 0 ROWS FETCH NEXT '20' ROWS ONLY`
								)}`
							let mappedFeesData = []
							for (const fee of feeData) {
								mappedFeesData = [
									...mappedFeesData,
									{
										amount: fee.amount,
										type: fee.type,
									},
								]
							}
							return {
								currency: price.currency || 0,
								total: price.grandTotal || 0,
								base: price.basePrice || 0,
								fees: mappedFeesData,
								grandTotal: price.grandTotal || 0,
							}
						}
						const mapPassengerDocuments = async (passengerData) => {
							let mappedDocumentsData = []
							const documents =
								await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
									`SELECT * FROM "Document" WHERE "passengerId" = '${passengerData.id}' OFFSET 0 ROWS FETCH NEXT '20' ROWS ONLY`
								)}`
							for (let document of documents) {
								mappedDocumentsData = [
									...mappedDocumentsData,
									{
										documentType: document.documentType || '',
										birthPlace: document.birthPlace || '',
										issuanceLocation: document.issuanceLocation || '',
										issuanceDate: document.issuanceDate || '',
										number: document.number || '',
										expiryDate: document.expiryDate || '',
										issuanceCountry: document.issuanceCountryCode || '',
										nationality: document.nationality || '',
										holder: document.holder || '',
									},
								]
							}
							return mappedDocumentsData
						}
						const mapTravallersData = async (passengerData) => {
							let travellersData = []
							for (let data of passengerData) {
								travellersData = [
									...travellersData,
									{
										id: data.passengerId,
										dateOfBirth: data.dateOfBirth || '',
										name: {
											firstName: data.firstName || '',
											lastName: data.lastName || '',
										},
										gender: data.gender || '',
										contact: {
											emailAddress: data.email || '',
											phones: [
												{
													deviceType: 'MOBILE',
													countryCallingCode: data.countryCode || '201',
													number: data.phone || '',
												},
											],
										},
										documents: await mapPassengerDocuments(data), // adding data
									},
								]
							}
							return travellersData
						}

						const { flightOfferId, flightInternalSource } =
							await prisma.Booking.findUnique({
								where: {
									id: passengerData[0].bookingId,
								},
							})

						const mapFareDetailsBySegment = async (passenger) => {
							let mappedFareDetailsBySegment = []
							const segments =
								await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
									`SELECT * FROM "fareDetailsByRoute" WHERE "passengerId" = '${passenger.id}' OFFSET 0 ROWS FETCH NEXT '20' ROWS ONLY`
								)}`
							for (const segment of segments) {
								mappedFareDetailsBySegment = [
									...mappedFareDetailsBySegment,
									{
										segmentId: segment.routeId || '',
										cabin: segment.cabin,
										fareBasis: segment.fareBasis,
										class: segment.class,
										includedCheckedBags: {
											weight: segment.includedCheckedBagsWeight,
											weightUnit: segment.includedCheckedBagsWeightUnit,
										},
									},
								]
							}
							return mappedFareDetailsBySegment
						}

						const mapTravelerPricings = async (passengerData) => {
							let mappedTravelerPricings = []

							for (const passenger of passengerData) {
								mappedTravelerPricings = [
									...mappedTravelerPricings,
									{
										travelerId: passenger.passengerId,
										fareOption: passenger.fareOption,
										travelerType: passenger.passengerType || '',
										fareDetailsBySegment: await mapFareDetailsBySegment(
											passenger
										),
									},
								]
							}
							return mappedTravelerPricings
						}

						const mappedRequest = {
							data: {
								type: 'flight-order',
								flightOffers: [
									{
										type: 'flight-offer',
										id: flightOfferId,
										source: flightInternalSource,
										instantTicketingRequired: false,
										itineraries: await mapItinerariesData(itinerariesData),
										price: await mapPriceData(priceData),
										pricingOptions: {
											fareType: ['PUBLISHED'],
											includedCheckedBagsOnly: true,
										},
										validatingAirlineCodes: carrierCodes.filter(
											(code, index) => carrierCodes.indexOf(code) === index
										),
										travelerPricings: await mapTravelerPricings(passengerData),
									},
								],
								travelers: await mapTravallersData(passengerData),
							},
						}

						return mappedRequest
					}

					return returnRequest(
						rjc_8d084d77_43b2_491a_8f04_bbf6880b1c0e.passengerData,
						rjc_8d084d77_43b2_491a_8f04_bbf6880b1c0e.priceData,
						rjc_8d084d77_43b2_491a_8f04_bbf6880b1c0e.itinerariesData
					)
				}
			const output_8d084d77_43b2_491a_8f04_bbf6880b1c0e =
				await runJavascriptCode_8d084d77_43b2_491a_8f04_bbf6880b1c0e()
			const CallRESTAPIEndpoint_48350ac6_cec8_4b1d_bde2_2cc1f17ded0f = {
				input: output_8d084d77_43b2_491a_8f04_bbf6880b1c0e,
				params: request_2bbf447f_736e_49d0_b523_cbdf8848f038,
				secrets: process.env,
			}

			const params_48350ac6_cec8_4b1d_bde2_2cc1f17ded0f = new URLSearchParams()
			params_48350ac6_cec8_4b1d_bde2_2cc1f17ded0f.append(
				`client_secret`,
				`${CallRESTAPIEndpoint_48350ac6_cec8_4b1d_bde2_2cc1f17ded0f.secrets.AMADEUS_CLIENT_SECRET}`
			)
			params_48350ac6_cec8_4b1d_bde2_2cc1f17ded0f.append(
				`client_id`,
				`${CallRESTAPIEndpoint_48350ac6_cec8_4b1d_bde2_2cc1f17ded0f.secrets.AMADEUS_CLIENT_ID}`
			)
			params_48350ac6_cec8_4b1d_bde2_2cc1f17ded0f.append(
				`grant_type`,
				`client_credentials`
			)

			let output_48350ac6_cec8_4b1d_bde2_2cc1f17ded0f
			try {
				output_48350ac6_cec8_4b1d_bde2_2cc1f17ded0f = await axios
					.post(
						`${CallRESTAPIEndpoint_48350ac6_cec8_4b1d_bde2_2cc1f17ded0f.secrets.AMADEUS_API_BASE_URL}/v1/security/oauth2/token?`,
						params_48350ac6_cec8_4b1d_bde2_2cc1f17ded0f,
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
			const CallRESTAPIEndpoint_8ed0a4ac_a898_4450_aeef_16ffaea0a5a5 = {
				output: output_8d084d77_43b2_491a_8f04_bbf6880b1c0e,
				params: request_2bbf447f_736e_49d0_b523_cbdf8848f038,
				secrets: process.env,
				input: output_48350ac6_cec8_4b1d_bde2_2cc1f17ded0f,
			}

			let output_8ed0a4ac_a898_4450_aeef_16ffaea0a5a5
			try {
				output_8ed0a4ac_a898_4450_aeef_16ffaea0a5a5 = await axios
					.post(
						`${CallRESTAPIEndpoint_8ed0a4ac_a898_4450_aeef_16ffaea0a5a5.secrets.AMADEUS_API_BASE_URL}/v1/booking/flight-orders?`,
						CallRESTAPIEndpoint_8ed0a4ac_a898_4450_aeef_16ffaea0a5a5.output,
						{
							headers: {
								Authorization: `Bearer ${CallRESTAPIEndpoint_8ed0a4ac_a898_4450_aeef_16ffaea0a5a5.input.access_token}`,
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
			const UpdateRecordFieldsbyId_5fd23b60_83d3_43c0_8002_ea1b5dd905fe = {
				input: output_8ed0a4ac_a898_4450_aeef_16ffaea0a5a5,
				params: request_2bbf447f_736e_49d0_b523_cbdf8848f038,
				secrets: process.env,
			}
			const updated_5fd23b60_83d3_43c0_8002_ea1b5dd905fe =
				await prisma.Booking.update({
					where: {
						id: UpdateRecordFieldsbyId_5fd23b60_83d3_43c0_8002_ea1b5dd905fe
							.params.body.id,
					},
					data: {
						orderRef: `${UpdateRecordFieldsbyId_5fd23b60_83d3_43c0_8002_ea1b5dd905fe.input.data.id}`,
						status: `${UpdateRecordFieldsbyId_5fd23b60_83d3_43c0_8002_ea1b5dd905fe.input.data.ticketingAgreement.option}`,
						reference: `${UpdateRecordFieldsbyId_5fd23b60_83d3_43c0_8002_ea1b5dd905fe.input.data.associatedRecords[0].reference}`,
					},
				})
			const RunJavaScriptCode_a2d3d292_474a_4d01_83ac_41c6be00c74c = {
				input: updated_5fd23b60_83d3_43c0_8002_ea1b5dd905fe,
				params: request_2bbf447f_736e_49d0_b523_cbdf8848f038,
				secrets: process.env,
			}
			const rjc_a2d3d292_474a_4d01_83ac_41c6be00c74c =
				RunJavaScriptCode_a2d3d292_474a_4d01_83ac_41c6be00c74c

			const runJavascriptCode_a2d3d292_474a_4d01_83ac_41c6be00c74c =
				async function () {
					const mailRequest = async (bookingData) => {
						const passengerData =
							await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
								`SELECT * FROM "Passenger" WHERE "bookingId" = '${bookingData.id}' OFFSET 0 ROWS FETCH NEXT '20' ROWS ONLY`
							)}`
						passengerData[0].status = bookingData.status
						return passengerData[0]
					}
					return mailRequest(rjc_a2d3d292_474a_4d01_83ac_41c6be00c74c.input)
				}
			const output_a2d3d292_474a_4d01_83ac_41c6be00c74c =
				await runJavascriptCode_a2d3d292_474a_4d01_83ac_41c6be00c74c()
			const CreateEmailMessage_ef88a480_8620_4460_9bb5_93a5c39bc22f = {
				input: output_a2d3d292_474a_4d01_83ac_41c6be00c74c,
				params: request_2bbf447f_736e_49d0_b523_cbdf8848f038,
				secrets: process.env,
			}
			const emailMessage_ef88a480_8620_4460_9bb5_93a5c39bc22f = {
				from: `developer@innostax.com`,
				to: CreateEmailMessage_ef88a480_8620_4460_9bb5_93a5c39bc22f.input.email,
				html: ``,
			}
			const fileContent = fs.readFileSync(
				__dirname.split(`\controllers`)[0] +
					`/htmlfiles/CreateEmailMessage_ef88a480_8620_4460_9bb5_93a5c39bc22f.ejs`,
				`utf8`
			)
			const htmlText = ejs.render(fileContent, {
				CreateEmailMessage_ef88a480_8620_4460_9bb5_93a5c39bc22f,
			})
			let htmlContent = String(htmlText)
			if (htmlText.startsWith('&lt;'))
				htmlContent = convert(htmlContent, { wordwrap: 130 })
			const SendEmailMessage_a134deea_fc3b_475d_a4ab_2cee0498bfdf = {
				emailMessage: emailMessage_ef88a480_8620_4460_9bb5_93a5c39bc22f,
				params: request_2bbf447f_736e_49d0_b523_cbdf8848f038,
				secrets: process.env,
			}
			const emailServer_a134deea_fc3b_475d_a4ab_2cee0498bfdf = {
				host: process.env.EMAIL_HOST,
				port: process.env.EMAIL_PORT,
				auth: {
					user: process.env.EMAIL_USERNAME,
					pass: process.env.EMAIL_PASSWORD,
				},
			}

			const messageContent_a134deea_fc3b_475d_a4ab_2cee0498bfdf = {
				...SendEmailMessage_a134deea_fc3b_475d_a4ab_2cee0498bfdf.emailMessage,
				emailServer: emailServer_a134deea_fc3b_475d_a4ab_2cee0498bfdf,
				html: htmlContent,
			}
			const queueName_a134deea_fc3b_475d_a4ab_2cee0498bfdf =
				process.env.RABBITMQ_EMAIL_QUEUE

			const success_a134deea_fc3b_475d_a4ab_2cee0498bfdf =
				await RabbitMQClient.produce({
					data: messageContent_a134deea_fc3b_475d_a4ab_2cee0498bfdf,
					queueName: queueName_a134deea_fc3b_475d_a4ab_2cee0498bfdf,
				})
			if (
				success_a134deea_fc3b_475d_a4ab_2cee0498bfdf.emailResponse.error ||
				success_a134deea_fc3b_475d_a4ab_2cee0498bfdf.error
			)
				return res.json(
					success_a134deea_fc3b_475d_a4ab_2cee0498bfdf.emailResponse.error ||
						success_a134deea_fc3b_475d_a4ab_2cee0498bfdf.error
				)
			const ReturnSuccessResponse_94afa29a_73c9_4fd2_af45_1e3aee7b99d2 = {}
			const updatedReturnSuccessResponse = {
				...ReturnSuccessResponse_94afa29a_73c9_4fd2_af45_1e3aee7b99d2,
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
		if (!found_df859666_c1f4_4723_a88c_ce60b3829cc4) {
			const ReturnErrorResponse_2c668af2_4e79_40de_abd4_be0a1cf209a5 = {}
			const createErrorData_2c668af2_4e79_40de_abd4_be0a1cf209a5 =
				ReturnErrorResponse_2c668af2_4e79_40de_abd4_be0a1cf209a5
			delete createErrorData_2c668af2_4e79_40de_abd4_be0a1cf209a5.params
			delete createErrorData_2c668af2_4e79_40de_abd4_be0a1cf209a5.secrets
			return res
				.status(400)
				.json(
					Object.keys(createErrorData_2c668af2_4e79_40de_abd4_be0a1cf209a5)
						.length
						? createErrorData_2c668af2_4e79_40de_abd4_be0a1cf209a5
						: 'Error: not able to run properly'
				)
		}
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
const updatebooking = async (req, res, next) => {
	try {
		const request_8332197b_d668_424a_a725_9237f0137581 = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const GetRecordValue_7f710bf5_65bb_4916_bf31_30ec6d35db2e = {
			input: request_8332197b_d668_424a_a725_9237f0137581,
			params: request_8332197b_d668_424a_a725_9237f0137581,
			secrets: process.env,
		}
		const pickedValue_7f710bf5_65bb_4916_bf31_30ec6d35db2e =
			GetRecordValue_7f710bf5_65bb_4916_bf31_30ec6d35db2e.input.body
		const UpdateRecordFieldsbyId_380d5c90_0e89_483f_a385_30c36393f142 = {
			input: pickedValue_7f710bf5_65bb_4916_bf31_30ec6d35db2e,
			params: request_8332197b_d668_424a_a725_9237f0137581,
			secrets: process.env,
		}
		const updated_380d5c90_0e89_483f_a385_30c36393f142 =
			await prisma.Booking.update({
				where: {
					id: UpdateRecordFieldsbyId_380d5c90_0e89_483f_a385_30c36393f142.params
						.params.id,
				},
				data: {
					status: `${UpdateRecordFieldsbyId_380d5c90_0e89_483f_a385_30c36393f142.input.status}`,
					paymentStatus: `${UpdateRecordFieldsbyId_380d5c90_0e89_483f_a385_30c36393f142.input.paymentStatus}`,
				},
			})
		const ReturnSuccessResponse_c05d563f_e64d_4144_ab0a_24aa9637dffd = {
			updated: updated_380d5c90_0e89_483f_a385_30c36393f142,
			params: request_8332197b_d668_424a_a725_9237f0137581,
			secrets: process.env,
		}
		const updatedReturnSuccessResponse = {
			...ReturnSuccessResponse_c05d563f_e64d_4144_ab0a_24aa9637dffd,
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
	getbookingbyid,
	createbooking,
	updatebooking,
}
