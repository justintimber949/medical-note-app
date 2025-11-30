# MedicalNote AI 🩺✨

**MedicalNote AI** is an advanced, AI-powered study companion designed specifically for medical students. It transforms complex lecture slides (PDF/PPT) into structured, enriched, and visualized study notes in seconds using Google's Gemini 2.0 Flash model.

![MedicalNote AI Dashboard](https://placehold.co/1200x600/2563eb/ffffff?text=MedicalNote+AI+Dashboard)

## 🚀 Key Features

### 1. 📂 Batch Processing Engine
- **Upload Multiple Files**: Process 20+ lecture slides at once.
- **Smart Queue System**: Sequential processing with built-in rate limiting (30s delay) to respect API quotas.
- **Resumable**: Queue state is saved locally. If the browser closes, processing resumes where it left off.
- **Manual Controls**: Start, Pause, Resume, and Clear the queue at your convenience.

### 2. 🤖 Context-Aware Chatbot
- **Full Knowledge Base**: The chatbot doesn't just know general facts; it reads **ALL** your generated notes to provide context-specific answers.
- **Study Partner**: Ask for summaries, quiz questions, or clarifications based on your specific lecture materials.
- **Powered by Gemini 2.0 Flash**: Fast, accurate, and capable of handling large contexts.

### 3. 💾 Persistent Local Library
- **IndexedDB Storage**: All notes and file metadata are stored locally in your browser using IndexedDB.
- **Privacy First**: Your files are processed via the API but stored on your device. No external database required.
- **Offline Access**: View your generated notes even without an internet connection (after generation).

### 4. 📝 Deep Enrichment & Visualization
- **Structured Notes**: Converts raw slides into clean Markdown with headers and bullet points.
- **Clinical Correlates**: Automatically adds clinical relevance to theoretical concepts.
- **Mnemonics**: Generates memory aids for difficult lists.
- **ASCII Tree Diagrams**: Visualizes complex hierarchies and pathways directly in the note.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Model**: [Google Gemini 2.0 Flash](https://ai.google.dev/)
- **Database**: [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (via `idb` library)
- **Icons**: [Lucide React](https://lucide.dev/)

## ⚡ Getting Started

### Prerequisites
- Node.js 18+ installed.
- A Google Gemini API Key (Get it [here](https://aistudio.google.com/app/apikey)).

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/justintimber949/medical-note-app.git
   cd medical-note-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:3000`.

### Setup
1. On the landing page, click **"Get Started"**.
2. Enter your **Gemini API Key**. This key is stored securely in your browser's `localStorage` and is never sent to our servers.
3. Start uploading your lecture slides!

## 📖 Usage Guide

1. **Upload**: Go to the Dashboard and select multiple PDF or PPT files.
2. **Start Queue**: Click "Start Processing" to begin the AI analysis.
3. **Wait & Relax**: The system processes files one by one. You can see the progress in the queue.
4. **Read**: Click on a completed file in the sidebar to view the full enriched note.
5. **Chat**: Use the floating chat widget to ask questions about your notes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
