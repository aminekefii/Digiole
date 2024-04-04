import React from 'react';
import axios from 'axios';

function App() {
  function sendToChatGPT() {
    let value = document.getElementById("word-input").value;

    let body = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: value }],
      tempreture: "1",
    };

    let headers = {
      Authorization: "Bearer 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",
    };

    axios
      .post("https://api.openai.com/v1/chat/completions", body, {
        headers: headers,
      })
      .then((response) => {
        let reply = response.data.choices[0].message.content;
        document.getElementById("reply-content").textContent = reply;
      });
  }

  return (
    <div id="main-container">
      <div>
        <h1 id="main-title">تحدث معي</h1>
      </div>
      <div id="main-content">
        <input id="word-input" type="text" placeholder="اسأل ما تشاء للذكاء الاصطناعي.."/>
        <button id="submit-btn" onClick={sendToChatGPT}>إرسال</button>
      </div>
      <div id="reply-content">
        أهلا بك.. اطرح أي سؤال يدور في بالك
      </div>
    </div>
  );
}

export default App;
