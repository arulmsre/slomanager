import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');

  const actionOptions = [
    { value: '', label: 'Choose action...' },
    { value: 'export', label: 'Export Selected' },
    { value: 'duplicate', label: 'Duplicate Selected' },
    { value: 'enable', label: 'Enable Monitoring' },
    { value: 'disable', label: 'Disable Monitoring' },
    { value: 'delete', label: 'Delete Selected' }
  ];

  const handleActionExecute = () => {
    if (selectedAction) {
      onBulkAction(selectedAction);
      setSelectedAction('');
    }
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-card border border-border rounded-lg shadow-lg px-6 py-4 elevation-3">
        <div className="flex items-center space-x-4">
          {/* Selection Info */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} color="white" />
            </div>
            <span className="text-sm font-medium text-foreground">
              {selectedCount} SLO{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>

          {/* Action Selector */}
          <div className="flex items-center space-x-2">
            <Select
              options={actionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Choose action..."
              className="w-48"
            />
            
            <Button
              variant="default"
              size="sm"
              onClick={handleActionExecute}
              disabled={!selectedAction}
              iconName="Play"
              iconPosition="left"
            >
              Execute
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2 border-l border-border pl-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('export')}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('duplicate')}
              iconName="Copy"
              iconPosition="left"
            >
              Duplicate
            </Button>
          </div>

          {/* Clear Selection */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
          >
            Clear
          </Button>
        </div>

        {/* Mobile Quick Actions */}
        <div className="md:hidden mt-3 pt-3 border-t border-border flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction('export')}
            iconName="Download"
            iconPosition="left"
            className="flex-1"
          >
            Export
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction('duplicate')}
            iconName="Copy"
            iconPosition="left"
            className="flex-1"
          >
            Duplicate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionBar;