import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import { fetchMealById } from "../services/mealApi";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export function MealDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMealDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMealById(id);
        if (data) {
          setMeal(data);
        } else {
          setError("Meal not found.");
        }
      } catch (err) {
        setError("Failed to fetch meal details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getMealDetails();
    }
  }, [id]);

  const renderIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(
          <li key={i} className="text-gray-700 flex justify-between border-b border-gray-200 py-1">
            <span className="font-medium">{ingredient}</span>
            <span className="text-gray-500">{measure}</span>
          </li>
        );
      }
    }
    return ingredients.length > 0 ? (
      <ul className="list-none max-h-80 overflow-y-auto rounded-md border border-gray-200 shadow-inner bg-white p-4">
        {ingredients}
      </ul>
    ) : (
      <p className="text-gray-600 italic">No ingredients listed.</p>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-4">
        <Skeleton className="h-10 w-3/4 mb-4 rounded-md" />
        <div className="flex flex-col md:flex-row gap-6">
          <Skeleton className="w-full md:w-1/3 h-64 rounded-lg" />
          <div className="flex-grow space-y-4">
            <Skeleton className="h-6 w-1/2 rounded-md" />
            <Skeleton className="h-4 w-1/4 rounded-md" />
            <Skeleton className="h-4 w-1/4 rounded-md" />
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive" className="max-w-lg mx-auto">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold">Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="container mx-auto p-6">
        <Alert className="max-w-lg mx-auto">
          <AlertTitle className="text-lg font-semibold">Meal Not Found</AlertTitle>
          <AlertDescription>Meal Not Found</AlertDescription>
        </Alert>
      </div>
    );
  }

  const instructions = meal.strInstructions
    ? meal.strInstructions
        .split("\r\n")
        .filter(Boolean)
        .map((step, index) => (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {step.trim()}
          </p>
        ))
    : <p className="text-gray-600 italic">No instructions available.</p>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-xl rounded-lg my-8 max-w-7xl">
      <Link to="/" className="text-gray-500 hover:text-gray-700">
        Back to Home
      </Link>

      <h2 className="text-5xl font-extrabold text-gray-900 mb-8 text-center tracking-tight drop-shadow-sm">
        {meal.strMeal}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1 space-y-6">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full rounded-lg shadow-lg object-cover border border-gray-200"
            loading="lazy"
          />
          <div className="space-y-3 text-gray-700 text-sm">
            {meal.strCategory && (
              <p>
                <span className="font-semibold text-gray-800">Category:</span>{" "}
                {meal.strCategory}
              </p>
            )}
            {meal.strArea && (
              <p>
                <span className="font-semibold text-gray-800">Origin:</span>{" "}
                {meal.strArea}
              </p>
            )}
            {meal.strTags && (
              <p>
                <span className="font-semibold text-gray-800">Tags:</span>{" "}
                {meal.strTags.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </p>
            )}
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-6"
              >
                <Button className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 shadow-md transition duration-300 ease-in-out">
                  <Youtube className="mr-2 h-5 w-5" /> Watch on YouTube
                </Button>
              </a>
            )}
          </div>
        </div>
        <div className="md:col-span-2 space-y-10">
          <section>
            <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">
              Ingredients
            </h3>
            {renderIngredients()}
          </section>

          <section>
            <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">
              Instructions
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
              {instructions}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
