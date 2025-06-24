
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Companies from "./pages/Companies";
import Founders from "./pages/Founders";
import CompanyDetail from "./pages/CompanyDetail";
import FounderDetail from "./pages/FounderDetail";
import JoinCommunity from "./pages/JoinCommunity";
import HiddenAuth from "./pages/HiddenAuth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/founders" element={<Founders />} />
              <Route path="/company/:slug" element={<CompanyDetail />} />
              <Route path="/founder/:slug" element={<FounderDetail />} />
              <Route path="/join" element={<JoinCommunity />} />
              <Route path="/hiddenauth" element={<HiddenAuth />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
