import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const quickActions = [
    {
      id: 1,
      title: "Create New SLO",
      description: "Define a new Service Level Objective",
      icon: "Plus",
      color: "primary",
      path: "/create-new-slo"
    },
    {
      id: 2,
      title: "View All SLOs",
      description: "Manage existing SLOs and configurations",
      icon: "List",
      color: "secondary",
      path: "/slo-list-management"
    },
    {
      id: 3,
      title: "Generate Report",
      description: "Create SLO performance reports",
      icon: "FileText",
      color: "accent",
      path: "#"
    }
  ];

  const recentServices = [
    {
      id: 1,
      name: "API Gateway",
      status: "healthy",
      sloCount: 5,
      lastUpdated: "2 hours ago"
    },
    {
      id: 2,
      name: "User Authentication",
      status: "warning",
      sloCount: 3,
      lastUpdated: "4 hours ago"
    },
    {
      id: 3,
      name: "Payment Processing",
      status: "healthy",
      sloCount: 7,
      lastUpdated: "6 hours ago"
    },
    {
      id: 4,
      name: "Database Cluster",
      status: "healthy",
      sloCount: 4,
      lastUpdated: "8 hours ago"
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary text-primary-foreground hover:bg-primary/90';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/90';
      case 'accent':
        return 'bg-accent text-accent-foreground hover:bg-accent/90';
      default:
        return 'bg-muted text-muted-foreground hover:bg-muted/90';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-success bg-success/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'error':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="space-y-3">
          {quickActions?.map((action) => (
            <Link
              key={action?.id}
              to={action?.path}
              className={`flex items-center space-x-4 p-4 rounded-lg transition-smooth ${getColorClasses(action?.color)}`}
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon name={action?.icon} size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{action?.title}</h3>
                <p className="text-sm opacity-90">{action?.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} />
            </Link>
          ))}
        </div>
      </div>
      {/* Recent Services */}
      <div className="bg-card border border-border rounded-lg elevation-1">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Services</h2>
            <Button variant="ghost" size="sm">
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Refresh
            </Button>
          </div>
        </div>
        
        <div className="divide-y divide-border">
          {recentServices?.map((service) => (
            <div key={service?.id} className="p-4 hover:bg-muted/50 transition-smooth">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-foreground">{service?.name}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service?.status)}`}>
                      {service?.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{service?.sloCount} SLOs</span>
                    <span>Updated {service?.lastUpdated}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="ArrowRight" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full">
            View All Services
          </Button>
        </div>
      </div>
      {/* System Health */}
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <h2 className="text-lg font-semibold text-foreground mb-4">System Health</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Overall Health</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm font-medium text-success">Healthy</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Active Monitors</span>
            <span className="text-sm font-medium text-foreground">24/25</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Data Freshness</span>
            <span className="text-sm font-medium text-foreground">&lt; 1 min</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Sync</span>
            <span className="text-sm font-medium text-foreground">Just now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;