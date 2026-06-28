// Assign a consistent color per user based on their ID
const AVATAR_COLORS = [
  "#6366f1","#3b82f6","#10b981","#f59e0b",
  "#ef4444","#8b5cf6","#06b6d4","#f97316",
];

const getAvatarColor = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length];

const UserRow = ({ user, onEdit, onDelete }) => {
  const initials = `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();

  return (
    <tr className="user-row">
      <td>
        <span className="id-badge">#{user.id}</span>
      </td>
      <td>
        <div className="user-cell">
          <div
            className="avatar"
            style={{ background: getAvatarColor(user.id) }}
          >
            {initials}
          </div>
          <div>
            <div className="user-name">{user.firstName} {user.lastName}</div>
          </div>
        </div>
      </td>
      <td className="email-cell">{user.email}</td>
      <td>
        <span className="dept-badge">{user.department}</span>
      </td>
      <td>
        <div className="actions-cell">
          <button className="btn btn-edit" onClick={() => onEdit(user)}>✏️ Edit</button>
          <button className="btn btn-delete" onClick={() => onDelete(user)}>🗑️ Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;