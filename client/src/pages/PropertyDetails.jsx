import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);

  /* 🔥 LOAD FROM FIRESTORE */
  useEffect(() => {
    const fetchProperty = async () => {
      const snap = await getDoc(doc(db, "properties", id));

      if (snap.exists()) {
        setProperty({ id: snap.id, ...snap.data() });
      }
    };

    fetchProperty();
  }, [id]);

  /* ⏳ LOADING */
  if (!property) {
    return (
      <div className="p-10 text-center text-gray-400">
        Loading property...
      </div>
    );
  }

  const images = property.images || [];

  return (
    <div className="px-6 md:px-14 py-10 text-white min-h-screen">

      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
        {property.title}
      </h1>

      <p className="text-gray-400 mb-6">{property.location}</p>

      {/* 🖼 IMAGE SLIDER */}
      {images.length > 0 && (
        <div className="mb-8">
          <img
            src={images[currentImg]}
            alt="Property"
            className="w-full h-[250px] md:h-[450px] object-cover rounded border border-gray-700"
          />

          {/* thumbnails */}
          <div className="flex gap-3 mt-3 overflow-x-auto">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setCurrentImg(index)}
                className={`h-20 w-28 object-cover rounded cursor-pointer border ${
                  currentImg === index
                    ? "border-yellow-400"
                    : "border-gray-700"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* DETAILS */}
      <div className="bg-[#111] border border-gray-700 rounded p-6 space-y-3 max-w-4xl">
        <p>
          <span className="text-yellow-400 font-semibold">Property Type:</span>{" "}
          {property.type}
        </p>

        <p>
          <span className="text-yellow-400 font-semibold">Price:</span>{" "}
          ₹ {property.price}
        </p>

        {property.facing && (
          <p>
            <span className="text-yellow-400 font-semibold">Facing:</span>{" "}
            {property.facing}
          </p>
        )}

        {property.floors && (
          <p>
            <span className="text-yellow-400 font-semibold">Floors:</span>{" "}
            {property.floors}
          </p>
        )}

        {property.area && (
          <p>
            <span className="text-yellow-400 font-semibold">Area / Plot Size:</span>{" "}
            {property.area}
          </p>
        )}

        {property.roadWidth && (
          <p>
            <span className="text-yellow-400 font-semibold">Road Width:</span>{" "}
            {property.roadWidth}
          </p>
        )}

        {property.description && (
          <p className="text-gray-300 mt-2">{property.description}</p>
        )}
      </div>

      {/* 🎥 YOUTUBE VIDEO */}
      {property.youtube && (
        <div className="mt-8 max-w-4xl">
          <h3 className="text-yellow-400 text-lg mb-3">Property Video</h3>

          <iframe
            className="w-full h-64 md:h-80 rounded border border-gray-700"
            src={property.youtube.replace("watch?v=", "embed/")}
            allowFullScreen
            title="Property Video"
          />
        </div>
      )}

      {/* 📍 GOOGLE MAP */}
      <div className="mt-8 max-w-4xl">
        <h3 className="text-yellow-400 text-lg mb-3">Location</h3>

        <iframe
          title="map"
          width="100%"
          height="300"
          className="rounded border border-gray-700"
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            property.location
          )}&output=embed`}
        />
      </div>

      {/* 📞 REQUEST VISIT */}
      <div className="mt-10">
        <button
          onClick={() =>
            alert(
              "Your visit request has been sent.\nWe will contact you shortly."
            )
          }
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded font-semibold"
        >
          Request Site Visit
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
