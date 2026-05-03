const pdf = require("pdf-parse");
const mammoth = require("mammoth");
const calculateATS = require("../utils/atsEngine");

const atsController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Resume file is required",
      });
    }

    const jobDescription = req.body.jobDescription;
    const experienceLevel = req.body.experienceLevel;
    const years = req.body.years;

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        error: "Job description or role question is required",
      });
    }

    let resumeText = "";

    if (req.file.mimetype === "application/pdf") {
      const pdfData = await pdf(req.file.buffer);
      resumeText = pdfData.text;
    } else if (req.file.mimetype === "text/plain") {
      resumeText = req.file.buffer.toString("utf-8");
    } else if (req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      resumeText = result.value;
    } else {
      return res.status(400).json({
        error: "Only PDF, TXT, and DOCX files allowed",
      });
    }

    if (!resumeText || resumeText.length < 200) {
      return res.status(400).json({
        error: "Uploaded file does not appear to be a valid resume.",
      });
    }

    // ===== GENERIC QUESTION MODE =====
    const isGeneric = jobDescription.length < 40;

    if (isGeneric) {
      let message = "";
      let atsScore = 0;

      if (experienceLevel === "fresher") {
        atsScore = 75;

        message =
          "As a fresher, your resume structure looks good. Focus on adding measurable achievements and deployment links.";
      } else {
        atsScore = 65;

        message = `For ${years} years experienced candidate, add more quantified achievements and real-world impact metrics.`;
      }

      return res.json({
        status: "Success",
        analysis: {
          atsScore,
          addSkills: [],
          removeSkills: [],
          message,
          engine: "FitSense Engine",
        },
      });
    }

    // ===== PROPER JOB DESCRIPTION MODE =====
    const result = calculateATS(resumeText, jobDescription);

    result.engine = "FitSense Engine";

    return res.json({
      status: "Success",
      analysis: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Something went wrong in FitSense Engine.",
    });
  }
};

module.exports = atsController;
