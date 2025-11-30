"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getNote, getFile } from "@/lib/db";
import NoteViewer from "@/components/NoteViewer";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

function NoteViewContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  const [note, setNote] = useState<any>(null);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
        setLoading(false);
        return;
    }
    
    const loadData = async () => {
      try {
        const noteData = await getNote(id);
        if (noteData) {
          setNote(noteData);
          const file = await getFile(noteData.fileId);
          setFileName(file?.name || "Unknown File");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Note not found</h1>
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
        <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900">{fileName}</h1>
          <p className="text-xs text-gray-500">Generated on {new Date(note.createdAt).toLocaleDateString()}</p>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto p-6">
        <NoteViewer content={note.content} />
      </main>
    </div>
  );
}

export default function NoteViewPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>}>
            <NoteViewContent />
        </Suspense>
    );
}
