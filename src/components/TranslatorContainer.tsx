import React, { useState } from 'react';
import TranslatorCard from './TranslatorCard';
import TranslationHistory from './TranslationHistory';
import { Translation } from '../types';

const TranslatorContainer = () => {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);

  const addTranslation = (translation: Translation) => {
    setTranslations(prev => [translation, ...prev.slice(0, 9)]);
  };

  const handleTranslate = async (text: string): Promise<string> => {
    if (!text.trim()) return '';
    
    setIsTranslating(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock translation dictionary - in a real app, this would be an API call
      const mockTranslations: Record<string, string> = {
        'hello': 'ನಮಸ್ಕಾರ',
        'how are you': 'ಹೇಗಿದ್ದೀರಾ',
        'thank you': 'ಧನ್ಯವಾದಗಳು',
        'good morning': 'ಶುಭೋದಯ',
        'good evening': 'ಶುಭ ಸಂಜೆ',
        'good night': 'ಶುಭ ರಾತ್ರಿ',
        'what is your name': 'ನಿಮ್ಮ ಹೆಸರೇನು',
        'my name is': 'ನನ್ನ ಹೆಸರು',
        'nice to meet you': 'ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾದದ್ದು ಸಂತೋಷವಾಯಿತು',
        'please': 'ದಯವಿಟ್ಟು',
        'welcome': 'ಸ್ವಾಗತ'
      };
      
      // Check for exact match first
      const normalizedInput = text.trim().toLowerCase();
      let translatedText = mockTranslations[normalizedInput];
      
      if (!translatedText) {
        // Check for partial matches
        for (const [english, kannada] of Object.entries(mockTranslations)) {
          if (normalizedInput.includes(english)) {
            translatedText = kannada;
            break;
          }
        }
      }
      
      // If no match found, return placeholder
      if (!translatedText) {
        translatedText = `[ಅನುವಾದ ಲಭ್ಯವಿಲ್ಲ: ${text}]`;
      }
      
      // Add to history
      const newTranslation: Translation = {
        id: Date.now().toString(),
        sourceText: text,
        translatedText,
        timestamp: new Date(),
        sourceLang: 'en',
        targetLang: 'kn'
      };
      
      addTranslation(newTranslation);
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return 'ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.';
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <TranslatorCard onTranslate={handleTranslate} isTranslating={isTranslating} />
      {translations.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Translations</h2>
          <TranslationHistory translations={translations} />
        </div>
      )}
    </div>
  );
};

export default TranslatorContainer;