import { useState, useEffect } from 'react';
import { useImportStore } from '@/hooks/use-import-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { validateData } from '@/lib/csv-parser';
import { useToast } from '@/components/ui/use-toast';

const FieldMapper = () => {
  const { 
    csvHeaders, 
    dbFields, 
    fieldMapping, 
    updateFieldMapping, 
    setCurrentStep,
    setValidationErrors,
    csvData
  } = useImportStore();
  const [mappedFields, setMappedFields] = useState<string[]>([]);
  const { toast } = useToast();

  // Keep track of already-mapped fields
  useEffect(() => {
    setMappedFields(Object.values(fieldMapping).filter(Boolean));
  }, [fieldMapping]);

  const handleMapField = (csvField: string, dbField: string) => {
    updateFieldMapping(csvField, dbField);
  };

  const handleAutoMap = () => {
    const newMapping: Record<string, string> = {};
    
    // Try to match fields by name (case-insensitive)
    csvHeaders.forEach((csvField) => {
      const csvFieldLower = csvField.toLowerCase().trim();
      
      const matchingDBField = dbFields.find((dbField) => 
        dbField.toLowerCase().trim() === csvFieldLower
      );
      
      if (matchingDBField) {
        newMapping[csvField] = matchingDBField;
      }
    });
    
    // Update all mappings at once
    for (const [csvField, dbField] of Object.entries(newMapping)) {
      updateFieldMapping(csvField, dbField);
    }
    
    toast({
      title: "Auto-mapping applied",
      description: `${Object.keys(newMapping).length} fields were automatically mapped`
    });
  };

  const handleContinue = () => {
    // Check if any fields are mapped
    if (Object.keys(fieldMapping).length === 0) {
      toast({
        title: "No fields mapped",
        description: "Please map at least one field before continuing",
        variant: "destructive"
      });
      return;
    }
    
    // Validate the data with current mapping
    const errors = validateData(csvData, fieldMapping);
    setValidationErrors(errors);
    
    // Move to validation step
    setCurrentStep(3);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Map Your CSV Fields</h2>
        <Button variant="outline" size="sm" onClick={handleAutoMap}>
          Auto-map matching fields
        </Button>
      </div>

      <div className="grid gap-4">
        {csvHeaders.map((csvField) => (
          <Card key={csvField} className={cn(
            "overflow-hidden transition-all duration-300",
            fieldMapping[csvField] ? "border-primary/20 bg-secondary/50" : ""
          )}>
            <CardContent className="p-0">
              <div className="flex items-center p-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{csvField}</p>
                  <p className="text-sm text-muted-foreground">CSV Field</p>
                </div>
                
                <div className="mx-4 flex items-center text-muted-foreground">
                  <ArrowRight className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <Select
                    value={fieldMapping[csvField] || ""}
                    onValueChange={(value) => handleMapField(csvField, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a database field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">-- Skip this field --</SelectItem>
                      {dbFields.map((dbField) => (
                        <SelectItem
                          key={dbField}
                          value={dbField}
                          disabled={mappedFields.includes(dbField) && fieldMapping[csvField] !== dbField}
                        >
                          {dbField}
                          {mappedFields.includes(dbField) && fieldMapping[csvField] !== dbField && " (already mapped)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleContinue}>
          Continue to Validation
        </Button>
      </div>
    </div>
  );
};

export default FieldMapper;
