function VerdictCard({ result }) {
  const probability =
    Math.round(result.ai_probability * 100);

  const verdict = result.is_ai_generated
    ? "AI-Generated"
    : "Real Image";

  return (
    <div
      className={`verdict-card ${
        result.is_ai_generated ? "ai-result" : "real-result"
      }`}
    >
      <span className="result-label">
        ANALYSIS RESULT
      </span>

      <h2>{verdict}</h2>

      <div className="probability">
        {probability}%
      </div>

      <p>
        AI-generation probability
      </p>
    </div>
  );
}

export default VerdictCard;