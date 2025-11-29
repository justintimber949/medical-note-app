"use client";

import { useState, useEffect } from "react";
import { Key, Trash2 } from "lucide-react";

interface ApiKeyInputProps {
    onKeySet: (key: string | null) => void;
}

export default function ApiKeyInput({ onKeySet }: ApiKeyInputProps) {
    const [key, setKey] = useState("");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const storedKey = localStorage.getItem("gemini_api_key");
        if (storedKey) {
            setKey(storedKey);
            setSaved(true);
            onKeySet(storedKey);
        }
    }, [onKeySet]);

    const handleSave = () => {
        if (key.trim()) {
            localStorage.setItem("gemini_api_key", key.trim());
            setSaved(true);
            onKeySet(key.trim());
        }
    };

    const handleReset = () => {
        localStorage.removeItem("gemini_api_key");
        setKey("");
        setSaved(false);
        onKeySet(null);
    };

    if (saved) {
        return (
            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                <Key className="w-4 h-4" />
                <span className="text-sm font-medium">API Key Saved</span>
                <button
                    onClick={handleReset}
                    className="ml-auto p-1 hover:bg-green-100 rounded-full transition-colors"
                    title="Reset API Key"
                >
                    <Trash2 className="w-4 h-4 text-green-600" />
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                Enter Google AI Studio API Key
            </label>
            <div className="flex gap-2">
                <input
                    type="password"
                    id="apiKey"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSave}
                    disabled={!key.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Save
                </button>
            </div>
            <p className="text-xs text-gray-500">
                Your key is stored locally in your browser and never sent to our servers.
            </p>
        </div>
    );
}
