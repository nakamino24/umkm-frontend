// src/hooks/useModal.js
import { useState, useCallback } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const open = useCallback((data = null) => {
    setModalData(data);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setModalData(null);
    document.body.style.overflow = 'unset';
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    modalData,
    open,
    close,
    toggle,
    setModalData
  };
};

// Hook for confirmation modal
export const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    title: 'Konfirmasi',
    message: 'Apakah Anda yakin?',
    onConfirm: () => {},
    onCancel: () => {}
  });

  const confirm = useCallback((options) => {
    setConfig({
      ...config,
      ...options
    });
    setIsOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    config.onConfirm();
    setIsOpen(false);
  }, [config]);

  const handleCancel = useCallback(() => {
    config.onCancel();
    setIsOpen(false);
  }, [config]);

  return {
    isOpen,
    config,
    confirm,
    handleConfirm,
    handleCancel,
    close: () => setIsOpen(false)
  };
};