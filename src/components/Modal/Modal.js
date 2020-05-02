import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './modal.scss';

export const Modal = ({ onClose, x, y, children }) => {
  const ref = useRef(null);
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return (
    <div className="modal__backdrop">
      <div
        className="modal__wrapper"
        ref={ref}
        style={{
          top: `${x + 10}px`, left: `${y - 100}px`,
        }}
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        >
          <i className="fa fa-times-circle" />
        </button>
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
