import { predictImageMock } from "./mockApi";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8000";

const USE_MOCK_API =
  import.meta.env.VITE_USE_MOCK_API !== "false";

export async function predictImage(file) {
  if (USE_MOCK_API) {
    return predictImageMock(file);
  }

  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/predict`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    let message =
      "The image analysis request failed.";

    try {
      const errorData = await response.json();

      if (errorData.detail) {
        message = errorData.detail;
      }
    } catch {
      // Keep default error message
    }

    throw new Error(message);
  }

  return response.json();
}