/* eslint-disable react/prop-types */
const Skills = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Technical Skills</label>
        <textarea
          value={data.technical || ""}
          onChange={(e) => handleChange("technical", e.target.value)}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="JavaScript, React, Node.js, Python, SQL, AWS, Docker..."
        />
        <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Soft Skills</label>
        <textarea
          value={data.soft || ""}
          onChange={(e) => handleChange("soft", e.target.value)}
          rows={2}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Leadership, Communication, Problem Solving..."
        />
        <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Languages</label>
        <textarea
          value={data.languages || ""}
          onChange={(e) => handleChange("languages", e.target.value)}
          rows={2}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="English (Native), Spanish (Fluent), Mandarin (Basic)..."
        />
      </div>
    </div>
  );
};

export default Skills;
