import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

const Admin = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Real-time Firestore listener
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "sellRequests"), (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRequests(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // ❌ Delete request
  const deleteRequest = async (id) => {
    await deleteDoc(doc(db, "sellRequests", id));
  };

  // 📝 Add/update admin note
  const addNote = async (id, note) => {
    await updateDoc(doc(db, "sellRequests", id), { note });
  };

  return (
    <div
      className="
        px-4 sm:px-6 md:px-10
        py-6 sm:py-8
        text-white
        pt-[calc(env(safe-area-inset-top)+60px)]
        pb-[env(safe-area-inset-bottom)]
      "
    >
      <h1 className="text-xl sm:text-2xl text-yellow-400 mb-6">
        Admin – Property Requests
      </h1>

      {/* Loading */}
      {loading && <p className="text-gray-400">Loading requests...</p>}

      {/* Empty state */}
      {!loading && requests.length === 0 && (
        <p className="text-gray-400">No requests yet.</p>
      )}

      {/* Requests list */}
      <div className="space-y-6">
        {requests.map((r) => (
          <div
            key={r.id}
            className="
              border border-gray-700
              p-4 sm:p-5
              rounded-xl
              bg-black/50
              shadow-md
            "
          >
            <div className="space-y-1 text-sm sm:text-base">
              <p><b>Type:</b> {r.type}</p>
              <p><b>Location:</b> {r.location}</p>
              <p><b>Price:</b> ₹ {r.price}</p>
              <p>
                <b>Contact:</b>{" "}
                <a
                  href={`tel:${r.phone}`}
                  className="text-yellow-400 underline"
                >
                  {r.phone}
                </a>
              </p>
            </div>

            {/* Notes */}
            <textarea
              placeholder="Admin notes..."
              defaultValue={r.note || ""}
              onBlur={(e) => addNote(r.id, e.target.value)}
              className="
                w-full mt-3 p-2
                bg-black border border-gray-600
                rounded text-sm
                min-h-[80px]
              "
            />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <a
                href={`tel:${r.phone}`}
                className="
                  bg-green-600 text-center
                  px-4 py-2 rounded
                  min-h-[44px]
                  hover:bg-green-500 transition
                "
              >
                Call
              </a>

              <button
                onClick={() => deleteRequest(r.id)}
                className="
                  bg-red-600
                  px-4 py-2 rounded
                  min-h-[44px]
                  hover:bg-red-500 transition
                "
              >
                Delete After Posting
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
