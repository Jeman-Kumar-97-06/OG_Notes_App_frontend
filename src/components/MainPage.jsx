import React from "react";
import { Plus, Search, Calendar, Mic, Paperclip, Edit, Trash, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useThemeContext } from "../hooks/useThemeContext";

export default function JournalHome() {

  const [modalState,setModalState] = useState(false);

  const {theme,dispatch}           = useThemeContext();
  let   dm                         = theme == 'dark' ? false : true
  const [darkMode,setDarkMode]     = useState(dm)

  const [newEntryTxt, setNewEntryTxt] = useState('');
  const [newEntryImg, setNewEntryImg] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col transition-colors">
      
      {/* Header */}
      <header className="p-6 flex justify-between items-center bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
          MindSpace Journal
        </h1>
        <nav className="flex space-x-4">
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Home</a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Entries</a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Calendar</a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Profile</a>
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className=" p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
              <Moon className="h-5 w-5 text-indigo-600" />
            )}
          </button> 
        </nav>
      </header>

      {/* Search + Add New */}
      <section className="p-6 flex justify-between items-center">
        <div className="flex items-center w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow px-3 py-2">
          <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search entries..."
            className="ml-2 w-full bg-transparent outline-none text-gray-700 dark:text-gray-200"
          />
        </div>
        <button onClick={()=>setModalState(true)} className="ml-4 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
          <Plus className="h-5 w-5 mr-2" /> Add New
        </button>
      </section>

      {/* Calendar */}
      <section className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Calendar
          </h2>
          <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
            <Calendar className="h-20 w-20" />
            <p className="ml-4">[Calendar Placeholder]</p>
          </div>
        </div>
      </section>

      {/* Entries List */}
      <section className="p-6 space-y-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <p className="text-gray-800 dark:text-gray-200">
              Today I felt calmer after doing 10 minutes of breathing exercises.
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-indigo-100 text-indigo-600 dark:bg-indigo-700 dark:text-indigo-200 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-600 flex items-center">
                <Edit className="h-4 w-4 mr-1" /> Edit
              </button>
              <button className="px-3 py-1 text-sm bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-200 rounded-md hover:bg-red-200 dark:hover:bg-red-600 flex items-center">
                <Trash className="h-4 w-4 mr-1" /> Delete
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              2025-09-14
            </span>
            <span className="text-xl">😊</span>
          </div>
        </div>
      </section>

      {/* Modal Placeholder */}
      <div className={`${modalState ? '' : 'hidden'} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
        <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-6">
            New Journal Entry
          </h2>
          <textarea
            rows={10}
            placeholder="Write your thoughts freely..."
            className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-3">
              <button className="p-3 bg-indigo-100 dark:bg-indigo-700 text-indigo-600 dark:text-indigo-200 rounded-lg"> <Mic /> </button>
              <button className="p-3 bg-pink-100 dark:bg-pink-700 text-pink-600 dark:text-pink-200 rounded-lg"> <Paperclip /> </button>
            </div>
            <div className="flex space-x-2">
              {["😊", "😐", "😢", "😡", "😴"].map((emoji) => (
                <button
                  key={emoji}
                  className="px-3 py-2 text-2xl bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button onClick={()=>{setModalState(false)}} className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              Cancel
            </button>
            <button className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md">
              Save Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
