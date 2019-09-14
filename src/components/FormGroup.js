import React from 'react';
import PropTypes from 'prop-types';
import './styles/FormGroup.scss';

const FormGroup = ({ id, label, errorMessage, value, placeholder, type }) => (
    <div className="formGroup">
        { (label && id) && (
            <label
                className="formGroup__label"
                htmlFor={id}
            >{label}</label>
        )}
        { type === 'textarea' ? (
            <textarea
                id={id}
                placeholder={placeholder}
                className="formGroup__input formGroup__textarea"
                rows="10"
            >{value}</textarea>
        ) : (
            <input
                id={id}
                className="formGroup__input"
                type={type}
                value={value}
                placeholder={placeholder}
            />
        ) }
        <span className="formGroup__error-message">{errorMessage}</span>
    </div>
);

FormGroup.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    errorMessage: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string
};

FormGroup.defaultProps = {
    type: 'text',
    errorMessage: 'This field is incorrect.'
};

export default FormGroup;