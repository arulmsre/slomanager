import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsPanel = () => {
  const alerts = [
    {
      id: 1,
      service: "API Gateway",
      sloName: "Response Time SLO",
      severity: "critical",
      message: "SLO breach detected - Response time exceeded 500ms threshold",
      timestamp: "2 minutes ago",
      currentValue: "750ms",
      threshold: "500ms",
      impact: "High"
    },
    {
      id: 2,
      service: "User Authentication",
      sloName: "Availability SLO",
      severity: "warning",
      message: "Approaching threshold - Availability dropped to 99.5%",
      timestamp: "15 minutes ago",
      currentValue: "99.5%",
      threshold: "99.9%",
      impact: "Medium"
    },
    {
      id: 3,
      service: "Payment Processing",
      sloName: "Error Rate SLO",
      severity: "info",
      message: "Error rate increased but within acceptable limits",
      timestamp: "1 hour ago",
      currentValue: "0.8%",
      threshold: "1.0%",
      impact: "Low"
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'info':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Priority Alerts</h2>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Configure
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {alerts?.map((alert) => (
          <div key={alert?.id} className="p-6 hover:bg-muted/50 transition-smooth">
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${getSeverityColor(alert?.severity)}`}>
                <Icon name={getSeverityIcon(alert?.severity)} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-foreground">{alert?.service}</h3>
                  <span className="text-xs text-muted-foreground">{alert?.timestamp}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{alert?.message}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Current Value</p>
                    <p className="text-sm font-medium text-foreground">{alert?.currentValue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Threshold</p>
                    <p className="text-sm font-medium text-foreground">{alert?.threshold}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert?.severity)}`}>
                    {alert?.severity?.charAt(0)?.toUpperCase() + alert?.severity?.slice(1)} Impact
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={14} className="mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Zap" size={14} className="mr-1" />
                      Action
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="ghost" size="sm" className="w-full">
          View All Alerts ({alerts?.length + 5} more)
        </Button>
      </div>
    </div>
  );
};

export default AlertsPanel;