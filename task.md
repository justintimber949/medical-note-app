

- [x] **View Separation**
    - [x] Create `app/dashboard/result/page.tsx` for dedicated note viewing.
    - [x] Update `app/dashboard/page.tsx` to save result to LocalStorage and redirect.
    - [x] Implement Header in Result page (Filename, Reset Key, Back).
    - [x] Verify Markdown rendering (confirming Jekyll is unnecessary).

- [x] **Infrastructure: IndexedDB & Storage**
  - [x] Install `idb` library.
  - [x] Create `lib/db.ts` wrapper (Files Store, Notes Store, Queue Store).
  - [x] Implement CRUD operations.

- [x] **Feature: Batch Processing Engine**
  - [x] Create `context/QueueContext.tsx`.
  - [x] Implement Queue Logic (FIFO, Status updates).
  - [x] Implement `runDelay(30)` rate limiter.
  - [x] Implement Resumability (Load queue from DB on init).
  - [x] Implement Error Handling (Retry/Fail status).
  - [x] Add "Start Processing" manual trigger.

- [x] **UI Overhaul: Dashboard & Library**
  - [x] Create `components/LibraryList.tsx` (Sidebar).
  - [x] Update `app/dashboard/page.tsx` (Split layout: Library | Upload + Progress).
  - [x] Implement "Upload Multiple" in `FileUploader`.
  - [x] Visualize Queue Progress (Pending -> Processing -> Completed).

- [x] **Feature: Context-Aware Chatbot**
  - [x] Select Model: `gemini-2.0-flash`.
  - [x] Create `components/ChatBot.tsx` (Floating Widget).
  - [x] Implement `runChat` in `lib/gemini.ts`.
  - [x] Implement Context Injection (Fetch all notes -> System Instruction).

- [x] **Feature: Note View & Management**
  - [x] Create `app/dashboard/view/page.tsx` (Read from DB).
  - [x] Add "Open" and "Delete" actions in Library.
