# PetOlife — Form Submission Infrastructure

**Contributor:** Akash M S  
**Scope:** Individual contribution — serverless form & email handling layer  
**Stack:** Google Apps Script · Google Sheets · React (Vite)  
**Deployment target:** GitHub Pages (static) — no backend server required

---

## What Was Built

This contribution sets up the complete **data collection and email notification pipeline** for the PetOlife landing page, which is hosted as a static site on GitHub Pages.

### Problem Solved

GitHub Pages only serves static files. There is no server to run Node.js, handle POST requests, or write to a database. The solution needed to be:

- ✅ Free (prototype stage)
- ✅ Serverless — no backend to deploy or maintain
- ✅ Secure — no credentials exposed in frontend code
- ✅ Immediately useful — team can view leads without a dashboard
- ✅ Drop-in replaceable when a real backend is built later

---

## Architecture Decision

| Option | Verdict | Reason |
|---|---|---|
| JSON file in repo | ❌ Rejected | Exposes user data in public codebase |
| Airtable API | ❌ Rejected | API key must live in frontend (security risk); paid after 1k records |
| Formspree | ⚠️ Skipped | Less control; harder to extend |
| **Google Apps Script** | ✅ **Chosen** | Runs on Google's servers, no key in frontend, free forever, emails built-in |

---

## Files in This Contribution

```
petolife/
├── google-apps-script/
│   └── Code.gs                ← Paste into Google Apps Script editor
├── src/
│   └── api/
│       └── endpoints.js       ← React API layer (import and use in components)
├── .env.example               ← Safe template — commit this
├── .gitignore                 ← Ensures .env is never committed
└── SETUP.md                   ← This file
```

---

## How It Works

```
User fills form on GitHub Pages
          │
          ▼
React frontend (endpoints.js)
  → POST request to Google Script URL
          │
          ▼
Google Apps Script (Code.gs)
  → Runs on Google's servers
  → Saves row to Google Sheet  ──→ Team views leads here
  → Sends email to tech@petolife.com  (contact forms only)
```

The Google Script URL is the only "secret" — it lives in `.env` locally and as a GitHub Actions secret for the CI/CD deploy.

---

## Setup Guide

### Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it: **PetOlife Leads** (or anything you like)
3. Leave it empty — the script creates the header row automatically on first submission

### Step 2 — Open Apps Script

1. In the Google Sheet: click **Extensions → Apps Script**
2. Delete all existing code in the editor
3. Paste the entire contents of `google-apps-script/Code.gs`
4. Click **Save** (💾) — name the project `PetOlife-FormHandler`

### Step 3 — Deploy as Web App

1. Click **Deploy → New Deployment**
2. Click the gear ⚙️ next to "Type" → select **Web App**
3. Fill in:
   - **Description:** `PetOlife form handler v1`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click **Deploy**
5. Authorize the permissions when prompted (this lets the script write to Sheets and send email)
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

### Step 4 — Configure the Frontend

1. In the project root, copy the template:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and paste your URL:
   ```env
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
   ```
3. Verify `.env` is in `.gitignore` — **never push this file**

### Step 5 — GitHub Pages Deployment (CI/CD)

Since `.env` is never pushed, set the variable as a **GitHub Secret** so it's injected at build time:

1. Go to your GitHub repo → **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Name: `VITE_GOOGLE_SCRIPT_URL`
4. Value: your Apps Script URL
5. In your `.github/workflows/deploy.yml`, add:
   ```yaml
   - name: Build
     run: npm run build
     env:
       VITE_GOOGLE_SCRIPT_URL: ${{ secrets.VITE_GOOGLE_SCRIPT_URL }}
   ```

---

## Using endpoints.js in Components

Import any function directly into your React component:

```jsx
import { subscribeNewsletter, submitContactForm, joinWaitlist } from '@/api/endpoints';

// Newsletter footer
const handleSubscribe = async () => {
  const res = await subscribeNewsletter(email);
  setMessage(res.message);
};

// Contact form
const handleContact = async () => {
  const res = await submitContactForm({ name, email, subject, message });
  setStatus(res); // { success: boolean, message: string }
};

// Waitlist CTA
const handleWaitlist = async () => {
  const res = await joinWaitlist({ name, email, role: 'pet owner' });
  setStatus(res);
};
```

All three functions return `{ success: boolean, message: string }` — ready to display directly in UI.

---

## What Gets Stored in Google Sheets

| Timestamp (UTC) | Type | Name | Email | Subject | Message | Source Page |
|---|---|---|---|---|---|---|
| 2026-06-04T18:30:00Z | newsletter | — | user@gmail.com | — | Newsletter subscription | petolife-footer-newsletter |
| 2026-06-04T18:45:00Z | contact | Rahul K | rahul@gmail.com | Partnership | Hi, I want to... | petolife-contact-form |
| 2026-06-04T19:00:00Z | waitlist | Priya S | priya@gmail.com | Early Access | Waitlist signup | petolife-waitlist-cta |

---

## Email Notifications

Contact form submissions (type = `"contact"`) automatically trigger an HTML email to `tech@petolife.com` with:
- Sender name and email (with `Reply-To` set so you can reply directly)
- Subject and full message
- Timestamp and source page

Newsletter and waitlist signups are **stored only** — no email sent (to avoid spam).

To enable email for other types, edit `Code.gs` line:
```js
if (type === "contact") {   // ← change to: type === "newsletter" || type === "contact"
```

---

## Updating the Script

If you modify `Code.gs`, you must **redeploy**:

1. Apps Script editor → **Deploy → Manage Deployments**
2. Click the pencil ✏️ on your deployment
3. Change version to **"New version"**
4. Click **Deploy**

The URL stays the same — no frontend changes needed.

---

## Handoff Notes for the Team

- **To view leads:** Open the Google Sheet (ask Akash for access or share it to the team Google account)
- **To add a new form type:** Add a call in `endpoints.js` using `postToSheet()`, pass a new `type` string — it auto-saves with the right label in Sheets
- **Production migration:** When the real Node.js/Express backend is ready, replace `VITE_GOOGLE_SCRIPT_URL` with the real API endpoint. `endpoints.js` interface stays identical — zero component changes needed.

---

*This infrastructure handles the full prototype phase comfortably (300–500 submissions, zero cost). Built to be replaced cleanly when the real backend ships.*
