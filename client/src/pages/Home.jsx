import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, limit } from "firebase/firestore";
import { db } from "../firebase/config";
import PropertyCard from "../components/PropertyCard";
import { FaInstagram, FaYoutube } from "react-icons/fa";

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

  /* 🔥 Load real properties from Firebase */
  useEffect(() => {
    const q = query(
      collection(db, "properties"),
      where("approved", "==", true),
      limit(3)
    );

    const unsub = onSnapshot(q, (snap) => {
      setFeaturedProperties(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    });

    return () => unsub();
  }, []);

  return (
    <div className="text-white">

      {/* ---------- HERO ---------- */}
      <Section
        id="home"
        bg="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
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
          className="text-gray-300 max-w-3xl text-lg md:text-xl leading-relaxed"
        >
          Your trusted real estate partner in Nellore.
          We specialize in verified plots, residential properties,
          and professionally guided site visits.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-gray-400 max-w-3xl md:text-lg"
        >
          No fake listings • Safe legal verification • Trusted local experts
        </motion.p>
      </Section>

      {/* ---------- FEATURED PROPERTIES ---------- */}
      <Section
        id="featured"
        bg="https://images.unsplash.com/photo-1501183638710-841dd1904471"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-8">
          Featured Properties
        </h2>

        {featuredProperties.length === 0 ? (
          <p className="text-gray-400">No properties available yet.</p>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {featuredProperties.map((p) => (
              <motion.div
                key={p.id}
                variants={fadeUp}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 12px 30px rgba(250,204,21,0.2)",
                }}
              >
                <PropertyCard property={p} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <a
          href="/properties"
          className="inline-block mt-10 bg-yellow-500 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-400 transition"
        >
          View All Properties
        </a>
      </Section>

      {/* ---------- TRUST STATS ---------- */}
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

      {/* ---------- PROCESS ---------- */}
      <Section
        id="process"
        bg="https://images.unsplash.com/photo-1484154218962-a197022b5858"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-10">
          How Our Process Works
        </h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-10 text-gray-300 max-w-6xl"
        >
          {[
            ["Browse Properties", "View verified listings with full details."],
            ["Submit Request", "Request site visit or more information."],
            ["Guided Visit", "Our team assists you during site visit."],
            ["Close Safely", "We support legal process & negotiations."],
          ].map(([title, desc], i) => (
            <motion.div key={i} variants={fadeUp}>
              <h3 className="text-yellow-400 font-semibold mb-2">
                {i + 1}. {title}
              </h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ---------- WHY US ---------- */}
      <Section
        id="why-us"
        bg="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-10">
          Why Choose Naidu Real Estate
        </h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-12 max-w-6xl text-gray-300"
        >
          {[
            ["Verified Listings Only", "Every property is legally verified."],
            ["Transparent Broker Model", "Clear communication, no confusion."],
            ["Local Area Expertise", "Deep knowledge of Nellore market."],
          ].map(([title, desc], i) => (
            <motion.div key={i} variants={fadeUp}>
              <h3 className="text-yellow-400 font-semibold mb-2">{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ---------- CTA ---------- */}
      <section className="py-20 bg-yellow-500 text-black text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Looking to Buy or Sell Property?
        </h2>
        <p className="mb-6 text-lg">
          Get verified listings and expert guidance from start to finish.
        </p>
        <a
          href="/properties"
          className="inline-block bg-black text-yellow-400 px-8 py-3 rounded font-semibold hover:bg-gray-900 transition"
        >
          Explore Properties
        </a>
      </section>

      {/* ---------- FAQ ---------- */}
      <Section
        id="faq"
        bg="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-8">
          Frequently Asked Questions
        </h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl space-y-8 text-gray-300 md:text-lg"
        >
          {[
            [
              "Do you allow direct seller contact?",
              "No. All communication is handled by our team for safety.",
            ],
            [
              "Are the properties genuine?",
              "Yes. Every listing is verified before publishing.",
            ],
            [
              "How to send photos/videos?",
              "Send via WhatsApp for faster approval and response.",
            ],
          ].map(([q, a], i) => (
            <motion.p key={i} variants={fadeUp}>
              <span className="text-yellow-400 font-semibold">{q}</span>
              <br />
              {a}
            </motion.p>
          ))}
        </motion.div>
      </Section>
{/* ---------- FOLLOW US ON ---------- */}
<section className="py-16 bg-black text-center border-t border-gray-800">
  <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4">
    Follow Us On
  </h2>

  <p className="text-gray-400 mb-6">
    Stay updated with latest properties, site visits, and real estate tips.
  </p>

  <div className="flex justify-center gap-8 text-4xl">

    <a
      href="https://instagram.com/yourusername"
      target="_blank"
      rel="noopener noreferrer"
      className="text-pink-500 hover:scale-110 transition"
    >
      <FaInstagram />
    </a>

    <a
      href="https://youtube.com/yourchannel"
      target="_blank"
      rel="noopener noreferrer"
      className="text-red-500 hover:scale-110 transition"
    >
      <FaYoutube />
    </a>

  </div>
</section>

    </div>
  );
};

export default Home;
