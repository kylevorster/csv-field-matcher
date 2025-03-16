
export type DataRow = Record<string, string>;

/**
 * Parses a CSV file and returns its headers and data
 */
export function parseCSV(text: string): { headers: string[]; data: DataRow[] } {
  // Split by line breaks to get rows
  const rows = text.split(/\r?\n/).filter(row => row.trim() !== '');
  
  if (rows.length === 0) {
    return { headers: [], data: [] };
  }

  // Parse headers (first row)
  // This simple parser splits by commas, but a more robust solution would handle quotes
  const headers = rows[0].split(',').map(header => header.trim());
  
  // Parse data rows
  const data: DataRow[] = [];
  
  for (let i = 1; i < rows.length; i++) {
    const values = rows[i].split(',').map(value => value.trim());
    
    // Skip rows with incorrect number of values
    if (values.length !== headers.length) continue;
    
    const row: DataRow = {};
    
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j];
    }
    
    data.push(row);
  }
  
  return { headers, data };
}

/**
 * Validates data against expected formats
 */
export function validateData(
  data: DataRow[], 
  mapping: Record<string, string>
): { row: number; field: string; value: string; error: string }[] {
  const errors: { row: number; field: string; value: string; error: string }[] = [];
  
  // Simple validation for common field types
  const validators: Record<string, (value: string) => string | null> = {
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? null : 'Invalid email format';
    },
    phone: (value) => {
      const phoneRegex = /^\+?[0-9()-\s]{7,}$/;
      return phoneRegex.test(value) ? null : 'Invalid phone format';
    },
    zip: (value) => {
      const zipRegex = /^[0-9]{5}(-[0-9]{4})?$/;
      return zipRegex.test(value) ? null : 'Invalid zip code format';
    }
  };
  
  // Reverse the mapping to go from DB field to CSV field
  const reverseMapping: Record<string, string> = {};
  for (const [csvField, dbField] of Object.entries(mapping)) {
    if (dbField) {
      reverseMapping[dbField] = csvField;
    }
  }
  
  // Validate each row
  data.forEach((row, rowIndex) => {
    for (const [dbField, validator] of Object.entries(validators)) {
      const csvField = reverseMapping[dbField];
      
      if (csvField && row[csvField]) {
        const error = validator(row[csvField]);
        
        if (error) {
          errors.push({
            row: rowIndex + 1, // +1 for human-readable row numbers
            field: dbField,
            value: row[csvField],
            error
          });
        }
      }
    }
    
    // Check for empty required fields
    const requiredFields = ['name', 'email'];
    for (const field of requiredFields) {
      const csvField = reverseMapping[field];
      
      if (csvField && (!row[csvField] || row[csvField].trim() === '')) {
        errors.push({
          row: rowIndex + 1,
          field,
          value: '',
          error: 'Required field cannot be empty'
        });
      }
    }
  });
  
  return errors;
}
