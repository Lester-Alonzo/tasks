import {mkdir} from 'fs/promises'
import {join} from 'path'

async function init() { 
    const path = join(__dirname, '../files')
    await mkdir(path)
}
init()