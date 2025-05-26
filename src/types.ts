export interface Translation {
  id: string;
  sourceText: string;
  translatedText: string;
  timestamp: Date;
  sourceLang: string;
  targetLang: string;
}