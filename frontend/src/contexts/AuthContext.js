 
// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';
import api from '../config/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  // Sign up function
  const signup = async (email, password, name) => {
    setAuthLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      toast.success('Account created successfully!');
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  // Sign in function
  const signin = async (email, password) => {
    setAuthLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Signed in successfully!');
      return result;
    } catch (error) {
      console.error('Signin error:', error);
      toast.error(error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  // Sign out function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      toast.success('Signed out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error signing out');
    }
  };

  // Fetch user profile from backend
  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setUserProfile(response.data.user);
    } catch (error) {
      console.error('Fetch profile error:', error);
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchUserProfile();
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userProfile,
    loading,
    authLoading,
    signup,
    signin,
    logout,
    fetchUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};