# Task Manager - MERN Stack Application for ClientDrivenSolutions

## 📋 Assignment Overview

This project fulfills the requirements for the **Authentication and Role-Based Authorization** challenge from ClientDrivenSolutions. The application demonstrates a complete MERN stack implementation with Firebase Authentication and comprehensive role-based access control.

## ✅ Requirements Fulfilled

### **Authentication and Role-Based Authorization**
- ✅ **Firebase Authentication Service** integrated with email/password sign-in
- ✅ **Role-based authorization** with User and Admin roles
- ✅ **User permissions management** with different access levels

### **API Development**
- ✅ **Four distinct APIs** with full CRUD operations
- ✅ **Role-based access control** on all endpoints
- ✅ **Clean, optimized, and maintainable code** following best practices
- ✅ **Proper environment handling** for all configuration variables

### **API Implementation**
The four required APIs for Task management:

1. **POST /api/tasks** - Create a new task
2. **GET /api/tasks** - Read all tasks (with role-based filtering)
3. **PUT /api/tasks/:id** - Update a specific task
4. **DELETE /api/tasks/:id** - Delete a specific task

### **MERN Stack Implementation**
- ✅ **MongoDB** - Database with Mongoose ODM
- ✅ **Express.js** - Backend API with security middleware
- ✅ **React.js** - Frontend with modern hooks and context
- ✅ **Node.js** - Server runtime with proper configuration

## 🏗️ Architecture

### **Backend (Node.js/Express)**
```
backend/
├── config/
│   ├── database.js          # MongoDB connection
│   └── firebase.js          # Firebase Admin SDK setup
├── middleware/
│   └── auth.js              # Authentication & role-based authorization
├── models/
│   ├── User.js              # User schema with role management
│   └── Task.js              # Task schema with relationships
├── routes/
│   ├── users.js             # User management endpoints
│   └── tasks.js             # Task CRUD endpoints with role checks
├── server.js                # Express server with security middleware
├── package.json             # Dependencies and scripts
└── .env                     # Environment configuration
```

### **Frontend (React.js)**
```
frontend/
├── src/
│   ├── components/
│   │   ├── LoadingSpinner.js # Reusable loading component
│   │   ├── Navbar.js        # Navigation with role-based menu
│   │   └── TaskModal.js     # Task creation/editing modal
│   ├── config/
│   │   ├── api.js           # Axios configuration with interceptors
│   │   └── firebase.js      # Firebase client configuration
│   ├── contexts/
│   │   └── AuthContext.js   # Authentication state management
│   ├── pages/
│   │   ├── Dashboard.js     # Overview with task statistics
│   │   ├── Login.js         # User authentication
│   │   ├── Register.js      # User registration
│   │   ├── Tasks.js         # Task management with CRUD operations
│   │   └── Users.js         # User management (Admin only)
│   ├── App.js               # Main app with protected routes
│   └── index.js             # React entry point
├── public/
│   └── index.html           # HTML template
├── package.json             # Dependencies and scripts
└── .env                     # Environment configuration
```

## 🔐 Role-Based Access Control

### **User Role Permissions**
- ✅ Register and login to the system
- ✅ Create new tasks
- ✅ View tasks they created or are assigned to
- ✅ Edit tasks they created or are assigned to
- ✅ Delete only tasks they created
- ✅ Update their own profile information
- ❌ Cannot access user management
- ❌ Cannot view other users' tasks
- ❌ Cannot assign tasks to other users

### **Admin Role Permissions**
- ✅ All User role permissions
- ✅ View all tasks in the system
- ✅ Edit any task regardless of creator
- ✅ Delete any task in the system
- ✅ Access user management panel
- ✅ View all registered users
- ✅ Change user roles (User ↔ Admin)
- ✅ Assign tasks to any user

## 🛡️ Security Features

### **Authentication Security**
- Firebase JWT token verification on all protected routes
- Automatic token refresh and management
- Secure logout with token invalidation
- Protected routes with authentication guards

### **Authorization Security**
- Role-based middleware on all API endpoints
- User permission validation before data access
- Ownership verification for task operations
- Admin-only endpoints properly protected

### **General Security**
- CORS configuration for specific origins
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- Helmet security headers
- Environment variable protection
- Soft delete for data integrity

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Firebase project with Authentication enabled

### **Quick Setup**

1. **Clone and Setup Structure**
```cmd
git clone <your-repo-url>
cd task-manager
```

2. **Backend Setup**
```cmd
cd backend
npm install
```

3. **Frontend Setup**
```cmd
cd ../frontend
npm install
```

4. **Environment Configuration**
   - Update `backend/.env` with your Firebase service account
   - Update `frontend/.env` with your Firebase web config
   - Configure MongoDB connection string

5. **Start Applications**
```cmd
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## 🔥 Firebase Configuration

### **Required Firebase Setup**
1. Create Firebase project at https://console.firebase.google.com/
2. Enable Email/Password authentication
3. Generate service account key for backend
4. Get web app configuration for frontend

### **Environment Variables**

**Backend (.env):**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/taskmanager
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@your-project.iam.gserviceaccount.com
```

**Frontend (.env):**
```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_API_URL=http://localhost:5000/api
```

## 📡 API Documentation

