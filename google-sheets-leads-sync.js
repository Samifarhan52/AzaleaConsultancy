/**
 * ===================================================================
 * AZALEA TOURISM & CONSULTANCY - GOOGLE SHEETS LIVE LEADS SYNC
 * ===================================================================
 * 
 * Follow these 4 easy steps to auto-append all website leads to your Google Sheet:
 * 
 * STEP 1:
 * - Create a new Google Sheet (e.g. named "Azalea Consultancy Leads").
 * - In Row 1, add these exact column headers:
 *   [A1: Case Ref ID] | [B1: Date & Time (Doha)] | [C1: Full Name] | [D1: Mobile Number] | 
 *   [E1: Email Address] | [F1: Target Country] | [G1: Visa Category] | [H1: Education] | 
 *   [I1: Timeline] | [J1: Source] | [K1: Status]
 * 
 * STEP 2:
 * - In the top menu of your Google Sheet, click: Extensions > Apps Script.
 * - Delete any code in the editor and PASTE the code below.
 * - Click Save (floppy disk icon).
 * 
 * STEP 3:
 * - Click "Deploy" (blue button at top right) > "New deployment".
 * - Click the gear icon next to "Select type" and select "Web app".
 * - Description: "Azalea Leads Receiver"
 * - Execute as: "Me"
 * - Who has access: "Anyone" (VERY IMPORTANT)
 * - Click "Deploy" and Authorize access.
 * 
 * STEP 4:
 * - Copy the "Web app URL" (starts with https://script.google.com/macros/s/...)
 * - Go to your Azalea website: https://azaleaconsultancy.vercel.app/leads
 * - Paste the URL into the "Webhook URL" box and click "Save URL".
 * - Done! Every new lead will now automatically append as a new row in your Google Sheet!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Append row
    sheet.appendRow([
      data.id || "AZA-QA-" + Math.floor(1000 + Math.random() * 9000),
      data.date || new Date().toLocaleString("en-US", { timeZone: "Asia/Qatar" }),
      data.name || "N/A",
      data.mobile || "N/A",
      data.email || "N/A",
      data.targetCountry || "General Relocation",
      data.visaInterest || "General Visa",
      data.education || "N/A",
      data.timeline || "Immediate",
      data.source || "Website Form",
      data.status || "Active Lead"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", id: data.id }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
