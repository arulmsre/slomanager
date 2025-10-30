import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import BasicInfoSection from './components/BasicInfoSection';
import MetricConfigSection from './components/MetricConfigSection';
import AlertingSection from './components/AlertingSection';
import AdvancedSection from './components/AdvancedSection';
import FormActions from './components/FormActions';
import ValidationSummary from './components/ValidationSummary';
import Icon from '../../components/AppIcon';

const CreateNewSLO = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    description: '',
    service: '',
    component: '',
    
    // Metric Configuration
    metricSource: '',
    metricType: '',
    targetValue: '',
    evaluationWindow: '',
    metricQuery: '',
    
    // Alerting Configuration
    alertingEnabled: false,
    alertThreshold: '',
    alertSeverity: '',
    alertChannels: [],
    escalationTime: '',
    alertRecipients: '',
    customAlertMessage: '',
    
    // Advanced Configuration
    priority: 'medium',
    ownerTeam: '',
    dependencies: [],
    errorBudget: '',
    burnRateThreshold: '',
    tags: '',
    documentationUrl: '',
    versionControlEnabled: true,
    autoRemediationEnabled: false,
    maintenanceModeEnabled: false,
    historicalAnalysisEnabled: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load draft from localStorage if exists
    const savedDraft = localStorage.getItem('slo-create-draft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, []);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
    
    // Clear field error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors?.[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic Information validation
    if (!formData?.name?.trim()) {
      newErrors.name = 'SLO name is required';
    } else if (formData?.name?.length < 3) {
      newErrors.name = 'SLO name must be at least 3 characters';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData?.description?.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData?.service) {
      newErrors.service = 'Service selection is required';
    }

    if (!formData?.component) {
      newErrors.component = 'Component selection is required';
    }

    // Metric Configuration validation
    if (!formData?.metricSource) {
      newErrors.metricSource = 'Metric source is required';
    }

    if (!formData?.metricType) {
      newErrors.metricType = 'Metric type is required';
    }

    if (!formData?.targetValue) {
      newErrors.targetValue = 'Target value is required';
    } else {
      const target = parseFloat(formData?.targetValue);
      if (isNaN(target) || target < 0 || target > 100) {
        newErrors.targetValue = 'Target value must be between 0 and 100';
      }
    }

    if (!formData?.evaluationWindow) {
      newErrors.evaluationWindow = 'Evaluation window is required';
    }

    if (!formData?.metricQuery?.trim()) {
      newErrors.metricQuery = 'Metric query is required';
    }

    // Alerting validation (if enabled)
    if (formData?.alertingEnabled) {
      if (!formData?.alertThreshold) {
        newErrors.alertThreshold = 'Alert threshold is required when alerting is enabled';
      } else {
        const threshold = parseFloat(formData?.alertThreshold);
        if (isNaN(threshold) || threshold < 0 || threshold > 100) {
          newErrors.alertThreshold = 'Alert threshold must be between 0 and 100';
        }
      }

      if (!formData?.alertSeverity) {
        newErrors.alertSeverity = 'Alert severity is required when alerting is enabled';
      }

      if (!formData?.alertChannels || formData?.alertChannels?.length === 0) {
        newErrors.alertChannels = 'At least one notification channel is required';
      }
    }

    // Advanced validation
    if (formData?.errorBudget && formData?.errorBudget !== '') {
      const budget = parseFloat(formData?.errorBudget);
      if (isNaN(budget) || budget < 0 || budget > 100) {
        newErrors.errorBudget = 'Error budget must be between 0 and 100';
      }
    }

    if (formData?.burnRateThreshold && formData?.burnRateThreshold !== '') {
      const burnRate = parseFloat(formData?.burnRateThreshold);
      if (isNaN(burnRate) || burnRate < 0) {
        newErrors.burnRateThreshold = 'Burn rate threshold must be a positive number';
      }
    }

    if (formData?.documentationUrl && formData?.documentationUrl !== '') {
      try {
        new URL(formData.documentationUrl);
      } catch {
        newErrors.documentationUrl = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSaveDraft = async () => {
    setIsDraftSaving(true);
    
    try {
      // Save to localStorage
      localStorage.setItem('slo-create-draft', JSON.stringify(formData));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasUnsavedChanges(false);
      
      // Show success notification (you can implement a toast system)
      console.log('Draft saved successfully');
      
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setIsDraftSaving(false);
    }
  };

  const handleCreateSLO = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to create SLO
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft from localStorage
      localStorage.removeItem('slo-create-draft');
      
      // Navigate to SLO list with success message
      navigate('/slo-list-management', { 
        state: { 
          message: `SLO "${formData?.name}" created successfully`,
          type: 'success'
        }
      });
      
    } catch (error) {
      console.error('Failed to create SLO:', error);
      setErrors({ submit: 'Failed to create SLO. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setShowCancelConfirm(true);
    } else {
      navigate('/slo-list-management');
    }
  };

  const confirmCancel = () => {
    localStorage.removeItem('slo-create-draft');
    navigate('/slo-list-management');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Plus" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Create New SLO</h1>
                <p className="text-muted-foreground">
                  Define a new Service Level Objective with comprehensive monitoring and alerting configuration
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              <BasicInfoSection
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
              />

              <MetricConfigSection
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
              />

              <AlertingSection
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
              />

              <AdvancedSection
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
              />

              <FormActions
                onSaveDraft={handleSaveDraft}
                onCreateSLO={handleCreateSLO}
                onCancel={handleCancel}
                isLoading={isLoading}
                isDraftSaving={isDraftSaving}
                hasUnsavedChanges={hasUnsavedChanges}
              />
            </div>

            <div className="xl:col-span-1">
              <div className="sticky top-24">
                <ValidationSummary
                  errors={errors}
                  formData={formData}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full elevation-3">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-warning" />
              <h3 className="text-lg font-semibold text-foreground">Unsaved Changes</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              You have unsaved changes. Are you sure you want to leave? 
              Your progress will be lost.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-md transition-smooth"
              >
                Continue Editing
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 px-4 py-2 text-sm font-medium text-error-foreground bg-error hover:bg-error/90 rounded-md transition-smooth"
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewSLO;