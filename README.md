# 🚀 SkillScan ATS – FitSense Engine

AI-powered resume analysis system that simulates real-world Applicant Tracking System (ATS) evaluation logic.

🔗 **Live Demo:**  
https://skill-scan-ats-coral.vercel.app

---

## 📌 Project Overview

SkillScan ATS is a full-stack web application that evaluates resumes against job descriptions and generates an ATS compatibility score.

It helps candidates understand how well their resume matches a specific job role before applying.

---

## 🎯 Core Features

- Resume Upload (PDF / TXT)
- Job Description Matching
- ATS Compatibility Score
- Fresher & Experienced Mode
- Dynamic Scoring Logic
- Real-time Analysis
- Live Production Deployment

---

## 🧠 How It Works

1. User uploads resume
2. Resume content is parsed
3. Job description keywords are extracted
4. Matching ratio is calculated
5. ATS score is generated
6. Recommendation message is returned

---

## 🛠 Tech Stack

### 💻 Frontend

- React.js
- Axios
- CSS
- FormData (File Upload)

### ⚙️ Backend

- Node.js
- Express.js
- Multer (File Handling Middleware)
- Custom Resume Scoring Engine

### 🚀 Deployment

- Frontend → Vercel
- Backend → Render

---

## 🏗 Architecture Flow

User  
→ React Frontend  
→ Axios API Call  
→ Express Backend  
→ Resume Parsing  
→ Keyword Matching Engine  
→ Score Generation  
→ Response

---

## 📂 Project Structure

SkillScan-ATS/
│
├── client/ # React Frontend
├── server/ # Express Backend
└── README.md

---

## 🔗 API Endpoint

**POST** `/api/analyze`

### Form Data Parameters

- `resume` (file)
- `jobDescription` (text)
- `experienceLevel` (fresher / experienced)
- `years` (optional)

---

## 📊 Example Response

```json
{
  "atsScore": 84,
  "message": "Strong match for the provided role.",
  "engine": "FitSense Engine v1.0"
}

💡 Why This Project Matters

Demonstrates real full-stack architecture

Shows API integration

Implements practical resume evaluation logic

Handles file upload & processing

Includes live production deployment

This is not just a UI project — it includes backend logic, scoring system, and real hosting setup.

👨‍💻 Author

Siddharth Sharma
Full Stack Developer

⭐ If you found this project useful, consider giving it a star.
```
