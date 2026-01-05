import { useState } from "react";

export default function PostPropertyModal({ onClose }) {
  const [type, setType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));

    const existing =
      JSON.parse(localStorage.getItem("propertyRequests")) || [];

    existing.push({
      id: Date.now(),
      type,
      ...formData,
    });

    localStorage.setItem("propertyRequests", JSON.stringify(existing));

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="relative bg-[#111] w-full max-w-lg p-6 rounded border border-yellow-600 max-h-[90vh] overflow-y-auto">

        {/* ❌ CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-400 hover:text-yellow-400"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <h2 className="text-xl text-yellow-400 font-semibold mb-4">
              Post Property Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* PROPERTY TYPE */}
              <select
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 bg-black border border-gray-600 rounded"
              >
                <option value="">Select Property Type</option>
                <option value="House">House / Flat</option>
                <option value="Plot">Plot</option>
                <option value="Farm">Farm / Agricultural Land</option>
              </select>

              {/* COMMON DETAILS */}
              <input
                required
                name="location"
                placeholder="Location"
                className="w-full p-2 bg-black border border-gray-600 rounded"
              />
              <input
                required
                name="price"
                placeholder="Expected Price"
                className="w-full p-2 bg-black border border-gray-600 rounded"
              />
              <input
                required
                name="contact"
                placeholder="Contact Number"
                className="w-full p-2 bg-black border border-gray-600 rounded"
              />

              {/* HOUSE */}
              {type === "House" && (
                <>
                  <input name="builtArea" placeholder="Built-up Area (sq.ft)" className="w-full p-2 bg-black border border-gray-600 rounded" />
                  <input name="floors" placeholder="Number of Floors" className="w-full p-2 bg-black border border-gray-600 rounded" />
                  <input name="bedrooms" placeholder="Bedrooms" className="w-full p-2 bg-black border border-gray-600 rounded" />
                  <select name="parking" className="w-full p-2 bg-black border border-gray-600 rounded">
                    <option>Car Parking</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </>
              )}

              {/* PLOT */}
              {type === "Plot" && (
                <>
                  <input name="plotSize" placeholder="Plot Size (sq.yards)" className="w-full p-2 bg-black border border-gray-600 rounded" />
                  <select name="facing" className="w-full p-2 bg-black border border-gray-600 rounded">
                    <option>Facing</option>
                    <option>East</option>
                    <option>West</option>
                    <option>North</option>
                    <option>South</option>
                  </select>
                </>
              )}

              {/* FARM */}
              {type === "Farm" && (
                <>
                  <input name="landArea" placeholder="Land Area (Acres)" className="w-full p-2 bg-black border border-gray-600 rounded" />
                  <select name="water" className="w-full p-2 bg-black border border-gray-600 rounded">
                    <option>Water Availability</option>
                    <option>Bore</option>
                    <option>Canal</option>
                    <option>No Water</option>
                  </select>
                </>
              )}

              {/* INFO NOTE */}
              <div className="bg-black/60 border border-gray-600 p-3 rounded text-sm text-gray-300">
                📸 After submitting, please send property photos or videos via WhatsApp.
                <br />
                This helps us verify and publish your property faster.
              </div>

              <button className="w-full bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-400">
                Submit Details
              </button>
            </form>
          </>
        ) : (
          /* SUCCESS MESSAGE */
          <div className="text-center py-10">
            <h3 className="text-yellow-400 text-lg font-semibold mb-3">
              Details Submitted Successfully ✅
            </h3>

            <p className="text-gray-300 mb-4">
              Our admin will contact you shortly.
            </p>

            <p className="text-sm text-gray-400">
              📸 For faster acceptance, please send property photos or videos
              via WhatsApp.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
