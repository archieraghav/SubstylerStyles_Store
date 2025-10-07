# Subtitle Style Marketplace ( for making different styles )

## What this is
A polished React single-page application that simulates a subtitle template marketplace. Users can browse subtitle styles, add them to a cart, and purchase using credits. Purchased templates persist in localStorage.

## Features
- 5 subtitle templates with distinct visual styles
- Add/remove single unit per template in cart (no duplicates)
- Checkout with credit deduction (starting balance: 500)
- Toast notifications, Framer Motion animations, responsive design
- Purchased state and credits saved to localStorage

## Tech
- React + Hooks
- Tailwind CSS
- Framer Motion (animations)
- react-hot-toast (notifications)

## Run locally (Windows / Linux / macOS)

1. Install Node.js (LTS recommended): https://nodejs.org/
2. Extract the zip to a folder, open terminal/PowerShell there.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm start
   ```
5. The app opens at `http://localhost:3000`

## Notes
- If your system blocks `react-scripts` install, try `npm install` again or use Node v18+.
- All important state (credits, purchased items) is stored in localStorage.

## Assumptions & Improvements
- No backend needed; everything runs client-side.
- Improvements: add filters, search, sample video preview, or real payments.
