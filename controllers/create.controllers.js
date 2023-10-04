const { logToDatabase } = require('../helpers')
const mongoose = require('mongoose')

const createmongo = async (req, res, next) => {
	try {
		const request_09d796ee_8836_4740_9500_6ea63adfc96d = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const GetRecordValue_d09adebf_08f9_4e7c_adcb_5a5161746638 = {
			input: request_09d796ee_8836_4740_9500_6ea63adfc96d,
			params: request_09d796ee_8836_4740_9500_6ea63adfc96d,
			secrets: process.env,
		}
		const pickedValue_d09adebf_08f9_4e7c_adcb_5a5161746638 =
			GetRecordValue_d09adebf_08f9_4e7c_adcb_5a5161746638.input.body
		const CreateRecord_eb475736_6166_40f1_a7e6_bbf61ab9ad4b = {
			input: pickedValue_d09adebf_08f9_4e7c_adcb_5a5161746638,
			params: request_09d796ee_8836_4740_9500_6ea63adfc96d,
			secrets: process.env,
		}
		const inputData_eb475736_6166_40f1_a7e6_bbf61ab9ad4b = {
			modelName:
				CreateRecord_eb475736_6166_40f1_a7e6_bbf61ab9ad4b.params.query
					.modelname,
			data: CreateRecord_eb475736_6166_40f1_a7e6_bbf61ab9ad4b.input,
		}
		const ModelDataSchema_eb475736_6166_40f1_a7e6_bbf61ab9ad4b =
			new mongoose.Schema({}, { strict: false })

		const dataModel_eb475736_6166_40f1_a7e6_bbf61ab9ad4b =
			mongoose.models[
				inputData_eb475736_6166_40f1_a7e6_bbf61ab9ad4b.modelName
			] ||
			mongoose.model(
				inputData_eb475736_6166_40f1_a7e6_bbf61ab9ad4b.modelName,
				ModelDataSchema_eb475736_6166_40f1_a7e6_bbf61ab9ad4b
			)
		let output_eb475736_6166_40f1_a7e6_bbf61ab9ad4b =
			await dataModel_eb475736_6166_40f1_a7e6_bbf61ab9ad4b
				.insertMany(inputData_eb475736_6166_40f1_a7e6_bbf61ab9ad4b.data)
				.then((res) => res)
				.catch((err) => {
					throw new Error('Failed to insert data', err)
				})
		const ReturnSuccessResponse_ccb82e74_c34a_4100_bee4_293aa0ecc7e0 = {
			output: output_eb475736_6166_40f1_a7e6_bbf61ab9ad4b,
			params: request_09d796ee_8836_4740_9500_6ea63adfc96d,
			secrets: process.env,
		}
		const updatedReturnSuccessResponse = {
			...ReturnSuccessResponse_ccb82e74_c34a_4100_bee4_293aa0ecc7e0,
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
		const ReturnErrorResponse_a7978e3d_5f09_4192_af52_2e2e55a9a563 = {}
		const createErrorData_a7978e3d_5f09_4192_af52_2e2e55a9a563 =
			ReturnErrorResponse_a7978e3d_5f09_4192_af52_2e2e55a9a563
		delete createErrorData_a7978e3d_5f09_4192_af52_2e2e55a9a563.params
		delete createErrorData_a7978e3d_5f09_4192_af52_2e2e55a9a563.secrets
		return res
			.status(400)
			.json(
				Object.keys(createErrorData_a7978e3d_5f09_4192_af52_2e2e55a9a563).length
					? createErrorData_a7978e3d_5f09_4192_af52_2e2e55a9a563
					: error
			)
	}
}

module.exports = {
	createmongo,
}
