import React, { useState } from "react";
import "../../styles/bot.css";

const FaqAi = () => {
  const [faqQuestion, setFaqQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  async function query(data: any) {
    const response = await fetch(
      "https://www.stack-inference.com/run_deployed_flow?flow_id=64d3a0fffd67c8c48e72f225&org=1ff7c3b6-3270-44a7-87e7-cdf61cae62d5",
      {
        headers: {
          Authorization: "Bearer 56c85bc0-78c6-4a14-9ff9-ad2017122696",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result["out-0"];
  }

  const askQuery = () => {
    setChatHistory([...chatHistory, { type: "user", text: faqQuestion }]);
    query({ "in-0": faqQuestion }).then((answer) => {
      setChatHistory([
        ...chatHistory,
        { type: "user", text: faqQuestion },
        { type: "bot", text: answer },
      ]);
    });
    setFaqQuestion("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      askQuery();
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col px-20 justify-between items-center overflow-hidden">
      <div className="flex-grow overflow-auto pt-20">
        <div className="p-2 my-1 text-right">
          <span className="bg-blue-200 px-3 py-2 rounded inline-block text-black">
            Hello I'm an ai bot assistant🤖. I'm here to answer any questions
            you would have. So how can I help you?
          </span>
        </div>
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`p-2 my-1 ${
              message.type === "user" ? "text-left" : "text-right"
            }`}
          >
            <span
              className={`px-3 py-2 rounded inline-block ${
                message.type === "user"
                  ? "bg-light-gray"
                  : "bg-blue-200 text-black"
              }`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={faqQuestion}
          onChange={(e) => setFaqQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask your question..."
          className="flex-grow p-2 border rounded-l"
        />
        <div id="submit" onClick={askQuery}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
            className="h-4 w-4 m-1 md:m-0"
            strokeWidth="2"
          >
            <path
              d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <p className="info py-3">
          If anything is unclear please contact{" "}
          <strong>techpietrek@gmail.com</strong>
        </p>
      </div>
    </div>
  );
};

export default FaqAi;
