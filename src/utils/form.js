export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: ''
  }
}

export function validate(value, validation = null) {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (validation.email) {
    isValid = is.email(value) && isValid;
  }

  if (validation.numeric) {
    isValid = is.number(value) && isValid;
  }

  if (validation.minLength) {
    isValid = value.trim().length >= validation.minLength && isValid;
  }

  if (validation.maxLength) {
    isValid = value.trim().length <= validation.maxLength && isValid;
  }

  return isValid
}

export function validateForm(formControls) {
  let isFormValid = true;

  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid
    }
  }

  return isFormValid
}

const is = {
  email (value) {
    const reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return reg.test(String(value).toLowerCase());
  },
  numeric (value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
};
