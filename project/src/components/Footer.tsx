import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-4 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-600 flex items-center justify-center">
          Made with <Heart className="h-4 w-4 text-red-500 mx-1" fill="currentColor" /> in 2025
        </p>
        <p className="text-xs text-gray-500 mt-1">
          This is a demonstration project and not affiliated with any official translation service.
        </p>
      </div>
    </footer>
  );
};

export default Footer;