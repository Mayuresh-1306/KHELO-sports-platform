# 🏆 KHELO - Multi-Sport Athlete Platform

![Status](https://img.shields.io/badge/Status-Beta-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-MERN-purple?style=for-the-badge)

**KHELO** is a modern, full-stack sports platform designed to bridge the gap between athletes and opportunities. It serves as a centralized hub where players from various disciplines (Football, Cricket, Tennis, etc.) can build professional profiles, track performance statistics, manage official documents, and showcase their achievements to scouts and teams.

---

## ✨ Key Features

### 👤 **Player Management**
* **Dynamic Profiles:** Create and edit professional athlete profiles with physical stats and personal details.
* **Multi-Sport Support:** Flexible architecture supporting distinct metrics for different sports (e.g., Goals for Football vs. Runs for Cricket).
* **Achievement Portfolio:** dedicated section to showcase trophies, medals, and certifications with visual badges.

### 📊 **Analytics & Dashboard**
* **Visual Statistics:** Interactive charts and graphs (using Chart.js) to visualize win rates, performance trends, and match history.
* **Recent Activity:** Real-time feed of recent matches, updates, and profile views.
* **Document Locker:** Securely upload and manage essential files like ID proofs and medical certificates.

### 🔐 **Security & Authentication**
* **Secure Auth:** Robust Signup/Login system using JWT (JSON Web Tokens).
* **Protected Routes:** Middleware to ensure only authenticated users can access sensitive dashboard data.

---

## 🛠️ Tech Stack

### **Frontend (Client)**
* **Framework:** [React.js](https://reactjs.org/) (Vite) for lightning-fast performance.
* **Styling:** Custom CSS with Glassmorphism design & responsive layouts.
* **State Management:** React Context API (`AuthContext`, `SportContext`).
* **Visualization:** Chart.js & React-Chartjs-2.
* **Routing:** React Router DOM v6.
* **HTTP Client:** Axios with Interceptors.

### **Backend (Server)**
* **Runtime:** Node.js.
* **Framework:** Express.js (RESTful API architecture).
* **Database:** MongoDB (NoSQL).
* **Authentication:** JWT & Bcrypt for encryption.

---

## 📂 Project Structure

```bash
KHELO/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI (Auth, Dashboard, Player cards)
│   │   ├── context/        # Global State Management
│   │   ├── hooks/          # Custom React Hooks (useAuth, useSports)
│   │   ├── pages/          # Main Views (Home, Dashboard, Profile, Search)
│   │   ├── services/       # API Integration (Axios configuration)
│   │   └── styles/         # Modular CSS files
│   └── vite.config.js      # Vite Configuration
│
├── server/                 # Backend Node.js Application
│   ├── controllers/        # Business Logic
│   ├── models/             # Database Schemas
│   ├── routes/             # API Endpoints
│   └── server.js           # Server Entry Point
└── README.md               # Project Documentation
