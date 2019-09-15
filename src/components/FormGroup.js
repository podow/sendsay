import React from 'react';
import PropTypes from 'prop-types';
import './styles/FormGroup.scss';

const isInvalid = ({valid, touched, shouldValidate}) => !valid && shouldValidate && touched;

const FormGroup = ({
    id, label,
    errorMessage, value,
    placeholder, type,
    onChange, valid,
    touched, shouldValidate,
    renderCallback
  }) => {
  const input = type === 'textarea'
    ? (
      <textarea
        id={id}
        placeholder={placeholder}
        className="formGroup__input formGroup__textarea"
        rows="10"
        onChange={onChange}
        value={value}
      />
    ) : (
      <input
        id={id}
        className="formGroup__input"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    );

  return (
    <div className="formGroup">
      {(label && id) && <label className="formGroup__label" htmlFor={id}>{label}</label>}
      {renderCallback ? renderCallback(input) : input}
      {isInvalid({valid, touched, shouldValidate}) && <span className="formGroup__error-message">{errorMessage}</span>}
    </div>
  );
};

FormGroup.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func
};

FormGroup.defaultProps = {
  type: 'text',
  errorMessage: 'Введено некорректное значение.'
};

export default FormGroup;
