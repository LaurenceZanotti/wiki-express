import express from 'express'
import dotenv from 'dotenv'
import { list_entries, save_entry, get_entry } from './util'


async function main() {
    dotenv.config()
    const port = process.env.SERVER_PORT || 3000
    const app = express()
    
    app.set('view engine', 'ejs')
    app.use(express.static('static'))
    
    app.get('/', async (req, res) => {
        const entries = await list_entries()
        res.render('template', {entries: entries})
    })

    app.get('/wiki/:title', async (req, res) => {
        const title = req.params.title
        const entry = await get_entry(title);
        res.send(entry)
    })
    
    app.listen(port, () => 
        console.log(`App running at http://localhost:${port}`)
    )
}

main()