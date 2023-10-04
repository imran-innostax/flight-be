const { logToDatabase } = require('../helpers')
const mongoose = require('mongoose')

const schema = async (req, res, next) => {
	try {
		const request_591282d8_fffc_45b3_ae19_6c9c596b7fa1 = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const GetRecordValue_1277d0c8_b5ad_4763_aba8_c4818c9b1935 = {
			input: request_591282d8_fffc_45b3_ae19_6c9c596b7fa1,
			params: request_591282d8_fffc_45b3_ae19_6c9c596b7fa1,
			secrets: process.env,
		}
		const pickedValue_1277d0c8_b5ad_4763_aba8_c4818c9b1935 =
			GetRecordValue_1277d0c8_b5ad_4763_aba8_c4818c9b1935.input.body
		const CreateRecordfromSchema_910962f2_220f_49a9_ab76_a0dfac5e8aaf = {
			input: pickedValue_1277d0c8_b5ad_4763_aba8_c4818c9b1935,
			params: request_591282d8_fffc_45b3_ae19_6c9c596b7fa1,
			secrets: process.env,
		}
		const inputData_910962f2_220f_49a9_ab76_a0dfac5e8aaf = {
			schemaDefinition: `{"name":""}`,
			toModelName: `users`,
			document:
				CreateRecordfromSchema_910962f2_220f_49a9_ab76_a0dfac5e8aaf.input,
		}
		const schemaDef_910962f2_220f_49a9_ab76_a0dfac5e8aaf =
			typeof inputData_910962f2_220f_49a9_ab76_a0dfac5e8aaf.schemaDefinition ===
			'string'
				? JSON.parse(
						inputData_910962f2_220f_49a9_ab76_a0dfac5e8aaf.schemaDefinition ||
							'{}'
				  )
				: inputData_910962f2_220f_49a9_ab76_a0dfac5e8aaf.schemaDefinition
		const schemaDefinition_910962f2_220f_49a9_ab76_a0dfac5e8aaf = {}
		for (const key in schemaDef_910962f2_220f_49a9_ab76_a0dfac5e8aaf)
			schemaDefinition_910962f2_220f_49a9_ab76_a0dfac5e8aaf[key] = String
		const ModelDataSchema_910962f2_220f_49a9_ab76_a0dfac5e8aaf =
			new mongoose.Schema(
				schemaDefinition_910962f2_220f_49a9_ab76_a0dfac5e8aaf,
				{
					strict: Object.keys(
						schemaDefinition_910962f2_220f_49a9_ab76_a0dfac5e8aaf
					).length,
				}
			)
		const dataModel_910962f2_220f_49a9_ab76_a0dfac5e8aaf =
			mongoose.models[
				inputData_910962f2_220f_49a9_ab76_a0dfac5e8aaf.toModelName
			] ||
			mongoose.model(
				inputData_910962f2_220f_49a9_ab76_a0dfac5e8aaf.toModelName,
				ModelDataSchema_910962f2_220f_49a9_ab76_a0dfac5e8aaf
			)
		const document_910962f2_220f_49a9_ab76_a0dfac5e8aaf =
			typeof inputData_910962f2_220f_49a9_ab76_a0dfac5e8aaf.document ===
			'string'
				? JSON.parse(inputData_910962f2_220f_49a9_ab76_a0dfac5e8aaf.document)
				: inputData_910962f2_220f_49a9_ab76_a0dfac5e8aaf.document
		const output_910962f2_220f_49a9_ab76_a0dfac5e8aaf =
			await dataModel_910962f2_220f_49a9_ab76_a0dfac5e8aaf
				.insertMany(document_910962f2_220f_49a9_ab76_a0dfac5e8aaf)
				.then((res) => 'Data Inserted Successfully')
				.catch((err) => {
					throw new Error('Failed to insert data', err)
				})
		const ReturnSuccessResponse_8ab0f445_04da_4072_9358_3ee0040deb64 = {
			output: output_910962f2_220f_49a9_ab76_a0dfac5e8aaf,
			params: request_591282d8_fffc_45b3_ae19_6c9c596b7fa1,
			secrets: process.env,
		}
		const updatedReturnSuccessResponse = {
			...ReturnSuccessResponse_8ab0f445_04da_4072_9358_3ee0040deb64,
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
	schema,
}
