const WhatsAppButton = () => {
  const phone = "+918500662449"; // replace with your WhatsApp number

  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-6 z-50
                 bg-green-500 text-white
                 px-4 py-3 rounded-full
                 shadow-lg hover:scale-110 transition"
    >
      💬 WhatsApp
    </a>
  );
};

export default WhatsAppButton;
