"use client";
import { useToken } from "../context/TokenContext";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Airesponse from "./Airesponse";

const Form = () => {
  const [day, setDay] = useState(new Date());
  const [today, setToday] = useState(false);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useToken();

  const fetchEmails = async (accessToken) => {
    setLoading(true);
    let from, to;

    if (today) {
      from = new Date(); // Now
      to = new Date();
      to.setDate(to.getDate() + 1); // Tomorrow
    } else {
      from = new Date(day);
      to = new Date(day);
      to.setDate(to.getDate() + 1);
    }

    const after = from.toISOString().split("T")[0].replace(/-/g, "/");
    const before = to.toISOString().split("T")[0].replace(/-/g, "/");

    const res = await fetch(
      `https://www.googleapis.com/gmail/v1/users/me/messages?q=after:${after} before:${before}&maxResults=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    const fetchedEmails = [];

    for (const msg of data.messages || []) {
      const email = await getFullMessage(msg.id, accessToken);
      if (email) fetchedEmails.push(email);
    }
    setEmails(fetchedEmails);
    console.log(fetchedEmails);
    setLoading(false);
  };
  // can fetch mail id and ask gemini to create a hyperlink for that specific email

  const decodeBase64 = (str) =>
    decodeURIComponent(
      atob(str.replace(/-/g, "+").replace(/_/g, "/"))
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

  const extractPlainText = (payload) => {
    if (!payload) return "";

    if (payload.parts && payload.parts.length > 0) {
      for (const part of payload.parts) {
        if (part.mimeType === "text/plain" && part.body?.data) {
          return decodeBase64(part.body.data);
        } else if (part.parts) {
          const text = extractPlainText(part);
          if (text) return text;
        }
      }
    }

    if (payload.mimeType === "text/plain" && payload.body?.data) {
      return decodeBase64(payload.body.data);
    }

    return "";
  };

  const getFullMessage = async (messageId, accessToken) => {
    const res = await fetch(
      `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const message = await res.json();

    if (!message.payload || !message.payload.headers) {
      console.warn(
        `Skipping message ${messageId} due to missing payload or headers`
      );
      return null;
    }

    const headers = message.payload.headers;
    const subject =
      headers.find((h) => h.name === "Subject")?.value || "(No Subject)";
    const from =
      headers.find((h) => h.name === "From")?.value || "(Unknown Sender)";
    const date = headers.find((h) => h.name === "Date")?.value;

    let body = "";
    try {
      body = extractPlainText(message.payload);
    } catch (e) {
      console.warn(`Could not decode body for message ${messageId}`);
    }

    return { subject, from, date, body };
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 text-xl">
      {/* Single Day Picker */}
      <div className="flex flex-row gap-5">
        <div className="flex flex-col items-center">
          <label
            className={`mb-2 font-semibold text-gray-400 ${
              today && "opacity-30"
            }`}
          >
            Day
          </label>
          <DatePicker
            disabled={today}
            className="w-35 text-center border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-3 focus:ring-neutral-700 font-medium disabled:opacity-30"
            selected={day}
            onChange={(date) => setDay(date)}
          />
        </div>
        <div className="flex flex-row gap-4 items-center ">
          <label className="font-semibold text-neutral-400">Today?</label>
          <input
            type="checkbox"
            className="w-5 h-5 rounded border-gray-300 border-4 checked:bg-black"
            checked={today}
            onChange={(e) => setToday(e.target.checked)}
          />
        </div>
      </div>

      {!token && <p>Please Sign in Again</p>}
      <button
        onClick={() => fetchEmails(token)}
        className="mt-4 px-4 py-2 bg-slate-600 font-semibold text-white rounded cursor-pointer hover:bg-slate-700 transition-all"
      >
        Fetch Email Data
      </button>
      {loading && (
        <div className="flex justify-center">
          <div className="w-5 h-5 border-2 border-neutral-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {emails.length > 4 ? (
        <div>
          <p className="para-subheading mb-4">Emails have been fetched!</p>
          <Airesponse emails={emails} />
        </div>
      ) : (
        <div>
          <p className="para-subheading mb-4">No emails as of now!</p>
        </div>
      )}
    </div>
  );
};

export default Form;
