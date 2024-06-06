"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { authService } from "components/form/authService";
import { io } from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";

interface Message {
  id: number;
  Message: string;
  createdAt: string;
}

interface EnrichedMessage {
  senderId: number;
  receiverId: number;
  message: Message;
}

interface MessagesResponse {
  messages: EnrichedMessage[];
}

const Discussion = ({ Contactid }: { Contactid: number }) => {
  console.log(`Selected sender ID: ${Contactid}`);
  const [userId, setUserId] = useState<number | null>(null);
  const [messages, setMessages] = useState<MessagesResponse>({ messages: [] });
  const [newMessage, setNewMessage] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const userId = authService.getUserId();
    setUserId(userId);

    // Initialize WebSocket connection
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on("receiveMessage", (message: EnrichedMessage) => {
      setMessages((prevMessages) => ({
        messages: [...prevMessages.messages, message],
      }));
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!userId) {
          throw new Error("User ID not available");
        }

        const response = await fetch(
          `http://localhost:3001/api/v1/message/between/${userId}/${Contactid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();
        setMessages(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    
    const intervalId = setInterval(fetchMessages, 500); 

    return () => clearInterval(intervalId);
  
  }, [Contactid, userId]);

  const sortedMessages = messages.messages.sort((a, b) =>
    new Date(a.message.createdAt) > new Date(b.message.createdAt) ? 1 : -1
  );

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/message/createmessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: userId,
            receiver: Contactid,
            Message: newMessage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const sentMessage = await response.json();
      socket.emit("sendMessage", sentMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow">
        <nav className="md:sticky top-0 md:top-16">
          <div>
            <p>{Contactid}</p>
          </div>
        </nav>
        <div className="p-4 overflow-y-auto">
          {sortedMessages.map((msg) => (
            <div
              key={msg.message.id}
              className={`flex ${
                msg.senderId === userId ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`p-2 rounded ${
                  msg.senderId === userId ? "bg-blue-500 text-white" : "bg-gray-500 text-white"
                }`}
                style={{ maxWidth: "70%" }}
              >
                <p>{msg.message.Message}</p>
                <small className="text-green-500">
                  {new Date(msg.message.createdAt).toLocaleString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative border-t border-t-indigo-800 p-4">
        <footer className="p-4 bg-gray-200">
          <div className="flex items-center mb-4">
            <textarea
              className="w-full mr-4 p-2 border rounded"
              placeholder="Écrivez votre message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{ position: "sticky", bottom: "0", zIndex: "1" }}
            />
            <button onClick={handleSendMessage}>
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{ color: "blue" }}
                className="w-6 h-6"
              />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Discussion;
