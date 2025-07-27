import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

export function MealCard({ meal }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedMeals = JSON.parse(localStorage.getItem('savedMeals') || '[]');
    setIsSaved(savedMeals.some(savedMeal => savedMeal.idMeal === meal.idMeal));
  }, [meal.idMeal]);

  const toggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const savedMeals = JSON.parse(localStorage.getItem('savedMeals') || '[]');
    
    if (isSaved) {
      const updatedMeals = savedMeals.filter(savedMeal => savedMeal.idMeal !== meal.idMeal);
      localStorage.setItem('savedMeals', JSON.stringify(updatedMeals));
      setIsSaved(false);
    } else {
      savedMeals.push(meal);
      localStorage.setItem('savedMeals', JSON.stringify(savedMeals));
      setIsSaved(true);
    }
  };

  if (!meal) return null;

  return (
    <Link to={`/meal/${meal.idMeal}`} className="block">
      <Card
        className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer h-full flex flex-col transform hover:scale-105"
      >
        <CardContent className="p-0 -mt-6">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-48 object-cover rounded-t-lg"
            loading="lazy"
          />
        </CardContent>

        <CardHeader className="flex-grow px-4 pt-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold truncate flex-1">
              {meal.strMeal}
            </CardTitle>
            <button
              onClick={toggleSave}
              className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart 
                className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
              />
            </button>
          </div>
          {meal.strCategory && meal.strArea && (
            <CardDescription className="text-sm text-gray-500">
              {meal.strCategory} | {meal.strArea}
            </CardDescription>
          )}
        </CardHeader>

        <CardFooter className=" px-4">
          <button
            className="w-full bg-primary text-primary-foreground py-2 rounded-md font-semibold hover:bg-primary/90 transition duration-200 ease-in-out">
            Show Detail
          </button>
        </CardFooter>
      </Card>
    </Link>
  );
}
