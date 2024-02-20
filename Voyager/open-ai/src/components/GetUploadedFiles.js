import React, { useState, useEffect } from 'react';
import axios from 'axios';

const convertCSVToJson = (csvData) => {
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const result = [];
  
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",");
  
      for (let j = 0; j < headers.length; j++) {
        const value = currentLine[j] !== undefined ? currentLine[j].trim() : '';
        obj[headers[j].trim()] = value;
      }
  
      result.push(obj);
    }
  
    return result;
  };
  

const fetchFiles = async () => {
  try {
    const response = await axios.get('http://localhost:3001/files');
    return response.data.files;
  } catch (error) {
    console.error('Error fetching files:', error);
    return [];
  }
};

const getFileData = async (filename) => {
    try {
      // Use the public folder path to access files
      const response = await axios.get(`/uploads/${filename}`);
      return response.data; // Return only the data, not the entire response object
    } catch (error) {
      console.error('Error getting file data:', error);
      return null;
    }
  };
  

function FileTable() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles().then(files => {
      setFiles(files);
    });
  }, []);

  const handleConvertToJson = async (filename) => {
    try {
      const fileData = await getFileData(filename);
      if (fileData) {
        const jsonData = convertCSVToJson(fileData);
        console.log(jsonData);
      }
    } catch (error) {
      console.error('Error converting to JSON:', error);
    }
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Files</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file, index) => (
          <tr key={index}>
            <td>{file}</td>
            <td>
              <button onClick={() => handleConvertToJson(file)}>Convert to JSON</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FileTable;
