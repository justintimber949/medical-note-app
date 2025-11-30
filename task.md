# Task List: Medical Note Generator Updates

- [x] **Update Core Logic**
    - [ ] Change Stage 2 model to `gemini-2.5-pro` in `lib/gemini.ts`.
    - [ ] Update `runStage2` and `runStage3` to include file data in the API call (simulating re-upload).
- [x] **Refactor Application Structure**
    - [ ] Create `app/dashboard/page.tsx` (Move current main logic here).
    - [ ] Create `app/setup/page.tsx` (Dedicated API Key entry page with instructions).
    - [ ] Create `app/page.tsx` (New Landing Page with premium design).
- [x] **Enhance UI/UX**
    - [ ] Implement "Professional" Landing Page design (Hero section, Feature glimpse).
    - [ ] Add "How to get API Key" instructions to Setup page.
    - [ ] Ensure smooth navigation flow (Landing -> Setup -> Dashboard).
- [x] **Prompt Refinement**
    - [x] Update all prompts to request Indonesian language output.
    - [x] Update Stage 3 prompt to enforce Tree Diagram format.
- [x] **Verification**
    - [x] Verify build.
    - [x] Verify navigation flow.

- [x] **View Separation**
    - [x] Create `app/dashboard/result/page.tsx` for dedicated note viewing.
    - [x] Update `app/dashboard/page.tsx` to save result to LocalStorage and redirect.
    - [x] Implement Header in Result page (Filename, Reset Key, Back).
    - [x] Verify Markdown rendering (confirming Jekyll is unnecessary).

- [ ] **Infrastructure: IndexedDB & Storage**
    - [ ] Install `idb` library.
    - [ ] Create `lib/db.ts` for managing Files, Notes, and Queue state.
    - [ ] Implement CRUD operations (Save, Load, Delete, Rename).

- [ ] **Feature: Batch Processing Engine**
    - [ ] Create `QueueContext` or hook for managing upload queue.
    - [ ] Implement "Resumable" logic (persist queue state to DB).
    - [ ] Implement 30s delay with UI countdown.
    - [ ] Handle error states and retries (clean up partial failures).

- [ ] **UI: Dashboard Overhaul**
    - [ ] Create "Library" view (List of completed notes).
    - [ ] Create "Upload & Progress" view (Multi-file upload + Progress bars).
    - [ ] Ensure concurrent viewing (Read note while processing others).

- [ ] **Feature: Context-Aware Chatbot**
    - [ ] Implement `ChatBot` component.
    - [ ] Integrate Gemini 2.0 Flash.
    - [ ] Implement "Full Context Injection" (Load all MD files from DB).

