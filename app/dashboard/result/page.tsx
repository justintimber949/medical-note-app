"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogOut, FileText } from "lucide-react";
import NoteViewer from "@/components/NoteViewer";

export default function ResultPage() {
    const router = useRouter();
    const [content, setContent] = useState<string | null>(null);
    const [filename, setFilename] = useState<string | null>(null);

    useEffect(() => {
        const storedContent = localStorage.getItem("gemini_note_content");
        const storedFilename = localStorage.getItem("gemini_note_filename");

        if (!storedContent) {
            router.push("/dashboard");
        } else {
            setContent(storedContent);
            setFilename(storedFilename || "Unknown File");
        }
    }, [router]);

    const handleBack = () => {
        // Optional: Clear content if you want them to start fresh, or keep it.
        // localStorage.removeItem("gemini_note_content"); 
        router.push("/dashboard");
    };

    const handleLogout = () => {
        localStorage.removeItem("gemini_api_key");
        router.push("/setup");
    };

    if (!content) return null;

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBack}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                            title="Back to Upload"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-100 p-1.5 rounded">
                                <FileText className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-sm font-semibold text-gray-900">{filename}</h1>
                                <p className="text-xs text-gray-500">Generated Note</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors px-3 py-1.5 hover:bg-red-50 rounded-lg"
                    >
                        <LogOut className="w-4 h-4" />
                        Reset Key
                    </button>
                </div>
            </header>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <NoteViewer content={content} />
            </div>
        </main>
    );
}
