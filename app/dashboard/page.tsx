"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FileUploader from "@/components/FileUploader";
import PipelineStatus, { StageStatus } from "@/components/PipelineStatus";
import { runStage1, runStage2, runStage3, delay } from "@/lib/gemini";
import { AlertTriangle, LogOut } from "lucide-react";

export default function Dashboard() {
    const router = useRouter();
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    // Pipeline State
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentStage, setCurrentStage] = useState<1 | 2 | 3 | 0>(0);
    const [stage1Status, setStage1Status] = useState<StageStatus>("pending");
    const [stage2Status, setStage2Status] = useState<StageStatus>("pending");
    const [stage3Status, setStage3Status] = useState<StageStatus>("pending");
    const [delayRemaining, setDelayRemaining] = useState(0);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedKey = localStorage.getItem("gemini_api_key");
        if (!storedKey) {
            router.push("/setup");
        } else {
            setApiKey(storedKey);
        }
    }, [router]);

    const fileToGenerativePart = async (file: File): Promise<{ data: string; mimeType: string }> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = (reader.result as string).split(",")[1];
                resolve({
                    data: base64String,
                    mimeType: file.type,
                });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const runDelay = async (seconds: number) => {
        for (let i = seconds; i > 0; i--) {
            setDelayRemaining(i);
            await delay(1000);
        }
        setDelayRemaining(0);
    };

    const handleProcess = async () => {
        if (!apiKey || !file) return;

        setIsProcessing(true);
        setError(null);

        // Reset Statuses
        setStage1Status("pending");
        setStage2Status("pending");
        setStage3Status("pending");
        setCurrentStage(1);

        try {
            const fileData = await fileToGenerativePart(file);

            // --- STAGE 1 ---
            setStage1Status("processing");
            const stage1Result = await runStage1(apiKey, fileData.data, fileData.mimeType);
            setStage1Status("completed");

            // Delay between Stage 1 and 2
            setStage1Status("waiting");
            await runDelay(10);
            setStage1Status("completed");

            // --- STAGE 2 ---
            setCurrentStage(2);
            setStage2Status("processing");
            // Re-sending file data for context
            const stage2Result = await runStage2(apiKey, stage1Result, fileData.data, fileData.mimeType);
            setStage2Status("completed");

            // Delay between Stage 2 and 3
            setStage2Status("waiting");
            await runDelay(10);
            setStage2Status("completed");

            // --- STAGE 3 ---
            setCurrentStage(3);
            setStage3Status("processing");
            // Re-sending file data for context
            const stage3Result = await runStage3(apiKey, stage2Result, fileData.data, fileData.mimeType);
            setStage3Status("completed");

            // Combine Results: ASCII Art (Stage 3) + Enriched Note (Stage 2)
            const finalNote = `${stage3Result}\n\n${stage2Result}`;

            // Save to LocalStorage and Redirect
            localStorage.setItem("gemini_note_content", finalNote);
            localStorage.setItem("gemini_note_filename", file.name);
            router.push("/dashboard/result");

        } catch (err: any) {
            console.error(err);
            setError(err.message || "An unexpected error occurred.");
            if (currentStage === 1) setStage1Status("error");
            if (currentStage === 2) setStage2Status("error");
            if (currentStage === 3) setStage3Status("error");
        } finally {
            setIsProcessing(false);
            setCurrentStage(0);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("gemini_api_key");
        router.push("/setup");
    };

    if (!apiKey) return null;

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-600">Upload your lecture to start generating notes.</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Reset API Key
                    </button>
                </div>

                {/* Main Workspace */}
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Upload Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Lecture Material</h2>
                        <FileUploader onFileSelect={setFile} disabled={isProcessing} />

                        {file && !isProcessing && (
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={handleProcess}
                                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                >
                                    Start Generation Pipeline
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Pipeline Status */}
                    {(isProcessing || error) && (
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <PipelineStatus
                                stage1={stage1Status}
                                stage2={stage2Status}
                                stage3={stage3Status}
                                currentStage={currentStage}
                                delayRemaining={delayRemaining}
                            />

                            {error && (
                                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700">
                                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium">Generation Failed</h4>
                                        <p className="text-sm mt-1">{error}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}
