import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminClients from "./pages/admin/AdminClients";
import AdminInbox from "./pages/admin/AdminInbox";
import AdminSubscribers from "./pages/admin/AdminSubscribers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            {/* Admin Routes - Protected & Require Admin Role */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/projects" element={
              <ProtectedRoute requireAdmin>
                <AdminProjects />
              </ProtectedRoute>
            } />
            <Route path="/admin/clients" element={
              <ProtectedRoute requireAdmin>
                <AdminClients />
              </ProtectedRoute>
            } />
            <Route path="/admin/inbox" element={
              <ProtectedRoute requireAdmin>
                <AdminInbox />
              </ProtectedRoute>
            } />
            <Route path="/admin/subscribers" element={
              <ProtectedRoute requireAdmin>
                <AdminSubscribers />
              </ProtectedRoute>
            } />
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
