# BugSnap - AI Insect Identification

BugSnap is an intelligent, easy-to-use web application that allows users to instantly identify insects using the power of Google's Gemini AI. Whether you are a gardener dealing with pests or a parent concerned about a bug bite, BugSnap provides immediate identification, safety tips, and ecological insights.

## Features

-   **Instant Identification**: Snap a photo or upload an image to get immediate results.
-   **Detailed Insights**:
    -   Common & Scientific Names
    -   Toxicity Levels & Safety Tips
    -   Habitat & Behavior
    -   Pest Status & Eco-friendly Control Solutions
-   **History Log**: Automatically saves your discoveries to local storage.
-   **Safety Guides**: Built-in reference for common bites and stings.
-   **Garden Solutions**: Tips for managing garden ecosystems naturally.
-   **Responsive Design**: Works seamlessly on mobile and desktop.

## Tech Stack

-   **Frontend**: React 19, Tailwind CSS
-   **AI Engine**: Google Gemini API (`gemini-2.5-flash`)
-   **Build Tooling**: ES Modules

## Setup & Running

1.  Ensure you have a valid Google Gemini API Key.
2.  The application expects the API key to be available in `process.env.API_KEY`.
3.  Serve the root directory using a static file server.

## Structure

-   `index.html`: Entry point.
-   `src/`: (Conceptually the root)
    -   `App.tsx`: Main application logic.
    -   `services/`: API integration.
    -   `components/`: UI components.
    -   `types.ts`: TypeScript interfaces.