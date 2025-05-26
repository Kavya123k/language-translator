import React from 'react';

interface TextCounterProps {
  text: string;
  maxLength: number;
}

const TextCounter: React.FC<TextCounterProps> = ({ text, maxLength }) => {
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  
  return (
    <div className="flex items-center space-x-3 text-xs text-gray-500">
      <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
      <span className="h-3 w-px bg-gray-300"></span>
      <span className={charCount > maxLength * 0.8 ? 'text-amber-600 font-medium' : ''}>
        {charCount}/{maxLength}
      </span>
    </div>
  );
};

export default TextCounter;