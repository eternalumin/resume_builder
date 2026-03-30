import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

export const tailorResume = async (resume, jobDescription) => {
  try {
    const response = await axios.post(`${API_URL}/resume/tailor`, { resume, jobDescription });
    return response.data;
  } catch (error) {
    console.error("Error tailoring resume:", error);
    return { status: "fail", message: error.response?.data?.message || "Failed to tailor resume" };
  }
};

export const generateSummary = async (rawText, jobTitle) => {
  try {
    const response = await axios.post(`${API_URL}/resume/summary`, { rawText, jobTitle });
    return response.data;
  } catch (error) {
    console.error("Error generating summary:", error);
    return { status: "fail", message: error.response?.data?.message || "Failed to generate summary" };
  }
};

export const improveDescription = async (description, type) => {
  try {
    const response = await axios.post(`${API_URL}/resume/improve`, { description, type });
    return response.data;
  } catch (error) {
    console.error("Error improving description:", error);
    return { status: "fail", message: error.response?.data?.message || "Failed to improve description" };
  }
};

export const analyzeJobMatch = async (resume, jobDescription) => {
  try {
    const response = await axios.post(`${API_URL}/resume/analyze`, { resume, jobDescription });
    return response.data;
  } catch (error) {
    console.error("Error analyzing job match:", error);
    return { status: "fail", message: error.response?.data?.message || "Failed to analyze job match" };
  }
};
