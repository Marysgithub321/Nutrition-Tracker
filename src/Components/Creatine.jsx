import React, { useState, useEffect } from "react";
import { FaBottleWater, FaPills } from "react-icons/fa6"; // Import the bottle and pills icons

const CreatineTracker = ({ resetKey }) => {
  // ✅ State for creatine bottle & pills
  const [creatineState, setCreatineState] = useState({ bottle: false, pills: false });

  // ✅ Load saved data from Local Storage when the app starts
  useEffect(() => {
    const savedCreatine = localStorage.getItem("creatineTracker");
    if (savedCreatine) {
      try {
        const parsedCreatine = JSON.parse(savedCreatine);
        if (typeof parsedCreatine === "object" && parsedCreatine !== null) {
          setCreatineState({
            bottle: parsedCreatine.bottle || false,
            pills: parsedCreatine.pills || false
          });
          console.log("✅ Loaded creatine data from Local Storage:", parsedCreatine);
        } else {
          console.warn("⚠️ Invalid creatine data in Local Storage, resetting...");
          localStorage.removeItem("creatineTracker");
        }
      } catch (error) {
        console.error("🚨 Error parsing creatineTracker from Local Storage:", error);
        localStorage.removeItem("creatineTracker");
      }
    }
  }, []);

  // ✅ Save to Local Storage whenever state changes
  useEffect(() => {
    if (creatineState.bottle || creatineState.pills) { // Only save if at least one is clicked
      localStorage.setItem("creatineTracker", JSON.stringify(creatineState));
      console.log("💾 Saved creatineTracker to Local Storage:", creatineState);
    }
  }, [creatineState]);

  // ✅ Reset state ONLY when "Clear All" is clicked
  useEffect(() => {
    if (resetKey > 0) { // Prevent clearing on first load
      setCreatineState({ bottle: false, pills: false });
      localStorage.removeItem("creatineTracker");
      console.log("🗑️ Cleared all creatine data");
    }
  }, [resetKey]);

  // ✅ Toggle Creatine Bottle & Pills
  const toggleCreatine = (type) => {
    setCreatineState((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="tracking-card">
      <h2 className="tracking-title">Creatine/Supplements</h2>
      <p>Click to track supplement intake.</p>

      <div className="supplement-container">
        {/* ✅ Creatine Bottle */}
        <div className="supplement-item">
          <label>Plexus</label>
          <FaBottleWater
            className={`supplement-icon ${creatineState.bottle ? "clicked" : ""}`}
            onClick={() => toggleCreatine("bottle")}
          />
        </div>

        {/* ✅ Creatine Pills */}
        <div className="supplement-item">
          <label>Creatine</label>
          <FaPills
            className={`supplement-icon ${creatineState.pills ? "clicked" : ""}`}
            onClick={() => toggleCreatine("pills")}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatineTracker;
