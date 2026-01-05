const Footer = () => {
  return (
    <footer
      className="fixed bottom-0 left-0 w-full z-40
                 bg-[#0b0b0b]/90 backdrop-blur-md
                 text-gray-400 text-center py-3
                 border-t border-yellow-600"
    >
      <p className="text-sm tracking-wide">
        © {new Date().getFullYear()}{" "}
        <span className="text-yellow-400 font-semibold">
          NAIDU REAL ESTATE
        </span>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
