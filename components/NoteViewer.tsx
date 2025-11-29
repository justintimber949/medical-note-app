"use client";

import ReactMarkdown from "react-markdown";
import { Download, Copy, Check } from "lucide-react";
import { useState } from "react";

interface NoteViewerProps {
    content: string;
}

export default function NoteViewer({ content }: NoteViewerProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([content], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `medical-note-${new Date().toISOString().slice(0, 10)}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!content) return null;

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-700">Generated Note</h3>
                <div className="flex gap-2">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copied" : "Copy"}
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Download MD
                    </button>
                </div>
            </div>
            <div className="p-6 max-h-[800px] overflow-y-auto prose prose-blue max-w-none prose-headings:text-gray-900 prose-p:text-gray-800 prose-strong:text-gray-900 prose-li:text-gray-800">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    );
}
