import fs from 'fs'
import path from 'path'

const entries_path = path.resolve('./entries')

/**
 * Returns a list of all names of encyclopedia entries.
 */
export async function list_entries(): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(entries_path, (err, files) => {
            if (err) reject(err)
            else {
                const re = RegExp(/\.md$/)
                const file_list = files
                    .filter(file => re.test(file))
                    .map(files => files.replace(re, ''))
                resolve(file_list)
            }
        })
    })
}

/**
 * Saves an encyclopedia entry, given its title and Markdown 
 * content. If an existing entry with the same title exists, 
 * it is replaced.
 */
export async function save_entry(title: string, content: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${entries_path}/${title}.md`, content, (err) => {
            if (err) console.error(err) 
            reject(false)
        })
        resolve(true)
    })    
}

/**
 * Retrieves an encyclopedia entry by its title. If no such 
 * entry exists, the function returns false.
 */
export async function get_entry(title: string): Promise<string | boolean> {
    return new Promise((resolve, reject) => {
        fs.readFile(`${entries_path}/${title}.md`, 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                reject(false)
            } else {
                resolve(data)
            }
        })
        reject(false)
    })
}