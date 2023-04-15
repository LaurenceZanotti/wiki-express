import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.API_PORT || 3000
const app = express()

app.listen(port, () => console.log(`App running at http://localhost:${port}`))