const { PrismaClient } = require('@prisma/client')

const establishDBConnection = () => {
	const { DATABASE_URL } = process.env
	const newPrisma = new PrismaClient({
		datasources: {
			db: {
				url: DATABASE_URL,
			},
		},
	})
	return newPrisma
}

const hasBookingIdColumnExist = async () => {
	const dbInstance = establishDBConnection()
	try {
		const columns = await dbInstance.$queryRawUnsafe(
			`SELECT column_name FROM information_schema.columns WHERE table_name = 'logging';`
		)
		const hasBookingIdColumn = columns.some(
			(column) => column.column_name === 'bookingId'
		)
		await dbInstance.$disconnect()
		return hasBookingIdColumn
	} catch (err) {
		await dbInstance.$disconnect()
		throw new Error(
			err.meta ? err.meta.message : 'Currently Database status is Inactive'
		)
	}
}

module.exports = { hasBookingIdColumnExist }
