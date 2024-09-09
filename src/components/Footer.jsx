import React, { useState } from 'react';

export default function Footer({ elements, setElements, selectedIndex, recordState }) {
  const [selectedFontFamily, setSelectedFontFamily] = useState('Arial');

  const handleStyleChange = (styleType) => {
    if (selectedIndex !== null) {
      recordState();
      setElements((prevElements) =>
        prevElements.map((el, i) =>
          i === selectedIndex ? { ...el, [styleType]: !el[styleType] } : el
        )
      );
    }
  };

  const handleFontSizeChange = (change) => {
    if (selectedIndex !== null) {
      recordState();
      setElements((prevElements) =>
        prevElements.map((el, i) =>
          i === selectedIndex ? { ...el, fontSize: Math.max(8, el.fontSize + change) } : el
        )
      );
    }
  };

  const handleAddText = () => {
    const newText = prompt('Enter new text:');
    if (newText) {
      recordState();
      const newElement = {
        text: newText,
        isBold: false,
        isItalic: false,
        isUnderline: false,
        fontSize: 16,
        fontFamily: selectedFontFamily,
        position: { x: 100, y: 100 },
      };
      setElements([...elements, newElement]);
    }
  };

  const handleFontFamilyChange = (e) => {
    if (selectedIndex !== null) {
      const newFontFamily = e.target.value;
      setElements((prevElements) =>
        prevElements.map((el, i) =>
          i === selectedIndex ? { ...el, fontFamily: newFontFamily } : el
        )
      );
      setSelectedFontFamily(newFontFamily);
    }
  };

  return (
    <footer className="bg-gray-200 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleStyleChange('isBold')}
          className={`px-2 py-1 border ${elements[selectedIndex]?.isBold ? 'bg-green-500 text-white' : ''}`}
        >
          B
        </button>

        <button
          onClick={() => handleStyleChange('isItalic')}
          className={`px-2 py-1 border ${elements[selectedIndex]?.isItalic ? 'bg-green-500 text-white' : ''}`}
        >
          I
        </button>

        <button
          onClick={() => handleStyleChange('isUnderline')}
          className={`px-2 py-1 border ${elements[selectedIndex]?.isUnderline ? 'bg-green-500 text-white' : ''}`}
        >
          U
        </button>

        <button onClick={() => handleFontSizeChange(-2)} className="px-2 py-1 border">
          A-
        </button>

        <button onClick={() => handleFontSizeChange(2)} className="px-2 py-1 border">
          A+
        </button>

        <select
          value={elements[selectedIndex]?.fontFamily || 'Arial'}
          onChange={handleFontFamilyChange}
          className="px-2 py-1 border"
          disabled={selectedIndex === null}
        >
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>

      <button onClick={handleAddText} className="bg-green-500 text-white px-4 py-2 rounded">
        Add Text
      </button>
    </footer>
  );
}
