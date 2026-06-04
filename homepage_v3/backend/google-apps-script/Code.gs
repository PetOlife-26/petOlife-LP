// ============================================================
//  PetOlife — Google Apps Script Web App
//  Author  : Akash M S  
//  Purpose : Serverless form handler for GitHub Pages frontend
//            → Saves submissions to Google Sheets
//            → Forwards contact messages to tech@petolife.com
//  Deploy  : Extensions → Apps Script → Deploy → Web App
//            Execute as : Me  |  Access : Anyone
// ============================================================

const CONFIG = {
  SHEET_NAME   : "PetOlife_Leads",
  NOTIFY_EMAIL : "tech@petolife.com",
  SITE_NAME    : "PetOlife",
};

// ── Entry point for POST requests ──────────────────────────
function doPost(e) {
  try {
    const raw  = e.postData && e.postData.contents;
    if (!raw) return jsonResponse(false, "No payload received.");

    const data = JSON.parse(raw);
    const type = (data.type || "general").toLowerCase();

    // Validate required fields
    if (!data.email || !isValidEmail(data.email)) {
      return jsonResponse(false, "Invalid or missing email address.");
    }

    // Write row to Google Sheet
    appendToSheet(data, type);

    // Send email notification for contact-form submissions
    if (type === "contact") {
      sendNotification(data);
    }

    return jsonResponse(true, "Saved successfully.");

  } catch (err) {
    Logger.log("doPost error: " + err.toString());
    return jsonResponse(false, "Server error: " + err.message);
  }
}

// ── Health-check for GET requests ──────────────────────────
function doGet(e) {
  return jsonResponse(true, CONFIG.SITE_NAME + " Apps Script is running.");
}

// ── Append a row to the Google Sheet ───────────────────────
function appendToSheet(data, type) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let   sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  // Auto-create sheet with headers if it doesn't exist yet
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    sheet.appendRow([
      "Timestamp (UTC)",
      "Type",
      "Name",
      "Email",
      "Subject",
      "Message",
      "Source Page",
    ]);
    // Style header row
    const header = sheet.getRange(1, 1, 1, 7);
    header.setFontWeight("bold");
    header.setBackground("#1a1a2e");
    header.setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    new Date().toISOString(),
    type,
    (data.name    || "").trim(),
    (data.email   || "").trim(),
    (data.subject || "").trim(),
    (data.message || "").trim(),
    (data.source  || "petolife-site"),
  ]);
}

// ── Email notification to tech@petolife.com ────────────────
function sendNotification(data) {
  const name    = data.name    || "Anonymous";
  const email   = data.email   || "—";
  const subject = data.subject || "General Enquiry";
  const message = data.message || "—";

  const emailSubject = `[${CONFIG.SITE_NAME}] New contact from ${name}`;

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
      <div style="background:#1a1a2e;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h2 style="color:#fff;margin:0;font-size:18px;">
          📬 New Contact Form Submission
        </h2>
      </div>
      <div style="border:1px solid #e0e0e0;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr>
            <td style="padding:8px 0;color:#666;width:90px;vertical-align:top;">Name</td>
            <td style="padding:8px 0;font-weight:bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#666;vertical-align:top;">Email</td>
            <td style="padding:8px 0;">
              <a href="mailto:${email}" style="color:#1a1a2e;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#666;vertical-align:top;">Subject</td>
            <td style="padding:8px 0;">${subject}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#666;vertical-align:top;">Message</td>
            <td style="padding:8px 0;white-space:pre-wrap;">${message}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#666;vertical-align:top;">Source</td>
            <td style="padding:8px 0;color:#999;font-size:12px;">${data.source || "petolife-site"}</td>
          </tr>
        </table>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
        <p style="font-size:12px;color:#aaa;margin:0;">
          This notification was generated automatically by the PetOlife Apps Script.
        </p>
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to      : CONFIG.NOTIFY_EMAIL,
    subject : emailSubject,
    htmlBody: htmlBody,
    replyTo : email,
  });
}

// ── Helpers ────────────────────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

function jsonResponse(success, message) {
  const payload = JSON.stringify({ success, message });
  return ContentService
    .createTextOutput(payload)
    .setMimeType(ContentService.MimeType.JSON);
}
