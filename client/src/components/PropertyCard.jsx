import { useState } from "react";
import RequestVisitModal from "./RequestVisitModal";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const PropertyCard = ({ property }) => {
  const [openVisit, setOpenVisit] = useState(false);

  const youtubeEmbed =
    property.youtube && property.youtube.includes("watch?v=")
      ? property.youtube.replace("watch?v=", "embed/")
      : null;

  const images =
    property.images && property.images.length > 0
      ? property.images
      : ["https://via.placeholder.com/400x250?text=No+Image"];

  return (
    <div className="bg-[#111] border border-gray-700 rounded overflow-hidden">

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
          className="h-48"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt="property"
                className="w-full h-48 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* DETAILS */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-yellow-400">
          {property.title}
        </h3>

        <p className="text-gray-400">{property.location}</p>

        <p className="text-gray-300 mt-1">₹ {property.price}</p>

        <button
          onClick={() => setOpenVisit(true)}
          className="mt-4 w-full bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-400"
        >
          Request Visit
        </button>
      </div>

      {openVisit && (
        <RequestVisitModal
          property={property}
          onClose={() => setOpenVisit(false)}
        />
      )}
    </div>
  );
};

export default PropertyCard;
