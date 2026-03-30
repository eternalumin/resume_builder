import { useState } from "react";
import PersonalInfo from "./components/PersonalInfo";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ResumePreview from "./components/ResumePreview";
import { tailorResume, generateSummary, improveDescription, analyzeJobMatch } from "./api";

function App() {
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [showJobInput, setShowJobInput] = useState(false);

  const [resume, setResume] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
      summary: "",
    },
    education: [],
    experience: [],
    skills: {
      technical: "",
      soft: "",
      languages: "",
    },
    projects: [],
  });

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "preview", label: "Preview" },
  ];

  const handlePersonalInfoChange = (data) => {
    setResume({ ...resume, personalInfo: data });
  };

  const handleEducationChange = (data) => {
    setResume({ ...resume, education: data });
  };

  const handleExperienceChange = (data) => {
    setResume({ ...resume, experience: data });
  };

  const handleSkillsChange = (data) => {
    setResume({ ...resume, skills: data });
  };

  const handleProjectsChange = (data) => {
    setResume({ ...resume, projects: data });
  };

  const handleImproveDescription = async (index, type) => {
    let description = "";
    if (type === "bullet") {
      description = resume.experience[index]?.description || "";
    } else if (type === "project") {
      description = resume.projects[index]?.description || "";
    }

    if (!description) return;

    setLoading(true);
    const result = await improveDescription(description, type);
    setLoading(false);

    if (result.status === "success" && result.improved) {
      if (type === "bullet") {
        const updated = [...resume.experience];
        updated[index] = { ...updated[index], description: result.improved };
        setResume({ ...resume, experience: updated });
      } else if (type === "project") {
        const updated = [...resume.projects];
        updated[index] = { ...updated[index], description: result.improved };
        setResume({ ...resume, projects: updated });
      }
    }
  };

  const handleGenerateSummary = async () => {
    const summaryText = resume.personalInfo.summary;
    if (!summaryText) return;

    setLoading(true);
    const result = await generateSummary(summaryText);
    setLoading(false);

    if (result.status === "success" && result.summary) {
      setResume({
        ...resume,
        personalInfo: { ...resume.personalInfo, summary: result.summary },
      });
    }
  };

  const handleTailorResume = async () => {
    if (!jobDescription) {
      alert("Please enter a job description");
      return;
    }

    setLoading(true);
    const result = await tailorResume(resume, jobDescription);
    setLoading(false);

    if (result.status === "success" && result.data) {
      setAiResult(result.data);
      if (result.data.summary) {
        setResume({
          ...resume,
          personalInfo: { ...resume.personalInfo, summary: result.data.summary },
        });
      }
    }
  };

  const handleAnalyzeMatch = async () => {
    if (!jobDescription) {
      alert("Please enter a job description");
      return;
    }

    setLoading(true);
    const result = await analyzeJobMatch(resume, jobDescription);
    setLoading(false);

    if (result.status === "success" && result.data) {
      setAiResult(result.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">AI Resume Builder</h1>
        <p className="text-sm opacity-80">Build and tailor your resume with AI</p>
      </header>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-6 overflow-y-auto max-h-screen">
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab !== "preview" && (
              <button
                onClick={() => setShowJobInput(!showJobInput)}
                className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
              >
                {showJobInput ? "Hide Job Description" : "Tailor to Job Description"}
              </button>
            )}

            {showJobInput && activeTab !== "preview" && (
              <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                  placeholder="Paste the job description here..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleTailorResume}
                    disabled={loading}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Tailor Resume"}
                  </button>
                  <button
                    onClick={handleAnalyzeMatch}
                    disabled={loading}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm disabled:opacity-50"
                  >
                    {loading ? "Analyzing..." : "Analyze Match"}
                  </button>
                </div>
              </div>
            )}

            {aiResult && activeTab !== "preview" && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <h3 className="font-semibold text-green-800 mb-2">AI Suggestions</h3>
                {aiResult.matchPercentage !== undefined && (
                  <p className="text-sm mb-2">Match: {aiResult.matchPercentage}%</p>
                )}
                {aiResult.missingSkills && aiResult.missingSkills.length > 0 && (
                  <div className="mb-2">
                    <span className="text-sm font-medium">Missing Skills: </span>
                    <span className="text-sm">{aiResult.missingSkills.join(", ")}</span>
                  </div>
                )}
                {aiResult.recommendations && aiResult.recommendations.length > 0 && (
                  <ul className="list-disc list-inside text-sm">
                    {aiResult.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={() => setAiResult(null)}
                  className="mt-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>

          {activeTab === "personal" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <PersonalInfo data={resume.personalInfo} onChange={handlePersonalInfoChange} />
              {resume.personalInfo.summary && (
                <div className="mt-4">
                  <button
                    onClick={handleGenerateSummary}
                    disabled={loading}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm disabled:opacity-50"
                  >
                    {loading ? "Generating..." : "AI: Improve Summary"}
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "education" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <Education data={resume.education} onChange={handleEducationChange} />
            </div>
          )}

          {activeTab === "experience" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <Experience
                data={resume.experience}
                onChange={handleExperienceChange}
                onImprove={handleImproveDescription}
              />
            </div>
          )}

          {activeTab === "skills" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <Skills data={resume.skills} onChange={handleSkillsChange} />
            </div>
          )}

          {activeTab === "projects" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <Projects
                data={resume.projects}
                onChange={handleProjectsChange}
                onImprove={handleImproveDescription}
              />
            </div>
          )}

          {activeTab === "preview" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <ResumePreview resume={resume} />
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Print / Save PDF
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="hidden lg:block lg:w-1/2 bg-gray-100 p-6 overflow-y-auto max-h-screen">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h2>
          <ResumePreview resume={resume} />
        </div>
      </div>
    </div>
  );
}

export default App;
