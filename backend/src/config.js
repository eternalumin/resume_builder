require("dotenv").config();

const ACCESS_TOKEN_EXPIRE_TIME = "30m"; // 60s 2m 5m 5h 1d 30d
const REFRESH_TOKEN_EXPIRE_TIME = "10d"; // 60s 2m 5m 5h 1d 30d
const MAX_API_REQUEST_PER_IP_FOR_MINUTE = 100;
const GROQ_API_KEY = process.env.GROQ_API_KEY || "your-groq-api-key-here";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

module.exports = {
  ACCESS_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_EXPIRE_TIME,
  MAX_API_REQUEST_PER_IP_FOR_MINUTE,
  GROQ_API_KEY,
  GROQ_MODEL,
};
