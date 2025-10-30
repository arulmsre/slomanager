import React from 'react';
import Icon from '../../../components/AppIcon';

const ValidationSummary = ({ errors, formData }) => {
  const getValidationStatus = () => {
    const requiredFields = [
      'name', 'description', 'service', 'component', 
      'metricSource', 'metricType', 'targetValue', 
      'evaluationWindow', 'metricQuery'
    ];

    const completedFields = requiredFields?.filter(field => 
      formData?.[field] && formData?.[field]?.toString()?.trim() !== ''
    );

    const hasErrors = Object.keys(errors)?.length > 0;
    const isComplete = completedFields?.length === requiredFields?.length;

    return {
      completedFields: completedFields?.length,
      totalFields: requiredFields?.length,
      hasErrors,
      isComplete: isComplete && !hasErrors,
      progress: (completedFields?.length / requiredFields?.length) * 100
    };
  };

  const status = getValidationStatus();

  const getStatusColor = () => {
    if (status?.hasErrors) return 'text-error';
    if (status?.isComplete) return 'text-success';
    return 'text-warning';
  };

  const getStatusIcon = () => {
    if (status?.hasErrors) return 'XCircle';
    if (status?.isComplete) return 'CheckCircle';
    return 'AlertCircle';
  };

  const getStatusMessage = () => {
    if (status?.hasErrors) return 'Please fix validation errors';
    if (status?.isComplete) return 'Ready to create SLO';
    return `${status?.completedFields}/${status?.totalFields} required fields completed`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <h3 className="text-lg font-semibold text-foreground mb-4">Validation Summary</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon 
              name={getStatusIcon()} 
              size={20} 
              className={getStatusColor()}
            />
            <span className="text-sm font-medium text-foreground">
              Form Status
            </span>
          </div>
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusMessage()}
          </span>
        </div>

        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              status?.hasErrors ? 'bg-error' :
              status?.isComplete ? 'bg-success' : 'bg-warning'
            }`}
            style={{ width: `${status?.progress}%` }}
          />
        </div>

        {Object.keys(errors)?.length > 0 && (
          <div className="mt-4 p-4 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-error mb-2">
                  Validation Errors ({Object.keys(errors)?.length})
                </h4>
                <ul className="text-sm text-error space-y-1">
                  {Object.entries(errors)?.map(([field, error]) => (
                    <li key={field} className="flex items-center space-x-2">
                      <Icon name="Dot" size={12} />
                      <span className="capitalize">{field?.replace(/([A-Z])/g, ' $1')}: {error}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {status?.isComplete && (
          <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-md">
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-success mb-1">
                  SLX Compliance Check
                </h4>
                <p className="text-sm text-success">
                  All required fields are completed and validation passed. 
                  This SLO meets SLX framework standards.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidationSummary;