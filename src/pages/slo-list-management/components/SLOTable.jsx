import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SLOTable = ({ slos, selectedSLOs, onSelectionChange, onBulkAction, filters }) => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedSLOs = () => {
    let sortedSLOs = [...slos];
    
    if (sortConfig?.key) {
      sortedSLOs?.sort((a, b) => {
        if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortedSLOs;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      healthy: { bg: 'bg-success', text: 'text-success-foreground', label: 'Healthy' },
      warning: { bg: 'bg-warning', text: 'text-warning-foreground', label: 'Warning' },
      critical: { bg: 'bg-error', text: 'text-error-foreground', label: 'Critical' },
      unknown: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Unknown' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.unknown;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(slos?.map(slo => slo?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectSLO = (sloId, checked) => {
    if (checked) {
      onSelectionChange([...selectedSLOs, sloId]);
    } else {
      onSelectionChange(selectedSLOs?.filter(id => id !== sloId));
    }
  };

  const sortedSLOs = getSortedSLOs();
  const isAllSelected = slos?.length > 0 && selectedSLOs?.length === slos?.length;
  const isIndeterminate = selectedSLOs?.length > 0 && selectedSLOs?.length < slos?.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden elevation-1">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>SLO Name</span>
                  <Icon 
                    name={sortConfig?.key === 'name' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Description</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">
                <button
                  onClick={() => handleSort('service')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Service</span>
                  <Icon 
                    name={sortConfig?.key === 'service' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">
                <button
                  onClick={() => handleSort('target')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Target</span>
                  <Icon 
                    name={sortConfig?.key === 'target' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Status</span>
                  <Icon 
                    name={sortConfig?.key === 'status' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">
                <button
                  onClick={() => handleSort('lastModified')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Last Modified</span>
                  <Icon 
                    name={sortConfig?.key === 'lastModified' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="w-32 px-4 py-3 text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedSLOs?.map((slo) => (
              <tr key={slo?.id} className="hover:bg-muted/50 transition-smooth">
                <td className="px-4 py-4">
                  <Checkbox
                    checked={selectedSLOs?.includes(slo?.id)}
                    onChange={(e) => handleSelectSLO(slo?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="font-medium text-foreground">{slo?.name}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-muted-foreground max-w-xs truncate" title={slo?.description}>
                    {slo?.description}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-foreground">{slo?.service}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-foreground">{slo?.target}%</div>
                </td>
                <td className="px-4 py-4">
                  {getStatusBadge(slo?.status)}
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-muted-foreground">{slo?.lastModified}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate('/slo-details', { state: { sloId: slo?.id } })}
                      className="h-8 w-8"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate('/edit-slo', { state: { sloId: slo?.id } })}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onBulkAction('duplicate', [slo?.id])}
                      className="h-8 w-8"
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onBulkAction('delete', [slo?.id])}
                      className="h-8 w-8 text-error hover:text-error"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {sortedSLOs?.map((slo) => (
          <div key={slo?.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedSLOs?.includes(slo?.id)}
                  onChange={(e) => handleSelectSLO(slo?.id, e?.target?.checked)}
                />
                <div>
                  <h3 className="font-medium text-foreground">{slo?.name}</h3>
                  <p className="text-sm text-muted-foreground">{slo?.service}</p>
                </div>
              </div>
              {getStatusBadge(slo?.status)}
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm text-muted-foreground">{slo?.description}</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Target:</span>
                <span className="font-medium text-foreground">{slo?.target}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Modified:</span>
                <span className="text-muted-foreground">{slo?.lastModified}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/slo-details', { state: { sloId: slo?.id } })}
                iconName="Eye"
                iconPosition="left"
              >
                View
              </Button>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/edit-slo', { state: { sloId: slo?.id } })}
                  className="h-8 w-8"
                >
                  <Icon name="Edit" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onBulkAction('duplicate', [slo?.id])}
                  className="h-8 w-8"
                >
                  <Icon name="Copy" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onBulkAction('delete', [slo?.id])}
                  className="h-8 w-8 text-error hover:text-error"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {slos?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Target" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No SLOs Found</h3>
          <p className="text-muted-foreground mb-6">
            {filters?.search || filters?.service || filters?.status ? 
              'No SLOs match your current filters. Try adjusting your search criteria.' : 'Get started by creating your first Service Level Objective.'
            }
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/create-new-slo')}
            iconName="Plus"
            iconPosition="left"
          >
            Create New SLO
          </Button>
        </div>
      )}
    </div>
  );
};

export default SLOTable;