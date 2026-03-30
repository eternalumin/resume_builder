const Groq = require("groq-sdk");
const { GROQ_API_KEY, GROQ_MODEL } = require("../config");

const groq = new Groq({ apiKey: GROQ_API_KEY });

const tailorResume = async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide both resume and job description",
      });
    }

    const prompt = `
You are an expert resume writer. Given the following resume and job description, 
tailor the resume to match the job requirements. Highlight relevant skills, 
experience, and achievements that match the job description.

Resume:
${JSON.stringify(resume, null, 2)}

Job Description:
${jobDescription}

Please provide the tailored resume in the following JSON format:
{
  "summary": "A tailored professional summary",
  "skills": ["relevant skills from resume and job"],
  "experience": ["tailored bullet points for each job"],
  "projects": ["relevant projects"],
  "improvements": ["specific suggestions to better match the job"]
}
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: GROQ_MODEL,
      temperature: 0.7,
      max_tokens: 2048,
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(chatCompletion.choices[0]?.message?.content || "{}");

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Error in tailorResume:", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "Failed to tailor resume",
    });
  }
};

const generateSummary = async (req, res) => {
  try {
    const { rawText, jobTitle } = req.body;

    if (!rawText) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide raw text to generate summary",
      });
    }

    const prompt = `
You are an expert resume writer. Based on the following raw notes/information, 
generate a professional summary for a resume${jobTitle ? ` for a ${jobTitle} position` : ""}.

Raw Notes:
${rawText}

Provide a concise, professional 2-3 sentence summary that highlights:
- Years of experience (if mentioned)
- Key skills and expertise
- Career achievements or focus areas

Return only the summary text, nothing else.
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: GROQ_MODEL,
      temperature: 0.7,
      max_tokens: 500,
    });

    const summary = chatCompletion.choices[0]?.message?.content || "";

    res.status(200).json({
      status: "success",
      summary,
    });
  } catch (error) {
    console.error("Error in generateSummary:", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "Failed to generate summary",
    });
  }
};

const improveDescription = async (req, res) => {
  try {
    const { description, type } = req.body;

    if (!description) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide a description to improve",
      });
    }

    let prompt = "";
    switch (type) {
      case "bullet":
        prompt = `
Improve the following work experience bullet points to be more impactful and ATS-friendly.
Use action verbs, quantify achievements where possible, and keep them concise.

Current description:
${description}

Return an improved version with better phrasing and metrics if applicable.
`;
        break;
      case "project":
        prompt = `
Improve the following project description to make it more impressive.
Highlight technologies used, impact, and key achievements.

Current description:
${description}

Return an improved version.
`;
        break;
      default:
        prompt = `
Improve the following description to be more professional and impactful:

${description}

Return an improved version.
`;
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: GROQ_MODEL,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const improved = chatCompletion.choices[0]?.message?.content || "";

    res.status(200).json({
      status: "success",
      improved,
    });
  } catch (error) {
    console.error("Error in improveDescription:", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "Failed to improve description",
    });
  }
};

const analyzeJobMatch = async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide both resume and job description",
      });
    }

    const prompt = `
Analyze how well the following resume matches the job description.
Provide a match percentage and specific recommendations.

Resume:
${JSON.stringify(resume, null, 2)}

Job Description:
${jobDescription}

Provide analysis in JSON format:
{
  "matchPercentage": 0-100,
  "matchingSkills": ["skills that match"],
  "missingSkills": ["skills needed but missing"],
  "recommendations": ["specific suggestions to improve match"]
}
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: GROQ_MODEL,
      temperature: 0.7,
      max_tokens: 2048,
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(chatCompletion.choices[0]?.message?.content || "{}");

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Error in analyzeJobMatch:", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "Failed to analyze job match",
    });
  }
};

module.exports = {
  tailorResume,
  generateSummary,
  improveDescription,
  analyzeJobMatch,
};
