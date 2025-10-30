import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FormActions = ({ 
  onSaveDraft, 
  onCreateSLO, 
  onCancel, 
  isLoading, 
  isDraftSaving, 
  hasUnsavedChanges 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>
            {hasUnsavedChanges 
              ? "You have unsaved changes" :"All changes are saved"
            }
          </span>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading || isDraftSaving}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            variant="secondary"
            onClick={onSaveDraft}
            loading={isDraftSaving}
            disabled={isLoading}
            iconName="Save"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Save Draft
          </Button>

          <Button
            variant="default"
            onClick={onCreateSLO}
            loading={isLoading}
            disabled={isDraftSaving}
            iconName="Plus"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Create SLO
          </Button>
        </div>
      </div>

      <div className="mt-4 p-4 bg-muted rounded-md">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">SLX Framework Compliance</p>
            <p>
              This SLO will be validated against SLX standards before creation. 
              Ensure all required fields are completed and metric queries follow 
              established patterns for optimal monitoring effectiveness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormActions;