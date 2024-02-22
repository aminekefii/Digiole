import React from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { IconButton } from "@chakra-ui/react/dist/chakra-ui-react.cjs";

const MessageInput = ({ placeholder, onSend }) => {
    const handleSendClick = () => {
        // Implement your send message logic here
        onSend();
    };

    const handleMicrophoneClick = () => {
        // Implement your microphone click logic here
        // For example, start recording audio
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="text" placeholder={placeholder} />
            <button onClick={handleSendClick}>Send</button>
            <IconButton
                aria-label="Microphone"
                icon={<BellIcon />}
                //onClick={handleMicrophoneClick}
            />
        </div>
    );
};

export default MessageInput;
