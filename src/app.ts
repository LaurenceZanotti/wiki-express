import express from 'express'
import dotenv from 'dotenv'
import { list_entries, save_entry, get_entry } from './util'


async function main() {
    dotenv.config()
    const port = process.env.API_PORT || 3000
    const app = express()
    
    app.set('view engine', 'ejs')
    app.use(express.static('static'))
    
    app.get('/', async (req, res) => {
        const entries = await list_entries()
        res.render('template', {entries: entries})
    })
    
    app.listen(port, () => console.log(`App running at http://localhost:${port}`))
}


main()