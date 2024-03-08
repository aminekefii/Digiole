
import React, { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "",
    dangerouslyAllowBrowser: true
  });
const TextToSpeech = ({ text }) => {
  const [audioUrl, setAudioUrl] = useState("");

  const handleTextToSpeech = async () => {
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    const audioBlob = await response.arrayBuffer();
    const audioUrl = URL.createObjectURL(new Blob([audioBlob]));
    setAudioUrl(audioUrl);

    // Play the audio
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <span onClick={handleTextToSpeech} style={{ cursor: "pointer" }}>
      🔊
    </span>
  );
};

export default TextToSpeech;
