const { logToDatabase } = require('../helpers')
const axios = require('axios')

const searchflights = async (req, res, next) => {
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
		const RunJavaScriptCode_794badf0_bb74_4120_b4b8_4f62f4cd1192 = {
			input: pickedValue_cf73cc3f_9a3b_4864_95c3_0ba3319c0d8b,
			params: request_67a2590e_357d_4282_b52f_3320dd67667d,
			secrets: process.env,
		}
		const rjc_794badf0_bb74_4120_b4b8_4f62f4cd1192 =
			RunJavaScriptCode_794badf0_bb74_4120_b4b8_4f62f4cd1192

		const runJavascriptCode_794badf0_bb74_4120_b4b8_4f62f4cd1192 =
			async function () {
				const updateRequestBody = (request) => {
					const response = {
						originLocationCode: request.journeys[0].originCode || '',
						destinationLocationCode: request.journeys[0].destCode || '',
						departureDate: request.journeys[0].departureDate || '',
						returnDate: request.journeys[0].returnDate || '',
						adults: request.passengersCount.adult || '',
						children: request.passengersCount.children || '',
						infants: request.passengersCount.infants || '',
						travelClass: request.travelClass || '',
						includedAirlineCodes: request.includedAirlines || [],
						excludedAirlineCodes: request.excludedAirlines || [],
						nonStop: request.nonstop || false,
						currencyCode: request.currencyCode || '',
						maxPrice: request.maxPrice || '',
						max: request.max || '',
					}
					return response
				}
				return updateRequestBody(rjc_794badf0_bb74_4120_b4b8_4f62f4cd1192.input)
			}
		const output_794badf0_bb74_4120_b4b8_4f62f4cd1192 =
			await runJavascriptCode_794badf0_bb74_4120_b4b8_4f62f4cd1192()
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
			output: output_794badf0_bb74_4120_b4b8_4f62f4cd1192,
			params: request_67a2590e_357d_4282_b52f_3320dd67667d,
			secrets: process.env,
			input: output_9fea2b0e_cbee_40cd_a3a0_9f6fd74fc02c,
		}
		const queryParameters_16cbc054_b21a_4bc4_9a99_c9237f68a352 = `returnDate=${CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.output.returnDate}&children=${CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.output.children}&infants=${CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.output.infants}&travelClass=${CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.output.travelClass}&includedAirlineCodes=${CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.output.includedAirlineCodes}&excludedAirlineCodes=${CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.output.excludedAirlineCodes}&nonStop=${CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.output.nonStop}&currencyCode=${CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.output.currencyCode}&maxPrice=${CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.output.maxPrice}&max=${CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.output.max}&`
		const queryParams_16cbc054_b21a_4bc4_9a99_c9237f68a352 =
			queryParameters_16cbc054_b21a_4bc4_9a99_c9237f68a352
				.replaceAll('=', ':')
				.replaceAll('&', ',')

		const pairs_16cbc054_b21a_4bc4_9a99_c9237f68a352 =
			queryParams_16cbc054_b21a_4bc4_9a99_c9237f68a352.split(',')
		const jsonObj_16cbc054_b21a_4bc4_9a99_c9237f68a352 = {}
		for (let pair of pairs_16cbc054_b21a_4bc4_9a99_c9237f68a352) {
			const [key, value] = pair.split(':')
			jsonObj_16cbc054_b21a_4bc4_9a99_c9237f68a352[key] = value
		}
		const createQueryString_16cbc054_b21a_4bc4_9a99_c9237f68a352 = (
			filters
		) => {
			const queryString = Object.keys(filters)
				.filter(
					(each) =>
						filters[each] &&
						filters[each] != 'undefined' &&
						filters[each] != 'null'
				)
				.map((each) => `${each}=${filters[each]}`)
				.join('&')
			return queryString ? `${queryString}` : ''
		}

		let output_16cbc054_b21a_4bc4_9a99_c9237f68a352
		try {
			output_16cbc054_b21a_4bc4_9a99_c9237f68a352 = await axios
				.get(
					`${
						CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.secrets
							.AMADEUS_API_BASE_URL
					}/v2/shopping/flight-offers?originLocationCode=${
						CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.output
							.originLocationCode
					}&destinationLocationCode=${
						CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.output
							.destinationLocationCode
					}&departureDate=${
						CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.output
							.departureDate
					}&adults=${
						CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.output
							.adults
					}&${createQueryString_16cbc054_b21a_4bc4_9a99_c9237f68a352(
						jsonObj_16cbc054_b21a_4bc4_9a99_c9237f68a352
					)}`,
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
		const RunJavaScriptCode_fa99442a_6f82_44c9_a180_03a59f94b79c = {
			input: output_16cbc054_b21a_4bc4_9a99_c9237f68a352,
			params: request_67a2590e_357d_4282_b52f_3320dd67667d,
			secrets: process.env,
		}
		const rjc_fa99442a_6f82_44c9_a180_03a59f94b79c =
			RunJavaScriptCode_fa99442a_6f82_44c9_a180_03a59f94b79c

		const runJavascriptCode_fa99442a_6f82_44c9_a180_03a59f94b79c =
			async function () {
				const flights = rjc_fa99442a_6f82_44c9_a180_03a59f94b79c.input.data.map(
					(item) => {
						return {
							flightId: item.id,
							resultSource: 'amadeus',
							internalSource: item.source,
							instantTicketRequired: item.instantTicketingRequired,
							itineraries: [...item.itineraries],
							priceDetails: {
								currency: item.price.currency,
								basePrice: item.price.base,
								grandTotal: item.price.grandTotal,
							},
							passengers: [...item.travelerPricings],
							cabinDetails: {},
						}
					}
				)
				return {
					count: rjc_fa99442a_6f82_44c9_a180_03a59f94b79c.input.meta.count,
					flights: [...flights],
					supplierDictionaries:
						rjc_fa99442a_6f82_44c9_a180_03a59f94b79c?.input?.dictionaries || '',
				}
			}
		const output_fa99442a_6f82_44c9_a180_03a59f94b79c =
			await runJavascriptCode_fa99442a_6f82_44c9_a180_03a59f94b79c()
		const ReturnSuccessResponse_d1fa7c37_108d_4ba8_8bd1_13c1abe53db2 = {
			output: output_fa99442a_6f82_44c9_a180_03a59f94b79c,
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
	searchflights,
}
