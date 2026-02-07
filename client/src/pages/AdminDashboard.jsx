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
  const [visits, setVisits] = useState([]);
  const [sells, setSells] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---------- LOAD DATA ---------- */
  useEffect(() => {
    const unsubProperties = onSnapshot(collection(db, "properties"), (snap) =>
      setProperties(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );

    const unsubVisits = onSnapshot(collection(db, "visitRequests"), (snap) =>
      setVisits(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );

    const unsubSells = onSnapshot(collection(db, "sellRequests"), (snap) =>
      setSells(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );

    return () => {
      unsubProperties();
      unsubVisits();
      unsubSells();
    };
  }, []);

  /* ---------- HANDLERS ---------- */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  /* ---------- ADD / UPDATE PROPERTY ---------- */
  const publishProperty = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrls = [];

      if (images.length > 0) {
        imageUrls = await Promise.all(images.map((img) => uploadImage(img)));
      }

      if (editingId) {
        await updateDoc(doc(db, "properties", editingId), {
          ...form,
          ...(imageUrls.length > 0 && { images: imageUrls }),
        });

        alert("Property updated successfully");
        setEditingId(null);
      } else {
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
    if (!window.confirm("Delete this property?")) return;
    await deleteDoc(doc(db, "properties", id));
  };

  /* ---------- DELETE REQUESTS ---------- */
  const deleteVisit = async (id) => {
    await deleteDoc(doc(db, "visitRequests", id));
  };

  const deleteSell = async (id) => {
    await deleteDoc(doc(db, "sellRequests", id));
  };

  /* ---------- LOGOUT ---------- */
  const logout = () => {
    navigate("/secure-admin-login", { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">

      {/* HEADER */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-yellow-400">Admin Dashboard</h1>

        <div className="flex gap-3">
          {/* 📊 ANALYTICS BUTTON */}
          <button
            onClick={() => navigate("/admin-analytics")}
            className="bg-yellow-500 text-black px-4 py-2 rounded"
          >
            Analytics
          </button>

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ---------- ADD / EDIT PROPERTY ---------- */}
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
          value={form.type}
          onChange={handleChange}
        >
          <option>House</option>
          <option>Plot</option>
          <option>Land</option>
        </select>

        <input className="input" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input className="input" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <input className="input" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />

        <input type="file" accept="image/*" multiple onChange={handleImages} />

        <textarea className="input h-28" name="description" placeholder="Description" value={form.description} onChange={handleChange} />

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

      {/* ---------- ALL PROPERTIES ---------- */}
      <section>
        <h2 className="text-2xl text-yellow-400 mb-6">All Properties</h2>

        {properties.length === 0 ? (
          <p className="text-gray-400">No properties yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
              <div key={p.id} className="bg-[#111] border border-gray-700 rounded p-4">
                <img src={p.images?.[0]} alt={p.title} className="w-full h-40 object-cover rounded mb-3" />

                <h3 className="text-yellow-400 font-semibold">{p.title}</h3>
                <p className="text-gray-400">{p.location}</p>
                <p className="text-gray-300 mb-3">₹ {p.price}</p>

                <div className="flex gap-2">
                  <button onClick={() => editProperty(p)} className="bg-yellow-500 text-black px-3 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => deleteProperty(p.id)} className="bg-red-500 px-3 py-1 rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---------- VISIT REQUESTS ---------- */}
      <section className="mt-16">
        <h2 className="text-2xl text-yellow-400 mb-6">Visit Requests</h2>

        {visits.length === 0 ? (
          <p className="text-gray-400">No visit requests</p>
        ) : (
          visits.map((v) => (
            <div key={v.id} className="bg-[#111] border border-gray-700 p-4 mb-3 rounded">
              <p><b>{v.name}</b> — {v.phone}</p>
              <p className="text-gray-400">{v.propertyTitle}</p>

              <button onClick={() => deleteVisit(v.id)} className="mt-2 bg-red-500 px-3 py-1 rounded">
                Mark Done
              </button>
            </div>
          ))
        )}
      </section>

      {/* ---------- SELL REQUESTS ---------- */}
      <section className="mt-12">
        <h2 className="text-2xl text-yellow-400 mb-6">Sell Requests</h2>

        {sells.length === 0 ? (
          <p className="text-gray-400">No sell requests</p>
        ) : (
          sells.map((s) => (
            <div key={s.id} className="bg-[#111] border border-gray-700 p-4 mb-3 rounded">
              <p><b>{s.ownerName}</b> — {s.phone}</p>
              <p className="text-gray-400">{s.type} | {s.location} | ₹ {s.price}</p>

              <button onClick={() => deleteSell(s.id)} className="mt-2 bg-red-500 px-3 py-1 rounded">
                Remove
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
