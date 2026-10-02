function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="section-heading">
        <span className="eyebrow">
          ABOUT THE PROJECT
        </span>

        <h2>
          Detecting synthetic images beyond known generators.
        </h2>

        <p>
          This project explores zero-shot detection of
          AI-generated images by learning patterns from real
          images rather than relying only on examples from
          specific known image generators.
        </p>
      </div>

      <div className="methodology-grid">
        <div className="methodology-card">
          <span>01</span>

          <h3>Visual Representation</h3>

          <p>
            Visual representations capture meaningful
            semantic patterns present in the image.
          </p>
        </div>

        <div className="methodology-card">
          <span>02</span>

          <h3>Forensic Signals</h3>

          <p>
            Image-level signals such as frequency, noise,
            compression and texture are considered as
            forensic evidence.
          </p>
        </div>

        <div className="methodology-card">
          <span>03</span>

          <h3>Feature Fusion</h3>

          <p>
            Visual and forensic information can be combined
            into a representation suitable for anomaly
            detection.
          </p>
        </div>

        <div className="methodology-card">
          <span>04</span>

          <h3>Explainability</h3>

          <p>
            The application provides an interface for visual
            evidence such as forensic heatmaps when supplied
            by the analysis backend.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;