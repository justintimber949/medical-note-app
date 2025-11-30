"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import clsx from "clsx";

interface FileUploaderProps {
    onFileSelect: (file: File) => void;
    disabled?: boolean;
}

export default function FileUploader({ onFileSelect, disabled }: { onFileSelect: (files: File[]) => void; disabled?: boolean }) {
    const [dragActive, setDragActive] = useState(false);
    const [fileCount, setFileCount] = useState(0);
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

    const validateAndSetFiles = (files: FileList | File[]) => {
        const validFiles: File[] = [];
        const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.ms-powerpoint"];

        Array.from(files).forEach(file => {
            const isPDF = file.name.toLowerCase().endsWith(".pdf");
            const isPPT = file.name.toLowerCase().endsWith(".pptx") || file.name.toLowerCase().endsWith(".ppt");
            if (validTypes.includes(file.type) || isPDF || isPPT) {
                validFiles.push(file);
            }
        });

        if (validFiles.length > 0) {
            setFileCount(validFiles.length);
            setError(null);
            onFileSelect(validFiles);
        } else {
            setError("Please upload valid PDF or PowerPoint files.");
            setFileCount(0);
        }
    };

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            if (disabled) return;

            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                validateAndSetFiles(e.dataTransfer.files);
            }
        },
        [disabled, onFileSelect]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (disabled) return;
        if (e.target.files && e.target.files.length > 0) {
            validateAndSetFiles(e.target.files);
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
                    {fileCount > 0 ? (
                        <>
                            <FileText className="w-10 h-10 mb-3 text-blue-500" />
                            <p className="mb-2 text-sm text-gray-700 font-semibold">{fileCount} files selected</p>
                            <p className="text-xs text-gray-500">Ready to process</p>
                        </>
                    ) : (
                        <>
                            <Upload className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF or PPT (Batch Upload Supported)</p>
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
                    multiple
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
