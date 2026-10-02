function AnalysisHistory({ history, onClear }) {
  if (history.length === 0) {
    return (
      <section className="history-section">
        <div className="section-heading">
          <span className="eyebrow">ANALYSIS HISTORY</span>

          <h2>Your previous analyses.</h2>

          <p>
            Images analyzed during this session are stored locally
            in your browser.
          </p>
        </div>

        <div className="history-empty">
          <span className="history-empty-icon">◌</span>
          <h3>No analyses yet</h3>
          <p>
            Upload an image and analyze it to see your history here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="history-section">
      <div className="history-header">
        <div className="section-heading">
          <span className="eyebrow">ANALYSIS HISTORY</span>

          <h2>Your previous analyses.</h2>

          <p>
            Recent image analyses stored locally in your browser.
          </p>
        </div>

        <button
          type="button"
          className="clear-history-button"
          onClick={onClear}
        >
          Clear History
        </button>
      </div>

      <div className="history-list">
        {history.map((item) => {
          const probability = Math.round(
            item.ai_probability * 100
          );

          return (
            <div className="history-card" key={item.id}>
              <div className="history-card-main">
                <div className="history-file-icon">
                  IMG
                </div>

                <div className="history-file-info">
                  <h3>{item.filename}</h3>

                  <p>
                    {item.is_ai_generated
                      ? "AI-Generated"
                      : "Real Image"}
                    {" · "}
                    {probability}% AI probability
                  </p>
                </div>
              </div>

              <div className="history-card-meta">
                <span>{item.analysis_time}</span>
                <span>{item.content_type}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AnalysisHistory;