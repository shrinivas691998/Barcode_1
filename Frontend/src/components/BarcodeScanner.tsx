import React, { useState, useEffect, useRef } from 'react';
import { getPersonByBarcode } from '../services/api';

interface PersonData {
  id: number;
  name: string;
  age: number;
  dob: string;
  sex: string;
  barcodeData: string;
}

const BarcodeScanner: React.FC = () => {
  const [scannedPerson, setScannedPerson] = useState<PersonData | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Fetch data when barcode input changes
  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Don't fetch if input is empty
    if (!barcodeInput.trim()) {
      setScannedPerson(null);
      setError('');
      return;
    }

    // Set a small delay before fetching to avoid too many requests
    timeoutRef.current = setTimeout(async () => {
      try {
        setIsLoading(true);
        setError('');
        
        const person = await getPersonByBarcode(barcodeInput.trim());
        setScannedPerson(person);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch person data');
        setScannedPerson(null);
      } finally {
        setIsLoading(false);
      }
    }, 500); // 500ms delay

    // Cleanup timeout on unmount or when input changes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [barcodeInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarcodeInput(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-6">
        <label 
          htmlFor="barcode" 
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Enter Barcode
        </label>
        <input
          type="text"
          id="barcode"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={barcodeInput}
          onChange={handleInputChange}
          placeholder="Scan or type barcode number"
          autoFocus
        />
      </div>

      {isLoading && (
        <div className="text-center py-4">
          <p>Fetching data...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {scannedPerson && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold mb-4">Person Details</h2>
          <div className="mb-2">
            <strong>Name:</strong> {scannedPerson.name}
          </div>
          <div className="mb-2">
            <strong>Age:</strong> {scannedPerson.age}
          </div>
          <div className="mb-2">
            <strong>Date of Birth:</strong> {new Date(scannedPerson.dob).toLocaleDateString()}
          </div>
          <div className="mb-2">
            <strong>Sex:</strong> {scannedPerson.sex}
          </div>
          <div className="mb-2">
            <strong>Barcode:</strong> {scannedPerson.barcodeData}
          </div>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;

