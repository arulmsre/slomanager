import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedServices = ({ services, dependencies }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success bg-success/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'critical': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'XCircle';
      default: return 'Clock';
    }
  };

  return (
    <div className="space-y-6">
      {/* Related Services */}
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="Server" size={20} className="text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Related Services</h2>
        </div>

        <div className="space-y-3">
          {services?.map((service) => (
            <div key={service?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(service?.status)?.replace('text-', 'bg-')?.replace(' bg-', ' ')}`} />
                <div>
                  <h4 className="font-medium text-foreground">{service?.name}</h4>
                  <p className="text-sm text-muted-foreground">{service?.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(service?.status)}`}>
                  <Icon name={getStatusIcon(service?.status)} size={12} />
                  <span className="capitalize">{service?.status}</span>
                </div>
                <Link to="/slo-list-management">
                  <Button variant="ghost" size="icon">
                    <Icon name="ExternalLink" size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Add Related Service
          </Button>
        </div>
      </div>
      {/* Dependencies */}
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="GitBranch" size={20} className="text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Dependencies</h2>
        </div>

        <div className="space-y-3">
          {dependencies?.map((dependency) => (
            <div key={dependency?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon name={dependency?.type === 'upstream' ? 'ArrowUp' : 'ArrowDown'} size={16} className="text-muted-foreground" />
                <div>
                  <h4 className="font-medium text-foreground">{dependency?.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {dependency?.type === 'upstream' ? 'Depends on' : 'Dependency of'} • {dependency?.relationship}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(dependency?.status)}`}>
                  <Icon name={getStatusIcon(dependency?.status)} size={12} />
                  <span>{dependency?.impact}</span>
                </div>
                <Link to="/slo-list-management">
                  <Button variant="ghost" size="icon">
                    <Icon name="ExternalLink" size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Map Dependency
          </Button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="Zap" size={20} className="text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link to="/slo-dashboard">
            <Button variant="outline" className="w-full justify-start" iconName="BarChart3" iconPosition="left">
              View Dashboard
            </Button>
          </Link>
          
          <Link to="/slo-list-management">
            <Button variant="outline" className="w-full justify-start" iconName="List" iconPosition="left">
              All SLOs
            </Button>
          </Link>
          
          <Button variant="outline" className="w-full justify-start" iconName="Bell" iconPosition="left">
            Alert History
          </Button>
          
          <Button variant="outline" className="w-full justify-start" iconName="FileText" iconPosition="left">
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RelatedServices;