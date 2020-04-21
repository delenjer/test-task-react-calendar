import React from 'react';
import PropTypes from 'prop-types';

import '../styles/modal.scss';

const Modal = ({ top, left, onClose, children }) => (
  <div
    className="modal-container"
    style={{
      top,
      left: left - 63,
    }}
  >
    <div className="modal-content">
      <div
        className="close"
        onClick={onClose}
        onKeyPress={onClose}
        role="button"
        tabIndex="0"
      >
        <i className="fa fa-times-circle" />
      </div>
      {children}
    </div>
  </div>
);

Modal.defaultProps = {
  children: null,
};

Modal.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default Modal;
