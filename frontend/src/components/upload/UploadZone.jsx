import { useRef, useState } from "react";

function UploadZone({ onFileSelected }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    if (!file) return;

    onFileSelected(file);
  };

  const handleInputChange = (event) => {
    const file = event.target.files?.[0];

    handleFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    handleFile(file);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`upload-zone ${isDragging ? "dragging" : ""}`}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="upload-icon">↑</div>

      <h3>Drop your image here</h3>

      <p>or choose an image from your device</p>

      <button
        type="button"
        className="choose-button"
        onClick={openFilePicker}
      >
        Choose Image
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        hidden
      />

      <span className="file-types">
        JPG · JPEG · PNG · WEBP
      </span>
    </div>
  );
}

export default UploadZone;