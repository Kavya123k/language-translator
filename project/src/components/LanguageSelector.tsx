import React from 'react';
import { ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'en', name: 'English', nativeName: 'English' },
  // More languages could be added here for future expansion
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  value, 
  onChange, 
  disabled = false,
  label
}) => {
  const selectedLanguage = languages.find(lang => lang.code === value) || languages[0];
  
  return (
    <div className="relative">
      {label && (
        <label className="block text-xs text-gray-500 mb-1">{label}</label>
      )}
      <button
        type="button"
        className={`flex items-center space-x-2 py-1.5 px-3 rounded-md border ${
          disabled
            ? 'bg-gray-50 cursor-not-allowed border-gray-200'
            : 'bg-white hover:bg-gray-50 border-gray-300'
        } transition-colors`}
        disabled={disabled}
      >
        <span className="text-sm font-medium">
          {selectedLanguage.nativeName}
        </span>
        {!disabled && <ChevronDown className="h-4 w-4 text-gray-500" />}
      </button>
    </div>
  );
};

export default LanguageSelector;