#!/bin/bash

# Simple test to verify all files are present and properly linked

echo "🧪 Wedding RSVP - File Structure Test"
echo "======================================"
echo ""

# Check if files exist
files=("index.html" "styles.css" "script.js" "google-apps-script.gs")
all_present=true

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file - Found"
    else
        echo "❌ $file - Missing!"
        all_present=false
    fi
done

echo ""

# Check if HTML links to CSS and JS
if [ -f "index.html" ]; then
    echo "Checking HTML file links..."
    
    if grep -q 'href="styles.css"' index.html; then
        echo "✅ CSS link found in HTML"
    else
        echo "❌ CSS link missing in HTML"
        all_present=false
    fi
    
    if grep -q 'src="script.js"' index.html; then
        echo "✅ JS link found in HTML"
    else
        echo "❌ JS link missing in HTML"
        all_present=false
    fi
fi

echo ""

# Check if Google Script URL is configured
if [ -f "script.js" ]; then
    if grep -q "AKfycbyA4teV1FLOzBndwIhxh4zjS03blRcbVotRut2RKGKi_1faf3tKZ2mSiw8UU15dMXOn" script.js; then
        echo "✅ Google Script URL configured"
    else
        echo "⚠️  Google Script URL may need configuration"
    fi
fi

echo ""
echo "======================================"

if [ "$all_present" = true ]; then
    echo "✅ All tests passed! Ready to deploy."
    echo ""
    echo "Next steps:"
    echo "1. Run: ./deploy.sh"
    echo "2. Or manually push to GitHub"
    echo "3. Your site will be live shortly!"
else
    echo "❌ Some files are missing or misconfigured."
    echo "Please check the errors above."
fi
