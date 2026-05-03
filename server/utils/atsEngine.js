function cleanText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s/]/g, "")
    .replace(/\s+/g, " ");
}

function extractWords(text) {
  return cleanText(text)
    .split(/[\s/]+/)
    .filter((word) => word.length > 2);
}

// Domain groups
const domains = {
  fullstack: ["react", "node", "mongodb", "express", "javascript"],
  frontend: ["react", "html", "css", "javascript"],
  backend: ["node", "express", "api", "database"],
  aiml: ["python", "tensorflow", "pytorch", "machine", "learning", "ai"],
  prompt: ["prompt", "llm", "openai", "gpt", "fine-tuning"],
  devops: ["docker", "aws", "kubernetes"],
};

function detectDomain(words) {
  let domainScores = {};

  Object.keys(domains).forEach((domain) => {
    domainScores[domain] = domains[domain].filter((skill) =>
      words.includes(skill),
    ).length;
  });

  // Highest score domain
  let primaryDomain = Object.keys(domainScores).reduce((a, b) =>
    domainScores[a] > domainScores[b] ? a : b,
  );

  return primaryDomain;
}

function calculateATS(resumeText, jobDescription) {
  const resumeWords = extractWords(resumeText);
  const jobWords = extractWords(jobDescription);

  const resumeDomain = detectDomain(resumeWords);
  const jobDomain = detectDomain(jobWords);

  let matched = [];
  let missing = [];

  jobWords.forEach((word) => {
    if (resumeWords.includes(word)) {
      matched.push(word);
    } else {
      missing.push(word);
    }
  });

  const score =
    jobWords.length === 0
      ? 0
      : Math.round((matched.length / jobWords.length) * 100);

  let alignmentMessage = "";
  let removeSuggestion = [];
  let addSuggestion = missing;

  if (resumeDomain === jobDomain && score >= 70) {
    alignmentMessage =
      "YES ✅ Your resume is well aligned with this job role. All the best for your job!";
  } else {
    alignmentMessage = `NO ❌ Your resume is mainly focused on ${resumeDomain} but the job requires ${jobDomain}.`;

    // Suggest remove unrelated skills
    removeSuggestion = domains[resumeDomain].filter(
      (skill) => !jobWords.includes(skill),
    );
  }

  return {
    atsScore: score,
    resumeDomain,
    jobDomain,
    matchedSkills: matched,
    addTheseSkills: addSuggestion,
    removeTheseSkills: removeSuggestion,
    alignmentMessage,
  };
}

module.exports = calculateATS;
