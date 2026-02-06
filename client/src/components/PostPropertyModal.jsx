import { useState } from "react";
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.ownerName || !form.phone) {
      alert("Please fill required fields");
      return;
    }

    await addDoc(collection(db, "sellRequests"), {
      ...form,
      createdAt: serverTimestamp(),
    });

    alert(
      "Request submitted. Admin will contact you.\nFor faster approval, send photos via WhatsApp."
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#111] p-6 rounded w-96">
        <h3 className="text-yellow-400 text-lg mb-4">
          Post Property Request
        </h3>

        <input
          className="input mb-3"
          name="ownerName"
          placeholder="Your Name"
          onChange={handleChange}
        />

        <input
          className="input mb-3"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <select
          className="input mb-3"
          name="type"
          onChange={handleChange}
        >
          <option>House</option>
          <option>Plot</option>
          <option>Land</option>
        </select>

        <input
          className="input mb-3"
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />

        <input
          className="input mb-4"
          name="price"
          placeholder="Expected Price"
          onChange={handleChange}
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

export default PostPropertyModal;
