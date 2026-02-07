import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { motion, AnimatePresence } from "framer-motion";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import RequestVisitModal from "../components/RequestVisitModal";

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [openGallery, setOpenGallery] = useState(false);
  const [openVisit, setOpenVisit] = useState(false);

  /* 🔥 LOAD PROPERTY FROM FIRESTORE */
  useEffect(() => {
    const fetchProperty = async () => {
      const snap = await getDoc(doc(db, "properties", id));

      if (snap.exists()) {
        setProperty({ id: snap.id, ...snap.data() });
      }
    };

    fetchProperty();
  }, [id]);

  /* ⏳ LOADING STATE */
  if (!property) {
    return (
      <div className="p-10 text-center text-gray-400">
        Loading property...
      </div>
    );
  }

  const images =
    property.images && property.images.length > 0
      ? property.images
      : ["https://via.placeholder.com/800x500?text=No+Image"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-6 md:px-14 py-10 text-white min-h-screen"
    >
      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
        {property.title}
      </h1>

      <p className="text-gray-400 mb-6">{property.location}</p>

      {/* 🖼 MAIN IMAGE + THUMBNAILS */}
      <div className="mb-8">
        <motion.img
          key={currentImg}
          src={images[currentImg]}
          alt="Property"
          onClick={() => setOpenGallery(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-[250px] md:h-[450px] object-cover rounded border border-gray-700 cursor-pointer"
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

      {/* 📋 DETAILS */}
      <div className="bg-[#111] border border-gray-700 rounded p-6 space-y-3 max-w-4xl">
        <p>
          <span className="text-yellow-400 font-semibold">Property Type:</span>{" "}
          {property.type}
        </p>

        <p>
          <span className="text-yellow-400 font-semibold">Price:</span> ₹{" "}
          {property.price}
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
            <span className="text-yellow-400 font-semibold">
              Area / Plot Size:
            </span>{" "}
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

      {/* 📲 WHATSAPP + VISIT FORM */}
      <div className="mt-10 flex flex-col md:flex-row gap-4">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/918500662449?text=${encodeURIComponent(
            `Hi, I'm interested in this property:\n\n${property.title}\nPrice: ₹ ${property.price}\nLocation: ${property.location}\n\nPlease share more details.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded font-semibold text-center"
        >
          Chat on WhatsApp
        </a>

        {/* Request Visit Form */}
        <button
          onClick={() => setOpenVisit(true)}
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded font-semibold"
        >
          Request Site Visit
        </button>
      </div>

      {/* 📩 VISIT MODAL */}
      {openVisit && (
        <RequestVisitModal
          property={property}
          onClose={() => setOpenVisit(false)}
        />
      )}

      {/* 🖼 FULLSCREEN GALLERY */}
      <AnimatePresence>
        {openGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
          >
            {/* CLOSE */}
            <button
              onClick={() => setOpenGallery(false)}
              className="absolute top-6 right-6 text-white text-3xl z-50"
            >
              ✕
            </button>

            {/* SWIPER */}
            <div className="w-full max-w-5xl px-4">
              <Swiper
                initialSlide={currentImg}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="h-[80vh]"
              >
                {images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <motion.img
                      src={img}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-[80vh] object-contain"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PropertyDetails;
