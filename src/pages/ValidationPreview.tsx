
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImportStore } from '@/hooks/use-import-store';
import ValidationTable from '@/components/ValidationTable';
import StepIndicator from '@/components/StepIndicator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ValidationPreview = () => {
  const { csvData, validationErrors, setCurrentStep, currentStep } = useImportStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect if no CSV data
  useEffect(() => {
    if (csvData.length === 0) {
      navigate('/csv-upload');
      return;
    }
    
    // Ensure we're on step 3
    if (currentStep !== 3) {
      setCurrentStep(3);
    }
  }, [csvData.length, navigate, currentStep, setCurrentStep]);
  
  const handleImport = () => {
    // If there are validation errors, show a warning toast before proceeding
    if (validationErrors.length > 0) {
      toast({
        title: "Warning: Validation Errors",
        description: "You're proceeding with data that has validation errors. This may cause issues.",
        variant: "destructive",
      });
    }
    
    // Move to the final step
    setCurrentStep(4);
    navigate('/confirm-import');
  };
  
  return (
    <div className="container px-4 py-12 max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6" 
        onClick={() => navigate('/field-mapping')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Field Mapping
      </Button>
      
      <div className="text-center mb-6">
        <h1 className="text-3xl font-medium tracking-tight mb-2">Validate Your Data</h1>
        <p className="text-muted-foreground">
          Review any issues with your data before importing
        </p>
      </div>
      
      <StepIndicator />
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-card shadow-sm border rounded-xl p-6">
          <ValidationTable />
        </div>
        
        <div className="bg-card shadow-sm border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {validationErrors.length > 0 ? (
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              ) : (
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
              )}
              <div>
                <h3 className="font-medium">Ready to Import</h3>
                <p className="text-sm text-muted-foreground">
                  {csvData.length} rows will be imported
                  {validationErrors.length > 0 && `, with ${validationErrors.length} validation issues`}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => navigate('/field-mapping')}>
                Back to Mapping
              </Button>
              <Button onClick={handleImport}>
                Proceed to Import
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationPreview;
