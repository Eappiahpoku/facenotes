/**
 * StudyDock Icon Generator V1
 * Generates modern, Ghana-optimized icons with green/teal theme
 * Inspired by the circular dollar sign design with gradient backgrounds
 */

import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

// ===== Constants & Config =====
const sizes = [72, 96, 128, 144, 152, 192, 384, 512]
const iconSizes = ['home', 'contact'].map((name) => ({ name, size: 96 }))

// StudyDock brand colors - inspired by the green dollar sign icon
const colors = {
  primary: '#059669',     // Emerald 600 - main green
  secondary: '#10B981',   // Emerald 500 - lighter green  
  accent: '#065F46',      // Emerald 800 - darker green
  white: '#FFFFFF',       // Pure white for text
  gradientStart: '#059669', // Primary green
  gradientEnd: '#10B981'    // Secondary green
}

// ===== Helper Functions =====

/**
 * Creates a circular StudyDock logo SVG with gradient background
 * @param {number} size - The size of the icon in pixels
 * @param {string} letter - The letter to display (default: 'S')
 * @param {string} gradientId - Unique ID for the gradient
 * @returns {string} Complete SVG markup
 */
function createStudyDockIcon(size, letter = 'S', gradientId = 'grad1') {
  const fontSize = Math.floor(size * 0.4) // 40% of icon size for text
  const circleRadius = size * 0.45 // 45% of icon size for circle
  const center = size / 2
  
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Gradient definition for modern look -->
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.gradientStart};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.gradientEnd};stop-opacity:1" />
        </linearGradient>
        <!-- Shadow filter for depth -->
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="rgba(0,0,0,0.2)"/>
        </filter>
      </defs>
      
      <!-- Background circle with gradient -->
      <circle 
        cx="${center}" 
        cy="${center}" 
        r="${circleRadius}" 
        fill="url(#${gradientId})" 
        filter="url(#shadow)"
      />
      
      <!-- Inner white circle for contrast -->
      <circle 
        cx="${center}" 
        cy="${center}" 
        r="${circleRadius * 0.85}" 
        fill="${colors.white}" 
        opacity="0.1"
      />
      
      <!-- StudyDock letter -->
      <text 
        x="${center}" 
        y="${center}" 
        font-family="Arial, sans-serif" 
        font-size="${fontSize}" 
        font-weight="bold"
        fill="${colors.white}" 
        text-anchor="middle" 
        dominant-baseline="central"
        style="text-shadow: 0 2px 4px rgba(0,0,0,0.3);"
      >
        ${letter}
      </text>
    </svg>
  `
}

/**
 * Creates shortcut icons with specific symbols for each app section
 * @param {string} iconType - Type of icon ('home', 'contact', etc.)
 * @param {number} size - Size of the icon
 * @returns {string} SVG markup for the specific icon
 */
function createShortcutIcon(iconType, size) {
  const center = size / 2
  const circleRadius = size * 0.4
  
  // Different symbols for different sections
  const iconSymbols = {
    home: '🏠',
    contact: '📞'
  }
  
  const symbol = iconSymbols[iconType] || iconType[0].toUpperCase()
  const fontSize = Math.floor(size * 0.3)
  
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shortcut-grad-${iconType}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.secondary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.primary};stop-opacity:1" />
        </linearGradient>
        <filter id="shortcut-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.2)"/>
        </filter>
      </defs>
      
      <!-- Background circle -->
      <circle 
        cx="${center}" 
        cy="${center}" 
        r="${circleRadius}" 
        fill="url(#shortcut-grad-${iconType})" 
        filter="url(#shortcut-shadow)"
      />
      
      <!-- Icon symbol -->
      <text 
        x="${center}" 
        y="${center}" 
        font-family="Arial, sans-serif" 
        font-size="${fontSize}" 
        font-weight="bold"
        fill="${colors.white}" 
        text-anchor="middle" 
        dominant-baseline="central"
      >
        ${symbol}
      </text>
    </svg>
  `
}

// ===== Main Logic =====

/**
 * Main function to generate all StudyDock icons
 * Optimized for Ghana's mobile-first environment
 */
