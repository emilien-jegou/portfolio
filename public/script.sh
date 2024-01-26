#!/usr/bin/env bash

# Check for an input file
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <svg-file>"
    exit 1
fi


SVG_FILE=$1
BASE_NAME=$(basename "$SVG_FILE" .svg)
echo $BASE_NAME

# Define sizes for different images
SIZES=("16" "32" "48" "120" "152" "180" "192" "512")
OG_WIDTH=1200
OG_HEIGHT=630

# Convert SVG to a large PNG (e.g., 512x512)
inkscape -o "${BASE_NAME}-512.png" -w 512 -h 512 "$SVG_FILE"

# Generate different sizes
for SIZE in "${SIZES[@]}"; do
    convert "${BASE_NAME}-512.png" -resize "${SIZE}x${SIZE}" "${BASE_NAME}-${SIZE}.png"
done

# Generate OG image
convert "${BASE_NAME}-512.png" -resize "${OG_WIDTH}x${OG_HEIGHT}^" -gravity center -extent "${OG_WIDTH}x${OG_HEIGHT}" "${BASE_NAME}-og.png"

# Optimize PNG images
optipng "${BASE_NAME}-"*.png

echo "Images generated and optimized successfully."

