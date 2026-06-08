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
  SHEET_NAME   : "Sheet1",
  NOTIFY_EMAIL : "tech@petolife.com",
  SITE_NAME    : "PetOlife",
};

function doPost(e) {
  try {
    const raw = e.postData && e.postData.contents;
    if (!raw) return jsonResponse(false, "No payload received.");

    const data = JSON.parse(raw);
    const type = (data.type || "general").toLowerCase();

    if (!data.email || !isValidEmail(data.email)) {
      return jsonResponse(false, "Invalid or missing email address.");
    }

    appendToSheet(data, type);
    sendNotification(data, type);

    return jsonResponse(true, "Saved successfully.");

  } catch (err) {
    Logger.log("doPost error: " + err.toString());
    return jsonResponse(false, "Server error: " + err.message);
  }
}

function doGet(e) {
  return jsonResponse(true, CONFIG.SITE_NAME + " Apps Script is running.");
}

function appendToSheet(data, type) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let   sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  // Write headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp (UTC)",
      "Form Type",
      "Name",
      "Email",
      "Mobile",
      "City",
      "Extra Info",
      "Early Access",
    ]);
    const header = sheet.getRange(1, 1, 1, 8);
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
    (data.mobile  || "").trim(),
    (data.city    || "").trim(),
    (data.extra   || "").trim(),
    (data.earlyAccess ? "Yes" : "No"),
  ]);
}

function sendNotification(data, type) {
  const name    = data.name  || "Anonymous";
  const email   = data.email || "—";

  const isVet    = type === "vet";
  const formLabel = isVet ? "Veterinarian Interest Form" : "Pet Parent Interest Form";
  const emailSubject = `[PetOlife] New ${formLabel} — ${name}`;

  const rows = isVet ? `
    <tr><td style="color:#666;padding:8px 0;width:140px;">Form</td><td style="padding:8px 0;font-weight:bold;">Veterinarian Interest</td></tr>
    <tr><td style="color:#666;padding:8px 0;">Doctor Name</td><td style="padding:8px 0;">${name}</td></tr>
    <tr><td style="color:#666;padding:8px 0;">Clinic</td><td style="padding:8px 0;">${data.extra || "—"}</td></tr>
    <tr><td style="color:#666;padding:8px 0;">Mobile</td><td style="padding:8px 0;">${data.mobile || "—"}</td></tr>
    <tr><td style="color:#666;padding:8px 0;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
    <tr><td style="color:#666;padding:8px 0;">City</td><td style="padding:8px 0;">${data.city || "—"}</td></tr>
    <tr><td style="color:#666;padding:8px 0;">Early Access</td><td style="padding:8px 0;">${data.earlyAccess ? "Yes" : "No"}</td></tr>
  ` : `
    <tr><td style="color:#666;padding:8px 0;width:140px;">Form</td><td style="padding:8px 0;font-weight:bold;">Pet Parent Interest</td></tr>
    <tr><td style="color:#666;padding:8px 0;">Name</td><td style="padding:8px 0;">${name}</td></tr>
    <tr><td style="color:#666;padding:8px 0;">Mobile</td><td style="padding:8px 0;">${data.mobile || "—"}</td></tr>
    <tr><td style="color:#666;padding:8px 0;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
    <tr><td style="color:#666;padding:8px 0;">City</td><td style="padding:8px 0;">${data.city || "—"}</td></tr>
    <tr><td style="color:#666;padding:8px 0;">Pet Type</td><td style="padding:8px 0;">${data.extra || "—"}</td></tr>
    <tr><td style="color:#666;padding:8px 0;">Has Pet</td><td style="padding:8px 0;">${data.hasPet ? "Yes" : "No"}</td></tr>
    <tr><td style="color:#666;padding:8px 0;">Early Access</td><td style="padding:8px 0;">${data.earlyAccess ? "Yes" : "No"}</td></tr>
  `;

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
      <div style="background:#1a1a2e;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h2 style="color:#fff;margin:0;font-size:18px;">📬 ${formLabel}</h2>
      </div>
      <div style="border:1px solid #e0e0e0;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
        <p style="font-size:12px;color:#aaa;margin:0;">Auto-generated by PetOlife Apps Script.</p>
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

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

function jsonResponse(success, message) {
  return ContentService
    .createTextOutput(JSON.stringify({ success, message }))
    .setMimeType(ContentService.MimeType.JSON);
}
