import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import PropertyCard from "../components/PropertyCard";

/* ---------- Animation Presets ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const glowText = {
  initial: { textShadow: "0px 0px 0px #facc15" },
  animate: {
    textShadow: [
      "0px 0px 6px #facc15",
      "0px 0px 18px #facc15",
      "0px 0px 6px #facc15",
    ],
    transition: { duration: 2, repeat: Infinity },
  },
};

/* ---------- Section Wrapper ---------- */

const Section = ({ id, bg, children }) => (
  <section
    id={id}
    className="h-screen w-full flex items-center"
    style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="w-full h-full bg-black/75 flex items-center">
      <motion.div
        className="px-6 md:px-14 w-full"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </div>
  </section>
);

/* ---------- Home ---------- */

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);

  /* 🔥 LOAD REAL PROPERTIES FROM FIRESTORE */
  useEffect(() => {
    const q = query(
      collection(db, "properties"),
      where("approved", "==", true)
    );

    const unsub = onSnapshot(q, (snap) => {
      setFeaturedProperties(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })).slice(0, 6)
      );
    });

    return () => unsub();
  }, []);

  return (
    <div className="text-white">

      {/* HERO */}
      <Section
        id="home"
        bg="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
      >
        <motion.h1
          variants={glowText}
          initial="initial"
          animate="animate"
          className="text-6xl md:text-7xl font-bold text-yellow-400 mb-6"
        >
          Naidu Real Estate
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-gray-300 max-w-3xl text-lg md:text-xl"
        >
          Your trusted real estate partner in Nellore.
          We provide verified plots, houses, and safe site visits.
        </motion.p>
      </Section>

      {/* FEATURED PROPERTIES */}
      <Section
        id="featured"
        bg="https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-8">
          Featured Properties
        </h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {featuredProperties.length === 0 ? (
            <p className="text-gray-400">No properties yet.</p>
          ) : (
            featuredProperties.map((p) => (
              <motion.div key={p.id} variants={fadeUp}>
                <PropertyCard property={p} />
              </motion.div>
            ))
          )}
        </motion.div>

        <a
          href="/properties"
          className="inline-block mt-10 bg-yellow-500 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-400 transition"
        >
          View All Properties
        </a>
      </Section>

      {/* TRUST STATS */}
      <section className="py-20 bg-black text-center">
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div>
            <h3 className="text-4xl font-bold text-yellow-400">500+</h3>
            <p className="text-gray-400 mt-2">Verified Properties</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-yellow-400">300+</h3>
            <p className="text-gray-400 mt-2">Happy Clients</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-yellow-400">10+ Years</h3>
            <p className="text-gray-400 mt-2">Local Experience</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
