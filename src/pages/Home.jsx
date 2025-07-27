import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { MealCard } from "../components/MealCard";
import {
  fetchMealsBySearch,
  fetchMealsByCategory,
  fetchMealCategories,
} from "../services/mealApi";
import { Skeleton } from "../components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle } from "lucide-react";
import { chicken as heroImage } from "../assets/images/images";

export default function Home() {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("chicken");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Beef");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchMealCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, []);

  const handleSearch = async (query) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setMeals([]);
    try {
      const data = await fetchMealsBySearch(query);
      setMeals(data || []);
    } catch (err) {
      setError("Failed to fetch meals. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    setError(null);
    setMeals([]);
    try {
      const data = await fetchMealsByCategory(category);
      setMeals(data || []);
    } catch (err) {
      setError("Failed to fetch meals for this category. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-72 rounded-lg" />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    if (!meals || meals.length === 0) {
      return (
        <Alert>
          <AlertTitle>No Results Found</AlertTitle>
          <AlertDescription>
            Your search did not match any meals. Try a different query or category.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="relative h-screen w-full">

        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
            alt="Hero background"
            className="w-full h-full object-cover blur-xs scale-105"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col">
          <Header />
          <div className="flex-grow flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg font-australia">
              Discover Delicious Meals
            </h1>
            <p className="text-md mb-6 font-ubuntu">Explore your favorite cuisines from around the world. Search and get inspired to cook or try something new today!</p>
            <div className="w-full max-w-lg">
              <SearchBar
                onSearch={handleSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-10 px-4 space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Browse by Category
          </h2>

          <Tabs
            value={selectedCategory}
            onValueChange={handleCategoryFilter}
            className="w-full max-w-6xl mx-auto flex flex-col items-center"
          >
            <TabsList className="flex flex-wrap h-auto p-1 mb-6 gap-2 justify-center">
              {categories.slice(0, 10).map((cat) => (
                <TabsTrigger
                  key={cat.idCategory}
                  value={cat.strCategory}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {cat.strCategory}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={selectedCategory} className="w-full">
              {renderContent()}
            </TabsContent>
          </Tabs>

        </section>
      </div>
    </div>
  );
}
