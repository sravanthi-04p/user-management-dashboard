# User Management Dashboard

A responsive **React.js** web application that allows administrators to perform complete **CRUD (Create, Read, Update, Delete)** operations on user data using the JSONPlaceholder REST API.


## Project Overview

This dashboard was built as part of a frontend assignment to demonstrate real-world React development skills including API integration, state management, form validation, responsive design, and clean code architecture.

The application connects to [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) — a free mock REST API — to fetch and manipulate user data. Since JSONPlaceholder simulates responses without persisting data, all mutations (add, edit, delete) are reflected immediately in local React state.

---

## Features

- ✅ View all users in a structured, sortable table
- ✅ Real-time search by first name, last name, or email
- ✅ Filter popup with multi-field filtering (first name, last name, email, department)
- ✅ Sort by any column — ascending and descending
- ✅ Pagination with 10, 25, 50, and 100 records per page
- ✅ Add new users via a validated modal form
- ✅ Edit existing users with pre-populated fields
- ✅ Delete users with a safety confirmation modal
- ✅ Client-side form validation with inline error messages
- ✅ Error handling with friendly banners
- ✅ Fully responsive — desktop, tablet, and mobile
- ✅ Loading spinner while fetching data
- ✅ Stats bar showing total users, current page, and visible count
- ✅ User avatars with initials and color coding

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React.js 18** | UI framework with functional components and hooks |
| **Vite** | Build tool and development server |
| **Axios** | HTTP requests to JSONPlaceholder API |
| **React Hooks** | `useState`, `useEffect`, `useMemo` for state management |
| **CSS3** | Custom responsive styling (no UI library) |
| **JSONPlaceholder** | Free mock REST API backend |

---

## Installation & Setup

### Prerequisites
- Node.js version 18 or higher
- npm (Node Package Manager)
- Git

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/your-username/user-management-dashboard.git
cd user-management-dashboard
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm run dev
```

**4. Open in browser**
```
http://localhost:5173
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at localhost:5173 |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## Project Folder Structure

```
user-management-dashboard/
│
├── public/
│
├── src/
│    ├── api/
│    │    └── userService.js        # Axios API wrappers — GET, POST, PUT, DELETE
│    │
│    ├── components/
│    │    ├── Header.jsx            # Top navigation bar with Add User button
│    │    ├── SearchBar.jsx         # Real-time search input component
│    │    ├── FilterPopup.jsx       # Multi-field filter modal
│    │    ├── UserTable.jsx         # Sortable data table with column headers
│    │    ├── UserRow.jsx           # Individual table row with Edit/Delete actions
│    │    ├── Pagination.jsx        # Page controls and page-size selector
│    │    ├── UserForm.jsx          # Add and Edit user modal form
│    │    └── ConfirmDelete.jsx     # Delete confirmation modal
│    │
│    ├── hooks/
│    │    └── useUsers.js           # Central data hook — all state and handlers
│    │
│    ├── utils/
│    │    ├── constants.js          # Shared constants (API URL, page sizes, sort)
│    │    ├── helpers.js            # Data mapping, name splitting, ID generation
│    │    └── validators.js         # Form validation logic
│    │
│    ├── styles/                    # (Reserved for future modular stylesheets)
│    │
│    ├── App.jsx                    # Root component — layout and modal rendering
│    ├── App.css                    # All application styles
│    └── main.jsx                   # Application entry point
│
├── README.md
├── package.json
└── vite.config.js
```

---

## API Integration

**Base URL:** `https://jsonplaceholder.typicode.com/users`

| Operation | HTTP Method | Endpoint | Description |
|---|---|---|---|
| Fetch all users | `GET` | `/users` | Load all users on mount |
| Add a user | `POST` | `/users` | Simulate creating a new user |
| Edit a user | `PUT` | `/users/:id` | Simulate updating a user |
| Delete a user | `DELETE` | `/users/:id` | Simulate deleting a user |

All API calls are centralized in `src/api/userService.js` and called through the `useUsers` custom hook.

---

## Engineering Assumptions

The following assumptions were made due to the limitations of the JSONPlaceholder API:

