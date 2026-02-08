import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import RequestVisitModal from "../components/RequestVisitModal";
import PostPropertyModal from "../components/PostPropertyModal";
import ContactModal from "../components/ContactModal";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showVisit, setShowVisit] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const location = useLocation();
  const [active, setActive] = useState("home");

  // detect active page
  useEffect(() => {
    if (location.pathname === "/") setActive("home");
    else if (location.pathname === "/properties") setActive("properties");
    else if (location.pathname === "/about") setActive("about");
  }, [location.pathname]);

  // prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  // ESC key close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setShowVisit(false);
        setShowPost(false);
        setShowContact(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const linkClass = (id) =>
    `cursor-pointer transition ${
      active === id ? "text-yellow-400" : "hover:text-yellow-400"
    }`;

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="
          fixed top-0 left-0 w-full z-50
          bg-[#0b0b0b]/90 backdrop-blur-md
          text-white px-4 sm:px-6
          py-3 flex justify-between items-center
          border-b border-yellow-600
          pt-[env(safe-area-inset-top)]
        "
      >
        {/* BRAND */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.jpeg" alt="Naidu Real Estate" className="h-7 sm:h-8 w-auto" />
          <span className="text-base sm:text-lg md:text-xl font-semibold tracking-wide">
            <span className="text-yellow-400">Naidu</span> Real Estate
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium items-center">
          <Link to="/" className={linkClass("home")}>Home</Link>
          <Link to="/properties" className={linkClass("properties")}>Properties</Link>
          <Link to="/about" className={linkClass("about")}>About</Link>

          <li onClick={() => setShowContact(true)} className="cursor-pointer hover:text-yellow-400">
            Contact
          </li>
        </ul>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowPost(true)}
            className="hidden sm:block border border-yellow-500 text-yellow-400 px-3 sm:px-4 py-2 rounded text-xs sm:text-sm hover:bg-yellow-500 hover:text-black transition"
          >
            Post Property
          </button>

          <button
            onClick={() => setShowVisit(true)}
            className="hidden sm:block bg-yellow-500 text-black px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-semibold hover:bg-yellow-400 transition"
          >
            Request Visit
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-2xl px-2"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      {open && (
        <div
          className="
            fixed inset-0 top-[64px]   /* dynamic safe height */
            bg-black/95 text-white z-40 md:hidden
            overflow-y-auto
          "
        >
          <ul className="flex flex-col items-center gap-6 py-8 text-base">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/properties" onClick={() => setOpen(false)}>Properties</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>

            <li
              onClick={() => {
                setShowContact(true);
                setOpen(false);
              }}
              className="cursor-pointer"
            >
              Contact
            </li>

            <button
              onClick={() => {
                setShowPost(true);
                setOpen(false);
              }}
              className="border border-yellow-500 px-6 py-2 rounded"
            >
              Post Property
            </button>

            <button
              onClick={() => {
                setShowVisit(true);
                setOpen(false);
              }}
              className="bg-yellow-500 text-black px-6 py-2 rounded"
            >
              Request Visit
            </button>
          </ul>
        </div>
      )}

      {/* MODALS */}
      {showVisit && (
        <RequestVisitModal
          property={{ id: "general", title: "General Visit Request" }}
          onClose={() => setShowVisit(false)}
        />
      )}

      {showPost && <PostPropertyModal onClose={() => setShowPost(false)} />}
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </>
  );
};

export default Navbar;
