# Project Requirements Document

## 1. Project Overview

This project is a quick prototype built using NextJS 15 that allows an internal demo user to input customer details, generate a sales script using generative AI, and conduct a simulated call using Bland AI. The primary purpose is to streamline the process of generating a calling sales script from customer data and then automatically record the call along with its transcript for review. It leverages modern web technologies to provide a simple, modern, and clean user interface without extensive validations or advanced user authentication, as it is intended solely for demo purposes.

The prototype is being built to showcase the feasibility of integrating generative AI and telephony capabilities in a modern web application. Its key objectives include demonstrating seamless data capture, efficient sales script generation using LangChainJS with OpenAI, and effective call management via Bland AI. Success will be measured by the smooth end-to-end experience from data entry to the delivery of a call transcript, with resilient error handling and both automatic and manual refresh options for the final transcript.

## 2. In-Scope vs. Out-of-Scope

**In-Scope:**

*   A single-page interface where users can enter customer details including name, a phone number (with a dropdown for country codes, defaulting to India, followed by a 10-digit phone number), optional email address, conversation history, and topics to discuss.
*   Storage of the customer data in a Supabase Postgres database using Prisma ORM.
*   Automatic generation of a calling sales script using LangChainJS integrated with OpenAI, with the generated script being non-editable.
*   Integration with Bland AI to initiate calls, record them, and capture call transcripts.
*   Error handling that shows meaningful responses to the user in case of failures (data storage errors, script generation failure, or call processing issues).
*   UI auto refresh upon completion of the call transcript, along with an option for manual refresh if necessary.

**Out-of-Scope:**

*   User authentication or role-based access control (the tool is for demo purposes only with no authentication).
*   Advanced input validations beyond the basic input structure (e.g., input length restrictions or specialized formatting).
*   Manual editing of the generated sales script.
*   Comprehensive design or branding guidelines beyond a modern and clean look.
*   Additional features beyond the core workflow described here (e.g., extensive customization of call recording settings or transcript review processes).

## 3. User Flow

A user starts on a modern and clean single-page interface created with NextJS 15. Here, the user is presented with a form that requests customer information such as the name, a dropdown for the country code (with India pre-selected), a 10-digit phone number, an optional email address, conversation history, and topics to discuss. Once all the data is filled in, the user clicks the submit button. This action sends the information to the backend where it is stored in a Supabase Postgres database using Prisma ORM, while LangChainJS with OpenAI generates a non-editable calling sales script based on the provided details. The generated script is then displayed on a review screen for the user’s confirmation.

After reviewing the generated sales script, the user can click the "Call the customer" button. This triggers the integration with Bland AI, which uses the API keys provided via the .env file to initiate a call. Bland AI processes the call, recording the conversation and generating a transcript. The interface automatically refreshes with the transcript and call details, although a manual refresh option is available if the automatic update fails. Throughout this process, any errors during script generation, call initiation, or transcript retrieval are handled gracefully, displaying meaningful error messages for a robust demo experience.

## 4. Core Features (Bullet Points)

*   **Customer Data Entry Interface:**

    *   A single page built with NextJS 15.
    *   Fields include customer name, a dropdown for country code (default set to India), a phone number field (accepts 10 digits), an optional email address, conversation history, and topics to discuss.
    *   Modern and clean design with minimal validations.

*   **Data Storage and Sales Script Generation:**

    *   Use Supabase with a Postgres database for data storage.
    *   Prisma ORM to manage database interactions.
    *   On form submission, generate a calling sales script using LangChainJS integrated with the OpenAI API.
    *   The generated script is displayed non-editably for user review.

*   **Bland AI Call Integration:**

    *   "Call the customer" button triggers integration with Bland AI.
    *   Uses API keys configured in an .env file.
    *   The call is recorded and processed, providing a transcript upon completion.
    *   Auto refresh of the UI to show call transcript, with an option for manual refresh.

*   **Error Handling and User Feedback:**

    *   Use best practices to handle errors during data storage, script generation, and API calls.
    *   Display meaningful error or success messages to the user.
    *   Both auto-refresh and manual refresh options in case of delays in transcript availability.

## 5. Tech Stack & Tools

*   **Frontend:** NextJS 15 built with modern, clean design principles.
*   **Backend:** Supabase (Postgres) for the database; Prisma ORM for database management.
*   **Generative AI:** LangChainJS integrated with OpenAI for generating the calling sales script.
*   **Telephony Integration:** Bland AI for call initiation, recording, and transcript generation.
*   **Package Manager:** pnpm.
*   **IDE/Plugins:** Cursor (an advanced IDE for AI-powered coding with real-time suggestions).

## 6. Non-Functional Requirements

*   **Performance:**

    *   Optimized for quick response times in both script generation and call initiation.
    *   Ensure that auto refresh happens promptly (with fallback manual refresh available).

*   **Security:**

    *   API keys for Bland AI and OpenAI should be securely loaded from the .env file.
    *   Use standard secure practices to connect to Supabase and manage database interactions.

*   **Usability:**

    *   The interface should be modern and clean, ensuring simple navigation and data input.
    *   Provide clear feedback for errors or success events.

*   **Compliance:**

    *   While there are no specific privacy policies required for this demo, standard data retention and storage practices should be followed.

## 7. Constraints & Assumptions

*   **Constraints:**

    *   The tool is designed solely for demo purposes with no authentication or role-based access questions addressed.
    *   Minimal input validations are planned; thus, the focus is on functionality over strict data formats.
    *   Reliance on external services (Bland AI, OpenAI, Supabase) means that API rate limits or external downtimes could affect user experience.

*   **Assumptions:**

    *   API keys and other sensitive information will be securely maintained in a .env file.
    *   The environment has all required resources and internet connectivity to query external APIs.
    *   Users will only be using this tool internally for demo purposes and not for production-level operations.

## 8. Known Issues & Potential Pitfalls

*   **External Service Dependencies:**

    *   If Bland AI or OpenAI services experience downtime or API rate limiting, script generation or call processing might be delayed. Mitigation can include displaying clear error messages and providing retry options.

*   **Database Connectivity:**

    *   Issues with connecting to Supabase or handling database operations via Prisma ORM could hinder data storage. Ensure robust error handling and logging.

*   **Auto Refresh Failures:**

    *   The auto-refresh feature might not work in all cases; hence, the manual refresh button is included as a fallback.

*   **Lack of Input Validations:**

    *   Minimal field validations could lead to data inconsistencies or errors. While this is acceptable for the demo phase, it should be revisited for future iterations.

*   **API Key Management:**

    *   Incorrect API key management or misconfiguration in the .env file could cause failures in call initiation or script generation. Ensure clear documentation and configuration guidelines.

This PRD provides a comprehensive blueprint for building the quick prototype demo. Each section has been clearly detailed to ensure that future technical documents can be generated without ambiguity.
