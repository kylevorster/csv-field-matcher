
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useImportStore } from '@/hooks/use-import-store';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';

const ValidationTable = () => {
  const { validationErrors, csvData } = useImportStore();
  
  if (validationErrors.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-secondary/30 animate-fade-in">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13L10 16L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">All data looks good!</h3>
        <p className="text-muted-foreground">
          No validation errors were found. You can proceed with the import.
        </p>
      </div>
    );
  }
  
  return (
    <div className="rounded-lg border animate-slide-up">
      <div className="px-4 py-3 border-b flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-destructive" />
        <h3 className="text-sm font-medium">Validation Errors Found</h3>
        <Badge variant="outline" className="ml-auto">{validationErrors.length} issues</Badge>
      </div>
      <ScrollArea className="h-[400px] w-full rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Row</TableHead>
              <TableHead>Field</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Error</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {validationErrors.map((error, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{error.row}</TableCell>
                <TableCell>{error.field}</TableCell>
                <TableCell>
                  <code className="bg-secondary px-1 py-0.5 rounded text-sm">
                    {error.value || '(empty)'}
                  </code>
                </TableCell>
                <TableCell className="text-destructive">{error.error}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <div className="p-4 border-t bg-secondary/30 text-sm text-muted-foreground">
        You can still proceed with import, but these rows might cause issues.
      </div>
    </div>
  );
};

export default ValidationTable;
