# Implementation Plan for Demo Prototype

This document outlines a detailed step-by-step implementation plan for building the demo prototype using NextJS 15 along with the other technologies specified.

---

## 1. Project Overview

- **Objective:** Build a quick demo prototype to input customer data, generate a sales script, and initiate a telephony call with transcript recording.
- **Stack & Tools:**
  - **Frontend:** NextJS 15
  - **Backend:** Supabase (Postgres), Prisma ORM
  - **Generative AI:** LangChainJS, OpenAI
  - **Telephony:** Bland AI
  - **Package Manager:** pnpm
  - **IDE:** Cursor (AI-powered code assistance)
  - **API Key Storage:** .env file for secure API key management

---

## 2. Feature Breakdown

### 2.1 Input Customer Data

- **Form Inputs:**
  - Customer name
  - Phone number: Country code dropdown (default to India) and a text box for a 10-digit number
  - Optional Email
  - Conversation History
  - Topics to Discuss

- **UI:**
  - Create a modern and clean single-page form using NextJS. No advanced input validation beyond basic HTML input structures is required.

### 2.2 Generate Sales Script

- **Data Storage:**
  - Use Supabase Postgres to persist customer data.
  - Employ Prisma ORM to interact with the database securely.

- **Script Generation:**
  - Use LangChainJS to integrate with OpenAI. The sales script generated should be non-editable and only available for review.

### 2.3 Initiate Call and Record Transcript

- **Telephony Integration:**
  - Provide a button labelled "Call the customer" to trigger a telephony call using Bland AI API. 
  - Retrieve API keys from the .env file to interact with Bland AI.
  - Record the call automatically.

- **Transcript Display:**
  - Display a transcript of the call directly on the page.
  - Implement auto-refresh functionality to update the transcript and include a manual refresh button as a fallback.

### 2.4 Robust Error Handling & UI Feedback

- **Error Handling Practices:**
  - Implement robust error handling for:
    - Data storage failures
    - Script generation (OpenAI) issues
    - Telephony processing (Bland AI) errors
  - Display meaningful error messages to users without exposing sensitive details.

- **UI Refresh & Feedback:**
  - Ensure that the UI auto-refreshes the transcript after updates.
  - Provide a manual refresh option for the user.

### 2.5 API Keys and Environment Variables

- **API Key Management:**
  - Store credentials for Bland AI and OpenAI securely in a .env file.
  - Use environment variable management best practices ensuring these keys are not hardcoded in the source code.

### 2.6 External Dependencies & Resilience

- **External Services:**
  - Be aware of potential rate limits and downtime when calling external services such as Bland AI, OpenAI, and Supabase. Implement retry strategies or graceful degradation where possible.

---

## 3. Implementation Steps

### 3.1 Setup NextJS 15 Project

- Initialize a new NextJS 15 project with pnpm.
- Configure project structure and routing for a single-page application.
- Install necessary dependencies for Supabase, Prisma, LangChainJS, and integration with OpenAI and Bland AI.

### 3.2 Frontend Implementation

- **Create the Form Component:**
  - Use a functional React component to contain the customer data form.
  - Incorporate a country code dropdown (with default to India) and a text input for the 10-digit phone number.
  - Utilize basic HTML input elements; style with a modern CSS framework or custom CSS.

- **Handle Form Submission:**
  - On submission, send a POST request to the API route (discussed in Backend Implementation) to save customer data and trigger script generation.
  
- **Display Sales Script & Transcript:**
  - Once the script is generated, display it as non-editable text on the same page.
  - Integrate a transcript section that auto-refreshes periodically (using setInterval or a similar approach in React hooks) with a manual refresh button.

### 3.3 Backend Implementation

- **Supabase & Prisma Setup:**
  - Set up Supabase Postgres database.
  - Configure Prisma ORM: define the schema for customer data including fields such as name, phone, email, conversation history, and topics.
  - Create migrations and generate Prisma client to interact with the database.

- **API Routes:**
  - Create NextJS API routes for:
    - Storing customer data
    - Triggering the sales script generation using LangChainJS and OpenAI
    - Initiating the telephony call and retrieving the transcript from Bland AI

- **Implement API Route Handlers:**
  - Validate inputs to the extent required (ensure required fields are provided) even though advanced validation is not mandated.
  - Use asynchronous functions to communicate with Supabase, Prisma, OpenAI, and Bland AI.
  - Implement try/catch blocks to handle errors and log them appropriately without leaking sensitive information.

### 3.4 Integration with Generative AI (LangChainJS & OpenAI)

- **Sales Script Generation:**
  - Create a service module that integrates LangChainJS with the OpenAI API to generate sales scripts based on customer data.
  - Ensure proper management of API keys via the .env file.
  - Validate the response and prepare the generated script for display.

### 3.5 Integration with Bland AI for Telephony & Transcript

- **Telephony API Integration:**
  - Create API or service layer calls to Bland AI to initiate calls using API keys retrieved from the .env file.
  - Handle asynchronous response processing to receive real-time call transcripts.
  - Implement error handling (e.g., connection timeouts, API rate limits) and provide fallback error messages if the call setup fails.

### 3.6 User Interface Refinements & Error Messaging

- **Error Messaging:**
  - Design clear, user-friendly error messages for data storage, script generation, and telephony errors.
  - Ensure error messages do not expose sensitive information such as raw error logs or stack traces.

- **UI Auto-Refresh:**
  - Implement auto-refresh using React hooks (e.g., useEffect with a timer) to fetch the updated transcript periodically.
  - Add a button that allows users to manually trigger a refresh in case auto-refresh does not perform as expected.

---

## 4. Security Considerations & Best Practices

- **API Key & Secret Management:**
  - Use environment variables (.env file) to securely store API keys for Bland AI and OpenAI.
  - Do not commit the .env file to source control and set appropriate file permissions.

- **Input Handling:**
  - While advanced validation is not required given the demo prototype, ensure minimal sanity checks in API routes to avoid malformed requests.
  
- **Error Handling:**
  - Employ try/catch blocks and log errors securely on the server side without exposing sensitive information to the client.

- **Secure Defaults:**
  - Ensure that the application runs with secure defaults especially in production environments (disable debugging, enforce TLS, etc.).

---

## 5. Next Steps & Deployment

- **Local Development:**
  - Develop and test locally using Cursor as the IDE.
  - Mock external API calls where necessary to simulate responses for development.

- **Deployment:**
  - Once tested locally, deploy the project using secure configuration especially for the Supabase database and external API credentials.
  - Monitor for any rate limiting or downtime issues associated with external services.

- **Final Review:**
  - Review the complete application ensuring adherence to security by design principles such as error handling, input validation, secure API key management, and proper logging.

---

## 6. Conclusion

This implementation plan ensures that the demo prototype is built with secure practices by design, follows modern development methodologies, and meets the project requirements efficiently. All external dependencies and integrations have been considered with resilience and error handling best practices.

Let me know if there are any questions or specific aspects that need further refinement!
