import { DEPARTMENTS } from "./constants";

export const validateUserForm = (formData) => {
  const errors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!formData.department.trim()) {
    errors.department = "Department is required";
  }

  return errors;
};

export const isFormValid = (errors) => Object.keys(errors).length === 0;