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
          className={` text-white bg-gradient-to-r from-black via-gray-800 to-gray-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-gray-600 shadow-lg shadow-black/50 dark:shadow-lg dark:shadow-black/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  ${elements[selectedIndex]?.isBold ? 'bg-green-500 text-white' : ''}`}
        >
          B
        </button>

        <button
          onClick={() => handleStyleChange('isItalic')}
          className={`text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${elements[selectedIndex]?.isItalic ? 'bg-green-500 text-white' : ''}`}
        >
          I
        </button>

        <button
          onClick={() => handleStyleChange('isUnderline')}
          className={`relative text-lg font-semibold text-gray-800 py-2 px-6 bg-transparent
             transition-colors duration-300 hover:text-blue-600
             after:content-[''] after:absolute after:left-0 after:bottom-0
             after:w-0 after:h-1 after:bg-blue-500 after:transition-all
             after:duration-300 after:ease-in-out hover:after:w-full hover:after:bg-blue-600
             
             }`}
        >
          U
        </button>

        <button onClick={() => handleFontSizeChange(-2)} className="text-lg font-semibold text-white py-3 px-6 bg-red-500 
             rounded-md shadow-md transition-transform duration-300 ease-in-out 
             transform hover:scale-90 hover:bg-red-600">
          A-
        </button>

        <button onClick={() => handleFontSizeChange(2)} className="text-lg font-semibold text-white py-3 px-6 bg-blue-500 
             rounded-md shadow-md transition-transform duration-300 ease-in-out 
             transform hover:scale-110 hover:bg-blue-600">
          A+
        </button>

        <select
  value={elements[selectedIndex]?.fontFamily || 'Arial'}
  onChange={handleFontFamilyChange}
  className={`block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
  disabled={selectedIndex === null}
>
  <option value="Arial">Arial</option>
  <option value="Courier New">Courier New</option>
  <option value="Georgia">Georgia</option>
  <option value="Times New Roman">Times New Roman</option>
  <option value="Verdana">Verdana</option>
</select>

      </div>

      <button onClick={handleAddText} className="flex items-center text-lg font-semibold text-white py-2 px-4 bg-blue-500
             rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300
             transition-all duration-300 ease-in-out">
        Add Text
      </button>
    </footer>
  );
}
