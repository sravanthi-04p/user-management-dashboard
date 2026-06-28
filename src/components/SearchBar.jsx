const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <div className="searchbar-wrapper">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="searchbar-input"
        placeholder="Search by name or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" onClick={onClear}>✕</button>
      )}
    </div>
  );
};

export default SearchBar;
