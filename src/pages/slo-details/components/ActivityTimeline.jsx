import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ActivityTimeline = ({ activities }) => {
  const [filter, setFilter] = useState('all');
  const [isExpanded, setIsExpanded] = useState(true);

  const filterOptions = [
    { value: 'all', label: 'All Activities', icon: 'List' },
    { value: 'changes', label: 'Changes', icon: 'Edit' },
    { value: 'alerts', label: 'Alerts', icon: 'Bell' },
    { value: 'violations', label: 'Violations', icon: 'AlertTriangle' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'change': return 'Edit';
      case 'alert': return 'Bell';
      case 'violation': return 'AlertTriangle';
      case 'recovery': return 'CheckCircle';
      case 'creation': return 'Plus';
      case 'deletion': return 'Trash2';
      default: return 'Clock';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'change': return 'text-accent bg-accent/10';
      case 'alert': return 'text-warning bg-warning/10';
      case 'violation': return 'text-error bg-error/10';
      case 'recovery': return 'text-success bg-success/10';
      case 'creation': return 'text-success bg-success/10';
      case 'deletion': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/50';
    }
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => {
        if (filter === 'changes') return ['change', 'creation', 'deletion']?.includes(activity?.type);
        if (filter === 'alerts') return activity?.type === 'alert';
        if (filter === 'violations') return ['violation', 'recovery']?.includes(activity?.type);
        return true;
      });

  return (
    <div className="bg-card border border-border rounded-lg elevation-1">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Icon name="Clock" size={20} className="text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Activity Timeline</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1 mb-6 bg-muted rounded-lg p-1">
            {filterOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={filter === option?.value ? "default" : "ghost"}
                size="sm"
                iconName={option?.icon}
                iconPosition="left"
                onClick={() => setFilter(option?.value)}
                className="text-xs"
              >
                {option?.label}
              </Button>
            ))}
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {filteredActivities?.length > 0 ? (
              filteredActivities?.map((activity, index) => (
                <div key={activity?.id} className="flex gap-4">
                  {/* Timeline Line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                      <Icon name={getActivityIcon(activity?.type)} size={16} />
                    </div>
                    {index < filteredActivities?.length - 1 && (
                      <div className="w-px h-8 bg-border mt-2" />
                    )}
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">{activity?.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{activity?.description}</p>
                        
                        {/* Activity Details */}
                        {activity?.details && (
                          <div className="bg-muted/30 rounded-lg p-3 mb-3">
                            <div className="text-sm text-foreground">
                              {activity?.details?.split('\n')?.map((line, lineIndex) => (
                                <div key={lineIndex}>{line}</div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* User and Timestamp */}
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Image
                              src={activity?.user?.avatar}
                              alt={activity?.user?.avatarAlt}
                              className="w-5 h-5 rounded-full"
                            />
                            <span>{activity?.user?.name}</span>
                          </div>
                          <span>•</span>
                          <span>{activity?.timestamp}</span>
                          {activity?.duration && (
                            <>
                              <span>•</span>
                              <span>Duration: {activity?.duration}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      {activity?.actionable && (
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Activities Found</h3>
                <p className="text-muted-foreground">No activities match the selected filter.</p>
              </div>
            )}
          </div>

          {/* Load More */}
          {filteredActivities?.length > 0 && (
            <div className="text-center pt-6 border-t border-border">
              <Button variant="outline" iconName="MoreHorizontal" iconPosition="left">
                Load More Activities
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;