import React, { useState, useEffect } from "react";
import {
  Notebook,
  Mic,
  Paperclip,
  Search,
  Sun,
  Moon,
  Calendar as CalendarIcon,
  Plus,
  X,
} from "lucide-react";

export default function JournalHome() {
  const [darkMode, setDarkMode] = useState(false);
  const [entries, setEntries] = useState([ {
    id: 1,
    text: "Today I felt calmer after doing 10 minutes of breathing exercises. Writing here helps me track my mood.",
    date: new Date().toISOString().split("T")[0], // today’s date
  },]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntryText, setNewEntryText] = useState("");

  // dark mode toggle logic
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // add new entry
  const handleSaveEntry = (e) => {
    e.preventDefault();
    if (!newEntryText.trim()) return;

    const newEntry = {
      id: Date.now(),
      text: newEntryText,
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    };
    setEntries([newEntry, ...entries]);
    setNewEntryText("");
    setIsModalOpen(false);
  };

  // filter entries
  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = entry.text.toLowerCase().includes(search.toLowerCase());
    const matchesDate = selectedDate ? entry.date === selectedDate : true;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Header */}
      <header className="p-6 flex justify-between items-center bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">MindFul Journal</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
        >
          {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-indigo-600" />}
        </button>
      </header>

      <main className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Add New Entry Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          <Plus className="h-5 w-5" /> Add New Entry
        </button>

        {/* Search + Calendar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="flex items-center w-full md:w-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search entries..."
              className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Calendar */}
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
            <CalendarIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent focus:outline-none text-gray-800 dark:text-gray-100"
            />
            {selectedDate && (
              <button
                type="button"
                onClick={() => setSelectedDate("")}
                className="text-sm text-red-500 hover:underline ml-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Entries List */}
        <section className="space-y-4">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <div key={entry.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <p className="text-gray-800 dark:text-gray-200">{entry.text}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Date: {entry.date}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center">No entries found.</p>
          )}
        </section>
      </main>

      {/* Modal for New Entry */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">New Entry</h2>

            <textarea
              rows="6"
              value={newEntryText}
              onChange={(e) => setNewEntryText(e.target.value)}
              placeholder="Write your thoughts..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            ></textarea>

            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-3">
                <button type="button" className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Mic className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </button>
                <button type="button" className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Paperclip className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </button>
              </div>
              <button
                onClick={handleSaveEntry}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
