import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import routes from './routes'

const app = express()
const PORT = 8080

const {
    MONGODB_ATLAS_USERNAME,
    MONGODB_ATLAS_PASSWORD,
    MONGODB_ATLAS_DBNAME
} = process.env
const uri = `mongodb+srv://${MONGODB_ATLAS_USERNAME}:${MONGODB_ATLAS_PASSWORD}@cluster0.b3vux.mongodb.net/${MONGODB_ATLAS_DBNAME}?retryWrites=true&w=majority`

app.use(cors())
app.use(routes)

mongoose.connect(uri)
 .then(() => {
    app.listen(PORT, () => {
        console.info(`app is listening at http://localhost:${PORT}`)
    })
 })
 .catch((error) => {
     throw error
 })
