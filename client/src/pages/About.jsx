import { motion } from "framer-motion";

const About = () => {
  return (
    <div
      className="
        px-5 sm:px-6 md:px-14
        py-14 sm:py-16
        bg-black text-white min-h-screen
        pt-[calc(env(safe-area-inset-top)+56px)]
        pb-[env(safe-area-inset-bottom)]
      "
    >
      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-6"
      >
        About Naidu Real Estate
      </motion.h1>

      {/* COMPANY INTRO */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-300 max-w-4xl text-base sm:text-lg leading-relaxed"
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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-12 sm:mt-14 text-center">
        {[
          { value: "500+", label: "Verified Properties" },
          { value: "300+", label: "Happy Clients" },
          { value: "10+ Years", label: "Local Experience" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#111] border border-gray-700 p-6 rounded-xl hover:border-yellow-400 transition"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400">
              {item.value}
            </h3>
            <p className="text-gray-400 mt-2">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* FOUNDERS */}
      <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mt-16 sm:mt-20 mb-8 sm:mb-10">
        Our Leadership
      </h2>

      <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-5xl">
        {/* FOUNDER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#111] border border-gray-700 rounded-xl p-6 text-center hover:border-yellow-400 transition"
        >
          <img
            src="/founder.jpg"
            alt="Venkateswarlu Arikatla Founder of Naidu Real Estate Nellore"
            loading="lazy"
            className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full mx-auto mb-4 border-4 border-yellow-400"
          />

          <h3 className="text-lg sm:text-xl font-semibold text-yellow-400">
            VENKATESWARLU ARIKATLA
          </h3>
          <p className="text-gray-400">Founder</p>

          <p className="text-gray-300 mt-4 text-sm leading-relaxed">
            Vision-driven real estate entrepreneur with deep local knowledge of
            the Nellore property market. Experienced in buyer & seller
            relationships, property verification, negotiations, and complete
            transaction support. Committed to transparent and trustworthy
            real-estate services.
          </p>
        </motion.div>

        {/* CO-FOUNDER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-[#111] border border-gray-700 rounded-xl p-6 text-center hover:border-yellow-400 transition"
        >
          <img
            src="/cofounder.jpg"
            alt="Nehasri Arikatla Co-Founder of Naidu Real Estate Nellore"
            loading="lazy"
            className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full mx-auto mb-4 border-4 border-yellow-400"
          />

          <h3 className="text-lg sm:text-xl font-semibold text-yellow-400">
            NEHASRI ARIKATLA
          </h3>
          <p className="text-gray-400">Co-Founder</p>

          <p className="text-gray-300 mt-4 text-sm leading-relaxed">
            Handles the digital side of Naidu Real Estate including website
            management, YouTube content, social media presence, and online
            customer support. Focused on using technology and digital marketing
            to make property searching simple, transparent, and accessible for
            modern buyers.
          </p>
        </motion.div>
      </div>

      {/* MISSION */}
      <div className="mt-16 sm:mt-20 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4">
          Our Mission
        </h2>

        <p className="text-gray-300 leading-relaxed">
          To provide <strong>100% verified properties</strong>, eliminate fake
          listings, ensure safe legal documentation, and deliver a smooth,
          transparent, and technology-driven real estate experience for every
          customer.
        </p>

        <p className="text-gray-500 mt-6 text-sm">
          Founder of Naidu Real Estate Nellore —
          <strong> Venkateswarlu Arikatla</strong>.
        </p>
      </div>
    </div>
  );
};

export default About;
