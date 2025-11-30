# Implementation Plan: Batch Processing & Chatbot

## Goal Description
Enhance the Medical Note Generator to support batch processing of multiple files (20-30 PPT/PDFs), persistent storage using IndexedDB, and a context-aware Chatbot powered by Gemini 2.0 Flash.

## User Review Required
> [!IMPORTANT]
> **IndexedDB Persistence**: Data is stored locally in the browser. Clearing browser data will delete all notes.
> **API Limits**: Batch processing includes a 30s delay between files to respect rate limits. Processing 20 files will take significant time (~10-15 mins).

## Proposed Changes

### Infrastructure (IndexedDB)
#### [NEW] [db.ts](file:///c:/Users/Ahmad taufiq/Project Antigravity/MedicalNote/lib/db.ts)
- Use `idb` library.
- Schema:
    - `files`: `{ id, name, type, data (blob), createdAt }`
    - `notes`: `{ id, fileId, content, createdAt, updatedAt }`
    - `queue`: `{ id, fileId, status (pending/processing/completed/failed), stage (1/2/3), error }`

### Batch Processing Engine
#### [NEW] [QueueContext.tsx](file:///c:/Users/Ahmad taufiq/Project Antigravity/MedicalNote/context/QueueContext.tsx)
- Manages the global queue state.
- Loads pending items from `queue` store on startup (Resumability).
- Processes items sequentially with `setTimeout` delay.
- Updates status in real-time.

### UI Components
#### [MODIFY] [Dashboard](file:///c:/Users/Ahmad taufiq/Project Antigravity/MedicalNote/app/dashboard/page.tsx)
- Split layout:
    - **Left Sidebar**: Library (List of processed notes from DB).
    - **Main Area**: Upload Zone + Progress Dashboard.
    - **Floating**: Chatbot Trigger.

#### [NEW] [LibraryList.tsx](file:///c:/Users/Ahmad taufiq/Project Antigravity/MedicalNote/components/LibraryList.tsx)
- Lists completed notes.
- Actions: Open, Rename, Delete.

#### [NEW] [ChatBot.tsx](file:///c:/Users/Ahmad taufiq/Project Antigravity/MedicalNote/components/ChatBot.tsx)
- Floating widget.
- Fetches **ALL** notes from `notes` store.
- Sends concatenated notes + user query to Gemini 2.0 Flash.

### Navigation
#### [NEW] [NoteViewPage](file:///c:/Users/Ahmad taufiq/Project Antigravity/MedicalNote/app/dashboard/view/[id]/page.tsx)
- Dynamic route for viewing a specific note from DB.
- Replaces the temporary `/dashboard/result` page.

## Verification Plan

### Automated Tests
- None (Manual verification required for UI/UX).

### Manual Verification
1.  **Batch Upload**: Upload 5 files. Verify queue processes them one by one with delay.
2.  **Resumability**: Reload page during processing. Verify queue resumes from the correct file/stage.
3.  **Persistence**: Close browser and reopen. Verify "Library" still lists generated notes.
4.  **Chatbot**: Ask a question requiring knowledge from multiple generated notes. Verify accurate response.
