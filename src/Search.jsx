function Search({ searchTerm, setSearchTerm, servings, setServings }) {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleServingsChange = (e) => {
    setServings(e.target.value); 
  };

  return (
    <div className="search">
      <h2>Search Recipes</h2>
      <input
        type="text"
        placeholder="Type a recipe name..."
        value={searchTerm}
        onChange={handleChange}
      />
      
      <div>
        <label htmlFor="servings">Filter by Servings: </label>
        <select id="servings" value={servings} onChange={handleServingsChange}>
          <option value="">All</option>
          <option value="2">2 servings</option>
          <option value="4">4 servings</option>
          <option value="6">6 servings</option>
          <option value="8">8 servings</option>
        </select>
      </div>
    </div>
  );
}

export default Search;
