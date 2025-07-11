/**
 * Project Setup Utility
 *
 * This script handles the initial project setup by allowing users to update
 * the project name across configuration files. It updates both package.json
 * and src/config.ts with the new project name.
 */

import fs from 'fs'
import { createInterface } from 'readline'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// ES Module equivalent for __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

/**
 * Updates the project name across configuration files
 * Updates both package.json and src/config.ts with the new name
 * @returns {Promise<void>}
 */
async function updateProjectName() {
  try {
    const newName = await new Promise((resolve) => {
      rl.question('Enter new project name: ', (answer) => {
        resolve(answer.trim())
      })
    })

    if (!newName) {
      console.log('Project name cannot be empty')
      rl.close()
      return
    }

    // Update package.json
    const packageJsonPath = join(__dirname, 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    packageJson.name = newName
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

    // Update config.ts
    const configPath = join(__dirname, 'src', 'config.ts')
    const configContent = fs.readFileSync(configPath, 'utf8')
    const updatedConfig = configContent.replace(/projectName: '.*'/, `projectName: '${newName}'`)
    fs.writeFileSync(configPath, updatedConfig)

    console.log(`Project name updated to: ${newName}`)
  } catch (error) {
    console.error('Error updating project name:', error)
  } finally {
    rl.close()
  }
}

updateProjectName()
