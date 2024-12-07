export interface Person {
  id?: number;
  name: string;
  age: number;
  dob: string;
  gender: 'male' | 'female' | 'other';
  barcodeData?: string;
}