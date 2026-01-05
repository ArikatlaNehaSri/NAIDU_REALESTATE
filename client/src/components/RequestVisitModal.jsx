import { useState } from "react";

const RequestVisitModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please enter your name and phone number");
      return;
    }

    // For now: frontend-only success
    setSubmitted(true);

    // Auto close after 2 seconds
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setName("");
      setPhone("");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-[#111] w-96 p-6 rounded-lg border border-yellow-600">
        {!submitted ? (
          <>
            <h2 className="text-xl text-yellow-400 font-semibold mb-4">
              Request Site Visit
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-3 p-2 bg-black border border-gray-600 text-white rounded"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mb-4 p-2 bg-black border border-gray-600 text-white rounded"
              />

              <button
                type="submit"
                className="w-full bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-400 transition"
              >
                Submit Request
              </button>
            </form>

            <button
              onClick={onClose}
              className="w-full mt-3 text-sm text-gray-400 hover:text-white"
            >
              Cancel
            </button>
          </>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-yellow-400 text-lg font-semibold mb-2">
              Request Submitted ✅
            </h3>
            <p className="text-gray-300 text-sm">
              Our team will contact you shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestVisitModal;
