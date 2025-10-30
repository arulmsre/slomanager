import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AlertingSection = ({ formData, errors, onChange }) => {
  const alertChannelOptions = [
    { value: 'email', label: 'Email' },
    { value: 'slack', label: 'Slack' },
    { value: 'pagerduty', label: 'PagerDuty' },
    { value: 'webhook', label: 'Webhook' },
    { value: 'teams', label: 'Microsoft Teams' },
    { value: 'discord', label: 'Discord' }
  ];

  const severityOptions = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const escalationOptions = [
    { value: '5m', label: '5 minutes' },
    { value: '15m', label: '15 minutes' },
    { value: '30m', label: '30 minutes' },
    { value: '1h', label: '1 hour' },
    { value: '2h', label: '2 hours' },
    { value: '4h', label: '4 hours' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <h3 className="text-lg font-semibold text-foreground mb-6">Alerting Configuration</h3>
      <div className="space-y-6">
        <Checkbox
          label="Enable Alerting"
          description="Send notifications when SLO thresholds are breached"
          checked={formData?.alertingEnabled}
          onChange={(e) => onChange('alertingEnabled', e?.target?.checked)}
        />

        {formData?.alertingEnabled && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-border">
            <Input
              label="Alert Threshold (%)"
              type="number"
              placeholder="95.0"
              value={formData?.alertThreshold}
              onChange={(e) => onChange('alertThreshold', e?.target?.value)}
              error={errors?.alertThreshold}
              required
              min="0"
              max="100"
              step="0.1"
              description="Trigger alerts when SLO drops below this percentage"
            />

            <Select
              label="Alert Severity"
              placeholder="Select severity level"
              options={severityOptions}
              value={formData?.alertSeverity}
              onChange={(value) => onChange('alertSeverity', value)}
              error={errors?.alertSeverity}
              required
              description="Set the urgency level for SLO breach alerts"
            />

            <Select
              label="Notification Channels"
              placeholder="Select channels"
              options={alertChannelOptions}
              value={formData?.alertChannels}
              onChange={(value) => onChange('alertChannels', value)}
              error={errors?.alertChannels}
              multiple
              searchable
              description="Choose how to receive SLO breach notifications"
            />

            <Select
              label="Escalation Time"
              placeholder="Select escalation period"
              options={escalationOptions}
              value={formData?.escalationTime}
              onChange={(value) => onChange('escalationTime', value)}
              error={errors?.escalationTime}
              description="Time before escalating unresolved alerts"
            />

            <div className="lg:col-span-2">
              <Input
                label="Alert Recipients"
                type="text"
                placeholder="Enter email addresses separated by commas"
                value={formData?.alertRecipients}
                onChange={(e) => onChange('alertRecipients', e?.target?.value)}
                error={errors?.alertRecipients}
                description="Specify who should receive SLO breach notifications"
              />
            </div>

            <div className="lg:col-span-2">
              <Input
                label="Custom Alert Message"
                type="text"
                placeholder="Enter custom message template (optional)"
                value={formData?.customAlertMessage}
                onChange={(e) => onChange('customAlertMessage', e?.target?.value)}
                error={errors?.customAlertMessage}
                description="Customize the alert notification message"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertingSection;