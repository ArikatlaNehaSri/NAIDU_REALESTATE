import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="px-6 md:px-14 py-16 bg-black text-white min-h-screen">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6"
      >
        About Naidu Real Estate
      </motion.h1>

      {/* COMPANY INTRO (SEO IMPORTANT) */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-300 max-w-4xl text-lg leading-relaxed"
      >
        <strong>Naidu Real Estate</strong> is a trusted property consultancy
        based in <strong>Nellore, Andhra Pradesh</strong>, providing verified
        plots, houses, and land listings with complete transparency and
        professional guidance.
        <br /><br />
        Founded by <strong>Venkateswarlu Arikatla</strong> and co-founded by
        <strong> Nehasri Arikatla</strong>, the company brings
        <strong> 10+ years of real estate experience</strong> in helping families
        and investors find safe, genuine, and legally secure property
        opportunities in Nellore and nearby regions.
      </motion.p>

      {/* TRUST STATS */}
      <div className="grid md:grid-cols-3 gap-8 mt-14 text-center">
        {[
          { value: "500+", label: "Verified Properties" },
          { value: "300+", label: "Happy Clients" },
          { value: "10+ Years", label: "Local Experience" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#111] border border-gray-700 p-6 rounded-xl hover:border-yellow-400 transition"
          >
            <h3 className="text-3xl font-bold text-yellow-400">{item.value}</h3>
            <p className="text-gray-400 mt-2">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* FOUNDERS SECTION */}
      <h2 className="text-3xl font-bold text-yellow-400 mt-20 mb-10">
        Our Leadership
      </h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl">

        {/* FOUNDER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-[#111] border border-gray-700 rounded-xl p-6 text-center hover:border-yellow-400 transition"
        >
          <img
            src="/founder.jpg"
            alt="Venkateswarlu Arikatla Founder of Naidu Real Estate Nellore"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-yellow-400"
          />

          <h3 className="text-xl font-semibold text-yellow-400">
            VENKATESWARLU ARIKATLA
          </h3>
          <p className="text-gray-400">Founder</p>

          <p className="text-gray-300 mt-4 text-sm leading-relaxed">
            Vision-driven real estate entrepreneur with deep local knowledge of
            the Nellore property market.<strong> Experienced real estate professional managing buyer and seller relationships,
  property verification, negotiations, and complete transaction support.</strong> He is committed to building a
            <strong> transparent, trustworthy, and customer-focused real estate
            service</strong> that helps buyers and sellers make confident
            property decisions with complete legal clarity.
          </p>
        </motion.div>

        {/* CO-FOUNDER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111] border border-gray-700 rounded-xl p-6 text-center hover:border-yellow-400 transition"
        >
          <img
            src="/cofounder.jpg"
            alt="Nehasri Arikatla Co-Founder of Naidu Real Estate Nellore"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-yellow-400"
          />

          <h3 className="text-xl font-semibold text-yellow-400">
            NEHASRI ARIKATLA
          </h3>
          <p className="text-gray-400">Co-Founder</p>

          <p className="text-gray-300 mt-4 text-sm leading-relaxed">
            <p className="text-gray-300 mt-4 text-sm leading-relaxed">
  <strong>Handles the digital side of Naidu Real Estate </strong>including website management,
  YouTube content, social media presence, and online customer support.<strong> Focused
  on using technology and digital marketing to make property searching simple,
  transparent, and accessible for modern buyers.</strong>
</p>

          </p>
        </motion.div>
      </div>

      {/* MISSION */}
      <div className="mt-20 max-w-4xl">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">
          Our Mission
        </h2>

        <p className="text-gray-300 leading-relaxed">
          To provide <strong>100% verified properties</strong>, eliminate fake
          listings, ensure safe legal documentation, and deliver a
          <strong> smooth, transparent, and technology-driven real estate
          experience</strong> for every customer.
        </p>

        {/* SEO LINE FOR GOOGLE */}
        <p className="text-gray-500 mt-6 text-sm">
          Founder of Naidu Real Estate Nellore –
          <strong> Venkateswarlu Arikatla</strong>.
        </p>
      </div>
    </div>
  );
};

export default About;
