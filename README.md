# Personal Finance Tracker

A modern and user-friendly Personal Finance Tracker built using **HTML**, **CSS**, and **JavaScript**. This application helps users manage their income and expenses, visualize spending habits through charts, and receive AI-powered financial advice using the Gemini API.

---

## Overview

The Personal Finance Tracker allows users to record their daily transactions, categorize them as income or expense, and monitor their financial status in real time.

The application stores transaction data using browser local storage, ensuring that user data remains available even after refreshing or reopening the browser.

Additionally, the application uses Google's Gemini API to generate personalized financial advice based on the user's spending patterns.

---

## Features

* Add income and expense transactions
* Categorize transactions for better expense tracking
* Automatically calculate:

  * Total Income
  * Total Expenses
  * Current Balance
* Filter transactions by:

  * Transaction Type
  * Month
* Delete unwanted transactions
* Interactive Pie Chart for expense visualization
* AI-powered financial advice using Gemini API
* Data persistence using Local Storage
* Responsive and clean user interface

---

## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Chart.js
* Google Gemini API
* Browser Local Storage

---

## AI Integration

The application uses Google's Gemini API to analyze expense categories and provide:

* Highest spending category
* Spending patterns
* Personalized saving tips
* Short financial advice

---

## Project Structure

```text
Personal-Finance-Tracker/

├── index.html
├── style.css
├── script.js
├── .gitignore
└── .env.example
```

---

## Setup Instructions

1. Clone the repository.

```bash
git clone <repository-url>
```

2. Open the project folder.

3. Open `script.js`.

4. Replace:

```javascript
const API_KEY = "YOUR_API_KEY";
```

with your own Gemini API key.

5. Open `index.html` in your browser.

---

## Note

For security reasons, the actual Gemini API key is **not included** in this repository.

The `.env.example` file is provided as a sample configuration file.

---

## Future Improvements

* User authentication
* Export transactions to PDF or Excel
* Dark mode support
* Budget planning and alerts
* Monthly financial reports
* Cloud database integration
