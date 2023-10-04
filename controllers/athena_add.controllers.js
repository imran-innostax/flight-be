const { logToDatabase } = require('../helpers')
const mongoose = require('mongoose')
const aws = require('aws-sdk')

const storeathna = async (req, res, next) => {
	try {
		const request_591282d8_fffc_45b3_ae19_6c9c596b7fa1 = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const Athena_c3f7a31f_c986_4531_b6d1_f07537b6ccb2 = {
			input: request_591282d8_fffc_45b3_ae19_6c9c596b7fa1,
			params: request_591282d8_fffc_45b3_ae19_6c9c596b7fa1,
			secrets: process.env,
		}
		const amazonAthena_c3f7a31f_c986_4531_b6d1_f07537b6ccb2 =
			async function () {
				const queryData = {
					databaseName:
						Athena_c3f7a31f_c986_4531_b6d1_f07537b6ccb2.params.query.awsdbaname,
					outputLocation:
						Athena_c3f7a31f_c986_4531_b6d1_f07537b6ccb2.params.query.location,
					sqlQuery: `SELECT * FROM himanshuathena limit 10;`,
				}
				aws.config.update({
					accessKeyId: process.env.AWS_ACCESS_KEY_ID,
					secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
					region: process.env.AWS_REGION,
					signatureVersion: process.env.AWS_SIGNATURE_VERSION,
				})

				const athena = new aws.Athena()

				const params = {
					QueryString: queryData.sqlQuery,
					QueryExecutionContext: { Database: queryData.databaseName },
					ResultConfiguration: { OutputLocation: queryData.outputLocation },
				}

				let formattedData = ''
				try {
					const executeAthenaQuery = async (params) => {
						try {
							const data = await athena.startQueryExecution(params).promise()
							const queryExecutionId = data.QueryExecutionId
							const MAX_TRIES = 10
							let tryCount = 0
							while (tryCount < MAX_TRIES) {
								try {
									const queryExecutionStatus = await athena
										.getQueryExecution({ QueryExecutionId: queryExecutionId })
										.promise()

									const status =
										queryExecutionStatus.QueryExecution.Status.State

									if (status === 'SUCCEEDED') {
										const queryResults = await athena
											.getQueryResults({ QueryExecutionId: queryExecutionId })
											.promise()

										formattedData = queryResults.ResultSet.Rows
										const keyVal = formattedData[0].Data.map(
											(item) => item.VarCharValue
										)
										formattedData = formattedData.slice(1).map((item) => {
											const newObj = {}
											item.Data.forEach(
												(value, index) =>
													(newObj[keyVal[index]] = value.VarCharValue)
											)
											return newObj
										})
										return formattedData
									} else if (status === 'FAILED' || status === 'CANCELLED')
										throw new Error(
											`Query execution failed or was cancelled. Status: ${status}`
										)
								} catch (err) {
									console.error('Error getting query execution status:', err)
								}
								tryCount++
								await new Promise((resolve) => setTimeout(resolve, 5000))
							}
							throw new Error(
								`Query execution did not succeed after ${MAX_TRIES} tries.`
							)
						} catch (err) {
							console.error('Error starting query execution:', err)
							throw err
						}
					}
					await executeAthenaQuery(params)
				} catch (error) {
					console.error('Error querying Athena:', error)
					throw error
				}
				return formattedData
			}

		const output_c3f7a31f_c986_4531_b6d1_f07537b6ccb2 =
			await amazonAthena_c3f7a31f_c986_4531_b6d1_f07537b6ccb2()
		const CreateRecord_ffe83f11_d2c8_47a3_a7f8_ebadffae9abd = {
			input: output_c3f7a31f_c986_4531_b6d1_f07537b6ccb2,
			params: request_591282d8_fffc_45b3_ae19_6c9c596b7fa1,
			secrets: process.env,
		}
		const inputData_ffe83f11_d2c8_47a3_a7f8_ebadffae9abd = {
			modelName:
				CreateRecord_ffe83f11_d2c8_47a3_a7f8_ebadffae9abd.params.query
					.modelname,
			data: CreateRecord_ffe83f11_d2c8_47a3_a7f8_ebadffae9abd.input,
		}
		const ModelDataSchema_ffe83f11_d2c8_47a3_a7f8_ebadffae9abd =
			new mongoose.Schema({}, { strict: false })

		const dataModel_ffe83f11_d2c8_47a3_a7f8_ebadffae9abd =
			mongoose.models[
				inputData_ffe83f11_d2c8_47a3_a7f8_ebadffae9abd.modelName
			] ||
			mongoose.model(
				inputData_ffe83f11_d2c8_47a3_a7f8_ebadffae9abd.modelName,
				ModelDataSchema_ffe83f11_d2c8_47a3_a7f8_ebadffae9abd
			)
		let output_ffe83f11_d2c8_47a3_a7f8_ebadffae9abd =
			await dataModel_ffe83f11_d2c8_47a3_a7f8_ebadffae9abd
				.insertMany(inputData_ffe83f11_d2c8_47a3_a7f8_ebadffae9abd.data)
				.then((res) => res)
				.catch((err) => {
					throw new Error('Failed to insert data', err)
				})
		const ReturnSuccessResponse_0ebad361_7eab_4dc0_923c_221a1855939f = {
			output: output_ffe83f11_d2c8_47a3_a7f8_ebadffae9abd,
			params: request_591282d8_fffc_45b3_ae19_6c9c596b7fa1,
			secrets: process.env,
		}
		const updatedReturnSuccessResponse = {
			...ReturnSuccessResponse_0ebad361_7eab_4dc0_923c_221a1855939f,
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
		const ReturnErrorResponse_763f0552_b2e9_4454_b812_a75f0bb41823 = {}
		const createErrorData_763f0552_b2e9_4454_b812_a75f0bb41823 =
			ReturnErrorResponse_763f0552_b2e9_4454_b812_a75f0bb41823
		delete createErrorData_763f0552_b2e9_4454_b812_a75f0bb41823.params
		delete createErrorData_763f0552_b2e9_4454_b812_a75f0bb41823.secrets
		return res
			.status(400)
			.json(
				Object.keys(createErrorData_763f0552_b2e9_4454_b812_a75f0bb41823).length
					? createErrorData_763f0552_b2e9_4454_b812_a75f0bb41823
					: error
			)
	}
}

module.exports = {
	storeathna,
}
