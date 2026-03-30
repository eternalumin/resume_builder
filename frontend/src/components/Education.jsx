/* eslint-disable react/prop-types */
const Education = ({ data, onChange }) => {
  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addEducation = () => {
    onChange([...data, { institution: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", gpa: "", description: "" }]);
  };

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Education</h2>
        <button
          type="button"
          onClick={addEducation}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
        >
          + Add Education
        </button>
      </div>
      {data.map((edu, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-md space-y-3">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Institution</label>
              <input
                type="text"
                value={edu.institution || ""}
                onChange={(e) => handleChange(index, "institution", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="University Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Degree</label>
              <input
                type="text"
                value={edu.degree || ""}
                onChange={(e) => handleChange(index, "degree", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Bachelor of Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Field of Study</label>
              <input
                type="text"
                value={edu.fieldOfStudy || ""}
                onChange={(e) => handleChange(index, "fieldOfStudy", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">GPA</label>
              <input
                type="text"
                value={edu.gpa || ""}
                onChange={(e) => handleChange(index, "gpa", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="3.8/4.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="month"
                value={edu.startDate || ""}
                onChange={(e) => handleChange(index, "startDate", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="month"
                value={edu.endDate || ""}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={edu.description || ""}
              onChange={(e) => handleChange(index, "description", e.target.value)}
              rows={2}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Relevant coursework, achievements..."
            />
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <p className="text-gray-500 text-center py-4">No education added yet. Click &quot;Add Education&quot; to add one.</p>
      )}
    </div>
  );
};

export default Education;
