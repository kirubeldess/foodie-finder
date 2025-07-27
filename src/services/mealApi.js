import axios from "axios";

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchMealsBySearch = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search.php?s=${query}`);
    return response.data.meals;
  } catch (error) {
    console.error("Error fetching meals by search:", error);
    throw error;
  }
};

export const fetchMealsByFirstLetter = async (letter) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search.php?f=${letter}`);
    return response.data.meals;
  } catch (error) {
    console.error("Error fetching meals by first letter:", error);
    throw error;
  }
};

export const fetchMealById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching meal by ID:", error);
    throw error;
  }
};

export const fetchMealCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories.php`);
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching meal categories:", error);
    throw error;
  }
};

export const fetchMealsByCategory = async (category) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/filter.php?c=${category}`
    );
    return response.data.meals;
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    throw error;
  }
};



