import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaYoutube, FaInstagram } from "react-icons/fa";
import { useEffect } from "react";

const ContactModal = ({ onClose }) => {
  // prevent background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/70
        flex items-center justify-center
        p-4
      "
    >
      <div
        className="
          relative bg-[#111]
          w-full max-w-md
          max-h-[90vh] overflow-y-auto
          p-6 rounded-xl
          border border-yellow-600
          text-white shadow-2xl
          pt-[env(safe-area-inset-top)]
          pb-[env(safe-area-inset-bottom)]
        "
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-400 hover:text-yellow-400 transition"
        >
          ✕
        </button>

        <h2 className="text-xl text-yellow-400 font-semibold mb-6 text-center">
          Contact Us
        </h2>

        <div className="space-y-5 text-gray-300">

          {/* PHONE */}
          <p className="flex items-center gap-3">
            <FaPhoneAlt className="text-yellow-400 shrink-0" />
            <a
              href="tel:+918500662449"
              className="text-yellow-400 underline hover:text-yellow-300 transition break-all"
            >
              +91 8500662449
            </a>
          </p>

          {/* WHATSAPP */}
          <p className="flex items-center gap-3">
            <FaWhatsapp className="text-green-500 shrink-0" />
            <a
              href="https://wa.me/918500662449"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 underline hover:text-yellow-300 transition break-all"
            >
              Chat on WhatsApp
            </a>
          </p>

          {/* EMAIL */}
          <p className="flex items-center gap-3">
            <FaEnvelope className="text-yellow-400 shrink-0" />
            <a
              href="mailto:arikatlavenkateswarlu668@gmail.com"
              className="text-yellow-400 underline hover:text-yellow-300 transition break-all"
            >
              arikatlavenkateswarlu668@gmail.com
            </a>
          </p>

          {/* SOCIAL */}
          <div className="pt-4 border-t border-gray-700">
            <p className="mb-3 font-semibold text-gray-400 text-center">
              Follow Us
            </p>

            <div className="flex justify-center gap-8 text-2xl">
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@arikatlavenkateswarlu668"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:scale-110 hover:text-red-400 transition"
              >
                <FaYoutube />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/naidu_realestate_nellore?igsh=MXVpNHpmcHA5M21jYw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:scale-110 hover:text-pink-400 transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
