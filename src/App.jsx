import { useState } from "react";
import useUsers from "./hooks/useUsers";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import UserForm from "./components/UserForm";
import ConfirmDelete from "./components/ConfirmDelete";
import FilterPopup from "./components/FilterPopup";
import "./App.css";

const App = () => {
  const {
    users,
    totalUsers,
    loading,
    error,
    setError,
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    showForm,
    editingUser,
    deletingUser,
    handleSort,
    handleAddClick,
    handleEditClick,
    handleFormSubmit,
    handleFormClose,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleFilterApply,
    handleFilterClear,
  } = useUsers();

  // FilterPopup open/close is local UI state — doesn't need to live in the hook
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="app-container">
      <Header onAddClick={handleAddClick} />

      <main className="main-content">

        {/* Error banner */}
        {error && (
          <div className="error-banner">
            ⚠️ {error}
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}
        {/* Stats bar */}
<div className="stats-bar">
  <div className="stat-card">
    <div className="stat-icon purple">👥</div>
    <div>
      <div className="stat-label">Total Users</div>
      <div className="stat-value">{totalUsers}</div>
    </div>
  </div>
  <div className="stat-card">
    <div className="stat-icon blue">📄</div>
    <div>
      <div className="stat-label">Current Page</div>
      <div className="stat-value">{currentPage} / {totalPages || 1}</div>
    </div>
  </div>
  <div className="stat-card">
    <div className="stat-icon green">✅</div>
    <div>
      <div className="stat-label">Showing</div>
      <div className="stat-value">{users.length}</div>
    </div>
  </div>
</div>

        {/* Toolbar: search + filter button */}
        <div className="toolbar">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery("")}
          />
          <button
            className="btn btn-filter"
            onClick={() => setShowFilter(true)}
          >
            ⚙ Filter
          </button>
          <button
            className="btn btn-cancel"
            onClick={handleFilterClear}
          >
            Clear
          </button>
        </div>

        {/* Loading / table */}
       {loading ? (
  <div className="loading-state">
    <div className="loading-spinner"></div>
    Loading users...
  </div>
) : (
          <>
            <UserTable
              users={users}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalUsers={totalUsers}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </>
        )}
      </main>

      {/* Modals — rendered outside main flow so they overlay everything */}
      {showForm && (
        <UserForm
          editingUser={editingUser}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}

      {deletingUser && (
        <ConfirmDelete
          user={deletingUser}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

      {showFilter && (
        <FilterPopup
          onApply={handleFilterApply}
          onClose={() => setShowFilter(false)}
        />
      )}
    </div>
  );
};

export default App;