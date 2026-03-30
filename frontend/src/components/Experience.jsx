/* eslint-disable react/prop-types */
const Experience = ({ data, onChange, onImprove }) => {
  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addExperience = () => {
    onChange([...data, { company: "", role: "", location: "", startDate: "", endDate: "", description: "" }]);
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
        <button
          type="button"
          onClick={addExperience}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
        >
          + Add Experience
        </button>
      </div>
      {data.map((exp, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-md space-y-3">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={exp.company || ""}
                onChange={(e) => handleChange(index, "company", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Company Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                value={exp.role || ""}
                onChange={(e) => handleChange(index, "role", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={exp.location || ""}
                onChange={(e) => handleChange(index, "location", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="New York, NY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="month"
                value={exp.startDate || ""}
                onChange={(e) => handleChange(index, "startDate", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="text"
                value={exp.endDate || ""}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Present"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              {onImprove && (
                <button
                  type="button"
                  onClick={() => onImprove(index, "bullet")}
                  className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-xs"
                  disabled={!exp.description}
                >
                  AI Improve
                </button>
              )}
            </div>
            <textarea
              value={exp.description || ""}
              onChange={(e) => handleChange(index, "description", e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="• Led development of..."
            />
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <p className="text-gray-500 text-center py-4">No experience added yet. Click &quot;Add Experience&quot; to add one.</p>
      )}
    </div>
  );
};

export default Experience;
