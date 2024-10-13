import React, { useState, useEffect } from 'react';
import UserMenu from '../components/DropdownProfile';

function Header({
  sidebarOpen,
  setSidebarOpen,
  variant = 'default',
}) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("access")); // Initialize token from localStorage
  const [user, setUser] = useState(null);
  const API_SERVER = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    if (token) {
      // Fetch the user data using the token
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${API_SERVER}/api/profile`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error(error);
          // Handle any error if needed (e.g., logout or show an error message)
        }
      };
      fetchUserData();
    } else {
      setUser(null);
    }
  }, [token]); // This will re-run if the token changes

  return (
    <header className={`sticky top-0 before:absolute before:inset-0 before:backdrop-blur-md max-lg:before:bg-white/90 dark:max-lg:before:bg-gray-800/90 before:-z-10 z-30 ${variant === 'v2' || variant === 'v3' ? 'before:bg-white after:absolute after:h-px after:inset-x-0 after:top-full after:bg-gray-200 dark:after:bg-gray-700/60 after:-z-10' : 'max-lg:shadow-sm lg:before:bg-gray-100/90 dark:lg:before:bg-gray-900/90'} ${variant === 'v2' ? 'dark:before:bg-gray-800' : ''} ${variant === 'v3' ? 'dark:before:bg-gray-900' : ''}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${variant === 'v2' || variant === 'v3' ? '' : 'lg:border-b border-gray-200 dark:border-gray-700/60'}`}>

          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">

          </div>

          {/* Divider */}
          <hr className="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />

          {/* User Menu */}
          <UserMenu user={user} setToken={setToken} setUser={setUser} align="right" />
        </div>
      </div>


    </header>
  );
}

export default Header;
