import React, { useEffect } from 'react';
import type { ReactNode } from 'react'; 
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface IModalProps {
  onClose: () => void;
  children: ReactNode;
}

const modalRoot = typeof document !== 'undefined' 
  ? (document.querySelector('#modal-root') || document.body) 
  : null;

const Modal: React.FC<IModalProps> = ({ onClose, children }) => {
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []); 

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) onClose();
  };

  if (!modalRoot) return null;
  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;