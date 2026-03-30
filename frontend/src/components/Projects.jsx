/* eslint-disable react/prop-types */
const Projects = ({ data, onChange, onImprove }) => {
  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addProject = () => {
    onChange([...data, { name: "", description: "", technologies: "", link: "" }]);
  };

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
        <button
          type="button"
          onClick={addProject}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
        >
          + Add Project
        </button>
      </div>
      {data.map((project, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-md space-y-3">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeProject(index)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                value={project.name || ""}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Project Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Link</label>
              <input
                type="url"
                value={project.link || ""}
                onChange={(e) => handleChange(index, "link", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://github.com/..."
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              {onImprove && (
                <button
                  type="button"
                  onClick={() => onImprove(index, "project")}
                  className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-xs"
                  disabled={!project.description}
                >
                  AI Improve
                </button>
              )}
            </div>
            <textarea
              value={project.description || ""}
              onChange={(e) => handleChange(index, "description", e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="A brief description of the project..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Technologies Used</label>
            <input
              type="text"
              value={project.technologies || ""}
              onChange={(e) => handleChange(index, "technologies", e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="React, Node.js, MongoDB, AWS..."
            />
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <p className="text-gray-500 text-center py-4">No projects added yet. Click &quot;Add Project&quot; to add one.</p>
      )}
    </div>
  );
};

export default Projects;
