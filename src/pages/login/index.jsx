import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SLOEditForm from './components/SLOEditForm';
import VersionHistory from './components/VersionHistory';
import DependencyChecker from './components/DependencyChecker';
import ChangeImpactIndicator from './components/ChangeImpactIndicator';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const EditSLO = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sloId = searchParams?.get('id') || 'slo-api-gateway-001';
  
  const [sloData, setSloData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [currentFormData, setCurrentFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(null);

  // Mock SLO data
  const mockSLOData = {
    id: 'slo-api-gateway-001',
    name: 'API Gateway Availability SLO',
    description: 'Ensures API Gateway maintains high availability for critical user-facing operations with 99.9% uptime target',
    service: 'api-gateway',
    metricSource: 'prometheus',
    targetThreshold: '99.9',
    evaluationWindow: '15m',
    alertingEnabled: true,
    alertThreshold: '99.5',
    notificationChannels: ['email', 'slack', 'pagerduty'],
    status: 'healthy',
    createdAt: new Date('2024-10-15T11:00:00'),
    updatedAt: new Date('2024-10-29T10:30:00'),
    version: '1.4'
  };

  useEffect(() => {
    // Simulate loading SLO data
    setIsLoading(true);
    setTimeout(() => {
      setSloData(mockSLOData);
      setOriginalData(mockSLOData);
      setCurrentFormData(mockSLOData);
      setIsLoading(false);
    }, 1000);
  }, [sloId]);

  const handleFormDataChange = (newFormData) => {
    setCurrentFormData(newFormData);
  };

  const handleSave = async (formData) => {
    setPendingChanges(formData);
    setShowConfirmDialog(true);
  };

  const confirmSave = async () => {
    setIsSaving(true);
    setShowConfirmDialog(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update the data
      const updatedData = {
        ...pendingChanges,
        updatedAt: new Date(),
        version: pendingChanges?.saveAsNew ? '1.5' : '1.4.1'
      };
      
      setSloData(updatedData);
      setOriginalData(updatedData);
      setCurrentFormData(updatedData);
      
      // Navigate back to SLO list or details
      navigate('/slo-list-management');
    } catch (error) {
      console.error('Error saving SLO:', error);
    } finally {
      setIsSaving(false);
      setPendingChanges(null);
    }
  };

  const handleCancel = () => {
    if (currentFormData && JSON.stringify(currentFormData) !== JSON.stringify(originalData)) {
      if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        navigate('/slo-list-management');
      }
    } else {
      navigate('/slo-list-management');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center space-x-3">
                <Icon name="Loader2" size={24} className="animate-spin text-primary" />
                <span className="text-lg text-muted-foreground">Loading SLO data...</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Edit SLO</h1>
              <p className="text-muted-foreground">
                Modify configuration for <span className="font-medium text-foreground">{sloData?.name}</span>
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                onClick={() => navigate('/slo-details?id=' + sloId)}
                iconName="Eye"
                iconPosition="left"
              >
                View Details
              </Button>
              <Button
                variant="ghost"
                onClick={handleCancel}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="xl:col-span-2 space-y-8">
              <SLOEditForm
                sloData={sloData}
                onSave={handleSave}
                onCancel={handleCancel}
                isLoading={isSaving}
                onFormDataChange={handleFormDataChange}
              />
              
              {/* Change Impact Indicator */}
              {currentFormData && originalData && (
                <ChangeImpactIndicator
                  originalData={originalData}
                  currentData={currentFormData}
                />
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              <DependencyChecker
                sloId={sloId}
                formData={currentFormData}
              />
              
              <VersionHistory sloId={sloId} />
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full">
            <div className="flex items-start space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-warning flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Confirm SLO Changes
                </h3>
                <p className="text-sm text-muted-foreground">
                  {pendingChanges?.saveAsNew 
                    ? 'This will create a new version of the SLO with your changes.' :'This will update the current SLO configuration.'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={confirmSave}
                loading={isSaving}
                iconName="Save"
                iconPosition="left"
              >
                {pendingChanges?.saveAsNew ? 'Create New Version' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditSLO;