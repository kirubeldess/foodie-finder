import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router-dom";

export function MealCard({ meal }) {
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
          <CardTitle className="text-lg font-semibold truncate">
            {meal.strMeal}
          </CardTitle>
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
