# Implementation plan

## Phase 1: Environment Setup

Important Notes: Tailwindcss and NextJS has been setup. No need to do it again.

1. **Prevalidation Check:** Before initializing, inspect the current directory to verify if a NextJS project already exists. If yes, skip initialization steps. (Project Requirements Document, implementation_plan)
2. **Node & Package Manager Setup:** Confirm Node.js v20.2.1 is installed. If not, install Node.js v20.2.1 and ensure pnpm is set up as the package manager. Then run `node -v` and `pnpm -v` for validation. (Tech Stack Document, implementation_plan)
3. **Create a NextJS 15 Project:**
   - If starting from scratch, initialize a new NextJS 15 project using the command: 
     ```bash
     npx create-next-app@15 my-sales-prototype --use-pnpm
     ```
   - If the project already exists, skip this step. (Tech Stack Document, Project Requirements Document)
4. **Setup Environment Variables:** Create a `.env` file in the project root and add placeholders for API keys:
   - `BLAND_AI_API_KEY`
   - `OPENAI_API_KEY`
   - (Project Requirements Document, App Flow Document)
5. **Cursor IDE Preparation (for AI-powered development):**
   - Create a `cursor_metrics.md` file in the project root. Refer to `cursor_project_rules.md` for instructions on its content. (Project Requirements Document, implementation_plan)
   - Create a `.cursor` directory in the project root if it does not exist.
   - Inside `.cursor`, create an `mcp.json` file if it doesn’t exist.
   - Add the following configuration (choose based on your OS):
     - **macOS:**
       ```json
       { "mcpServers": { "supabase": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-postgres", "<connection-string>"] } } }
       ```
     - **Windows:**
       ```json
       { "mcpServers": { "supabase": { "command": "cmd", "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-postgres", "<connection-string>"] } } }
       ```
   - Display this link for obtaining the connection string: [https://supabase.com/docs/guides/getting-started/mcp#connect-to-supabase-using-mcp](https://supabase.com/docs/guides/getting-started/mcp#connect-to-supabase-using-mcp). Once the connection string is available, replace `<connection-string>` accordingly. (Tech Stack Document, implementation_plan)
6. **Supabase Connection Check:** Navigate to Settings/MCP in Cursor to verify that the Supabase MCP server displays a green active status. (Tech Stack Document)

## Phase 2: Frontend Development

7. **Create Main Page:** In the `/pages` directory, create `index.js`. This will serve as the single page for customer data input and sales interaction. (Project Requirements Document, App Flow Document)
8. **Customer Data Input Form:** Within `index.js`, implement a form with the following fields:
   - Customer Name (text input)
   - Phone Number with Country Code Dropdown (default India, 10 digit validation) 
   - Optional Email (email input)
   - Conversation History (textarea)
   - Topics to Discuss (textarea)
   - (Project Requirements Document, App Flow Document)
9. **Minimal Validation:** Implement basic front-end validation ensuring the phone number field accepts only a 10-digit number after country code selection. (Project Requirements Document)
10. **Submission Button:** Add a submission button titled "Generate Sales Script" that will trigger the API call to the backend. (Project Requirements Document)
11. **UI for Sales Script:** Below the form, include a read-only display area where the generated sales script (non-editable) will be presented. (Project Requirements Document)
12. **Call Initiation Button:** Add a button labeled "Call the customer". On click, this triggers a backend API that initiates a call via Bland AI; the call will be recorded and a transcript will be fetched.
   - Include an auto-refresh mechanism to update the transcript along with a manual refresh option. (Project Requirements Document, App Flow Document)
13. **Frontend Error Handling:** Implement UI error messages that display meaningful errors (e.g., validation failures, API call errors). (Project Requirements Document)
14. **Validation:** Run the project locally (`pnpm run dev`) and verify that the form appears and basic interactions (data entry and button clicks) work properly. (App Flow Document)

## Phase 3: Backend Development

15. **Setup Prisma ORM:** Install Prisma using pnpm and initialize it:
    ```bash
    pnpm add prisma
    npx prisma init
    ```
    (Tech Stack Document, Project Requirements Document)
16. **Define Database Schema:** In `/prisma/schema.prisma`, define a model (e.g., Customer) with the following fields:
    - id: String @id @default(uuid())
    - name: String
    - phone: String
    - email: String? (optional)
    - conversationHistory: String
    - topics: String
    - salesScript: String
    - transcript: String?
    - createdAt: DateTime @default(now())

    (Project Requirements Document, Tech Stack Document)
17. **Migrate Database:** Use Prisma to generate and apply the migration:
    ```bash
    npx prisma migrate dev --name init
    ```
    (Tech Stack Document)
18. **Integrate Supabase:** Use the Supabase MCP server to create the required tables in the Postgres database according to the Prisma schema. (Tech Stack Document, implementation_plan)
19. **Create Endpoint for Customer Data Submission:** In `/pages/api/customer.js` (or TypeScript equivalent), implement a POST endpoint that:
    - Receives customer details from the frontend
    - Stores the data in the Supabase Postgres database using Prisma ORM
    (Project Requirements Document, App Flow Document)
20. **Sales Script Generation Endpoint:** Create an endpoint at `/pages/api/generate-script.js` that uses LangChainJS and the OpenAI API to:
    - Retrieve customer data
    - Generate a sales calling script and store/update the record with the generated script
    - Return the non-editable script to the frontend
    (Project Requirements Document, App Flow Document)
21. **Call Initiation Endpoint:** Create an endpoint at `/pages/api/initiate-call.js` that:
    - Uses the Bland AI API (with API key from `.env`)
    - Initiates a call to the provided customer number
    - Triggers recording and transcription processes
    (Project Requirements Document, App Flow Document)
22. **Transcript Retrieval Endpoint:** Create an endpoint at `/pages/api/transcript.js` to fetch and return the latest transcript for a call. (Project Requirements Document)
23. **Backend Error Handling:** Implement try/catch blocks and return meaningful error messages from all endpoints. (Project Requirements Document)
24. **Validation:** Test each API endpoint using Postman or curl. For example, test the customer data endpoint with a POST request and check for a successful database entry. (App Flow Document)

## Phase 4: Integration

25. **Connect Form Submission to Backend:** In the frontend form submission handler (in `index.js`), use `fetch` (or Axios) to send a POST request to `/api/customer.js` with the customer details. (Project Requirements Document, App Flow Document)
26. **Trigger Sales Script Generation:** Upon successfully saving customer data, call `/api/generate-script.js` to retrieve the non-editable sales script. Display the script in the UI. (Project Requirements Document)
27. **Integrate Call Initiation:** Link the "Call the customer" button to call `/api/initiate-call.js`. (Project Requirements Document)
28. **Integrate Transcript Auto-refresh:** Implement frontend logic to periodically poll `/api/transcript.js` for an updated transcript. Also, add a manual refresh button that, when clicked, fetches the transcript immediately. (Project Requirements Document)
29. **Error Display Integration:** Ensure that any errors returned from the API endpoints are displayed to the user in the UI. (Project Requirements Document)
30. **Validation:** Run end-to-end testing locally by entering dummy customer data, generating a script, initiating a call, and verifying that the transcript is correctly fetched and displayed. (App Flow Document)

## Phase 5: Deployment

31. **Build the Application:** Run `pnpm build` to prepare the NextJS 15 application for production. (Tech Stack Document, Project Requirements Document)
32. **Configure Environment Variables for Deployment:** Ensure the deployment environment (e.g., Vercel, if chosen) has the `.env` variables (`BLAND_AI_API_KEY`, `OPENAI_API_KEY`) configured securely. (Project Requirements Document)
33. **Deployment Instructions:** Deploy the application on your chosen platform. For a NextJS project, deploying to Vercel is recommended. Follow the Vercel deployment process and verify that the deployed site functions correctly. (Tech Stack Document, App Flow Document)
34. **Post-deployment Checks:** Once deployed, perform an end-to-end test: enter customer details, generate the script, initiate the call, and confirm that the transcript auto-refreshes as intended. (Project Requirements Document)

## Additional Considerations & Testing

35. **Direct Transcript Display:** Ensure that the call transcript (once available) is displayed directly without an intermediate review step. (Project Requirements Document)
36. **API Keys Security:** Validate that the API keys are only accessible through the backend and are not exposed in client-side code. (Project Requirements Document)
37. **Modern & Clean UI:** Ensure design consistency by applying modern UI practices (e.g., spacing, alignment, font size). Adjust CSS/SCSS as necessary. (Project Requirements Document, App Flow Document)
38. **Validation:** Perform final manual testing of the entire workflow on a staging environment before the internal demo. (App Flow Document)

# Notes
- NextJS 15 is explicitly used as per the tech stack and is preferred with AI coding tools and LLM models. (Tech Stack Document)
- All steps have been validated for redundancy by checking the project directory structure before creation/insertion.
- Detailed error handling and meaningful messages are implemented throughout the application to aid internal demos and troubleshooting.

This concludes the step-by-step implementation plan for the sales call preparation prototype.