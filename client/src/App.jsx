import { useState } from "react";
import axios from "axios";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || !jobDescription)
      return alert("Upload resume and add job description");

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/analyze",
        formData,
      );
      setResult(res.data.analysis);
    } catch (err) {
      alert("Error analyzing resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>ATS Analyzer</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".txt"
          onChange={(e) => setResume(e.target.files[0])}
        />
        <br />
        <br />

        <textarea
          rows="5"
          cols="50"
          placeholder="Paste Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <br />
        <br />

        <button type="submit">
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "40px" }}>
          <h2>ATS Score: {result.atsScore}%</h2>

          <h3>Matched Skills</h3>
          <ul>
            {result.matchedSkills.map((skill, i) => (
              <li key={i} style={{ color: "green" }}>
                {skill}
              </li>
            ))}
          </ul>

          <h3>Missing Skills</h3>
          <ul>
            {result.missingSkills.map((skill, i) => (
              <li key={i} style={{ color: "red" }}>
                {skill}
              </li>
            ))}
          </ul>

          <p>
            <strong>Recommendation:</strong> {result.recommendation}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
