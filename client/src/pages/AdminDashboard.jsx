import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { uploadImage } from "../supabase/uploadImage";

/* ---------- EMPTY FORM ---------- */
const emptyForm = {
  type: "House",
  title: "",
  location: "",
  price: "",
  description: "",
  facing: "",
  floors: "",
  parking: "Yes",
  area: "",
  roadWidth: "",
  youtube: "",
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  /* ---------- STATES ---------- */
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const [properties, setProperties] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---------- LOAD PROPERTIES ---------- */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "properties"), (snap) => {
      setProperties(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return unsub;
  }, []);

  /* ---------- HANDLERS ---------- */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files); // ✅ store ALL selected images
  };

  /* ---------- PUBLISH / UPDATE PROPERTY ---------- */
  const publishProperty = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrls = [];

      // 🔥 upload new images if selected
      if (images.length > 0) {
  imageUrls = await Promise.all(
    images.map((img) => uploadImage(img))
  );
}


      if (editingId) {
        // ✅ UPDATE EXISTING PROPERTY
        await updateDoc(doc(db, "properties", editingId), {
          ...form,
          ...(imageUrls.length > 0 && { images: imageUrls }),
        });

        alert("Property updated successfully");
        setEditingId(null);
      } else {
        // ✅ ADD NEW PROPERTY
        await addDoc(collection(db, "properties"), {
          ...form,
          images: imageUrls,
          approved: true,
          createdAt: serverTimestamp(),
        });

        alert("Property published successfully");
      }

      setForm(emptyForm);
      setImages([]);
    } catch (err) {
      console.error("Publish error:", err);
      alert("Error publishing property");
    }

    setLoading(false);
  };

  /* ---------- EDIT PROPERTY ---------- */
  const editProperty = (property) => {
    setForm(property);
    setEditingId(property.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------- DELETE PROPERTY ---------- */
  const deleteProperty = async (id) => {
    const confirmDelete = window.confirm("Delete this property?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "properties", id));
  };

  /* ---------- LOGOUT ---------- */
  const logout = async () => {
    navigate("/secure-admin-login", { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">
      {/* HEADER */}
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold text-yellow-400">
          Admin Dashboard
        </h1>
        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* ---------- ADD / EDIT PROPERTY FORM ---------- */}
      <form
        onSubmit={publishProperty}
        className="bg-[#111] p-8 border border-gray-700 rounded mb-14 space-y-6"
      >
        <h2 className="text-xl text-yellow-400">
          {editingId ? "Edit Property" : "Add Property"}
        </h2>

        <select
          name="type"
          className="input"
          onChange={handleChange}
          value={form.type}
        >
          <option>House</option>
          <option>Plot</option>
          <option>Land</option>
        </select>

        <input
          className="input"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          className="input"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <input
          className="input"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        {/* MULTI IMAGE INPUT */}
        <input
  type="file"
  accept="image/*"
  multiple
  onChange={(e) => {
    const files = Array.from(e.target.files);
    console.log("Selected files:", files.length); // DEBUG
    setImages(files);
  }}
  className="text-white"
/>


        <textarea
          className="input h-28"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 text-black px-8 py-3 rounded font-semibold"
        >
          {loading
            ? editingId
              ? "Updating..."
              : "Publishing..."
            : editingId
            ? "Update Property"
            : "Publish Property"}
        </button>
      </form>

      {/* ---------- ALL PROPERTIES LIST ---------- */}
      <section>
        <h2 className="text-2xl text-yellow-400 mb-6">All Properties</h2>

        {properties.length === 0 ? (
          <p className="text-gray-400">No properties yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
              <div
                key={p.id}
                className="bg-[#111] border border-gray-700 rounded p-4"
              >
                <img
                  src={p.images?.[0]}
                  alt={p.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />

                <h3 className="text-yellow-400 font-semibold">{p.title}</h3>
                <p className="text-gray-400">{p.location}</p>
                <p className="text-gray-300 mb-3">₹ {p.price}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => editProperty(p)}
                    className="bg-yellow-500 text-black px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProperty(p.id)}
                    className="bg-red-500 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
