"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
    saveFile,
    addToQueue,
    getQueue,
    updateQueueStatus,
    getFile,
    saveNote,
    initDB,
    getPendingQueue,
} from "@/lib/db";
import { runStage1, runStage2, runStage3, delay } from "@/lib/gemini";

export interface QueueItem {
    id: string;
    fileId: string;
    fileName?: string; // Hydrated from file
    status: "pending" | "processing" | "completed" | "failed";
    stage: 0 | 1 | 2 | 3;
    error?: string;
}

interface QueueContextType {
    queue: QueueItem[];
    isProcessing: boolean;
    isQueueActive: boolean;
    addFiles: (files: File[]) => Promise<void>;
    retryItem: (id: string) => Promise<void>;
    clearCompleted: () => Promise<void>;
    startQueue: () => void;
    pauseQueue: () => void;
    delayRemaining: number;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export function QueueProvider({ children }: { children: React.ReactNode }) {
    const [queue, setQueue] = useState<QueueItem[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isQueueActive, setIsQueueActive] = useState(false);
    const [delayRemaining, setDelayRemaining] = useState(0);

    // Load queue on mount
    useEffect(() => {
        const loadQueue = async () => {
            const dbQueue = await getQueue();
            // Hydrate with file names
            const hydratedQueue = await Promise.all(
                dbQueue.map(async (item) => {
                    const file = await getFile(item.fileId);
                    return { ...item, fileName: file?.name || "Unknown File" };
                })
            );

            // Reset 'processing' to 'pending' on load (crash recovery)
            const resetQueue = hydratedQueue.map(item => {
                if (item.status === 'processing') {
                    updateQueueStatus(item.id, 'pending', 0);
                    return { ...item, status: 'pending' as const, stage: 0 as const };
                }
                return item;
            });

            setQueue(resetQueue);
        };
        loadQueue();
    }, []);

    // Process Queue Effect
    useEffect(() => {
        if (isProcessing || !isQueueActive) return; // Only run if active and not already processing

        const processNext = async () => {
            const pendingItems = queue.filter((item) => item.status === "pending");
            if (pendingItems.length === 0) {
                setIsQueueActive(false); // Stop when done
                return;
            }

            setIsProcessing(true);
            const item = pendingItems[0];

            try {
                // Update status to processing
                await updateStatus(item.id, "processing", 1);

                // Get File Data
                const fileRecord = await getFile(item.fileId);
                if (!fileRecord) throw new Error("File not found in DB");

                const fileData = await fileToGenerativePart(fileRecord.data as File);
                const apiKey = localStorage.getItem("gemini_api_key");
                if (!apiKey) throw new Error("API Key missing");

                // --- STAGE 1 ---
                await updateStatus(item.id, "processing", 1);
                const stage1Result = await runStage1(apiKey, fileData.data, fileData.mimeType);

                // Delay 10s
                await runDelay(10);

                // --- STAGE 2 ---
                await updateStatus(item.id, "processing", 2);
                const stage2Result = await runStage2(apiKey, stage1Result, fileData.data, fileData.mimeType);

                // Delay 10s
                await runDelay(10);

                // --- STAGE 3 ---
                await updateStatus(item.id, "processing", 3);
                const stage3Result = await runStage3(apiKey, stage2Result, fileData.data, fileData.mimeType);

                // Save Note
                const finalNote = `${stage3Result}\n\n${stage2Result}`;
                await saveNote(item.fileId, finalNote);

                // Complete
                await updateStatus(item.id, "completed", 3);

                // Global Delay between files (30s)
                await runDelay(30);

            } catch (error: any) {
                console.error("Processing failed", error);
                await updateStatus(item.id, "failed", item.stage, error.message);
            } finally {
                setIsProcessing(false);
            }
        };

        // Check if we should start processing
        const hasPending = queue.some(q => q.status === 'pending');
        if (hasPending && !isProcessing && isQueueActive) {
            processNext();
        }

    }, [queue, isProcessing, isQueueActive]);

    const updateStatus = async (id: string, status: QueueItem["status"], stage: QueueItem["stage"], error?: string) => {
        await updateQueueStatus(id, status, stage, error);
        setQueue((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status, stage, error } : item))
        );
    };

    const runDelay = async (seconds: number) => {
        for (let i = seconds; i > 0; i--) {
            setDelayRemaining(i);
            await delay(1000);
        }
        setDelayRemaining(0);
    };

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

    const addFiles = async (files: File[]) => {
        const newItems: QueueItem[] = [];
        for (const file of files) {
            const fileId = await saveFile(file);
            const queueId = await addToQueue(fileId);
            newItems.push({
                id: queueId,
                fileId,
                fileName: file.name,
                status: "pending",
                stage: 0,
            });
        }
        setQueue((prev) => [...prev, ...newItems]);
    };

    const retryItem = async (id: string) => {
        await updateStatus(id, "pending", 0, undefined);
    };

    const clearCompleted = async () => {
```
"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
    saveFile,
    addToQueue,
    getQueue,
    updateQueueStatus,
    getFile,
    saveNote,
    initDB,
    getPendingQueue,
} from "@/lib/db";
import { runStage1, runStage2, runStage3, delay } from "@/lib/gemini";

export interface QueueItem {
    id: string;
    fileId: string;
    fileName?: string; // Hydrated from file
    status: "pending" | "processing" | "completed" | "failed";
    stage: 0 | 1 | 2 | 3;
    error?: string;
}

interface QueueContextType {
    queue: QueueItem[];
    isProcessing: boolean;
    isQueueActive: boolean;
    addFiles: (files: File[]) => Promise<void>;
    retryItem: (id: string) => Promise<void>;
    clearCompleted: () => Promise<void>;
    startQueue: () => void;
    pauseQueue: () => void;
    resumeQueue: () => void; // Added resumeQueue to interface
    delayRemaining: number;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export function QueueProvider({ children }: { children: React.ReactNode }) {
    const [queue, setQueue] = useState<QueueItem[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isQueueActive, setIsQueueActive] = useState(false);
    const [delayRemaining, setDelayRemaining] = useState(0);

    // Load queue on mount
    useEffect(() => {
        const loadQueue = async () => {
            const dbQueue = await getQueue();
            // Hydrate with file names
            const hydratedQueue = await Promise.all(
                dbQueue.map(async (item) => {
                    const file = await getFile(item.fileId);
                    return { ...item, fileName: file?.name || "Unknown File" };
                })
            );

            // Reset 'processing' to 'pending' on load (crash recovery)
            const resetQueue = hydratedQueue.map(item => {
                if (item.status === 'processing') {
                    updateQueueStatus(item.id, 'pending', 0);
                    return { ...item, status: 'pending' as const, stage: 0 as const };
                }
                return item;
            });

            setQueue(resetQueue);
        };
        loadQueue();
    }, []);

    // Process Queue Effect
    useEffect(() => {
        if (isProcessing || !isQueueActive) return; // Only run if active and not already processing

        const processNext = async () => {
            const pendingItems = queue.filter((item) => item.status === "pending");
            if (pendingItems.length === 0) {
                setIsQueueActive(false); // Stop when done
                return;
            }

            setIsProcessing(true);
            const item = pendingItems[0];

            try {
                // Update status to processing
                await updateStatus(item.id, "processing", 1);

                // Get File Data
                const fileRecord = await getFile(item.fileId);
                if (!fileRecord) throw new Error("File not found in DB");

                const fileData = await fileToGenerativePart(fileRecord.data as File);
                const apiKey = localStorage.getItem("gemini_api_key");
                if (!apiKey) throw new Error("API Key missing");

                // --- STAGE 1 ---
                await updateStatus(item.id, "processing", 1);
                const stage1Result = await runStage1(apiKey, fileData.data, fileData.mimeType);

                // Delay 10s
                await runDelay(10);

                // --- STAGE 2 ---
                await updateStatus(item.id, "processing", 2);
                const stage2Result = await runStage2(apiKey, stage1Result, fileData.data, fileData.mimeType);

                // Delay 10s
                await runDelay(10);

                // --- STAGE 3 ---
                await updateStatus(item.id, "processing", 3);
                const stage3Result = await runStage3(apiKey, stage2Result, fileData.data, fileData.mimeType);

                // Save Note
                const finalNote = `${stage3Result}\n\n${stage2Result}`;
                await saveNote(item.fileId, finalNote);

                // Complete
                await updateStatus(item.id, "completed", 3);

                // Global Delay between files (30s)
                await runDelay(30);

            } catch (error: any) {
                console.error("Processing failed", error);
                await updateStatus(item.id, "failed", item.stage, error.message);
            } finally {
                setIsProcessing(false);
            }
        };

        // Check if we should start processing
        const hasPending = queue.some(q => q.status === 'pending');
        if (hasPending && !isProcessing && isQueueActive) {
            processNext();
        }

    }, [queue, isProcessing, isQueueActive]);

    const updateStatus = async (id: string, status: QueueItem["status"], stage: QueueItem["stage"], error?: string) => {
        await updateQueueStatus(id, status, stage, error);
        setQueue((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status, stage, error } : item))
        );
    };

    const runDelay = async (seconds: number) => {
        for (let i = seconds; i > 0; i--) {
            setDelayRemaining(i);
            await delay(1000);
        }
        setDelayRemaining(0);
    };

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

    const addFiles = async (files: File[]) => {
        const newItems: QueueItem[] = [];
        for (const file of files) {
            const fileId = await saveFile(file);
            const queueId = await addToQueue(fileId);
            newItems.push({
                id: queueId,
                fileId,
                fileName: file.name,
                status: "pending",
                stage: 0,
            });
        }
        setQueue((prev) => [...prev, ...newItems]);
    };

    const retryItem = async (id: string) => {
        await updateStatus(id, "pending", 0, undefined);
    };

    const clearCompleted = async () => {
        // Logic to remove completed items from queue DB if needed
        // For now just filter state
        // setQueue(prev => prev.filter(item => item.status !== 'completed'));
    };

    const startQueue = () => setIsQueueActive(true);
    const pauseQueue = () => setIsQueueActive(false); // Acts as Stop
    const resumeQueue = () => setIsQueueActive(true); // Acts as Resume

    const clearQueue = async () => {
        // Clear from DB
        const db = await initDB();
        const tx = db.transaction('queue', 'readwrite');
        const store = tx.objectStore('queue');

        // Get all items
        const allItems = await store.getAll();

        // Delete completed and failed items
        for (const item of allItems) {
            if (item.status === 'completed' || item.status === 'failed') {
                await store.delete(item.id);
            }
        }

        await tx.done;

        // Update State
        setQueue(prev => prev.filter(item => item.status === 'pending' || item.status === 'processing'));
    };

    return (
        <QueueContext.Provider value={{
            queue,
            isProcessing,
            isQueueActive,
            addFiles,
            retryItem,
            clearCompleted: clearQueue, // Expose as clearCompleted for now, or rename in interface
            startQueue,
            pauseQueue,
            resumeQueue,
            delayRemaining
        }}>
            {children}
        </QueueContext.Provider>
    );
}

export function useQueue() {
    const context = useContext(QueueContext);
    if (context === undefined) {
        throw new Error("useQueue must be used within a QueueProvider");
    }
    return context;
}
```
