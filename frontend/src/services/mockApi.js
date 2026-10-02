export async function predictImageMock(file) {
  // Simulate backend processing time
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulated prediction
  const aiProbability = Math.random();

  const isAiGenerated = aiProbability >= 0.5;

  return {
    is_ai_generated: isAiGenerated,
    ai_probability: aiProbability,
    score: Number((aiProbability * 5).toFixed(2)),

    features_summary: {
      freq_energy_ratio: Number(Math.random().toFixed(3)),
      noise_variance: Number((Math.random() * 0.01).toFixed(5)),
      compression_score: Number(Math.random().toFixed(3)),
      texture_score: Number(Math.random().toFixed(3)),
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