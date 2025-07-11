#!/bin/bash
# filepath: merge-dev.sh

# Exit on any error
set -e

echo "🔄 Starting merge process..."

# Step 1: Switch to main
echo "📍 Switching to main branch..."
git checkout main

# Step 2: Update main
echo "⬇️ Pulling latest main..."
git pull origin main

# Step 3: Merge dev
echo "🔀 Merging dev branch..."
git merge dev

# Step 4: Push changes
echo "⬆️ Pushing changes..."
git push origin main

echo "✅ Merge completed successfully!"