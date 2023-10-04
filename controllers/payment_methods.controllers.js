const { logToDatabase } = require('../helpers')
const prismaClient = require('../prismaClient')
const { prisma } = prismaClient

const paymentmethods = async (req, res, next) => {
	try {
		const request_7a10fac4_c404_46df_8f5c_d7518d4ca06d = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const GetRecordValue_eebaa1a5_89a3_4b6b_8597_790863027926 = {
			input: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
		}
		const pickedValue_eebaa1a5_89a3_4b6b_8597_790863027926 =
			GetRecordValue_eebaa1a5_89a3_4b6b_8597_790863027926.input.body
		const RunJavaScriptCode_4647d470_f05a_4cbc_9cf7_d41aacd14300 = {
			input: pickedValue_eebaa1a5_89a3_4b6b_8597_790863027926,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
		}
		const rjc_4647d470_f05a_4cbc_9cf7_d41aacd14300 =
			RunJavaScriptCode_4647d470_f05a_4cbc_9cf7_d41aacd14300

		const runJavascriptCode_4647d470_f05a_4cbc_9cf7_d41aacd14300 =
			async function () {
				const updateRequestBody = async (request) => {
					const bookingCount = await prisma.Booking.count()
					const response = {
						flightId: '1',
						bookingDetails: {
							orderId: `TAVA000${bookingCount + 1}`,
							internalSource: request.internalSource,
							flightId: request.journeyDetails[0].id,
						},
						paymentDetails: {
							priceGuaranteeExpiresAt: null, // Duffel, pay later
							paidAt: '2023-07-26T10:45:17Z',
							awaitingPayment: false,
							paymentRequiredBy: '2023-07-29T14:10:55Z',
						},
						journeyDetails: request.journeyDetails.map((flightOffer) => ({
							id: flightOffer.id,
							itineraries: flightOffer.itineraries.map((itinerary) => ({
								segments: itinerary.segments.map((segment) => ({
									departure: {
										iataCode: segment.departure.iataCode,
										terminal: segment.departure.terminal,
										at: segment.departure.at,
									},
									arrival: {
										iataCode: segment.arrival.iataCode,
										terminal: segment.arrival.terminal,
										at: segment.arrival.at,
									},
									carrierCode: segment.carrierCode,
									number: segment.number,
									aircraft: {
										code: '',
									},
									duration: segment.duration,
									id: segment.id,
									numberOfStops: segment.numberOfStops,
									// co2Emissions: segment.co2Emissions.map((emission) => ({
									// 	weight: emission.weight,
									// 	weightUnit: emission.weightUnit,
									// 	cabin: emission.cabin,
									// })),
									travelers: [
										{
											seat: null,
											travelersId: 'string',
										},
									],
								})),
							})),
							price: {
								currency: flightOffer.price.currency,
								basePrice: flightOffer.price.basePrice,
								grandTotal: flightOffer.price.grandTotal,
								fees: flightOffer.price.fees.map(({ amount, type }) => ({
									amount: amount,
									type: type,
								})),
							},
							pricingOptions: {
								includedCheckedBagsOnly:
									flightOffer.pricingOptions.includedCheckedBagsOnly,
							},
							travelerDetails: flightOffer.travelerDetails.map((traveler) => ({
								id: traveler.id,
								phoneNumber: traveler.phoneNumber,
								email: traveler.email,
								dateOfBirth: traveler.dateOfBirth,
								title: traveler.title,
								gender: traveler.gender,
								familyName: traveler.familyName,
								givenName: traveler.givenName,
								travelerType: traveler.travelerType,
								cabinClass: 'business',
								baggages: [
									{
										type: 'checked',
										quantity: 1,
										weight: '',
									},
								],
								fareOption: traveler.fareOption,
								price: {
									currency: traveler.price.currency,
									basePrice: traveler.price.basePrice,
									grandTotal: traveler.price.grandTotal,
									taxes: traveler.price.taxes.map(({ amount, code }) => ({
										amount: amount,
										code: code,
									})),
									refundableTaxes: traveler.price.refundableTaxes,
								},
								documents: traveler.documents,
								fareDetailsBySegment: traveler.fareDetailsBySegment,
							})),
						})),
					}
					return response
				}
				return updateRequestBody(rjc_4647d470_f05a_4cbc_9cf7_d41aacd14300.input)
			}
		const output_4647d470_f05a_4cbc_9cf7_d41aacd14300 =
			await runJavascriptCode_4647d470_f05a_4cbc_9cf7_d41aacd14300()
		const GetRecordValue_ee8ef7ba_62e0_41b6_a1ee_a314129c4a5f = {
			input: output_4647d470_f05a_4cbc_9cf7_d41aacd14300,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
		}
		const pickedValue_ee8ef7ba_62e0_41b6_a1ee_a314129c4a5f =
			GetRecordValue_ee8ef7ba_62e0_41b6_a1ee_a314129c4a5f.input.bookingDetails
		const RunJavaScriptCode_5cfe3516_eb12_4ef6_8cb0_36ea3516b22a = {
			input: pickedValue_ee8ef7ba_62e0_41b6_a1ee_a314129c4a5f,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
		}
		const rjc_5cfe3516_eb12_4ef6_8cb0_36ea3516b22a =
			RunJavaScriptCode_5cfe3516_eb12_4ef6_8cb0_36ea3516b22a

		const runJavascriptCode_5cfe3516_eb12_4ef6_8cb0_36ea3516b22a =
			async function () {
				const booking = rjc_5cfe3516_eb12_4ef6_8cb0_36ea3516b22a.input
				const bookingData = {
					orderId: booking.orderId, //for Tava
					reference: booking.reference || '', // request.data.associatedRecords[0].reference,add later
					orderRef: booking.orderRef || '', // Update after booking
					orderType: booking.orderType || 'INSTANT', /// instant/On Hold
					// createdAt: booking.creationDate || `${Date.now()}`,
					paymentStatus: booking.paymentStatus || 'PENDING',
					supplier: booking.supplier || 'AM',
					status: booking.status || 'PENDING', // Done or Pending due to paylater
					flightInternalSource: booking.internalSource,
					flightOfferId: booking.flightId,
				}
				return bookingData
			}
		const output_5cfe3516_eb12_4ef6_8cb0_36ea3516b22a =
			await runJavascriptCode_5cfe3516_eb12_4ef6_8cb0_36ea3516b22a()
		const CreateSingleRecord_6c320ff1_ee23_49ad_8803_556859c414ab = {
			input: output_5cfe3516_eb12_4ef6_8cb0_36ea3516b22a,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
		}
		const created_6c320ff1_ee23_49ad_8803_556859c414ab =
			await prisma.Booking.create({
				data: CreateSingleRecord_6c320ff1_ee23_49ad_8803_556859c414ab.input,
			})
		const GetRecordValue_d4082944_6095_42d2_b0e9_f7cb4fb335dd = {
			input: output_4647d470_f05a_4cbc_9cf7_d41aacd14300,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
		}
		const pickedValue_d4082944_6095_42d2_b0e9_f7cb4fb335dd =
			GetRecordValue_d4082944_6095_42d2_b0e9_f7cb4fb335dd.input
				.journeyDetails[0].travelerDetails
		const RunJavaScriptCode_f6d8c4ef_5a0c_4f5d_a86c_f4a2790a25ae = {
			input: pickedValue_d4082944_6095_42d2_b0e9_f7cb4fb335dd,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
			booking: created_6c320ff1_ee23_49ad_8803_556859c414ab,
		}
		const rjc_f6d8c4ef_5a0c_4f5d_a86c_f4a2790a25ae =
			RunJavaScriptCode_f6d8c4ef_5a0c_4f5d_a86c_f4a2790a25ae

		const runJavascriptCode_f6d8c4ef_5a0c_4f5d_a86c_f4a2790a25ae =
			async function () {
				return {
					travelerDetails: [...rjc_f6d8c4ef_5a0c_4f5d_a86c_f4a2790a25ae.input],
					booking: rjc_f6d8c4ef_5a0c_4f5d_a86c_f4a2790a25ae.booking,
				}
			}
		const output_f6d8c4ef_5a0c_4f5d_a86c_f4a2790a25ae =
			await runJavascriptCode_f6d8c4ef_5a0c_4f5d_a86c_f4a2790a25ae()
		const RunJavaScriptCode_d72251f4_b9dc_49f5_a45c_36dcc8f0b8d5 = {
			input: output_f6d8c4ef_5a0c_4f5d_a86c_f4a2790a25ae,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
		}
		const rjc_d72251f4_b9dc_49f5_a45c_36dcc8f0b8d5 =
			RunJavaScriptCode_d72251f4_b9dc_49f5_a45c_36dcc8f0b8d5

		const runJavascriptCode_d72251f4_b9dc_49f5_a45c_36dcc8f0b8d5 =
			async function () {
				const updatePassengerData = async (request) => {
					const { travelerDetails, booking } = request
					const passengers = []
					for (let passenger of travelerDetails) {
						const passengerData = await prisma.passenger.create({
							data: {
								passengerId: 'test',
								phone: passenger.phoneNumber,
								email: passenger.email,
								dateOfBirth: passenger.dateOfBirth,
								title: passenger.title,
								gender: passenger.gender,
								firstName: passenger.givenName,
								lastName: passenger.familyName,
								passengerType: passenger.travelerType,
								seatNumber: '',
								bookingId: booking.id,
								// travelType: passenger.travelType,
								// cabinClass: passenger.cabinClass,
								fareOption: passenger.fareOption,
							},
						})
						const { documents, baggages, fareDetailsBySegment } = passenger
						let fareDetails = []
						for (let fareDetail of fareDetailsBySegment) {
							const fareByRoute = {
								routeId: fareDetail.segmentId,
								cabin: fareDetail.cabin,
								fareBasis: fareDetail.fareBasis,
								brandedFare: fareDetail.brandedFare,
								class: fareDetail.class,
								includedCheckedBagsUnit:
									fareDetail.includedCheckedBags.unit || 1,
								includedCheckedBagsWeight:
									fareDetail.includedCheckedBags.weight,
								includedCheckedBagsWeightUnit:
									fareDetail.includedCheckedBags.weightUnit || 'KG',
								passengerId: passengerData.id,
							}

							const fareDetailByRoute = await prisma.fareDetailsByRoute.create({
								data: fareByRoute,
							})
							fareDetails.push(fareDetailByRoute)
						}
						let passengerDocuments = []
						for (let document of documents) {
							const issuanceCountryCode = document.issuanceCountry
							delete document.issuanceCountry
							const documentData = {
								...document,
								issuanceCountryCode,
								passengerId: passengerData.id,
							}
							const passengerDocument = await prisma.Document.create({
								data: documentData,
							})
							passengerDocuments.push(passengerDocument)
						}

						let passengerBaggages = []
						for (let baggage of baggages) {
							const baggageData = {
								...baggage,
								passengerId: passengerData.id,
							}
							const passengerBaggage = await prisma.Baggage.create({
								data: baggageData,
							})
							passengerBaggages.push(passengerBaggage)
						}
						passengers.push({
							...passenger,
							documents: passengerDocuments,
							baggages: passengerBaggages,
							fareDetailsByRoute: fareDetails,
						})
					}
					return passengers
				}
				return updatePassengerData(
					rjc_d72251f4_b9dc_49f5_a45c_36dcc8f0b8d5.input
				)
			}
		const output_d72251f4_b9dc_49f5_a45c_36dcc8f0b8d5 =
			await runJavascriptCode_d72251f4_b9dc_49f5_a45c_36dcc8f0b8d5()
		const GetRecordValue_a3b8d5a1_87fe_48a0_bd7f_dd50a7052dd5 = {
			input: output_4647d470_f05a_4cbc_9cf7_d41aacd14300,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
		}
		const pickedValue_a3b8d5a1_87fe_48a0_bd7f_dd50a7052dd5 =
			GetRecordValue_a3b8d5a1_87fe_48a0_bd7f_dd50a7052dd5.input
				.journeyDetails[0].itineraries
		const RunJavaScriptCode_c59d10b6_7917_403d_90bc_839f60c4f2c2 = {
			booking: created_6c320ff1_ee23_49ad_8803_556859c414ab,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
			input: pickedValue_a3b8d5a1_87fe_48a0_bd7f_dd50a7052dd5,
		}
		const rjc_c59d10b6_7917_403d_90bc_839f60c4f2c2 =
			RunJavaScriptCode_c59d10b6_7917_403d_90bc_839f60c4f2c2

		const runJavascriptCode_c59d10b6_7917_403d_90bc_839f60c4f2c2 =
			async function () {
				return {
					itineraries: [...rjc_c59d10b6_7917_403d_90bc_839f60c4f2c2.input],
					booking: rjc_c59d10b6_7917_403d_90bc_839f60c4f2c2.booking,
				}
			}
		const output_c59d10b6_7917_403d_90bc_839f60c4f2c2 =
			await runJavascriptCode_c59d10b6_7917_403d_90bc_839f60c4f2c2()
		const RunJavaScriptCode_1e7dc285_1389_49b8_8eff_508af2bfa830 = {
			input: output_c59d10b6_7917_403d_90bc_839f60c4f2c2,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
		}
		const rjc_1e7dc285_1389_49b8_8eff_508af2bfa830 =
			RunJavaScriptCode_1e7dc285_1389_49b8_8eff_508af2bfa830

		const runJavascriptCode_1e7dc285_1389_49b8_8eff_508af2bfa830 =
			async function () {
				const createItineraries = async (request) => {
					const itinerariesData = []
					const { itineraries, booking } = request
					for (let itinerary of itineraries) {
						const itineraryData = await prisma.Itinerary.create({
							data: {
								duration: itinerary.duration || 'duration',
								bookingId: booking.id,
							},
						})
						const routes = []
						const { segments } = itinerary
						for (let route of segments) {
							const routeData = {
								departIataCode: route.departure.iataCode,
								departTerminal: route.departure.terminal,
								departAt: route.departure.at,
								arrivalIataCode: route.arrival.iataCode,
								arrivalTerminal: route.arrival.terminal,
								arrivalAt: route.arrival.at,
								flightNumber: route.number,
								aircraftCode: route.aircraft.code,
								duration: route.duration,
								numberOfStops: route.numberOfStops || 0,
								itineraryId: itineraryData.id,
								carrierCode: route.carrierCode,
								routeId: route.id,
							}
							const updatedRoute = await prisma.Route.create({
								data: routeData,
							})
							routes.push(updatedRoute)
						}
						itinerariesData.push({ ...itineraryData, route: routes })
					}
					return itinerariesData
				}
				return createItineraries(rjc_1e7dc285_1389_49b8_8eff_508af2bfa830.input)
			}
		const output_1e7dc285_1389_49b8_8eff_508af2bfa830 =
			await runJavascriptCode_1e7dc285_1389_49b8_8eff_508af2bfa830()
		const GetRecordValue_d1d7846e_f06b_4708_90b9_673ce42418c8 = {
			input: output_4647d470_f05a_4cbc_9cf7_d41aacd14300,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
		}
		const pickedValue_d1d7846e_f06b_4708_90b9_673ce42418c8 =
			GetRecordValue_d1d7846e_f06b_4708_90b9_673ce42418c8.input
				.journeyDetails[0].price
		const RunJavaScriptCode_1235e46a_b448_4fbf_b1eb_5765acd3545e = {
			booking: created_6c320ff1_ee23_49ad_8803_556859c414ab,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
			input: pickedValue_d1d7846e_f06b_4708_90b9_673ce42418c8,
		}
		const rjc_1235e46a_b448_4fbf_b1eb_5765acd3545e =
			RunJavaScriptCode_1235e46a_b448_4fbf_b1eb_5765acd3545e

		const runJavascriptCode_1235e46a_b448_4fbf_b1eb_5765acd3545e =
			async function () {
				return {
					...rjc_1235e46a_b448_4fbf_b1eb_5765acd3545e.input,
					booking: rjc_1235e46a_b448_4fbf_b1eb_5765acd3545e.booking,
				}
			}
		const output_1235e46a_b448_4fbf_b1eb_5765acd3545e =
			await runJavascriptCode_1235e46a_b448_4fbf_b1eb_5765acd3545e()
		const RunJavaScriptCode_0d957390_543d_47e8_89f2_785fd04d559b = {
			input: output_1235e46a_b448_4fbf_b1eb_5765acd3545e,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
		}
		const rjc_0d957390_543d_47e8_89f2_785fd04d559b =
			RunJavaScriptCode_0d957390_543d_47e8_89f2_785fd04d559b

		const runJavascriptCode_0d957390_543d_47e8_89f2_785fd04d559b =
			async function () {
				const createPricingDetails = async (request) => {
					const priceData = request
					const price = {
						basePrice: priceData.basePrice,
						grandTotal: priceData.grandTotal,
						currency: priceData.currency,
						bookingId: priceData.booking.id,
					}
					const priceDetails = await prisma.price.create({ data: price })
					const feesData = priceData.fees.map(({ amount, type }) => {
						return {
							amount,
							type,
							currency: priceDetails.currency,
							priceId: priceDetails.id,
						}
					})
					const fees = await prisma.Fee.createMany({ data: feesData })
					return priceDetails
				}
				return createPricingDetails(
					rjc_0d957390_543d_47e8_89f2_785fd04d559b.input
				)
			}
		const output_0d957390_543d_47e8_89f2_785fd04d559b =
			await runJavascriptCode_0d957390_543d_47e8_89f2_785fd04d559b()
		const GetRule_29104d0a_9315_4a0e_94ee_4dfbba437073 = {
			input: output_d72251f4_b9dc_49f5_a45c_36dcc8f0b8d5,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
			booking: created_6c320ff1_ee23_49ad_8803_556859c414ab,
			output: output_1e7dc285_1389_49b8_8eff_508af2bfa830,
			output1: output_0d957390_543d_47e8_89f2_785fd04d559b,
		}
		const output_29104d0a_9315_4a0e_94ee_4dfbba437073 =
			await prisma.$queryRawUnsafe(
				`SELECT "provider" FROM "payment" WHERE "enable" =  'true' and "regionality" =  'DOMESTIC' and CURRENT_TIMESTAMP < "validTill"`
			)
		const RunJavaScriptCode_df54b8f8_db4b_4917_b6a9_e0081f56fd8f = {
			input: output_29104d0a_9315_4a0e_94ee_4dfbba437073,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
		}
		const rjc_df54b8f8_db4b_4917_b6a9_e0081f56fd8f =
			RunJavaScriptCode_df54b8f8_db4b_4917_b6a9_e0081f56fd8f

		const runJavascriptCode_df54b8f8_db4b_4917_b6a9_e0081f56fd8f =
			async function () {
				const input = rjc_df54b8f8_db4b_4917_b6a9_e0081f56fd8f.input

				const uniquePaymentMehthods = Array.from(
					new Set(input.map(JSON.stringify)),
					JSON.parse
				)

				return uniquePaymentMehthods
			}
		const output_df54b8f8_db4b_4917_b6a9_e0081f56fd8f =
			await runJavascriptCode_df54b8f8_db4b_4917_b6a9_e0081f56fd8f()
		const ReturnSuccessResponse_fe182476_e9ba_4095_ab15_9fbcb45fdb6e = {
			booking: created_6c320ff1_ee23_49ad_8803_556859c414ab,
			params: request_7a10fac4_c404_46df_8f5c_d7518d4ca06d,
			secrets: process.env,
			result: output_df54b8f8_db4b_4917_b6a9_e0081f56fd8f,
		}
		const updatedReturnSuccessResponse = {
			...ReturnSuccessResponse_fe182476_e9ba_4095_ab15_9fbcb45fdb6e,
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
	paymentmethods,
}
