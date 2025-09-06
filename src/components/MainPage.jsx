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
  const [mood, setMoode]        = useState(null);
  const [entries, setEntries] = useState([ {
    id: 1,
    text: "Today I felt calmer after doing 10 minutes of breathing exercises. Writing here helps me track my mood.",
    date: new Date().toISOString().split("T")[0], // today’s date
  },]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [newEntry,setNewEntry]   = useState(null);
  const [editingId, setEditingId] = useState(null);

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
        <ul className="space-y-4">
          {/* {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <div key={entry.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <p className="text-gray-800 dark:text-gray-200">{entry.text}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Date: {entry.date}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center">No entries found.</p>
          )} */}
          {entries.map((entry) => (
            <li
                key={entry.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex flex-col"
            >
                <div className="flex justify-between items-start">
                    <p className="text-gray-800 dark:text-gray-200">{entry.text}</p>
                    <div className="flex space-x-2">
                        {/* Edit Button */}
                        <button
                            onClick={() => handleEdit(entry.id)}
                            className="px-3 py-1 text-sm bg-indigo-100 text-indigo-600 dark:bg-indigo-700 dark:text-indigo-200 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-600"
                        >
                            Edit
                        </button>
                        {/* Delete Button */}
                        <button
                            onClick={() => handleDelete(entry.id)}
                            className="px-3 py-1 text-sm bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-200 rounded-md hover:bg-red-200 dark:hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {entry.date}
                </span>
            </li>
            ))}
        </ul>
      </main>

      {/* Modal for New Entry */}
      {/* Modal Overlay */}
    {isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl p-8 relative">
        
        {/* Header */}
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-6">
            {editingId ? "Edit Entry" : "New Journal Entry"}
        </h2>

        {/* Big Textarea */}
        <textarea
            rows={10}
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Write your thoughts freely..."
            className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-3">
            {/* Mic Button */}
            <button
                type="button"
                className="p-3 bg-indigo-100 dark:bg-indigo-700 text-indigo-600 dark:text-indigo-200 rounded-lg hover:scale-105 transition"
            >
                🎤
            </button>

            {/* Clip Button */}
            <button
                type="button"
                className="p-3 bg-pink-100 dark:bg-pink-700 text-pink-600 dark:text-pink-200 rounded-lg hover:scale-105 transition"
            >
                📎
            </button>
            </div>

            {/* Mood Selector */}
            <div className="flex space-x-2">
            {["😊", "😐", "😢", "😡", "😴"].map((emoji) => (
                <button
                key={emoji}
                onClick={() => setMood(emoji)}
                type="button"
                className={`px-3 py-2 text-2xl rounded-lg transition ${
                    mood === emoji
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
                >
                {emoji}
                </button>
            ))}
            </div>
        </div>

        {/* Save / Cancel */}
        <div className="mt-6 flex justify-end space-x-4">
            <button
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
            Cancel
            </button>
            <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md"
            >
            Save Entry
            </button>
        </div>
        </div>
    </div>
    )}

    </div>
  );
}
