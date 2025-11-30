"use client";

import { useEffect, useState } from "react";
import { getAllNotes, getFile, deleteNote, deleteFile } from "@/lib/db";
import { FileText, Trash2, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";

interface LibraryItem {
    noteId: string;
    fileId: string;
    fileName: string;
    createdAt: number;
}

export default function LibraryList() {
    const [items, setItems] = useState<LibraryItem[]>([]);
    const [loading, setLoading] = useState(true);

    const loadItems = async () => {
        try {
            const notes = await getAllNotes();
            const data = await Promise.all(
                notes.map(async (note) => {
                    const file = await getFile(note.fileId);
                    return {
                        noteId: note.id,
                        fileId: note.fileId,
                        fileName: file?.name || "Unknown File",
                        createdAt: note.createdAt,
                    };
                })
            );
            setItems(data.sort((a, b) => b.createdAt - a.createdAt));
        } catch (error) {
            console.error("Failed to load library", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems();
        // Poll every 5 seconds to update list when new notes are generated
        const interval = setInterval(loadItems, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleDelete = async (noteId: string, fileId: string) => {
        if (!confirm("Are you sure you want to delete this note?")) return;
        await deleteNote(noteId);
        await deleteFile(fileId); // Cleanup file as well
        loadItems();
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h2 className="font-semibold text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Library
                </h2>
                <button onClick={loadItems} className="text-gray-500 hover:text-blue-600">
                    <RefreshCw className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {loading && items.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-sm">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-sm">
                        No notes yet. Upload files to generate.
                    </div>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.noteId}
                            className="group flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all"
                        >
                            <div className="min-w-0 flex-1">
                                <h3 className="text-sm font-medium text-gray-900 truncate" title={item.fileName}>
                                    {item.fileName}
                                </h3>
                                <p className="text-xs text-gray-500">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link
                                    href={`/dashboard/view?id=${item.noteId}`}
                                    className="p-1.5 text-blue-600 hover:bg-blue-100 rounded"
                                    title="Open Note"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(item.noteId, item.fileId)}
                                    className="p-1.5 text-red-600 hover:bg-red-100 rounded"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
