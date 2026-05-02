# 🚀 Interview Questions & Answers Web App

A web-based learning app built with **Firebase Authentication** and **Cloud Firestore**. Admins can add interview questions, and users can browse and view answers.

---

* GitHubPages : https://chandra1234456.github.io/DEV_PREP/user.html

## 📌 Project Overview

This project includes the following pages inside the `docs/` folder:

1. 🔐 **Login Page**
   * `docs/index.html`
   * Users sign in with email and password

2. 🛠️ **Admin Page**
   * `docs/admin.html`
   * Admins can add questions, answers, images, and optional code snippets

3. 👀 **Explore / User Page**
   * `docs/user.html`
   * Users can search, filter by difficulty, and open question details

4. 📄 **Question Details**
   * `docs/details.html`
   * Shows the full answer, optional image, and code example

---

## ✨ Features

* 🔑 Firebase Email/Password login
* ☁️ Firestore-backed question storage
* 🔍 Search and difficulty filtering
* 📂 Category-aware question collection structure
* ✨ Clean dark UI with cards and animations

---

## 🏗️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Database:** Firebase Cloud Firestore
* **Auth:** Firebase Authentication

---

## 📂 Project Structure

```
DEV_PREP/
├── docs/
│   ├── index.html
│   ├── admin.html
│   ├── user.html
│   ├── details.html
│   ├── auth.js
│   ├── admin.js
│   ├── user.js
│   ├── details.js
│   ├── firebase-config.js
│   ├── style.css
│   └── README.md
└── README.md
```

> The app is served from the `docs/` folder in this repository.

---

## 🔥 Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable **Authentication → Email/Password**
3. Enable **Firestore Database**
4. Add your Firebase configuration to `docs/firebase-config.js`

---

## 🗄️ Firestore Data Model

The app currently uses a `Categories` collection for questions:

```
Categories (collection)
  ├── <categoryName> (document)
        ├── questions (subcollection)
              ├── <questionId> (document)
                    ├── category: string
                    ├── difficulty: string
                    ├── question: string
                    ├── answer: string
                    ├── imageUri: string | null
                    ├── code: string | null
                    ├── timestamp: timestamp
```

This structure makes it easy to group questions by category while keeping the UI filterable.

---

## ▶️ Run Locally

### Option 1: Open directly

Open `docs/index.html` in your browser.

### Option 2: Use Live Server

If you use VS Code, install the Live Server extension and open the `docs/` folder.

---

## 🚀 Optional Deployment

Deploy to Firebase Hosting using:

```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

---

## 🛡️ Suggested Firestore Rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /Categories/{categoryId}/questions/{questionId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 📌 Notes

* Admin role control is not enforced in the current UI.
* The project is a solid starting point for role-based access, edit/delete flows, and responsive enhancements.

---

## 👨‍💻 Author

**Your Name**

* GitHub: https://github.com/your-username

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork it
* 📢 Share it
