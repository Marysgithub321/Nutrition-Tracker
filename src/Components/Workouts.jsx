import React, { useState, useEffect } from "react";
import { FaRunning, FaDumbbell } from "react-icons/fa";
import { GiBodyBalance, GiWeightLiftingUp } from "react-icons/gi";

const Workouts = ({ resetKey }) => {
  // ✅ State for all workout activities
  const [workoutState, setWorkoutState] = useState({
    running: false,
    strength: false,
    sitUps: [false, false, false, false],
    squats: [false, false, false, false]
  });

  // ✅ Load saved data from Local Storage when the app starts
  useEffect(() => {
    const savedWorkouts = localStorage.getItem("workouts");
    if (savedWorkouts) {
      try {
        const parsedWorkouts = JSON.parse(savedWorkouts);
        if (typeof parsedWorkouts === "object" && parsedWorkouts !== null) {
          setWorkoutState({
            running: parsedWorkouts.running || false,
            strength: parsedWorkouts.strength || false,
            sitUps: parsedWorkouts.sitUps || [false, false, false, false],
            squats: parsedWorkouts.squats || [false, false, false, false]
          });
          console.log("✅ Loaded workouts from Local Storage:", parsedWorkouts);
        } else {
          console.warn("⚠️ Invalid workout data in Local Storage, resetting...");
          localStorage.removeItem("workouts");
        }
      } catch (error) {
        console.error("🚨 Error parsing workouts from Local Storage:", error);
        localStorage.removeItem("workouts");
      }
    }
  }, []);

  // ✅ Save to Local Storage whenever state changes
  useEffect(() => {
    if (
      workoutState.running ||
      workoutState.strength ||
      workoutState.sitUps.some(Boolean) ||
      workoutState.squats.some(Boolean)
    ) {
      localStorage.setItem("workouts", JSON.stringify(workoutState));
      console.log("💾 Saved workouts to Local Storage:", workoutState);
    }
  }, [workoutState]);

  // ✅ Reset state ONLY when "Clear All" is clicked
  useEffect(() => {
    if (resetKey > 0) { // Prevent clearing on first load
      setWorkoutState({
        running: false,
        strength: false,
        sitUps: [false, false, false, false],
        squats: [false, false, false, false]
      });
      localStorage.removeItem("workouts");
      console.log("🗑️ Cleared all workout data");
    }
  }, [resetKey]);

  // ✅ Toggle workout completion
  const toggleWorkout = (type, index = null) => {
    setWorkoutState((prev) => {
      if (index !== null) {
        // Toggle a specific sit-up or squat set
        return {
          ...prev,
          [type]: prev[type].map((done, i) => (i === index ? !done : done))
        };
      } else {
        // Toggle running or strength training
        return { ...prev, [type]: !prev[type] };
      }
    });
  };

  return (
    <div className="tracking-card">
      <h2 className="tracking-title">Workouts</h2>
      <p>Log your workouts and track your fitness progress.</p>

      {/* ✅ Running (One-time Click) */}
      <div className="workout-item">
        <p>Running</p>
        <FaRunning
          className={`workout-icon ${workoutState.running ? "completed" : ""}`}
          onClick={() => toggleWorkout("running")}
        />
      </div>

      {/* ✅ Strength Training (One-time Click) */}
      <div className="workout-item">
        <p>Strength Training</p>
        <FaDumbbell
          className={`workout-icon ${workoutState.strength ? "completed" : ""}`}
          onClick={() => toggleWorkout("strength")}
        />
      </div>

      {/* ✅ Sit-Ups (4 Clickable Icons) */}
      <div className="workout-item">
        <p>Sit-Ups</p>
        <div className="exercise-icons">
          {workoutState.sitUps.map((done, index) => (
            <GiBodyBalance
              key={index}
              className={`workout-icon ${done ? "completed" : ""}`}
              onClick={() => toggleWorkout("sitUps", index)}
            />
          ))}
        </div>
      </div>

      {/* ✅ Squats (4 Clickable Icons) */}
      <div className="workout-item">
        <p>Squats</p>
        <div className="exercise-icons">
          {workoutState.squats.map((done, index) => (
            <GiWeightLiftingUp
              key={index}
              className={`workout-icon ${done ? "completed" : ""}`}
              onClick={() => toggleWorkout("squats", index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
