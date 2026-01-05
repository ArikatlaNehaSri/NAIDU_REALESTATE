import { useState } from "react";

export default function PostPropertyModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-[#111] w-[420px] p-6 rounded-lg border border-yellow-600">
        {!submitted ? (
          <>
            <h2 className="text-xl text-yellow-400 font-semibold mb-4">
              Post Your Property
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                placeholder="Property Title"
                className="w-full p-2 bg-black border border-gray-600 text-white rounded"
              />

              <input
                required
                placeholder="Location"
                className="w-full p-2 bg-black border border-gray-600 text-white rounded"
              />

              <input
                required
                placeholder="Expected Price"
                className="w-full p-2 bg-black border border-gray-600 text-white rounded"
              />

              <input
                required
                placeholder="Your Phone Number"
                className="w-full p-2 bg-black border border-gray-600 text-white rounded"
              />

              <button
                type="submit"
                className="w-full bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-400 transition"
              >
                Submit for Review
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
              Property Submitted ✅
            </h3>
            <p className="text-gray-300 text-sm">
              Our team will review and contact you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
