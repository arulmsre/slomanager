import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, type = 'default', confirmText = 'Confirm', cancelText = 'Cancel' }) => {
  if (!isOpen) return null;

  const getIconAndColor = () => {
    switch (type) {
      case 'delete':
        return { icon: 'Trash2', color: 'text-error', bgColor: 'bg-error/10' };
      case 'warning':
        return { icon: 'AlertTriangle', color: 'text-warning', bgColor: 'bg-warning/10' };
      case 'success':
        return { icon: 'CheckCircle', color: 'text-success', bgColor: 'bg-success/10' };
      default:
        return { icon: 'AlertCircle', color: 'text-primary', bgColor: 'bg-primary/10' };
    }
  };

  const { icon, color, bgColor } = getIconAndColor();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-lg max-w-md w-full mx-4 elevation-3">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bgColor}`}>
              <Icon name={icon} size={20} className={color} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          </div>
          
          {/* Message */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {message}
          </p>
          
          {/* Actions */}
          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              {cancelText}
            </Button>
            <Button
              variant={type === 'delete' ? 'destructive' : 'default'}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;