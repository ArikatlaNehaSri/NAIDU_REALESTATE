import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const RequestVisitModal = ({ property, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const submitRequest = async (e) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please enter name and phone");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "visitRequests"), {
        name,
        phone,
        propertyId: property?.id || "general",
        propertyTitle: property?.title || "General Visit Request",
        createdAt: serverTimestamp(),
      });

      alert("Visit request sent successfully ✅");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error sending request");
    } finally {
      setLoading(false);
    }
  };

  // 🔒 Lock background scroll + ESC close
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={submitRequest}
        className="
          w-full max-w-md sm:max-w-lg
          bg-[#111] border border-gray-700
          rounded-2xl p-6 space-y-4
          shadow-2xl
          max-h-[90vh] overflow-y-auto
          pt-[env(safe-area-inset-top)]
          pb-[env(safe-area-inset-bottom)]
        "
      >
        <h2 className="text-yellow-400 text-lg sm:text-xl font-semibold text-center">
          Request Site Visit
        </h2>

        <input
          className="
            w-full px-3 py-2 rounded
            bg-black border border-gray-600
            focus:outline-none focus:border-yellow-400
            min-h-[44px]
          "
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="tel"
          className="
            w-full px-3 py-2 rounded
            bg-black border border-gray-600
            focus:outline-none focus:border-yellow-400
            min-h-[44px]
          "
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={loading}
            className="
              flex-1 bg-yellow-500 text-black
              py-2 rounded-lg font-semibold
              hover:bg-yellow-400 transition
              min-h-[44px] disabled:opacity-60
            "
          >
            {loading ? "Sending..." : "Submit"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="
              flex-1 bg-gray-700
              py-2 rounded-lg
              hover:bg-gray-600 transition
              min-h-[44px]
            "
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestVisitModal;
