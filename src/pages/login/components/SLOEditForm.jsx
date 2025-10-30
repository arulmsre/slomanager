import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SLOEditForm = ({ sloData, onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: sloData?.name || '',
    description: sloData?.description || '',
    service: sloData?.service || '',
    metricSource: sloData?.metricSource || '',
    targetThreshold: sloData?.targetThreshold || '',
    evaluationWindow: sloData?.evaluationWindow || '',
    alertingEnabled: sloData?.alertingEnabled || false,
    alertThreshold: sloData?.alertThreshold || '',
    notificationChannels: sloData?.notificationChannels || []
  });

  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  const serviceOptions = [
    { value: 'api-gateway', label: 'API Gateway' },
    { value: 'user-service', label: 'User Service' },
    { value: 'payment-service', label: 'Payment Service' },
    { value: 'notification-service', label: 'Notification Service' },
    { value: 'database-cluster', label: 'Database Cluster' },
    { value: 'cdn-service', label: 'CDN Service' }
  ];

  const metricSourceOptions = [
    { value: 'prometheus', label: 'Prometheus' },
    { value: 'datadog', label: 'Datadog' },
    { value: 'new-relic', label: 'New Relic' },
    { value: 'cloudwatch', label: 'AWS CloudWatch' },
    { value: 'grafana', label: 'Grafana' }
  ];

  const evaluationWindowOptions = [
    { value: '1m', label: '1 minute' },
    { value: '5m', label: '5 minutes' },
    { value: '15m', label: '15 minutes' },
    { value: '30m', label: '30 minutes' },
    { value: '1h', label: '1 hour' },
    { value: '24h', label: '24 hours' }
  ];

  const notificationChannelOptions = [
    { value: 'email', label: 'Email' },
    { value: 'slack', label: 'Slack' },
    { value: 'pagerduty', label: 'PagerDuty' },
    { value: 'webhook', label: 'Webhook' },
    { value: 'sms', label: 'SMS' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
    
    // Clear error for this field
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'SLO name is required';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData?.service) {
      newErrors.service = 'Service selection is required';
    }

    if (!formData?.metricSource) {
      newErrors.metricSource = 'Metric source is required';
    }

    if (!formData?.targetThreshold) {
      newErrors.targetThreshold = 'Target threshold is required';
    } else {
      const threshold = parseFloat(formData?.targetThreshold);
      if (isNaN(threshold) || threshold < 0 || threshold > 100) {
        newErrors.targetThreshold = 'Threshold must be between 0 and 100';
      }
    }

    if (!formData?.evaluationWindow) {
      newErrors.evaluationWindow = 'Evaluation window is required';
    }

    if (formData?.alertingEnabled && !formData?.alertThreshold) {
      newErrors.alertThreshold = 'Alert threshold is required when alerting is enabled';
    }

    if (formData?.alertingEnabled && formData?.notificationChannels?.length === 0) {
      newErrors.notificationChannels = 'At least one notification channel is required when alerting is enabled';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleSaveAsNew = () => {
    if (validateForm()) {
      onSave({ ...formData, saveAsNew: true });
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Edit SLO Configuration</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Modify SLO parameters and settings. Changes will be tracked in version history.
          </p>
        </div>
        {hasChanges && (
          <div className="flex items-center space-x-2 text-warning">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm font-medium">Unsaved changes</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input
            label="SLO Name"
            type="text"
            placeholder="Enter SLO name"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            required
          />

          <Select
            label="Associated Service"
            placeholder="Select service"
            options={serviceOptions}
            value={formData?.service}
            onChange={(value) => handleInputChange('service', value)}
            error={errors?.service}
            required
          />
        </div>

        <Input
          label="Description"
          type="text"
          placeholder="Describe the purpose and scope of this SLO"
          value={formData?.description}
          onChange={(e) => handleInputChange('description', e?.target?.value)}
          error={errors?.description}
          required
        />

        {/* Metric Configuration */}
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Metric Configuration</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Select
              label="Metric Source"
              placeholder="Select metric source"
              options={metricSourceOptions}
              value={formData?.metricSource}
              onChange={(value) => handleInputChange('metricSource', value)}
              error={errors?.metricSource}
              required
            />

            <Input
              label="Target Threshold (%)"
              type="number"
              placeholder="99.9"
              value={formData?.targetThreshold}
              onChange={(e) => handleInputChange('targetThreshold', e?.target?.value)}
              error={errors?.targetThreshold}
              min="0"
              max="100"
              step="0.01"
              required
            />

            <Select
              label="Evaluation Window"
              placeholder="Select window"
              options={evaluationWindowOptions}
              value={formData?.evaluationWindow}
              onChange={(value) => handleInputChange('evaluationWindow', value)}
              error={errors?.evaluationWindow}
              required
            />
          </div>
        </div>

        {/* Alerting Configuration */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-foreground">Alerting Configuration</h3>
            <Checkbox
              label="Enable Alerting"
              checked={formData?.alertingEnabled}
              onChange={(e) => handleInputChange('alertingEnabled', e?.target?.checked)}
            />
          </div>

          {formData?.alertingEnabled && (
            <div className="space-y-4 pl-6 border-l-2 border-accent">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Input
                  label="Alert Threshold (%)"
                  type="number"
                  placeholder="99.5"
                  value={formData?.alertThreshold}
                  onChange={(e) => handleInputChange('alertThreshold', e?.target?.value)}
                  error={errors?.alertThreshold}
                  min="0"
                  max="100"
                  step="0.01"
                  description="Threshold below which alerts will be triggered"
                />

                <Select
                  label="Notification Channels"
                  placeholder="Select channels"
                  options={notificationChannelOptions}
                  value={formData?.notificationChannels}
                  onChange={(value) => handleInputChange('notificationChannels', value)}
                  error={errors?.notificationChannels}
                  multiple
                  searchable
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-border space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>Changes will create a new version in the audit trail</span>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={handleSaveAsNew}
              disabled={isLoading || !hasChanges}
              iconName="Copy"
              iconPosition="left"
            >
              Save as New Version
            </Button>

            <Button
              type="submit"
              variant="default"
              loading={isLoading}
              disabled={!hasChanges}
              iconName="Save"
              iconPosition="left"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SLOEditForm;