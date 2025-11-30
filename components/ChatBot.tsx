"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";
import { getAllNotes } from "@/lib/db";
import { runChat } from "@/lib/gemini";
import ReactMarkdown from "react-markdown";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "model"; parts: string }[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput("");
        setMessages((prev) => [...prev, { role: "user", parts: userMessage }]);
        setIsLoading(true);

        try {
            const notes = await getAllNotes();
            const context = notes.map((n) => n.content).join("\n\n---\n\n");
            const apiKey = localStorage.getItem("gemini_api_key");

            if (!apiKey) {
                setMessages((prev) => [
                    ...prev,
                    { role: "model", parts: "Silakan masukkan API Key terlebih dahulu di halaman Setup." },
                ]);
                return;
            }

            const response = await runChat(apiKey, messages, userMessage, context);

            setMessages((prev) => [...prev, { role: "model", parts: response }]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                { role: "model", parts: "Maaf, terjadi kesalahan. Pastikan API Key valid dan coba lagi." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all z-50 ${isOpen ? "scale-0" : "scale-100"
                    }`}
            >
                <MessageCircle className="w-6 h-6" />
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transition-all transform origin-bottom-right flex flex-col ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
                    }`}
                style={{ height: "500px" }}
            >
                {/* Header */}
                <div className="p-4 bg-blue-600 text-white rounded-t-2xl flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5" />
                        <h3 className="font-semibold">Medical Assistant</h3>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.length === 0 && (
                        <div className="text-center text-gray-500 text-sm mt-10">
                            <p>Halo! Saya sudah membaca catatan Anda.</p>
                            <p>Ada yang bisa saya bantu jelaskan?</p>
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === "user"
                                        ? "bg-blue-600 text-white rounded-br-none"
                                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                                    }`}
                            >
                                <ReactMarkdown>{msg.parts}</ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none shadow-sm">
                                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Tanya tentang materi..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
