# 💸 PIX Checkout (Next.js)

> A full-stack technical challenge: a PIX payment interface that generates a QR code and copy-paste code, keeping the payment API secret server-side through an internal middleware route.

## 📋 Overview

Solution to a technical challenge: an interface that consumes a payments API to create a PIX
transaction. It collects the buyer's data, sends it to an internal API route (which acts as
an authentication middleware), and shows the PIX details (QR code + copy-paste code) on a
separate result page, passing state between pages via the React Context API.

## 🔗 Live Demo

Deployed on Vercel: **[live demo](https://payevo-code-challenge-2.vercel.app/)**

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js (v14+, App Router) — internal API middleware + React frontend |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui |
| **HTTP** | Axios |
| **State** | React Context API |
| **QR Code** | `qrcode.react` |
| **Runtime** | Docker / Docker Compose (standalone production build) |

## 🧠 Technical Decision — protecting the API secret

The payment API uses Basic Auth. To keep the secret off the client, the app calls an
**internal API route (`/api/payments`)** that acts as a middleware: the frontend posts to
this route, which forwards the request to the external API server-side, so the secret key
never leaves the server (it lives in an environment variable).

## 🔧 How to Run Locally

Copy `.env.example` to `.env` and set:

```ini
PAYMENT_API_BASE_URL="<base URL of the payments API>"
PAYMENT_API_SECRET_KEY="sk_your_secret_here"
```

### Option 1 — Docker Compose (recommended)

```bash
docker compose up --build -d
```

### Option 2 — Local

```bash
npm install && npm run dev
```

App at `http://localhost:3000`.

## 👤 Author

**João Barbosa** — Software Engineer (backend / platform).
[LinkedIn](https://www.linkedin.com/in/joao1barbosa/) · [GitHub](https://github.com/joao1barbosa)
