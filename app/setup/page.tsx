"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Key, ArrowRight, ExternalLink } from "lucide-react";

export default function Setup() {
    const router = useRouter();
    const [key, setKey] = useState("");

    useEffect(() => {
        const storedKey = localStorage.getItem("gemini_api_key");
        if (storedKey) {
            router.push("/dashboard");
        }
    }, [router]);

    const handleSave = () => {
        if (key.trim()) {
            localStorage.setItem("gemini_api_key", key.trim());
            router.push("/dashboard");
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                        <Key className="w-6 h-6 text-blue-600" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Setup API Key</h1>
                    <p className="text-gray-600 mb-8">
                        To use the Medical Note Generator, you need a Google AI Studio API Key. Your key is stored locally in your browser.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                                Enter your API Key
                            </label>
                            <input
                                type="password"
                                id="apiKey"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                placeholder="AIzaSy..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={!key.trim()}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Continue to Dashboard
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">How to get a key?</h3>
                    <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                        <li>Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">Google AI Studio <ExternalLink className="w-3 h-3" /></a></li>
                        <li>Click on "Create API key"</li>
                        <li>Select a project or create a new one</li>
                        <li>Copy the generated key and paste it above</li>
                    </ol>
                </div>
            </div>
        </main>
    );
}
