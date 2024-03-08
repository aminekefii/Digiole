import React, { useState } from "react";
import axios from "axios";
import { FiUpload } from 'react-icons/fi';

function FileUpload() {
    const [file, setFile] = useState(null);

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const upload = () => {
        const formData = new FormData();
        formData.append('file', file);
        axios.post('http://localhost:3001/upload', formData)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <>
            <input
                id="file-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
            />
            <label htmlFor="file-upload">
                <FiUpload style={{ cursor: 'pointer', marginLeft: '10px' }} />
            </label>
            <button type="button" onClick={upload}>Upload</button>
        </>
    );
}

export default FileUpload;
