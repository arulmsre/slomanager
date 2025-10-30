import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';

import Button from '../../components/ui/Button';
import SLOTable from './components/SLOTable';
import FilterToolbar from './components/FilterToolbar';
import BulkActionBar from './components/BulkActionBar';
import ConfirmationModal from './components/ConfirmationModal';
import ExportModal from './components/ExportModal';

const SLOListManagement = () => {
  const navigate = useNavigate();
  
  // Mock SLO data
  const mockSLOs = [
    {
      id: 'slo-001',
      name: 'API Gateway Availability',
      description: 'Ensures API Gateway maintains 99.9% uptime for all incoming requests with proper error handling and response times under 200ms',
      service: 'API Gateway',
      target: 99.9,
      status: 'healthy',
      lastModified: '10/28/2025',
      owner: 'DevOps Team',
      tags: ['critical', 'gateway'],
      currentValue: 99.95
    },
    {
      id: 'slo-002',
      name: 'User Service Response Time',
      description: 'User authentication and profile management service must respond within 150ms for 95% of requests during peak hours',
      service: 'User Service',
      target: 95.0,
      status: 'warning',
      lastModified: '10/27/2025',
      owner: 'Backend Team',
      tags: ['performance', 'user'],
      currentValue: 94.2
    },
    {
      id: 'slo-003',
      name: 'Payment Processing Success Rate',
      description: 'Payment transactions must complete successfully 99.95% of the time with proper fraud detection and validation',
      service: 'Payment Service',
      target: 99.95,
      status: 'critical',
      lastModified: '10/29/2025',
      owner: 'Payment Team',
      tags: ['critical', 'payment'],
      currentValue: 98.8
    },
    {
      id: 'slo-004',
      name: 'Database Query Performance',
      description: 'Database queries must execute within 100ms for 90% of read operations and 500ms for write operations',
      service: 'Database',
      target: 90.0,
      status: 'healthy',
      lastModified: '10/26/2025',
      owner: 'DBA Team',
      tags: ['database', 'performance'],
      currentValue: 92.1
    },
    {
      id: 'slo-005',
      name: 'Notification Delivery Rate',
      description: 'Push notifications and email alerts must be delivered within 30 seconds for 98% of all notification requests',
      service: 'Notification Service',
      target: 98.0,
      status: 'healthy',
      lastModified: '10/25/2025',
      owner: 'Platform Team',
      tags: ['notification', 'delivery'],
      currentValue: 98.7
    },
    {
      id: 'slo-006',
      name: 'Cache Hit Rate',
      description: 'Redis cache must maintain 85% hit rate for frequently accessed data to ensure optimal application performance',
      service: 'Cache Service',
      target: 85.0,
      status: 'warning',
      lastModified: '10/24/2025',
      owner: 'Infrastructure Team',
      tags: ['cache', 'performance'],
      currentValue: 83.4
    },
    {
      id: 'slo-007',
      name: 'Authentication Service Uptime',
      description: 'OAuth and SSO authentication services must maintain 99.99% availability with zero data breaches',
      service: 'Auth Service',
      target: 99.99,
      status: 'healthy',
      lastModified: '10/23/2025',
      owner: 'Security Team',
      tags: ['critical', 'security'],
      currentValue: 99.99
    },
    {
      id: 'slo-008',
      name: 'File Upload Success Rate',
      description: 'File upload operations must complete successfully 99% of the time with proper virus scanning and validation',
      service: 'File Storage',
      target: 99.0,
      status: 'unknown',
      lastModified: '10/22/2025',
      owner: 'Storage Team',
      tags: ['storage', 'upload'],
      currentValue: null
    }
  ];

  // State management
  const [slos, setSlos] = useState(mockSLOs);
  const [selectedSLOs, setSelectedSLOs] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    service: '',
    status: '',
    thresholdMin: 0,
    thresholdMax: 100,
    dateFrom: '',
    dateTo: '',
    owner: ''
  });

  // Modal states
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: 'default',
    title: '',
    message: '',
    action: null,
    data: null
  });
  const [exportModal, setExportModal] = useState({
    isOpen: false
  });

  // Filter SLOs based on current filters
  const filteredSLOs = useMemo(() => {
    return slos?.filter(slo => {
      // Search filter
      if (filters?.search) {
        const searchTerm = filters?.search?.toLowerCase();
        if (!slo?.name?.toLowerCase()?.includes(searchTerm) && 
            !slo?.description?.toLowerCase()?.includes(searchTerm)) {
          return false;
        }
      }

      // Service filter
      if (filters?.service && slo?.service !== filters?.service) {
        return false;
      }

      // Status filter
      if (filters?.status && slo?.status !== filters?.status) {
        return false;
      }

      // Threshold range filter
      if (slo?.target < filters?.thresholdMin || slo?.target > filters?.thresholdMax) {
        return false;
      }

      // Owner filter
      if (filters?.owner && !slo?.owner?.toLowerCase()?.includes(filters?.owner?.toLowerCase())) {
        return false;
      }

      // Date filters (simplified for demo)
      if (filters?.dateFrom || filters?.dateTo) {
        // In a real app, you'd parse and compare dates properly
        return true;
      }

      return true;
    });
  }, [slos, filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setSelectedSLOs([]); // Clear selection when filters change
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      search: '',
      service: '',
      status: '',
      thresholdMin: 0,
      thresholdMax: 100,
      dateFrom: '',
      dateTo: '',
      owner: ''
    });
    setSelectedSLOs([]);
  };

  // Handle bulk actions
  const handleBulkAction = (action, sloIds = selectedSLOs) => {
    switch (action) {
      case 'export':
        setExportModal({ isOpen: true });
        break;
      
      case 'duplicate':
        setConfirmModal({
          isOpen: true,
          type: 'default',
          title: 'Duplicate SLOs',
          message: `Are you sure you want to duplicate ${sloIds?.length} SLO${sloIds?.length !== 1 ? 's' : ''}? This will create new SLOs with "_copy" suffix.`,
          action: () => executeDuplicate(sloIds),
          data: sloIds
        });
        break;
      
      case 'delete':
        setConfirmModal({
          isOpen: true,
          type: 'delete',
          title: 'Delete SLOs',
          message: `Are you sure you want to delete ${sloIds?.length} SLO${sloIds?.length !== 1 ? 's' : ''}? This action cannot be undone and will remove all associated monitoring and alerts.`,
          action: () => executeDelete(sloIds),
          data: sloIds,
          confirmText: 'Delete SLOs',
          cancelText: 'Cancel'
        });
        break;
      
      case 'enable': case'disable':
        const actionText = action === 'enable' ? 'Enable' : 'Disable';
        setConfirmModal({
          isOpen: true,
          type: 'warning',
          title: `${actionText} Monitoring`,
          message: `Are you sure you want to ${action} monitoring for ${sloIds?.length} SLO${sloIds?.length !== 1 ? 's' : ''}? This will ${action === 'enable' ? 'start' : 'stop'} all alerts and notifications.`,
          action: () => executeStatusChange(sloIds, action),
          data: sloIds,
          confirmText: `${actionText} Monitoring`
        });
        break;
      
      default:
        console.log(`Unknown action: ${action}`);
    }
  };

  // Execute duplicate action
  const executeDuplicate = (sloIds) => {
    const newSLOs = sloIds?.map(id => {
      const originalSLO = slos?.find(slo => slo?.id === id);
      return {
        ...originalSLO,
        id: `${originalSLO?.id}-copy-${Date.now()}`,
        name: `${originalSLO?.name} (Copy)`,
        lastModified: new Date()?.toLocaleDateString('en-US', { 
          month: '2-digit', 
          day: '2-digit', 
          year: 'numeric' 
        })
      };
    });
    
    setSlos(prev => [...prev, ...newSLOs]);
    setSelectedSLOs([]);
    setConfirmModal({ isOpen: false });
  };

  // Execute delete action
  const executeDelete = (sloIds) => {
    setSlos(prev => prev?.filter(slo => !sloIds?.includes(slo?.id)));
    setSelectedSLOs([]);
    setConfirmModal({ isOpen: false });
  };

  // Execute status change action
  const executeStatusChange = (sloIds, action) => {
    setSlos(prev => prev?.map(slo => {
      if (sloIds?.includes(slo?.id)) {
        return {
          ...slo,
          monitoringEnabled: action === 'enable',
          lastModified: new Date()?.toLocaleDateString('en-US', { 
            month: '2-digit', 
            day: '2-digit', 
            year: 'numeric' 
          })
        };
      }
      return slo;
    }));
    setSelectedSLOs([]);
    setConfirmModal({ isOpen: false });
  };

  // Handle export
  const handleExport = (exportConfig) => {
    const selectedSLOsData = slos?.filter(slo => selectedSLOs?.includes(slo?.id));
    
    // In a real app, you would generate and download the file
    console.log('Exporting SLOs:', {
      data: selectedSLOsData,
      format: exportConfig?.format,
      fields: exportConfig?.fields
    });
    
    // Simulate download
    const filename = `slos_export_${new Date()?.toISOString()?.split('T')?.[0]}.${exportConfig?.format}`;
    console.log(`Downloaded: ${filename}`);
    
    setSelectedSLOs([]);
    setExportModal({ isOpen: false });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <Breadcrumb />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-2">
                  Service Level Objectives
                </h1>
                <p className="text-muted-foreground">
                  Monitor and manage your service reliability targets across all systems
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => window.location?.reload()}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Refresh
                </Button>
                
                <Button
                  variant="default"
                  onClick={() => navigate('/create-new-slo')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add New SLO
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Toolbar */}
          <FilterToolbar
            filters={filters}
            onFilterChange={handleFilterChange}
            resultsCount={filteredSLOs?.length}
            onClearFilters={handleClearFilters}
          />

          {/* SLO Table */}
          <SLOTable
            slos={filteredSLOs}
            selectedSLOs={selectedSLOs}
            onSelectionChange={setSelectedSLOs}
            onBulkAction={handleBulkAction}
            filters={filters}
          />

          {/* Bulk Action Bar */}
          <BulkActionBar
            selectedCount={selectedSLOs?.length}
            onBulkAction={handleBulkAction}
            onClearSelection={() => setSelectedSLOs([])}
          />
        </div>
      </main>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal?.isOpen}
        onClose={() => setConfirmModal({ isOpen: false })}
        onConfirm={confirmModal?.action}
        title={confirmModal?.title}
        message={confirmModal?.message}
        type={confirmModal?.type}
        confirmText={confirmModal?.confirmText}
        cancelText={confirmModal?.cancelText}
      />
      {/* Export Modal */}
      <ExportModal
        isOpen={exportModal?.isOpen}
        onClose={() => setExportModal({ isOpen: false })}
        onExport={handleExport}
        selectedCount={selectedSLOs?.length}
      />
    </div>
  );
};

export default SLOListManagement;