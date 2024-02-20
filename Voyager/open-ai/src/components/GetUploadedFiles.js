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
      const response = await axios.get(`/uploads/${filename}`);
      const csvData = response.data;
      const jsonData = convertCSVToJson(csvData);
  
      const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(jsonBlob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename.replace(".csv", "")}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
  
      // Optionally, you can move the file to the public/convertedFiles directory
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const fileContent = fileReader.result;
        const convertedFile = new Blob([fileContent], { type: "application/json" });
        const convertedUrl = URL.createObjectURL(convertedFile);
        const convertedLink = document.createElement("a");
        convertedLink.href = convertedUrl;
        convertedLink.download = `${filename.replace(".csv", "")}.json`;
        document.body.appendChild(convertedLink);
        convertedLink.click();
        document.body.removeChild(convertedLink);
      };
      fileReader.readAsText(jsonBlob);
  
    } catch (error) {
      console.error("Error converting to JSON:", error);
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
