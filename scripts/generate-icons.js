import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]
const iconSizes = ['home', 'contact'].map((name) => ({ name, size: 96 }))

async function generateIcons() {
  // Base SVG content for the app icon
  const baseIconSvg = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#1F3A8A"/>
      <text x="256" y="256" font-family="Arial" font-size="200" fill="white" text-anchor="middle" dominant-baseline="central">
        S
      </text>
    </svg>
  `

  // Create the public/icons directory if it doesn't exist
  await fs.mkdir('public/icons', { recursive: true })

  // Generate main app icons
  for (const size of sizes) {
    await sharp(Buffer.from(baseIconSvg))
      .resize(size, size)
      .png()
      .toFile(`public/icons/icon-${size}x${size}.png`)
    console.log(`Generated icon-${size}x${size}.png`)
  }

  // Generate specific icons for shortcuts
  for (const { name, size } of iconSizes) {
    const iconSvg = `
      <svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
        <rect width="96" height="96" fill="#1F3A8A"/>
        <text x="48" y="48" font-family="Arial" font-size="40" fill="white" text-anchor="middle" dominant-baseline="central">
          ${name[0].toUpperCase()}
        </text>
      </svg>
    `

    await sharp(Buffer.from(iconSvg))
      .resize(size, size)
      .png()
      .toFile(`public/icons/${name}-${size}x${size}.png`)
    console.log(`Generated ${name}-${size}x${size}.png`)
  }

  // Generate a sample screenshot
  const screenshotSvg = `
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
      <rect width="1080" height="1920" fill="#FFFFFF"/>
      <rect y="0" width="1080" height="80" fill="#1F3A8A"/>
      <text x="540" y="45" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="central">
        StudyDock App
      </text>
      <text x="540" y="960" font-family="Arial" font-size="40" fill="#1F3A8A" text-anchor="middle" dominant-baseline="central">
        Sample Screenshot
      </text>
    </svg>
  `

  await fs.mkdir('public/screenshots', { recursive: true })
  await sharp(Buffer.from(screenshotSvg))
    .jpeg({ quality: 90 })
    .toFile('public/screenshots/mobile-home.jpg')
  console.log('Generated mobile-home.jpg screenshot')
}

generateIcons().catch(console.error)
