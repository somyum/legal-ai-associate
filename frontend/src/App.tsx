import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "../components/ui/sonner";
import { Toaster } from "../components/ui/toaster";
import { TooltipProvider } from "../components/ui/tooltip.tsx";
import Index from "../pages/Index.tsx";
import NotFound from "../pages/NotFound.tsx";
import DashboardOverview from '../pages/dashboard/DashboardOverview.tsx'
import DashboardLayout from '../layout/DashBoardLayout.tsx'
import UploadPage from '../pages/dashboard/UploadPage.tsx'
import PartiesPage from "../pages/dashboard/PartiesPage.tsx";
import ConflictsPage from "../pages/dashboard/ConflictsPage.tsx";
import DepositionPage from "../pages/dashboard/DepositionPage.tsx";
import EvidencePage from "../pages/dashboard/EvidencePage.tsx";
import './App.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="parties" element={<PartiesPage />} />
            <Route path="conflicts" element={<ConflictsPage />} />
            <Route path="deposition" element={<DepositionPage />} />
            <Route path="evidence" element={<EvidencePage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;