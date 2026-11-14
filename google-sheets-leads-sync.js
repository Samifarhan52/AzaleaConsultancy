/**
 * ===================================================================
 * AZALEA TOURISM & CONSULTANCY - GOOGLE APPS SCRIPT LEADS RECEIVER
 * ===================================================================
 * 
 * INSTRUCTIONS FOR GOOGLE SHEETS:
 * 
 * STEP 1:
 * - Create a new Google Sheet (name it: "Azalea Consultancy Leads").
 * - In Row 1, add these exact column headers across Columns A to K:
 *   [A1: Case Ref ID] | [B1: Date & Time] | [C1: Full Name] | [D1: Mobile Number] | 
 *   [E1: Email Address] | [F1: Target Country] | [G1: Visa Interest] | [H1: Education] | 
 *   [I1: Timeline] | [J1: Source] | [K1: Status]
 * 
 * STEP 2:
 * - In the top menu of your Google Sheet, click: Extensions > Apps Script.
 * - Delete any code currently in the editor.
 * - Copy and PASTE the entire code block below into the editor.
 * - Click the Save (floppy disk) icon or press Ctrl+S / Cmd+S.
 * 
 * STEP 3:
 * - Click the blue "Deploy" button at the top-right > select "New deployment".
 * - Click the Gear icon (⚙️) next to "Select type" and choose "Web app".
 * - Enter:
 *     • Description: "Azalea Leads Webhook"
 *     • Execute as: "Me"
 *     • Who has access: "Anyone" (IMPORTANT: select "Anyone" so the website can send leads)
 * - Click "Deploy".
 * - If Google asks for permissions, click "Authorize access", sign in, click "Advanced", and click "Go to Azalea Leads Webhook (unsafe)".
 * 
 * STEP 4:
 * - Copy the "Web app URL" (it starts with: https://script.google.com/macros/s/...)
 * - Share that Web app URL with me in the chat.
 * - I will immediately connect it to the website so every new lead automatically appears in your Google Sheet in real time!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};
    
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }
    
    // Append the new lead as a clean row
    sheet.appendRow([
      data.id || "AZA-QA-" + Math.floor(1000 + Math.random() * 9000),
      data.date || new Date().toLocaleString("en-US", { timeZone: "Asia/Qatar" }),
      data.name || "N/A",
      data.mobile || "N/A",
      data.email || "N/A",
      data.targetCountry || "General Relocation",
      data.visaInterest || "General Visa Assessment",
      data.education || "N/A",
      data.timeline || "Immediate (1 - 3 Months)",
      data.source || "Website Assessment Form",
      data.status || "Active Lead"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Lead recorded successfully in Google Sheet",
      id: data.id
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Health check endpoint for testing in any web browser
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "Azalea Consultancy Google Sheets Leads Webhook",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}
