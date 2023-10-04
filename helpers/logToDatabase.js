const prismaClient = require('../prismaClient')
const { prisma } = prismaClient
const { getUrlAndParams } = require('./getUrlAndParams')
const { hasBookingIdColumnExist } = require('./hasBookingIdColumnExist')

const REQUEST = 'Request'
const ERROR = 'Error'

const logToDatabase = async (corelationId, logType, url, res) => {
	let bookingId = '0'
	const hasBookingIdColumn = await hasBookingIdColumnExist()

	if (url === '/payment' && logType === REQUEST)
		bookingId = res?.body?.bookingId
	if (!url.includes('/logs')) {
		let request = {}
		let response = {}
		let serviceType

		if (!res?.config) {
			serviceType = url
			request = {
				url: res?.url,
				method: res?.method,
				requestData: res?.body,
			}
			if (res.params) {
				request = {
					...request,
					params: res?.params,
				}
			}
			response = {
				status: res?.status,
				response: res?.data,
			}
		} else {
			const { serviceName, params } = getUrlAndParams(res?.config?.url)
			serviceType = `${url} : /${serviceName}`
			const status = logType.includes(ERROR)
				? res?.response?.status
				: res?.status
			response = {
				status: status,
				response: logType.includes(ERROR) ? res?.response?.data : res?.data,
			}
			request = {
				url: res?.config?.url,
				method: res?.config?.method,
				requestData: res?.config?.data || params,
			}
		}

		let data = {
			corelationId: corelationId,
			date: new Date(),
			serviceType,
			logType: logType,
			log: {
				data: logType.includes(REQUEST) ? request : response,
			},
		}

		if (hasBookingIdColumn)
			data = {
				...data,
				bookingId: bookingId,
			}

		await prisma.logging.create({ data })
	}
}

module.exports = { logToDatabase }
