import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const RequestVisitModal = ({ property, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const submit = async () => {
    if (!name || !phone) {
      alert("Please fill all details");
      return;
    }

    await addDoc(collection(db, "visitRequests"), {
      name,
      phone,
      propertyId: property.id,
      propertyTitle: property.title,
      createdAt: serverTimestamp(),
    });

    alert("Request sent. Admin will contact you.");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#111] p-6 rounded w-80">
        <h3 className="text-yellow-400 text-lg mb-4">
          Request Site Visit
        </h3>

        <input
          placeholder="Your Name"
          className="input mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Phone Number"
          className="input mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={submit}
            className="bg-yellow-500 text-black px-4 py-2 rounded"
          >
            Submit
          </button>

          <button
            onClick={onClose}
            className="bg-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestVisitModal;
