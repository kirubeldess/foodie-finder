// import './App.css'

// function App() {

//   return (
//     <>
//       <div className='bg-amber-300'>
//         <h1 className='bg-amber-400'>Welcome to My React App</h1>
//       </div>
//     </>
//   )
// }

// export default App




// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
// import { Home } from "./pages/Home";
import { MealDetail } from "./pages/MealDetail";
// import { RandomMeal } from "./pages/RandomMeal";
import "./index.css"; // Ensure your Tailwind CSS is imported
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* <Header /> */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meal/:id" element={<MealDetail />} />
            
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-[calc(100vh-64px)] text-2xl font-bold text-gray-600">
                  404 - Page Not Found
                </div>
              }
            />
          </Routes>
        </main>
        {/* Optional: Add a Footer component here */}
        <footer className="bg-black text-white p-4 text-center mt-auto">
          <div className="container mx-auto text-sm">
            Foodie Finder 2025
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;