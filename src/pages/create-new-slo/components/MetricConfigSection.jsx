import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const MetricConfigSection = ({ formData, errors, onChange }) => {
  const metricSourceOptions = [
    { 
      value: 'prometheus', 
      label: 'Prometheus',
      description: 'Time-series monitoring system'
    },
    { 
      value: 'datadog', 
      label: 'Datadog',
      description: 'Cloud monitoring platform'
    },
    { 
      value: 'new-relic', 
      label: 'New Relic',
      description: 'Application performance monitoring'
    },
    { 
      value: 'grafana', 
      label: 'Grafana',
      description: 'Analytics and monitoring solution'
    },
    { 
      value: 'cloudwatch', 
      label: 'AWS CloudWatch',
      description: 'Amazon Web Services monitoring'
    },
    { 
      value: 'azure-monitor', 
      label: 'Azure Monitor',
      description: 'Microsoft Azure monitoring service'
    }
  ];

  const metricTypeOptions = [
    { value: 'availability', label: 'Availability' },
    { value: 'latency', label: 'Latency' },
    { value: 'error-rate', label: 'Error Rate' },
    { value: 'throughput', label: 'Throughput' },
    { value: 'saturation', label: 'Saturation' },
    { value: 'custom', label: 'Custom Metric' }
  ];

  const evaluationWindowOptions = [
    { value: '1m', label: '1 minute' },
    { value: '5m', label: '5 minutes' },
    { value: '15m', label: '15 minutes' },
    { value: '30m', label: '30 minutes' },
    { value: '1h', label: '1 hour' },
    { value: '4h', label: '4 hours' },
    { value: '24h', label: '24 hours' },
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' }
  ];

  const getConnectionStatus = (source) => {
    const statusMap = {
      'prometheus': 'connected',
      'datadog': 'connected',
      'new-relic': 'warning',
      'grafana': 'connected',
      'cloudwatch': 'disconnected',
      'azure-monitor': 'connected'
    };
    return statusMap?.[source] || 'unknown';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'disconnected': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'disconnected': return 'XCircle';
      default: return 'HelpCircle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <h3 className="text-lg font-semibold text-foreground mb-6">Metric Configuration</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Select
            label="Metric Source"
            placeholder="Select metric source"
            options={metricSourceOptions}
            value={formData?.metricSource}
            onChange={(value) => onChange('metricSource', value)}
            error={errors?.metricSource}
            required
            searchable
            description="Choose the monitoring system that provides the metric data"
          />
          
          {formData?.metricSource && (
            <div className="mt-3 p-3 bg-muted rounded-md">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(getConnectionStatus(formData?.metricSource))} 
                  size={16} 
                  className={getStatusColor(getConnectionStatus(formData?.metricSource))}
                />
                <span className="text-sm font-medium">Connection Status:</span>
                <span className={`text-sm capitalize ${getStatusColor(getConnectionStatus(formData?.metricSource))}`}>
                  {getConnectionStatus(formData?.metricSource)}
                </span>
              </div>
            </div>
          )}
        </div>

        <Select
          label="Metric Type"
          placeholder="Select metric type"
          options={metricTypeOptions}
          value={formData?.metricType}
          onChange={(value) => onChange('metricType', value)}
          error={errors?.metricType}
          required
          description="Define what aspect of service performance to measure"
        />

        <Input
          label="Target Value (%)"
          type="number"
          placeholder="99.9"
          value={formData?.targetValue}
          onChange={(e) => onChange('targetValue', e?.target?.value)}
          error={errors?.targetValue}
          required
          min="0"
          max="100"
          step="0.01"
          description="Set the target percentage for this SLO (0-100%)"
        />

        <Select
          label="Evaluation Window"
          placeholder="Select evaluation period"
          options={evaluationWindowOptions}
          value={formData?.evaluationWindow}
          onChange={(value) => onChange('evaluationWindow', value)}
          error={errors?.evaluationWindow}
          required
          description="Time period over which the SLO is evaluated"
        />

        <div className="lg:col-span-2">
          <Input
            label="Metric Query"
            type="text"
            placeholder="Enter the metric query (e.g., rate(http_requests_total[5m]))"
            value={formData?.metricQuery}
            onChange={(e) => onChange('metricQuery', e?.target?.value)}
            error={errors?.metricQuery}
            required
            description="Provide the query string to retrieve metric data from the source"
          />
        </div>
      </div>
    </div>
  );
};

export default MetricConfigSection;