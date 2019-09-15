import React from 'react';
import PropTypes from 'prop-types';
import './styles/Button.scss';

const Button = ({type, disabled, onClick, children}) => (
  <button
    className="button"
    type={type}
    disabled={disabled}
    onClick={onClick}
  >{children}</button>
);

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;
