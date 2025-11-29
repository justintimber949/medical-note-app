"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import clsx from "clsx";

interface FileUploaderProps {
    onFileSelect: (file: File) => void;
    disabled?: boolean;
}

export default function FileUploader({ onFileSelect, disabled }: FileUploaderProps) {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const validateAndSetFile = (file: File) => {
        const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.ms-powerpoint"];

        // Simple extension check as fallback
        const isPDF = file.name.toLowerCase().endsWith(".pdf");
        const isPPT = file.name.toLowerCase().endsWith(".pptx") || file.name.toLowerCase().endsWith(".ppt");

        if (validTypes.includes(file.type) || isPDF || isPPT) {
            setFileName(file.name);
            setError(null);
            onFileSelect(file);
        } else {
            setError("Please upload a PDF or PowerPoint file.");
            setFileName(null);
        }
    };

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            if (disabled) return;

            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                validateAndSetFile(e.dataTransfer.files[0]);
            }
        },
        [disabled, onFileSelect]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (disabled) return;
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    return (
        <div className="w-full">
            <div
                className={clsx(
                    "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors",
                    dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {fileName ? (
                        <>
                            <FileText className="w-10 h-10 mb-3 text-blue-500" />
                            <p className="mb-2 text-sm text-gray-700 font-semibold">{fileName}</p>
                            <p className="text-xs text-gray-500">Ready to process</p>
                        </>
                    ) : (
                        <>
                            <Upload className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF or PPT (MAX. 200MB)</p>
                        </>
                    )}
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    className="absolute w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    onChange={handleChange}
                    accept=".pdf,.ppt,.pptx"
                    disabled={disabled}
                />
            </div>
            {error && (
                <div className="mt-2 flex items-center text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {error}
                </div>
            )}
        </div>
    );
}
