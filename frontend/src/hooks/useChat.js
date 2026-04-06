// hooks/useChat.js
import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/chat"; // adjust if using proxy

let nextId = 0;
const uid = () => nextId++;

export function useChat() {
  const [messages, setMessages] = useState([
    { id: uid(), role: "assistant", data: { type: "welcome" } },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(
    async (text) => {
      const userText = text.trim();
      if (!userText || loading) return;

      // Add user message and a temporary "loading" assistant message
      const userMsg = { id: uid(), role: "user", content: userText };
      const loadingMsg = { id: uid(), role: "assistant", loading: true };

      setMessages((prev) => [...prev, userMsg, loadingMsg]);
      setLoading(true);

      try {
        const response = await axios.post(API_URL, { message: userText });
        const { status, data } = response.data;

        if (status === "success" && data) {
          // Transform backend response into a structured message
          const assistantMsg = {
            id: uid(),
            role: "assistant",
            data: {
              type: "structured",
              summary: data.summary || "",
              tables: data.tables || [],
              insights: data.insights || [],
            },
          };
          // Replace loading message with real response
          setMessages((prev) =>
            prev.map((msg) => (msg.id === loadingMsg.id ? assistantMsg : msg))
          );
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        console.error("API error:", error);
        // Show error message to user
        const errorMsg = {
          id: uid(),
          role: "assistant",
          data: {
            type: "structured",
            summary: "⚠️ Sorry, I couldn't reach the assistant. Please try again later.",
            tables: [],
            insights: [],
          },
        };
        setMessages((prev) =>
          prev.map((msg) => (msg.id === loadingMsg.id ? errorMsg : msg))
        );
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  return { messages, loading, sendMessage };
}