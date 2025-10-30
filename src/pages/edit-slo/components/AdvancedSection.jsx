import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AdvancedSection = ({ formData, errors, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const dependencyOptions = [
    { value: 'auth-service', label: 'Authentication Service' },
    { value: 'database-primary', label: 'Primary Database' },
    { value: 'cache-redis', label: 'Redis Cache' },
    { value: 'external-api', label: 'External API' },
    { value: 'cdn-service', label: 'CDN Service' },
    { value: 'message-queue', label: 'Message Queue' }
  ];

  const priorityOptions = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const ownerOptions = [
    { value: 'devops-team', label: 'DevOps Team' },
    { value: 'sre-team', label: 'SRE Team' },
    { value: 'platform-team', label: 'Platform Team' },
    { value: 'backend-team', label: 'Backend Team' },
    { value: 'frontend-team', label: 'Frontend Team' },
    { value: 'infrastructure-team', label: 'Infrastructure Team' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-foreground">Advanced Configuration</h3>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground"
        />
      </div>
      {isExpanded && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Select
              label="SLO Priority"
              placeholder="Select priority level"
              options={priorityOptions}
              value={formData?.priority}
              onChange={(value) => onChange('priority', value)}
              error={errors?.priority}
              description="Set the business importance of this SLO"
            />

            <Select
              label="Owner Team"
              placeholder="Select responsible team"
              options={ownerOptions}
              value={formData?.ownerTeam}
              onChange={(value) => onChange('ownerTeam', value)}
              error={errors?.ownerTeam}
              searchable
              description="Assign ownership and responsibility for this SLO"
            />

            <div className="lg:col-span-2">
              <Select
                label="Dependencies"
                placeholder="Select service dependencies"
                options={dependencyOptions}
                value={formData?.dependencies}
                onChange={(value) => onChange('dependencies', value)}
                error={errors?.dependencies}
                multiple
                searchable
                clearable
                description="Identify services that this SLO depends on"
              />
            </div>

            <Input
              label="Error Budget (%)"
              type="number"
              placeholder="0.1"
              value={formData?.errorBudget}
              onChange={(e) => onChange('errorBudget', e?.target?.value)}
              error={errors?.errorBudget}
              min="0"
              max="100"
              step="0.01"
              description="Acceptable failure rate for this SLO"
            />

            <Input
              label="Burn Rate Threshold"
              type="number"
              placeholder="2.0"
              value={formData?.burnRateThreshold}
              onChange={(e) => onChange('burnRateThreshold', e?.target?.value)}
              error={errors?.burnRateThreshold}
              min="0"
              step="0.1"
              description="Rate at which error budget is consumed"
            />

            <div className="lg:col-span-2">
              <Input
                label="Tags"
                type="text"
                placeholder="Enter tags separated by commas (e.g., production, api, critical)"
                value={formData?.tags}
                onChange={(e) => onChange('tags', e?.target?.value)}
                error={errors?.tags}
                description="Add tags for categorization and filtering"
              />
            </div>

            <div className="lg:col-span-2">
              <Input
                label="Documentation URL"
                type="url"
                placeholder="https://docs.company.com/slo/api-gateway"
                value={formData?.documentationUrl}
                onChange={(e) => onChange('documentationUrl', e?.target?.value)}
                error={errors?.documentationUrl}
                description="Link to detailed documentation for this SLO"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="text-md font-medium text-foreground">Additional Options</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Checkbox
                label="Enable Version Control"
                description="Track changes and maintain audit trail"
                checked={formData?.versionControlEnabled}
                onChange={(e) => onChange('versionControlEnabled', e?.target?.checked)}
              />

              <Checkbox
                label="Auto-remediation"
                description="Enable automatic corrective actions"
                checked={formData?.autoRemediationEnabled}
                onChange={(e) => onChange('autoRemediationEnabled', e?.target?.checked)}
              />

              <Checkbox
                label="Maintenance Mode"
                description="Allow temporary SLO suspension during maintenance"
                checked={formData?.maintenanceModeEnabled}
                onChange={(e) => onChange('maintenanceModeEnabled', e?.target?.checked)}
              />

              <Checkbox
                label="Historical Analysis"
                description="Enable long-term trend analysis and reporting"
                checked={formData?.historicalAnalysisEnabled}
                onChange={(e) => onChange('historicalAnalysisEnabled', e?.target?.checked)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSection;