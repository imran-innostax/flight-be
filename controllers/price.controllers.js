const { logToDatabase } = require('../helpers')
const axios = require('axios')

const price = async (req, res, next) => {
	try {
		const request_67a2590e_357d_4282_b52f_3320dd67667d = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const GetRecordValue_758e2229_0310_4cec_a3af_521e38262e48 = {
			input: request_67a2590e_357d_4282_b52f_3320dd67667d,
			params: request_67a2590e_357d_4282_b52f_3320dd67667d,
			secrets: process.env,
		}
		const pickedValue_758e2229_0310_4cec_a3af_521e38262e48 =
			GetRecordValue_758e2229_0310_4cec_a3af_521e38262e48.input.body
		const RunJavaScriptCode_b6bd5edd_32d4_4885_9505_11a0f4c7c5f3 = {
			input: pickedValue_758e2229_0310_4cec_a3af_521e38262e48,
			params: request_67a2590e_357d_4282_b52f_3320dd67667d,
			secrets: process.env,
		}
		const rjc_b6bd5edd_32d4_4885_9505_11a0f4c7c5f3 =
			RunJavaScriptCode_b6bd5edd_32d4_4885_9505_11a0f4c7c5f3

		const runJavascriptCode_b6bd5edd_32d4_4885_9505_11a0f4c7c5f3 =
			async function () {
				function mapFlightOffers(request) {
					const template = {
						data: {
							type: 'flight-offers-pricing',
							flightOffers: [
								{
									type: 'flight-offer',
									id: request?.flightId,
									source: request?.internalSource || 'GDS',
									instantTicketingRequired:
										request.instantTicketRequired || false,
									nonHomogeneous: request.nonHomogeneous || false,
									oneWay: request.oneWay || false,
									itineraries:
										request.itineraries?.map((itinerary) => ({
											duration: itinerary.duration,
											segments:
												itinerary.segments?.map((segment) => ({
													departure: {
														iataCode: segment?.departure?.iataCode,
														terminal: segment?.departure?.terminal,
														at: segment?.departure?.at,
													},
													arrival: {
														iataCode: segment?.arrival?.iataCode,
														terminal: segment?.arrival?.terminal,
														at: segment?.arrival?.at,
													},
													carrierCode: segment?.carrierCode,
													number: segment?.number,
													duration: segment.duration,
													id: segment.id,
												})) || [],
										})) || [],
									price: {
										currency: request?.price?.currency,
										total: request?.price?.total,
										base: request?.price?.base,
										fees:
											request.price?.fees?.map((fee) => ({
												amount: fee?.amount,
												type: fee?.type,
											})) || [],
										grandTotal: request.price?.grandTotal,
									},
									validatingAirlineCodes: [
										...(request.validatingAirlineCodes || []),
									],
									travelerPricings:
										request.travelerDetails?.map((traveler) => ({
											travelerId: traveler?.id,
											fareOption: traveler?.fareOption,
											travelerType: traveler?.travelerType,
											associatedAdultId: traveler.associatedAdultId,
											price: {
												currency: traveler?.price?.currency,
												total: traveler?.price?.grandTotal,
												base: traveler?.price?.basePrice,
											},
											fareDetailsBySegment:
												traveler.fareDetailsBySegment?.map(
													(fareDetailBySegment) => ({
														segmentId: fareDetailBySegment?.segmentId,
														cabin: fareDetailBySegment?.cabin,
														fareBasis: fareDetailBySegment?.fareBasis,
														class: fareDetailBySegment?.class,
														includedCheckedBags: {
															weight:
																fareDetailBySegment.includedCheckedBags?.weight,
															weightUnit:
																fareDetailBySegment.includedCheckedBags
																	?.weightUnit,
														},
													})
												) || [],
										})) || [],
								},
							],
						},
					}
					return template
				}
				return mapFlightOffers(rjc_b6bd5edd_32d4_4885_9505_11a0f4c7c5f3.input)
			}
		const output_b6bd5edd_32d4_4885_9505_11a0f4c7c5f3 =
			await runJavascriptCode_b6bd5edd_32d4_4885_9505_11a0f4c7c5f3()
		const CallRESTAPIEndpoint_c0a20f33_1e0e_4a00_aad2_d407ec6ed013 = {
			input: request_67a2590e_357d_4282_b52f_3320dd67667d,
			params: request_67a2590e_357d_4282_b52f_3320dd67667d,
			secrets: process.env,
		}

		const params_c0a20f33_1e0e_4a00_aad2_d407ec6ed013 = new URLSearchParams()
		params_c0a20f33_1e0e_4a00_aad2_d407ec6ed013.append(
			`client_secret`,
			`${CallRESTAPIEndpoint_c0a20f33_1e0e_4a00_aad2_d407ec6ed013.secrets.AMADEUS_CLIENT_SECRET}`
		)
		params_c0a20f33_1e0e_4a00_aad2_d407ec6ed013.append(
			`grant_type`,
			`${CallRESTAPIEndpoint_c0a20f33_1e0e_4a00_aad2_d407ec6ed013.secrets.AMADEUS_GRANT_TYPE}`
		)
		params_c0a20f33_1e0e_4a00_aad2_d407ec6ed013.append(
			`client_id`,
			`${CallRESTAPIEndpoint_c0a20f33_1e0e_4a00_aad2_d407ec6ed013.secrets.AMADEUS_CLIENT_ID}`
		)

		let output_c0a20f33_1e0e_4a00_aad2_d407ec6ed013
		try {
			output_c0a20f33_1e0e_4a00_aad2_d407ec6ed013 = await axios
				.post(
					`${CallRESTAPIEndpoint_c0a20f33_1e0e_4a00_aad2_d407ec6ed013.secrets.AMADEUS_API_BASE_URL}/v1/security/oauth2/token?`,
					params_c0a20f33_1e0e_4a00_aad2_d407ec6ed013,
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
			output: output_b6bd5edd_32d4_4885_9505_11a0f4c7c5f3,
			params: request_67a2590e_357d_4282_b52f_3320dd67667d,
			secrets: process.env,
			input: output_c0a20f33_1e0e_4a00_aad2_d407ec6ed013,
		}

		let output_16cbc054_b21a_4bc4_9a99_c9237f68a352
		try {
			output_16cbc054_b21a_4bc4_9a99_c9237f68a352 = await axios
				.post(
					`${CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.secrets.AMADEUS_API_BASE_URL}/v1/shopping/flight-offers/pricing?`,
					CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.output,
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
		const RunJavaScriptCode_7c082b3e_94b9_490c_ac24_3e85d403b18e = {
			input: output_16cbc054_b21a_4bc4_9a99_c9237f68a352,
			params: request_67a2590e_357d_4282_b52f_3320dd67667d,
			secrets: process.env,
		}
		const rjc_7c082b3e_94b9_490c_ac24_3e85d403b18e =
			RunJavaScriptCode_7c082b3e_94b9_490c_ac24_3e85d403b18e

		const runJavascriptCode_7c082b3e_94b9_490c_ac24_3e85d403b18e =
			async function () {
				function responseMapper(response) {
					const obj = response.data.flightOffers[0]

					const result = {
						flightId: obj.id,
						price: {
							currency: obj.price?.currency || '',
							basePrice: obj.price?.base || '',
							grandTotal: obj.price?.grandTotal || '',
							fees:
								obj.price?.fees?.map((fee) => ({
									amount: fee?.amount || '0.00',
									type: fee?.type || 'SUPPLIER',
								})) || [],
						},
						pricingOptions: {
							fareType: obj.pricingOptions?.fareType,
							includedCheckedBagsOnly:
								obj.pricingOptions?.includedCheckedBagsOnly || false,
						},
						taxes: {
							taxAmount: obj.travelerPricings
								.flatMap((travelerPricing) => travelerPricing.price.taxes)
								.reduce((total, { amount }) => total + parseFloat(amount), 0)
								.toFixed(3),
							taxCurrency: obj.price?.currency || '',
						},
						refund: {
							refundableTax: obj.travelerPricings
								.reduce(
									(total, { price }) =>
										total + parseFloat(price?.refundableTaxes),
									0
								)
								.toFixed(3),
							refundApplicable: obj.refund?.refundableTax || false,
							refundAmount: obj.refund?.refundAmount || '',
							refundConditions: obj.refund?.refundConditions || ['N/A'],
						},
						travelerPricings: obj.travelerPricings.map((travelerPricing) => ({
							id: travelerPricing.travelerId,
							fareOption: travelerPricing.fareOption,
							travelerType: travelerPricing.travelerType,
							associatedAdultId: travelerPricing.associatedAdultId,
							price: {
								currency: travelerPricing?.price?.currency || '',
								basePrice: travelerPricing?.price?.base || '',
								grandTotal: travelerPricing?.price?.total || '',
								taxes:
									travelerPricing?.price?.taxes?.map((tax) => ({
										amount: tax?.amount || '0.00',
										code: tax?.type || '',

										refundableTaxes: travelerPricing?.price?.refundableTaxes,
									})) || [],
							},
							fareDetailsBySegment: travelerPricing.fareDetailsBySegment,
						})),
						supplierDictionaries: response?.dictionaries || '',
					}

					return result
				}

				return responseMapper(rjc_7c082b3e_94b9_490c_ac24_3e85d403b18e.input)
			}
		const output_7c082b3e_94b9_490c_ac24_3e85d403b18e =
			await runJavascriptCode_7c082b3e_94b9_490c_ac24_3e85d403b18e()
		const ReturnSuccessResponse_d1fa7c37_108d_4ba8_8bd1_13c1abe53db2 = {
			output: output_7c082b3e_94b9_490c_ac24_3e85d403b18e,
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
	price,
}
