import React from 'react';

export default function Navbar({ handleUndo, handleRedo }) {
  return (
    <nav className="w-full h-20 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900  p-4 flex justify-center items-center">
      <hr />
      <div className="flex space-x-4">
        <button onClick={handleUndo} className="flex items-center justify-center text-white bg-gray-700 hover:bg-gray-800 
               focus:ring-2 focus:ring-gray-400 focus:outline-none transition duration-300
               rounded-full p-3 shadow-lg">↺ Undo</button>
        <button onClick={handleRedo} className="flex items-center justify-center text-white bg-gray-700 hover:bg-gray-800
               focus:ring-2 focus:ring-gray-400 focus:outline-none transition duration-300
               rounded-full p-3 shadow-lg">↻ Redo</button>
      </div>
    </nav>
  );
}
