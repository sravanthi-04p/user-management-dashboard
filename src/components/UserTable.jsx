import UserRow from "./UserRow";
import { SORT_ASC } from "../utils/constants";

const SortArrow = ({ field, sortField, sortOrder }) => {
  if (field !== sortField) return <span className="sort-arrow inactive">↕</span>;
  return <span className="sort-arrow active">{sortOrder === SORT_ASC ? "↑" : "↓"}</span>;
};

const UserTable = ({ users, sortField, sortOrder, onSort, onEdit, onDelete }) => {
  const columns = [
    { label: "ID",         field: "id" },
    { label: "Name",       field: "firstName" },
    { label: "Email",      field: "email" },
    { label: "Department", field: "department" },
    { label: "Actions",    field: null },
  ];

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <span className="table-title">All Users</span>
        <span className="table-count">{users.length} shown</span>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.label}
                onClick={() => col.field && onSort(col.field)}
                className={col.field ? "sortable" : ""}
              >
                {col.label}
                {col.field && (
                  <SortArrow field={col.field} sortField={sortField} sortOrder={sortOrder} />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <div className="empty-state">
                  <div className="empty-icon">🔍</div>
                  <p>No users found</p>
                  <span>Try adjusting your search or filters</span>
                </div>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;