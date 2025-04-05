function Header({ summaryStats }) {
    return (
      <div className="heading">
        <div className="header-container">
            <h1 id="title"> 🍽️ Recipe Explorer Dashboard </h1>
            <p id="subtitle">
            Navigate and filter through various recipes and cuisines to satisfy your cravings
            </p>
        </div>
        <div className="cards">
          <div className="card1 card">
            <h2>Average Health Score</h2>
            <p>{summaryStats.avgHealthScore.toFixed(2)}</p>
          </div>
          <div className="card2 card">
            <h2>Total Servings</h2>
            <p>{summaryStats.totalServings}</p>
          </div>
          <div className="card3 card">
            <h2>Median Ready Time</h2>
            <p>{summaryStats.medianReadyTime} min</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Header;
  