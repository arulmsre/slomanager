import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentChangesTable = () => {
  const recentChanges = [
  {
    id: 1,
    sloName: "API Gateway Response Time",
    service: "API Gateway",
    action: "Updated",
    user: "Sarah Chen",
    userAvatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
    userAvatarAlt: "Professional headshot of Asian woman with shoulder-length black hair in white blouse",
    timestamp: "2 hours ago",
    changes: "Threshold updated from 300ms to 500ms",
    status: "active",
    impact: "medium"
  },
  {
    id: 2,
    sloName: "Database Availability",
    service: "PostgreSQL Cluster",
    action: "Created",
    user: "Mike Rodriguez",
    userAvatar: "https://images.unsplash.com/photo-1596717951382-a3cbbdd4b8fd",
    userAvatarAlt: "Professional headshot of Hispanic man with short dark hair in navy blue shirt",
    timestamp: "4 hours ago",
    changes: "New SLO created with 99.9% availability target",
    status: "active",
    impact: "high"
  },
  {
    id: 3,
    sloName: "Payment Processing Error Rate",
    service: "Payment Service",
    action: "Disabled",
    user: "Emily Johnson",
    userAvatar: "https://images.unsplash.com/photo-1612275857880-57d3b7676179",
    userAvatarAlt: "Professional headshot of Caucasian woman with blonde hair in gray blazer",
    timestamp: "6 hours ago",
    changes: "Temporarily disabled for maintenance window",
    status: "disabled",
    impact: "low"
  },
  {
    id: 4,
    sloName: "User Authentication Latency",
    service: "Auth Service",
    action: "Updated",
    user: "David Kim",
    userAvatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
    userAvatarAlt: "Professional headshot of Asian man with glasses and dark hair in white dress shirt",
    timestamp: "8 hours ago",
    changes: "Alert threshold adjusted to reduce noise",
    status: "active",
    impact: "low"
  },
  {
    id: 5,
    sloName: "CDN Response Time",
    service: "Content Delivery",
    action: "Created",
    user: "Lisa Wang",
    userAvatar: "https://images.unsplash.com/photo-1721294928128-f6c2d1d2281d",
    userAvatarAlt: "Professional headshot of Asian woman with long black hair in dark blue blazer",
    timestamp: "12 hours ago",
    changes: "New global CDN SLO with regional targets",
    status: "active",
    impact: "medium"
  }];


  const getActionColor = (action) => {
    switch (action?.toLowerCase()) {
      case 'created':
        return 'text-success bg-success/10';
      case 'updated':
        return 'text-accent bg-accent/10';
      case 'disabled':
        return 'text-warning bg-warning/10';
      case 'deleted':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'disabled':
        return 'text-warning bg-warning/10';
      case 'error':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent SLO Changes</h2>
          <Button variant="ghost" size="sm">
            <Icon name="History" size={16} className="mr-2" />
            View History
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">SLO Name</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Service</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Action</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">User</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Changes</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Time</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentChanges?.map((change) =>
            <tr key={change?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <div className="font-medium text-foreground">{change?.sloName}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-muted-foreground">{change?.service}</div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActionColor(change?.action)}`}>
                    {change?.action}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <img
                    src={change?.userAvatar}
                    alt={change?.userAvatarAlt}
                    className="w-8 h-8 rounded-full object-cover" />

                    <span className="text-sm text-foreground">{change?.user}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-muted-foreground max-w-xs truncate" title={change?.changes}>
                    {change?.changes}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(change?.status)}`}>
                    {change?.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-sm text-muted-foreground">{change?.timestamp}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreHorizontal" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="ghost" size="sm" className="w-full">
          Load More Changes
        </Button>
      </div>
    </div>);

};

export default RecentChangesTable;