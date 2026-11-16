/**
 * ===================================================================
 * AZALEA TOURISM & CONSULTANCY - GOOGLE APPS SCRIPT LEADS RECEIVER
 * ===================================================================
 * 
 * FIX FOR MOBILE NUMBER "#ERROR!":
 * When phone numbers start with "+" (e.g. "+974 51019991"), Google Sheets
 * interprets the leading "+" as an arithmetic formula operator (like =+974 51019991).
 * Because there is a space, Google Sheets fails to evaluate it and shows "#ERROR!".
 * 
 * THIS SCRIPT FIXES IT AUTOMATICALLY:
 * 1. It forces the phone number to be stored as a pure text string by prepending "'"
 *    and setting the cell NumberFormat to Plain Text ('@').
 * 2. It includes a built-in one-click utility `fixExistingPhoneErrors()` to repair
 *    all currently broken rows in your sheet.
 * 
 * -------------------------------------------------------------------
 * INSTRUCTIONS TO UPDATE GOOGLE APPS SCRIPT:
 * -------------------------------------------------------------------
 * 1. In your Google Sheet ("Azalea Consultancy Leads"), click:
 *    Extensions > Apps Script
 * 2. Select and DELETE all old code in the editor.
 * 3. Copy and PASTE this ENTIRE file into the editor.
 * 4. Click the Save icon (💾) or press Cmd+S / Ctrl+S.
 * 5. (To fix past rows): In the function dropdown at top, select "fixExistingPhoneErrors"
 *    and click "Run". All existing "#ERROR!" cells will turn into clean phone numbers!
 * 6. Click "Deploy" > "Manage deployments" > click the pencil (Edit) icon:
 *    - Version: select "New version"
 *    - Click "Deploy".
 * ===================================================================
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
    
    // Sanitize mobile number so Google Sheets treats it as plain text instead of a formula
    var rawMobile = (data.mobile || data.phone || "N/A").toString().trim();
    var safeMobile = rawMobile;
    if (safeMobile !== "N/A") {
      // Strip any existing formula equal signs
      safeMobile = safeMobile.replace(/^=+\+?/, "+");
      // Prepend single quote if not already present to force plain text in Sheets
      if (!safeMobile.startsWith("'")) {
        safeMobile = "'" + safeMobile;
      }
    }

    // Append the new lead as a clean row
    sheet.appendRow([
      data.id || "AZA-QA-" + Math.floor(1000 + Math.random() * 9000),
      data.date || new Date().toLocaleString("en-US", { timeZone: "Asia/Qatar" }),
      data.name || "N/A",
      safeMobile,
      data.email || "N/A",
      data.targetCountry || "General Relocation",
      data.visaInterest || "General Visa Assessment",
      data.education || "N/A",
      data.timeline || "Immediate (1 - 3 Months)",
      data.source || "Website Assessment Form",
      data.status || "Active Lead"
    ]);

    // Force Column D of the newly appended row to Plain Text formatting (@)
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 4).setNumberFormat('@');
    
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

/**
 * UTILITY: ONE-CLICK FIX FOR PAST #ERROR! ROWS IN COLUMN D
 * Select "fixExistingPhoneErrors" in the Apps Script function dropdown and click "Run".
 */
function fixExistingPhoneErrors() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  
  // Format entire Column D as Plain Text
  var range = sheet.getRange(2, 4, lastRow - 1, 1);
  range.setNumberFormat('@');
  
  var formulas = range.getFormulas();
  var values = range.getValues();
  
  for (var i = 0; i < formulas.length; i++) {
    var formula = formulas[i][0];
    var val = values[i][0];
    var cell = range.getCell(i + 1, 1);
    
    if (formula && formula.length > 0) {
      // Re-write formula as literal string with leading apostrophe
      var clean = formula.replace(/^=+\+?/, "+");
      cell.setValue("'" + clean);
    } else if (val && val.toString().startsWith("+")) {
      cell.setValue("'" + val.toString());
    }
  }
}
