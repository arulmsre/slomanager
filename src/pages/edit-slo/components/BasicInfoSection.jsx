import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BasicInfoSection = ({ formData, errors, onChange }) => {
  const serviceOptions = [
    { value: 'api-gateway', label: 'API Gateway' },
    { value: 'user-service', label: 'User Service' },
    { value: 'payment-service', label: 'Payment Service' },
    { value: 'notification-service', label: 'Notification Service' },
    { value: 'auth-service', label: 'Authentication Service' },
    { value: 'database-cluster', label: 'Database Cluster' },
    { value: 'cdn-service', label: 'CDN Service' },
    { value: 'search-service', label: 'Search Service' }
  ];

  const componentOptions = [
    { value: 'frontend', label: 'Frontend Application' },
    { value: 'backend-api', label: 'Backend API' },
    { value: 'database', label: 'Database' },
    { value: 'cache', label: 'Cache Layer' },
    { value: 'message-queue', label: 'Message Queue' },
    { value: 'load-balancer', label: 'Load Balancer' },
    { value: 'monitoring', label: 'Monitoring System' },
    { value: 'logging', label: 'Logging Service' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <h3 className="text-lg font-semibold text-foreground mb-6">Basic Information</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <Input
            label="SLO Name"
            type="text"
            placeholder="Enter SLO name (e.g., API Response Time)"
            value={formData?.name}
            onChange={(e) => onChange('name', e?.target?.value)}
            error={errors?.name}
            required
            description="Provide a clear, descriptive name for this SLO"
          />
        </div>

        <div className="lg:col-span-2">
          <Input
            label="Description"
            type="text"
            placeholder="Describe the purpose and scope of this SLO"
            value={formData?.description}
            onChange={(e) => onChange('description', e?.target?.value)}
            error={errors?.description}
            required
            description="Explain what this SLO measures and why it's important"
          />
        </div>

        <Select
          label="Associated Service"
          placeholder="Select a service"
          options={serviceOptions}
          value={formData?.service}
          onChange={(value) => onChange('service', value)}
          error={errors?.service}
          required
          searchable
          description="Choose the primary service this SLO monitors"
        />

        <Select
          label="Component"
          placeholder="Select a component"
          options={componentOptions}
          value={formData?.component}
          onChange={(value) => onChange('component', value)}
          error={errors?.component}
          required
          searchable
          description="Specify the component within the service"
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;