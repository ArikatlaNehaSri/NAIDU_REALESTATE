import { motion } from "framer-motion";
import properties from "../data/properties";
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
  // ✅ Show more properties to make home attractive
  const featuredProperties = properties.slice(0, 6);

  return (
    <div className="text-white">

      {/* SECTION 1 — HERO / BRAND */}
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
          className="text-gray-300 max-w-3xl text-lg md:text-xl leading-relaxed"
        >
          Your trusted real estate partner in Nellore.
          We specialize in verified plots, residential properties,
          and professionally coordinated site visits.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-gray-400 max-w-3xl md:text-lg"
        >
          No fake listings • No direct seller confusion • Only genuine properties
        </motion.p>
      </Section>

      {/* SECTION 2 — FEATURED PROPERTIES */}
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

      {/* SECTION 3 — PROCESS */}
      <Section
        id="process"
        bg="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80"
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
            ["Browse Properties", "View verified listings with accurate details."],
            ["Submit Request", "Request site visit or property information."],
            ["Guided Visit", "Our team assists you during the site visit."],
            ["Close Safely", "We support documentation and negotiations."],
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

      {/* SECTION 4 — WHY US */}
      <Section
        id="why-us"
        bg="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80"
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
            ["Verified Listings Only", "Every property is thoroughly verified."],
            ["Transparent Broker Model", "Clear communication with no confusion."],
            ["Local Area Expertise", "Deep knowledge of Nellore market trends."],
          ].map(([title, desc], i) => (
            <motion.div key={i} variants={fadeUp}>
              <h3 className="text-yellow-400 font-semibold mb-2">{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-yellow-500 text-black text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Looking to Buy or Sell Property?
        </h2>
        <p className="mb-6 text-lg">
          Get verified listings and professional guidance from start to finish.
        </p>
        <a
          href="/properties"
          className="inline-block bg-black text-yellow-400 px-8 py-3 rounded font-semibold hover:bg-gray-900 transition"
        >
          Explore Properties
        </a>
      </section>

      {/* FAQ */}
      <Section
        id="contact"
        bg="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80"
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
              "Please send them via WhatsApp for faster approval.",
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

    </div>
  );
};

export default Home;
