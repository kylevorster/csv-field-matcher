
import { useImportStore } from '@/hooks/use-import-store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CSVPreviewProps {
  rowLimit?: number;
}

const CSVPreview = ({ rowLimit = 5 }: CSVPreviewProps) => {
  const { csvHeaders, csvData } = useImportStore();
  
  if (csvHeaders.length === 0 || csvData.length === 0) {
    return null;
  }
  
  // Limit the number of rows to display in preview
  const previewData = csvData.slice(0, rowLimit);
  
  return (
    <div className="rounded-lg border animate-slide-up">
      <ScrollArea className="h-[300px] w-full rounded-md">
        <div className="p-4">
          <h3 className="text-sm font-medium mb-2">CSV Preview (First {rowLimit} rows)</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] text-xs">#</TableHead>
                  {csvHeaders.map((header) => (
                    <TableHead key={header} className="text-xs">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell className="text-xs font-medium text-muted-foreground">
                      {rowIndex + 1}
                    </TableCell>
                    {csvHeaders.map((header) => (
                      <TableCell key={`${rowIndex}-${header}`} className="text-xs">
                        {row[header] || '-'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {csvData.length > rowLimit && (
            <p className="text-xs text-muted-foreground mt-2 italic">
              + {csvData.length - rowLimit} more rows not shown in preview
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CSVPreview;
