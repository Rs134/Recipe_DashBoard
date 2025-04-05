import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function List({ searchTerm, servings, onStatsUpdate }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?number=20&addRecipeInformation=true&addRecipeNutrition=true&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setRecipes(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const filteredByServings = servings
    ? filteredRecipes.filter(recipe => recipe.servings === parseInt(servings))
    : filteredRecipes;


  const avgHealthScore = filteredByServings.reduce((acc, recipe) => acc + recipe.healthScore, 0) / filteredByServings.length;
  const totalServings = filteredByServings.reduce((acc, recipe) => acc + recipe.servings, 0);
  const readyTimes = filteredByServings.map(recipe => recipe.readyInMinutes).sort((a, b) => a - b);
  const medianReadyTime = readyTimes.length % 2 === 0
    ? (readyTimes[readyTimes.length / 2 - 1] + readyTimes[readyTimes.length / 2]) / 2
    : readyTimes[Math.floor(readyTimes.length / 2)];

  useEffect(() => {
    onStatsUpdate({
      avgHealthScore,
      totalServings,
      medianReadyTime
    });
  }, [filteredByServings, onStatsUpdate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="board">
      <div className="board-column">
        <h2 className='board-title'>Recipe</h2>
        {filteredByServings.map((recipe) => (
          <p key={recipe.id}>{recipe.title}</p>
        ))}
      </div>

      <div className="board-column">
        <h2 className='board-title'>Ready In</h2>
        {filteredByServings.map((recipe) => (
          <p key={recipe.id}>{recipe.readyInMinutes} min</p>
        ))}
      </div>

      <div className="board-column">
        <h2 className='board-title'>Servings</h2>
        {filteredByServings.map((recipe) => (
          <p key={recipe.id}>{recipe.servings}</p>
        ))}
      </div>

      <div className="board-column">
        <h2 className='board-title'>Health Score</h2>
        {filteredByServings.map((recipe) => (
          <p key={recipe.id}>{recipe.healthScore}</p>
        ))}
      </div>
    </div>
  );
}

export default List;