| # | Assumption | Reason |
|---|---|---|
| 1 | **Name splitting** — The API returns a single `name` field (e.g. `"Leanne Graham"`). The app splits on the first space to produce `firstName: "Leanne"` and `lastName: "Graham"`. Names with no space get an empty `lastName`. | API has no separate first/last name fields |
| 2 | **Department** — All users fetched from the API are assigned the department `"IT"` by default via the `DEFAULT_DEPARTMENT` constant. Users added manually can have any department typed in freely. | API provides no department field |
| 3 | **POST simulation** — JSONPlaceholder always returns `id: 11` for every POST request regardless of payload. The app generates a serial ID using `generateNextId()` (based on the current highest ID + 1) to avoid key collisions. | Mock API limitation |
| 4 | **Data persistence** — Since JSONPlaceholder is a read-only mock API, all changes (add, edit, delete) are managed in local React state and reset on page refresh. This is the expected behavior for a mock API project. | Mock API does not persist data |
| 5 | **Department input** — A free-text input is used for department instead of a fixed dropdown, giving administrators flexibility to enter any department name. | Assignment does not specify fixed department values |

---

## Component Responsibilities

| Component | Single Responsibility |
|---|---|
| `useUsers.js` | Owns all data fetching, filtering, sorting, pagination, and modal state |
| `userService.js` | Only handles Axios HTTP calls — no business logic |
| `helpers.js` | Pure utility functions — name splitting, data mapping, ID generation |
| `validators.js` | Pure validation functions — returns error objects, no side effects |
| `UserTable.jsx` | Renders the table structure and passes events up |
| `UserRow.jsx` | Renders a single row — no state, only props |
| `UserForm.jsx` | Manages its own local form state and delegates submit to parent |
| `FilterPopup.jsx` | Manages its own local filter state and delegates apply to parent |

---

## Challenges Faced

**1. Read-only mock API**
JSONPlaceholder does not persist any data. Every POST, PUT, and DELETE request returns a simulated success response but makes no real changes. This was handled by updating local React state immediately after a successful API response, keeping the UI in sync without relying on the API to return updated data.

**2. Duplicate ID on POST**
JSONPlaceholder always returns `id: 11` for every POST request. Rendering multiple added users caused React `key` conflicts. This was solved by implementing `generateNextId()` in `helpers.js`, which calculates the next serial number by finding the current highest ID in state and adding 1.

**3. Missing API fields**
The API provides no `firstName`, `lastName`, or `department` fields. Name splitting and department defaulting were handled in `mapApiUser()` inside `helpers.js`, keeping the transformation logic in one place and out of components.

**4. Keeping filters, search, and sort in sync with pagination**
Whenever search query, filters, sort field, or page size changes, the current page needs to reset to 1 to avoid showing an empty page. This was handled with a dedicated `useEffect` in `useUsers.js` that watches those values and calls `setCurrentPage(1)`.

---

## Future Improvements

Given more time, the following improvements would be made:

| Improvement | Description |
|---|---|
| **Real backend** | Replace JSONPlaceholder with a Node.js/Express API connected to a real database (e.g. PostgreSQL or MongoDB) for true data persistence |
| **Authentication** | Add login/logout with JWT tokens and protected routes using React Router |
| **Unit tests** | Add test coverage using Vitest and React Testing Library for hooks, validators, and components |
| **Toast notifications** | Replace error banners with non-blocking toast notifications for success and error feedback |
| **Bulk actions** | Add row checkboxes to support bulk delete or bulk export |
| **Column visibility** | Allow users to show/hide table columns based on preference |
| **Advanced sorting** | Support multi-column sorting |
| **Export to CSV** | Allow admins to download the user list as a CSV file |
| **Dark mode** | Add a theme toggle for light and dark mode |

---

## Code Quality Practices

- **DRY principle** — Reusable utilities in `utils/`, shared constants in `constants.js`
- **Single responsibility** — Each component and utility has one clear job
- **Semantic naming** — Descriptive names like `handleFilterApply`, `processedUsers`, `generateNextId`
- **Client-side validation** — All form inputs validated before API calls are made
- **Error boundaries** — All API calls wrapped in try/catch with user-friendly error messages
- **Modular structure** — Code split across `api/`, `components/`, `hooks/`, and `utils/` folders
- **Comments** — JSDoc-style comments on all utility functions and hooks explaining purpose and assumptions

---



## Author

**Your Name**
- GitHub: [@sravanthi-porandla](https://github.com/sravanthi-04p/user-management-dashboard)
- Email: sravanthiporandla04@gmail.com
-Live :https://user-management-dashboard-flax-two.vercel.app/
---

## License

This project was built as part of a frontend assignment for **Tacnique**.
