import { useState } from "react";

const RequestVisitModal = ({ onClose, property }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      id: Date.now(),
      name,
      phone,
      propertyTitle: property.title,
      location: property.location,
      price: property.price,
    };

    const existing =
      JSON.parse(localStorage.getItem("visitRequests")) || [];

    localStorage.setItem(
      "visitRequests",
      JSON.stringify([...existing, newRequest])
    );

    alert("Request submitted. Admin will contact you shortly.");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111] p-6 rounded w-full max-w-sm border border-yellow-600 relative">

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-yellow-400"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-yellow-400 mb-4">
          Request Site Visit
        </h2>

        <p className="text-gray-400 mb-3 text-sm">
          Property: <b>{property.title}</b>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full mb-3 px-4 py-2 bg-black border border-gray-600 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full mb-4 px-4 py-2 bg-black border border-gray-600 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button
            className="w-full bg-yellow-500 text-black py-2 rounded font-semibold"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestVisitModal;
