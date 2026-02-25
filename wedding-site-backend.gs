// Google Apps Script for Wedding Messages/Guestbook Backend
// This handles storing messages in a separate "Messages" sheet

// Configuration
const RSVP_SHEET_ID = '1KrLY0FcpydogVv7QBpq-iuL_yn4SCnV6cv1JOpRY9CE'; // Your existing RSVP sheet
const MESSAGES_SHEET_NAME = 'Messages';
const ADMIN_EMAIL = 'nerellagoutham5@gmail.com'; // Replace with your email

// Get or create the Messages sheet
function getMessagesSheet() {
  const ss = SpreadsheetApp.openById(RSVP_SHEET_ID);
  let sheet = ss.getSheetByName(MESSAGES_SHEET_NAME);
  
  if (!sheet) {
    // Create the Messages sheet if it doesn't exist
    sheet = ss.insertSheet(MESSAGES_SHEET_NAME);
    
    // Setup headers
    const headers = ['Timestamp', 'Name', 'Email', 'Message'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.getRange(1, 1, 1, headers.length).setBackground('#d4a574');
    sheet.getRange(1, 1, 1, headers.length).setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

// Handle POST requests (new messages)
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getMessagesSheet();
    
    // Add new message
    const messageData = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.message || ''
    ];
    
    sheet.appendRow(messageData);
    
    // Send email notification to admin
    sendNotificationEmail(data);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Message received successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests - Simple health check
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Wedding Messages API Active'
  })).setMimeType(ContentService.MimeType.JSON);
}
      status: 'success',
      message: 'Wedding Messages API'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Send email notification when new message is received
function sendNotificationEmail(data) {
  try {
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
    
    MailApp.sendEmail(ADMIN_EMAIL, subject, body);
  } catch (error) {
    console.log('Error sending notification email:', error);
  }
}

// Create custom menu for easier management
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Wedding Messages')
    .addItem('View Messages Count', 'showMessagesCount')
    .addItem('Setup Script', 'setupInstructions')
    .addToUi();
}

function showMessagesCount() {
  const ui = SpreadsheetApp.getUi();
  const sheet = getMessagesSheet();
  const lastRow = sheet.getLastRow();
  const messageCount = lastRow > 1 ? lastRow - 1 : 0; // Exclude header row
  
  ui.alert(
    'Wedding Messages',
    `Total messages received: ${messageCount}\n\nMessages are stored in the "${MESSAGES_SHEET_NAME}" sheet.`,
    ui.ButtonSet.OK
  );
}

function setupInstructions() {
  const ui = SpreadsheetApp.getUi();
  const scriptUrl = ScriptApp.getService().getUrl();
  
  ui.alert(
    'Setup Instructions',
    `1. Click "Deploy" > "New deployment"\n2. Select "Web app"\n3. Execute as: Me\n4. Who has access: Anyone\n5. Copy the Web App URL\n6. Paste it in wedding-site-script.js (GOOGLE_SCRIPT_URL)\n\nMessages will be stored in the "${MESSAGES_SHEET_NAME}" sheet.\n\nCurrent URL:\n${scriptUrl}`,
    ui.ButtonSet.OK
  );
}
