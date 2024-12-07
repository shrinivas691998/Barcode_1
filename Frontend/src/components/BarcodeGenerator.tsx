import React, { useState, useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import { createPerson } from '../services/api';

interface FormData {
  name: string;
  dob: string;
  sex: string;
}

const BarcodeGenerator: React.FC = () => {
  const barcodeRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    dob: '',
    sex: '',
  });
  const [barcodeData, setBarcodeData] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (barcodeData && barcodeRef.current) {
      JsBarcode(barcodeRef.current, barcodeData, {
        format: "CODE128",
        width: 2,
        height: 100,
        displayValue: true
      });
    }
  }, [barcodeData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      // Generate a unique barcode
      const newBarcodeData = Date.now().toString();
      setBarcodeData(newBarcodeData);

      // Send data to backend
      await createPerson({
        ...formData,
        barcodeData: newBarcodeData,
      });

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save data');
      setBarcodeData('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
            Date of Birth
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="dob"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sex">
            Sex
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          >
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Generate Barcode
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Data saved successfully!
        </div>
      )}

      {barcodeData && (
        <div className="text-center mt-4">
          <canvas ref={barcodeRef}></canvas>
        </div>
      )}
    </div>
  );
};

export default BarcodeGenerator;

