function ImagePreview({ file, previewUrl, onRemove }) {
  if (!file || !previewUrl) {
    return null;
  }

  const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);

  return (
    <div className="image-preview-card">
      <div className="preview-image-wrapper">
        <img
          src={previewUrl}
          alt={`Preview of ${file.name}`}
          className="preview-image"
        />
      </div>

      <div className="file-details">
        <div>
          <h3>{file.name}</h3>

          <p>
            {file.type} · {fileSizeInMB} MB
          </p>
        </div>

        <button
          type="button"
          className="remove-button"
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default ImagePreview;