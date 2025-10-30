import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfigurationPanel = ({ slo, userRole }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const configSections = [
    {
      title: 'Basic Configuration',
      icon: 'Settings',
      items: [
        { label: 'SLO Type', value: slo?.type },
        { label: 'Metric Source', value: slo?.metricSource },
        { label: 'Target Threshold', value: `${slo?.targetThreshold}%` },
        { label: 'Evaluation Window', value: slo?.evaluationWindow }
      ]
    },
    {
      title: 'Alerting Rules',
      icon: 'Bell',
      items: [
        { label: 'Alert Threshold', value: slo?.alertThreshold },
        { label: 'Notification Channel', value: slo?.notificationChannel },
        { label: 'Escalation Policy', value: slo?.escalationPolicy },
        { label: 'Alert Frequency', value: slo?.alertFrequency }
      ]
    },
    {
      title: 'Associated Services',
      icon: 'Server',
      items: [
        { label: 'Primary Service', value: slo?.primaryService },
        { label: 'Dependencies', value: slo?.dependencies?.join(', ') },
        { label: 'Environment', value: slo?.environment },
        { label: 'Region', value: slo?.region }
      ]
    },
    {
      title: 'Evaluation Parameters',
      icon: 'Calculator',
      items: [
        { label: 'Calculation Method', value: slo?.calculationMethod },
        { label: 'Data Retention', value: slo?.dataRetention },
        { label: 'Sampling Rate', value: slo?.samplingRate },
        { label: 'Aggregation Period', value: slo?.aggregationPeriod }
      ]
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg elevation-1">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Icon name="Settings" size={20} className="text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Configuration</h2>
        </div>
        <div className="flex items-center gap-2">
          {(userRole === 'admin' || userRole === 'editor') && (
            <Button variant="outline" size="sm" iconName="Edit" iconPosition="left">
              Edit Config
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-6 space-y-6">
          {configSections?.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Icon name={section?.icon} size={16} className="text-muted-foreground" />
                <h3 className="font-medium text-foreground">{section?.title}</h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {section?.items?.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-muted/30 rounded-lg p-3">
                    <div className="text-sm text-muted-foreground mb-1">{item?.label}</div>
                    <div className="text-sm font-medium text-foreground">{item?.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Version Information */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="GitBranch" size={16} className="text-muted-foreground" />
              <h3 className="font-medium text-foreground">Version Information</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="text-sm text-muted-foreground mb-1">Current Version</div>
                <div className="text-sm font-medium text-foreground">{slo?.version}</div>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="text-sm text-muted-foreground mb-1">Last Modified</div>
                <div className="text-sm font-medium text-foreground">{slo?.lastModified}</div>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="text-sm text-muted-foreground mb-1">Modified By</div>
                <div className="text-sm font-medium text-foreground">{slo?.modifiedBy}</div>
              </div>
            </div>
          </div>

          {/* Compliance Status */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Shield" size={16} className="text-muted-foreground" />
              <h3 className="font-medium text-foreground">Compliance Status</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {slo?.complianceStatus?.map((status, index) => (
                <div
                  key={index}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    status?.status === 'compliant' ?'text-success bg-success/10' 
                      : status?.status === 'warning' ?'text-warning bg-warning/10' :'text-error bg-error/10'
                  }`}
                >
                  <Icon 
                    name={
                      status?.status === 'compliant' ? 'CheckCircle' : 
                      status?.status === 'warning' ? 'AlertTriangle' : 'XCircle'
                    } 
                    size={14} 
                  />
                  <span>{status?.framework}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigurationPanel;