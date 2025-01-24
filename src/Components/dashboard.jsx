import React, { useState } from 'react';
import { CalendarDaysIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { WaterDropIcon } from '@heroicons/react/24/solid';

import { FaDumbbell } from 'react-icons/fa';
import { MdOutlineFastfood } from 'react-icons/md';

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="flex justify-between items-center p-4 bg-darkblue text-white">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={() => alert('Calendar popup')}
          className="flex items-center bg-lightblue text-white py-2 px-4 rounded shadow hover:bg-darkblue hover:shadow-lg transition"
        >
          <CalendarIcon className="h-5 w-5 mr-2" />
          Select Date
        </button>
      </header>

      {/* Cards Section */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Hydration Card */}
        <div
          className="bg-white border-2 border-lightblue rounded-lg shadow p-4 hover:shadow-xl transition cursor-pointer"
          onClick={() => alert('Navigate to Hydration Page')}
        >
          <h2 className="text-xl font-bold text-darkgray mb-4">
            Hydration / Supplements
          </h2>
          <div className="flex gap-2 mb-4">
            {[...Array(8)].map((_, idx) => (
              <WaterIcon key={idx} className="h-6 w-6 text-lightblue" />
            ))}
          </div>
          <div className="flex gap-2">
            <BeakerIcon className="h-6 w-6 text-darkblue" />
          </div>
        </div>

        {/* Nutrition Card */}
        <div
          className="bg-white border-2 border-lightblue rounded-lg shadow p-4 hover:shadow-xl transition cursor-pointer"
          onClick={() => alert('Navigate to Nutrition Page')}
        >
          <h2 className="text-xl font-bold text-darkgray mb-4">Nutrition</h2>
          <div className="flex justify-between w-full px-4">
            <div>
              <h3 className="text-lg text-lightblue">Protein</h3>
              <input
                type="range"
                min="0"
                max="200"
                className="w-24"
                onChange={(e) => console.log(`Protein: ${e.target.value}`)}
              />
            </div>
            <div>
              <h3 className="text-lg text-lightblue">Calories</h3>
              <input
                type="range"
                min="0"
                max="3000"
                className="w-24"
                onChange={(e) => console.log(`Calories: ${e.target.value}`)}
              />
            </div>
          </div>
        </div>

        {/* Workouts Card */}
        <div
          className="bg-white border-2 border-lightblue rounded-lg shadow p-4 hover:shadow-xl transition cursor-pointer"
          onClick={() => alert('Navigate to Workouts Page')}
        >
          <h2 className="text-xl font-bold text-darkgray mb-4">Workouts</h2>
          <div className="flex gap-4">
            <FaDumbbell className="h-6 w-6 text-darkblue" />
            <MdOutlineFastfood className="h-6 w-6 text-lightblue" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
