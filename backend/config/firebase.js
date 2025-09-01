// config/firebase.js
const admin = require('firebase-admin');

// For development/testing - use a simple admin initialization
// In production, you should use proper service account credentials

let app;

try {
  // Try to initialize with service account if all credentials are provided
  if (process.env.FIREBASE_PRIVATE_KEY && 
      process.env.FIREBASE_CLIENT_EMAIL && 
      process.env.FIREBASE_PROJECT_ID) {
    
    const serviceAccount = {
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    };

    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  } else {
    // For development - initialize with project ID only
    // This works for auth verification but requires proper setup for production
    app = admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }
} catch (error) {
  console.error('Firebase initialization error:', error.message);
  console.log('Using default Firebase app...');
  
  // Fallback initialization
  if (!admin.apps.length) {
    app = admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  } else {
    app = admin.apps[0];
  }
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };