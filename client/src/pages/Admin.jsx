import { useState } from "react";

const Admin = () => {
  const [requests, setRequests] = useState(
    JSON.parse(localStorage.getItem("propertyRequests")) || []
  );

  const deleteRequest = (id) => {
    const updated = requests.filter((r) => r.id !== id);
    localStorage.setItem("propertyRequests", JSON.stringify(updated));
    setRequests(updated);
  };

  const addNote = (id, note) => {
    const updated = requests.map((r) =>
      r.id === id ? { ...r, note } : r
    );
    localStorage.setItem("propertyRequests", JSON.stringify(updated));
    setRequests(updated);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl text-yellow-400 mb-6">
        Admin – Property Requests
      </h1>

      {requests.length === 0 && (
        <p className="text-gray-400">No requests yet.</p>
      )}

      {requests.map((r) => (
        <div
          key={r.id}
          className="mb-6 border border-gray-700 p-4 rounded bg-black/50"
        >
          <p><b>Type:</b> {r.type}</p>
          <p><b>Location:</b> {r.location}</p>
          <p><b>Price:</b> {r.price}</p>
          <p>
            <b>Contact:</b>{" "}
            <a
              href={`tel:${r.contact}`}
              className="text-yellow-400 underline"
            >
              {r.contact}
            </a>
          </p>

          {/* Notes */}
          <textarea
            placeholder="Admin notes..."
            defaultValue={r.note || ""}
            onBlur={(e) => addNote(r.id, e.target.value)}
            className="w-full mt-3 p-2 bg-black border border-gray-600 rounded text-sm"
          />

          <div className="flex gap-4 mt-4">
            <a
              href={`tel:${r.contact}`}
              className="bg-green-600 px-4 py-1 rounded"
            >
              Call
            </a>

            <button
              onClick={() => deleteRequest(r.id)}
              className="bg-red-600 px-4 py-1 rounded"
            >
              Delete After Posting
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Admin;
