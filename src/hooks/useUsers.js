import { useState, useEffect, useMemo } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userService";
import { mapApiUser, generateNextId } from "../utils/helpers";
import { DEFAULT_PAGE_SIZE, SORT_ASC, SORT_DESC } from "../utils/constants";

/**
 * useUsers — central hook that owns all user data and UI state.
 * Components just call this and get back ready-to-use values and handlers.
 */
const useUsers = () => {
  // ── Raw data ──────────────────────────────────────────────────────────────
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Search / filter / sort ────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ firstName: "", lastName: "", email: "", department: "" });
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState(SORT_ASC);

  // ── Pagination ────────────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // ── Modal state ───────────────────────────────────────────────────────────
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  // ── Fetch users on mount ──────────────────────────────────────────────────
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getUsers();
        setUsers(response.data.map(mapApiUser));
      } catch (err) {
        setError("Failed to load users. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ── Derived: filtered + searched + sorted list ────────────────────────────
  const processedUsers = useMemo(() => {
    let result = [...users];

    // 1. Search across firstName, lastName, email
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.firstName.toLowerCase().includes(q) ||
          u.lastName.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }

    // 2. Filter popup — each field is an independent AND condition
    if (filters.firstName.trim())
      result = result.filter((u) =>
        u.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
      );
    if (filters.lastName.trim())
      result = result.filter((u) =>
        u.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
      );
    if (filters.email.trim())
      result = result.filter((u) =>
        u.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    if (filters.department.trim())
      result = result.filter((u) =>
        u.department.toLowerCase().includes(filters.department.toLowerCase())
      );

    // 3. Sort
    result.sort((a, b) => {
      const valA = String(a[sortField] ?? "").toLowerCase();
      const valB = String(b[sortField] ?? "").toLowerCase();
      if (valA < valB) return sortOrder === SORT_ASC ? -1 : 1;
      if (valA > valB) return sortOrder === SORT_ASC ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, searchQuery, filters, sortField, sortOrder]);

  // ── Pagination slice ──────────────────────────────────────────────────────
  const totalPages = Math.ceil(processedUsers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleUsers = processedUsers.slice(startIndex, startIndex + pageSize);

  // Reset to page 1 when search/filter/sort/pageSize changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, sortField, sortOrder, pageSize]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  // Toggle sort direction or switch sort field
  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === SORT_ASC ? SORT_DESC : SORT_ASC));
    } else {
      setSortField(field);
      setSortOrder(SORT_ASC);
    }
  };

  // Open Add form
  const handleAddClick = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  // Open Edit form with selected user pre-filled
  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  // Submit Add or Edit
  const handleFormSubmit = async (formData) => {
  try {
    if (editingUser) {
      await updateUser(editingUser.id, formData);
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u))
      );
    } else {
      await createUser(formData);
      // Generate next serial ID based on existing users
      setUsers((prev) => {
        const nextId = generateNextId(prev);
        return [{ ...formData, id: nextId }, ...prev];
      });
    }
    setShowForm(false);
    setEditingUser(null);
  } catch (err) {
    setError("Could not save user. Please try again.");
  }
};

  // Open delete confirmation
  const handleDeleteClick = (user) => setDeletingUser(user);

  // Confirmed delete
  const handleDeleteConfirm = async () => {
    if (!deletingUser) return;
    try {
      await deleteUser(deletingUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
      setDeletingUser(null);
    } catch (err) {
      setError("Could not delete user. Please try again.");
    }
  };

  // Cancel delete
  const handleDeleteCancel = () => setDeletingUser(null);

  // Close form modal
  const handleFormClose = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  // Apply filters from popup
  const handleFilterApply = (newFilters) => setFilters(newFilters);

  // Clear all filters and search
  const handleFilterClear = () => {
    setFilters({ firstName: "", lastName: "", email: "", department: "" });
    setSearchQuery("");
  };

  return {
    // Data
    users: visibleUsers,
    totalUsers: processedUsers.length,
    loading,
    error,
    setError,

    // Search / filter / sort
    searchQuery,
    setSearchQuery,
    filters,
    sortField,
    sortOrder,

    // Pagination
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,

    // Modal state
    showForm,
    editingUser,
    deletingUser,

    // Handlers
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
  };
};

export default useUsers;