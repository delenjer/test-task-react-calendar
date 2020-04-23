import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './select.scss';

export const Select = ({
  placeholder,
  options,
  onSelect,
  isError,
  onBlur,
  errorText,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectOption = (option) => {
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="select-container">
      <button
        type="button"
        onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
        className={`select-button ${isError ? 'border-error' : ''} ${
          value ? 'text-black' : ''
        }`}
        onBlur={onBlur}
      >
        {value || placeholder}
      </button>
      {isOpen && (
        <div className="select-options">
          {options.map(option => (
            <div
              key={option.id}
              onClick={() => selectOption(option)}
              className="option"
              onKeyPress={() => selectOption(option)}
              tabIndex="0"
              role="button"
            >
              <span className={`color-indicator event-${option.id}`} />
              <span
                className={`${option.id === placeholder ? 'text-bold' : ''}`}
              >
                {option.name}
              </span>
            </div>
          ))}
        </div>
      )}
      {errorText ? <span className="text-error">{errorText}</span> : null}
    </div>
  );
};

Select.defaultProps = {
  isError: false,
  onBlur: () => {},
  errorText: '',
  value: '',
};

Select.propTypes = {
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  onBlur: PropTypes.func,
  errorText: PropTypes.string,
  value: PropTypes.string,
};
