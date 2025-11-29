# Implementation Plan: Medical Note Generator

## Goal Description
Build a static web application that allows medical students to upload lecture files (PDF/PPT), processes them through a 3-stage Gemini AI pipeline, and generates comprehensive Markdown study notes with ASCII art visualization.

## Architecture
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Deployment**: GitHub Pages (Static Export)
- **AI Integration**: Google Generative AI SDK (Client-side)
- **Storage**: LocalStorage (API Keys), Browser Memory (File processing)

## User Review Required
> [!IMPORTANT]
> **API Key Security**: Since this is a static client-side app, the user must provide their own Google AI Studio API Key. The key will be stored in the browser's LocalStorage.

> [!NOTE]
> **Model Configuration**: The app will use the specific model names requested: `gemini-2.0-flash` (Stage 1), `gemini-3.0-flash` (Stage 2), and `gemini-2.5-flash` (Stage 3). **Please ensure your API key has access to these specific model versions.**

> [!TIP]
> **Rate Limiting**: A 10-second delay will be enforced between stages to prevent hitting API rate limits.

## Proposed Changes

### Project Setup
#### [NEW] [package.json](file:///c:/Users/Ahmad taufiq/Project Antigravity/MedicalNote/package.json)
- Initialize Next.js project with Tailwind CSS.
- Dependencies: `@google/generative-ai`, `framer-motion`, `lucide-react`, `react-markdown`.

### Core Components
#### [NEW] [components/ApiKeyInput.tsx](file:///c:/Users/Ahmad taufiq/Project Antigravity/MedicalNote/components/ApiKeyInput.tsx)
- Input field to save API key to LocalStorage.
- "Reset Key" functionality.

#### [NEW] [components/FileUploader.tsx](file:///c:/Users/Ahmad taufiq/Project Antigravity/MedicalNote/components/FileUploader.tsx)
- Drag & drop interface for PDF/PPT files.
- File reading logic (convert to Base64 for API).

#### [NEW] [components/PipelineStatus.tsx](file:///c:/Users/Ahmad taufiq/Project Antigravity/MedicalNote/components/PipelineStatus.tsx)
- Visual indicator of the 3 stages:
    1.  **Transcription** (Gemini 2.0 Flash) - *Status: Processing/Waiting*
    2.  **Enrichment** (Gemini 2.5 Pro) - *Status: Pending*
    3.  **Visualization** (Gemini 2.5 Flash) - *Status: Pending*
- **Loading State**: Clear "Processing... Please wait" message with progress bar.
- **Delay Timer**: Countdown visualization during the 10s sleep between stages.

#### [NEW] [components/NoteViewer.tsx](file:///c:/Users/Ahmad taufiq/Project Antigravity/MedicalNote/components/NoteViewer.tsx)
- Markdown renderer.
- Copy/Download functionality.

### Logic
#### [NEW] [lib/gemini.ts](file:///c:/Users/Ahmad taufiq/Project Antigravity/MedicalNote/lib/gemini.ts)
- Functions to call the Gemini API for each stage using specific model versions.
- **Sleep Utility**: `delay(10000)` function between calls.
- **Content Merging**: Prepend Stage 3 (ASCII Art) to the final Markdown.

## Verification Plan
### Manual Verification
1.  **API Key**: Verify key is saved and loaded from LocalStorage.
2.  **Upload**: Upload a sample PDF.
3.  **Pipeline**:
    -   Check Stage 1 output (Structure).
    -   Check Stage 2 output (Added details).
    -   Check Stage 3 output (ASCII Art).
4.  **Download**: Verify the downloaded .md file contains all sections.
