import axios from "axios";

// Base URL for JSONPlaceholder users endpoint
const API_URL = "https://jsonplaceholder.typicode.com/users";

/**
 * Fetch all users from the API.
 * Returns the full axios response so callers can read .data
 */
export const getUsers = () => axios.get(API_URL);

/**
 * Create a new user (JSONPlaceholder simulates a 201 response).
 * The returned object will have id: 11 regardless of payload — that's the mock API's limitation.
 */
export const createUser = (user) => axios.post(API_URL, user);

/**
 * Update an existing user by ID using a full PUT replacement.
 */
export const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);

/**
 * Delete a user by ID.
 * JSONPlaceholder returns an empty object {} on success.
 */
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);