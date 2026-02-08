import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import PropertyCard from "../components/PropertyCard";

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);

  /* 🔍 FILTER STATES */
  const [type, setType] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");

  /* 🔥 LOAD FROM FIRESTORE (SAFE FILTER ADDED) */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "properties"), (snap) => {
      const data = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        // ✅ remove empty / broken documents (prevents black dummy card)
        .filter((p) => p.title && p.price && p.location);

      setAllProperties(data);
      setFiltered(data);
    });

    return unsub;
  }, []);

  /* 🔎 APPLY FILTERS */
  useEffect(() => {
    let data = [...allProperties];

    if (type !== "All") {
      data = data.filter((p) => p.type === type);
    }

    if (maxPrice) {
      data = data.filter((p) => Number(p.price) <= Number(maxPrice));
    }

    if (location) {
      data = data.filter((p) =>
        p.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFiltered(data);
  }, [type, maxPrice, location, allProperties]);

  return (
    <div className="px-4 md:px-14 py-10 text-white min-h-screen">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">
        Available Properties
      </h1>

      {/* 🔍 FILTER BAR */}
      <div className="bg-[#111] border border-gray-700 rounded p-4 mb-8 grid gap-4 md:grid-cols-4">

        {/* TYPE */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input"
        >
          <option value="All">All Types</option>
          <option value="House">House</option>
          <option value="Plot">Plot</option>
          <option value="Land">Land</option>
        </select>

        {/* MAX PRICE */}
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="input"
        />

        {/* LOCATION SEARCH */}
        <input
          type="text"
          placeholder="Search Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input"
        />

        {/* RESET BUTTON */}
        <button
          onClick={() => {
            setType("All");
            setMaxPrice("");
            setLocation("");
          }}
          className="bg-yellow-500 text-black rounded font-semibold"
        >
          Reset
        </button>
      </div>

      {/* 📦 PROPERTY GRID */}
      {filtered.length === 0 ? (
        <p className="text-gray-400">No matching properties found.</p>
      ) : (
        // ✅ responsive grid fix (removes empty column on laptop)
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;
