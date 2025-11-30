"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FileUploader from "@/components/FileUploader";
import LibraryList from "@/components/LibraryList";
import ChatBot from "@/components/ChatBot";
import { useQueue } from "@/context/QueueContext";
import { LogOut, Loader2, CheckCircle, AlertTriangle, Clock, FileText, Play } from "lucide-react";

export default function Dashboard() {
    const router = useRouter();
    const { addFiles, queue, isProcessing, delayRemaining, startQueue } = useQueue();
    const [apiKey, setApiKey] = useState<string | null>(null);

    useEffect(() => {
        const storedKey = localStorage.getItem("gemini_api_key");
        if (!storedKey) router.push("/setup");
        else setApiKey(storedKey);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("gemini_api_key");
        router.push("/setup");
    };

    if (!apiKey) return null;

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Medical Note Generator</h1>
                </div>
                <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-700 flex items-center gap-2 font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut className="w-4 h-4" /> Reset Key
                </button>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Library */}
                <aside className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto hidden md:flex flex-col">
                    <LibraryList />
                </aside>

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-4xl mx-auto space-y-8">

                        {/* Upload Area */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">Upload Materials</h2>
                            <FileUploader onFileSelect={addFiles} disabled={isProcessing} />

                            {queue.some(q => q.status === 'pending') && !isProcessing && (
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={startQueue}
                                        className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2"
                                    >
                                        <Play className="w-4 h-4" /> Start Processing Queue
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Queue Progress */}
                        {queue.length > 0 && (
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Processing Queue</h2>
                                    {isProcessing && delayRemaining > 0 && (
                                        <span className="text-orange-600 text-sm font-medium flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                                            <Clock className="w-4 h-4" /> Cooling down: {delayRemaining}s
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    {queue.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                                            <div className="flex items-center gap-3">
                                                {item.status === 'pending' && <Clock className="w-5 h-5 text-gray-400" />}
                                                {item.status === 'processing' && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
                                                {item.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                                                {item.status === 'failed' && <AlertTriangle className="w-5 h-5 text-red-500" />}

                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{item.fileName}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {item.status === 'pending' && 'Waiting...'}
                                                        {item.status === 'processing' && `Processing Stage ${item.stage}/3`}
                                                        {item.status === 'completed' && 'Done'}
                                                        {item.status === 'failed' && 'Failed'}
                                                    </p>
                                                </div>
                                            </div>
                                            {item.error && <span className="text-xs text-red-500 font-medium">{item.error}</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ChatBot />
        </main>
    );
}
