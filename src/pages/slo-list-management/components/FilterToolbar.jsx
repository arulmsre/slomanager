import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterToolbar = ({ filters, onFilterChange, resultsCount, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const serviceOptions = [
    { value: '', label: 'All Services' },
    { value: 'api-gateway', label: 'API Gateway' },
    { value: 'user-service', label: 'User Service' },
    { value: 'payment-service', label: 'Payment Service' },
    { value: 'notification-service', label: 'Notification Service' },
    { value: 'database', label: 'Database' },
    { value: 'cache-service', label: 'Cache Service' },
    { value: 'auth-service', label: 'Authentication Service' },
    { value: 'file-storage', label: 'File Storage' }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'healthy', label: 'Healthy' },
    { value: 'warning', label: 'Warning' },
    { value: 'critical', label: 'Critical' },
    { value: 'unknown', label: 'Unknown' }
  ];

  const handleSearchChange = (e) => {
    onFilterChange({ ...filters, search: e?.target?.value });
  };

  const handleServiceChange = (value) => {
    onFilterChange({ ...filters, service: value });
  };

  const handleStatusChange = (value) => {
    onFilterChange({ ...filters, status: value });
  };

  const handleThresholdMinChange = (e) => {
    const value = parseFloat(e?.target?.value) || 0;
    onFilterChange({ ...filters, thresholdMin: value });
  };

  const handleThresholdMaxChange = (e) => {
    const value = parseFloat(e?.target?.value) || 100;
    onFilterChange({ ...filters, thresholdMax: value });
  };

  const hasActiveFilters = filters?.search || filters?.service || filters?.status || 
                          filters?.thresholdMin > 0 || filters?.thresholdMax < 100;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 elevation-1">
      {/* Main Filter Row */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 lg:max-w-md">
          <Input
            type="search"
            placeholder="Search SLOs by name or description..."
            value={filters?.search}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>

        {/* Quick Filters - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <Select
            options={serviceOptions}
            value={filters?.service}
            onChange={handleServiceChange}
            placeholder="Filter by service"
            className="w-48"
          />
          
          <Select
            options={statusOptions}
            value={filters?.status}
            onChange={handleStatusChange}
            placeholder="Filter by status"
            className="w-40"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            className="lg:hidden"
          >
            Filters
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName="SlidersHorizontal"
            iconPosition="left"
            className="hidden lg:flex"
          >
            Advanced
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Mobile Quick Filters */}
      <div className="lg:hidden mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          options={serviceOptions}
          value={filters?.service}
          onChange={handleServiceChange}
          placeholder="Filter by service"
        />
        
        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={handleStatusChange}
          placeholder="Filter by status"
        />
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-4">Advanced Filters</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Threshold Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Target Threshold Range</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min %"
                  value={filters?.thresholdMin}
                  onChange={handleThresholdMinChange}
                  min="0"
                  max="100"
                  step="0.1"
                  className="flex-1"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="number"
                  placeholder="Max %"
                  value={filters?.thresholdMax}
                  onChange={handleThresholdMaxChange}
                  min="0"
                  max="100"
                  step="0.1"
                  className="flex-1"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Last Modified</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="date"
                  value={filters?.dateFrom || ''}
                  onChange={(e) => onFilterChange({ ...filters, dateFrom: e?.target?.value })}
                  className="flex-1"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="date"
                  value={filters?.dateTo || ''}
                  onChange={(e) => onFilterChange({ ...filters, dateTo: e?.target?.value })}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Owner Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Owner</label>
              <Input
                type="text"
                placeholder="Filter by owner..."
                value={filters?.owner || ''}
                onChange={(e) => onFilterChange({ ...filters, owner: e?.target?.value })}
              />
            </div>
          </div>
        </div>
      )}
      {/* Results Count */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {resultsCount > 0 ? (
            <>
              Showing <span className="font-medium text-foreground">{resultsCount}</span> SLO{resultsCount !== 1 ? 's' : ''}
              {hasActiveFilters && ' matching your filters'}
            </>
          ) : (
            'No SLOs found'
          )}
        </div>

        {hasActiveFilters && (
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Filter" size={14} className="text-primary" />
            <span className="text-muted-foreground">Filters active</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterToolbar;