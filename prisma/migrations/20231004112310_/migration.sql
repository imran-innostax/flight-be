-- CreateTable
CREATE TABLE "specialServiceRuleTable" (
    "id" TEXT NOT NULL,
    "enable" BOOLEAN DEFAULT false,
    "currency" VARCHAR(255),
    "origin" VARCHAR(255),
    "destination" VARCHAR(255),
    "carriercode" VARCHAR(255),
    "offermeals" BOOLEAN DEFAULT false,
    "offerseats" BOOLEAN DEFAULT false,
    "Offerfrequentflyermiles" BOOLEAN DEFAULT false,
    "offerpricewithincludedbaggage" BOOLEAN DEFAULT false,

    CONSTRAINT "specialServiceRuleTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "iata" VARCHAR(255),
    "cityName" VARCHAR(255),
    "airportName" VARCHAR(255),
    "country" VARCHAR(255),
    "countryCode" VARCHAR(255),
    "icon" VARCHAR(255),

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "orderId" VARCHAR(255),
    "orderRef" VARCHAR(255),
    "orderType" VARCHAR(255) DEFAULT 'INSTANT',
    "status" VARCHAR(255) DEFAULT 'PENDING',
    "reference" VARCHAR(255),
    "paymentIntentId" VARCHAR(255),
    "paymentStatus" VARCHAR(255) DEFAULT 'PENDING',
    "supplier" VARCHAR(255) DEFAULT 'AM',
    "createdAt" TIMESTAMPTZ(3) DEFAULT '2023-08-25 10:26:25 +00:00',
    "updatedAt" TIMESTAMPTZ(3) DEFAULT '2023-08-24 10:26:57.309 +00:00',
    "stripeSessionId" VARCHAR(255),
    "razorpayOrderId" VARCHAR(255),
    "flightOfferId" VARCHAR(255),
    "flightInternalSource" VARCHAR(255),
    "userEmail" VARCHAR(255),

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passenger" (
    "id" TEXT NOT NULL,
    "passengerId" VARCHAR(255),
    "countryCode" VARCHAR(255),
    "email" VARCHAR(255),
    "dateOfBirth" VARCHAR(255),
    "passengerType" VARCHAR(255),
    "title" VARCHAR(255) DEFAULT 'Mr',
    "gender" VARCHAR(255) DEFAULT 'MALE',
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "seatNumber" VARCHAR(255),
    "fareOption" VARCHAR(255),
    "bookingId" VARCHAR(255),
    "phone" VARCHAR(255),

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itinerary" (
    "id" TEXT NOT NULL,
    "duration" VARCHAR(255),
    "bookingId" VARCHAR(255),

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "number" VARCHAR(255),
    "issuanceDate" VARCHAR(255),
    "expiryDate" VARCHAR(255),
    "issuanceCountryCode" VARCHAR(255),
    "issuanceLocation" VARCHAR(255),
    "nationality" VARCHAR(255),
    "documentType" VARCHAR(255) DEFAULT 'PASSPORT',
    "passengerId" VARCHAR(255),
    "holder" BOOLEAN DEFAULT false,
    "birthPlace" VARCHAR(255),

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "basePrice" VARCHAR(255),
    "grandTotal" VARCHAR(255),
    "discountAmt" VARCHAR(255),
    "commissionAmt" VARCHAR(255),
    "currency" VARCHAR(255),
    "bookingId" VARCHAR(255),

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fee" (
    "id" TEXT NOT NULL,
    "type" VARCHAR(255),
    "amount" VARCHAR(255),
    "refundable" VARCHAR(255),
    "currency" VARCHAR(255),
    "priceId" VARCHAR(255),

    CONSTRAINT "Fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Baggage" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER,
    "weight" VARCHAR(255),
    "type" VARCHAR(255) DEFAULT 'CHECKED',
    "passengerId" VARCHAR(255),

    CONSTRAINT "Baggage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "departIataCode" VARCHAR(255),
    "departTerminal" VARCHAR(255),
    "departAt" VARCHAR(255),
    "arrivalIataCode" VARCHAR(255),
    "arrivalTerminal" VARCHAR(255),
    "arrivalAt" VARCHAR(255),
    "flightNumber" VARCHAR(255),
    "aircraftCode" VARCHAR(255),
    "duration" VARCHAR(255),
    "numberOfStops" INTEGER,
    "carrierCode" VARCHAR(255),
    "routeId" VARCHAR(255),
    "itineraryId" VARCHAR(255),

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fareDetailsByRoute" (
    "id" TEXT NOT NULL,
    "routeId" VARCHAR(255),
    "fareBasis" VARCHAR(255),
    "class" VARCHAR(255),
    "brandedFare" VARCHAR(255),
    "includedCheckedBagsUnit" INTEGER,
    "includedCheckedBagsWeight" INTEGER,
    "includedCheckedBagsWeightUnit" VARCHAR(255),
    "cabin" VARCHAR(255),
    "passengerId" VARCHAR(255),

    CONSTRAINT "fareDetailsByRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "accesstoken" VARCHAR(255),
    "refreshtoken" VARCHAR(255),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "enable" BOOLEAN DEFAULT false,
    "regionality" VARCHAR(255) DEFAULT 'DOMESTIC',
    "provider" VARCHAR(255),
    "validTill" TIMESTAMPTZ(3) DEFAULT '2023-09-10 18:32:05.470 +00:00',

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logging" (
    "id" TEXT NOT NULL,
    "corelationId" VARCHAR(255),
    "date" VARCHAR(255),
    "serviceType" VARCHAR(255),
    "logType" VARCHAR(255),
    "log" JSONB,
    "bookingId" VARCHAR(255),

    CONSTRAINT "logging_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Passenger" ADD CONSTRAINT "Passenger_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passenger"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Baggage" ADD CONSTRAINT "Baggage_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passenger"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fareDetailsByRoute" ADD CONSTRAINT "fareDetailsByRoute_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passenger"("id") ON DELETE SET NULL ON UPDATE CASCADE;
