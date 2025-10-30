import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/slo-dashboard', icon: 'BarChart3' },
    { label: 'SLOs', path: '/slo-list-management', icon: 'Target' },
  ];

  const isActivePath = (path) => {
    if (path === '/slo-list-management') {
      return ['/slo-list-management', '/create-new-slo', '/edit-slo', '/slo-details']?.includes(location?.pathname);
    }
    return location?.pathname === path;
  };

  const notifications = [
    { id: 1, title: 'SLO Breach Alert', message: 'API Gateway SLO dropped below 99.9%', time: '2 min ago', type: 'error' },
    { id: 2, title: 'SLO Recovery', message: 'Database SLO restored to healthy state', time: '15 min ago', type: 'success' },
    { id: 3, title: 'Maintenance Window', message: 'Scheduled maintenance in 2 hours', time: '1 hour ago', type: 'warning' },
  ];

  const unreadCount = notifications?.filter(n => n?.type === 'error')?.length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border elevation-1">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link to="/slo-dashboard" className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Target" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground">SLO Manager</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-lg elevation-2 z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-foreground">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div key={notification?.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted transition-smooth">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification?.type === 'error' ? 'bg-error' :
                          notification?.type === 'success'? 'bg-success' : 'bg-warning'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{notification?.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{notification?.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification?.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden sm:block text-sm font-medium">John Doe</span>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {isProfileOpen && (
              <div className="absolute right-0 top-12 w-48 bg-popover border border-border rounded-lg elevation-2 z-50">
                <div className="p-2">
                  <div className="px-3 py-2 text-sm">
                    <p className="font-medium text-foreground">John Doe</p>
                    <p className="text-muted-foreground">SRE Lead</p>
                  </div>
                  <div className="border-t border-border my-2" />
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Settings
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Icon name="HelpCircle" size={16} className="mr-2" />
                    Help
                  </Button>
                  <div className="border-t border-border my-2" />
                  <Button variant="ghost" size="sm" className="w-full justify-start text-error">
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="px-6 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;