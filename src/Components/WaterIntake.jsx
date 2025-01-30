import React, { useState, useEffect } from "react";
import { FaTint } from "react-icons/fa";

const WaterIntake = ({ resetKey }) => {
  const [waterDrops, setWaterDrops] = useState(Array(8).fill(false));

  // ✅ Load data from Local Storage when component mounts
  useEffect(() => {
    const savedWater = localStorage.getItem("waterDrops");
    if (savedWater) {
      try {
        const parsedWater = JSON.parse(savedWater);
        if (Array.isArray(parsedWater) && parsedWater.length === 8) {
          setWaterDrops(parsedWater);
          console.log("✅ Loaded water intake from Local Storage:", parsedWater);
        } else {
          console.warn("⚠️ Invalid waterDrops data in Local Storage, resetting...");
          localStorage.removeItem("waterDrops");
        }
      } catch (error) {
        console.error("🚨 Error parsing waterDrops from Local Storage:", error);
        localStorage.removeItem("waterDrops");
      }
    }
  }, []);

  // ✅ Save to Local Storage whenever waterDrops change
  useEffect(() => {
    if (waterDrops.some(Boolean)) { // Only save if at least one value is true
      localStorage.setItem("waterDrops", JSON.stringify(waterDrops));
      console.log("💾 Saved water intake to Local Storage:", waterDrops);
    }
  }, [waterDrops]);

  // ✅ Reset state ONLY when "Clear All" is clicked
  useEffect(() => {
    if (resetKey > 0) { // Prevent clearing on first load
      setWaterDrops(Array(8).fill(false));
      localStorage.removeItem("waterDrops");
      console.log("🗑️ Cleared all water intake data");
    }
  }, [resetKey]);

  // ✅ Toggle individual water drops
  const toggleDrop = (index) => {
    setWaterDrops((prev) => {
      const updatedDrops = [...prev];
      updatedDrops[index] = !updatedDrops[index];
      return updatedDrops;
    });
  };

  return (
    <div className="tracking-card">
      <h2 className="tracking-title">Water Intake</h2>
      <p>Click a drop for each cup of water you drink.</p>
      <div className="water-drops">
        {waterDrops.map((clicked, index) => (
          <FaTint
            key={index}
            className={`water-drop ${clicked ? "clicked" : ""}`}
            onClick={() => toggleDrop(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default WaterIntake;
