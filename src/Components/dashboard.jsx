import React, { useState } from "react";
import HeaderImage from "@/assets/Header.png";
import WaterIntake from "./WaterIntake"; 
import CreatineTracker from "./Creatine"; 
import Calories from "./Calories"; 
import Workouts from "./Workouts"; 

const Dashboard = () => {
  const [resetKey, setResetKey] = useState(0);

  const clearAll = () => {
    setResetKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <img src={HeaderImage} alt="Header" className="header-image" />
      </header>

      {/* Tracking Cards */}
      <main className="dashboard-content">
        <Calories resetKey={resetKey} />
        <WaterIntake resetKey={resetKey} />
        <CreatineTracker resetKey={resetKey} />
        <Workouts resetKey={resetKey} />

        {/* Clear All Button */}
        <button className="clear-button" onClick={clearAll}>
          Clear All
        </button>
      </main>
    </div>
  );
};

export default Dashboard;