async function generateStudyDockIcons() {
  console.log('🚀 Starting StudyDock Icon Generation V1...')
  console.log('📱 Optimized for Ghana mobile users with low-bandwidth friendly icons')
  
  try {
    // Create the public/icons-v1 directory if it doesn't exist
    await fs.mkdir('public/icons-v1', { recursive: true })
    console.log('📁 Created icons-v1 directory')

    // Generate main StudyDock app icons with modern gradient design
    console.log('🎨 Generating main app icons...')
    for (const size of sizes) {
      const iconSvg = createStudyDockIcon(size, 'S', `grad-${size}`)
      
      await sharp(Buffer.from(iconSvg))
        .resize(size, size)
        .png({
          quality: 90,           // High quality for crisp icons
          compressionLevel: 9,   // Maximum compression for smaller file sizes
          palette: true          // Use palette for smaller file sizes (good for Ghana's bandwidth)
        })
        .toFile(`public/icons-v1/icon-${size}x${size}.png`)
      
      console.log(`✅ Generated icon-${size}x${size}.png`)
    }

    // Generate specific shortcut icons for app sections
    console.log('🔗 Generating shortcut icons...')
    for (const { name, size } of iconSizes) {
      const shortcutSvg = createShortcutIcon(name, size)
      
      await sharp(Buffer.from(shortcutSvg))
        .resize(size, size)
        .png({
          quality: 90,
          compressionLevel: 9,
          palette: true
        })
        .toFile(`public/icons-v1/${name}-${size}x${size}.png`)
      
      console.log(`✅ Generated ${name}-${size}x${size}.png`)
    }

    // Generate a modern mobile screenshot for PWA
    console.log('📸 Generating mobile screenshot...')
    const screenshotSvg = `
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="header-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="1080" height="1920" fill="#F9FAFB"/>
        
        <!-- Header with gradient -->
        <rect y="0" width="1080" height="120" fill="url(#header-grad)"/>
        
        <!-- StudyDock logo in header -->
        <circle cx="150" cy="60" r="30" fill="${colors.white}" opacity="0.2"/>
        <text x="150" y="60" font-family="Arial" font-size="24" font-weight="bold" fill="${colors.white}" text-anchor="middle" dominant-baseline="central">S</text>
        
        <!-- App title -->
        <text x="900" y="75" font-family="Arial" font-size="28" font-weight="bold" fill="${colors.white}" text-anchor="middle" dominant-baseline="central">
          StudyDock App
        </text>
        
        <!-- Sample content area -->
        <rect x="40" y="200" width="1000" height="600" rx="20" fill="${colors.white}" stroke="#E5E7EB" stroke-width="2"/>
        
        <!-- Sample content text -->
        <text x="540" y="500" font-family="Arial" font-size="32" fill="${colors.primary}" text-anchor="middle" dominant-baseline="central">
          Mobile-First Design
        </text>
        <text x="540" y="550" font-family="Arial" font-size="24" fill="${colors.accent}" text-anchor="middle" dominant-baseline="central">
          Optimized for Ghana
        </text>
        
        <!-- Bottom navigation simulation -->
        <rect y="1780" width="1080" height="140" fill="${colors.white}" stroke="#E5E7EB" stroke-width="2"/>
        <circle cx="270" cy="1850" r="25" fill="${colors.secondary}"/>
        <circle cx="540" cy="1850" r="25" fill="${colors.primary}"/>
        <circle cx="810" cy="1850" r="25" fill="${colors.secondary}"/>
      </svg>
    `

    await fs.mkdir('public/screenshots', { recursive: true })
    await sharp(Buffer.from(screenshotSvg))
      .jpeg({ 
        quality: 75,  // Balanced quality for screenshots (optimized for Ghana bandwidth)
        progressive: true // Progressive loading for better perceived performance
      })
      .toFile('public/screenshots/mobile-home-v1.jpg')
    
    console.log('✅ Generated mobile-home-v1.jpg screenshot')

    // Generate favicon.svg for modern browsers
    console.log('🔖 Generating favicon...')
    const faviconSvg = createStudyDockIcon(32, 'S', 'favicon-grad')
    await fs.writeFile('public/favicon-v1.svg', faviconSvg)
    console.log('✅ Generated favicon-v1.svg')

    console.log('🎉 All StudyDock icons generated successfully!')
    console.log('📊 Total files created:')
    console.log(`   • ${sizes.length} main app icons`)
    console.log(`   • ${iconSizes.length} shortcut icons`)
    console.log('   • 1 mobile screenshot')
    console.log('   • 1 favicon')
    console.log('')
    console.log('🌍 Icons are optimized for:')
    console.log('   • Ghana mobile users (Android 6+)')
    console.log('   • Low bandwidth conditions')
    console.log('   • Offline-first PWA functionality')
    console.log('   • Touch-friendly design')

  } catch (error) {
    console.error('❌ Error generating icons:', error)
    process.exit(1)
  }
}

// Run the icon generation
generateStudyDockIcons().catch(console.error)
