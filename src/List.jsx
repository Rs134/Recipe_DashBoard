import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

  const healthScores = filteredByServings.map((recipe, i) => ({
    name: `Recipe ${i + 1}`,
    healthScore: recipe.healthScore,
    readyInMinutes: recipe.readyInMinutes,
  }));

  useEffect(() => {
    onStatsUpdate({
      avgHealthScore,
      totalServings,
      medianReadyTime,
      healthScores,
    });
  }, [filteredByServings, onStatsUpdate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="table-container">
      <table className="recipe-table">
        <thead>
          <tr className='table-headings'>
            <th>Recipe</th>
            <th>Ready In (min)</th>
            <th>Servings</th>
            <th>Health Score</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredByServings.map((recipe) => (
            <tr key={recipe.id}>
              <td>{recipe.title}</td>
              <td>{recipe.readyInMinutes}</td>
              <td>{recipe.servings}</td>
              <td>{recipe.healthScore}</td>
              <td id='detail-link'>
                <Link to={`/details/${recipe.id}`} target="_blank">🔗</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
