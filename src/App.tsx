
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CSVUpload from "./pages/CSVUpload";
import FieldMapping from "./pages/FieldMapping";
import ValidationPreview from "./pages/ValidationPreview";
import ConfirmImport from "./pages/ConfirmImport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/csv-upload" element={<CSVUpload />} />
          <Route path="/field-mapping" element={<FieldMapping />} />
          <Route path="/validation-preview" element={<ValidationPreview />} />
          <Route path="/confirm-import" element={<ConfirmImport />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
