# Product Requirements Document (PRD) - BugSnap

## 1. Executive Summary
BugSnap is a web-based utility designed to bridge the gap between human curiosity/concern and entomological knowledge. By leveraging computer vision and Large Language Models (LLMs), it acts as a digital field guide for identifying insects.

## 2. Problem Statement
Non-experts often struggle to identify insects they encounter. This leads to:
-   Unnecessary fear of harmless bugs.
-   Dangerous interactions with toxic species.
-   Improper pest control methods that harm the environment.

## 3. Goals
-   Provide accurate identification within seconds.
-   Educate users on the ecological role of the insect.
-   Offer actionable advice for safety and pest management.
-   Ensure a mobile-first, intuitive user experience.

## 4. User Personas
-   **The Gardener**: Wants to know if a bug is eating their tomatoes or protecting them.
-   **The Parent**: Needs to know if the spider in the kid's room is venomous.
-   **The Hiker**: Curious about nature and wants to log what they see.

## 5. Functional Requirements

### 5.1 Identification Core
-   **Input**: User must be able to capture an image via device camera or upload a file.
-   **Processing**: Image is sent to Gemini 2.5 Flash for analysis.
-   **Output**: Structured JSON data containing name, description, toxicity, and pest status.

### 5.2 User Interface
-   **Dashboard**: Clean entry point with large call-to-action buttons for camera/upload.
-   **Result View**: Visual card displaying the image alongside parsed AI data.
-   **Navigation**: Sidebar/Hamburger menu to access History and Guides.

### 5.3 Data Persistence
-   **History**: Successful identifications are stored in the browser's `localStorage` with a timestamp and the image.
-   **Management**: Users can view and clear their history.

### 5.4 Educational Content
-   **Static Pages**: Pre-loaded content for general First Aid (Safety Guide) and Garden Management.

## 6. Non-Functional Requirements
-   **Performance**: UI must be responsive. AI latency should be handled with loading states.
-   **Reliability**: Error handling for failed API calls or unclear images.
-   **Privacy**: Images are processed by the AI but not permanently stored on a backend server by the app itself (local storage only).

## 7. Future Roadmap
-   Offline support (PWA).
-   Social sharing features.
-   Map view to show where insects were found.