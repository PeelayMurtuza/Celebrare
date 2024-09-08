import React from 'react';

export default function Navbar({ handleUndo, handleRedo }) {
  return (
    <nav className="bg-green-500 p-4 flex justify-between items-center">
      <h1 className="text-white text-4xl font-bold">Assignment</h1>
      <div className="flex space-x-4">
        <button onClick={handleUndo} className="text-white text-xl">↺ Undo</button>
        <button onClick={handleRedo} className="text-white text-xl">↻ Redo</button>
      </div>
    </nav>
  );
}
