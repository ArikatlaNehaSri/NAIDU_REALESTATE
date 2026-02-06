import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import PropertyCard from "../components/PropertyCard";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const snap = await getDocs(collection(db, "properties"));
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperties(data);
      setLoading(false);
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-400 mt-20">
        Loading properties...
      </p>
    );
  }

  return (
    <div className="px-6 md:px-14 py-10 text-white min-h-screen">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">
        Available Properties
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {properties.length === 0 ? (
          <p className="text-gray-400">No properties yet.</p>
        ) : (
          properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))
        )}
      </div>
    </div>
  );
};

export default Properties;
