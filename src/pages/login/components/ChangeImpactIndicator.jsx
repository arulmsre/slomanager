import React from 'react';
import Icon from '../../../components/AppIcon';

const ChangeImpactIndicator = ({ originalData, currentData }) => {
  const getChanges = () => {
    const changes = [];
    
    if (originalData?.name !== currentData?.name) {
      changes?.push({
        field: 'Name',
        type: 'modified',
        from: originalData?.name,
        to: currentData?.name,
        impact: 'low'
      });
    }
    
    if (originalData?.targetThreshold !== currentData?.targetThreshold) {
      const oldThreshold = parseFloat(originalData?.targetThreshold);
      const newThreshold = parseFloat(currentData?.targetThreshold);
      const diff = Math.abs(newThreshold - oldThreshold);
      
      changes?.push({
        field: 'Target Threshold',
        type: 'modified',
        from: `${originalData?.targetThreshold}%`,
        to: `${currentData?.targetThreshold}%`,
        impact: diff > 1 ? 'high' : diff > 0.5 ? 'medium' : 'low'
      });
    }
    
    if (originalData?.evaluationWindow !== currentData?.evaluationWindow) {
      changes?.push({
        field: 'Evaluation Window',
        type: 'modified',
        from: originalData?.evaluationWindow,
        to: currentData?.evaluationWindow,
        impact: 'medium'
      });
    }
    
    if (originalData?.metricSource !== currentData?.metricSource) {
      changes?.push({
        field: 'Metric Source',
        type: 'modified',
        from: originalData?.metricSource,
        to: currentData?.metricSource,
        impact: 'high'
      });
    }
    
    if (originalData?.alertingEnabled !== currentData?.alertingEnabled) {
      changes?.push({
        field: 'Alerting',
        type: currentData?.alertingEnabled ? 'enabled' : 'disabled',
        from: originalData?.alertingEnabled ? 'Enabled' : 'Disabled',
        to: currentData?.alertingEnabled ? 'Enabled' : 'Disabled',
        impact: 'medium'
      });
    }
    
    return changes;
  };

  const changes = getChanges();
  
  if (changes?.length === 0) {
    return null;
  }

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

  const getChangeIcon = (type) => {
    switch (type) {
      case 'enabled':
        return 'Plus';
      case 'disabled':
        return 'Minus';
      case 'modified':
        return 'Edit';
      default:
        return 'ArrowRight';
    }
  };

  const getOverallImpact = () => {
    const impacts = changes?.map(change => change?.impact);
    if (impacts?.includes('high')) return 'high';
    if (impacts?.includes('medium')) return 'medium';
    return 'low';
  };

  const overallImpact = getOverallImpact();

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Activity" size={20} className="text-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Change Impact Analysis</h3>
        </div>
        <div className={`px-3 py-1 rounded-md border text-sm font-medium ${getImpactColor(overallImpact)}`}>
          {overallImpact?.charAt(0)?.toUpperCase() + overallImpact?.slice(1)} Impact
        </div>
      </div>
      <div className="space-y-4">
        {changes?.map((change, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg border border-border"
          >
            <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={getChangeIcon(change?.type)} size={16} className="text-muted-foreground" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium text-foreground">{change?.field}</span>
                <span className={`px-2 py-0.5 text-xs font-medium rounded border ${getImpactColor(change?.impact)}`}>
                  {change?.impact}
                </span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">From:</span>
                  <span className="px-2 py-1 bg-background rounded border border-border font-mono text-xs">
                    {change?.from}
                  </span>
                </div>
                
                <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
                
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">To:</span>
                  <span className="px-2 py-1 bg-primary/10 border border-primary/20 rounded font-mono text-xs text-primary">
                    {change?.to}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Impact Summary */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-start space-x-3">
          <Icon 
            name={overallImpact === 'high' ? 'AlertTriangle' : overallImpact === 'medium' ? 'AlertCircle' : 'CheckCircle'} 
            size={20} 
            className={
              overallImpact === 'high' ? 'text-error' : 
              overallImpact === 'medium'? 'text-warning' : 'text-success'
            }
          />
          <div>
            <h4 className="font-medium text-foreground mb-1">Expected Impact</h4>
            <p className="text-sm text-muted-foreground">
              {overallImpact === 'high' && 
                `These changes may significantly affect monitoring systems and dependent services. Consider scheduling during maintenance windows and notifying stakeholders.`
              }
              {overallImpact === 'medium' && 
                `These changes may affect some monitoring behaviors. Review dependent systems and prepare for potential alert adjustments.`
              }
              {overallImpact === 'low' && 
                `These changes should have minimal impact on existing monitoring and alerting systems.`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeImpactIndicator;