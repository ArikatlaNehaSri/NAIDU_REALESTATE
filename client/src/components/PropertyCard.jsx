import { useState } from "react";
import RequestVisitModal from "./RequestVisitModal";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

// Animations
import { motion } from "framer-motion";

// Routing
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const [openVisit, setOpenVisit] = useState(false);

  // 🛑 safety
  if (!property || !property.id) return null;

  const youtubeEmbed =
    property?.youtube && property.youtube.includes("watch?v=")
      ? property.youtube.replace("watch?v=", "embed/")
      : null;

  const images =
    property?.images && property.images.length > 0
      ? property.images
      : ["https://via.placeholder.com/600x400?text=No+Image"];

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="bg-[#111] border border-gray-700 rounded-xl overflow-hidden hover:border-yellow-400 transition flex flex-col"
      >
        {/* CLICKABLE AREA */}
        <Link to={`/property/${property.id}`} className="block">
          {/* MEDIA */}
          {youtubeEmbed ? (
            <div className="aspect-video">
              <iframe
                src={youtubeEmbed}
                title="Property Video"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="h-48 sm:h-52 md:h-56"
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt="property"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* DETAILS */}
          <div className="p-4">
            <h3 className="text-base sm:text-lg font-semibold text-yellow-400 line-clamp-1">
              {property.title}
            </h3>

            <p className="text-sm sm:text-base text-gray-400 line-clamp-1">
              {property.location}
            </p>

            <p className="text-gray-300 mt-1 text-sm sm:text-base font-medium">
              ₹ {property.price}
            </p>
          </div>
        </Link>

        {/* ✅ BUTTON INSIDE SAME CARD */}
        <div className="p-4 pt-0">
          <button
            onClick={() => setOpenVisit(true)}
            className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 transition min-h-[44px]"
          >
            Request Visit
          </button>
        </div>
      </motion.div>

      {/* MODAL */}
      {openVisit && (
        <RequestVisitModal
          property={property}
          onClose={() => setOpenVisit(false)}
        />
      )}
    </>
  );
};

export default PropertyCard;
