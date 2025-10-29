Magic Email Classifier

A full-stack Next.js application that classifies Gmail emails using OpenAI GPT-4o and LangChain.js.

Features

- 🔐 Google OAuth authentication
- 📧 Fetches Gmail emails (subject, sender, snippet)
- 🤖 AI-powered email classification using OpenAI GPT-4o
- 📊 Categories: Important, Promotions, Social, Marketing, Spam, General
- 💾 localStorage-based data persistence
- 🎨 Modern TailwindCSS UI with two-pane layout
- 📱 Responsive design

- <img width="1657" height="839" alt="image" src="https://github.com/user-attachments/assets/84637a79-b747-4195-8b15-68ef7b8fdfa6" />


Tech Stack

- Framework: Next.js 14 (App Router) with TypeScript
- Styling: TailwindCSS
- Authentication: NextAuth.js with Google OAuth
- APIs: Gmail API, OpenAI API
- AI: LangChain.js with GPT-4o
- Storage: Browser localStorage

Prerequisites

- Node.js 18+ and npm/yarn
- Google Cloud Project with OAuth 2.0 credentials
- OpenAI API key

Setup Instructions

1.  Clone and Install

git clone [<repository-url>](https://github.com/harsh-patil123/Magic-Email-Classifier.git)
cd magic-email-classifier
npm install

2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
1. Create a new project or select an existing one
1. Enable the Gmail API
1. Go to APIs & Services > Credentials
1. Click Create Credentials > OAuth 2.0 Client ID
1. Application type: Web application
1. Add authorized redirect URIs:- `http://localhost:3000/api/auth/callback/google`
1. Copy the Client ID and Client Secret

1. Environment Variables

Create `.env.local` file:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Generate a secret for `NEXTAUTH_SECRET`: openssl rand -base64 32

4. Add Test User

In Google Cloud Console, under your OAuth 2.0 Client:

1. Go to OAuth consent screen
2. Add `theindianappguy@gmail.com` as a test user
3. Save changes

4. Run the Application

npm run dev

Visit `http://localhost:3000`

Demo Mode

If you don't have an OpenAI API key or wish to test the application without using the API, you can use the Demo Mode.

1.  After logging in with Google, you will be prompted to enter an API key.
2.  Click the "Use Demo Mode (No API Key Needed)" button.
3.  This bypasses the need for a real key. When you click "Classify," the application will return mock classifications for your emails, allowing you to test the full UI and workflow without making any API calls.

Usage

1. Login: Click "Login with Google" and authenticate
2. Set API Key: Enter your OpenAI API key, or click "Use Demo Mode" to proceed without a key.
3. Fetch Emails: Select the number of emails (10, 15, 25, 50) using the dropdown
4. Classify: Click the "Classify" button to categorize all emails
5. View Details: Click on any email to view details in the right pane
6. Filter: Use category tabs to filter emails

Project Structure

magic-email-classifier/
├── app/
│ ├── api/
│ │ ├── auth/[...nextauth]/route.ts
│ │ ├── gmail/route.ts
│ │ └── classify/route.ts
│ ├── dashboard/
│ │ └── page.tsx
│ ├── layout.tsx
│ ├── page.tsx
│ ├── providers.tsx
│ └── globals.css
├── components/
│ ├── APIKeyModal.tsx
│ ├── CategoryTabs.tsx
│ ├── DropdownSelector.tsx
│ ├── EmailCard.tsx
│ ├── EmailDetail.tsx
│ ├── EmailList.tsx
│ ├── Header.tsx
│ └── Loader.tsx
├── hooks/
│ ├── useAuth.ts
│ ├── useClassifier.ts
│ ├── useEmails.ts
│ └── useLocalStorage.ts
├── lib/
│ ├── authOptions.ts
│ ├── classifyPrompt.ts
│ ├── gmailClient.ts
│ └── openaiClient.ts
└── utils/
├── constants.ts
├── helpers.ts
└── localStorage.ts

How It Works

1. Authentication: Uses NextAuth.js for Google OAuth
2. Gmail Fetching: Server-side API route fetches emails using Google API
3. Classification: Emails are sent to OpenAI GPT-4o via LangChain
4. Storage: Emails and classifications stored in localStorage
5. UI: Two-pane layout displays email list and details

Categories

- Important: Urgent work emails, personal important matters
- Promotions: Sales, deals, offers from stores
- Social: Social media notifications, friend requests
- Marketing: Newsletters, marketing emails
- Spam: Unsolicited, suspicious emails
- General: Everything else

Development
npm run dev

Build
npm run build

Production
npm start

Notes

- OpenAI API key is stored locally in browser localStorage (not sent to server except for classification)
- In Demo Mode, classifications are mocked and not real.
- Email data persists in localStorage until manually cleared.
- Gmail API requires Gmail scope permissions
- All classifications are performed using OpenAI GPT-4o model

License

MIT

Author

Built for MagicSlides.app Full-Stack Engineer Intern assignment
