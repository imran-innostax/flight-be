const { logToDatabase } = require('../helpers')
const fs = require('fs')
const RabbitMQClient = require('../rabbitmq/client')
const axios = require('axios')
const ejs = require('ejs')
const { convert } = require('html-to-text')

const book = async (req, res, next) => {
	try {
		const request_8a9f9d44_cae9_434a_849f_73d8ea4be8e4 = req
		const { body, url, params, method, headers } = req
		let corelationId = headers['x-request-id']
		await logToDatabase(corelationId, 'Request', url, req)
		const GetRecordValue_339bfbf8_0639_4133_b4c4_114d20889207 = {
			input: request_8a9f9d44_cae9_434a_849f_73d8ea4be8e4,
			params: request_8a9f9d44_cae9_434a_849f_73d8ea4be8e4,
			secrets: process.env,
		}
		const pickedValue_339bfbf8_0639_4133_b4c4_114d20889207 =
			GetRecordValue_339bfbf8_0639_4133_b4c4_114d20889207.input.body
		const RunJavaScriptCode_f3d2420c_d089_4623_9cb3_19a553048b21 = {
			input: pickedValue_339bfbf8_0639_4133_b4c4_114d20889207,
			params: request_8a9f9d44_cae9_434a_849f_73d8ea4be8e4,
			secrets: process.env,
		}
		const rjc_f3d2420c_d089_4623_9cb3_19a553048b21 =
			RunJavaScriptCode_f3d2420c_d089_4623_9cb3_19a553048b21

		const runJavascriptCode_f3d2420c_d089_4623_9cb3_19a553048b21 =
			async function () {
				const updateRequestBody = (request) => {
					const response = {
						data: {
							type: 'flight-offers-pricing',
							flightOffers: request.journeyDetails.map((journey) => ({
								type: 'flight-offer',
								id: journey.id,
								source: request.internalSource,
								instantTicketingRequired: false,
								nonHomogeneous: false,
								paymentCardRequired: false,
								itineraries: journey.itineraries?.map((itinery) => ({
									segments: itinery.segments?.map((segment) => ({
										departure: {
											iataCode: segment.departure?.iataCode || '',
											terminal: segment.departure?.terminal || '',
											at: segment.departure.at || '',
										},
										arrival: {
											iataCode: segment.arrival?.iataCode || '',
											terminal: segment.arrival?.terminal || '',
											at: segment.arrival?.at,
										},
										carrierCode: segment.carrierCode || '',
										number: segment.number || '',
										id: segment.id || '',
									})),
								})),

								price: {
									currency: journey.price?.currency || '',
									total: journey.price.grandTotal,
									base: journey.price?.basePrice || '',
									fees: journey.price?.fees.map(({ amount, type }) => ({
										amount: amount,
										type: type,
									})),
									grandTotal: journey.price?.grandTotal || '',
									billingCurrency: '',
								},
								pricingOptions: {
									fareType: journey.pricingOptions?.fareType,
									includedCheckedBagsOnly:
										journey.pricingOptions?.includedCheckedBagsOnly || '',
								},
								validatingAirlineCodes: journey.validatingAirlineCodes || [
									'UK',
								],
								travelerPricings: journey.travelerDetails.map((traveler) => ({
									travelerId: traveler.id || '',
									fareOption: traveler.fareOption || '',
									travelerType: traveler.travelerType || '',
									price: {
										currency: traveler.price.currency,
										total: traveler.price.grandTotal,
										base: traveler.price.basePrice,
										taxes: traveler.price.taxes.map(({ amount, code }) => ({
											amount: amount,
											code: code,
										})),
										refundableTaxes: traveler.price.refundableTaxes,
									},
									fareDetailsBySegment: traveler.fareDetailsBySegment.map(
										(segment) => ({
											segmentId: segment.segmentId || '',
											cabin: segment.cabin || '',
											fareBasis: segment.fareBasis || '',
											class: segment.class || '',
											includedCheckedBags: {
												weight: segment.includedCheckedBags.weight || '',
												weightUnit:
													segment.includedCheckedBags.weightUnit || '',
											},
										})
									),
								})),
							})),
							travelers: request.journeyDetails
								.map((journey) =>
									journey.travelerDetails.map((traveler) => ({
										id: traveler.id || '',
										dateOfBirth: traveler.dateOfBirth || '',
										name: {
											firstName: traveler.givenName || '',
											lastName: traveler.familyName || '',
										},
										gender: traveler.gender || 'MALE',
										associatedAdultId: traveler?.associatedAdultId,
										contact: {
											emailAddress: traveler.email || '',
											phones: [
												{
													deviceType: 'MOBILE',
													countryCallingCode: traveler.phoneCountryCode,
													number: traveler.phoneNumber || '',
												},
											],
										},
										documents: traveler.documents?.map((document) => ({
											documentType: document.documentType || '',
											birthPlace: document.birthPlace || '',
											issuanceLocation: document.issuanceLocation || '',
											issuanceDate: document.issuanceDate || '',
											number: document.number || '',
											expiryDate: document.expiryDate || '',
											issuanceCountry: document.issuanceCountry || '',
											validityCountry: document.validityCountry || 'FR',
											nationality: document.nationality || '',
											holder: document.holder || '',
										})),
									}))
								)
								.flatMap((item) => item),
						},
					}
					return response
				}
				return updateRequestBody(rjc_f3d2420c_d089_4623_9cb3_19a553048b21.input)
			}
		const output_f3d2420c_d089_4623_9cb3_19a553048b21 =
			await runJavascriptCode_f3d2420c_d089_4623_9cb3_19a553048b21()
		const CallRESTAPIEndpoint_0175537a_ed3a_4a94_8e9b_65e3ef0b23f3 = {
			input: request_8a9f9d44_cae9_434a_849f_73d8ea4be8e4,
			params: request_8a9f9d44_cae9_434a_849f_73d8ea4be8e4,
			secrets: process.env,
		}

		const params_0175537a_ed3a_4a94_8e9b_65e3ef0b23f3 = new URLSearchParams()
		params_0175537a_ed3a_4a94_8e9b_65e3ef0b23f3.append(
			`client_secret`,
			`jzdndnNrPvdF8sKn`
		)
		params_0175537a_ed3a_4a94_8e9b_65e3ef0b23f3.append(
			`grant_type`,
			`client_credentials`
		)
		params_0175537a_ed3a_4a94_8e9b_65e3ef0b23f3.append(
			`client_id`,
			`n08oDVLzXyzy7TUWYWiNuk4HkUKed8xR`
		)

		let output_0175537a_ed3a_4a94_8e9b_65e3ef0b23f3
		try {
			output_0175537a_ed3a_4a94_8e9b_65e3ef0b23f3 = await axios
				.post(
					`${CallRESTAPIEndpoint_0175537a_ed3a_4a94_8e9b_65e3ef0b23f3.secrets.AMADEUS_API_BASE_URL}/v1/security/oauth2/token?`,
					params_0175537a_ed3a_4a94_8e9b_65e3ef0b23f3,
					{ headers: {} }
				)
				.then(async (res) => {
					await logToDatabase(corelationId, 'Request', url, res)
					await logToDatabase(corelationId, 'Response', url, res)
					return res.data
				})
		} catch (error) {
			const { status, data } = error?.response
			await logToDatabase(corelationId, 'Error', url, error)
			return res.status(status).json(data)
		}
		const CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352 = {
			output: output_f3d2420c_d089_4623_9cb3_19a553048b21,
			params: request_8a9f9d44_cae9_434a_849f_73d8ea4be8e4,
			secrets: process.env,
			input: output_0175537a_ed3a_4a94_8e9b_65e3ef0b23f3,
		}

		let output_16cbc054_b21a_4bc4_9a99_c9237f68a352
		try {
			output_16cbc054_b21a_4bc4_9a99_c9237f68a352 = await axios
				.post(
					`${CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.secrets.AMADEUS_API_BASE_URL}/v1/booking/flight-orders?`,
					CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.output,
					{
						headers: {
							Authorization: `Bearer ${CallRESTAPIEndpoint_16cbc054_b21a_4bc4_9a99_c9237f68a352.input.access_token}`,
						},
					}
				)
				.then(async (res) => {
					await logToDatabase(corelationId, 'Request', url, res)
					await logToDatabase(corelationId, 'Response', url, res)
					return res.data
				})
		} catch (error) {
			const { status, data } = error?.response
			await logToDatabase(corelationId, 'Error', url, error)
			return res.status(status).json(data)
		}
		const RunJavaScriptCode_ee174534_8c18_424b_928b_292003c5067a = {
			input: output_16cbc054_b21a_4bc4_9a99_c9237f68a352,
			params: request_8a9f9d44_cae9_434a_849f_73d8ea4be8e4,
			secrets: process.env,
		}
		const rjc_ee174534_8c18_424b_928b_292003c5067a =
			RunJavaScriptCode_ee174534_8c18_424b_928b_292003c5067a

		const runJavascriptCode_ee174534_8c18_424b_928b_292003c5067a =
			async function () {
				const updateRequestBody = (request) => {
					const getTravelerData = (id) => {
						return request.data.travelers.find((item) => item.id === id)
					}
					const response = {
						bookingId: request?.data?.id,
						bookingType: '', // instant/On Hold
						bookingStatus: '', // Done or Pending due to paylater
						bookingRecords: request.data.associatedRecords.map((record) => ({
							reference: record.reference,
							creationDate: record.creationDate,
						})),
						paymentDetails: {
							priceGuaranteeExpiresAt: null, // Duffel, pay later
							paidAt: '',
							awaitingPayment: false,
							paymentRequiredBy: '',
						},
						journeyDetails:
							request.data.flightOffers.map((flightOffer) => ({
								id: flightOffer.id,
								itineraries: flightOffer.itineraries?.map((itinerary) => ({
									segments:
										itinerary.segments?.map((segment) => ({
											departure: {
												iataCode: segment.departure?.iataCode || '',
												terminal: segment.departure?.terminal || '',
												at: segment.departure?.at || '',
											},
											arrival: {
												iataCode: segment.arrival?.iataCode || '',
												terminal: segment.arrival?.terminal || '',
												at: segment.arrival?.at || '',
											},
											carrierCode: segment.carrierCode || '',
											number: segment.number || '',
											aircraft: {
												code: segment.aircraft.code || '',
											},
											duration: segment.duration || '',
											id: segment.id,
											numberOfStops: segment.numberOfStops || '',
											co2Emissions: segment.co2Emissions?.map((emission) => ({
												weight: emission.weight || '',
												weightUnit: emission.weightUnit || '',
												cabin: emission.cabin || '',
											})),
											travelers: [
												{
													seat: null,
													travelersId: 'string',
												},
											],
										})) || [],
								})),

								price: {
									currency: flightOffer.price?.currency || '',
									basePrice: flightOffer.price?.base || '',
									grandTotal: flightOffer.price?.grandTotal || '',
									fees: flightOffer.price?.fees.map(({ amount, type }) => ({
										amount: amount,
										type: type,
									})),
								},
								pricingOptions: {
									includedCheckedBagsOnly:
										flightOffer.pricingOptions?.includedCheckedBagsOnly || '',
								},
								validatingAirlineCodes: flightOffer.validatingAirlineCodes,
								travelerDetails:
									flightOffer.travelerPricings?.map((traveler) => ({
										id: traveler.travelerId,
										phoneNumber: getTravelerData(traveler.travelerId).contact
											.phones[0].number,
										email: getTravelerData(traveler.travelerId).contact
											.emailAddress,
										dateOfBirth: getTravelerData(traveler.travelerId)
											.dateOfBirth,
										title: 'mr',
										gender: getTravelerData(traveler.travelerId).gender,
										familyName: getTravelerData(traveler.travelerId).name
											.lastName,
										givenName: getTravelerData(traveler.travelerId).name
											.firstName,
										travelerType: traveler.travelerType || '',
										cabinClass: '',
										baggages: [
											{
												type: '',
												quantity: 0,
												weight: '',
											},
										],
										fareOption: traveler.fareOption || '',
										price: {
											currency: traveler.price?.currency || '',
											basePrice: traveler.price?.base || '',
											grandTotal: traveler.price?.total || '',
											taxes: traveler.price?.taxes.map(({ amount, code }) => ({
												amount: amount,
												code: code,
											})),
											refundableTaxes: traveler.price?.refundableTaxes || '',
										},
										documents: getTravelerData(traveler.travelerId).documents,
									})) || [],
							})) || [],
						supplierDictionaries: request?.dictionaries || '',
					}
					return response
				}
				return updateRequestBody(rjc_ee174534_8c18_424b_928b_292003c5067a.input)
			}
		const output_ee174534_8c18_424b_928b_292003c5067a =
			await runJavascriptCode_ee174534_8c18_424b_928b_292003c5067a()
		const RunJavaScriptCode_c064fe37_6578_44e2_9fee_a98fddc4ac30 = {
			input: output_ee174534_8c18_424b_928b_292003c5067a,
			params: request_8a9f9d44_cae9_434a_849f_73d8ea4be8e4,
			secrets: process.env,
		}
		const rjc_c064fe37_6578_44e2_9fee_a98fddc4ac30 =
			RunJavaScriptCode_c064fe37_6578_44e2_9fee_a98fddc4ac30

		const runJavascriptCode_c064fe37_6578_44e2_9fee_a98fddc4ac30 =
			async function () {
				const data = rjc_c064fe37_6578_44e2_9fee_a98fddc4ac30.input
				const formattedTime = (departure, arrival) => {
					const milliseconds = arrival - departure
					const seconds = Math.floor((milliseconds / 1000) % 60)
					const minutes = Math.floor((milliseconds / 1000 / 60) % 60)
					const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24)
					return `${hours}hr ${minutes}min ${seconds}sec `
				}
				const mapData = data.journeyDetails.map(
					(journey) => `
<div>
  ${journey.itineraries.map((itinery) =>
		`
  <div>
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="row row-5"
      role="presentation"
      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
      width="100%"
    >
      <tbody>
        <tr>
          <td>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row-content"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: #6466f1;
                color: #000;
                width: 650px;
                margin: 0 auto;
              "
              width="650"
            >
              <tbody>
                <tr>
                  <td
                    class="column column-1"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      font-weight: 400;
                      text-align: left;
                      padding-bottom: 5px;
                      padding-top: 5px;
                      vertical-align: top;
                      border-top: 0px;
                      border-right: 0px;
                      border-bottom: 0px;
                      border-left: 0px;
                    "
                    width="33.333333333333336%"
                  >
                    <div
                      class="spacer_block block-1"
                      style="height: 40px; line-height: 40px; font-size: 1px"
                    >
                      

                    </div>
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="paragraph_block block-2"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        word-break: break-word;
                      "
                      width="100%"
                    >
                      <tr>
                        <td
                          class="pad"
                          style="padding-bottom: 10px; padding-top: 10px"
                        >
                          <div
                            style="
                              color: #ffffff;
                              font-family: Montserrat, Trebuchet MS,
                                Lucida Grande, Lucida Sans Unicode, Lucida Sans,
                                Tahoma, sans-serif;
                              font-size: 42px;
                              line-height: 120%;
                              text-align: center;
                              mso-line-height-alt: 50.4px;
                            "
                          >
                            <p style="margin: 0; word-break: break-word">
                              <span
                                ><strong
                                  >${
																		itinery.segments[0].departure.iataCode
																	}</strong
                                ></span
                              >
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <div
                      class="spacer_block block-4"
                      style="height: 30px; line-height: 30px; font-size: 1px"
                    >
                      

                    </div>
                  </td>
                  <td
                    class="column column-2"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      font-weight: 400;
                      text-align: left;
                      padding-bottom: 5px;
                      padding-top: 5px;
                      vertical-align: top;
                      border-top: 0px;
                      border-right: 0px;
                      border-bottom: 0px;
                      border-left: 0px;
                    "
                    width="33.333333333333336%"
                  >
                    <div
                      class="spacer_block block-1"
                      style="height: 60px; line-height: 60px; font-size: 1px"
                    >
                      

                    </div>
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="image_block block-2"
                      role="presentation"
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                      width="100%"
                    >
                      <tr>
                        <td
                          class="pad"
                          style="
                            width: 100%;
                            padding-right: 0px;
                            padding-left: 0px;
                          "
                        >
                          <div
                            align="center"
                            class="alignment"
                            style="line-height: 10px"
                          >
                            <img
                              alt="Alternate text"
                              src="https://i.ibb.co/qN4YYWF/Aircraft.gif"
                              style="
                                display: block;
                                height: auto;
                                border: 0;
                                max-width: 137.5px;
                                width: 100%;
                              "
                              title="Alternate text"
                            />
                          </div>
                        </td>
                      </tr>
                    </table>
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="paragraph_block block-3"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        word-break: break-word;
                      "
                      width="100%"
                    >
                      <tr>
                        <td
                          class="pad"
                          style="padding-left: 10px; padding-right: 10px"
                        >
                          <div
                            style="
                              color: #f0efef;
                              font-family: Montserrat, Trebuchet MS,
                                Lucida Grande, Lucida Sans Unicode, Lucida Sans,
                                Tahoma, sans-serif;
                              font-size: 12px;
                              line-height: 120%;
                              text-align: center;
                              mso-line-height-alt: 14.399999999999999px;
                            "
                          >
                            <p style="margin: 0; word-break: break-word">
                              <span>Flight Duration</span>
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="paragraph_block block-4"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        word-break: break-word;
                      "
                      width="100%"
                    >
                      <tr>
                        <td
                          class="pad"
                          style="
                            padding-bottom: 10px;
                            padding-left: 10px;
                            padding-right: 10px;
                            padding-top: 5px;
                          "
                        >
                          <div
                            style="
                              color: #f0efef;
                              font-family: Montserrat, Trebuchet MS,
                                Lucida Grande, Lucida Sans Unicode, Lucida Sans,
                                Tahoma, sans-serif;
                              font-size: 12px;
                              line-height: 120%;
                              text-align: center;
                              mso-line-height-alt: 14.399999999999999px;
                            "
                          >
                            <p style="margin: 0; word-break: break-word">
                            <span>${formattedTime(
															new Date(itinery.segments[0].departure.at),
															new Date(
																itinery.segments[
																	itinery.segments.length - 1
																].arrival.at
															)
														)}</span>
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td
                    class="column column-3"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      font-weight: 400;
                      text-align: left;
                      padding-bottom: 5px;
                      padding-top: 5px;
                      vertical-align: top;
                      border-top: 0px;
                      border-right: 0px;
                      border-bottom: 0px;
                      border-left: 0px;
                    "
                    width="33.333333333333336%"
                  >
                    <div
                      class="spacer_block block-1"
                      style="height: 40px; line-height: 40px; font-size: 1px"
                    >
                      

                    </div>
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="paragraph_block block-2"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        word-break: break-word;
                      "
                      width="100%"
                    >
                      <tr>
                        <td
                          class="pad"
                          style="padding-bottom: 10px; padding-top: 10px"
                        >
                          <div
                            style="
                              color: #ffffff;
                              font-family: Montserrat, Trebuchet MS,
                                Lucida Grande, Lucida Sans Unicode, Lucida Sans,
                                Tahoma, sans-serif;
                              font-size: 42px;
                              line-height: 120%;
                              text-align: center;
                              mso-line-height-alt: 50.4px;
                            "
                          >
                            <p style="margin: 0; word-break: break-word">
                              <span
                                ><strong
                                  >${
																		itinery.segments[
																			itinery.segments.length - 1
																		].arrival.iataCode
																	}</strong
                                ></span
                              >
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <div
                      class="spacer_block block-4"
                      style="height: 30px; line-height: 30px; font-size: 1px"
                    >
                      

                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

    <br />
    ${itinery.segments.map(
			(segment) => `
    <div>
      <table
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        class="row row-5"
        role="presentation"
        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
        width="100%"
      >
        <tbody>
          <tr>
            <td>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row-content"
                role="presentation"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  background-color: #6466f1;
                  color: #000;
                  width: 650px;
                  margin: 0 auto;
                "
                width="650"
              >
                <tbody>
                  <tr>
                    <td
                      class="column column-1"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        font-weight: 400;
                        text-align: left;
                        padding-bottom: 5px;
                        padding-top: 5px;
                        vertical-align: top;
                        border-top: 0px;
                        border-right: 0px;
                        border-bottom: 0px;
                        border-left: 0px;
                      "
                      width="33.333333333333336%"
                    >
                      <div
                        class="spacer_block block-1"
                        style="height: 20px; line-height: 20px; font-size: 1px"
                      >
                        

                      </div>
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="paragraph_block block-2"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          word-break: break-word;
                        "
                        width="100%"
                      >
                        <tr>
                          <td
                            class="pad"
                            style="padding-bottom: 10px; padding-top: 10px"
                          >
                            <div
                              style="
                                color: #ffffff;
                                font-family: Montserrat, Trebuchet MS,
                                  Lucida Grande, Lucida Sans Unicode,
                                  Lucida Sans, Tahoma, sans-serif;
                                font-size: 25px;
                                line-height: 20%;
                                text-align: center;
                                mso-line-height-alt: 50.4px;
                              "
                            >
                              <p style="margin: 0; word-break: break-word">
                                <span
                                  ><strong
                                    >${segment.departure.iataCode}</strong
                                  ></span
                                >
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                      <div
                        class="spacer_block block-4"
                        style="height: 30px; line-height: 30px; font-size: 1px"
                      >
                        

                      </div>
                    </td>

                    <td
                      class="column column-1"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        font-weight: 400;
                        text-align: left;
                        padding-bottom: 5px;
                        padding-top: 5px;
                        vertical-align: top;
                        border-top: 0px;
                        border-right: 0px;
                        border-bottom: 0px;
                        border-left: 0px;
                      "
                      width="33.333333333333336%"
                    >
                      <div
                        class="spacer_block block-1"
                        style="height: 20px; line-height: 20px; font-size: 1px"
                      >
                        

                      </div>
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="paragraph_block block-2"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          word-break: break-word;
                        "
                        width="100%"
                      >
                        <tr>
                          <td
                            class="pad"
                            style="padding-bottom: 10px; padding-top: 10px"
                          >
                            <div
                              style="
                                color: #ffffff;
                                font-family: Montserrat, Trebuchet MS,
                                  Lucida Grande, Lucida Sans Unicode,
                                  Lucida Sans, Tahoma, sans-serif;
                                font-size: 25px;
                                line-height: 20%;
                                text-align: center;
                                mso-line-height-alt: 50.4px;
                              "
                            >
                              <p style="margin: 0; word-break: break-word">
                                <span
                                  ><strong
                                    >${segment.arrival.iataCode}</strong
                                  ></span
                                >
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <table
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        class="row row-7"
        role="presentation"
        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
        width="100%"
      >
        <tbody>
          <tr>
            <td>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row-content stack"
                role="presentation"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  background-color: #6466f1;
                  color: #000;
                  width: 650px;
                  margin: 0 auto;
                "
                width="650"
              >
                <tbody>
                  <tr>
                    <td
                      class="column column-1"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        font-weight: 400;
                        text-align: left;
                        padding-bottom: 5px;
                        padding-top: 5px;
                        vertical-align: top;
                        border-top: 0px;
                        border-right: 0px;
                        border-bottom: 0px;
                        border-left: 0px;
                      "
                      width="15%"
                    >
                      <table
                        border="0"
                        cellpadding="10"
                        cellspacing="0"
                        class="paragraph_block block-1"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          word-break: break-word;
                        "
                        width="100%"
                      >
                        <tr>
                          <td class="pad">
                            <div
                              style="
                                color: #ffffff;
                                font-family: Montserrat, Trebuchet MS,
                                  Lucida Grande, Lucida Sans Unicode,
                                  Lucida Sans, Tahoma, sans-serif;
                                font-size: 15px;
                                line-height: 120%;
                                text-align: center;
                                mso-line-height-alt: 18px;
                              "
                            >
                              <p style="margin: 0; word-break: break-word">
                                <span>Terminal</span>
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                      <table
                        border="0"
                        cellpadding="10"
                        cellspacing="0"
                        class="paragraph_block block-2"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          word-break: break-word;
                        "
                        width="100%"
                      >
                        <tr>
                          <td class="pad">
                            <div
                              style="
                                color: #ffffff;
                                font-family: Montserrat, Trebuchet MS,
                                  Lucida Grande, Lucida Sans Unicode,
                                  Lucida Sans, Tahoma, sans-serif;
                                font-size: 15px;
                                line-height: 120%;
                                text-align: center;
                                mso-line-height-alt: 21.599999999999998px;
                              "
                            >
                              <p style="margin: 0; word-break: break-word">
                                <strong
                                  ><span
                                    >${segment.departure.terminal}</span
                                  ></strong
                                >
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td
                      class="column column-2"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        font-weight: 400;
                        text-align: left;
                        padding-bottom: 5px;
                        padding-top: 5px;
                        vertical-align: top;
                        border-top: 0px;
                        border-right: 0px;
                        border-bottom: 0px;
                        border-left: 0px;
                      "
                      width="15%"
                    >
                      <table
                        border="0"
                        cellpadding="10"
                        cellspacing="0"
                        class="paragraph_block block-1"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          word-break: break-word;
                        "
                        width="100%"
                      >
                        <tr>
                          <td class="pad">
                            <div
                              style="
                                color: #ffffff;
                                font-family: Montserrat, Trebuchet MS,
                                  Lucida Grande, Lucida Sans Unicode,
                                  Lucida Sans, Tahoma, sans-serif;
                                font-size: 15px;
                                line-height: 120%;
                                text-align: center;
                                mso-line-height-alt: 18px;
                              "
                            >
                              <p style="margin: 0; word-break: break-word">
                                <span>Time</span>
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                      <table
                        border="0"
                        cellpadding="10"
                        cellspacing="0"
                        class="paragraph_block block-2"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          word-break: break-word;
                        "
                        width="100%"
                      >
                        <tr>
                          <td class="pad">
                            <div
                              style="
                                color: #ffffff;
                                font-family: Montserrat, Trebuchet MS,
                                  Lucida Grande, Lucida Sans Unicode,
                                  Lucida Sans, Tahoma, sans-serif;
                                font-size: 15px;
                                line-height: 120%;
                                text-align: center;
                                mso-line-height-alt: 21.599999999999998px;
                              "
                            >
                              <p style="margin: 0; word-break: break-word">
                                <strong
                                  ><span
                                    >${segment.departure.at.split('T')[1]}</span
                                  ></strong
                                >
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td
                      class="column column-3"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        font-weight: 400;
                        text-align: left;
                        padding-bottom: 5px;
                        padding-top: 5px;
                        vertical-align: top;
                        border-top: 0px;
                        border-right: 0px;
                        border-bottom: 0px;
                        border-left: 0px;
                      "
                      width="15%"
                    >
                      <table
                        border="0"
                        cellpadding="10"
                        cellspacing="0"
                        class="paragraph_block block-1"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          word-break: break-word;
                        "
                        width="100%"
                      >
                        <tr>
                          <td class="pad">
                            <div
                              style="
                                color: #ffffff;
                                font-family: Montserrat, Trebuchet MS,
                                  Lucida Grande, Lucida Sans Unicode,
                                  Lucida Sans, Tahoma, sans-serif;
                                font-size: 15px;
                                line-height: 120%;
                                text-align: center;
                                mso-line-height-alt: 18px;
                              "
                            >
                              <p style="margin: 0; word-break: break-word">
                                <span>Class</span>
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                      <table
                        border="0"
                        cellpadding="10"
                        cellspacing="0"
                        class="paragraph_block block-2"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          word-break: break-word;
                        "
                        width="100%"
                      >
                        <tr>
                          <td class="pad">
                            <div
                              style="
                                color: #ffffff;
                                font-family: Montserrat, Trebuchet MS,
                                  Lucida Grande, Lucida Sans Unicode,
                                  Lucida Sans, Tahoma, sans-serif;
                                font-size: 15px;
                                line-height: 120%;
                                text-align: center;
                                mso-line-height-alt: 21.599999999999998px;
                              "
                            >
                              <p style="margin: 0; word-break: break-word">
                                <strong
                                  ><span
                                    >${segment.co2Emissions[0].cabin}</span
                                  ></strong
                                >
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td
                      class="column column-4"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        font-weight: 400;
                        text-align: left;
                        padding-bottom: 5px;
                        padding-top: 5px;
                        vertical-align: top;
                        border-top: 0px;
                        border-right: 0px;
                        border-bottom: 0px;
                        border-left: 0px;
                      "
                      width="15%"
                    >
                      <table
                        border="0"
                        cellpadding="10"
                        cellspacing="0"
                        class="paragraph_block block-1"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          word-break: break-word;
                        "
                        width="100%"
                      >
                        <tr>
                          <td class="pad">
                            <div
                              style="
                                color: #ffffff;
                                font-family: Montserrat, Trebuchet MS,
                                  Lucida Grande, Lucida Sans Unicode,
                                  Lucida Sans, Tahoma, sans-serif;
                                font-size: 15px;
                                line-height: 120%;
                                text-align: center;
                                mso-line-height-alt: 18px;
                              "
                            >
                              <p style="margin: 0; word-break: break-word">
                                <span>Seat</span>
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                      <table
                        border="0"
                        cellpadding="10"
                        cellspacing="0"
                        class="paragraph_block block-2"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          word-break: break-word;
                        "
                        width="100%"
                      >
                        <tr>
                          <td class="pad">
                            <div
                              style="
                                color: #ffffff;
                                font-family: Montserrat, Trebuchet MS,
                                  Lucida Grande, Lucida Sans Unicode,
                                  Lucida Sans, Tahoma, sans-serif;
                                font-size: 15px;
                                line-height: 120%;
                                text-align: center;
                                mso-line-height-alt: 21.599999999999998px;
                              "
                            >
                              <p style="margin: 0; word-break: break-word">
                                <strong
                                  ><span
                                    >${segment.travelers[0].seat}</span
                                  ></strong
                                >
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td
                      class="column column-5"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        font-weight: 400;
                        text-align: left;
                        padding-bottom: 5px;
                        padding-top: 5px;
                        vertical-align: top;
                        border-top: 0px;
                        border-right: 0px;
                        border-bottom: 0px;
                        border-left: 0px;
                      "
                      width="15%"
                    >
                      <table
                        border="0"
                        cellpadding="10"
                        cellspacing="0"
                        class="paragraph_block block-1"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          word-break: break-word;
                        "
                        width="100%"
                      >
                        <tr>
                          <td class="pad">
                            <div
                              style="
                                color: #ffffff;
                                font-family: Montserrat, Trebuchet MS,
                                  Lucida Grande, Lucida Sans Unicode,
                                  Lucida Sans, Tahoma, sans-serif;
                                font-size: 15px;
                                line-height: 120%;
                                text-align: center;
                                mso-line-height-alt: 18px;
                              "
                            >
                              <p style="margin: 0; word-break: break-word">
                                <span>Plane</span>
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                      <table
                        border="0"
                        cellpadding="10"
                        cellspacing="0"
                        class="paragraph_block block-2"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          word-break: break-word;
                        "
                        width="100%"
                      >
                        <tr>
                          <td class="pad">
                            <div
                              style="
                                color: #ffffff;
                                font-family: Montserrat, Trebuchet MS,
                                  Lucida Grande, Lucida Sans Unicode,
                                  Lucida Sans, Tahoma, sans-serif;
                                font-size: 15px;
                                line-height: 120%;
                                text-align: center;
                                mso-line-height-alt: 21.599999999999998px;
                              "
                            >
                              <p style="margin: 0; word-break: break-word">
                                <strong
                                  ><span>${segment.aircraft.code}</span></strong
                                >
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td
                      class="column column-5"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        font-weight: 400;
                        text-align: left;
                        padding-bottom: 5px;
                        padding-top: 5px;
                        vertical-align: top;
                        border-top: 0px;
                        border-right: 0px;
                        border-bottom: 0px;
                        border-left: 0px;
                      "
                      width="15%"
                    >
                      <table
                        border="0"
                        cellpadding="10"
                        cellspacing="0"
                        class="paragraph_block block-1"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          word-break: break-word;
                        "
                        width="100%"
                      >
                        <tr>
                          <td class="pad">
                            <div
                              style="
                                color: #ffffff;
                                font-family: Montserrat, Trebuchet MS,
                                  Lucida Grande, Lucida Sans Unicode,
                                  Lucida Sans, Tahoma, sans-serif;
                                font-size: 15px;
                                line-height: 120%;
                                text-align: center;
                                mso-line-height-alt: 18px;
                              "
                            >
                              <p style="margin: 0; word-break: break-word">
                                <span>Date</span>
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                      <table
                        border="0"
                        cellpadding="10"
                        cellspacing="0"
                        class="paragraph_block block-2"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          word-break: break-word;
                        "
                        width="100%"
                      >
                        <tr>
                          <td class="pad">
                            <div
                              style="
                                color: #ffffff;
                                font-family: Montserrat, Trebuchet MS,
                                  Lucida Grande, Lucida Sans Unicode,
                                  Lucida Sans, Tahoma, sans-serif;
                                font-size: 15px;
                                line-height: 120%;
                                text-align: center;
                                mso-line-height-alt: 21.599999999999998px;
                              "
                            >
                              <p style="margin: 0; word-break: break-word">
                                <strong
                                  ><span
                                    >${segment.departure.at.split('T')[0]}</span
                                  ></strong
                                >
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                style="
                  background-color: #ffffff;
                  height: 1px;
                  margin: 0 auto;
                  width: 100%;
                "
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    `
		)}
  </div>
  `.replaceAll(`,`, '')
	)}

  <table
    align="center"
    border="0"
    cellpadding="0"
    cellspacing="0"
    class="row row-12"
    role="presentation"
    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
    width="100%"
  >
    <tbody>
      <tr>
        <td>
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="row-content stack"
            role="presentation"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              background-color: #fff;
              border-radius: 0px 0px 20px 20px;
              color: #000;
              width: 650px;
              margin: 0 auto;
            "
            width="650"
          >
            <tbody>
              <tr>
                <td
                  class="column column-1"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    font-weight: 400;
                    text-align: left;
                    padding-bottom: 5px;
                    padding-top: 5px;
                    vertical-align: top;
                    border-top: 0px;
                    border-right: 0px;
                    border-bottom: 0px;
                    border-left: 0px;
                  "
                  width="100%"
                >
                  <table
                    border="0"
                    cellpadding="10"
                    cellspacing="0"
                    class="button_block block-2"
                    role="presentation"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                    width="100%"
                  >
                    <tr>
                      <td class="pad">
                        <div align="center" class="alignment">
                          <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:42px;width:211px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#ea5256"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]-->
                          <div
                            style="
                              text-decoration: none;
                              display: inline-block;
                              color: #ffffff;
                              background-color: #6466f1;
                              border-radius: 4px;
                              width: auto;
                              border-top: 0px solid transparent;
                              font-weight: undefined;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                              border-left: 0px solid transparent;
                              padding-top: 5px;
                              padding-bottom: 5px;
                              font-family: Montserrat, Trebuchet MS,
                                Lucida Grande, Lucida Sans Unicode, Lucida Sans,
                                Tahoma, sans-serif;
                              font-size: 16px;
                              text-align: center;
                              mso-border-alt: none;
                              word-break: keep-all;
                            "
                          >
                            <span
                              style="
                                padding-left: 20px;
                                padding-right: 20px;
                                font-size: 16px;
                                display: inline-block;
                                letter-spacing: normal;
                              "
                              ><span
                                style="
                                  word-break: break-word;
                                  line-height: 32px;
                                "
                                ><a
                                  href="#"
                                  rel="noopener"
                                  style="text-decoration: none; color: #ffffff"
                                  target="_blank"
                                  >Download boarding pass</a
                                ></span
                              ></span
                            >
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <div
    style="border-top: 2px dashed grey; width: 580px; margin: 0 auto"
    ;
  ></div>

  <table
    align="center"
    border="0"
    cellpadding="0"
    cellspacing="0"
    class="row row-20"
    role="presentation"
    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
    width="100%"
  >
    <tbody>
      <tr>
        <td>
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="row-content stack"
            role="presentation"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              background-color: #fff;
              border-radius: 20px 20px 0px 0px;
              color: #000;
              width: 650px;
              margin: 0 auto;
            "
            width="650"
          >
            <tbody>
              <tr>
                <td
                  class="column column-1"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    font-weight: 400;
                    text-align: left;
                    padding-bottom: 5px;
                    padding-top: 5px;
                    vertical-align: top;
                    border-top: 0px;
                    border-right: 0px;
                    border-bottom: 0px;
                    border-left: 0px;
                  "
                  width="100%"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="paragraph_block block-1"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      word-break: break-word;
                    "
                    width="100%"
                  >
                    <tr>
                      <td
                        class="pad"
                        style="
                          padding-bottom: 10px;
                          padding-left: 35px;
                          padding-right: 10px;
                          padding-top: 10px;
                        "
                      >
                        <div
                          style="
                            color: #232323;
                            font-family: Montserrat, Trebuchet MS, Lucida Grande,
                              Lucida Sans Unicode, Lucida Sans, Tahoma,
                              sans-serif;
                            font-size: 17px;
                            line-height: 120%;
                            text-align: left;
                            mso-line-height-alt: 20.4px;
                          "
                        >
                          <p style="margin: 0; word-break: break-word">
                            <span>Your Trip Receipt</span>
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table
    align="center"
    border="0"
    cellpadding="0"
    cellspacing="0"
    class="row row-22"
    role="presentation"
    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
    width="100%"
  >
    <tbody>
      <tr>
        <td>
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="row-content stack"
            role="presentation"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              background-color: #fff;
              color: #000;
              width: 650px;
              margin: 0 auto;
            "
            width="650"
          >
            <tbody>
              <tr>
                <td
                  class="column column-1"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    font-weight: 400;
                    text-align: left;
                    padding-bottom: 5px;
                    padding-top: 5px;
                    vertical-align: top;
                    border-top: 0px;
                    border-right: 0px;
                    border-bottom: 0px;
                    border-left: 0px;
                  "
                  width="100%"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="paragraph_block block-1"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      word-break: break-word;
                    "
                    width="100%"
                  >
                    <tr>
                      <td
                        class="pad"
                        style="
                          padding-bottom: 10px;
                          padding-left: 35px;
                          padding-right: 10px;
                          padding-top: 10px;
                        "
                      >
                        <div
                          style="
                            color: #232323;
                            font-family: Montserrat, Trebuchet MS, Lucida Grande,
                              Lucida Sans Unicode, Lucida Sans, Tahoma,
                              sans-serif;
                            font-size: 17px;
                            line-height: 120%;
                            text-align: left;
                            mso-line-height-alt: 20.4px;
                          "
                        >
                          <p style="margin: 0; word-break: break-word">
                            <span>James Brown</span>
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table
    align="center"
    border="0"
    cellpadding="0"
    cellspacing="0"
    class="row row-23"
    role="presentation"
    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
    width="100%"
  >
    <tbody>
      <tr>
        <td>
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="row-content"
            role="presentation"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              background-color: #fff;
              color: #000;
              width: 650px;
              margin: 0 auto;
            "
            width="650"
          >
            <tbody>
              <tr>
                <td
                  class="column column-1"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    font-weight: 400;
                    text-align: left;
                    padding-bottom: 5px;
                    padding-top: 5px;
                    vertical-align: top;
                    border-top: 0px;
                    border-right: 0px;
                    border-bottom: 0px;
                    border-left: 0px;
                  "
                  width="50%"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="paragraph_block block-1"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      word-break: break-word;
                    "
                    width="100%"
                  >
                    <tr>
                      <td
                        class="pad"
                        style="
                          padding-left: 35px;
                          padding-right: 10px;
                          padding-top: 10px;
                        "
                      >
                        <div
                          style="
                            color: #232323;
                            font-family: Montserrat, Trebuchet MS, Lucida Grande,
                              Lucida Sans Unicode, Lucida Sans, Tahoma,
                              sans-serif;
                            font-size: 14px;
                            line-height: 150%;
                            text-align: left;
                            mso-line-height-alt: 21px;
                          "
                        >
                          <p style="margin: 0; word-break: break-word">
                            <span>Basic Economy Far x1</span>
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
                <td
                  class="column column-2"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    font-weight: 400;
                    text-align: left;
                    padding-bottom: 5px;
                    padding-top: 5px;
                    vertical-align: top;
                    border-top: 0px;
                    border-right: 0px;
                    border-bottom: 0px;
                    border-left: 0px;
                  "
                  width="50%"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="paragraph_block block-1"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      word-break: break-word;
                    "
                    width="100%"
                  >
                    <tr>
                      <td
                        class="pad"
                        style="
                          padding-left: 35px;
                          padding-right: 25px;
                          padding-top: 10px;
                        "
                      >
                        <div
                          style="
                            color: #232323;
                            font-family: Montserrat, Trebuchet MS, Lucida Grande,
                              Lucida Sans Unicode, Lucida Sans, Tahoma,
                              sans-serif;
                            font-size: 14px;
                            line-height: 150%;
                            text-align: left;
                            mso-line-height-alt: 21px;
                          "
                        >
                          <p style="margin: 0; word-break: break-word">
                            <span>${journey.price.basePrice}</span>
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table
    align="center"
    border="0"
    cellpadding="0"
    cellspacing="0"
    class="row row-24"
    role="presentation"
    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt border"
    width="100%"
  >
    <tbody>
      <tr>
        <td>
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="row-content"
            role="presentation"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              background-color: #fff;
              color: #000;
              width: 650px;
              margin: 0 auto;
            "
            width="650"
          >
            <tbody>
              <tr>
                <td
                  class="column column-1"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    font-weight: 400;
                    text-align: left;
                    padding-bottom: 5px;
                    padding-top: 5px;
                    vertical-align: top;
                    border-top: 0px;
                    border-right: 0px;
                    border-bottom: 0px;
                    border-left: 0px;
                  "
                  width="50%"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="paragraph_block block-1"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      word-break: break-word;
                    "
                    width="100%"
                  >
                    <tr>
                      <td
                        class="pad"
                        style="
                          padding-left: 35px;
                          padding-right: 10px;
                          padding-top: 10px;
                        "
                      >
                        <div
                          style="
                            color: #232323;
                            font-family: Montserrat, Trebuchet MS, Lucida Grande,
                              Lucida Sans Unicode, Lucida Sans, Tahoma,
                              sans-serif;
                            font-size: 14px;
                            line-height: 150%;
                            text-align: left;
                            mso-line-height-alt: 21px;
                          "
                        >
                          <p style="margin: 0; word-break: break-word">
                            <span>Fees & Taxes</span>
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
                <td
                  class="column column-2"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    font-weight: 400;
                    text-align: left;
                    padding-bottom: 5px;
                    padding-top: 5px;
                    vertical-align: top;
                    border-top: 0px;
                    border-right: 0px;
                    border-bottom: 0px;
                    border-left: 0px;
                  "
                  width="50%"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="paragraph_block block-1"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      word-break: break-word;
                    "
                    width="100%"
                  >
                    <tr>
                      <td
                        class="pad"
                        style="
                          padding-left: 35px;
                          padding-right: 25px;
                          padding-top: 10px;
                        "
                      >
                        <div
                          style="
                            color: #232323;
                            font-family: Montserrat, Trebuchet MS, Lucida Grande,
                              Lucida Sans Unicode, Lucida Sans, Tahoma,
                              sans-serif;
                            font-size: 14px;
                            line-height: 150%;
                            text-align: left;
                            mso-line-height-alt: 21px;
                          "
                        >
                          <p style="margin: 0; word-break: break-word">
                            <span
                              >${
																journey.price.grandTotal -
																journey.price.basePrice
															}</span
                            >
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table
    align="center"
    border="0"
    cellpadding="0"
    cellspacing="0"
    class="row row-25"
    role="presentation"
    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
    width="100%"
  >
    <tbody>
      <tr>
        <td>
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="row-content"
            role="presentation"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              background-color: #fff;
              border-radius: 0px 0px 10px 10px;
              color: #000;
              width: 650px;
              margin: 0 auto;
            "
            width="650"
          >
            <tbody>
              <tr>
                <td
                  class="column column-1"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    font-weight: 400;
                    text-align: left;
                    padding-bottom: 15px;
                    padding-top: 5px;
                    vertical-align: top;
                    border-top: 0px;
                    border-right: 0px;
                    border-bottom: 0px;
                    border-left: 0px;
                  "
                  width="50%"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="paragraph_block block-1"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      word-break: break-word;
                    "
                    width="100%"
                  >
                    <tr>
                      <td
                        class="pad"
                        style="
                          padding-left: 35px;
                          padding-right: 10px;
                          padding-top: 10px;
                        "
                      >
                        <div
                          style="
                            color: #232323;
                            font-family: Montserrat, Trebuchet MS, Lucida Grande,
                              Lucida Sans Unicode, Lucida Sans, Tahoma,
                              sans-serif;
                            font-size: 16px;
                            line-height: 150%;
                            text-align: left;
                            mso-line-height-alt: 24px;
                          "
                        >
                          <p style="margin: 0; word-break: break-word">
                            <strong><span>Total</span></strong>
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
                <td
                  class="column column-2"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    font-weight: 400;
                    text-align: left;
                    padding-bottom: 15px;
                    padding-top: 5px;
                    vertical-align: top;
                    border-top: 0px;
                    border-right: 0px;
                    border-bottom: 0px;
                    border-left: 0px;
                  "
                  width="50%"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="paragraph_block block-1"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      word-break: break-word;
                      border-radius: 0px 0px 10px 10px;
                    "
                    width="100%"
                  >
                    <tr>
                      <td
                        class="pad"
                        style="
                          padding-left: 35px;
                          padding-right: 25px;
                          padding-top: 10px;
                        "
                      >
                        <div
                          style="
                            color: #232323;
                            font-family: Montserrat, Trebuchet MS, Lucida Grande,
                              Lucida Sans Unicode, Lucida Sans, Tahoma,
                              sans-serif;
                            font-size: 16px;
                            line-height: 150%;
                            text-align: left;
                            mso-line-height-alt: 24px;
                          "
                        >
                          <p style="margin: 0; word-break: break-word">
                            <span
                              ><strong
                                ><span
                                  >${journey.price.grandTotal}</span
                                ></strong
                              ></span
                            >
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`
				)
				const html = `<!DOCTYPE html>

<html
  lang="en"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
>
  <head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <!--[if mso
      ]><xml
        ><o:OfficeDocumentSettings
          ><o:PixelsPerInch>96</o:PixelsPerInch
          ><o:AllowPNG /></o:OfficeDocumentSettings></xml
    ><![endif]-->
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: inherit;
      }

      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
      }

      .image_block img + div {
        display: none;
      }

      @media (max-width: 570px) {
        .desktop_hide table.icons-inner,
        .social_block.desktop_hide .social-table {
          display: inline-block !important;
        }

        .icons-inner {
          text-align: center;
        }

        .icons-inner td {
          margin: 0 auto;
        }

        .image_block img.fullWidth {
          max-width: 100% !important;
        }

        .mobile_hide {
          display: none;
        }

        .row-content {
          width: 100% !important;
        }

        .stack .column {
          width: 100%;
          display: block;
        }

        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0px;
        }

        .desktop_hide,
        .desktop_hide table {
          display: table !important;
          max-height: none !important;
        }
      }
    </style>
  </head>
  <body
    style="
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    "
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="nl-container"
      role="presentation"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        background-color: #f9f9f9;
      "
      width="100%"
    >
      <tbody>
        <tr>
          <td>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-1"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000;
                        width: 650px;
                        margin: 0 auto;
                      "
                      width="650"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="50%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="image_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-left: 25px;
                                    width: 100%;
                                    padding-right: 0px;
                                  "
                                >
                                  <div
                                    align="left"
                                    class="alignment"
                                    style="line-height: 10px; margin-top: 10px"
                                  >
                                    <svg
                                      width="39"
                                      height="32"
                                      viewBox="0 0 39 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <mask
                                        id="mask0_5249_2997"
                                        style="mask-type: alpha"
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="8"
                                        width="34"
                                        height="25"
                                      >
                                        <path
                                          d="M13.6031 25.4804L4.33062 8.89499C3.9591 8.23116 3.00967 8.22088 2.62267 8.87442L0.285205 12.8213C-0.0863127 13.4491 -0.0966212 14.2313 0.264576 14.8694L8.65982 29.7C9.3977 31.002 10.7754 31.815 12.277 31.8305L29.3513 32.0003C30.084 32.0054 30.7651 31.6246 31.1418 30.9917L33.4793 27.0499C33.8663 26.3963 33.3967 25.573 32.6382 25.5679L13.6031 25.4804Z"
                                          fill="#6466F1"
                                        />
                                      </mask>
                                      <g mask="url(#mask0_5249_2997)">
                                        <path
                                          d="M13.6031 25.4804L4.33062 8.89499C3.9591 8.23116 3.00967 8.22088 2.62267 8.87442L0.285205 12.8213C-0.0863127 13.4491 -0.0966212 14.2313 0.264576 14.8694L8.65982 29.7C9.3977 31.002 10.7754 31.815 12.277 31.8305L29.3513 32.0003C30.084 32.0054 30.7651 31.6246 31.1418 30.9917L33.4793 27.0499C33.8663 26.3963 33.3967 25.573 32.6382 25.5679L13.6031 25.4804Z"
                                          fill="#6466F1"
                                        />
                                        <path
                                          d="M19.0314 31.1315C27.5066 31.1315 34.3772 24.2796 34.3772 15.8275C34.3772 7.37528 27.5066 0.523438 19.0314 0.523438C10.5562 0.523438 3.68567 7.37528 3.68567 15.8275C3.68567 24.2796 10.5562 31.1315 19.0314 31.1315Z"
                                          fill="url(#paint0_radial_5249_2997)"
                                        />
                                      </g>
                                      <mask
                                        id="mask1_5249_2997"
                                        style="mask-type: alpha"
                                        maskUnits="userSpaceOnUse"
                                        x="10"
                                        y="0"
                                        width="28"
                                        height="17"
                                      >
                                        <path
                                          d="M33.9128 9.62043L29.5371 1.88094C28.9437 0.836317 27.8395 0.182778 26.6321 0.172486L10.017 0.0078125L13.7115 6.40936L22.9169 6.50199L24.8364 6.52258L25.7755 8.18986L30.2905 16.1815H37.6228L33.9128 9.62558V9.62043Z"
                                          fill="#6466F1"
                                        />
                                      </mask>
                                      <g mask="url(#mask1_5249_2997)">
                                        <path
                                          d="M33.9128 9.62043L29.5371 1.88094C28.9437 0.836317 27.8395 0.182778 26.6321 0.172486L10.017 0.0078125L13.7115 6.40936L22.9169 6.50199L24.8364 6.52258L25.7755 8.18986L30.2905 16.1815H37.6228L33.9128 9.62558V9.62043Z"
                                          fill="#6466F1"
                                        />
                                        <path
                                          d="M19.0314 31.1315C27.5066 31.1315 34.3772 24.2796 34.3772 15.8275C34.3772 7.37528 27.5066 0.523438 19.0314 0.523438C10.5562 0.523438 3.68567 7.37528 3.68567 15.8275C3.68567 24.2796 10.5562 31.1315 19.0314 31.1315Z"
                                          fill="url(#paint1_radial_5249_2997)"
                                        />
                                      </g>
                                      <path
                                        d="M38.2987 17.3677C38.5722 17.8514 38.567 18.4484 38.2832 18.9321L37.5608 20.1568L36.5443 21.8704C36.276 22.3181 35.791 22.596 35.2646 22.5909L15.4246 22.3902L5.67224 5.16155C5.41424 4.70871 5.41942 4.1478 5.68774 3.70011L7.18411 1.16831C7.61754 0.437589 8.41219 -0.0101182 9.26359 0.000173704L10.0118 0.0104756L13.7063 6.41203L18.2264 14.414L19.1707 16.071L21.0851 16.0915L30.2853 16.1842H37.6176L38.2936 17.378L38.2987 17.3677Z"
                                        fill="#6466F1"
                                      />
                                      <defs>
                                        <radialGradient
                                          id="paint0_radial_5249_2997"
                                          cx="0"
                                          cy="0"
                                          r="1"
                                          gradientUnits="userSpaceOnUse"
                                          gradientTransform="translate(19.9915 16.6068) scale(15.3892 15.3474)"
                                        >
                                          <stop stop-color="white" />
                                          <stop
                                            offset="0.97"
                                            stop-color="white"
                                            stop-opacity="0"
                                          />
                                        </radialGradient>
                                        <radialGradient
                                          id="paint1_radial_5249_2997"
                                          cx="0"
                                          cy="0"
                                          r="1"
                                          gradientUnits="userSpaceOnUse"
                                          gradientTransform="translate(19.9915 16.6068) scale(15.3892 15.3474)"
                                        >
                                          <stop stop-color="white" />
                                          <stop
                                            offset="0.97"
                                            stop-color="white"
                                            stop-opacity="0"
                                          />
                                        </radialGradient>
                                      </defs>
                                    </svg>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class="column column-2"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="50%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #555555;
                                      font-family: Montserrat, Trebuchet MS,
                                        Lucida Grande, Lucida Sans Unicode,
                                        Lucida Sans, Tahoma, sans-serif;
                                      font-size: 12px;
                                      line-height: 120%;
                                      text-align: right;
                                      mso-line-height-alt: 14.399999999999999px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      James Brown
                                    </p>
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      Member Nr.
                                      <span style="color: #000000"
                                        ><strong>688969807</strong></span
                                      >
                                      | Level
                                      <span style="color: #000000"
                                        ><strong>Basic</strong></span
                                      >
                                    </p>
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      Reward Points
                                      <strong
                                        ><span style="color: #000000"
                                          >2000</span
                                        ></strong
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-3"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #6466f1;
                        border-radius: 10px 10px 0px 0px;
                        color: #000;
                        width: 650px;
                        margin: 0 auto;
                      "
                      width="650"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 25px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 10px;
                                  "
                                >
                                  <div
                                    style="
                                      color: #ffffff;
                                      font-family: Montserrat, Trebuchet MS,
                                        Lucida Grande, Lucida Sans Unicode,
                                        Lucida Sans, Tahoma, sans-serif;
                                      font-size: 16px;
                                      line-height: 120%;
                                      text-align: center;
                                      mso-line-height-alt: 19.2px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <strong
                                        ><span
                                          >Flight Confirmation</span
                                        ></strong
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-4"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #fff;
                        color: #000;
                        width: 650px;
                        margin: 0 auto;
                      "
                      width="650"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 10px;
                                    padding-left: 35px;
                                    padding-right: 10px;
                                    padding-top: 10px;
                                  "
                                >
                                  <div
                                    style="
                                      color: #232323;
                                      font-family: Montserrat, Trebuchet MS,
                                        Lucida Grande, Lucida Sans Unicode,
                                        Lucida Sans, Tahoma, sans-serif;
                                      font-size: 17px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 20.4px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <span>Confirmation Code</span>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="paragraph_block block-2"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 10px;
                                    padding-left: 35px;
                                    padding-right: 10px;
                                  "
                                >
                                  <div
                                    style="
                                      color: #000000;
                                      font-family: Montserrat, Trebuchet MS,
                                        Lucida Grande, Lucida Sans Unicode,
                                        Lucida Sans, Tahoma, sans-serif;
                                      font-size: 20px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 24px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <strong
                                        ><span
                                          >${data.bookingRecords[0].reference}</span
                                        ></strong
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            ${mapData}
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-37"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000;
                        width: 650px;
                        margin: 0 auto;
                      "
                      width="650"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="25%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #232323;
                                      font-family: Montserrat, Trebuchet MS,
                                        Lucida Grande, Lucida Sans Unicode,
                                        Lucida Sans, Tahoma, sans-serif;
                                      font-size: 14px;
                                      line-height: 120%;
                                      text-align: center;
                                      mso-line-height-alt: 16.8px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <a
                                        href="#"
                                        rel="noopener"
                                        style="
                                          text-decoration: none;
                                          color: #626262;
                                        "
                                        target="_blank"
                                        >Need Help</a
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class="column column-2"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="25%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #232323;
                                      font-family: Montserrat, Trebuchet MS,
                                        Lucida Grande, Lucida Sans Unicode,
                                        Lucida Sans, Tahoma, sans-serif;
                                      font-size: 14px;
                                      line-height: 120%;
                                      text-align: center;
                                      mso-line-height-alt: 16.8px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <a
                                        href="#"
                                        rel="noopener"
                                        style="
                                          text-decoration: none;
                                          color: #626262;
                                        "
                                        target="_blank"
                                        >Flight Deals</a
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class="column column-3"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="25%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #232323;
                                      font-family: Montserrat, Trebuchet MS,
                                        Lucida Grande, Lucida Sans Unicode,
                                        Lucida Sans, Tahoma, sans-serif;
                                      font-size: 14px;
                                      line-height: 120%;
                                      text-align: center;
                                      mso-line-height-alt: 16.8px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <a
                                        href="#"
                                        rel="noopener"
                                        style="
                                          text-decoration: none;
                                          color: #626262;
                                        "
                                        target="_blank"
                                        >Earn Miles</a
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class="column column-4"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="25%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #626262;
                                      font-family: Montserrat, Trebuchet MS,
                                        Lucida Grande, Lucida Sans Unicode,
                                        Lucida Sans, Tahoma, sans-serif;
                                      font-size: 14px;
                                      line-height: 120%;
                                      text-align: center;
                                      mso-line-height-alt: 16.8px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <span style="color: #626262"
                                        ><span
                                          ><a
                                            href="#"
                                            rel="noopener"
                                            style="
                                              text-decoration: none;
                                              color: #626262;
                                            "
                                            target="_blank"
                                            >Give</a
                                          ></span
                                        ><span
                                          ><a
                                            href="#"
                                            rel="noopener"
                                            style="
                                              text-decoration: none;
                                              color: #626262;
                                            "
                                            target="_blank"
                                          >
                                            Back</a
                                          ></span
                                        ></span
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-38"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000;
                        width: 650px;
                        margin: 0 auto;
                      "
                      width="650"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="divider_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div align="center" class="alignment">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="95%"
                                    >
                                      <tr>
                                        <td
                                          class="divider_inner"
                                          style="
                                            font-size: 1px;
                                            line-height: 1px;
                                            border-top: 1px dashed #bbbbbb;
                                          "
                                        >
                                          <span>
</span>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-39"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000;
                        width: 650px;
                        margin: 0 auto;
                      "
                      width="650"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="social_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div align="center" class="alignment">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="social-table"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        display: inline-block;
                                      "
                                      width="168px"
                                    >
                                      <tr>
                                        <td style="padding: 0 5px 0 5px">
                                          <a
                                            href="https://www.facebook.com"
                                            target="_blank"
                                            ><?xml version="1.0"?><svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 24 24"
                                              width="32px"
                                              height="32px"
                                            >
                                              <path
                                                d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"
                                              /></svg
                                          ></a>
                                        </td>
                                        <td style="padding: 0 5px 0 5px">
                                          <a
                                            href="https://www.twitter.com"
                                            target="_blank"
                                            ><?xml version="1.0"?><svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 24 24"
                                              width="32px"
                                              height="32px"
                                            >
                                              <path
                                                d="M22,3.999c-0.78,0.463-2.345,1.094-3.265,1.276c-0.027,0.007-0.049,0.016-0.075,0.023c-0.813-0.802-1.927-1.299-3.16-1.299 c-2.485,0-4.5,2.015-4.5,4.5c0,0.131-0.011,0.372,0,0.5c-3.353,0-5.905-1.756-7.735-4c-0.199,0.5-0.286,1.29-0.286,2.032 c0,1.401,1.095,2.777,2.8,3.63c-0.314,0.081-0.66,0.139-1.02,0.139c-0.581,0-1.196-0.153-1.759-0.617c0,0.017,0,0.033,0,0.051 c0,1.958,2.078,3.291,3.926,3.662c-0.375,0.221-1.131,0.243-1.5,0.243c-0.26,0-1.18-0.119-1.426-0.165 c0.514,1.605,2.368,2.507,4.135,2.539c-1.382,1.084-2.341,1.486-5.171,1.486H2C3.788,19.145,6.065,20,8.347,20 C15.777,20,20,14.337,20,8.999c0-0.086-0.002-0.266-0.005-0.447C19.995,8.534,20,8.517,20,8.499c0-0.027-0.008-0.053-0.008-0.08 c-0.003-0.136-0.006-0.263-0.009-0.329c0.79-0.57,1.475-1.281,2.017-2.091c-0.725,0.322-1.503,0.538-2.32,0.636 C20.514,6.135,21.699,4.943,22,3.999z"
                                              /></svg
                                          ></a>
                                        </td>
                                        <td style="padding: 0 5px 0 5px">
                                          <a
                                            href="https://www.instagram.com"
                                            target="_blank"
                                            ><?xml version="1.0"?><svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 24 24"
                                              width="32px"
                                              height="32px"
                                            >
                                              <path
                                                d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"
                                              /></svg
                                          ></a>
                                        </td>
                                        <td style="padding: 0 5px 0 5px">
                                          <a
                                            href="https://www.linkedin.com"
                                            target="_blank"
                                            ><?xml version="1.0"?><svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 24 24"
                                              width="32px"
                                              height="32px"
                                            >
                                              <path
                                                d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M9,17H6.477v-7H9 V17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2S8.551,8.717,7.694,8.717z M18,17h-2.442v-3.826c0-1.058-0.651-1.302-0.895-1.302s-1.058,0.163-1.058,1.302c0,0.163,0,3.826,0,3.826h-2.523v-7h2.523v0.977 C13.93,10.407,14.581,10,15.802,10C17.023,10,18,10.977,18,13.174V17z"
                                              /></svg
                                          ></a>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-2"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #626262;
                                      font-family: Montserrat, Trebuchet MS,
                                        Lucida Grande, Lucida Sans Unicode,
                                        Lucida Sans, Tahoma, sans-serif;
                                      font-size: 12px;
                                      line-height: 120%;
                                      text-align: center;
                                      mso-line-height-alt: 14.399999999999999px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <a
                                        href="#"
                                        rel="noopener"
                                        style="
                                          text-decoration: none;
                                          color: #626262;
                                        "
                                        target="_blank"
                                        >Manage Preferences</a
                                      >
                                      |
                                      <a
                                        href="#"
                                        rel="noopener"
                                        style="
                                          text-decoration: none;
                                          color: #626262;
                                        "
                                        target="_blank"
                                        >Help & Contact</a
                                      >�|
                                      <a
                                        href="#"
                                        rel="noopener"
                                        style="
                                          text-decoration: none;
                                          color: #626262;
                                        "
                                        target="_blank"
                                        >Privacy Notice</a
                                      >
                                      |
                                      <a
                                        href="#"
                                        rel="noopener"
                                        style="
                                          text-decoration: none;
                                          color: #626262;
                                        "
                                        target="_blank"
                                        >View Online</a
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-40"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000;
                        width: 650px;
                        margin: 0 auto;
                      "
                      width="650"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="icons_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    vertical-align: middle;
                                    color: #9d9d9d;
                                    font-family: inherit;
                                    font-size: 15px;
                                    padding-bottom: 5px;
                                    padding-top: 5px;
                                    text-align: center;
                                  "
                                >
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        class="alignment"
                                        style="
                                          vertical-align: middle;
                                          text-align: center;
                                        "
                                      >
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          class="icons-inner"
                                          role="presentation"
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            display: inline-block;
                                            margin-right: -4px;
                                            padding-left: 0px;
                                            padding-right: 0px;
                                          "
                                        >
                                          <tr>
                                            <td
                                              style="
                                                font-family: Montserrat,
                                                  Trebuchet MS, Lucida Grande,
                                                  Lucida Sans Unicode,
                                                  Lucida Sans, Tahoma,
                                                  sans-serif;
                                                font-size: 15px;
                                                color: #9d9d9d;
                                                vertical-align: middle;
                                                letter-spacing: undefined;
                                                text-align: center;
                                              "
                                            >
                                              <a
                                                href="#"
                                                style="
                                                  color: #9d9d9d;
                                                  text-decoration: none;
                                                "
                                                target="_blank"
                                                >&copy; 2023 TAVA All rights
                                                reserved</a
                                              >
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`
				return { htmlData: html }
			}
		const output_c064fe37_6578_44e2_9fee_a98fddc4ac30 =
			await runJavascriptCode_c064fe37_6578_44e2_9fee_a98fddc4ac30()
		const CreateEmailMessage_aca05f07_3c2b_40d4_9183_a2b9c3223c29 = {
			input: output_c064fe37_6578_44e2_9fee_a98fddc4ac30,
			params: request_8a9f9d44_cae9_434a_849f_73d8ea4be8e4,
			secrets: process.env,
		}
		const emailMessage_aca05f07_3c2b_40d4_9183_a2b9c3223c29 = {
			from: 'ayush.agarwal@innostax.com',
			to: 'agarwalayush10417@gmail.com',
			subject: 'Confirmation Flight Booking',
			html: ``,
		}
		const fileContent = fs.readFileSync(
			__dirname.split(`\controllers`)[0] +
				`/htmlfiles/CreateEmailMessage_aca05f07_3c2b_40d4_9183_a2b9c3223c29.ejs`,
			`utf8`
		)
		const htmlText = ejs.render(fileContent, {
			CreateEmailMessage_aca05f07_3c2b_40d4_9183_a2b9c3223c29,
		})
		let htmlContent = String(htmlText)
		if (htmlText.startsWith('&lt;'))
			htmlContent = convert(htmlContent, { wordwrap: 130 })
		const SendEmailMessage_9c565743_e227_455d_897b_386592a31c27 = {
			emailMessage: emailMessage_aca05f07_3c2b_40d4_9183_a2b9c3223c29,
			params: request_8a9f9d44_cae9_434a_849f_73d8ea4be8e4,
			secrets: process.env,
		}
		const emailServer_9c565743_e227_455d_897b_386592a31c27 = {
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		}

		const messageContent_9c565743_e227_455d_897b_386592a31c27 = {
			...SendEmailMessage_9c565743_e227_455d_897b_386592a31c27.emailMessage,
			emailServer: emailServer_9c565743_e227_455d_897b_386592a31c27,
			html: htmlContent,
		}
		const queueName_9c565743_e227_455d_897b_386592a31c27 =
			process.env.RABBITMQ_EMAIL_QUEUE

		const success_9c565743_e227_455d_897b_386592a31c27 =
			await RabbitMQClient.produce({
				data: messageContent_9c565743_e227_455d_897b_386592a31c27,
				queueName: queueName_9c565743_e227_455d_897b_386592a31c27,
			})
		if (
			success_9c565743_e227_455d_897b_386592a31c27.emailResponse.error ||
			success_9c565743_e227_455d_897b_386592a31c27.error
		)
			return res.json(
				success_9c565743_e227_455d_897b_386592a31c27.emailResponse.error ||
					success_9c565743_e227_455d_897b_386592a31c27.error
			)
		const ReturnSuccessResponse_d1fa7c37_108d_4ba8_8bd1_13c1abe53db2 = {
			output1: output_ee174534_8c18_424b_928b_292003c5067a,
			params: request_8a9f9d44_cae9_434a_849f_73d8ea4be8e4,
			secrets: process.env,
		}
		const updatedReturnSuccessResponse = {
			...ReturnSuccessResponse_d1fa7c37_108d_4ba8_8bd1_13c1abe53db2,
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
	book,
}
