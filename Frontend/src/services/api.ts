interface PersonData {
  name: string;
  dob: string;
  sex: string;
  barcodeData: string;
  age?: number;
}

interface PersonResponse {
  id: number;
  name: string;
  age: number;
  dob: string;
  sex: string;
  barcodeData: string;
  createdAt?: string;
}

// Use environment variable or fallback to default URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function createPerson(personData: PersonData): Promise<PersonResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/persons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(personData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save person data');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function getPersonByBarcode(barcodeData: string): Promise<PersonResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/persons/barcode/${encodeURIComponent(barcodeData)}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch person data');
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

