import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SLOOverview from './components/SLOOverview';
import PerformanceChart from './components/PerformanceChart';
import ConfigurationPanel from './components/ConfigurationPanel';
import ActivityTimeline from './components/ActivityTimeline';
import RelatedServices from './components/RelatedServices';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const SLODetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState('admin');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mock SLO data
  const sloData = {
    id: 'slo-001',
    name: 'API Gateway Response Time',
    description: 'Ensures API Gateway maintains response times under 200ms for 99.9% of requests during peak hours',
    status: 'healthy',
    targetThreshold: 99.9,
    currentPerformance: 99.94,
    performanceTrend: 'up',
    performanceChange: 0.12,
    errorBudget: 83,
    errorBudgetRemaining: '17 hours',
    lastViolation: '3 days ago',
    violationDuration: '45 minutes',
    evaluationWindow: '30 days',
    type: 'Availability SLO',
    metricSource: 'Prometheus + Grafana',
    alertThreshold: '< 99.5%',
    notificationChannel: 'Slack #sre-alerts',
    escalationPolicy: 'On-call rotation',
    alertFrequency: 'Immediate',
    primaryService: 'API Gateway',
    dependencies: ['Authentication Service', 'Database Cluster', 'Load Balancer'],
    environment: 'Production',
    region: 'us-east-1',
    calculationMethod: 'Success Rate',
    dataRetention: '90 days',
    samplingRate: '100%',
    aggregationPeriod: '5 minutes',
    version: 'v2.1.0',
    lastModified: 'Oct 25, 2025 at 2:30 PM',
    modifiedBy: 'Sarah Chen',
    complianceStatus: [
    { framework: 'SLX Standard', status: 'compliant' },
    { framework: 'ISO 27001', status: 'compliant' },
    { framework: 'SOC 2', status: 'warning' }]

  };

  // Mock activity data
  const activityData = [
  {
    id: 1,
    type: 'violation',
    title: 'SLO Threshold Violation',
    description: 'Performance dropped to 99.85% due to database connection timeout',
    details: `Root Cause: Database connection pool exhaustion\nImpact: 0.05% performance degradation\nResolution: Increased connection pool size from 50 to 100`,
    user: {
      name: 'System Alert',
      avatar: "https://images.unsplash.com/photo-1538155421123-6a79813f5deb",
      avatarAlt: 'Professional headshot of middle-aged man with glasses in dark suit'
    },
    timestamp: '2 hours ago',
    duration: '45 minutes',
    actionable: true
  },
  {
    id: 2,
    type: 'recovery',
    title: 'SLO Performance Recovered',
    description: 'Performance restored to 99.94% after infrastructure optimization',
    user: {
      name: 'Mike Johnson',
      avatar: "https://images.unsplash.com/photo-1611695434398-4f4b330623e6",
      avatarAlt: 'Professional headshot of young man with brown hair in blue shirt'
    },
    timestamp: '4 hours ago',
    actionable: false
  },
  {
    id: 3,
    type: 'change',
    title: 'Alert Threshold Updated',
    description: 'Modified alert threshold from 99.0% to 99.5% for earlier detection',
    details: `Previous Threshold: 99.0%\nNew Threshold: 99.5%\nReason: Proactive monitoring improvement`,
    user: {
      name: 'Sarah Chen',
      avatar: "https://images.unsplash.com/photo-1597621969117-1a305d3e0c68",
      avatarAlt: 'Professional headshot of Asian woman with long black hair in white blazer'
    },
    timestamp: '1 day ago',
    actionable: true
  },
  {
    id: 4,
    type: 'alert',
    title: 'Maintenance Window Scheduled',
    description: 'Planned maintenance for database cluster upgrade',
    user: {
      name: 'DevOps Team',
      avatar: "https://images.unsplash.com/photo-1585066047759-3438c34cf676",
      avatarAlt: 'Professional headshot of man with beard in casual shirt'
    },
    timestamp: '2 days ago',
    actionable: false
  }];


  // Mock related services data
  const relatedServicesData = [
  {
    id: 1,
    name: 'Authentication Service',
    description: 'User authentication and authorization',
    status: 'healthy'
  },
  {
    id: 2,
    name: 'Database Cluster',
    description: 'Primary PostgreSQL database cluster',
    status: 'warning'
  },
  {
    id: 3,
    name: 'Load Balancer',
    description: 'Application load balancer',
    status: 'healthy'
  }];


  // Mock dependencies data
  const dependenciesData = [
  {
    id: 1,
    name: 'CDN Service',
    type: 'upstream',
    relationship: 'Content delivery',
    status: 'healthy',
    impact: 'High'
  },
  {
    id: 2,
    name: 'Monitoring Service',
    type: 'downstream',
    relationship: 'Metrics collection',
    status: 'healthy',
    impact: 'Medium'
  },
  {
    id: 3,
    name: 'Backup Service',
    type: 'downstream',
    relationship: 'Data backup',
    status: 'warning',
    impact: 'Low'
  }];


  useEffect(() => {
    // Simulate user role detection
    const role = localStorage.getItem('userRole') || 'admin';
    setUserRole(role);
  }, []);

  const handleEdit = () => {
    navigate('/edit-slo', { state: { sloId: sloData?.id } });
  };

  const handleDuplicate = () => {
    navigate('/create-new-slo', { state: { duplicateFrom: sloData?.id } });
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Simulate delete operation
    console.log('Deleting SLO:', sloData?.id);
    setShowDeleteModal(false);
    navigate('/slo-list-management');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">SLO Details</h1>
              <p className="text-muted-foreground">
                Comprehensive view of Service Level Objective performance and configuration
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                iconName="ArrowLeft"
                iconPosition="left"
                onClick={() => navigate('/slo-list-management')}>

                Back to SLOs
              </Button>
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left">

                Refresh
              </Button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Column - Main Content */}
            <div className="xl:col-span-3 space-y-6">
              {/* SLO Overview */}
              <SLOOverview
                slo={sloData}
                onEdit={handleEdit}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
                userRole={userRole} />


              {/* Performance Chart */}
              <PerformanceChart slo={sloData} />

              {/* Configuration Panel */}
              <ConfigurationPanel slo={sloData} userRole={userRole} />

              {/* Activity Timeline */}
              <ActivityTimeline activities={activityData} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="xl:col-span-1">
              <RelatedServices
                services={relatedServicesData}
                dependencies={dependenciesData} />

            </div>
          </div>
        </div>
      </main>
      {/* Delete Confirmation Modal */}
      {showDeleteModal &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full elevation-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Delete SLO</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete "{sloData?.name}"? This will remove all associated data, alerts, and historical records.
            </p>
            
            <div className="flex gap-3">
              <Button
              variant="destructive"
              onClick={confirmDelete}
              className="flex-1">

                Delete SLO
              </Button>
              <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              className="flex-1">

                Cancel
              </Button>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default SLODetails;