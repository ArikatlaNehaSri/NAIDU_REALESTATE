import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();

  // Load properties from localStorage (admin + approved)
  const properties =
    JSON.parse(localStorage.getItem("properties")) || [];

  const property = properties.find(
    (p) => String(p.id) === id
  );

  if (!property) {
    return (
      <div className="p-10 text-center text-gray-400">
        Property not found.
      </div>
    );
  }

  return (
    <div className="px-6 md:px-14 py-10 text-white min-h-screen">
      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
        {property.title}
      </h1>

      <p className="text-gray-400 mb-6">
        {property.location}
      </p>

      {/* IMAGE GALLERY */}
      {property.images && property.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {property.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Property"
              className="h-40 w-full object-cover rounded border border-gray-700"
            />
          ))}
        </div>
      )}

      {/* DETAILS */}
      <div className="bg-[#111] border border-gray-700 rounded p-6 space-y-3 max-w-4xl">
        <p>
          <span className="text-yellow-400 font-semibold">
            Property Type:
          </span>{" "}
          {property.type}
        </p>

        <p>
          <span className="text-yellow-400 font-semibold">
            Price:
          </span>{" "}
          {property.price}
        </p>

        {property.facing && (
          <p>
            <span className="text-yellow-400 font-semibold">
              Facing:
            </span>{" "}
            {property.facing}
          </p>
        )}

        {property.floors && (
          <p>
            <span className="text-yellow-400 font-semibold">
              Floors:
            </span>{" "}
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
            <span className="text-yellow-400 font-semibold">
              Road Width:
            </span>{" "}
            {property.roadWidth}
          </p>
        )}

        {property.description && (
          <p className="text-gray-300 mt-2">
            {property.description}
          </p>
        )}
      </div>

      {/* YOUTUBE VIDEO */}
      {property.youtube && (
        <div className="mt-8 max-w-4xl">
          <h3 className="text-yellow-400 text-lg mb-3">
            Property Video
          </h3>

          <iframe
            className="w-full h-64 md:h-80 rounded border border-gray-700"
            src={property.youtube.replace(
              "watch?v=",
              "embed/"
            )}
            allowFullScreen
            title="Property Video"
          />
        </div>
      )}

      {/* REQUEST VISIT CTA */}
      <div className="mt-10">
        <button
          onClick={() =>
            alert(
              "Your request has been sent.\nOur team will contact you shortly.\n\nFor faster approval, please send photos/videos via WhatsApp."
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
