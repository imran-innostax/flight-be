require('dotenv').config()

const {
	createOrReplaceProcedures,
} = require('./database/storedProceduresScript.js')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { selectionRoute } = require('./routes')
const RabbitMQClient = require('./rabbitmq/client')
require('./dbConnection/dbConnect')

const port = process.env.BE_PORT

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text({ type: 'application/xml' }))
app.use(cors())
app.use('/', express.static('public'))
app.get(selectionRoute(app))
app.listen(port, async function () {
	await RabbitMQClient.initialize()
	console.log(`Server started on port ${port}`)
})
createOrReplaceProcedures()
module.exports = app
