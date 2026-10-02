function VerdictCard({ result }) {
  const probability = Math.round(
    result.ai_probability * 100
  );

  const confidence = Math.round(
    result.confidence * 100
  );

  const verdict = result.is_ai_generated
    ? "AI-Generated"
    : "Real Image";

  const score = result.score.toFixed(2);

  return (
    <div className="analysis-result">
      {/* =====================================================
          MAIN VERDICT
          ===================================================== */}

      <div
        className={`verdict-card ${
          result.is_ai_generated
            ? "ai-result"
            : "real-result"
        }`}
      >
        <span className="result-label">
          ANALYSIS RESULT
        </span>

        <h2>{verdict}</h2>

        <div className="probability">
          {probability}%
        </div>

        <p>AI-generation probability</p>
      </div>

      {/* =====================================================
          SCORE SUMMARY
          ===================================================== */}

      <div className="score-grid">
        <div className="score-card">
          <span>Anomaly Score</span>

          <strong>{score}</strong>
        </div>

        <div className="score-card">
          <span>Confidence</span>

          <strong>{confidence}%</strong>
        </div>
      </div>

      {/* =====================================================
          FORENSIC FEATURES
          ===================================================== */}

      <div className="forensic-section">
        <div className="result-section-heading">
          <span className="result-label">
            FORENSIC ANALYSIS
          </span>

          <h3>Feature Summary</h3>
        </div>

        <div className="feature-grid">
          <FeatureCard
            label="Frequency Energy"
            value={
              result.features_summary
                .freq_energy_ratio
            }
          />

          <FeatureCard
            label="Noise Variance"
            value={
              result.features_summary
                .noise_variance
            }
          />

          <FeatureCard
            label="Compression"
            value={
              result.features_summary
                .compression_score
            }
          />

          <FeatureCard
            label="Texture"
            value={
              result.features_summary
                .texture_score
            }
          />
        </div>
      </div>

      {/* =====================================================
          METADATA
          ===================================================== */}

      <div className="metadata-section">
        <div className="result-section-heading">
          <span className="result-label">
            ANALYSIS DETAILS
          </span>
        </div>

        <div className="metadata-grid">
          <MetadataItem
            label="File"
            value={result.metadata.filename}
          />

          <MetadataItem
            label="Format"
            value={result.metadata.content_type}
          />

          <MetadataItem
            label="Model"
            value={result.metadata.model}
          />

          <MetadataItem
            label="Processing Time"
            value={`${result.metadata.analysis_time}s`}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FEATURE CARD
   ========================================================= */

function FeatureCard({ label, value }) {
  return (
    <div className="feature-card">
      <span>{label}</span>

      <strong>{value}</strong>
    </div>
  );
}

/* =========================================================
   METADATA ITEM
   ========================================================= */

function MetadataItem({ label, value }) {
  return (
    <div className="metadata-item">
      <span>{label}</span>

      <strong>{value}</strong>
    </div>
  );
}

export default VerdictCard;