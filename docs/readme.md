# 🚀 Interview Questions & Answers Web App

A web-based application built using **Firebase Authentication** and **Cloud Firestore** that allows admins to add interview questions and users to view them in real-time.

---

## 📌 Project Overview

This application consists of **3 main screens**:

1. 🔐 **Login Page**

   * Users log in using email & password
   * Authentication handled via Firebase

2. 🛠️ **Admin Panel**

   * Admin can add interview questions and answers
   * Data is stored in Firestore database

3. 👀 **User Dashboard**

   * Users can view all submitted interview questions & answers
   * Real-time updates using Firestore

---

## ✨ Features

* 🔑 Secure login using Firebase Authentication
* 🧑‍💼 Role-based access (Admin / User)
* ☁️ Cloud Firestore database integration
* 🔄 Real-time data updates
* 📱 Simple and clean UI

---

## 🏗️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend/Database:** Firebase

  * Firebase Authentication
  * Cloud Firestore

---

## 📂 Project Structure

```
interview-qa-app/
│
├── index.html          # Login Page
├── admin.html          # Admin Panel
├── dashboard.html      # User Dashboard
│
├── css/
│   └── styles.css
│
├── js/
│   ├── firebase-config.js
│   ├── auth.js
│   ├── admin.js
│   └── dashboard.js
│
└── README.md
```

---

## 🔥 Firebase Setup

1. Go to Firebase Console

2. Create a new project

3. Enable:

   * Authentication → Email/Password
   * Firestore Database

4. Add your Firebase config in:

```
js/firebase-config.js
```

---

## 🔐 Authentication

* Users sign in using email & password
* Admin access can be controlled by:

  * Hardcoded email
  * OR storing roles in Firestore (`users` collection)

---

## 🗄️ Firestore Database Structure

```
questions (collection)
   ├── docId
       ├── question: string
       ├── answer: string
       ├── createdAt: timestamp
```

Optional:

```
users (collection)
   ├── userId
       ├── role: "admin" | "user"
```

---

## ▶️ How to Run the Project

1. Clone the repository:

```bash
git clone https://github.com/your-username/interview-qa-app.git
cd interview-qa-app
```

2. Open in browser:

* Open `index.html`
  OR
* Use Live Server in VS Code

---

## 🚀 Deployment (Optional)

You can deploy using Firebase Hosting:

```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

---

## 🛡️ Firestore Security Rules (Basic)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /questions/{doc} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 📸 Screenshots (Add Here)

> You can add screenshots of:

* Login Page
* Admin Panel
* User Dashboard

Example:

```
![Login Page](screenshots/login.png)
```

---

## 📌 Future Enhancements

* 🔍 Search functionality
* ✏️ Edit/Delete questions
* ⭐ Favorite questions
* 📊 Admin analytics dashboard
* 📱 Fully responsive design

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

---
