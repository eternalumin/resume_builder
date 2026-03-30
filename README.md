# AI Resume Builder

An intelligent resume builder powered by Groq API that helps you create professional resumes and tailor them to specific job descriptions.

## Features

- **Resume Form Builder** - Easy-to-use form for adding personal info, education, experience, skills, and projects
- **AI-Powered Features**:
  - Generate professional summaries from raw notes
  - Improve bullet points and project descriptions
  - Tailor resume to match job descriptions
  - Analyze job match percentage
- **Live Preview** - See your resume update in real-time
- **Print/PDF Export** - Download your resume as PDF

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Express.js, Node.js
- **AI**: Groq API (LLM)

## Project Structure

```
resume-builder/
├── backend/           # Express.js API server
│   ├── src/
│   │   ├── controllers/  # API controllers
│   │   ├── middleware/   # Auth middleware
│   │   ├── models/       # Database models
│   │   ├── router/       # API routes
│   │   └── utils/        # Utility functions
│   └── package.json
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.jsx      # Main app
│   │   └── api.js       # API calls
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Groq API Key

### Installation

1. **Clone the repository**

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/resume-builder
   JWT_SECRET=your-jwt-secret
   JWT_REFRESH_SECRET=your-refresh-secret
   GROQ_API_KEY=your-groq-api-key
   GROQ_MODEL=llama-3.3-70b-versatile
   FRONTEND_URL=http://localhost:5173
   PORT=5000
   ```

   Get your Groq API key from [console.groq.com](https://console.groq.com/keys)

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on http://localhost:5000

2. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   App runs on http://localhost:5173

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/resume/tailor` | POST | Tailor resume to job description |
| `/api/v1/resume/summary` | POST | Generate professional summary |
| `/api/v1/resume/improve` | POST | Improve descriptions |
| `/api/v1/resume/analyze` | POST | Analyze job match |

## Available Scripts

### Backend
- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm test` - Run tests

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## License

MIT
