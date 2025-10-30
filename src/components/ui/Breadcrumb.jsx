import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const getBreadcrumbItems = () => {
    const path = location?.pathname;
    
    const breadcrumbMap = {
      '/slo-dashboard': [
        { label: 'Dashboard', path: '/slo-dashboard' }
      ],
      '/slo-list-management': [
        { label: 'Dashboard', path: '/slo-dashboard' },
        { label: 'SLOs', path: '/slo-list-management' }
      ],
      '/create-new-slo': [
        { label: 'Dashboard', path: '/slo-dashboard' },
        { label: 'SLOs', path: '/slo-list-management' },
        { label: 'Create SLO', path: '/create-new-slo' }
      ],
      '/edit-slo': [
        { label: 'Dashboard', path: '/slo-dashboard' },
        { label: 'SLOs', path: '/slo-list-management' },
        { label: 'Edit SLO', path: '/edit-slo' }
      ],
      '/slo-details': [
        { label: 'Dashboard', path: '/slo-dashboard' },
        { label: 'SLOs', path: '/slo-list-management' },
        { label: 'SLO Details', path: '/slo-details' }
      ]
    };

    return breadcrumbMap?.[path] || [];
  };

  const breadcrumbItems = getBreadcrumbItems();

  if (breadcrumbItems?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbItems?.map((item, index) => (
        <React.Fragment key={item?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          {index === breadcrumbItems?.length - 1 ? (
            <span className="text-foreground font-medium">{item?.label}</span>
          ) : (
            <Link
              to={item?.path}
              className="hover:text-foreground transition-smooth"
            >
              {item?.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;