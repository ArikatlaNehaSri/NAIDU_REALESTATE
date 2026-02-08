const PropertyFilters = ({ filters, setFilters }) => {
  return (
    <div
      className="
        bg-[#111] border border-gray-700
        rounded-xl p-4 sm:p-6
        mb-8 sm:mb-10
      "
    >
      <h3 className="text-yellow-400 text-base sm:text-lg font-semibold mb-4">
        Filter Properties
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* LOCATION */}
        <input
          type="text"
          placeholder="Enter location"
          value={filters.location || ""}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
          className="input w-full min-h-[44px]"
        />

        {/* PROPERTY TYPE */}
        <select
          value={filters.type || ""}
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value })
          }
          className="input w-full min-h-[44px]"
        >
          <option value="">All Property Types</option>
          <option value="House">House</option>
          <option value="Plot">Plot</option>
          <option value="Land">Land</option>
        </select>

        {/* BUDGET */}
        <input
          type="number"
          placeholder="Max Budget"
          value={filters.budget || ""}
          onChange={(e) =>
            setFilters({ ...filters, budget: e.target.value })
          }
          className="input w-full min-h-[44px]"
        />

        {/* RESET */}
        <button
          onClick={() => setFilters({})}
          className="
            bg-gray-700 hover:bg-gray-600 transition
            rounded text-white font-medium
            min-h-[44px] w-full
          "
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PropertyFilters;
