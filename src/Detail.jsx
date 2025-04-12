// Detail.jsx
import { useParams } from 'react-router-dom'; // Corrected import
import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function Detail() {
  const { id } = useParams(); // Get the recipe id from the URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`)
      .then(res => res.json())
      .then(data => setRecipe(data))
      .catch((error) => console.error("Error fetching recipe details:", error));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className='detail-container'>
      <h1>{recipe.title}</h1>
      <p><strong>Summary:</strong> <span dangerouslySetInnerHTML={{ __html: recipe.summary }} /></p>
      <br></br>
      <p><strong>Instructions:</strong> <span dangerouslySetInnerHTML={{ __html: recipe.instructions }} /></p>
    </div>
  );
}

export default Detail;
