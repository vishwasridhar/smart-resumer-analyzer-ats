import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("fresher");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || !jobDescription.trim()) {
      setResult({
        errorMessage: "Please upload resume and enter role or job description.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);
    formData.append("experienceLevel", experienceLevel);
    formData.append("years", years);

    try {
      setLoading(true);
      setResult(null);

      const res = await axios.post(
        "https://skillscan-ats.onrender.com/api/analyze",
        formData,
        { validateStatus: () => true },
      );

      if (res.status === 200) {
        setResult(res.data.analysis);
      } else {
        setResult({ errorMessage: res.data.error });
      }
    } catch {
      setResult({ errorMessage: "Server error." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>ATS – Applicant Tracking System Analyzer</h1>

      <form onSubmit={handleSubmit} className="card">
        <label className="file-upload-wrapper">
          <input
            type="file"
            accept=".txt,.pdf,.docx"
            onChange={(e) => setResume(e.target.files[0])}
          />

          <div className="file-upload-ui">
            <span className="upload-btn">
              {resume ? "Change Resume" : "Upload Resume"}
            </span>

            <span className="file-display">
              {resume ? resume.name : "No file selected"}
            </span>
          </div>
        </label>

        <textarea
          placeholder="Paste Job Description OR Ask: Is this a full stack resume?"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <div className="experience-section">
          <label>
            <input
              type="radio"
              value="fresher"
              checked={experienceLevel === "fresher"}
              onChange={(e) => setExperienceLevel(e.target.value)}
            />
            Fresher
          </label>

          <label>
            <input
              type="radio"
              value="experienced"
              checked={experienceLevel === "experienced"}
              onChange={(e) => setExperienceLevel(e.target.value)}
            />
            Experienced
          </label>
        </div>

        {experienceLevel === "experienced" && (
          <input
            type="number"
            placeholder="Years of Experience"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {result && result.errorMessage && (
        <div className="error-card">❌ {result.errorMessage}</div>
      )}

      {result && !result.errorMessage && (
        <div className="result-card">
          <div className="score-circle">{result.atsScore}%</div>
          <p className="recommend">{result.message}</p>
          <p className="engine-name">Powered by {result.engine}</p>
        </div>
      )}
    </div>
  );
}

export default App;
