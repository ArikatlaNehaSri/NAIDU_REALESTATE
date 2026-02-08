import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const PostPropertyModal = ({ onClose }) => {
  const [form, setForm] = useState({
    ownerName: "",
    phone: "",
    type: "House",
    location: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.ownerName || !form.phone) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "sellRequests"), {
        ...form,
        createdAt: serverTimestamp(),
      });

      alert(
        "Request submitted. Admin will contact you.\nFor faster approval, send photos via WhatsApp."
      );

      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔒 Lock background scroll + ESC close support
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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div
        className="
          bg-[#111] p-6 rounded-xl
          w-full max-w-md sm:max-w-lg md:max-w-xl
          max-h-[90vh] overflow-y-auto
          pt-[env(safe-area-inset-top)]
          pb-[env(safe-area-inset-bottom)]
          shadow-2xl
        "
      >
        <h3 className="text-yellow-400 text-lg mb-4">
          Post Property Request
        </h3>

        <input
          className="input mb-3 w-full"
          name="ownerName"
          placeholder="Your Name"
          onChange={handleChange}
        />

        <input
          className="input mb-3 w-full"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <select
          className="input mb-3 w-full"
          name="type"
          onChange={handleChange}
          defaultValue="House"
        >
          <option>House</option>
          <option>Plot</option>
          <option>Land</option>
        </select>

        <input
          className="input mb-3 w-full"
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />

        <input
          className="input mb-4 w-full"
          name="price"
          placeholder="Expected Price"
          onChange={handleChange}
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={submit}
            disabled={loading}
            className="bg-yellow-500 text-black px-4 py-2 rounded flex-1 min-h-[44px] font-semibold hover:bg-yellow-400 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          <button
            onClick={onClose}
            className="bg-gray-700 px-4 py-2 rounded flex-1 min-h-[44px] hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPropertyModal;
