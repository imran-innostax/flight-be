const { logToDatabase } = require('../helpers')
const mongoose = require('mongoose')

const getdata = async (req, res, next) => {
	try {
		const request_09d796ee_8836_4740_9500_6ea63adfc96d = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const GetMultiRecords_df364e85_934e_480f_aece_a8ec55c97f9f = {
			input: request_09d796ee_8836_4740_9500_6ea63adfc96d,
			params: request_09d796ee_8836_4740_9500_6ea63adfc96d,
			secrets: process.env,
		}
		const inputData_df364e85_934e_480f_aece_a8ec55c97f9f = {
			modelName:
				GetMultiRecords_df364e85_934e_480f_aece_a8ec55c97f9f.params.query
					.modelname,
			page: GetMultiRecords_df364e85_934e_480f_aece_a8ec55c97f9f.params.query
				.page,
			size: GetMultiRecords_df364e85_934e_480f_aece_a8ec55c97f9f.params.query
				.size,
		}
		const page_df364e85_934e_480f_aece_a8ec55c97f9f =
			parseInt(inputData_df364e85_934e_480f_aece_a8ec55c97f9f.page) || 1
		const size_df364e85_934e_480f_aece_a8ec55c97f9f =
			parseInt(inputData_df364e85_934e_480f_aece_a8ec55c97f9f.size) || 10

		const skip_df364e85_934e_480f_aece_a8ec55c97f9f =
			(page_df364e85_934e_480f_aece_a8ec55c97f9f - 1) *
			size_df364e85_934e_480f_aece_a8ec55c97f9f
		const ModelDataSchema_df364e85_934e_480f_aece_a8ec55c97f9f =
			new mongoose.Schema({}, { strict: false })

		const dataModel_df364e85_934e_480f_aece_a8ec55c97f9f =
			mongoose.models[
				inputData_df364e85_934e_480f_aece_a8ec55c97f9f.modelName
			] ||
			mongoose.model(
				inputData_df364e85_934e_480f_aece_a8ec55c97f9f.modelName,
				ModelDataSchema_df364e85_934e_480f_aece_a8ec55c97f9f
			)
		const data_df364e85_934e_480f_aece_a8ec55c97f9f =
			await dataModel_df364e85_934e_480f_aece_a8ec55c97f9f
				.find()
				.skip(skip_df364e85_934e_480f_aece_a8ec55c97f9f)
				.limit(inputData_df364e85_934e_480f_aece_a8ec55c97f9f.size)
		const total_df364e85_934e_480f_aece_a8ec55c97f9f =
			await dataModel_df364e85_934e_480f_aece_a8ec55c97f9f.countDocuments()

		const output_df364e85_934e_480f_aece_a8ec55c97f9f = {
			total: total_df364e85_934e_480f_aece_a8ec55c97f9f,
			page: page_df364e85_934e_480f_aece_a8ec55c97f9f,
			data: data_df364e85_934e_480f_aece_a8ec55c97f9f,
		}
		const ReturnSuccessResponse_3fdc5742_150a_4182_b20f_715f03a4043b = {
			output: output_df364e85_934e_480f_aece_a8ec55c97f9f,
			params: request_09d796ee_8836_4740_9500_6ea63adfc96d,
			secrets: process.env,
		}
		const updatedReturnSuccessResponse = {
			...ReturnSuccessResponse_3fdc5742_150a_4182_b20f_715f03a4043b,
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
		const ReturnErrorResponse_ffb3d3a0_3d63_4c78_8503_73f3bc530d8c = {}
		const createErrorData_ffb3d3a0_3d63_4c78_8503_73f3bc530d8c =
			ReturnErrorResponse_ffb3d3a0_3d63_4c78_8503_73f3bc530d8c
		delete createErrorData_ffb3d3a0_3d63_4c78_8503_73f3bc530d8c.params
		delete createErrorData_ffb3d3a0_3d63_4c78_8503_73f3bc530d8c.secrets
		return res
			.status(400)
			.json(
				Object.keys(createErrorData_ffb3d3a0_3d63_4c78_8503_73f3bc530d8c).length
					? createErrorData_ffb3d3a0_3d63_4c78_8503_73f3bc530d8c
					: error
			)
	}
}

module.exports = {
	getdata,
}
