import React, { useState, useEffect } from "react";
import { Notebook, Sun, Moon } from "lucide-react";
import { useThemeContext } from "../hooks/useThemeContext";
import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";

export default function AuthDialog() {
  const {theme,dispatch}        = useThemeContext();
  let   dm                      = theme === 'dark' ? false : true
  const [darkMode, setDarkMode] = useState(dm);

  const [isLogin, setIsLogin]   = useState(true);

  const {error,isloading,login} = useLogin();

  const [fullname,setFullname]  = useState('');
  const [username,setUsername]  = useState('');
  const [email,setEmail]        = useState('');
  const [password,setPassword]  = useState('');
  const [cpasswrd,setCpasswrd]  = useState('');
  const [pfp,setPfp]            = useState(null);
  const [err,setErr]            = useState(null);

  // add/remove dark class on html
  useEffect(() => {
    if (darkMode) {
      dispatch({type:'DO_DARK'})
    } else {
      dispatch({type:"DO_LIGHT"})
    }
  }, [darkMode]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErr('All fields must be filled!');
      return;
    }
    await login(username,password)
  }

  const handleSignup = async (e) => {
    e.preventDefault();
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-pink-50 to-purple-100 ${theme =='dark' ? 'dark:from-gray-900 dark:via-gray-800 dark:to-gray-900' : ''} p-6 transition-colors`}>
      {/* Dialog Box */}
      <div className={`bg-white ${theme == 'dark' ? 'dark:bg-gray-800' : ''} w-full max-w-md rounded-2xl shadow-xl p-8 relative transition-colors`}>
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`absolute top-4 right-4 p-2 rounded-full bg-gray-200 ${theme=='dark' ? 'dark:bg-gray-700' : ''} hover:scale-105 transition`}
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-indigo-600" />
          )}
        </button>

        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <Notebook className={`h-10 w-10 text-indigo-600 ${theme == 'dark' ? 'dark:text-indigo-400' : ''} mb-2`} />
          <h1 className={`text-2xl font-bold text-indigo-700 ${theme == 'dark' ? 'dark:text-indigo-300' : ''}`}>
            {isLogin ? "MindSpace Login" : "MindSpace Signup"}
          </h1>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {!isLogin && (
            <div>
              <label className={`block text-black ${theme == 'dark' ? 'dark:text-gray-300' : ''} font-medium mb-1`}>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className={`w-full px-4 py-2 border border-gray-300 ${theme == 'dark' ? 'dark:border-gray-600':''} rounded-lg bg-white ${theme == 'dark' ? 'dark:bg-gray-700' : ''} text-black ${theme == 'dark' ? 'dark:text-gray-100':''} focus:ring-2 focus:ring-indigo-400 focus:outline-none`}
              />
            </div>
          )}

          <div>
            <label className={`block black ${theme == 'dark' ? 'dark:text-gray-300' : ''} font-medium mb-1`}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border border-gray-300 ${theme == 'dark' ? 'dark:border-gray-600 dark:text-gray-100 dark:bg-gray-700' : ''} rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none`}
            />
          </div>

          <div>
            <label className={`block text-black ${theme=='dark' ? 'dark:text-gray-300' : ''} font-medium mb-1`}>Password</label>
            <input
              type="password"
              placeholder={isLogin ? "Enter your password" : "Create a password"}
              className={`w-full px-4 py-2 border border-gray-300 ${theme == 'dark' ? 'dark:border-gray-600 dark:text-gray-100 dark:bg-gray-700' : ''} rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle Between Login / Signup */}
        <p className={`text-center text-black ${theme == 'dark' ? 'dark:text-gray-400 mt-4' : ''}`}>
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`text-indigo-600 ${theme == 'dark' ? 'dark:text-indigo-400' : ''} hover:underline`}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`text-indigo-600 ${theme == 'dark' ? 'dark:text-indigo-400' : ''} hover:underline`}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
