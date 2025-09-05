import React, { useState, useEffect } from "react";
import { Notebook, Heart, Calendar, Smile, Sun, Moon } from "lucide-react";
import { useThemeContext } from "../hooks/useThemeContext";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const {theme,dispatch}        = useThemeContext();

  console.log(theme)

  // add/remove dark class to html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      dispatch({type:"DO_DARK"})
    } else {
      document.documentElement.classList.remove("dark");
      dispatch({type:"DO_LIGHT"})
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col transition-colors">
      {/* Header */}
      <header className="p-6 flex justify-between items-center bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
          MindSpace Journal
        </h1>

        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Home</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Entries</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Calendar</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Profile</a>
          </nav>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-600" />
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-1 px-6">
        <h2 className="text-4xl font-bold text-indigo-800 dark:text-indigo-200 mb-4">
          Welcome to Your Mental Health Journal
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
          Reflect, track your moods, and practice mindfulness every day.
          Your safe space for growth and healing.
        </p>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition">
          Start Journaling
        </button>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col items-center">
          <Notebook className="h-10 w-10 text-indigo-600 dark:text-indigo-400 mb-3" />
          <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">Daily Entries</h3>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Write your thoughts and feelings in a private, secure space.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col items-center">
          <Smile className="h-10 w-10 text-pink-500 dark:text-pink-400 mb-3" />
          <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">Mood Tracking</h3>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Track your emotions and discover patterns in your well-being.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col items-center">
          <Calendar className="h-10 w-10 text-purple-500 dark:text-purple-400 mb-3" />
          <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">Calendar View</h3>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Review your progress over time and celebrate consistency.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 p-4 text-center text-gray-500 dark:text-gray-400">
        <p>Made with ❤️ for your peace of mind</p>
      </footer>
    </div>
  );
}
