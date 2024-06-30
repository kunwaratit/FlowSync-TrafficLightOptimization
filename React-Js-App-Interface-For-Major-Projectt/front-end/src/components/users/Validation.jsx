// src/utils/validation.js
export const validateForm = (formData) => {
  let errors = {};
  let formIsValid = true;

  if (!formData.email) {
    errors.email = "Email is required";
    formIsValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email address is invalid";
    formIsValid = false;
  }

  if (!formData.phone_number) {
    errors.phone_number = "Phone number is required";
    formIsValid = false;
  } else if (!/^\d{10}$/.test(formData.phone_number)) {
    errors.phone_number = "Phone number should be exactly 10 digits";
    formIsValid = false;
  }

  if (!formData.password) {
    errors.password = "Password is required";
    formIsValid = false;
  } else if (
    !/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}/.test(
      formData.password
    )
  ) {
    errors.password =
      "Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character";
    formIsValid = false;
  }

  if (!formData.password2) {
    errors.password2 = "Confirm Password is required";
    formIsValid = false;
  } else if (formData.password !== formData.password2) {
    errors.password2 = "Passwords do not match";
    formIsValid = false;
  }

  if (!formData.province) {
    errors.province = "Province is required";
    formIsValid = false;
  }

  if (!formData.district) {
    errors.district = "District is required";
    formIsValid = false;
  }

  if (!formData.intersection) {
    errors.intersection = "Intersection name is required";
    formIsValid = false;
  }

  return { errors, formIsValid };
};
