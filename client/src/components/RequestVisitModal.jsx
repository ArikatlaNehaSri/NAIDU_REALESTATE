import { useState } from "react";
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
        propertyId: property.id,
        propertyTitle: property.title,
        createdAt: serverTimestamp(),
      });

      alert("Visit request sent successfully ✅");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error sending request");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form
        onSubmit={submitRequest}
        className="bg-[#111] border border-gray-700 rounded p-6 w-80 space-y-4"
      >
        <h2 className="text-yellow-400 text-lg font-semibold">
          Request Site Visit
        </h2>

        <input
          className="input w-full"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input w-full"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-yellow-500 text-black py-2 rounded font-semibold"
          >
            {loading ? "Sending..." : "Submit"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-700 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestVisitModal;
