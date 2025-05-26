import React from 'react';
import TranslatorContainer from './components/TranslatorContainer';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <TranslatorContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;