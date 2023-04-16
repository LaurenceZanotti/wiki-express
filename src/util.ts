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
                const file_list = files.filter(file => re.test(file))
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
export function save_entry(title: string, content: string): boolean {
    fs.writeFile(`${entries_path}/${title}.md`, content, (err) => {
        if (err) console.error(err) 
        return false 
    })
    return true
}

/**
 * Retrieves an encyclopedia entry by its title. If no such 
 * entry exists, the function returns None.
 */
export function get_entry(title: string) {}