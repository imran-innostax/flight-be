const prismaClient = require('../prismaClient')
const { prisma } = prismaClient
const createOrReplaceProcedures = async () => {
	const SQLQuery_f6429105_25df_434d_a780_59eb74b46a01_drop_function =
		await prisma.$queryRaw`DROP FUNCTION IF EXISTS function_f6429105_25df_434d_a780_59eb74b46a01;`
	const SQLQuery_f6429105_25df_434d_a780_59eb74b46a01_create_function =
		await prisma.$queryRaw`CREATE OR REPLACE FUNCTION function_f6429105_25df_434d_a780_59eb74b46a01(paramsquerysearch character varying,paramsquerylimit character varying) RETURNS  TABLE (TAVA_id text,TAVA_iata varchar,TAVA_cityName varchar,TAVA_airportName varchar,TAVA_country varchar,TAVA_countryCode varchar,TAVA_icon varchar) as $$ BEGIN RETURN QUERY SELECT * FROM "locations" WHERE "airportName" LIKE '%' || LOWER(CAST (paramsquerysearch AS character varying)) || '%' OR LOWER("cityName") LIKE '%' || LOWER(CAST (paramsquerysearch AS character varying)) || '%' OR LOWER("country") LIKE '%' || LOWER(CAST (paramsquerysearch AS character varying)) || '%' OR LOWER("countryCode") LIKE '%' || LOWER(CAST (paramsquerysearch AS character varying)) || '%' OR LOWER("iata") LIKE '%' || LOWER(CAST (paramsquerysearch AS character varying)) || '%' OR LOWER("icon") LIKE '%' || LOWER(CAST (paramsquerysearch AS character varying)) || '%' LIMIT CAST (paramsquerylimit AS integer);  END; $$ LANGUAGE plpgsql;`
}
module.exports = { createOrReplaceProcedures }
