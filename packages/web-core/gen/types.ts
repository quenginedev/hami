import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import axios from 'axios'

(async () => {
    const args = process.argv
    console.log(args)
    const projectPath = process.cwd()
    const { data: schemaData } = await axios.get(`http://localhost:3000/ts-types`)
    await writeFile(resolve(projectPath, 'hami.d.ts'), schemaData, { encoding: 'utf8' })
})()