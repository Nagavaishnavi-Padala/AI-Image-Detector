const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export function validateImageFile(file) {
  if (!file) {
    return {
      valid: false,
      error: "Please select an image.",
    };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Unsupported format. Please use JPG, PNG, or WEBP.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: "Image size must be smaller than 10 MB.",
    };
  }

  return {
    valid: true,
    error: null,
  };
}