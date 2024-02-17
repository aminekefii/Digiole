import React from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

const TextToSpeech = ({ text }) => {
  const handleTextToSpeech = () => {
    // Implement text to speech functionality here
    console.log("Text to speech for:", text);
  };

  return (
    <span onClick={handleTextToSpeech} style={{ cursor: "pointer" }}>
      🔊
    </span>
  );
};

export default TextToSpeech;
