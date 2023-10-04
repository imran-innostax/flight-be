const { logToDatabase } = require('../helpers')
const aws = require('aws-sdk')

const athena = async (req, res, next) => {
	try {
		const request_591282d8_fffc_45b3_ae19_6c9c596b7fa1 = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const Athena_b5529ed6_cf67_42a9_bc82_36d80ac255dc = {
			input: request_591282d8_fffc_45b3_ae19_6c9c596b7fa1,
			params: request_591282d8_fffc_45b3_ae19_6c9c596b7fa1,
			secrets: process.env,
		}
		const amazonAthena_b5529ed6_cf67_42a9_bc82_36d80ac255dc =
			async function () {
				const queryData = {
					databaseName:
						Athena_b5529ed6_cf67_42a9_bc82_36d80ac255dc.params.query.awsdbaname,
					outputLocation:
						Athena_b5529ed6_cf67_42a9_bc82_36d80ac255dc.params.query.location,
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

		const output_b5529ed6_cf67_42a9_bc82_36d80ac255dc =
			await amazonAthena_b5529ed6_cf67_42a9_bc82_36d80ac255dc()
		const ReturnSuccessResponse_61cde620_3c0f_48dc_ab9f_318ef468c3d1 = {
			output: output_b5529ed6_cf67_42a9_bc82_36d80ac255dc,
			params: request_591282d8_fffc_45b3_ae19_6c9c596b7fa1,
			secrets: process.env,
		}
		const updatedReturnSuccessResponse = {
			...ReturnSuccessResponse_61cde620_3c0f_48dc_ab9f_318ef468c3d1,
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
		const ReturnErrorResponse_6be77aeb_5dc4_4237_999c_b6c129816a7a = {}
		const createErrorData_6be77aeb_5dc4_4237_999c_b6c129816a7a =
			ReturnErrorResponse_6be77aeb_5dc4_4237_999c_b6c129816a7a
		delete createErrorData_6be77aeb_5dc4_4237_999c_b6c129816a7a.params
		delete createErrorData_6be77aeb_5dc4_4237_999c_b6c129816a7a.secrets
		return res
			.status(400)
			.json(
				Object.keys(createErrorData_6be77aeb_5dc4_4237_999c_b6c129816a7a).length
					? createErrorData_6be77aeb_5dc4_4237_999c_b6c129816a7a
					: error
			)
	}
}

module.exports = {
	athena,
}
