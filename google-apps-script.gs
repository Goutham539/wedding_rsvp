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
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Check if this is a message submission (has 'message' field but no 'guestName')
    // or an RSVP submission (has 'guestName' field)
    if (data.message && !data.guestName) {
      // This is a MESSAGE submission
      return handleMessageSubmission(data);
    } else {
      // This is an RSVP submission
      return handleRSVPSubmission(data);
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle RSVP form submissions
function handleRSVPSubmission(data) {
  const ss = SpreadsheetApp.openById('1KrLY0FcpydogVv7QBpq-iuL_yn4SCnV6cv1JOpRY9CE');
  const sheet = ss.getSheetByName('Sheet1') || ss.getSheets()[0];
  
  // Add headers if this is the first row
  if (sheet.getLastRow() === 0) {
    const headers = [
      'Timestamp',
      'Submitted At',
      'Full Name',
      'Email',
      'Phone Number',
      'Number of Guests',
      'Arrival Date',
      'Attendance',
      'Events Attending',
      'Fun Ideas'
    ];
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#d4af37');
    headerRange.setFontColor('#1e1a12');
    sheet.setFrozenRows(1);
  }
  
  try {
    // Prepare row data in the correct order
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.submittedAt || new Date().toLocaleString(),
      data.guestName || '',
      data.email || '',
      data.phone || '',
      data.guests || '',
      data.arrivalDate || '',
      data.attendance || '',
      data.eventsAttending || '',
      data.allergies || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'RSVP recorded' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // If there's an error, write it to the sheet
    sheet.appendRow(['ERROR', new Date().toString(), error.toString(), '', '', '', '', '', '', '']);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle Message/Highlights submissions
function handleMessageSubmission(data) {
  try {
    const ss = SpreadsheetApp.openById('1KrLY0FcpydogVv7QBpq-iuL_yn4SCnV6cv1JOpRY9CE');
    let messagesSheet = ss.getSheetByName('Messages');
    
    // Create Messages sheet if it doesn't exist
    if (!messagesSheet) {
      messagesSheet = ss.insertSheet('Messages');
      const headers = ['Timestamp', 'Name', 'Email', 'Message'];
      messagesSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      messagesSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      messagesSheet.getRange(1, 1, 1, headers.length).setBackground('#d4a574');
      messagesSheet.getRange(1, 1, 1, headers.length).setFontColor('#ffffff');
      messagesSheet.setFrozenRows(1);
    }
    
    // Add the message
    const messageData = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.message || ''
    ];
    
    messagesSheet.appendRow(messageData);
    
    // Send email notification
    sendMessageNotification(data);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Message received successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Send email notification for new messages
function sendMessageNotification(data) {
  try {
    const adminEmail = 'nerellagoutham5@gmail.com';
    const subject = `New Wedding Message from ${data.name}`;
    const body = `
You received a new message on your wedding website!

From: ${data.name}
Email: ${data.email}
Message: ${data.message}
Time: ${new Date(data.timestamp).toLocaleString()}

The message has been saved in the "Messages" sheet of your Wedding RSVP Responses spreadsheet.

---
Wedding Messages System
    `;
    
    MailApp.sendEmail(adminEmail, subject, body);
  } catch (error) {
    Logger.log('Error sending notification email: ' + error);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Wedding RSVP endpoint is active' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSpreadsheet() {
  // Use your specific spreadsheet ID
  const spreadsheetId = '1KrLY0FcpydogVv7QBpq-iuL_yn4SCnV6cv1JOpRY9CE';
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
    'Arrival Date',
    'Attendance',
    'Events Attending',
    'Fun Ideas'
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
  sheet.setColumnWidth(7, 120); // Arrival Date
  sheet.setColumnWidth(8, 130); // Attendance
  sheet.setColumnWidth(9, 350); // Events Attending
  sheet.setColumnWidth(10, 300); // Fun Ideas
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  return sheet;
}

// Test function - run this to test the spreadsheet connection
function testSpreadsheet() {
  try {
    Logger.log('Testing spreadsheet connection...');
    const ss = SpreadsheetApp.openById('1KrLY0FcpydogVv7QBpq-iuL_yn4SCnV6cv1JOpRY9CE');
    Logger.log('Spreadsheet opened: ' + ss.getName());
    
    let sheet = ss.getSheetByName('Sheet1') || ss.getSheets()[0];
    Logger.log('Sheet name: ' + sheet.getName());
    
    // Test write
    const testRow = ['TEST', new Date().toString(), 'Test Name', 'test@email.com', '1234567890', '2', '2026-03-13', 'Yes', 'Test message'];
    sheet.appendRow(testRow);
    Logger.log('Test row appended successfully!');
    
    return 'SUCCESS - Check your spreadsheet';
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    return 'ERROR: ' + error.toString();
  }
}

// Test function for Messages functionality
function testMessages() {
  try {
    Logger.log('Testing Messages functionality...');
    const ss = SpreadsheetApp.openById('1KrLY0FcpydogVv7QBpq-iuL_yn4SCnV6cv1JOpRY9CE');
    Logger.log('Spreadsheet opened: ' + ss.getName());
    
    // Get or create the Messages sheet
    let messagesSheet = ss.getSheetByName('Messages');
    if (!messagesSheet) {
      Logger.log('Messages sheet not found. Creating...');
      messagesSheet = ss.insertSheet('Messages');
      
      // Setup headers
      const headers = ['Timestamp', 'Name', 'Email', 'Message'];
      messagesSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      messagesSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      messagesSheet.getRange(1, 1, 1, headers.length).setBackground('#d4a574');
      messagesSheet.getRange(1, 1, 1, headers.length).setFontColor('#ffffff');
      messagesSheet.setFrozenRows(1);
      Logger.log('Messages sheet created with headers');
    } else {
      Logger.log('Messages sheet found: ' + messagesSheet.getName());
    }
    
    // Test write a message
    const testMessage = [
      new Date().toISOString(),
      'Test User',
      'test@example.com',
      'This is a test message for the wedding highlights section. Congratulations on your wedding!'
    ];
    messagesSheet.appendRow(testMessage);
    Logger.log('Test message appended successfully!');
    
    // Count messages
    const lastRow = messagesSheet.getLastRow();
    const messageCount = lastRow > 1 ? lastRow - 1 : 0;
    Logger.log('Total messages in sheet: ' + messageCount);
    
    return 'SUCCESS - Messages test completed! Total messages: ' + messageCount + '. Check the "Messages" sheet in your spreadsheet.';
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    return 'ERROR: ' + error.toString();
  }
}

// Combined test function to test both RSVP and Messages
function testAll() {
  Logger.log('=== Running All Tests ===');
  
  Logger.log('\n--- Testing RSVP ---');
  const rsvpResult = testSpreadsheet();
  Logger.log('RSVP Test Result: ' + rsvpResult);
  
  Logger.log('\n--- Testing Messages ---');
  const messagesResult = testMessages();
  Logger.log('Messages Test Result: ' + messagesResult);
  
  Logger.log('\n=== All Tests Completed ===');
  return 'RSVP: ' + rsvpResult + '\nMessages: ' + messagesResult;
}
