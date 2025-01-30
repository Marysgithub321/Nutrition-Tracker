import React, { useState, useEffect } from "react";

const Calories = ({ resetKey }) => {
  const [foodEntries, setFoodEntries] = useState([]);
  const [foodInput, setFoodInput] = useState("");
  const [caloriesInput, setCaloriesInput] = useState("");
  const [proteinInput, setProteinInput] = useState("");

  // ✅ Load data from Local Storage when component mounts
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("foodEntries")) || [];
    setFoodEntries(savedEntries);
    console.log("✅ Loaded foodEntries from Local Storage:", savedEntries);
  }, []);

  // ✅ Save data to Local Storage whenever foodEntries change (with small delay)
  useEffect(() => {
    if (foodEntries.length > 0) {
      setTimeout(() => {
        localStorage.setItem("foodEntries", JSON.stringify(foodEntries));
        console.log("💾 Saved to Local Storage:", foodEntries);
      }, 100);
    }
  }, [foodEntries]);

  // ✅ Reset state ONLY when "Clear All" is clicked
  useEffect(() => {
    if (resetKey > 0) {
      setFoodEntries([]);
      setFoodInput("");
      setCaloriesInput("");
      setProteinInput("");
      localStorage.removeItem("foodEntries");
      console.log("🗑️ Cleared all food entries and Local Storage");
    }
  }, [resetKey]);

  // ✅ Calculate Total Calories & Protein
  const totalCalories = foodEntries.reduce((sum, entry) => sum + entry.calories, 0);
  const totalProtein = foodEntries.reduce((sum, entry) => sum + entry.protein, 0);

  const addFoodEntry = () => {
    if (foodInput && caloriesInput && proteinInput) {
      const newEntry = {
        food: foodInput,
        calories: parseFloat(caloriesInput),
        protein: parseFloat(proteinInput),
      };
      setFoodEntries([...foodEntries, newEntry]);
      console.log("➕ Added new food entry:", newEntry);
      setFoodInput("");
      setCaloriesInput("");
      setProteinInput("");
    } else {
      console.warn("⚠️ Cannot add food entry, missing inputs!");
    }
  };

  const removeFoodEntry = (index) => {
    const updatedEntries = foodEntries.filter((_, i) => i !== index);
    setFoodEntries(updatedEntries);
    console.log("❌ Removed food entry at index:", index);
  };

  return (
    <div className="tracking-card">
      <h2 className="tracking-title">Track Food</h2>
      <p>Log your daily calorie intake to meet your goals.</p>

      <div className="input-fields">
        <input type="text" placeholder="Food Description" value={foodInput} onChange={(e) => setFoodInput(e.target.value)} />
        <input type="number" placeholder="Calories" value={caloriesInput} onChange={(e) => setCaloriesInput(e.target.value)} />
        <input type="number" placeholder="Protein (g)" value={proteinInput} onChange={(e) => setProteinInput(e.target.value)} />
        <button className="tracking-button" onClick={addFoodEntry}>Add Food</button>
      </div>

      <div className="food-dashboard">
        <ul>
          {foodEntries.map((entry, index) => (
            <li key={index}>
              {entry.food} - {entry.calories} kcal, {entry.protein} g protein
              <button className="tracking-button remove-button" onClick={() => removeFoodEntry(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <div className="totals">
          <p><strong>Total Calories:</strong> {totalCalories} kcal</p>
          <p><strong>Total Protein:</strong> {totalProtein} g</p>
        </div>
      </div>
    </div>
  );
};

export default Calories;
