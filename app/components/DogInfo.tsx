export default function DogInfo({ info }) {
  if (!info || typeof info !== "object" || Object.keys(info).length === 0) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline">
          {" "}
          No valid dog information received.
        </span>
      </div>
    );
  }

  const fields = [
    { key: "breed", label: "Breed" },
    { key: "size", label: "Size" },
    { key: "temperament", label: "Temperament" },
    { key: "lifeExpectancy", label: "Life Expectancy" },
    { key: "exerciseNeeds", label: "Exercise Needs" },
    { key: "grooming", label: "Grooming" },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Dog Information
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left text-blue-500">Characteristic</th>
              <th className="py-2 px-4 border-b text-left text-blue-500">Information</th>
            </tr>
          </thead>
          <tbody>
            {fields.map(({ key, label }) => (
              <tr key={key}>
                <td className="py-2 px-4 border-b font-medium text-red-500">{label}</td>
                <td className="py-2 px-4 border-b text-green-500">
                  {info[key] || "Information not available"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