### **Authentication**
All API endpoints require Firebase JWT token:
```
Authorization: Bearer <firebase-jwt-token>
```

### **Task Management APIs**

#### 1. Create Task (POST /api/tasks)
```json
{
  "title": "Task Title",
  "description": "Task Description",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2024-12-31",
  "assignedTo": "user-id"
}
```

#### 2. Get Tasks (GET /api/tasks)
```
GET /api/tasks?status=pending&priority=high&page=1&limit=10
```
**Role-based filtering:**
- Users: Only see tasks they created or are assigned to
- Admins: See all tasks

#### 3. Update Task (PUT /api/tasks/:id)
```json
{
  "title": "Updated Title",
  "status": "completed",
  "priority": "high"
}
```
**Permissions:**
- Users: Can update tasks they created or are assigned to
- Admins: Can update any task

#### 4. Delete Task (DELETE /api/tasks/:id)
**Permissions:**
- Users: Can only delete tasks they created
- Admins: Can delete any task

### **User Management APIs (Admin Only)**

#### Get All Users
```
GET /api/users/all
```

#### Update User Role
```json
PUT /api/users/:userId/role
{
  "role": "admin"
}
```

## 🎨 Frontend Features

### **Pages & Components**
- **Login/Register**: Firebase authentication forms
- **Dashboard**: Task statistics and recent tasks overview
- **Tasks**: Complete task management with CRUD operations
- **Users**: Admin-only user management panel
- **Protected Routes**: Role-based route protection

### **UI/UX Features**
- Responsive design with Tailwind CSS
- Loading states and error handling
- Toast notifications for user feedback
- Role-based navigation menu
- Search and filter functionality
- Modal-based task creation/editing

## 🧪 Testing the Application

### **User Flow Testing**
1. **Registration**: Create new user account
2. **Login**: Authenticate with Firebase
3. **Task Creation**: Create tasks with different priorities
4. **Task Management**: Edit, update status, delete tasks
5. **Role Boundaries**: Verify user permissions are enforced

### **Admin Flow Testing**
1. **User Management**: View all users and change roles
2. **Global Task Access**: View and manage all tasks
3. **Task Assignment**: Assign tasks to other users
4. **Permission Verification**: Confirm admin-only features work

### **Security Testing**
1. **Token Validation**: Verify expired tokens are rejected
2. **Role Enforcement**: Confirm users cannot access admin features
3. **Ownership Checks**: Ensure users can only modify their own tasks
4. **Input Validation**: Test API endpoints with invalid data

## 📦 Dependencies

### **Backend Dependencies**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `firebase-admin` - Firebase Admin SDK
- `cors` - Cross-origin resource sharing
- `helmet` - Security headers
- `express-rate-limit` - Rate limiting
- `dotenv` - Environment variable management

### **Frontend Dependencies**
- `react` - UI library
- `react-router-dom` - Client-side routing
- `firebase` - Firebase client SDK
- `axios` - HTTP client
- `react-hot-toast` - Notifications
- `lucide-react` - Modern icons
- `tailwindcss` - Utility-first CSS framework

## 🚀 Deployment

### **Production Deployment Steps**
1. **Database**: Set up MongoDB Atlas for production
2. **Backend**: Deploy to Heroku/Railway/DigitalOcean
3. **Frontend**: Deploy to Vercel/Netlify
4. **Environment**: Configure production environment variables
5. **Firebase**: Update authorized domains for production

### **Environment Updates for Production**
- Update CORS settings for production URLs
- Configure Firebase authorized domains
- Set production MongoDB connection string
- Update API URLs in frontend configuration

## 🏆 Key Achievements

### **Technical Excellence**
- **Clean Architecture**: Separation of concerns with proper folder structure
- **Security First**: Comprehensive authentication and authorization
- **Error Handling**: Robust error handling across all components
- **Performance**: Optimized queries and efficient state management
- **Scalability**: Modular design for easy feature additions

### **User Experience**
- **Intuitive Interface**: Clean, modern design with clear navigation
- **Responsive Design**: Works seamlessly across devices
- **Real-time Feedback**: Immediate notifications for all actions
- **Role-based UI**: Interface adapts based on user permissions
- **Loading States**: Smooth user experience with proper loading indicators

## 📈 Future Enhancements

- **Real-time Updates**: WebSocket integration for live task updates
- **File Attachments**: Support for task file attachments
- **Task Comments**: Collaboration features with task comments
- **Email Notifications**: Automated email alerts for task assignments
- **Advanced Filtering**: Date ranges, multiple assignees, custom filters
- **Task Templates**: Reusable task templates for common workflows

## 🤝 Submission Details

**Project Repository**: [[Your GitHub Repository URL](https://github.com/Rushikeshawar/task-manager/tree/main)]

**Developed by**: Rushikesh Aware
**Submission Date**: September 2, 2024
**Challenge**: Authentication and Role-Based Authorization
**Company**: ClientDrivenSolutions

---

## 🔧 Quick Start Commands

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

**Access the application at**: http://localhost:3000
**Backend API at**: http://localhost:5000

---

**🎉 This application successfully demonstrates a production-ready MERN stack solution with robust authentication, comprehensive role-based authorization, and all requested CRUD operations with proper security implementation.**