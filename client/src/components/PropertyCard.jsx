import { useState } from "react";
import RequestVisitModal from "./RequestVisitModal";

const PropertyCard = ({ property }) => {
  const [openVisit, setOpenVisit] = useState(false);

  // 🎥 YouTube support
  const youtubeEmbed =
    property.youtube && property.youtube.includes("watch?v=")
      ? property.youtube.replace("watch?v=", "embed/")
      : null;

  // 🖼️ SAFE IMAGE URL
  const imageUrl =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images[0]
      : null;

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
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-800 text-gray-400">
          No Image
        </div>
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
