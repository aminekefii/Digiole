import React, { useState } from "react";
import axios from "axios";
import { convertCSVToJson } from "./Utils";

const CSVToJsonConverter = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleCSVInputChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvData = e.target.result;
      const jsonData = convertCSVToJson(csvData);

      // Save JSON data to a file
      const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(jsonBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${file.name.replace(".csv", "")}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Update the state
      setJsonData(jsonData);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" onChange={handleCSVInputChange} />
      {jsonData && (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      )}
    </div>
  );
};

export default CSVToJsonConverter;
