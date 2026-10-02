import { useEffect, useState } from "react";
import "./App.css";

import { useImageAnalysis } from "./hooks/useImageAnalysis";

import AnalysisLoader from "./components/analysis/AnalysisLoader";
import VerdictCard from "./components/analysis/VerdictCard";
import ExplainabilityPanel from "./components/analysis/ExplainabilityPanel";
import AnalysisHistory from "./components/analysis/AnalysisHistory";

import UploadZone from "./components/upload/UploadZone";
import ImagePreview from "./components/upload/ImagePreview";

import { validateImageFile } from "./utils/fileValidation";

const HISTORY_KEY = "ai-image-analysis-history";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  const [history, setHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem(HISTORY_KEY);

      if (!savedHistory) {
        return [];
      }

      const parsedHistory = JSON.parse(savedHistory);

      return Array.isArray(parsedHistory)
        ? parsedHistory
        : [];
    } catch (error) {
      console.error(
        "Failed to load analysis history:",
        error
      );

      return [];
    }
  });

  const {
    loading,
    result,
    error: analysisError,
    analyzeImage,
    resetAnalysis,
  } = useImageAnalysis();

  // ---------------------------------------------------------
  // SAVE HISTORY TO LOCAL STORAGE
  // ---------------------------------------------------------

  useEffect(() => {
    try {
      localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history)
      );
    } catch (error) {
      console.error(
        "Failed to save analysis history:",
        error
      );
    }
  }, [history]);

  // ---------------------------------------------------------
  // HANDLE FILE SELECTION
  // ---------------------------------------------------------

  const handleFileSelected = (file) => {
    setError("");

    const validation = validateImageFile(file);

    if (!validation.valid) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setError(validation.error);
      return;
    }

    setSelectedFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    resetAnalysis();
  };

  // ---------------------------------------------------------
  // HANDLE IMAGE ANALYSIS
  // ---------------------------------------------------------

  const handleAnalyze = async () => {
    if (!selectedFile) {
      return;
    }

    // Run analysis
    await analyzeImage(selectedFile);
  };

  // ---------------------------------------------------------
  // ADD RESULT TO HISTORY
  // ---------------------------------------------------------

  useEffect(() => {
    if (!result || !selectedFile) {
      return;
    }

    const historyItem = {
      id: `${selectedFile.name}-${selectedFile.size}-${selectedFile.lastModified}`,

      filename: selectedFile.name,

      content_type: selectedFile.type,

      is_ai_generated: result.is_ai_generated,

      ai_probability: result.ai_probability,

      analysis_time: new Date().toLocaleString(),
    };

    setHistory((previousHistory) => {
      // Prevent duplicate entries when React re-renders
      const alreadyExists = previousHistory.some(
        (item) => item.id === historyItem.id
      );

      if (alreadyExists) {
        return previousHistory;
      }

      return [
        historyItem,
        ...previousHistory,
      ].slice(0, 10);
    });
  }, [result, selectedFile]);

  // ---------------------------------------------------------
  // REMOVE SELECTED IMAGE
  // ---------------------------------------------------------

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError("");

    resetAnalysis();
  };

  // ---------------------------------------------------------
  // CLEAR HISTORY
  // ---------------------------------------------------------

  const handleClearHistory = () => {
    setHistory([]);

    localStorage.removeItem(HISTORY_KEY);
  };

  // ---------------------------------------------------------
  // CLEAN UP PREVIEW URL
  // ---------------------------------------------------------

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------

  return (
    <div className="app">
      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">AI</div>

          <div>
            <h1>AI Image Forensics</h1>
            <p>Zero-Shot Image Detection</p>
          </div>
        </div>

        <nav className="nav-links">
          <a href="#how-it-works">
            How It Works
          </a>

          <a href="#about">
            About
          </a>
        </nav>
      </header>

      {/* =====================================================
          MAIN
          ===================================================== */}

      <main>
        {/* ===================================================
            HERO
            =================================================== */}

        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">
              ZERO-SHOT AI IMAGE DETECTION
            </span>

            <h2>
              Is this image
              <span> AI-generated?</span>
            </h2>

            <p className="hero-description">
              Analyze images for patterns associated with
              synthetic content — including images generated by
              models that were never seen during training.
            </p>

            {/* =================================================
                UPLOAD / PREVIEW
                ================================================= */}

            {!selectedFile ? (
              <UploadZone
                onFileSelected={handleFileSelected}
              />
            ) : (
              <ImagePreview
                file={selectedFile}
                previewUrl={previewUrl}
                onRemove={handleRemove}
              />
            )}

            {/* =================================================
                FILE ERROR
                ================================================= */}

            {error && (
              <div className="upload-error">
                {error}
              </div>
            )}

            {/* =================================================
                ANALYSIS
                ================================================= */}

            {selectedFile && (
              <>
                <button
                  type="button"
                  className="analyze-button"
                  onClick={handleAnalyze}
                  disabled={loading}
                >
                  {loading
                    ? "Analyzing..."
                    : "Analyze Image"}
                </button>

                {analysisError && (
                  <div className="upload-error">
                    {analysisError}
                  </div>
                )}

                {loading && <AnalysisLoader />}

                {result && !loading && (
                  <>
                    <VerdictCard result={result} />

                    <ExplainabilityPanel
                      result={result}
                      previewUrl={previewUrl}
                    />
                  </>
                )}
              </>
            )}
          </div>
        </section>

        {/* =====================================================
            ANALYSIS HISTORY
            ===================================================== */}

        <AnalysisHistory
          history={history}
          onClear={handleClearHistory}
        />

        {/* =====================================================
            HOW IT WORKS
            ===================================================== */}

        <section
          id="how-it-works"
          className="how-it-works"
        >
          <div className="section-heading">
            <span className="eyebrow">
              HOW IT WORKS
            </span>

            <h2>
              From pixels to forensic evidence.
            </h2>

            <p>
              The system combines visual representations with
              image-level forensic signals before performing
              anomaly detection.
            </p>
          </div>

          <div className="pipeline">
            <div className="pipeline-card">
              <span>01</span>

              <h3>Visual Features</h3>

              <p>
                Foundation-model representations capture
                meaningful visual patterns.
              </p>
            </div>

            <div className="pipeline-arrow">
              →
            </div>

            <div className="pipeline-card">
              <span>02</span>

              <h3>Forensic Analysis</h3>

              <p>
                Frequency, noise, compression and texture
                signals are examined.
              </p>
            </div>

            <div className="pipeline-arrow">
              →
            </div>

            <div className="pipeline-card">
              <span>03</span>

              <h3>Anomaly Detection</h3>

              <p>
                The combined representation is compared with
                patterns learned from real images.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer id="about">
        <p>
          Zero-Shot AI Image Detector · Research Project
        </p>
      </footer>
    </div>
  );
}

export default App;