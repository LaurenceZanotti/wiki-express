import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.API_PORT || 3000
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index', { title: "Salve", message:"Aoba aoba, d boa?"}))

app.listen(port, () => console.log(`App running at http://localhost:${port}`))