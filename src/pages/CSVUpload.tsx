
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImportStore } from '@/hooks/use-import-store';
import FileUploader from '@/components/FileUploader';
import StepIndicator from '@/components/StepIndicator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CSVUpload = () => {
  const { currentStep, setCurrentStep, csvData, resetImport } = useImportStore();
  const navigate = useNavigate();
  const [hasExistingData, setHasExistingData] = useState(false);
  
  useEffect(() => {
    // Check if there's existing import data
    if (csvData.length > 0) {
      setHasExistingData(true);
    }
    
    // Ensure we're on step 1
    setCurrentStep(1);
  }, [csvData.length, setCurrentStep]);
  
  const handleReset = () => {
    resetImport();
    setHasExistingData(false);
  };
  
  return (
    <div className="container px-4 py-12 max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6" 
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>
      
      <div className="text-center mb-6">
        <h1 className="text-3xl font-medium tracking-tight mb-2">Import CSV Data</h1>
        <p className="text-muted-foreground">
          Upload a CSV file to import data into your database
        </p>
      </div>
      
      <StepIndicator />
      
      {hasExistingData && (
        <div className="bg-secondary/50 border rounded-lg p-4 mb-6 flex justify-between items-center">
          <div>
            <p className="font-medium">Continue your previous import?</p>
            <p className="text-sm text-muted-foreground">You have an import in progress.</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Start New Import
            </Button>
            <Button size="sm" onClick={() => navigate('/field-mapping')}>
              Continue
            </Button>
          </div>
        </div>
      )}
      
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <FileUploader />
      </div>
      
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Need help? Check our guide on <a href="#" className="underline hover:text-primary">preparing your CSV file</a>.
        </p>
      </div>
    </div>
  );
};

export default CSVUpload;
