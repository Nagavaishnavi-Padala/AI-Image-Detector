import { useRef, useState } from "react";

function UploadZone({ onFileSelected }) {
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  // ---------------------------------------------------------
  // HANDLE FILE
  // ---------------------------------------------------------

  const handleFile = (file) => {
    if (!file) {
      return;
    }

    onFileSelected(file);
  };

  // ---------------------------------------------------------
  // FILE INPUT
  // ---------------------------------------------------------

  const handleInputChange = (event) => {
    const file = event.target.files?.[0];

    handleFile(file);

    // Allow selecting the same file again
    event.target.value = "";
  };

  // ---------------------------------------------------------
  // OPEN FILE SELECTOR
  // ---------------------------------------------------------

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  // ---------------------------------------------------------
  // DRAG EVENTS
  // ---------------------------------------------------------

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files?.[0];

    handleFile(file);
  };

  // ---------------------------------------------------------
  // KEYBOARD ACCESSIBILITY
  // ---------------------------------------------------------

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      handleChooseImage();
    }
  };

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------

  return (
    <div
      className={`upload-zone ${
        dragging ? "dragging" : ""
      }`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleChooseImage}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Upload an image for AI generation analysis"
    >
      {/* Hidden file input */}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        aria-label="Choose an image to analyze"
        onChange={handleInputChange}
        hidden
      />

      {/* Upload icon */}

      <div className="upload-icon" aria-hidden="true">
        ↑
      </div>

      {/* Upload text */}

      <h3>Drop your image here</h3>

      <p>
        or choose an image from your device
      </p>

      {/* Choose button */}

      <button
        type="button"
        className="choose-button"
        onClick={(event) => {
          event.stopPropagation();
          handleChooseImage();
        }}
        aria-label="Choose an image from your device"
      >
        Choose Image
      </button>

      {/* Supported formats */}

      <p className="file-types">
        JPG · JPEG · PNG · WEBP
      </p>
    </div>
  );
}

export default UploadZone;