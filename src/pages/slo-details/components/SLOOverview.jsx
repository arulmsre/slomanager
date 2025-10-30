import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SLOOverview = ({ slo, onEdit, onDuplicate, onDelete, userRole }) => {
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
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        {/* SLO Information */}
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-foreground mb-2">{slo?.name}</h1>
              <p className="text-muted-foreground mb-4">{slo?.description}</p>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(slo?.status)}`}>
                  <Icon name={getStatusIcon(slo?.status)} size={16} />
                  <span className="capitalize">{slo?.status}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Target" size={16} />
                  <span>Target: {slo?.targetThreshold}%</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span>Window: {slo?.evaluationWindow}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Performance */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Current Performance</span>
              </div>
              <div className="text-2xl font-semibold text-foreground">{slo?.currentPerformance}%</div>
              <div className={`text-sm ${slo?.performanceTrend === 'up' ? 'text-success' : 'text-error'}`}>
                {slo?.performanceTrend === 'up' ? '+' : ''}{slo?.performanceChange}% from last period
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="AlertCircle" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Error Budget</span>
              </div>
              <div className="text-2xl font-semibold text-foreground">{slo?.errorBudget}%</div>
              <div className="text-sm text-muted-foreground">
                {slo?.errorBudgetRemaining} remaining
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Last Violation</span>
              </div>
              <div className="text-2xl font-semibold text-foreground">{slo?.lastViolation}</div>
              <div className="text-sm text-muted-foreground">
                Duration: {slo?.violationDuration}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 min-w-[200px]">
          {(userRole === 'admin' || userRole === 'editor') && (
            <Button
              variant="default"
              iconName="Edit"
              iconPosition="left"
              onClick={onEdit}
              className="w-full"
            >
              Edit SLO
            </Button>
          )}
          
          <Button
            variant="outline"
            iconName="Copy"
            iconPosition="left"
            onClick={onDuplicate}
            className="w-full"
          >
            Duplicate
          </Button>
          
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            className="w-full"
          >
            Export Data
          </Button>
          
          {userRole === 'admin' && (
            <Button
              variant="destructive"
              iconName="Trash2"
              iconPosition="left"
              onClick={onDelete}
              className="w-full"
            >
              Delete SLO
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SLOOverview;