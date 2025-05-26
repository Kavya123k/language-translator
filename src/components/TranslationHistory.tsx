import React from 'react';
import { Clock, Copy } from 'lucide-react';
import { Translation } from '../types';

interface TranslationHistoryProps {
  translations: Translation[];
}

const TranslationHistory: React.FC<TranslationHistoryProps> = ({ translations }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  if (translations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {translations.map(translation => (
        <div 
          key={translation.id}
          className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 mb-1">{translation.sourceText}</p>
              <p className="text-sm text-gray-700">{translation.translatedText}</p>
            </div>
            <button
              onClick={() => copyToClipboard(translation.translatedText, translation.id)}
              className={`ml-2 p-1.5 rounded-full transition-colors ${
                copiedId === translation.id
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Copy translation"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            <span>{formatTime(translation.timestamp)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TranslationHistory;