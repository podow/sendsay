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
        className="form-group__input form-group__textarea"
        rows="10"
        onChange={onChange}
        value={value}
      />
    ) : (
      <input
        id={id}
        className="form-group__input"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    );

  return renderCallback
    ? renderCallback(
      <div className="form-group">
        {(label && id) && (
          <label
            className={`form-group__label ${type === 'file' && 'form-group__label-select'}`}
            htmlFor={id}
          >{label}</label>
        )}
        {input}
        {isInvalid({valid, touched, shouldValidate}) &&
        <span className="form-group__error-message">{errorMessage}</span>}
      </div>
    )
    : (
      <div className="form-group">
        {(label && id) && (
          <label
            className={`form-group__label ${type === 'file' && 'form-group__label_select'}`}
            htmlFor={id}
          >{label}</label>
        )}
        {input}
        {isInvalid({valid, touched, shouldValidate}) &&
        <span className="form-group__error-message">{errorMessage}</span>}
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
