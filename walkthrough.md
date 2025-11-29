# Walkthrough: Medical Note Generator

## Overview
This application is a static Next.js web app designed to transform medical lecture files (PDF/PPT) into comprehensive, enriched study notes using a 3-stage Gemini AI pipeline.

## Features
- **3-Stage Pipeline**:
    1.  **Transcription**: Gemini 2.0 Flash (Structure & Image Explanation)
    2.  **Enrichment**: Gemini 2.5 Pro (Clinical Correlates, Mnemonics)
    3.  **Visualization**: Gemini 2.5 Flash (ASCII Art Summary)
- **Rate Limiting**: Automatic 10-second delay between stages to prevent API errors.
- **Secure**: API Key is stored in your browser's LocalStorage.
- **Visual Feedback**: Real-time status indicators and countdown timers.

## How to Run Locally

1.  **Install Dependencies** (if you haven't already):
    ```bash
    npm install
    ```

2.  **Start the Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open in Browser**:
    Navigate to `http://localhost:3000`.

## How to Use

1.  **Landing Page**: Start at the home page to see the features. Click "Get Started".
2.  **Setup**: Enter your Google AI Studio API Key. It will be saved locally.
    -   *Note*: Instructions for getting a key are provided on this page.
3.  **Dashboard**:
    -   **Upload**: Drag and drop your PDF/PPT lecture file.
    -   **Process**: Click "Start Generation Pipeline".
    -   **Wait**: Watch the pipeline progress (Stage 1 -> Delay -> Stage 2 -> Delay -> Stage 3).
    -   **Download**: Once complete, review the enriched note and click "Download MD".

## Application Structure

-   `app/page.tsx`: Premium Landing Page.
-   `app/setup/page.tsx`: API Key configuration.
-   `app/dashboard/page.tsx`: Main application logic (Upload & Pipeline).
-   `lib/gemini.ts`: AI pipeline logic with `gemini-2.0-flash`, `gemini-2.5-pro`, and `gemini-2.5-flash`.

## Deployment (GitHub Pages)

To deploy this as a static site to GitHub Pages:

1.  **Update `next.config.ts`**:
    Ensure `output: 'export'` is enabled (it is by default in this setup).

2.  **Build**:
    ```bash
    npm run build
    ```

3.  **Deploy**:
    Push the `out` directory to your GitHub repository's `gh-pages` branch, or use a GitHub Action to build and deploy.
