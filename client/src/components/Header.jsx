import { Avatar, Dropdown } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillThunderbolt, AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FiBriefcase, FiRadio, FiBarChart2, FiInfo, FiUser } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  // Add dark mode class to root element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 px-4 md:px-6 py-3 bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-950">
    <div className="flex flex-col md:flex-row md:items-center justify-between max-w-7xl mx-auto gap-4">
      {/* Logo and Search */}
      <div className="flex items-center gap-4 md:gap-8 flex-1">
        <Link to="/" className="flex items-center group">
          <div className="p-2 rounded-lg bg-gradient-to-br from-teal-600 to-emerald-700 group-hover:from-teal-700 group-hover:to-emerald-800 transition-all">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-white"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white">
            Market<span className="text-teal-600">Pulse</span>
          </span>
        </Link>

        <form onSubmit={handleSubmit} className="relative flex-1 max-w-2xl">
          <div className="flex items-center">
            <AiOutlineSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search stocks, indices, ETFs..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-teal-600 dark:focus:border-teal-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Navigation and Auth */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Navigation Links */}
        <div className="flex items-center gap-4 border-l border-r border-gray-100 dark:border-gray-800 px-4 md:px-6">
          <Link 
            to="/about" 
            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <FiInfo size={18} className="shrink-0" />
            <span className="hidden md:inline">About Us</span>
          </Link>
          

          {currentUser && (
          <>
           <Link 
            to="/stockanalysis" 
            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <AiFillThunderbolt size={18} className="shrink-0" />
            <span className="hidden md:inline">FinBot</span>
          </Link>
           <Link 
            to="/analysis" 
            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <FiBarChart2 size={18} className="shrink-0" />
            <span className="hidden md:inline">Analysis</span>
          </Link>
          <Link 
            to="/news" 
            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <FiRadio size={18} className="shrink-0" />
            <span className="hidden md:inline">News</span>
          </Link>
          </>
        )}
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          >
            {theme === 'light' ? (
              <FaSun className="w-5 h-5" />
            ) : (
              <FaMoon className="w-5 h-5" />
            )}
          </button>

          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar 
                  alt="user" 
                  img={currentUser.profilePicture} 
                  rounded
                  className="border-2 border-teal-500/20 hover:border-teal-500/40 transition-colors"
                  size="md"
                />
              }
              className="dark:bg-gray-800 dark:border-gray-700 shadow-lg"
            >
              <Dropdown.Header className="px-4 py-3 bg-gray-50 dark:bg-gray-700">
                <div className="font-medium text-gray-900 dark:text-white">
                  {currentUser.username}
                </div>
                <div className="text-sm text-teal-600 dark:text-teal-400">
                  {currentUser.email}
                </div>
              </Dropdown.Header>
              <Link to="/dashboard">
                <Dropdown.Item className="px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <FiUser className="mr-2" /> Profile
                </Dropdown.Item>
              </Link>
              <Dropdown.Divider className="border-gray-100 dark:border-gray-700" />
              <Dropdown.Item 
                onClick={handleSignout}
                className="px-4 py-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                Sign Out
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <div className="flex gap-2">
              <Link to="/sign-in" className="hidden sm:block">
                <button className="px-4 py-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-500/10 rounded-lg transition-colors">
                  Sign In
                </button>
              </Link>
              <Link to="/sign-up">
                <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-br from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-lg shadow-sm transition-all">
                  Get Started
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
}