import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react'; // Import Button from Chakra UI

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

  const handleSaveNote = () => {
    // Handle saving the note if needed
  };

  return (
    <>
      <div className="container">
        <div className="box">
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <Button onClick={handleSaveNote} disabled={!isListening} colorScheme="blue">
            Send
          </Button>
          <Button onClick={() => setIsListening((prevState) => !prevState)} colorScheme="blue">
            {isListening ? 'Stop' : 'Start'} Listening
          </Button>
        </div>
      </div>
    </>
  );
}

export default VoiceRec;
