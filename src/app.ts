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
        const search = typeof req.query.q == 'string' ? req.query.q : ''
        const entries = await list_entries()

        if (entries.includes(search))    
            res.redirect(`/wiki/${search}`)    
            
        res.render('template', {page: 'index', entries: entries})
    })

    app.get('/wiki/:title', async (req, res) => {
        const title = req.params.title
        const entry = await get_entry(title);
        if (entry)
            res.render('template', {
                page: 'entry', 
                title: title, 
                content: entry
            })
        else
            res.render('template', {
                page: 'entry', 
                title: 'Not found ¯\\_(ツ)_/¯', 
                content: ''
            })
    })
    
    app.listen(port, () => 
        console.log(`App running at http://localhost:${port}`)
    )
}

main()