const { logToDatabase } = require('../helpers')
const prismaClient = require('../prismaClient')
const { prisma } = prismaClient

const logsdetails = async (req, res, next) => {
	try {
		const request_9393c709_ef6d_4848_83dc_8425985d816a = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const GetMultiRecordsAndCountbyQuery_80733046_21a4_45c4_835b_6d0018147b4d =
			{
				input: request_9393c709_ef6d_4848_83dc_8425985d816a,
				params: request_9393c709_ef6d_4848_83dc_8425985d816a,
				secrets: process.env,
			}
		const parseInputData_80733046_21a4_45c4_835b_6d0018147b4d = (inputData) => {
			const regex = /"(\w+)"\s*=\s*'([^']+)'(?:\s*(AND|OR))?/g
			const output_80733046_21a4_45c4_835b_6d0018147b4d = []
			let match
			while ((match = regex.exec(inputData)) !== null) {
				const [, key, value, operator] = match
				output_80733046_21a4_45c4_835b_6d0018147b4d.push({
					key,
					value,
					operator,
				})
			}
			return output_80733046_21a4_45c4_835b_6d0018147b4d
		}
		const formattedQuery_80733046_21a4_45c4_835b_6d0018147b4d = `"corelationId" = '${GetMultiRecordsAndCountbyQuery_80733046_21a4_45c4_835b_6d0018147b4d.input.query.corelationId}'`
		const outputData_80733046_21a4_45c4_835b_6d0018147b4d =
			parseInputData_80733046_21a4_45c4_835b_6d0018147b4d(
				formattedQuery_80733046_21a4_45c4_835b_6d0018147b4d
			)
		let query_80733046_21a4_45c4_835b_6d0018147b4d = ''
		let preOperator_80733046_21a4_45c4_835b_6d0018147b4d = ''
		outputData_80733046_21a4_45c4_835b_6d0018147b4d.forEach((item) => {
			if (!item.value.includes('undefined')) {
				query_80733046_21a4_45c4_835b_6d0018147b4d += ` ${
					query_80733046_21a4_45c4_835b_6d0018147b4d
						? preOperator_80733046_21a4_45c4_835b_6d0018147b4d
						: ''
				} "${item.key}" = '${item.value}'`
			}
			preOperator_80733046_21a4_45c4_835b_6d0018147b4d = item.operator
		})
		const isFormattedQueryExist_80733046_21a4_45c4_835b_6d0018147b4d =
			query_80733046_21a4_45c4_835b_6d0018147b4d
				? `WHERE ${query_80733046_21a4_45c4_835b_6d0018147b4d}`
				: ''
		const sortObj = {}
		const size = parseInt(req.query.size) || 10
		const page = parseInt(req.query.page) || 1
		const skip = (page - 1) * size
		const getMultiRecordsAndCount = await prisma.$queryRawUnsafe(
			`SELECT * FROM "logging" ${isFormattedQueryExist_80733046_21a4_45c4_835b_6d0018147b4d} LIMIT ${size} OFFSET ${skip};`
		)
		let rowsCount = await prisma.$queryRawUnsafe(
			`SELECT count(*) from "logging" ${isFormattedQueryExist_80733046_21a4_45c4_835b_6d0018147b4d}`
		)
		rowsCount = Number(rowsCount[0].count)
		const {
			result_80733046_21a4_45c4_835b_6d0018147b4d,
			countInfo_80733046_21a4_45c4_835b_6d0018147b4d,
		} = {
			countInfo_80733046_21a4_45c4_835b_6d0018147b4d: {
				count: rowsCount,
				totalPage: Math.ceil(rowsCount / size),
				currentPage: page,
				size: size,
			},
			result_80733046_21a4_45c4_835b_6d0018147b4d: getMultiRecordsAndCount,
		}
		const ReturnSuccessResponse_1e7b8f0f_ba61_417f_bda6_0c619f853bb7 = {
			countInfo: countInfo_80733046_21a4_45c4_835b_6d0018147b4d,
			params: request_9393c709_ef6d_4848_83dc_8425985d816a,
			secrets: process.env,
			result: result_80733046_21a4_45c4_835b_6d0018147b4d,
		}
		const updatedReturnSuccessResponse = {
			...ReturnSuccessResponse_1e7b8f0f_ba61_417f_bda6_0c619f853bb7,
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
		const ReturnErrorResponse_c2d25f6b_3571_4dc4_9441_c96a951cb524 = {}
		const createErrorData_c2d25f6b_3571_4dc4_9441_c96a951cb524 =
			ReturnErrorResponse_c2d25f6b_3571_4dc4_9441_c96a951cb524
		delete createErrorData_c2d25f6b_3571_4dc4_9441_c96a951cb524.params
		delete createErrorData_c2d25f6b_3571_4dc4_9441_c96a951cb524.secrets
		return res
			.status(400)
			.json(
				Object.keys(createErrorData_c2d25f6b_3571_4dc4_9441_c96a951cb524).length
					? createErrorData_c2d25f6b_3571_4dc4_9441_c96a951cb524
					: error
			)
	}
}

module.exports = {
	logsdetails,
}
