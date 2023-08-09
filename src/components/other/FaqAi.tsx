import React, { useState } from "react";

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

  return (
    <div className="w-full h-full flex flex-col p-4 mt-20">
      <div className="flex-grow overflow-auto">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`p-2 my-1 ${
              message.type === "user"
                ? "text-left bg-blue-200"
                : "text-right bg-green-200"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={faqQuestion}
          onChange={(e) => setFaqQuestion(e.target.value)}
          placeholder="Ask your question..."
          className="flex-grow p-2 border rounded-l"
        />
        <button
          onClick={askQuery}
          className="px-4 bg-blue-500 text-white rounded-r"
        >
          Ask
        </button>
      </div>
    </div>
  );
};

export default FaqAi;
