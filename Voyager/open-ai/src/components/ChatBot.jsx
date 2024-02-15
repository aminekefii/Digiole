import React, { useState } from "react";
import apiService from "../apiService";

export default function ChatBot() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await apiService.chat(prompt);
    if (data) {
      setResponse(data);
    }
    setPrompt("");
  };

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="container container-sm p-1">
      <h1 className="title text-center text-darkGreen">ChatBot API</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Ask questions</label>
          <input
            className="shadow-sm"
            type="text"
            placeholder="Enter text"
            value={prompt}
            onChange={handlePrompt}
          />
        </div>
        <button className="btn btn-accept w-100" type="submit">
          Go
        </button>
      </form>
      <div className="bg-darkGreen mt-2 p-1 border-5">
        <p className="text-light">{response ? response : "Ask me anything..."}</p>
      </div>
    </div>
  );
}
