const { logToDatabase } = require('../helpers')
const prismaClient = require('../prismaClient')
const { prisma } = prismaClient

const locations = async (req, res, next) => {
	try {
		const request_5269e125_2f77_481d_82fa_1a9338a29fe9 = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const SQLQuery_f6429105_25df_434d_a780_59eb74b46a01 = {
			input: request_5269e125_2f77_481d_82fa_1a9338a29fe9,
			params: request_5269e125_2f77_481d_82fa_1a9338a29fe9,
			secrets: process.env,
		}
		const output_f6429105_25df_434d_a780_59eb74b46a01 =
			await prisma.$queryRaw`SELECT * FROM function_f6429105_25df_434d_a780_59eb74b46a01 (${SQLQuery_f6429105_25df_434d_a780_59eb74b46a01.params.query.search},${SQLQuery_f6429105_25df_434d_a780_59eb74b46a01.params.query.limit});`
		const RunJavaScriptCode_ad07b93a_f827_4de0_9937_93094f1eb2f7 = {
			input: output_f6429105_25df_434d_a780_59eb74b46a01,
			params: request_5269e125_2f77_481d_82fa_1a9338a29fe9,
			secrets: process.env,
		}
		const rjc_ad07b93a_f827_4de0_9937_93094f1eb2f7 =
			RunJavaScriptCode_ad07b93a_f827_4de0_9937_93094f1eb2f7

		const runJavascriptCode_ad07b93a_f827_4de0_9937_93094f1eb2f7 =
			async function () {
				const mappedResponse =
					rjc_ad07b93a_f827_4de0_9937_93094f1eb2f7.input.map((res) => {
						return {
							id: res.tava_id,
							iata: res.tava_iata,
							cityName: res.tava_cityname,
							airportName: res.tava_airportname,
							country: res.tava_country,
							countryCode: res.tava_countrycode,
							icon: res.tava_icon,
						}
					})
				return mappedResponse
			}
		const output_ad07b93a_f827_4de0_9937_93094f1eb2f7 =
			await runJavascriptCode_ad07b93a_f827_4de0_9937_93094f1eb2f7()
		const ReturnSuccessResponse_80abcc19_7ca8_4282_b086_18bc8f2b4506 = {
			output: output_ad07b93a_f827_4de0_9937_93094f1eb2f7,
			params: request_5269e125_2f77_481d_82fa_1a9338a29fe9,
			secrets: process.env,
		}
		const updatedReturnSuccessResponse = {
			...ReturnSuccessResponse_80abcc19_7ca8_4282_b086_18bc8f2b4506,
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
	locations,
}
