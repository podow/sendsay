import React from 'react';
import PropTypes from 'prop-types';
import './styles/Button.scss';

const Button = ({ type, disabled, children }) => (
    <button
        className="button"
        type={type}
        disabled={disabled}
    >{children}</button>
);

Button.propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool
};

export default Button;