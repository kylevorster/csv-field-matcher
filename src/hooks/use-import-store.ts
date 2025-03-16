
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type DataRow = Record<string, string>;
type FieldMapping = Record<string, string>;
type ValidationError = {
  row: number;
  field: string;
  value: string;
  error: string;
};

interface ImportState {
  // CSV data
  csvHeaders: string[];
  csvData: DataRow[];
  fileName: string;
  
  // Mapping state
  dbFields: string[];
  fieldMapping: FieldMapping;
  
  // Validation state
  validationErrors: ValidationError[];
  
  // UI state
  currentStep: number;
  
  // Actions
  setCSV: (headers: string[], data: DataRow[], fileName: string) => void;
  setDBFields: (fields: string[]) => void;
  setFieldMapping: (mapping: FieldMapping) => void;
  updateFieldMapping: (csvField: string, dbField: string) => void;
  setValidationErrors: (errors: ValidationError[]) => void;
  setCurrentStep: (step: number) => void;
  resetImport: () => void;
}

// Mock database fields (in a real app, you would fetch these from your database schema)
const DEFAULT_DB_FIELDS = [
  'id',
  'name',
  'email',
  'phone',
  'address',
  'city',
  'state',
  'zip',
  'country',
  'created_at',
  'updated_at'
];

export const useImportStore = create<ImportState>()(
  persist(
    (set) => ({
      // Initial state
      csvHeaders: [],
      csvData: [],
      fileName: '',
      dbFields: DEFAULT_DB_FIELDS,
      fieldMapping: {},
      validationErrors: [],
      currentStep: 1,
      
      // Actions
      setCSV: (headers, data, fileName) => 
        set({ csvHeaders: headers, csvData: data, fileName }),
      
      setDBFields: (fields) => 
        set({ dbFields: fields }),
      
      setFieldMapping: (mapping) => 
        set({ fieldMapping: mapping }),
      
      updateFieldMapping: (csvField, dbField) => 
        set((state) => ({
          fieldMapping: {
            ...state.fieldMapping,
            [csvField]: dbField
          }
        })),
      
      setValidationErrors: (errors) => 
        set({ validationErrors: errors }),
      
      setCurrentStep: (step) => 
        set({ currentStep: step }),
      
      resetImport: () => 
        set({
          csvHeaders: [],
          csvData: [],
          fileName: '',
          fieldMapping: {},
          validationErrors: [],
          currentStep: 1
        })
    }),
    {
      name: 'csv-import-storage'
    }
  )
);
