import React, { useState, useEffect } from 'react';
import { InputLeftElement, Image } from "@chakra-ui/react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';

function VoiceRec({ handleNoteChange }) {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log('continue..');
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log('Stopped Mic on Click');
      };
    }
    mic.onstart = () => {
      console.log('Mics on');
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      console.log(transcript);
      handleNoteChange(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };



  return (

    <Image
      src={isListening ? "images/micOn.svg" : "images/micOff.svg"}
      alt="Microphone"
      width="100px"
      cursor="pointer"
      onClick={() => setIsListening(!isListening)}
      mr="5px"
      height="20px"
      mt="15px"
    />

  );
}

export default VoiceRec;
