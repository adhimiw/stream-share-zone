
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './auth/AuthModal';
import CreatePost from './CreatePost';

const Header = () => {
  const navigate = useNavigate();
  const { user, login, logout, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleCreateClick = () => {
    if (isAuthenticated) {
      setShowCreatePost(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleCreatePost = (postData: any) => {
    console.log('Creating post:', postData);
    // In a real app, this would submit to an API
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      setShowUserMenu(!showUserMenu);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 
                  className="text-2xl font-bold text-orange-500 cursor-pointer hover:text-orange-600 transition-colors"
                  onClick={handleLogoClick}
                >
                  reddit
                </h1>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search Reddit"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleCreateClick}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Create Post"
              >
                <Plus className="h-6 w-6" />
              </button>
              
              {isAuthenticated && (
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Bell className="h-6 w-6" />
                </button>
              )}
              
              <div className="relative">
                <button 
                  onClick={handleUserClick}
                  className="flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {isAuthenticated ? (
                    <>
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {user?.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-700 text-sm">{user?.username}</span>
                    </>
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                </button>
                
                {showUserMenu && isAuthenticated && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          navigate(`/user/${user?.username}`);
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <div className="flex items-center space-x-2">
                          <LogOut className="h-4 w-4" />
                          <span>Log Out</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={login}
      />
      
      <CreatePost
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onSubmit={handleCreatePost}
      />
    </>
  );
};

export default Header;
