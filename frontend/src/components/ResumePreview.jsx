/* eslint-disable react/prop-types */
const ResumePreview = ({ resume }) => {
  const { personalInfo, education, experience, skills, projects } = resume;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    if (dateStr.length === 7) {
      const [year, month] = dateStr.split("-");
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    }
    return dateStr;
  };

  return (
    <div className="bg-white p-8 shadow-lg max-w-4xl mx-auto" id="resume-preview">
      <div className="text-center border-b-2 border-gray-300 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-1 text-sm text-blue-600">
          {personalInfo.linkedin && <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {personalInfo.github && <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">| GitHub</a>}
          {personalInfo.portfolio && <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer">| Portfolio</a>}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
          <p className="text-sm text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {skills && (skills.technical || skills.soft || skills.languages) && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Skills</h2>
          {skills.technical && (
            <div className="mb-2">
              <span className="font-medium text-gray-700">Technical: </span>
              <span className="text-sm text-gray-600">{skills.technical}</span>
            </div>
          )}
          {skills.soft && (
            <div className="mb-2">
              <span className="font-medium text-gray-700">Soft Skills: </span>
              <span className="text-sm text-gray-600">{skills.soft}</span>
            </div>
          )}
          {skills.languages && (
            <div>
              <span className="font-medium text-gray-700">Languages: </span>
              <span className="text-sm text-gray-600">{skills.languages}</span>
            </div>
          )}
        </div>
      )}

      {experience && experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Work Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-semibold text-gray-800">{exp.role}</span>
                  <span className="text-gray-600"> at {exp.company}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(exp.startDate)} - {exp.endDate || "Present"}
                </span>
              </div>
              {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
              {exp.description && (
                <div className="text-sm text-gray-700 mt-1 whitespace-pre-line">{exp.description}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <span className="font-semibold text-gray-800">{project.name}</span>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600">View</a>
                )}
              </div>
              {project.description && <p className="text-sm text-gray-700 mt-1">{project.description}</p>}
              {project.technologies && <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Technologies:</span> {project.technologies}</p>}
            </div>
          ))}
        </div>
      )}

      {education && education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-semibold text-gray-800">{edu.degree}</span>
                  {edu.fieldOfStudy && <span className="text-gray-600"> in {edu.fieldOfStudy}</span>}
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
              {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
