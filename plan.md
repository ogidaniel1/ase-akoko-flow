# Implementation Plan: Yoruba (Ase Akoko) to English Translation Interface

Build a functional frontend application for translating Yoruba (specifically the Ase Akoko dialect) to English. Since there is no backend/Supabase, we will implement a robust mock translation engine with a dictionary-based lookup for demonstration, and a clean, modern UI for the translation experience.

## Scope Summary
- **Target Dialect:** Yoruba (Ase Akoko)
- **Destination Language:** English
- **Functionality:** Text input, dialect selection (fixed to Ase Akoko), translation display, copy-to-clipboard, and history (localStorage).
- **Persistence:** Local browser storage for history.
- **Constraints:** No backend; translation logic is client-side mock/dictionary.

## Assumptions & Open Questions
- **Dialect Specificity:** Ase Akoko is a specific dialect. I will research/mock common phrases if specific academic data is unavailable, focusing on the *system* design rather than a complete linguistic database.
- **Translation Engine:** Will use a "Simulation" approach where common phrases are mapped, and unknown text is processed via a mock "AI" response.

## Affected Areas
- **Frontend UI:** New components for translation cards, language selectors, and history.
- **State Management:** React hooks for text state and history.
- **Data Layer:** A static dictionary file for Ase Akoko to English mappings.

## Ordered Phases

### Phase 1: Foundation & Data
- Create a dictionary of Ase Akoko phrases and their English equivalents.
- Deliverable: `src/data/translations.ts` containing the mapping.
- Owner: `frontend_engineer`

### Phase 2: Core Components
- Build the main translation interface:
    - Input area (Yoruba).
    - Output area (English).
    - Swap button (optional, though primary goal is Yoruba -> English).
    - Status indicators (e.g., "Translating...").
- Deliverable: `src/components/Translator.tsx`
- Owner: `frontend_engineer`

### Phase 3: History & Features
- Implement local storage persistence for recent translations.
- Add "Copy to Clipboard" and "Clear History" features.
- Deliverable: Updated `src/App.tsx` and history sidebar.
- Owner: `frontend_engineer`

### Phase 4: Polish & Styling
- Apply consistent branding (using warm, earthy tones suitable for a cultural application).
- Ensure mobile responsiveness.
- Owner: `quick_fix_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Setup data and core UI components.
2. quick_fix_engineer — Polish CSS and final UX refinements.

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1, 2, 3
- **Scope:** Create a dictionary of Yoruba (Ase Akoko) phrases. Build the main layout with dual text areas. Implement the translation logic (simulated async delay). Use `localStorage` for a "Recent Translations" sidebar.
- **Files:** 
    - `src/data/translations.ts`
    - `src/components/TranslationInterface.tsx`
    - `src/App.tsx`
- **Depends on:** none
- **Acceptance criteria:** User can type a known Yoruba phrase and see the English translation after a short delay. Recent translations persist across page refreshes.

### 2. quick_fix_engineer
- **Phases:** 4
- **Scope:** Refine the styling using Tailwind. Add transition animations for the translation results. Ensure the layout looks good on mobile devices.
- **Files:** 
    - `src/index.css`
    - `src/components/TranslationInterface.tsx`
- **Depends on:** Phase 3
- **Acceptance criteria:** The UI is responsive and visually appealing with smooth state transitions.
