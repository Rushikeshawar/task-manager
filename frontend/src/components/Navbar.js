 
// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, User, Users, LayoutDashboard, CheckSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, userProfile, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="text-xl font-bold text-blue-600">
              TaskManager
            </Link>
            
            <div className="flex space-x-4">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
              
              <Link
                to="/tasks"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/tasks')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                <CheckSquare size={16} />
                <span>Tasks</span>
              </Link>
              
              {userProfile?.role === 'admin' && (
                <Link
                  to="/users"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/users')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <Users size={16} />
                  <span>Users</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User size={16} />
              <span>{userProfile?.name || user.email}</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {userProfile?.role}
              </span>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;