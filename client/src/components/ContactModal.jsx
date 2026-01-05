const ContactModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="relative bg-[#111] w-full max-w-md p-6 rounded border border-yellow-600 text-white">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-400 hover:text-yellow-400"
        >
          ✕
        </button>

        <h2 className="text-xl text-yellow-400 font-semibold mb-4">
          Contact Us
        </h2>

        <div className="space-y-4 text-gray-300">

          {/* PHONE */}
          <p>
            📞 Phone:{" "}
            <a
              href="tel:+918500662449"
              className="text-yellow-400 underline"
            >
              +91 8500662449
            </a>
          </p>

          {/* WHATSAPP */}
          <p>
            💬 WhatsApp:{" "}
            <a
              href="https://wa.me/918500662449"
              target="_blank"
              className="text-yellow-400 underline"
            >
              Chat on WhatsApp
            </a>
          </p>

          {/* EMAIL */}
          <p>
            ✉️ Email:{" "}
            <a
              href="mailto:arikatlavenkateswarlu668@gmail.com"
              className="text-yellow-400 underline"
            >
              arikatlavenkateswarlu668@gmail.com
            </a>
          </p>

          {/* SOCIAL */}
          <div className="pt-4 border-t border-gray-600">
            <p className="mb-2 font-semibold text-gray-400">
              Follow Us
            </p>

            <div className="flex gap-6">
              <a
                href="https://www.youtube.com/@arikatlavenkateswarlu668"
                target="_blank"
                className="hover:text-yellow-400"
              >
                ▶️ YouTube
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="hover:text-yellow-400"
              >
                📸 Instagram
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactModal;
