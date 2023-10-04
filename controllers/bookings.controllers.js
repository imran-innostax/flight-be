const { logToDatabase } = require('../helpers')
const prismaClient = require('../prismaClient')
const { prisma } = prismaClient

const bookings = async (req, res, next) => {
	try {
		const request_05c43472_6c7a_4bfa_8b90_be30d34eaa2c = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const RunJavaScriptCode_0adfe5a1_d9cb_473d_8336_cd8681d413b8 = {
			input: request_05c43472_6c7a_4bfa_8b90_be30d34eaa2c,
			params: request_05c43472_6c7a_4bfa_8b90_be30d34eaa2c,
			secrets: process.env,
		}
		const rjc_0adfe5a1_d9cb_473d_8336_cd8681d413b8 =
			RunJavaScriptCode_0adfe5a1_d9cb_473d_8336_cd8681d413b8

		const runJavascriptCode_0adfe5a1_d9cb_473d_8336_cd8681d413b8 =
			async function () {
				const paginate = (pageNumber, limit, data) => {
					if (!pageNumber) pageNumber = 1

					if (!limit) limit = 20

					let startIndex = (pageNumber - 1) * limit
					let lastIndex = startIndex + Number(limit)

					const paginatedData = data.slice(startIndex, lastIndex)
					return paginatedData
				}
				const filteredBookings = async (data) => {
					let bookings
					let {
						pageNumber,
						limit,
						bookingStatus,
						orderType,
						createdAtStart,
						createdAtEnd,
						originIata,
						destIata,
						departDateStart,
						departDateEnd,
						paidAmountEnd,
						paidAmountStart,
						orderId,
					} = data.query
					if (createdAtStart && createdAtEnd) {
						createdAtStart = new Date(
							new Date(createdAtStart).setDate(
								new Date(createdAtStart).getDate() + 1
							)
						)
							.toISOString()
							.split('T')[0]
						createdAtEnd = new Date(
							new Date(createdAtEnd).setDate(
								new Date(createdAtEnd).getDate() + 1
							)
						)
							.toISOString()
							.split('T')[0]

						bookings = await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
							`SELECT * FROM "Booking" where "createdAt" between '${createdAtStart}' and '${createdAtEnd}'`
						)}`
					} else
						bookings = await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
							`SELECT * FROM "Booking" ORDER BY "createdAt" DESC `
						)}`

					if (bookingStatus && orderType)
						bookings = bookings.filter(
							(order) =>
								order.status === bookingStatus && order.orderType === orderType
						)

					if (bookingStatus || orderType)
						bookings = bookings.filter(
							(order) =>
								order.status === bookingStatus || order.orderType === orderType
						)

					if (orderId) {
						bookings = bookings.filter((order) =>
							order.orderId.includes(orderId)
						)
					}

					let bookingsWithValidItieneraryData = []
					for (const booking of bookings) {
						let mappedItinerariesData = []
						let itineraries =
							await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
								`SELECT * FROM "Itinerary" WHERE "bookingId" = '${booking.id}';`
							)}`
						for (const Itinerary of itineraries) {
							let routes = []
							if (departDateStart && departDateEnd) {
								departDateStart = departDateStart.split('T')[0]
								departDateEnd = departDateEnd.split('T')[0]

								routes =
									await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
										`SELECT * FROM "Route" where "itineraryId" = '${Itinerary.id}' AND "departAt" between '${departDateStart}' and '${departDateEnd}' ORDER BY "routeId" ASC`
									)}`
							} else if (!routes.length)
								routes =
									await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
										`SELECT * FROM "Route" where "itineraryId" = '${Itinerary.id}' ORDER BY "routeId" ASC`
									)}`

							if (originIata && routes.length) {
								if (routes[0].departIataCode !== originIata) routes = []
							}

							if (destIata && routes.length) {
								if (routes[routes.length - 1].arrivalIataCode !== destIata)
									routes = []
							}

							if (routes.length) mappedItinerariesData.push({ routes })
						}

						if (mappedItinerariesData.length) {
							let price =
								await prisma.$queryRaw`${prismaClient.PrismaInstance.raw(
									`SELECT * FROM "Price" WHERE "bookingId" = '${booking.id}';`
								)}`

							booking.itineraries = mappedItinerariesData
							booking.price = price[0]
							bookingsWithValidItieneraryData = [
								...bookingsWithValidItieneraryData,
								booking,
							]
						}
					}

					if (paidAmountStart && paidAmountEnd) {
						bookingsWithValidItieneraryData =
							bookingsWithValidItieneraryData.filter(
								(bookingData) =>
									Number(bookingData.price.grandTotal) >=
										Number(paidAmountStart) &&
									Number(bookingData.price.grandTotal) <= Number(paidAmountEnd)
							)
					}

					const paginatedData = paginate(
						pageNumber,
						limit,
						bookingsWithValidItieneraryData
					)

					const totalCount = bookingsWithValidItieneraryData.length

					const output = { totalCount: totalCount, bookings: paginatedData }
					return output
				}

				return filteredBookings(rjc_0adfe5a1_d9cb_473d_8336_cd8681d413b8.input)
			}
		const output_0adfe5a1_d9cb_473d_8336_cd8681d413b8 =
			await runJavascriptCode_0adfe5a1_d9cb_473d_8336_cd8681d413b8()
		const ReturnSuccessResponse_bd24bf7d_9a13_47cf_a6b9_e89b534e0e43 = {
			output: output_0adfe5a1_d9cb_473d_8336_cd8681d413b8,
			params: request_05c43472_6c7a_4bfa_8b90_be30d34eaa2c,
			secrets: process.env,
		}
		const updatedReturnSuccessResponse = {
			...ReturnSuccessResponse_bd24bf7d_9a13_47cf_a6b9_e89b534e0e43,
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
	bookings,
}
