import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileTable() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/files')
      .then(response => {
        setFiles(response.data.files);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Files</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file, index) => (
          <tr key={index}>
            <td>{file}</td>
          </tr>
          
        ))}
      </tbody>
    </table>
  );
}

export default FileTable;
