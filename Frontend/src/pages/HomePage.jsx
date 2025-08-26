import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const medicines = [
  { name: "Paracetamol", category: "OTC" },
  { name: "Amoxicillin", category: "Prescription" },
  { name: "Vitamin C", category: "Supplements" },
  { name: "Ibuprofen", category: "OTC" },
];

const categories = ["All", "OTC", "Prescription", "Supplements"];

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredMedicines =
    selectedCategory === "All"
      ? medicines
      : medicines.filter((med) => med.category === selectedCategory);

  return (
    <div className="font-sans text-gray-800">
      {/* Top Bar */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left: Categories */}
          <div className="flex items-center space-x-4">
            <select
              className="p-2 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Center: Logo */}
          <h1 className="text-2xl font-bold">AUST PHARMA</h1>

          {/* Right: Buttons */}
          <div className="flex items-center space-x-4">
            <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition">
              Contact
            </button>
            <button
              className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition">
              Prescription
            </button>
          </div>
        </div>
      </header>

      {/* Medicines Grid */}
      <section className="py-8">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedicines.map((med, idx) => (
            <div
              key={idx}
              className="bg-white p-4 shadow-lg rounded-lg text-center"
            >
              <h3 className="text-lg font-semibold">{med.name}</h3>
              <p className="text-sm text-gray-500">{med.category}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
