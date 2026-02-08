const WhatsAppButton = () => {
  const phone = "918500662449"; // WhatsApp requires number without +

  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed z-50
        right-4 sm:right-6
        bottom-[calc(5rem+env(safe-area-inset-bottom))]
        bg-green-500 text-white
        px-4 py-3
        rounded-full
        shadow-lg
        hover:scale-110 active:scale-95
        transition
        min-h-[44px]
        flex items-center justify-center
      "
    >
      💬 WhatsApp
    </a>
  );
};

export default WhatsAppButton;
