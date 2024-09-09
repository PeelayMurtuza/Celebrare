import React from 'react';

export default function MainBody({ elements, setElements, selectedIndex, setSelectedIndex, recordState, containerRef }) {
  const handleDragStart = (index, e) => {
    const startX = e.clientX - elements[index].position.x;
    const startY = e.clientY - elements[index].position.y;

    const handleDrag = (e) => {
      setElements((prevElements) =>
        prevElements.map((el, i) =>
          i === index
            ? {
                ...el,
                position: {
                  x: e.clientX - startX,
                  y: e.clientY - startY,
                },
              }
            : el
        )
      );
    };

    const handleDragEnd = () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleTextChange = (index, newText) => {
    recordState(); // Record state before changing text
    setElements((prevElements) =>
      prevElements.map((el, i) =>
        i === index ? { ...el, text: newText } : el
      )
    );
  };

  const applyStyles = (element) => ({
    fontSize: `${element.fontSize}px`,
    fontWeight: element.isBold ? 'bold' : 'normal',
    fontStyle: element.isItalic ? 'italic' : 'normal',
    textDecoration: element.isUnderline ? 'underline' : 'none',
    fontFamily: element.fontFamily,
  });

  return (
    <main ref={containerRef} className="flex-grow bg-gray-50 p-10 relative">
      {elements.map((element, index) => (
        <div
          key={index}
          className={`border border-green-500 p-4 text-center absolute ${selectedIndex === index ? 'border-2 border-blue-500' : ''}`}
          style={{
            left: `${element.position.x}px`,
            top: `${element.position.y}px`,
            cursor: 'move',
          }}
          onMouseDown={(e) => handleDragStart(index, e)}
          onClick={() => setSelectedIndex(index)}
        >
          <input
            type="text"
            value={element.text}
            onChange={(e) => handleTextChange(index, e.target.value)}
            className="bg-transparent text-center"
            style={applyStyles(element)}
          />
        </div>
      ))}
    </main>
  );
}
