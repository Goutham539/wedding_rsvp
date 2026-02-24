// Google Apps Script for Wedding Messages/Guestbook Backend
// This handles storing and retrieving messages with replies

// Configuration
const SHEET_NAME = 'WeddingMessages';
const ADMIN_EMAIL = 'your-email@example.com'; // Replace with your email

// Get or create the messages sheet
function getMessagesSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Setup headers
    sheet.getRange(1, 1, 1, 6).setValues([
      ['Timestamp', 'Name', 'Email', 'Message', 'Reply', 'Reply Date']
    ]);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
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
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.message || '',
      '', // Empty reply initially
      ''  // Empty reply date
    ]);
    
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

// Handle GET requests (retrieve messages)
function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getMessages') {
      const sheet = getMessagesSheet();
      const data = sheet.getDataRange().getValues();
      
      // Skip header row
      const messages = [];
      for (let i = 1; i < data.length; i++) {
        messages.push({
          timestamp: data[i][0],
          name: data[i][1],
          email: data[i][2],
          message: data[i][3],
          reply: data[i][4],
          replyDate: data[i][5]
        });
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        messages: messages
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Default response
    return ContentService.createTextOutput(JSON.stringify({
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
      
      To reply, open your Google Sheet and add your reply in the "Reply" column for this message.
      
      ---
      Wedding Messages System
    `;
    
    MailApp.sendEmail(ADMIN_EMAIL, subject, body);
  } catch (error) {
    console.log('Error sending notification email:', error);
  }
}

// Function to add reply to a message (call this manually or create a custom menu)
function addReplyToMessage(row, replyText) {
  const sheet = getMessagesSheet();
  sheet.getRange(row, 5).setValue(replyText); // Column E: Reply
  sheet.getRange(row, 6).setValue(new Date().toISOString()); // Column F: Reply Date
}

// Create custom menu for easier management
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Wedding Messages')
    .addItem('View All Messages', 'showAllMessages')
    .addItem('Setup Script', 'setupInstructions')
    .addToUi();
}

function showAllMessages() {
  const ui = SpreadsheetApp.getUi();
  const sheet = getMessagesSheet();
  const lastRow = sheet.getLastRow();
  
  ui.alert(
    'Wedding Messages',
    `Total messages received: ${lastRow - 1}\n\nTo reply to a message:\n1. Find the message row\n2. Add your reply in column E\n3. The reply will appear on the website automatically`,
    ui.ButtonSet.OK
  );
}

function setupInstructions() {
  const ui = SpreadsheetApp.getUi();
  const scriptUrl = ScriptApp.getService().getUrl();
  
  ui.alert(
    'Setup Instructions',
    `1. Click "Deploy" > "New deployment"\n2. Select "Web app"\n3. Execute as: Me\n4. Who has access: Anyone\n5. Copy the Web App URL\n6. Paste it in wedding-site-script.js (GOOGLE_SCRIPT_URL)\n\nCurrent URL:\n${scriptUrl}`,
    ui.ButtonSet.OK
  );
}
