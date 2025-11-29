"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Loader2, Clock } from "lucide-react";
import clsx from "clsx";

export type StageStatus = "pending" | "processing" | "waiting" | "completed" | "error";

interface PipelineStatusProps {
    stage1: StageStatus;
    stage2: StageStatus;
    stage3: StageStatus;
    currentStage: 1 | 2 | 3 | 0; // 0 means not started or finished
    delayRemaining?: number; // Seconds remaining for the delay
}

export default function PipelineStatus({ stage1, stage2, stage3, currentStage, delayRemaining }: PipelineStatusProps) {
    return (
        <div className="w-full space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Processing Pipeline</h3>

            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 -z-10" />

                <div className="space-y-8">
                    <StageItem
                        number={1}
                        title="Transcription & Structuring"
                        model="Gemini 2.0 Flash"
                        status={stage1}
                        isActive={currentStage === 1}
                    />

                    <StageItem
                        number={2}
                        title="Deep Dive & Enrichment"
                        model="Gemini 2.5 Pro"
                        status={stage2}
                        isActive={currentStage === 2}
                        delayRemaining={currentStage === 2 && stage1 === "completed" && stage2 === "pending" ? delayRemaining : undefined}
                    />

                    <StageItem
                        number={3}
                        title="Visual Synthesis (ASCII Art)"
                        model="Gemini 2.5 Flash"
                        status={stage3}
                        isActive={currentStage === 3}
                        delayRemaining={currentStage === 3 && stage2 === "completed" && stage3 === "pending" ? delayRemaining : undefined}
                    />
                </div>
            </div>
        </div>
    );
}

function StageItem({
    number,
    title,
    model,
    status,
    isActive,
    delayRemaining,
}: {
    number: number;
    title: string;
    model: string;
    status: StageStatus;
    isActive: boolean;
    delayRemaining?: number;
}) {
    return (
        <div className="flex items-start gap-4 bg-white p-2 rounded-lg">
            <div className="flex-shrink-0 mt-1">
                {status === "completed" ? (
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                ) : status === "processing" ? (
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                ) : status === "waiting" ? (
                    <Clock className="w-8 h-8 text-amber-500 animate-pulse" />
                ) : status === "error" ? (
                    <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 font-bold">!</div>
                ) : (
                    <Circle className="w-8 h-8 text-gray-300" />
                )}
            </div>

            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h4 className={clsx("font-medium", isActive ? "text-blue-600" : "text-gray-900")}>
                        Stage {number}: {title}
                    </h4>
                    <span className="text-xs font-mono px-2 py-1 bg-gray-100 rounded text-gray-600">{model}</span>
                </div>

                {status === "processing" && (
                    <p className="text-sm text-blue-500 mt-1 animate-pulse">Processing... Please wait.</p>
                )}

                {status === "waiting" && delayRemaining !== undefined && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-md">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Cooling down API... Resuming in {delayRemaining}s</span>
                    </div>
                )}

                {status === "error" && (
                    <p className="text-sm text-red-500 mt-1">Processing failed.</p>
                )}
            </div>
        </div>
    );
}
