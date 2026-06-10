"use client";

import { useState } from "react";

type Message = {
  sender: string;
  text: string;
};

type Props = {
  stakeholderName: string;
  stakeholderId: string;
  questionLimit: number;
};

export default function ChatClient({
  stakeholderName,
  stakeholderId,
  questionLimit,
}: Props) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [questionsRemaining, setQuestionsRemaining] =
    useState(questionLimit);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: stakeholderName,
      text: `Hello, I'm ${stakeholderName}. Feel free to ask me questions about my department, business challenges, priorities, and objectives.`,
    },
  ]);

  const sendQuestion = async () => {
    if (!question.trim()) return;
    if (loading) return;
    if (questionsRemaining <= 0) return;

    const currentQuestion = question;

    setQuestion("");

    setMessages((prev) => [
      ...prev,
      {
        sender: "You",
        text: currentQuestion,
      },
    ]);

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stakeholderId,
          question: currentQuestion,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: stakeholderName,
          text:
            data.answer ||
            "I am unable to answer that question at the moment.",
        },
      ]);

      setQuestionsRemaining((prev) => prev - 1);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: stakeholderName,
          text:
            "An error occurred while processing your request.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="bg-white border-b px-6 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Questions Remaining
            </p>

            <p className="text-2xl font-bold text-blue-600">
              {questionsRemaining}
            </p>
          </div>

          {questionsRemaining <= 0 && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium">
              Interview Complete
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === "You"
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <div
                className={
                  msg.sender === "You"
                    ? "bg-blue-600 text-white rounded-2xl px-5 py-4 max-w-xl"
                    : "bg-white shadow rounded-2xl px-5 py-4 max-w-xl"
                }
              >
                <div className="font-semibold mb-1">
                  {msg.sender}
                </div>

                <div>{msg.text}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white shadow rounded-2xl px-5 py-4 max-w-xl">
                <div className="font-semibold mb-1">
                  {stakeholderName}
                </div>

                <div>Thinking...</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-t p-5">
        <div className="flex gap-4">
          <input
            value={question}
            disabled={questionsRemaining <= 0}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendQuestion();
              }
            }}
            placeholder={
              questionsRemaining <= 0
                ? "Interview completed"
                : "Ask a discovery question..."
            }
            className="
              flex-1
              border
              border-slate-300
              rounded-xl
              px-4
              py-3
              text-slate-900
              disabled:bg-slate-100
            "
          />

          <button
            onClick={sendQuestion}
            disabled={
              loading || questionsRemaining <= 0
            }
            className="
              bg-blue-600
              hover:bg-blue-700
              disabled:bg-slate-400
              text-white
              px-8
              py-3
              rounded-xl
              font-medium
            "
          >
            {questionsRemaining <= 0
              ? "Completed"
              : "Send"}
          </button>
        </div>
      </div>
    </>
  );
}