# ✅ TodoTasks – React Firebase Task Manager

A clean, responsive task management app that allows users to create multiple task lists and manage tasks with full CRUD functionality. Built with **React.js**, **Firebase**, and **Tailwind CSS**, and deployed on **Vercel**.

🌐 **Live Demo**: [Click Here](https://reactjs-sample-0225-git-main-akshitha143s-projects.vercel.app/)

---

## 🚀 Features

- 🔐 User Authentication (Login/Register)
- 📝 Create Task Lists
- ✅ Add, Edit, Complete & Delete Tasks
- 📌 Task Prioritization & Due Dates
- 🔄 Real-time Firebase Firestore Integration
- 🎯 Subcollection-based Data Model
- 💡 Fully Responsive UI with Tailwind CSS

---

## 🧑‍💻 Tech Stack

| Technology    | Purpose                              |
|---------------|--------------------------------------|
| React.js      | Frontend UI                          |
| Firebase      | Backend: Firestore DB + Auth         |
| Tailwind CSS  | Styling with utility-first classes   |
| React Router  | Navigation and routing               |
| Vercel        | Hosting & continuous deployment      |

---

## 📁 Folder Structure

src/
├── assets/ # Icons, logos, images
├── components/ # Reusable components
│ ├── home/
│ └── modals/
├── layouts/ # Layout wrappers
├── pages/ # Page-level components (Home, Auth)
├── services/ # Firebase service functions (tasks, auth, etc.)
├── firebase.js # Firebase config
├── App.js # Root component with routes
└── main.jsx # Entry point


## 🗂 Firebase Firestore Schema

### Collection: `taskLists`



taskLists
    └── {taskListId}
    ├── title: string
    ├── description: string
    ├── createdAt: timestamp
    ├── updatedAt: timestamp
    └── tasks (subcollection)
        └── {taskId}
        ├── title: string
        ├── description: string
        ├── status: "pending" | "in_progress" | "completed"
        ├── priority: "low" | "medium" | "high"
        ├── dueDate: timestamp
        ├── createdAt: timestamp
        └── updatedAt: timestamp

### Collection: `users`

users
└── {userId}
├── name: string
├── email: string
└── password: string (hashed recommended)

# 1. Clone the repository
git clone https://github.com/akshitha143/reactjs-sample-0225.git

# 2. Navigate into the project directory
cd reactjs-sample-0225

# 3. Install dependencies
npm install
# or
yarn install

# 4. Create a Firebase project and add your config
# Replace your firebase config inside src/firebase.js

# 5. Run the development server
npm run dev
# or
yarn dev



