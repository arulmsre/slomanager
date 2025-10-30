import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VersionHistory = ({ sloId }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const versionHistory = [
  {
    id: 'v1.4',
    version: '1.4',
    timestamp: new Date('2024-10-29T10:30:00'),
    user: 'Sarah Chen',
    userAvatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
    userAvatarAlt: 'Professional headshot of Asian woman with shoulder-length black hair in white blouse',
    changes: [
    'Updated target threshold from 99.5% to 99.9%',
    'Modified evaluation window from 5m to 15m',
    'Added Slack notification channel'],

    changeType: 'major',
    status: 'current'
  },
  {
    id: 'v1.3',
    version: '1.3',
    timestamp: new Date('2024-10-28T14:15:00'),
    user: 'Mike Johnson',
    userAvatar: "https://images.unsplash.com/photo-1645034648304-6e07d766b2a3",
    userAvatarAlt: 'Professional headshot of Caucasian man with brown hair in dark suit and tie',
    changes: [
    'Updated description for clarity',
    'Modified alert threshold to 99.0%'],

    changeType: 'minor',
    status: 'archived'
  },
  {
    id: 'v1.2',
    version: '1.2',
    timestamp: new Date('2024-10-25T09:45:00'),
    user: 'Alex Rodriguez',
    userAvatar: "https://images.unsplash.com/photo-1663720527180-4c60a78fe3b7",
    userAvatarAlt: 'Professional headshot of Hispanic man with short dark hair in blue shirt',
    changes: [
    'Changed metric source from Datadog to Prometheus',
    'Updated service association to API Gateway v2'],

    changeType: 'major',
    status: 'archived'
  },
  {
    id: 'v1.1',
    version: '1.1',
    timestamp: new Date('2024-10-20T16:20:00'),
    user: 'Emily Davis',
    userAvatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    userAvatarAlt: 'Professional headshot of Caucasian woman with blonde hair in navy blazer',
    changes: [
    'Enabled alerting configuration',
    'Added PagerDuty integration'],

    changeType: 'minor',
    status: 'archived'
  },
  {
    id: 'v1.0',
    version: '1.0',
    timestamp: new Date('2024-10-15T11:00:00'),
    user: 'David Kim',
    userAvatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
    userAvatarAlt: 'Professional headshot of Asian man with glasses and black hair in gray suit',
    changes: [
    'Initial SLO creation',
    'Set baseline configuration'],

    changeType: 'initial',
    status: 'archived'
  }];


  const getChangeTypeColor = (type) => {
    switch (type) {
      case 'major':
        return 'text-error bg-error/10 border-error/20';
      case 'minor':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'initial':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const visibleHistory = isExpanded ? versionHistory : versionHistory?.slice(0, 3);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Version History</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Track all changes and modifications to this SLO
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {versionHistory?.length} versions
          </span>
          <Icon name="History" size={16} className="text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-4">
        {visibleHistory?.map((version, index) =>
        <div
          key={version?.id}
          className={`relative border rounded-lg p-4 transition-smooth ${
          version?.status === 'current' ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'}`
          }>

            {/* Version Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border">
                  <img
                  src={version?.userAvatar}
                  alt={version?.userAvatarAlt}
                  className="w-full h-full object-cover" />

                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">
                      Version {version?.version}
                    </span>
                    <span
                    className={`px-2 py-1 text-xs font-medium rounded-md border ${getChangeTypeColor(
                      version?.changeType
                    )}`}>

                      {version?.changeType}
                    </span>
                    {version?.status === 'current' &&
                  <span className="px-2 py-1 text-xs font-medium rounded-md bg-primary text-primary-foreground">
                        Current
                      </span>
                  }
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                    <span>by {version?.user}</span>
                    <span>•</span>
                    <span>{formatTimestamp(version?.timestamp)}</span>
                  </div>
                </div>
              </div>

              <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-smooth">

                <Icon name="MoreVertical" size={16} />
              </Button>
            </div>

            {/* Changes List */}
            <div className="ml-13 space-y-2">
              {version?.changes?.map((change, changeIndex) =>
            <div key={changeIndex} className="flex items-start space-x-2">
                  <Icon
                name="ArrowRight"
                size={14}
                className="text-muted-foreground mt-0.5 flex-shrink-0" />

                  <span className="text-sm text-foreground">{change}</span>
                </div>
            )}
            </div>

            {/* Connection Line */}
            {index < visibleHistory?.length - 1 &&
          <div className="absolute left-9 top-16 w-0.5 h-8 bg-border" />
          }
          </div>
        )}
      </div>
      {/* Show More/Less Button */}
      {versionHistory?.length > 3 &&
      <div className="mt-6 text-center">
          <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right">

            {isExpanded ?
          'Show Less' :
          `Show ${versionHistory?.length - 3} More Versions`}
          </Button>
        </div>
      }
    </div>);

};

export default VersionHistory;