import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MetricsCard from './components/MetricsCard';
import AlertsPanel from './components/AlertsPanel';
import RecentChangesTable from './components/RecentChangesTable';
import QuickActionsPanel from './components/QuickActionsPanel';

const SLODashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Simulate real-time updates
    const updateTimer = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(updateTimer);
    };
  }, []);

  const metricsData = [
    {
      title: "Total SLOs",
      value: "47",
      subtitle: "Across 12 services",
      icon: "Target",
      trend: "up",
      trendValue: "+3",
      color: "primary"
    },
    {
      title: "Active Alerts",
      value: "3",
      subtitle: "2 critical, 1 warning",
      icon: "AlertTriangle",
      trend: "down",
      trendValue: "-2",
      color: "error"
    },
    {
      title: "Services at Risk",
      value: "2",
      subtitle: "Approaching thresholds",
      icon: "Shield",
      trend: "up",
      trendValue: "+1",
      color: "warning"
    },
    {
      title: "Reliability Score",
      value: "99.7%",
      subtitle: "Last 30 days average",
      icon: "TrendingUp",
      trend: "up",
      trendValue: "+0.2%",
      color: "success"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading dashboard...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">SLO Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                  Monitor service reliability and SLO performance across your infrastructure
                </p>
              </div>
              <div className="mt-4 sm:mt-0 text-sm text-muted-foreground">
                Last updated: {lastUpdated?.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                subtitle={metric?.subtitle}
                icon={metric?.icon}
                trend={metric?.trend}
                trendValue={metric?.trendValue}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Alerts and Recent Changes */}
            <div className="lg:col-span-2 space-y-8">
              {/* Priority Alerts Panel */}
              <AlertsPanel />
              
              {/* Recent Changes Table */}
              <RecentChangesTable />
            </div>

            {/* Right Column - Quick Actions and System Info */}
            <div className="lg:col-span-1">
              <QuickActionsPanel />
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
              <p>SLO Manager Dashboard - Real-time monitoring and management</p>
              <p className="mt-2 sm:mt-0">
                © {new Date()?.getFullYear()} SLO Manager. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLODashboard;