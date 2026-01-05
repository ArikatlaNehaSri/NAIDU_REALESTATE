import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import RequestVisitModal from "../components/RequestVisitModal";
import PostPropertyModal from "../components/PostPropertyModal";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showVisit, setShowVisit] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [active, setActive] = useState("home");

  // Active section highlight
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const onScroll = () => {
      let current = "home";
      sections.forEach((sec) => {
        const offset = sec.offsetTop - 120;
        if (window.scrollY >= offset) {
          current = sec.getAttribute("id");
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
        className="fixed top-0 left-0 w-full z-50
                   bg-[#0b0b0b]/90 backdrop-blur-md
                   text-white px-6 py-4
                   flex justify-between items-center
                   border-b border-yellow-600"
      >
        {/* Brand */}
        <div className="text-xl font-semibold tracking-wide">
          <span className="text-yellow-400">Naidu</span> Real Estate
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          <li className={linkClass("home")} onClick={() => document.getElementById("home")?.scrollIntoView()}>
            Home
          </li>
          <li className={linkClass("properties")} onClick={() => document.getElementById("properties")?.scrollIntoView()}>
            Properties
          </li>
          <li className={linkClass("why-us")} onClick={() => document.getElementById("why-us")?.scrollIntoView()}>
            Why Us
          </li>
        </ul>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowPost(true)}
            className="border border-yellow-500 text-yellow-400 px-4 py-2 rounded text-sm hover:bg-yellow-500 hover:text-black transition"
          >
            Post Property
          </button>

          <button
            onClick={() => setShowVisit(true)}
            className="bg-yellow-500 text-black px-4 py-2 rounded text-sm font-semibold hover:bg-yellow-400 transition"
          >
            Request Visit
          </button>

          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed top-16 left-0 w-full bg-black/95 text-white z-40 md:hidden">
          <ul className="flex flex-col items-center gap-6 py-8">
            <li onClick={() => {document.getElementById("home")?.scrollIntoView(); setOpen(false);}}>Home</li>
            <li onClick={() => {document.getElementById("properties")?.scrollIntoView(); setOpen(false);}}>Properties</li>
            <li onClick={() => {document.getElementById("why-us")?.scrollIntoView(); setOpen(false);}}>Why Us</li>
            <li>
              <button
                onClick={() => { setShowPost(true); setOpen(false); }}
                className="border border-yellow-500 px-6 py-2 rounded"
              >
                Post Property
              </button>
            </li>
            <li>
              <button
                onClick={() => { setShowVisit(true); setOpen(false); }}
                className="bg-yellow-500 text-black px-6 py-2 rounded"
              >
                Request Visit
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Modals */}
      {showVisit && <RequestVisitModal onClose={() => setShowVisit(false)} />}
      {showPost && <PostPropertyModal onClose={() => setShowPost(false)} />}
    </>
  );
};

export default Navbar;
