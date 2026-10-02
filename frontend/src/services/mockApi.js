function hashString(value) {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}

function seededValue(seed, min = 0, max = 1) {
  const x = Math.sin(seed) * 10000;
  const normalized = x - Math.floor(x);

  return min + normalized * (max - min);
}

export async function predictImageMock(file) {
  // Simulate backend processing time
  await new Promise((resolve) => setTimeout(resolve, 2000));

  /*
   * Build a deterministic signature from the file.
   *
   * Same file metadata + same size
   * -> same signature
   * -> same result.
   */
  const fileSignature = [
    file.name,
    file.type,
    file.size,
    file.lastModified,
  ].join("|");

  const baseSeed = hashString(fileSignature);

  // ---------------------------------------------------------
  // DETERMINISTIC MOCK VALUES
  // ---------------------------------------------------------

  const aiProbability = seededValue(
    baseSeed,
    0.05,
    0.95
  );

  const anomalyScore = seededValue(
    baseSeed + 1,
    0.2,
    4.8
  );

  const confidence = seededValue(
    baseSeed + 2,
    0.70,
    0.95
  );

  const frequencyEnergy = seededValue(
    baseSeed + 3,
    0.1,
    1.0
  );

  const noiseVariance = seededValue(
    baseSeed + 4,
    0.001,
    0.01
  );

  const compressionScore = seededValue(
    baseSeed + 5,
    0.1,
    1.0
  );

  const textureScore = seededValue(
    baseSeed + 6,
    0.1,
    1.0
  );

  const isAiGenerated = aiProbability >= 0.5;

  return {
    is_ai_generated: isAiGenerated,

    ai_probability: Number(
      aiProbability.toFixed(3)
    ),

    score: Number(
      anomalyScore.toFixed(2)
    ),

    confidence: Number(
      confidence.toFixed(3)
    ),

    features_summary: {
      freq_energy_ratio: Number(
        frequencyEnergy.toFixed(3)
      ),

      noise_variance: Number(
        noiseVariance.toFixed(5)
      ),

      compression_score: Number(
        compressionScore.toFixed(3)
      ),

      texture_score: Number(
        textureScore.toFixed(3)
      ),
    },

    heatmap_path: null,

    metadata: {
      filename: file.name,
      content_type: file.type,
      analysis_time: 2,
      model: "Mock Zero-Shot Detector",
    },
  };
}