 
# Task Manager - MERN Stack Application

A comprehensive task management application built with the MERN stack, featuring Firebase authentication and role-based authorization.

## 🚀 Features

- **🔐 Authentication**: Firebase Authentication with email/password
- **👥 Role-Based Authorization**: Admin and User roles with different permissions
- **📋 Task Management**: Complete CRUD operations for tasks
- **🛡️ Security**: Protected routes, JWT verification, input validation
- **📱 Responsive Design**: Modern UI with Tailwind CSS
- **⚡ Real-time Updates**: Instant task updates and notifications

## 🏗️ Architecture

### Backend (Node.js/Express)
- **Authentication**: Firebase Admin SDK
- **Database**: MongoDB with Mongoose ODM
- **Security**: CORS, Helmet, Rate limiting
- **API**: RESTful endpoints with role-based access control

### Frontend (React.js)
- **State Management**: React Context API
- **Routing**: React Router with protected routes
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
task-manager/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── firebase.js          # Firebase Admin configuration
│   ├── middleware/
│   │   └── auth.js              # Authentication & authorization middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Task.js              # Task schema
│   ├── routes/
│   │   ├── users.js             # User management routes
│   │   └── tasks.js             # Task CRUD routes
│   ├── .env                     # Environment variables
│   ├── package.json             # Backend dependencies
│   └── server.js                # Express server entry point
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoadingSpinner.js # Loading component
│   │   │   ├── Navbar.js        # Navigation component
│   │   │   └── TaskModal.js     # Task create/edit modal
│   │   ├── config/
│   │   │   ├── api.js           # Axios configuration
│   │   │   └── firebase.js      # Firebase client configuration
│   │   ├── contexts/
│   │   │   └── AuthContext.js   # Authentication context
│   │   ├── pages/
│   │   │   ├── Dashboard.js     # Dashboard page
│   │   │   ├── Login.js         # Login page
│   │   │   ├── Register.js      # Registration page
│   │   │   ├── Tasks.js         # Task management page
│   │   │   └── Users.js         # User management page (Admin only)
│   │   ├── App.js               # Main app component
│   │   ├── index.css            # Global styles
│   │   └── index.js             # React entry point
│   ├── .env                     # Environment variables
│   └── package.json             # Frontend dependencies
└── README.md                    # Project documentation
```

## 🛠️ Installation & Setup

### Step 1: Create Project Structure

Run the provided Windows CMD script to create the complete folder structure automatically.

### Step 2: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password provider
4. Generate Service Account Key:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file
5. Get Web App Config:
   - Go to Project Settings > General
   - Scroll to "Your apps" and add a web app
   - Copy the config object

### Step 3: Backend Setup

```cmd
cd backend

REM Initialize and install dependencies
npm init -y
npm install express cors dotenv firebase-admin mongoose express-rate-limit helmet nodemon

REM Update package.json scripts
REM Add to scripts section:
REM "start": "node server.js",
REM "dev": "nodemon server.js"
```

**Configure Backend Environment (.env):**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/taskmanager
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
```

### Step 4: Frontend Setup

```cmd
cd ..\frontend

REM Initialize React app (if not using create-react-app)
npm init -y
npm install react react-dom react-scripts react-router-dom firebase axios react-hot-toast lucide-react

REM Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

REM Update package.json scripts
REM Add to scripts section:
REM "start": "react-scripts start",
REM "build": "react-scripts build",
REM "test": "react-scripts test",
REM "eject": "react-scripts eject"
```

**Configure Frontend Environment (.env):**
```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_API_URL=http://localhost:5000/api
```

**Configure Tailwind (tailwind.config.js):**
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

### Step 5: Copy Code Files

Copy all the provided code from the artifacts into their respective files:

1. Copy backend code into backend files
2. Copy frontend code into frontend files
3. Update environment variables with your Firebase config

### Step 6: Start the Application

**Terminal 1 (Backend):**
```cmd
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```cmd
cd frontend
npm start
```

## 🔑 API Documentation

### Authentication
All API endpoints require a valid Firebase JWT token in the Authorization header:
```
Authorization: Bearer <firebase-jwt-token>
```

### Task Endpoints

#### Create Task
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Task Description",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2024-12-31",
  "assignedTo": "user-id" // Optional, admin only
}
```

#### Get Tasks
```http
GET /api/tasks?status=pending&priority=high&page=1&limit=10
```

#### Update Task
```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "completed"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
```

## 👤 User Management (Admin Only)

### Get All Users
```http
GET /api/users/all
```

### Update User Role
```http
PUT /api/users/:userId/role
Content-Type: application/json

{
  "role": "admin"
}
```

## 🔒 Security Features

- **Firebase JWT Verification**: All routes protected with Firebase tokens
- **Role-Based Access Control**: Different permissions for User/Admin roles
- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configured for specific frontend origin
- **Helmet Security**: Security headers for protection
- **Soft Delete**: Tasks are marked as deleted, not removed

## 🎨 UI Features

- **Responsive Design**: Works on desktop and mobile
- **Dark/Light Theme**: Modern color scheme
- **Loading States**: Smooth loading indicators
- **Toast Notifications**: Real-time feedback
- **Form Validation**: Client and server-side validation
- **Interactive Elements**: Hover effects and animations

## 🧪 Testing the Application

### Test User Flows:
1. **Registration**: Create new account
2. **Login**: Sign in with credentials
3. **Task Creation**: Create tasks with different priorities
4. **Task Management**: Edit, update status, delete tasks
5. **Role Testing**: Test user vs admin permissions
6. **Admin Features**: Manage users and roles (admin only)

### Test Cases for Role-Based Access:
- **User Role**: Can only see/edit their own tasks
- **Admin Role**: Can see/edit all tasks and manage users
- **Permission Boundaries**: Verify unauthorized actions are blocked

## 📝 Environment Variables Setup

Create `.env` files in both backend and frontend directories with the configurations provided in the setup instructions.

## 🚀 Production Deployment

### Backend Deployment (Heroku/Railway/DigitalOcean):
1. Set environment variables on hosting platform
2. Configure MongoDB Atlas connection
3. Update CORS settings for production URL

### Frontend Deployment (Vercel/Netlify):
1. Build the React app: `npm run build`
2. Deploy the build folder
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational purposes and technical assessment.

## 🆘 Support

For issues and questions:
1. Check the console logs for errors
2. Verify environment variables are set correctly
3. Ensure MongoDB and Firebase are properly configured
4. Check network connectivity for API calls

---

**Built with ❤️ using MERN Stack + Firebase**