
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Database, Table } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background animate-fade-in">
      <div className="max-w-[800px] w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 animate-float">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 2H9a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">CSV Field Matcher</h1>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            Import your CSV data into the database with our intuitive field mapping tool.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="group hover:shadow-md transition-all duration-300 border">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Upload CSV</CardTitle>
              <CardDescription>Import data from your CSV files</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground">
                Select a CSV file and start the import process with our user-friendly interface.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate('/csv-upload')} 
                className="w-full group-hover:bg-primary/90 transition-colors"
              >
                Start Import
              </Button>
            </CardFooter>
          </Card>

          <Card className="border">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-2">
                <Table className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Map Fields</CardTitle>
              <CardDescription>Match columns to database fields</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground">
                Easily map your CSV columns to the corresponding database fields with intelligent suggestions.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                View Documentation
              </Button>
            </CardFooter>
          </Card>

          <Card className="border">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-2">
                <Database className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Import Data</CardTitle>
              <CardDescription>Add data to your database</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground">
                Validate your data before importing to ensure data integrity and prevent errors.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                View Database
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            This tool helps you easily import CSV data into your database with field mapping and validation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
