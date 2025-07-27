import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FinanceProvider } from "@/contexts/FinanceContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ModernLayout } from "@/components/ModernLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ModernDashboard } from "@/pages/ModernDashboard";
import { ModernAddTransaction } from "@/pages/ModernAddTransaction";
import { Reports } from "@/pages/Reports";
import { Auth } from "@/pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <SettingsProvider>
          <NotificationProvider>
            <FinanceProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <ModernLayout>
                      <ModernDashboard />
                    </ModernLayout>
                  </ProtectedRoute>
                } />
                <Route path="/add-transaction" element={
                  <ProtectedRoute>
                    <ModernLayout>
                      <ModernAddTransaction />
                    </ModernLayout>
                  </ProtectedRoute>
                } />
                <Route path="/reports" element={
                  <ProtectedRoute>
                    <ModernLayout>
                      <Reports />
                    </ModernLayout>
                  </ProtectedRoute>
                } />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            </FinanceProvider>
          </NotificationProvider>
        </SettingsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
