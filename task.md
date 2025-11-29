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
