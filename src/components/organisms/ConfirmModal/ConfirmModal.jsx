import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import Modal from '../Modal/Modal.jsx';
import Button from '../../atoms/Button/Button.jsx';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi',
  message = 'Apakah Anda yakin?',
  confirmText = 'Ya',
  cancelText = 'Batal',
  variant = 'danger', // danger, warning, success, info
  isLoading = false
}) => {
  const variants = {
    danger: {
      icon: XCircle,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50',
      confirmVariant: 'danger'
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      confirmVariant: 'primary'
    },
    success: {
      icon: CheckCircle,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      confirmVariant: 'primary'
    },
    info: {
      icon: HelpCircle,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      confirmVariant: 'primary'
    }
  };

  const { icon: Icon, iconColor, bgColor, confirmVariant } = variants[variant] || variants.danger;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
    >
      <div className="text-center">
        <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${bgColor} mb-4`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-gray-500 mb-6">
          {message}
        </p>

        <div className="flex gap-3 justify-center">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;