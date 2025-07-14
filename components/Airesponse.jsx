import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';


const Airesponse = ({ emails }) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const [aiReply, setAiReply] = useState("");

  const getGeminiResponse = async () => {
    const formattedEmails = emails
      .map(
        (email, i) =>
          `Email ${i + 1}:\nFrom: ${email.from}\nSubject: ${
            email.subject
          }\nDate: ${email.date}\nBody: ${email.body}\n`
      )
      .join("\n\n");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedEmails,
      config: {
        systemInstruction:
          `You are an intelligent AI assistant helping a user understand and act on their daily email summary.

Please do the following:

1. Provide a section titled "**Summary of Key Points:**"
   - Use bullet points ('*') for each item.
   - Bold any **important terms** like categories or subject lines. For example: **Security Alert**, **Financial Alert**, or names like .

2. Then provide a second section titled "**Important Emails Needing a Reply/Action:**"
   - Use bullet points again.
   - Clearly highlight the subject of the email in bold.
   - Explain why each email is important and whether it needs a **reply** or **immediate action**.

3. Return the result in Markdown format.

Your formatting must follow this style:
* **Bolded Category:** Description of email

Be clear, professional, and easy to skim and don't exceed 120 words.
`,
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });
    setAiReply(response.text);
  };
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <button
        className="bg-red-400 py-1 px-2 rounded-xl cursor-pointer hover:bg-red-500"
        onClick={getGeminiResponse}
      >
        Get AI Response
      </button>
      <div className="dark:bg-neutral-900 border-2 border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-md max-w-4xl w-full">
        {aiReply && (
          <p className="text-neutral-400 whitespace-pre-wrap">
  {aiReply}
</p>

        )}
      </div>
    </div>
  );
};

export default Airesponse;
