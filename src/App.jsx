import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';


export default function App() {
  const [elements, setElements] = useState([
    { text: 'Abhinav', isBold: false, isItalic: false, isUnderline: false, fontSize: 16, fontFamily: 'Arial', position: { x: 0, y: 0 } }
  ]);
  
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  



  const recordState = () => {
    setUndoStack((prevStack) => [...prevStack, [...elements]]);
    setRedoStack([]); 
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const prevState = undoStack.pop();
      setRedoStack((prevStack) => [...prevStack, [...elements]]);
      setElements(prevState);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.pop();
      setUndoStack((prevStack) => [...prevStack, [...elements]]);
      setElements(nextState);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar handleUndo={handleUndo} handleRedo={handleRedo} />
      
    </div>
  );
}
