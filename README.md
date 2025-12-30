# Task Master - MERN Stack Task Management System

Welcome to **Task Master**! This is a full-stack Task Management application built using the **MERN (MongoDB, Express, React, Node.js)** stack. It features a bold **Neo-Brutalism** design aesthetic and robust functionality for managing tasks, users, and priorities.

## 🚀 Key Features

*   **Authentication & Authorization**: Secure JWT-based login and registration.
*   **Role-Based Access Control (RBAC)**:
    *   **Users**: Can manage their own assigned tasks.
    *   **Admins**: Can manage all users, create tasks for specific users, and view system-wide data.
*   **Task Management**:
    *   Create, Read, Update, Delete (CRUD) tasks.
    *   Pagination support (via AJAX logic).
    *   "Assign To" functionality for Admins.
    *   Custom Confirmation Dialog for deletion.
*   **Priority Board**:
    *   **Drag & Drop** interface to organize tasks by priority (High, Medium, Low).
    *   Visual color-coding for priority levels.
*   **Design**:
    *   **Neo-Brutalism**: High contrast, bold borders, shadows, and vibrant colors using **TailwindCSS**.
    *   Responsive layout for mobile and desktop.

## 🛠 Tech Stack

### Backend
*   **Node.js & Express**: API server.
*   **MongoDB & Mongoose**: Database and Object Data Modeling.
*   **JWT & bcryptjs**: Security and Authentication.

### Frontend
*   **React (Vite)**: Fast, modern UI development.
*   **TailwindCSS**: Utility-first styling.
*   **Context API**: State management for Authentication.
*   **@hello-pangea/dnd**: Drag and Drop functionality.
*   **React Router DOM**: Navigation and protected routes.
*   **React Hot Toast**: Beautiful notifications.

---

## 💻 Setup & Installation

### 1. Prerequisites
*   Node.js installed.
*   MongoDB installed and running locally on port `27017`.

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file with:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/task_manager_db
# JWT_SECRET=your_super_secret_key

npm run dev
# Server starts on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App starts on http://localhost:5173
```

### 4. Creating an Admin User
To unlock admin features (User Management, Task Assignment), you must create the first admin via API (Postman/cURL):
**POST** `http://localhost:5000/api/auth/register`
```json
{
  "username": "admin",
  "email": "admin@test.com",
  "password": "password123",
  "role": "admin"
}
```

---

## 📸 Screenshots
*(Add screenshots of your Dashboard and Priority Board here)*

## 📄 License
MIT
