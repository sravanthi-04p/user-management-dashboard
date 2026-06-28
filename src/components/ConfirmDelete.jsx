const ConfirmDelete = ({ user, onConfirm, onCancel }) => (
  <div className="modal-backdrop" onClick={onCancel}>
    <div className="modal-box modal-small" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>Confirm Delete</h2>
        <button className="modal-close" onClick={onCancel}>✕</button>
      </div>
      <div className="delete-modal-body">
        <div className="delete-icon">🗑️</div>
        <div className="delete-title">Delete User?</div>
        <p className="delete-message">
          You are about to permanently delete{" "}
          <strong>{user.firstName} {user.lastName}</strong>.
          This action cannot be undone.
        </p>
      </div>
      <div className="modal-footer">
        <button className="btn btn-cancel" onClick={onCancel}>Cancel</button>
        <button className="btn btn-delete-confirm" onClick={onConfirm}>Yes, Delete</button>
      </div>
    </div>
  </div>
);

export default ConfirmDelete;