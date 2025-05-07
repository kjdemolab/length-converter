import { useState, useMemo } from "react";

// Conversion rates between units
const conversionRates = {
  meter: 1,
  centimeter: 100,
  inch: 39.3701,
  foot: 3.28084,
  kilometer: 0.001,
  mile: 0.000621371,
  yard: 1.09361,
};

// Tooltip descriptions for units
const unitDescriptions = {
  meter: "Base unit of length (m)",
  centimeter: "One hundredth of a meter (cm)",
  inch: "Imperial unit (in)",
  foot: "Imperial unit (ft)",
  kilometer: "1,000 meters (km)",
  mile: "Imperial unit of distance (mi)",
  yard: "Imperial unit (yd)",
};

export default function App() {
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("inch");
  const [fade, setFade] = useState(false);

  // Calculate converted value whenever inputs change
  const converted = useMemo(() => {
    const val = parseFloat(value);
    if (isNaN(val)) return null;
    setFade(true); // trigger fade when value changes
    setTimeout(() => setFade(false), 300);
    return (val / conversionRates[fromUnit]) * conversionRates[toUnit];
  }, [value, fromUnit, toUnit]);

  // Swap function
  function swapUnits() {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Length Converter</h1>
        <p className="text-lg">Convert length units instantly</p>
      </header>

      {/* Main Section */}
      <main className="max-w-xl mx-auto space-y-6 bg-white text-gray-800 p-6 rounded-lg shadow-xl">
        {/* Converted Result */}
        <div className="p-4 mb-4 rounded bg-indigo-100 text-center">
          <label className="block text-sm font-medium text-indigo-600">Converted Result</label>
          <div className={`text-3xl font-bold transition-opacity duration-500 ease-in-out ${fade ? "opacity-0" : "opacity-100"}`}>
            {converted !== null ? converted.toFixed(4) : "Invalid input"}
          </div>
        </div>

        {/* Input Value */}
        <div>
          <label className="block mb-1 font-medium">Value</label>
          <input
            className="w-full border rounded px-4 py-2 transition duration-300"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        {/* From/To Selectors */}
        <div className="grid grid-cols-2 gap-4">
          <div title={unitDescriptions[fromUnit]}>
            <label className="block mb-1 font-medium">From</label>
            <select
              className="w-full border rounded px-4 py-2"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
            >
              {Object.keys(conversionRates).map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
          <div title={unitDescriptions[toUnit]}>
            <label className="block mb-1 font-medium">To</label>
            <select
              className="w-full border rounded px-4 py-2"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
            >
              {Object.keys(conversionRates).map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="text-center">
          <button
            onClick={swapUnits}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition duration-200"
          >
            🔁 Swap Units
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-white/80">
        © {new Date().getFullYear()} KJ Demo Lab - Length Converter — Side Hustle Project
      </footer>
    </div>
  );
}