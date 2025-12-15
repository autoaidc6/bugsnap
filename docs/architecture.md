# System Architecture - BugSnap

## 1. Overview
BugSnap is a Client-Side Single Page Application (SPA) built with React. It operates without a dedicated backend server for application logic, relying instead on browser-based APIs and the external Google Gemini API for intelligence.

## 2. Technology Stack

-   **Runtime**: Browser (ES Modules support required).
-   **Framework**: React 19.
-   **Styling**: Tailwind CSS (loaded via CDN for simplicity).
-   **Language**: TypeScript.
-   **External Service**: Google Gemini API (`@google/genai` SDK).

## 3. Data Flow Architecture

```mermaid
graph TD
    User[User] -->|Uploads/Snaps Photo| View[HomeView]
    View -->|Base64 Image| App[App Controller]
    App -->|Calls| Service[Gemini Service]
    Service -->|HTTP Request (Image + Prompt)| Gemini[Google Gemini API]
    Gemini -->|JSON Response| Service
    Service -->|Parsed Data| App
    App -->|Updates State| Result[ResultCard]
    App -->|Persists Data| LocalStore[Browser LocalStorage]
```

## 4. Component Hierarchy

-   `index.html` (Entry)
    -   `index.tsx` (Bootstrapper)
        -   `App.tsx` (State Container: `currentView`, `history`, `currentInsect`)
            -   `Sidebar` (Navigation)
            -   `HomeView` (Inputs: File Input & Video Stream)
            -   `ResultCard` (Display: Parsing `InsectData`)
            -   `HistoryView` (List: Rendering stored items)
            -   `StaticContent` (SafetyGuide & GardenSolutions)

## 5. Service Layer

### `services/geminiService.ts`
This service encapsulates the interaction with the AI.
-   **Model**: Uses `gemini-2.5-flash` for high speed and cost efficiency.
-   **Schema**: Defines a strict JSON output schema (`InsectData`) to ensure the AI returns structured data that the UI can reliably render without complex parsing logic.
-   **Prompting**: Uses multimodal prompting (Image + Text) to instruct the model to identify the subject.

## 6. Data Models

### `InsectData`
The core data structure returned by the AI:
```typescript
interface InsectData {
  commonName: string;
  scientificName: string;
  description: string;
  toxicity: string;
  habitat: string;
  behavior: string;
  isPest: boolean;
  pestSolutions: string[];
  safetyTips: string[];
}
```

## 7. State Management
-   **React State**: Handles transient UI states (camera open, loading, current view).
-   **Local Storage**: Handles persistence of the `history` array, ensuring user data survives page reloads.

## 8. Security Considerations
-   **API Key**: The API Key is accessed via `process.env.API_KEY`. In a production environment, this should be proxied through a backend to prevent exposure, though for client-side prototypes, it is injected into the environment.