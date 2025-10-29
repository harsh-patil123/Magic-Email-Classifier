Environment Setup Guide

✅ Environment File Created

The `.env.local` file has been created. Now you need to configure the following:

1.  Generate a Secure NextAuth Secret

For Production: Run this command in your terminal:

```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

For Development: The current secret in `.env.local` will work, but replace it before deploying to production.

2. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
1. Create a new project or select an existing one
1. Enable the Gmail API:
   - Go to "APIs & Services" > "Library"
   - Search for "Gmail API"
   - Click "Enable"
1. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Application type: Web application
   - Name: `Magic Email Classifier` (or any name)
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
   - Click "Create"
1. Copy your Client ID and Client Secret
1. Update `.env.local`:

   ```
   GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-actual-client-secret
   ```

1. Add Test User (Required)

In Google Cloud Console:

1. Go to "OAuth consent screen"
2. Under "Test users", click "Add Users"
3. Add: `theindianappguy@gmail.com`
4. Click "Save"

5. OpenAI API Key (Optional)

The user will enter their own OpenAI API key in the application. You don't need to set `OPENAI_API_KEY` in the `.env.local` file.

5.  Final `.env.local` Example

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-generated-secret-here>
GOOGLE_CLIENT_ID=<your-actual-client-id>.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=<your-actual-client-secret>
OPENAI_API_KEY=
```

🚀 Next Steps

1. Install Dependencies:

   ```bash
   npm install
   ```

2. Run the Development Server:

   ```bash
   npm run dev
   ```

3. Access the Application:
   - Open http://localhost:3000
   - Click "Login with Google"
   - Enter your OpenAI API key when prompted
   - Start classifying emails!

📝 Important Notes

- Do NOT commit `.env.local` to git (it's already in `.gitignore`)
- Replace `NEXTAUTH_SECRET` with a secure random string in production
- The Google Client ID and Secret are sensitive credentials - keep them secure
- Users must enter their own OpenAI API key in the application UI

❓ Troubleshooting

"Google OAuth not working":

- Check that redirect URI matches exactly: `http://localhost:3000/api/auth/callback/google`
- Verify test user email is added in OAuth consent screen

"Cannot fetch emails":

- Ensure Gmail API is enabled
- Check that the user has granted Gmail permissions
- Verify OAuth credentials are correct

"Classification fails":

- User must enter valid OpenAI API key
- Check OpenAI API key has access to GPT-4o model
- Ensure user has available API credits
