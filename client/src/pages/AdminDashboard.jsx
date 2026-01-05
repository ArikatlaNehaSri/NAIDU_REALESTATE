import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

/* ---------- HELPERS ---------- */
const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setData = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

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

  if (localStorage.getItem("adminLoggedIn") !== "true") {
    return <Navigate to="/secure-admin-login" replace />;
  }

  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const [properties, setProperties] = useState(getData("properties"));

  /* ---------- HANDLERS ---------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages(previews);
  };

  const publishProperty = (e) => {
    e.preventDefault();

    const newProperty = {
      id: Date.now(),
      ...form,
      images, // TEMP previews
      createdAt: new Date().toISOString(),
    };

    const updated = [newProperty, ...properties];
    setProperties(updated);
    setData("properties", updated);

    alert(
      "Property published.\nImages are temporary until backend is added."
    );

    setForm(emptyForm);
    setImages([]);
  };

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/secure-admin-login", { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-yellow-400">
          Admin Dashboard
        </h1>
        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* ADD PROPERTY */}
      <form
        onSubmit={publishProperty}
        className="bg-[#111] border border-gray-700 p-8 rounded space-y-8"
      >
        {/* STEP 1 */}
        <div>
          <h3 className="text-yellow-400 mb-2">Property Type</h3>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="input max-w-sm"
          >
            <option>House</option>
            <option>Plot</option>
            <option>Land</option>
          </select>
        </div>

        {/* BASIC INFO */}
        <div>
          <h3 className="text-yellow-400 mb-4">Basic Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input className="input" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
            <input className="input" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
            <input className="input" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
          </div>
        </div>

        {/* PROPERTY DETAILS */}
        <div>
          <h3 className="text-yellow-400 mb-4">Property Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {form.type === "House" && (
              <>
                <input className="input" name="facing" placeholder="Facing" value={form.facing} onChange={handleChange} />
                <input className="input" name="floors" placeholder="Floors" value={form.floors} onChange={handleChange} />
                <select className="input" name="parking" value={form.parking} onChange={handleChange}>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </>
            )}

            {form.type !== "House" && (
              <input className="input" name="area" placeholder="Area / Plot Size" value={form.area} onChange={handleChange} />
            )}

            <input className="input" name="roadWidth" placeholder="Road Width" value={form.roadWidth} onChange={handleChange} />
          </div>
        </div>

        {/* MEDIA */}
        <div>
          <h3 className="text-yellow-400 mb-4">Images & Video</h3>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="preview"
                className="h-32 w-full object-cover rounded"
              />
            ))}
          </div>

          <input
            className="input mt-4"
            name="youtube"
            placeholder="YouTube Video Link (optional)"
            value={form.youtube}
            onChange={handleChange}
          />

          <textarea
            className="input h-28 mt-4"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <button className="bg-yellow-500 text-black px-8 py-3 rounded font-semibold">
          Publish Property
        </button>

        <p className="text-gray-400 text-sm">
          ⚠ Images are temporary until backend storage is added.
        </p>
      </form>
    </div>
  );
};

export default AdminDashboard;
