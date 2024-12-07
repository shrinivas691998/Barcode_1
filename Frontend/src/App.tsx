import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BarcodeScanner from './components/BarcodeScanner';
import BarcodeGenerator from './components/BarcodeGenerator';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg mb-4">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div className="flex items-center py-4 px-2">
                  <Link to="/" className="text-gray-800 text-lg font-semibold hover:text-gray-600">
                    Barcode System
                  </Link>
                </div>
                <div className="flex items-center space-x-1">
                  <Link to="/generate" className="py-4 px-2 text-gray-500 hover:text-gray-900">
                    Generate
                  </Link>
                  <Link to="/scan" className="py-4 px-2 text-gray-500 hover:text-gray-900">
                    Scan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<BarcodeGenerator />} />
            <Route path="/generate" element={<BarcodeGenerator />} />
            <Route path="/scan" element={<BarcodeScanner />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
