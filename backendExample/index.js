import app from "./server.js"
import mongodb from "mongodb"
import 'dotenv/config'
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USERNAME']
const mongo_password = process.env['MONGO_PASSWORD']
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@firstcluster.0or611d.mongodb.net/?retryWrites=true&w=majority&appName=FirstCluster`

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})