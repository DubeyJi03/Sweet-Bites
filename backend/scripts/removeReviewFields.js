/**
 * Script to remove review-related fields from product data files
 */

const fs = require('fs');
const path = require('path');

// Data files to process
const dataFiles = [
  path.join(__dirname, '../data/ladoos.js'),
  path.join(__dirname, '../data/sweets.js'),
  path.join(__dirname, '../data/mithai.js'),
  path.join(__dirname, '../data/products.js')
];

// Process each file
dataFiles.forEach(filePath => {
  console.log(`Processing ${filePath}...`);
  
  // Read the file content
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove rating, reviewCount/numReviews, and reviews array
  content = content.replace(/\s+rating:\s+\d+\.\d+,/g, '');
  content = content.replace(/\s+reviewCount:\s+\d+,/g, '');
  content = content.replace(/\s+numReviews:\s+\d+,/g, '');
  
  // Remove entire reviews array including all nested objects
  content = content.replace(/\s+reviews:\s+\[\s+[\s\S]*?\s+\],/g, '');
  
  // Clean up any double commas that might have been created
  content = content.replace(/,\s*,/g, ',');
  
  // Write the updated content back to the file
  fs.writeFileSync(filePath, content, 'utf8');
  
  console.log(`Completed processing ${filePath}`);
});

console.log('All product data files have been updated to remove review fields.');