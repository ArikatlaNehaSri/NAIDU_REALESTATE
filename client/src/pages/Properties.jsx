import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";

/* ---------- Animations ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Properties = () => {
  const [filters, setFilters] = useState({});
  const [properties, setProperties] = useState([]);

  /* ---------- LOAD PROPERTIES ---------- */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(stored);
  }, []);

  /* ---------- APPLY FILTERS ---------- */
  const filtered = properties.filter((p) => {
    return (
      (!filters.type || p.type === filters.type) &&
      (!filters.location ||
        p.location?.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.budget ||
        Number(p.price) <= Number(filters.budget))
    );
  });

  return (
    <div className="px-6 md:px-14 py-10 text-white min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">
        All Properties
      </h1>

      <p className="text-gray-400 mb-6 max-w-3xl">
        Browse verified properties and filter them based on your budget,
        location, and property type.
      </p>

      {/* FILTERS */}
      <PropertyFilters filters={filters} setFilters={setFilters} />

      {/* PROPERTY LIST */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="grid md:grid-cols-3 gap-8"
      >
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <motion.div key={p.id} variants={fadeUp}>
              <PropertyCard property={p} />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 col-span-3">
            No properties match your filters.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Properties;
