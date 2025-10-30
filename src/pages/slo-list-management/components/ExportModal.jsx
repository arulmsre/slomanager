import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const ExportModal = ({ isOpen, onClose, onExport, selectedCount }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [includeFields, setIncludeFields] = useState({
    name: true,
    description: true,
    service: true,
    target: true,
    status: true,
    lastModified: true,
    owner: false,
    tags: false,
    metrics: false
  });

  if (!isOpen) return null;

  const formatOptions = [
    { value: 'csv', label: 'CSV (Comma Separated Values)' },
    { value: 'json', label: 'JSON (JavaScript Object Notation)' },
    { value: 'xlsx', label: 'Excel Spreadsheet (.xlsx)' },
    { value: 'pdf', label: 'PDF Report' }
  ];

  const handleFieldToggle = (field) => {
    setIncludeFields(prev => ({
      ...prev,
      [field]: !prev?.[field]
    }));
  };

  const handleExport = () => {
    const selectedFields = Object.keys(includeFields)?.filter(field => includeFields?.[field]);
    onExport({
      format: exportFormat,
      fields: selectedFields
    });
    onClose();
  };

  const selectedFieldsCount = Object.values(includeFields)?.filter(Boolean)?.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-lg max-w-lg w-full mx-4 elevation-3">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Download" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Export SLOs</h3>
                <p className="text-sm text-muted-foreground">
                  Exporting {selectedCount} SLO{selectedCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
          
          {/* Export Format */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Export Format
            </label>
            <Select
              options={formatOptions}
              value={exportFormat}
              onChange={setExportFormat}
              className="w-full"
            />
          </div>

          {/* Fields Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-foreground">
                Include Fields ({selectedFieldsCount} selected)
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const allSelected = selectedFieldsCount === Object.keys(includeFields)?.length;
                  const newState = {};
                  Object.keys(includeFields)?.forEach(field => {
                    newState[field] = !allSelected;
                  });
                  setIncludeFields(newState);
                }}
              >
                {selectedFieldsCount === Object.keys(includeFields)?.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
              {Object.entries(includeFields)?.map(([field, checked]) => (
                <Checkbox
                  key={field}
                  label={field?.charAt(0)?.toUpperCase() + field?.slice(1)?.replace(/([A-Z])/g, ' $1')}
                  checked={checked}
                  onChange={() => handleFieldToggle(field)}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="mb-6 p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Eye" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Export Preview</span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Format: {formatOptions?.find(f => f?.value === exportFormat)?.label}</div>
              <div>Records: {selectedCount} SLO{selectedCount !== 1 ? 's' : ''}</div>
              <div>Fields: {selectedFieldsCount} columns</div>
              <div>Estimated size: ~{Math.ceil(selectedCount * selectedFieldsCount * 0.1)}KB</div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleExport}
              disabled={selectedFieldsCount === 0}
              iconName="Download"
              iconPosition="left"
            >
              Export Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;