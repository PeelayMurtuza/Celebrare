import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import MainBody from './components/MainBody';
import Footer from './components/Footer';

export default function App() {
  const [elements, setElements] = useState([
    { text: 'Abhinav', isBold: false, isItalic: false, isUnderline: false, fontSize: 16, fontFamily: 'Arial', position: { x: 0, y: 0 } }
  ]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    setElements((prevElements) => {
      return prevElements.map((el, index) => {
        if (index === 0) {
          const centerX = container.offsetWidth / 2 - 50;
          const centerY = container.offsetHeight / 2 - 10;
          return { ...el, position: { x: centerX, y: centerY } };
        }
        return el;
      });
    });
  }, []);

  const recordState = () => {
    setUndoStack((prevStack) => [...prevStack, [...elements]]);
    setRedoStack([]); // Clear redo stack on new action
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
      <MainBody
        elements={elements}
        setElements={setElements}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        recordState={recordState}
        containerRef={containerRef}
      />
      <Footer
        elements={elements}
        setElements={setElements}
        selectedIndex={selectedIndex}
        recordState={recordState}
      />
    </div>
  );
}
