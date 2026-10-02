function ExplainabilityPanel({ result, previewUrl }) {
  const heatmapPath = result?.heatmap_path;

  return (
    <section className="explainability-section">
      <div className="result-section-heading">
        <span className="result-label">EXPLAINABILITY</span>
        <h3>Why was this result produced?</h3>
        <p>
          The detector can provide visual evidence highlighting
          image regions that contributed to the prediction.
        </p>
      </div>

      <div className="explainability-grid">
        <div className="explainability-card">
          <span className="explainability-label">ORIGINAL IMAGE</span>

          <div className="explainability-image">
            {previewUrl ? (
              <img src={previewUrl} alt="Original uploaded image" />
            ) : (
              <div className="image-placeholder">
                No image available
              </div>
            )}
          </div>
        </div>

        <div className="explainability-card">
          <span className="explainability-label">
            FORENSIC HEATMAP
          </span>

          <div className="explainability-image">
            {heatmapPath ? (
              <img
                src={heatmapPath}
                alt="Forensic analysis heatmap"
              />
            ) : (
              <div className="heatmap-placeholder">
                <div className="placeholder-icon">◌</div>
                <strong>Heatmap not available yet</strong>
                <p>
                  Visual forensic evidence will appear here when
                  the analysis backend provides a heatmap.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExplainabilityPanel;