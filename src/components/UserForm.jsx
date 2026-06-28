import { useState, useEffect } from "react";
import { validateUserForm, isFormValid } from "../utils/validators";
import { DEFAULT_DEPARTMENT } from "../utils/constants";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  department: DEFAULT_DEPARTMENT,
};

const UserForm = ({ editingUser, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Pre-populate form when editing an existing user
  useEffect(() => {
    if (editingUser) {
      setFormData({
        firstName:  editingUser.firstName,
        lastName:   editingUser.lastName,
        email:      editingUser.email,
        department: editingUser.department,
      });
    } else {
      setFormData(EMPTY_FORM);
    }
    setErrors({});
  }, [editingUser]);

  // Update one field and clear its error as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateUserForm(formData);
    if (!isFormValid(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    await onSubmit(formData);
    setSubmitting(false);
  };

  const isEditing = Boolean(editingUser);

  return (
    /* Backdrop — click outside to close */
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()} /* prevent backdrop click */
      >
        {/* Header */}
        <div className="modal-header">
          <h2>{isEditing ? "Edit User" : "Add New User"}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">

            {/* First Name */}
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? "input-error" : ""}
                placeholder="e.g. Jane"
              />
              {errors.firstName && (
                <span className="field-error">{errors.firstName}</span>
              )}
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? "input-error" : ""}
                placeholder="e.g. Smith"
              />
              {errors.lastName && (
                <span className="field-error">{errors.lastName}</span>
              )}
            </div>

            {/* Email — full width */}
            <div className="form-group form-group-full">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
                placeholder="e.g. jane@company.com"
              />
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            {/* Department — full width */}
            <div className="form-group form-group-full">
              <label htmlFor="department">Department</label>
              <input
                id="department"
                name="department"
                type="text"
                value={formData.department}
                onChange={handleChange}
                className={errors.department ? "input-error" : ""}
                placeholder="e.g. Engineering"
              />
              {errors.department && (
                <span className="field-error">{errors.department}</span>
              )}
            </div>

          </div>

          {/* Footer buttons */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting
                ? "Saving..."
                : isEditing ? "Save Changes" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;