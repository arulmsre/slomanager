import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DependencyChecker = ({ sloId, formData }) => {
  const [dependencies, setDependencies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [impactLevel, setImpactLevel] = useState('low');

  // Mock dependency data
  const mockDependencies = [
    {
      id: 'slo-001',
      name: 'Database Response Time SLO',
      type: 'slo',
      service: 'Database Cluster',
      relationship: 'depends_on',
      impact: 'high',
      description: 'This SLO monitors database response times that directly affect API Gateway performance',
      status: 'healthy',
      lastUpdated: new Date('2024-10-29T08:30:00')
    },
    {
      id: 'slo-002',
      name: 'CDN Availability SLO',
      type: 'slo',
      service: 'CDN Service',
      relationship: 'related',
      impact: 'medium',
      description: 'CDN performance impacts overall user experience metrics',
      status: 'warning',
      lastUpdated: new Date('2024-10-29T09:15:00')
    },
    {
      id: 'alert-001',
      name: 'API Gateway High Latency Alert',
      type: 'alert',
      service: 'API Gateway',
      relationship: 'triggers',
      impact: 'high',
      description: 'Alert rule that triggers when API response time exceeds threshold',
      status: 'active',
      lastUpdated: new Date('2024-10-29T10:00:00')
    },
    {
      id: 'dashboard-001',
      name: 'Service Health Dashboard',
      type: 'dashboard',
      service: 'Monitoring',
      relationship: 'displays',
      impact: 'low',
      description: 'Dashboard widget showing this SLO status',
      status: 'active',
      lastUpdated: new Date('2024-10-29T07:45:00')
    }
  ];

  useEffect(() => {
    // Simulate dependency checking
    setIsLoading(true);
    setTimeout(() => {
      setDependencies(mockDependencies);
      
      // Calculate impact level based on dependencies
      const highImpactCount = mockDependencies?.filter(dep => dep?.impact === 'high')?.length;
      const mediumImpactCount = mockDependencies?.filter(dep => dep?.impact === 'medium')?.length;
      
      if (highImpactCount > 0) {
        setImpactLevel('high');
      } else if (mediumImpactCount > 0) {
        setImpactLevel('medium');
      } else {
        setImpactLevel('low');
      }
      
      setIsLoading(false);
    }, 1000);
  }, [sloId, formData]);

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': case'active':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'slo':
        return 'Target';
      case 'alert':
        return 'AlertTriangle';
      case 'dashboard':
        return 'BarChart3';
      default:
        return 'Link';
    }
  };

  const getRelationshipLabel = (relationship) => {
    switch (relationship) {
      case 'depends_on':
        return 'Depends on';
      case 'related':
        return 'Related to';
      case 'triggers':
        return 'Triggers';
      case 'displays':
        return 'Displays';
      default:
        return 'Connected to';
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Dependency Analysis</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Review dependencies and impact assessment before making changes
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-md border text-sm font-medium ${getImpactColor(impactLevel)}`}>
            {impactLevel?.charAt(0)?.toUpperCase() + impactLevel?.slice(1)} Impact
          </div>
          {isLoading && <Icon name="Loader2" size={16} className="animate-spin text-muted-foreground" />}
        </div>
      </div>
      {/* Impact Summary */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-start space-x-3">
          <Icon 
            name={impactLevel === 'high' ? 'AlertTriangle' : impactLevel === 'medium' ? 'AlertCircle' : 'Info'} 
            size={20} 
            className={impactLevel === 'high' ? 'text-error' : impactLevel === 'medium' ? 'text-warning' : 'text-success'}
          />
          <div>
            <h4 className="font-medium text-foreground mb-1">Change Impact Assessment</h4>
            <p className="text-sm text-muted-foreground">
              {impactLevel === 'high' && 'High impact changes detected. Multiple critical systems may be affected. Review all dependencies carefully before proceeding.'
              }
              {impactLevel === 'medium' && 'Medium impact changes detected. Some monitoring and alerting systems may be affected.'
              }
              {impactLevel === 'low' && 'Low impact changes detected. Minimal effect on dependent systems expected.'
              }
            </p>
          </div>
        </div>
      </div>
      {/* Dependencies List */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground flex items-center space-x-2">
          <Icon name="GitBranch" size={16} />
          <span>Connected Systems ({dependencies?.length})</span>
        </h4>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3]?.map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {dependencies?.map((dependency) => (
              <div
                key={dependency?.id}
                className="border border-border rounded-lg p-4 hover:border-muted-foreground transition-smooth"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={getTypeIcon(dependency?.type)} size={16} className="text-muted-foreground" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-medium text-foreground truncate">{dependency?.name}</h5>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded border ${getImpactColor(dependency?.impact)}`}>
                          {dependency?.impact}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center space-x-1">
                          <Icon name="Server" size={12} />
                          <span>{dependency?.service}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Icon name="Link" size={12} />
                          <span>{getRelationshipLabel(dependency?.relationship)}</span>
                        </span>
                        <span className={`flex items-center space-x-1 ${getStatusColor(dependency?.status)}`}>
                          <Icon name="Circle" size={8} className="fill-current" />
                          <span>{dependency?.status}</span>
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{dependency?.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(dependency?.lastUpdated)}
                    </span>
                    <Button variant="ghost" size="icon">
                      <Icon name="ExternalLink" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Action Recommendations */}
      {impactLevel === 'high' && (
        <div className="mt-6 p-4 bg-error/5 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-error flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-error mb-2">Recommended Actions</h4>
              <ul className="text-sm text-foreground space-y-1">
                <li>• Notify dependent service owners before applying changes</li>
                <li>• Schedule changes during maintenance window</li>
                <li>• Prepare rollback plan for critical dependencies</li>
                <li>• Monitor affected systems closely after deployment</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DependencyChecker;