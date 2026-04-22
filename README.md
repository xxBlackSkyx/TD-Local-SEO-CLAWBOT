# OpenClaw Dashboard

Multi-device autonomous outreach system dashboard built with Next.js.

## Features

- 📊 Real-time email metrics and analytics
- 📧 Lead management with search/filter
- 💬 Reply inbox with Telegram notifications
- 🚀 One-click campaign triggers
- 📱 Multi-device access (phone, tablet, laptop)
- 🔄 24/7 autonomous operation

## Setup

```bash
npm install
npm run dev
```

## Deployment to Vercel

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables:
   - SSH_KEY_PATH (EC2 SSH key)
   - EC2_HOST (16.59.210.149)

## Architecture

- **Frontend**: Next.js React app
- **Backend**: Node.js API routes (SSH to EC2)
- **Database**: SQLite on EC2 (16.59.210.149)
- **Notifications**: Telegram Bot
- **Automation**: Cron jobs on EC2
