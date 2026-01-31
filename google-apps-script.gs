/**
 * Google Apps Script for Wedding RSVP Form
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Click "New Project"
 * 3. Copy and paste this code
 * 4. Click "Deploy" > "New deployment"
 * 5. Click the gear icon, select "Web app"
 * 6. Set "Execute as": Me
 * 7. Set "Who has access": Anyone
 * 8. Click "Deploy" and copy the Web App URL
 * 9. Paste the URL in your HTML file where it says: YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE
 * 
 * The script will automatically create a Google Sheet to store responses.
 */

function doPost(e) {
  try {
    // Get the active spreadsheet or create a new one
    const ss = getOrCreateSpreadsheet();
    const sheet = ss.getSheetByName('RSVP Responses') || createSheet(ss);
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Prepare row data in the correct order
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.submittedAt || new Date().toLocaleString(),
      data.guestName || '',
      data.email || '',
      data.phone || '',
      data.guests || '',
      data.attendance || '',
      data.meal || '',
      data.allergies || '',
      data.song || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'RSVP recorded' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Wedding RSVP endpoint is active' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSpreadsheet() {
  const scriptProperties = PropertiesService.getScriptProperties();
  let spreadsheetId = scriptProperties.getProperty('SPREADSHEET_ID');
  
  if (!spreadsheetId) {
    // Create a new spreadsheet
    const ss = SpreadsheetApp.create('Wedding RSVP Responses');
    spreadsheetId = ss.getId();
    scriptProperties.setProperty('SPREADSHEET_ID', spreadsheetId);
    return ss;
  }
  
  return SpreadsheetApp.openById(spreadsheetId);
}

function createSheet(ss) {
  const sheet = ss.insertSheet('RSVP Responses');
  
  // Set up headers
  const headers = [
    'Timestamp',
    'Submitted At',
    'Full Name',
    'Email',
    'Phone Number',
    'Number of Guests',
    'Attendance',
    'Meal Preference',
    'Allergies/Special Requests',
    'Song Request'
  ];
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#d4af37');
  headerRange.setFontColor('#1e1a12');
  
  // Set column widths
  sheet.setColumnWidth(1, 150); // Timestamp
  sheet.setColumnWidth(2, 150); // Submitted At
  sheet.setColumnWidth(3, 180); // Full Name
  sheet.setColumnWidth(4, 220); // Email
  sheet.setColumnWidth(5, 130); // Phone
  sheet.setColumnWidth(6, 120); // Guests
  sheet.setColumnWidth(7, 130); // Attendance
  sheet.setColumnWidth(8, 130); // Meal
  sheet.setColumnWidth(9, 250); // Allergies
  sheet.setColumnWidth(10, 200); // Song
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  return sheet;
}

// Test function - run this to create the spreadsheet manually if needed
function setupSpreadsheet() {
  const ss = getOrCreateSpreadsheet();
  const sheet = ss.getSheetByName('RSVP Responses') || createSheet(ss);
  Logger.log('Spreadsheet URL: ' + ss.getUrl());
  return ss.getUrl();
}
