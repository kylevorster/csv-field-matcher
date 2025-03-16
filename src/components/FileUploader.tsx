
import { useState, useCallback } from 'react';
import { useImportStore } from '@/hooks/use-import-store';
import { parseCSV } from '@/lib/csv-parser';
import { useToast } from '@/components/ui/use-toast';
import { FileCheck, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const FileUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const { setCSV, setCurrentStep } = useImportStore();

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFile = useCallback(async (selectedFile: File) => {
    if (!selectedFile.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }

    try {
      setFile(selectedFile);
      const text = await selectedFile.text();
      const { headers, data } = parseCSV(text);

      if (headers.length === 0 || data.length === 0) {
        toast({
          title: "Empty CSV file",
          description: "The CSV file appears to be empty or invalid",
          variant: "destructive"
        });
        return;
      }

      setCSV(headers, data, selectedFile.name);
      toast({
        title: "File uploaded successfully",
        description: `${data.length} rows found with ${headers.length} columns`,
      });

      setTimeout(() => {
        setCurrentStep(2); // Move to mapping step
      }, 800);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error parsing CSV",
        description: "There was an error reading your CSV file",
        variant: "destructive"
      });
    }
  }, [setCSV, setCurrentStep, toast]);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const removeFile = useCallback(() => {
    setFile(null);
  }, []);

  return (
    <div className="animate-fade-in w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <div 
          className={cn(
            "border-2 border-dashed rounded-xl p-10 transition-all duration-300 text-center",
            isDragging ? "border-primary bg-secondary/50" : "border-border",
            file ? "bg-secondary/50" : "hover:bg-secondary/30"
          )}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            {!file ? (
              <>
                <div className="p-3 bg-secondary rounded-full animate-float">
                  <Upload className="h-8 w-8 text-primary/80" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">Upload your CSV file</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Drag and drop your file here, or click to browse
                  </p>
                </div>
                <label className="relative">
                  <Button variant="outline" size="sm" className="mt-2">
                    Select File
                  </Button>
                  <input 
                    type="file" 
                    accept=".csv" 
                    onChange={onFileChange} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                </label>
              </>
            ) : (
              <div className="flex items-center justify-between w-full max-w-md mx-auto p-3 bg-background border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded">
                    <FileCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={removeFile}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>Supported format: .csv</p>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
