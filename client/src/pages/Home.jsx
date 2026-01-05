import { motion } from "framer-motion";
import properties from "../data/properties";
import PropertyCard from "../components/PropertyCard";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
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

const Section = ({ bg, children }) => (
  <section
    className="h-screen w-full flex items-center"
    style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="w-full h-full bg-black/75 flex items-center">
      <motion.div
        className="px-14 w-full"
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

const Home = () => {
  return (
    <div className="text-white">

      {/* SECTION 1 — BRAND */}
      <Section bg="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80">
        <motion.h1
          variants={glowText}
          initial="initial"
          animate="animate"
          className="text-6xl font-bold text-yellow-400 mb-6"
        >
          Naidu Real Estate
        </motion.h1>

        <p className="text-gray-300 max-w-3xl text-lg leading-relaxed">
          Your trusted real estate partner in Nellore.  
          We specialize in verified plots, residential properties, and site visits —
          all handled through a transparent, broker-managed process.
        </p>

        <p className="mt-6 text-gray-400 max-w-3xl">
          No fake listings • No direct seller confusion • Only genuine properties
        </p>
      </Section>

      {/* SECTION 2 — PROPERTIES */}
      <Section bg="https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80">
        <h2 className="text-4xl font-bold text-yellow-500 mb-3">
          Featured Properties
        </h2>

        <p className="text-gray-400 mb-6 max-w-3xl">
          Explore verified properties with real video walkthroughs.
          Every listing is personally reviewed before publishing.
        </p>

        <p className="text-gray-500 mb-10 max-w-3xl">
          We focus on clear documentation, genuine pricing,
          and locations with real development potential.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((p) => (
            <motion.div key={p.id} whileHover={{ scale: 1.05 }}>
              <PropertyCard property={p} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* SECTION 3 — HOW IT WORKS */}
      <Section bg="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80">
        <h2 className="text-4xl font-bold text-yellow-500 mb-10">
          How Our Process Works
        </h2>

        <div className="grid md:grid-cols-4 gap-10 text-gray-300 max-w-6xl">
          <div>
            <h3 className="text-yellow-400 font-semibold mb-2">1. Browse</h3>
            <p>View verified properties with real site videos.</p>
          </div>
          <div>
            <h3 className="text-yellow-400 font-semibold mb-2">2. Request Visit</h3>
            <p>Submit a site visit request directly through our platform.</p>
          </div>
          <div>
            <h3 className="text-yellow-400 font-semibold mb-2">3. Guided Visit</h3>
            <p>Our team coordinates and assists you at the site.</p>
          </div>
          <div>
            <h3 className="text-yellow-400 font-semibold mb-2">4. Close Safely</h3>
            <p>We help with negotiation and documentation support.</p>
          </div>
        </div>
      </Section>

      {/* SECTION 4 — WHY CHOOSE US */}
      <Section bg="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80">
        <h2 className="text-4xl font-bold text-yellow-500 mb-10">
          Why Choose Naidu Real Estate
        </h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl text-gray-300">
          <div>
            <h3 className="text-yellow-400 font-semibold mb-2">
              Verified Listings Only
            </h3>
            <p>
              Every property is checked for authenticity, location accuracy,
              and ownership clarity.
            </p>
          </div>

          <div>
            <h3 className="text-yellow-400 font-semibold mb-2">
              Transparent Broker Model
            </h3>
            <p>
              No direct seller confusion. We manage communication professionally.
            </p>
          </div>

          <div>
            <h3 className="text-yellow-400 font-semibold mb-2">
              Local Area Expertise
            </h3>
            <p>
              Deep knowledge of Nellore locations, pricing trends,
              and future development zones.
            </p>
          </div>
        </div>
      </Section>

      {/* SECTION 5 — FAQ */}
      <Section bg="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80">
        <h2 className="text-4xl font-bold text-yellow-500 mb-8">
          Frequently Asked Questions
        </h2>

        <div className="max-w-5xl space-y-6 text-gray-300">
          <p>
            <span className="text-yellow-400 font-semibold">
              Do you allow direct seller contact?
            </span><br />
            No. All communication is handled through our team for safety and clarity.
          </p>

          <p>
            <span className="text-yellow-400 font-semibold">
              Are the properties genuine?
            </span><br />
            Yes. We verify ownership, location, and ground reality before listing.
          </p>

          <p>
            <span className="text-yellow-400 font-semibold">
              Is there any charge for site visits?
            </span><br />
            Site visit policies are explained clearly before scheduling.
          </p>
        </div>
      </Section>

    </div>
  );
};

export default Home;
