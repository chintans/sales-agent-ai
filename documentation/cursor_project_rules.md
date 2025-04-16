## Project Overview

* **Type:** NextJS 15 Prototype
* **Description:** Build a NextJS 15 prototype to input customer data, generate a sales script, and simulate a call using Bland AI, all integrated with Supabase and OpenAI.
* **Primary Goal:** Create a seamless internal demo tool that captures customer details, generates a non-editable sales script using LangChainJS + OpenAI, and integrates a call simulation via Bland AI.

## Project Structure

### Framework-Specific Routing

* **Directory Rules:**

    * `next@15`: Enforce use of the app directory with nested route folders following NextJS 15 App Router conventions.
    * Example 1: "Next.js 15 (App Router)" → `app/[route]/page.tsx` conventions
    * Example 2: (Not applicable for Pages Router in this project)
    * Example 3: (If using React Router, would follow `src/routes/` with createBrowserRouter, but not applicable here)

### Core Directories

* **Versioned Structure:**

    * `app`: NextJS 15 app directory for routing, layouts, and nested routes.
    * Example 1: `app/api` → "NextJS 15 API routes for Supabase integration, sales script generation, and call management with Bland AI."
    * Example 2: `app/customer` → "Customer data entry page with a modern, clean UI."

### Key Files

* **Stack-Versioned Patterns:**

    * `app/customer/page.tsx`: Customer data entry form implementation using NextJS 15 App Router.
    * `app/api/sales-script/route.ts`: API route handling sales script generation via LangChainJS + OpenAI, ensuring the script is non-editable.
    * `app/api/call/route.ts`: API route managing call initiation with Bland AI, recording calls, and generating transcripts with auto/manual refresh functionality.

## Tech Stack Rules

* **Version Enforcement:**

    * `next@15`: Enforce app directory usage with nested route folders and server actions as required by NextJS 15 standards.
    * `prisma`: Follow Prisma ORM best practices for database interactions with Supabase PostgreSQL.
    * `pnpm`: Utilize pnpm for package management to ensure efficient dependency management.

## PRD Compliance

* **Non-Negotiable:**

    * "No User Authentication and Minimal Data Validation": Must implement clear error handling with meaningful messages for issues related to Supabase, OpenAI, and Bland AI integrations. API keys must be securely loaded from the `.env` file. The sales script generated must be non-editable and both auto-refresh and manual refresh options must be provided for call transcripts.

## App Flow Integration

* **Stack-Aligned Flow:**

    * NextJS 15 Customer Data Entry → `app/customer/page.tsx` collects customer details and submits data to corresponding API routes.
    * NextJS 15 Sales Script Flow → `app/api/sales-script/route.ts` processes form submissions to generate a sales script using LangChainJS + OpenAI, which is then displayed to the user.
    * NextJS 15 Call Integration → `app/api/call/route.ts` initiates a call via Bland AI, manages call recording, and handles transcript generation with auto and manual refresh.

## Best Practices

* **NextJS 15**

    * Use server and client components appropriately to optimize performance.
    * Leverage the App Router for clean and scalable route organization.
    * Securely manage environment variables using NextJS built-in support.

* **Supabase**

    * Implement robust error handling for API communications.
    * Avoid exposing sensitive credentials directly in the client-side code.
    * Use optimized queries and proper indexing for PostgreSQL.

* **Prisma ORM**

    * Utilize generated types and maintain schema migrations diligently.
    * Ensure all database queries are safely parameterized to avoid SQL injection.
    * Take advantage of Prisma’s logging and error tracking features.

* **LangChainJS + OpenAI**

    * Respect API rate limits and implement fallback error handling.
    * Securely access API keys from the `.env` file without exposing them in the source code.
    * Mark the generated sales script as non-editable to adhere to project requirements.

* **Bland AI**

    * Secure API integration using environment variable management.
    * Implement retry mechanisms for API calls to handle transient errors.
    * Log error messages for debugging purposes while ensuring user-friendly feedback.

* **pnpm**

    * Keep dependencies up-to-date to align with security and performance best practices.
    * Utilize pnpm workspace features for effective monorepo management.
    * Consistently validate package versions against the tech stack requirements.

## Rules

* Derive folder/file patterns **directly** from `techStackDoc` versions.
* If NextJS 15 App Router: Enforce `app/` directory with nested route folders.
* If Pages Router: Use `pages/*.tsx` flat structure (not applicable for this project).
* Mirror this logic for other frameworks as necessary.
* Never mix version patterns (e.g., no `pages/` in App Router projects).

## Rules Metrics

Before starting the project development, create a metrics file in the root of the project called `cursor_metrics.md`.

### Instructions:

* Each time a cursor rule is used as context, update `cursor_metrics.md`.
* Use the following format for `cursor_metrics.md:`

```
# Rules Metrics

## Usage

The number of times rules is used as context

* rule-name.mdc: 5
* another-rule.mdc: 2
* ...other rules
```
