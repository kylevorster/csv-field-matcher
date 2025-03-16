
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImportStore } from '@/hooks/use-import-store';
import FieldMapper from '@/components/FieldMapper';
import CSVPreview from '@/components/CSVPreview';
import StepIndicator from '@/components/StepIndicator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const FieldMapping = () => {
  const { csvData, setCurrentStep, currentStep } = useImportStore();
  const navigate = useNavigate();
  
  // Redirect if no CSV data
  useEffect(() => {
    if (csvData.length === 0) {
      navigate('/csv-upload');
    }
    
    // Ensure we're on step 2
    if (currentStep !== 2) {
      setCurrentStep(2);
    }
  }, [csvData.length, navigate, currentStep, setCurrentStep]);
  
  return (
    <div className="container px-4 py-12 max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6" 
        onClick={() => navigate('/csv-upload')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Upload
      </Button>
      
      <div className="text-center mb-6">
        <h1 className="text-3xl font-medium tracking-tight mb-2">Map Your Fields</h1>
        <p className="text-muted-foreground">
          Match CSV columns to your database fields
        </p>
      </div>
      
      <StepIndicator />
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-card shadow-sm border rounded-xl p-6">
          <CSVPreview />
        </div>
        
        <div className="bg-card shadow-sm border rounded-xl p-6">
          <FieldMapper />
        </div>
      </div>
    </div>
  );
};

export default FieldMapping;
