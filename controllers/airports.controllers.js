const { logToDatabase } = require('../helpers')
const axios = require('axios')

const getairportbycityname = async (req, res, next) => {
	try {
		const request_2ad0588f_2052_474d_ab5a_b6b1906e10fd = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const CallRESTAPIEndpoint_2edc60e2_51ae_4cdb_b394_0421f448997f = {
			input: request_2ad0588f_2052_474d_ab5a_b6b1906e10fd,
			params: request_2ad0588f_2052_474d_ab5a_b6b1906e10fd,
			secrets: process.env,
		}

		const params_2edc60e2_51ae_4cdb_b394_0421f448997f = new URLSearchParams()
		params_2edc60e2_51ae_4cdb_b394_0421f448997f.append(
			`client_secret`,
			`jzdndnNrPvdF8sKn`
		)
		params_2edc60e2_51ae_4cdb_b394_0421f448997f.append(
			`grant_type`,
			`client_credentials`
		)
		params_2edc60e2_51ae_4cdb_b394_0421f448997f.append(
			`client_id`,
			`n08oDVLzXyzy7TUWYWiNuk4HkUKed8xR`
		)

		let output_2edc60e2_51ae_4cdb_b394_0421f448997f
		try {
			output_2edc60e2_51ae_4cdb_b394_0421f448997f = await axios
				.post(
					`${CallRESTAPIEndpoint_2edc60e2_51ae_4cdb_b394_0421f448997f.secrets.AMADEUS_API_BASE_URL}/v1/security/oauth2/token?`,
					params_2edc60e2_51ae_4cdb_b394_0421f448997f,
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
		const CallRESTAPIEndpoint_e99d9a12_bfec_46cc_83f8_0ef2ab43774e = {
			input: output_2edc60e2_51ae_4cdb_b394_0421f448997f,
			params: request_2ad0588f_2052_474d_ab5a_b6b1906e10fd,
			secrets: process.env,
		}
		const queryParameters_e99d9a12_bfec_46cc_83f8_0ef2ab43774e = ``
		const queryParams_e99d9a12_bfec_46cc_83f8_0ef2ab43774e =
			queryParameters_e99d9a12_bfec_46cc_83f8_0ef2ab43774e
				.replaceAll('=', ':')
				.replaceAll('&', ',')

		const pairs_e99d9a12_bfec_46cc_83f8_0ef2ab43774e =
			queryParams_e99d9a12_bfec_46cc_83f8_0ef2ab43774e.split(',')
		const jsonObj_e99d9a12_bfec_46cc_83f8_0ef2ab43774e = {}
		for (let pair of pairs_e99d9a12_bfec_46cc_83f8_0ef2ab43774e) {
			const [key, value] = pair.split(':')
			jsonObj_e99d9a12_bfec_46cc_83f8_0ef2ab43774e[key] = value
		}
		const createQueryString_e99d9a12_bfec_46cc_83f8_0ef2ab43774e = (
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

		let output_e99d9a12_bfec_46cc_83f8_0ef2ab43774e
		try {
			output_e99d9a12_bfec_46cc_83f8_0ef2ab43774e = await axios
				.get(
					`${
						CallRESTAPIEndpoint_e99d9a12_bfec_46cc_83f8_0ef2ab43774e.secrets
							.AMADEUS_API_BASE_URL
					}/v1/reference-data/locations?keyword=${
						CallRESTAPIEndpoint_e99d9a12_bfec_46cc_83f8_0ef2ab43774e.params
							.query.keyword
					}&subType=${
						CallRESTAPIEndpoint_e99d9a12_bfec_46cc_83f8_0ef2ab43774e.params
							.query.subType
					}&${createQueryString_e99d9a12_bfec_46cc_83f8_0ef2ab43774e(
						jsonObj_e99d9a12_bfec_46cc_83f8_0ef2ab43774e
					)}`,
					{
						headers: {
							Authorization: `Bearer ${CallRESTAPIEndpoint_e99d9a12_bfec_46cc_83f8_0ef2ab43774e.input.access_token}`,
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
		const RunJavaScriptCode_47715149_8058_43d5_b67c_0dcdceba989a = {
			input: output_e99d9a12_bfec_46cc_83f8_0ef2ab43774e,
			params: request_2ad0588f_2052_474d_ab5a_b6b1906e10fd,
			secrets: process.env,
		}
		const rjc_47715149_8058_43d5_b67c_0dcdceba989a =
			RunJavaScriptCode_47715149_8058_43d5_b67c_0dcdceba989a

		const runJavascriptCode_47715149_8058_43d5_b67c_0dcdceba989a =
			async function () {
				const responseData = (res) => {
					const city = res.meta.links.self.split('keyword=')[1]
					if (res.data.length) {
						let mappedResponse = []
						for (let data of res.data) {
							const {
								cityName,
								cityCode,
								countryCode,
								countryName,
								stateCode,
								regionCode,
							} = data?.address
							mappedResponse = [
								...mappedResponse,
								{
									name: data?.name,
									detailedName: data?.detailedName,
									timeZoneOffset: data?.timeZoneOffset,
									iataCode: data?.iataCode,
									cityName,
									cityCode,
									countryName,
									countryCode,
									stateCode,
									regionCode,
								},
							]
						}
						return { data: mappedResponse }
					} else
						throw new Error(
							`Didn't found any Airport for City ${city}, Please check for any other city near you.`
						)
				}
				return responseData(rjc_47715149_8058_43d5_b67c_0dcdceba989a.input)
			}
		const output_47715149_8058_43d5_b67c_0dcdceba989a =
			await runJavascriptCode_47715149_8058_43d5_b67c_0dcdceba989a()
		const ReturnSuccessResponse_756f13cc_f884_4ffd_b563_9a22a3eac22d = {
			output: output_47715149_8058_43d5_b67c_0dcdceba989a,
			params: request_2ad0588f_2052_474d_ab5a_b6b1906e10fd,
			secrets: process.env,
		}
		const updatedReturnSuccessResponse = {
			...ReturnSuccessResponse_756f13cc_f884_4ffd_b563_9a22a3eac22d,
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
		const ReturnErrorResponse_a04a9c62_b550_4f9b_968e_516946f2cf7b = {}
		const createErrorData_a04a9c62_b550_4f9b_968e_516946f2cf7b =
			ReturnErrorResponse_a04a9c62_b550_4f9b_968e_516946f2cf7b
		delete createErrorData_a04a9c62_b550_4f9b_968e_516946f2cf7b.params
		delete createErrorData_a04a9c62_b550_4f9b_968e_516946f2cf7b.secrets
		return res
			.status(400)
			.json(
				Object.keys(createErrorData_a04a9c62_b550_4f9b_968e_516946f2cf7b).length
					? createErrorData_a04a9c62_b550_4f9b_968e_516946f2cf7b
					: error
			)
	}
}

module.exports = {
	getairportbycityname,
}
