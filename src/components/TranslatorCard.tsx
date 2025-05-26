import React, { useState, useRef } from 'react';
import { ArrowRightLeft, Copy, Volume2, Loader2 } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import TextCounter from './TextCounter';

interface TranslatorCardProps {
  onTranslate: (text: string) => Promise<string>;
  isTranslating: boolean;
}

const TranslatorCard: React.FC<TranslatorCardProps> = ({ onTranslate, isTranslating }) => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('kn');
  const [copySuccess, setCopySuccess] = useState(false);
  const sourceTextareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    const result = await onTranslate(sourceText);
    setTranslatedText(result);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSourceText(e.target.value);
    if (translatedText) setTranslatedText('');
  };
  
  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };
  
  const copyToClipboard = async () => {
    if (!translatedText) return;
    
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  const speakText = (text: string, lang: string) => {
    if (!text) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-US' : 'kn-IN';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6 pb-4">
        <div className="flex justify-between items-center mb-4">
          <LanguageSelector
            value={sourceLang}
            onChange={setSourceLang}
            disabled={true}
            label="Translate from"
          />
          
          <button 
            onClick={handleSwapLanguages}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Swap languages"
          >
            <ArrowRightLeft className="h-5 w-5 text-gray-500" />
          </button>
          
          <LanguageSelector
            value={targetLang}
            onChange={setTargetLang}
            disabled={true}
            label="Translate to"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="source-text" className="text-sm font-medium text-gray-700">
                English Text
              </label>
              <TextCounter text={sourceText} maxLength={500} />
            </div>
            
            <div className="relative">
              <textarea
                ref={sourceTextareaRef}
                id="source-text"
                value={sourceText}
                onChange={handleInputChange}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                placeholder="Type in English..."
                maxLength={500}
              />
              {sourceText && (
                <button
                  onClick={() => speakText(sourceText, 'en')}
                  className="absolute right-3 bottom-3 p-1 rounded-full hover:bg-gray-100"
                  aria-label="Speak text"
                >
                  <Volume2 className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="translated-text" className="text-sm font-medium text-gray-700">
                ಕನ್ನಡ ಅನುವಾದ
              </label>
              {translatedText && (
                <button
                  onClick={copyToClipboard}
                  className={`text-xs font-medium px-2 py-1 rounded flex items-center space-x-1 transition-colors ${
                    copySuccess ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Copy className="h-3 w-3" />
                  <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
                </button>
              )}
            </div>
            
            <div className="relative">
              <textarea
                id="translated-text"
                value={translatedText}
                readOnly
                className="w-full h-32 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                placeholder="ಅನುವಾದ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ..."
              />
              {translatedText && (
                <button
                  onClick={() => speakText(translatedText, 'kn')}
                  className="absolute right-3 bottom-3 p-1 rounded-full hover:bg-gray-100"
                  aria-label="Speak translation"
                >
                  <Volume2 className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <button
          onClick={handleTranslate}
          disabled={!sourceText.trim() || isTranslating}
          className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all ${
            !sourceText.trim() || isTranslating
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow'
          }`}
        >
          {isTranslating ? (
            <span className="flex items-center justify-center">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Translating...
            </span>
          ) : (
            'Translate'
          )}
        </button>
      </div>
    </div>
  );
};

export default TranslatorCard;