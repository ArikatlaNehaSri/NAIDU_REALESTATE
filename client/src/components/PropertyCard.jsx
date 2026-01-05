import { motion } from "framer-motion";

const PropertyCard = ({ property, onView }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-[#111] rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onClick={onView}
    >
      <iframe
        className="w-full h-48"
        src={`https://www.youtube.com/embed/${property.videoId}`}
        title={property.title}
        allowFullScreen
      ></iframe>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-yellow-400">
          {property.title}
        </h3>
        <p className="text-sm text-gray-400">{property.location}</p>
        <p className="mt-2 text-white font-medium">{property.price}</p>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
