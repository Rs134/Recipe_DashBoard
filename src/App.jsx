import { useState, useEffect } from 'react';
import Header from './Header.jsx';
import List from './List.jsx';
import SearchBar from './Search.jsx';
import Detail from './Detail.jsx'
import Charts from './Charts.jsx';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [servings, setServings] = useState(""); 
  const [summaryStats, setSummaryStats] = useState({
    avgHealthScore: 0,
    totalServings: 0,
    medianReadyTime: 0
  });

  const handleStatsUpdate = (stats) => {
    setSummaryStats(stats);
  };

  return (
    <div className='dashboard'>
      <div className='dashheader'>
        <Header summaryStats={summaryStats} />
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          servings={servings}  
          setServings={setServings}
        />
      </div>
      <div className='dashlist'>
        <List 
          searchTerm={searchTerm} 
          servings={servings}  
          onStatsUpdate={handleStatsUpdate} 
        />
        <Charts summaryStats={summaryStats} />
      </div>

    </div>
  );
}

export default App;
