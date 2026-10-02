import { useState } from "react";
import { predictImageMock } from "../services/mockApi";

export function useImageAnalysis() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const analyzeImage = async (file) => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await predictImageMock(file);

      setResult(response);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to analyze the image. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setError("");
  };

  return {
    loading,
    result,
    error,
    analyzeImage,
    resetAnalysis,
  };
}