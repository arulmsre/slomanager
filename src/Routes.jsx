import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SLODashboard from './pages/slo-dashboard';
import CreateNewSLO from './pages/create-new-slo';
import Login from './pages/login';
import SLODetails from './pages/slo-details';
import SLOListManagement from './pages/slo-list-management';
import EditSLO from './pages/edit-slo';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<SLODashboard />} />
        <Route path="/slo-dashboard" element={<SLODashboard />} />
        <Route path="/create-new-slo" element={<CreateNewSLO />} />
        <Route path="/login" element={<Login />} />
        <Route path="/slo-details" element={<SLODetails />} />
        <Route path="/slo-list-management" element={<SLOListManagement />} />
        <Route path="/edit-slo" element={<EditSLO />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
