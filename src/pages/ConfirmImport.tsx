
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImportStore } from '@/hooks/use-import-store';
import StepIndicator from '@/components/StepIndicator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

const ConfirmImport = () => {
  const { csvData, resetImport, fieldMapping, setCurrentStep, currentStep } = useImportStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imported, setImported] = useState(false);
  
  // Redirect if no CSV data
  useEffect(() => {
    if (csvData.length === 0) {
      navigate('/csv-upload');
      return;
    }
    
    // Ensure we're on step 4
    if (currentStep !== 4) {
      setCurrentStep(4);
    }
  }, [csvData.length, navigate, currentStep, setCurrentStep]);
  
  const handleImport = async () => {
    setImporting(true);
    
    // Mock import process with progress updates
    const totalRows = csvData.length;
    let importedRows = 0;
    
    // In a real app, you would replace this with actual API calls
    // to import data to your database
    for (let i = 0; i < totalRows; i++) {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 50));
      
      importedRows++;
      const newProgress = Math.round((importedRows / totalRows) * 100);
      setProgress(newProgress);
      
      // Simulate console logs during import
      if (i % 10 === 0 || i === totalRows - 1) {
        console.log(`Imported ${importedRows} of ${totalRows} rows (${newProgress}%)`);
      }
    }
    
    // Show success toast and update UI
    toast({
      title: "Import Completed",
      description: `Successfully imported ${totalRows} rows into your database.`,
    });
    
    setImporting(false);
    setImported(true);
  };
  
  const handleStartNew = () => {
    resetImport();
    navigate('/csv-upload');
  };
  
  return (
    <div className="container px-4 py-12 max-w-4xl mx-auto">
      {!imported && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6" 
          onClick={() => navigate('/validation-preview')}
          disabled={importing}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Validation
        </Button>
      )}
      
      <div className="text-center mb-6">
        <h1 className="text-3xl font-medium tracking-tight mb-2">
          {imported ? "Import Completed" : "Confirm Import"}
        </h1>
        <p className="text-muted-foreground">
          {imported 
            ? "Your data has been successfully imported" 
            : "Ready to add data to your database"}
        </p>
      </div>
      
      <StepIndicator />
      
      <div className="bg-card shadow-sm border rounded-xl p-8 max-w-2xl mx-auto">
        {!imported ? (
          <>
            <div className="text-center space-y-4 mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5 5 5-5m-5 5V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-xl font-medium">Import {csvData.length} Records</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                You're about to import {csvData.length} records to your database.
                This action cannot be undone.
              </p>
            </div>
            
            {importing ? (
              <div className="space-y-4">
                <Progress value={progress} className="h-2" />
                <p className="text-center text-sm text-muted-foreground">
                  Importing... {progress}% complete
                </p>
              </div>
            ) : (
              <div className="flex justify-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/validation-preview')}
                  disabled={importing}
                >
                  Go Back
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={importing}
                >
                  {importing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    'Start Import'
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-center space-y-4 mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-2">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-medium">Import Complete</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Successfully imported {csvData.length} records to your database.
              </p>
              
              <div className="bg-secondary/50 rounded-lg p-4 mt-6 max-w-md mx-auto">
                <h3 className="font-medium text-sm mb-2">Import Summary</h3>
                <ul className="text-sm space-y-2 text-left">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Total Records:</span>
                    <span className="font-medium">{csvData.length}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Mapped Fields:</span>
                    <span className="font-medium">{Object.keys(fieldMapping).length}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium text-emerald-500">Completed</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button onClick={handleStartNew}>
                Start New Import
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmImport;
