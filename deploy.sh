#!/bin/bash

# Wedding RSVP - GitHub Pages Deployment Script

echo "🎉 Wedding RSVP - GitHub Pages Setup"
echo "===================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

echo "📝 Please answer the following questions:"
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " github_username

# Get repository name
read -p "Enter repository name (e.g., wedding-rsvp): " repo_name

# Confirm
echo ""
echo "Repository will be created at: https://github.com/$github_username/$repo_name"
echo "Website will be available at: https://$github_username.github.io/$repo_name/"
echo ""
read -p "Is this correct? (y/n): " confirm

if [ "$confirm" != "y" ]; then
    echo "Setup cancelled."
    exit 0
fi

echo ""
echo "🚀 Setting up Git repository..."

# Initialize git if not already
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Add files
git add index.html styles.css script.js .gitignore README.md google-apps-script.gs
echo "✅ Files added to git"

# Commit
git commit -m "Initial commit: Wedding RSVP website"
echo "✅ Files committed"

# Set up remote
git branch -M main
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$github_username/$repo_name.git"
echo "✅ Remote repository configured"

echo ""
echo "📤 Next steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   - Go to: https://github.com/new"
echo "   - Repository name: $repo_name"
echo "   - Make it PUBLIC"
echo "   - Don't initialize with README"
echo "   - Click 'Create repository'"
echo ""
echo "2. Then run this command to push:"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to: https://github.com/$github_username/$repo_name/settings/pages"
echo "   - Source: Deploy from branch 'main'"
echo "   - Click Save"
echo ""
echo "4. Set up Google Sheets (see README.md for details)"
echo ""
echo "5. Your website will be live at:"
echo "   https://$github_username.github.io/$repo_name/"
echo ""
echo "✨ Setup complete! Follow the steps above to finish deployment."
