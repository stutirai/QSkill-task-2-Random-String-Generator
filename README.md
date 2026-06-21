#  QSkill Task 2 — Random String Generator

> Internship task submission completed as part of the **QSkill Frontend Development Internship**.

A React application that generates random strings, built specifically to demonstrate the use of three core React hooks — `useState`, `useCallback`, and `useEffect` — working together.

---

##  Live Demo

https://q-skill-task-2-random-string-genera.vercel.app/
---

## Task Preview

<p align="center">
  <img src="Screenshot.jpeg" width="600">
</p>
---

##  Task Description

> Create a basic React application that will help you to generate random strings. Please make sure that you have to use **useState**, **useCallback** & **useEffect** hooks for implementing that application.

---

##  Tech Stack

| Technology | Purpose |
|---|---|
| **React** | Component-based UI and state management |
| **React Hooks** | useState, useCallback, useEffect — core logic of the app |
| **Vite** | Fast development server and build tool |

---

##  Features

- Generate a random string with adjustable length (4–64 characters) using a slider
- Toggle character types on/off: uppercase, lowercase, numbers, symbols
- Automatically regenerates a new string whenever length or character options change
- Manually generate a new string with the **Generate New String** button
- Copy the generated string to clipboard with one click

---

##  How It Works — Hooks Breakdown

**`useState`**
Tracks five pieces of state: the desired string length, the selected character type options (an object with boolean flags), the currently generated string, and a flag to show "Copied" feedback after copying.

**`useCallback`**
The `generateString` function is wrapped in `useCallback` so it isn't recreated on every render — it only changes when `length` or `options` change. This matters because it's also used as a dependency inside `useEffect` below; without `useCallback`, that effect would run on every single render instead of only when needed. The `handleCopy` and `toggleOption` functions are similarly memoized.

**`useEffect`**
Watches the memoized `generateString` function as its dependency. Whenever `length` or `options` change (which causes `generateString` to be redefined), this effect automatically calls it — so the displayed string always stays in sync with the current settings, without the user needing to manually click "Generate" every time.

```javascript
const generateString = useCallback(() => {
  let charset = "";
  if (options.uppercase) charset += CHAR_SETS.uppercase;
  if (options.lowercase) charset += CHAR_SETS.lowercase;
  if (options.numbers) charset += CHAR_SETS.numbers;
  if (options.symbols) charset += CHAR_SETS.symbols;

  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  setGeneratedString(result);
}, [length, options]);

useEffect(() => {
  generateString();
}, [generateString]);
```

---

##  Folder Structure

```
task2-random-string/
├── public/                  → static assets served directly
├── src/
│   ├── assets/               → images used inside components
│   ├── App.jsx                → main component — generator logic and UI
│   ├── App.css                → component-level styles
│   ├── main.jsx                → app entry point, renders App into the DOM
│   └── index.css                → global styles
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

##  How to Run Locally

Clone or download the repository, then run:

```bash
npm install
npm run dev
```

Then open the app in your browser at:
```
http://localhost:5173
```

---

##  Author

**Stuti Rai**  
Frontend Development Intern — QSkill

- GitHub: [github.com/stutirai](https://github.com/stutirai)


---



## 📌 Note

This project was built as part of an internship task to demonstrate practical understanding of React's `useState`, `useCallback`, and `useEffect` hooks, and how they work together to keep UI state synchronized automatically.
