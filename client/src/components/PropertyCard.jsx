import { useState } from "react";
import RequestVisitModal from "./RequestVisitModal";

const PropertyCard = ({ property }) => {
  const [openVisit, setOpenVisit] = useState(false);

  return (
    <div className="bg-[#111] border border-gray-700 rounded overflow-hidden">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-yellow-400">
          {property.title}
        </h3>
        <p className="text-gray-400">{property.location}</p>
        <p className="text-gray-300 mt-1">
          ₹ {property.price}
        </p>

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
