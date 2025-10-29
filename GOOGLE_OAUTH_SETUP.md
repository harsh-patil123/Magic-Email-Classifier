Google OAuth Setup Guide

You're seeing a 400 error because the `.env.local` file still has placeholder values. Follow these steps to get your Google OAuth credentials:

Step 1: Create/Select a Google Cloud Project

1. Go to: https://console.cloud.google.com/
2. If you don't have a project, click "Create Project"
   - Project name: `Magic Email Classifier`
   - Click "Create"

Step 2: Enable Gmail API

1. In your project, go to: APIs & Services > Library
2. Search for: Gmail API
3. Click on Gmail API and click Enable

Step 3: Configure OAuth Consent Screen

1. Go to: APIs & Services > OAuth consent screen
2. Select: External (unless you have Google Workspace)
3. Click Create
4. Fill in the required fields:
   - App name: `Magic Email Classifier`
   - User support email: Your email
   - Developer contact: Your email
5. Click Save and Continue
6. On Scopes page, click Save and Continue
7. On Test users page:
   - Click Add Users
   - Add: `theindianappguy@gmail.com`
   - Click Add
   - Click Save and Continue

Step 4: Create OAuth Credentials

1. Go to: APIs & Services > Credentials
2. Click Create Credentials > OAuth 2.0 Client ID
3. Application type: Web application
4. Name: `Magic Email Classifier`
5. Authorized redirect URIs:
   - Click Add URI
   - Enter: `http://localhost:3000/api/auth/callback/google`
   - Click Create

Step 5: Copy Your Credentials

After creating, you'll see a modal with:

- Client ID: Something like `123456789-abcdefg.apps.googleusercontent.com`
- Client Secret: Something like `GOCSPX-abcdefghijklmnop`

Step 6: Update `.env.local`

Open `.env.local` and replace the placeholder values:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-key-please-replace-this-in-production
GOOGLE_CLIENT_ID=<paste-your-actual-client-id-here>
GOOGLE_CLIENT_SECRET=<paste-your-actual-client-secret-here>
OPENAI_API_KEY=
```

Example:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-key-please-replace-this-in-production
GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnop
OPENAI_API_KEY=
```

Step 7: Restart the Server

After updating `.env.local`, you need to restart the Next.js server:

1. Stop the current server (Ctrl+C in the terminal)
2. Run: `npm run dev`
3. Try logging in again

Troubleshooting
Error 400: redirect_uri_mismatch

- Make sure the redirect URI in Google Cloud Console is exactly: `http://localhost:3000/api/auth/callback/google`
- No trailing slash, no extra characters

Error 403: access_denied

- Make sure you added `theindianappguy@gmail.com` as a test user
- The user must accept the consent screen

Still seeing 400 error after setup

- Check that `.env.local` has the correct values (no typos)
- Make sure there are no extra spaces around the `=` sign
- Restart the Next.js dev server

Quick Checklist

- [ ] Gmail API is enabled
- [ ] OAuth consent screen is configured
- [ ] Test user `theindianappguy@gmail.com` is added
- [ ] OAuth 2.0 Client ID is created
- [ ] Redirect URI is set to `http://localhost:3000/api/auth/callback/google`
- [ ] `.env.local` has actual Client ID and Secret (not placeholders)
- [ ] Dev server is restarted after updating `.env.local`
