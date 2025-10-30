ChatGPT said:Library Books (React + Vite + Dexie) — CI with Jenkins
A simple Library Book Management app built with React + Vite.
Supports Add / Edit / Delete / View books. Data is stored locally in the browser using IndexedDB via Dexie—no backend required.
Features


📚 CRUD for books (title, author, ISBN, year, status)


🔎 Client-side search & sort on the list page


💾 Local DB with Dexie (IndexedDB)


✅ Vitest + Testing Library (JUnit report for CI)


🏭 Jenkins Pipeline: install → test → build → archive dist/ + dist.zip


🔔 GitHub Webhook via ngrok (or Poll SCM) to auto-trigger builds



Quick Start (Local)
