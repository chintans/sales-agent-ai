# Backend Structure Document

This document outlines the backend architecture, database management, API design, hosting solutions, infrastructure components, security measures, and monitoring strategies for our NextJS 15 prototype. The prototype is built to input customer data, generate sales scripts, and simulate calls with transcript functionalities. This guide is written with clear, everyday language to ensure understanding even without a technical background.

## 1. Backend Architecture

- **Overview**: The backend is organized as a set of modular services that work together to handle customer data input, sales script generation, and telephony integrations using Bland AI. The design follows consistent patterns that support scalability, maintainability, and performance.
- **Design Patterns & Frameworks**:
  - Uses a RESTful API style to facilitate straightforward communication between the frontend (NextJS 15) and backend services.
  - Employs a modular architecture with separation of concerns, meaning that different parts of the backend (data management, AI processing, telephony integration) are managed independently.
  - Utilizes a Node.js environment (integrated through NextJS API routes) to communicate with external AI services like OpenAI and Bland AI.
- **Scalability & Maintainability**:
  - The architecture is built to easily scale by handling high volumes of requests and integrating more features without major rework.
  - Maintenance is simplified through clear modular boundaries and adherence to best practices, making it easier to update individual components (like the AI integration or telephony services) when necessary.

## 2. Database Management

- **Database Technology**: The project utilizes a PostgreSQL database hosted through Supabase, a managed cloud solution.
- **ORM**: Data access is managed via Prisma ORM, which simplifies operations across the database.
- **Data Structure & Storage**:
  - Customer data, sales scripts, and call transcripts are stored in relational tables within the PostgreSQL database.
  - Data is reliably stored using modern database practices with proper indexing and relationships to ensure efficient retrievals and updates.
- **Data Management Practices**:
  - Input validation at the API level ensures that only correctly formatted data is stored.
  - Regular backups and data versioning practices are in place as part of Supabase's managed services.

## 3. Database Schema

### Human-Readable Schema Overview

- **Customers Table**:
  - Stores basic customer information such as name, country code, phone number, and optional email.
  - Contains a field for conversation history and topics to discuss.

- **SalesScripts Table**:
  - Contains the generated sales script that is created upon form submission.
  - Links to the customer record for traceability.

- **CallTranscripts Table**:
  - Records the transcript of calls initiated via Bland AI.
  - Includes metadata related to call timing and status.

### Example SQL Schema for PostgreSQL

-- Customers table

CREATE TABLE Customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country_code VARCHAR(10) DEFAULT 'IN',
    phone_number VARCHAR(10) NOT NULL,
    email VARCHAR(255),
    conversation_history TEXT,
    topics TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales Scripts table

CREATE TABLE SalesScripts (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES Customers(id) ON DELETE CASCADE,
    script TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Call Transcripts table

CREATE TABLE CallTranscripts (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES Customers(id) ON DELETE CASCADE,
    transcript TEXT,
    call_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

## 4. API Design and Endpoints

- **API Style**: The API follows a RESTful design to make integration with the frontend simple and intuitive.
- **Key Endpoints**:
  - **POST /api/customers**: Accepts customer data (name, country code, phone number, email, conversation history, topics) and stores it in the database.
  - **POST /api/sales-script**: Triggered upon form submission; generates a sales script through the integration of LangChainJS and OpenAI, and saves the script to the SalesScripts table.
  - **POST /api/call**: Initiates a call using Bland AI, recording and generating a transcript of the conversation. This endpoint uses API keys (from the .env file) for secure integration with Bland AI.
  - **GET /api/call-transcript**: Retrieves the transcript from the database to be displayed on the UI. Also supports manual refresh if automatic refresh fails.
- **Communication Flow**:
  - The frontend communicates with these API endpoints to handle data input, script generation, and call operations.
  - Each endpoint incorporates error handling to provide clear, meaningful error messages in case something fails (e.g., data storage issues or API call failures).

## 5. Hosting Solutions

- **Cloud Providers & Environment**:
  - **Frontend Hosting**: The NextJS 15 application is likely hosted on Vercel, a popular cloud provider optimized for NextJS projects.
  - **Backend Database**: Supabase provides a managed PostgreSQL service that takes care of hosting, backups, and scaling.
- **Benefits**:
  - **Reliability**: Both Vercel and Supabase offer robust uptime and managed services ensuring high reliability.
  - **Scalability**: These platforms automatically scale resources as traffic increases, ensuring smooth handling of workloads.
  - **Cost-Effectiveness**: Managed solutions reduce the burden of infrastructure management and costs associated with on-premises solutions.

## 6. Infrastructure Components

- **Load Balancers**: The hosting solutions (e.g., Vercel) come with built-in load balancing to distribute incoming traffic evenly.
- **Caching Mechanisms**: Caching is implemented where necessary (for instance, caching frequently requested data) to improve response times. While not deeply elaborated here, strategies such as server-side caching or CDN caching for static assets are considered.
- **Content Delivery Networks (CDNs)**: Static assets of the NextJS application are cached globally via CDN to ensure fast delivery regardless of the user’s location.
- **External API Integrations**:
  - Calls to OpenAI for sales script generation and Bland AI for telephony are handled securely via API endpoints.

## 7. Security Measures

- **Authentication & Authorization**:
  - Since this prototype is for internal demo use, no user authentication is implemented. However, access to sensitive operations is managed through secure API keys stored in the .env file.
- **Data Encryption & Secure Storage**:
  - API keys and sensitive data are kept in environment variables and never exposed to the frontend.
  - Supabase provides encryption for data at rest and secure connections via HTTPS.
- **Error Handling & Safe Failures**:
  - The API includes robust error handling to return meaningful messages without leaking internal details.

## 8. Monitoring and Maintenance

- **Monitoring Tools**:
  - The Supabase dashboard and built-in logging provide insights into database performance and query health.
  - Tools such as Vercel Analytics track frontend performance and error logs for the API endpoints.
- **Maintenance Strategies**:
  - Regular updates and patches will be applied to the Prisma ORM, NextJS framework, and any other dependencies.
  - Automated alerts and manual reviews ensure that issues are resolved quickly before affecting the user experience.

## 9. Conclusion and Overall Backend Summary

- The backend structure is a carefully designed, modular system that integrates multiple services and technologies to meet the project goals.
- Key components include:
  - **Backend Architecture**: A modular, scalable design using RESTful API patterns and Node.js.
  - **Database Management**: A managed PostgreSQL database via Supabase with Prisma ORM for efficient data handling.
  - **API Design**: Clear endpoints for customer data, sales script generation, and telephony functions.
  - **Hosting Solutions**: Cloud hosting using Vercel and Supabase brings cost-effectiveness, scalability, and reliability.
  - **Infrastructure Components**: Load balancers, CDNs, and caching mechanisms work together to deliver a smooth user experience.
  - **Security Measures**: Environment variables, HTTPS, and robust error handling ensure the safe operation of the prototype.
  - **Monitoring & Maintenance**: Regular monitoring and proactive maintenance ensure ongoing performance and quick recovery from issues.

This backend setup is tailored to provide a fast-to-market demo prototype while laying the groundwork for more robust implementations in the future. Its modular design and use of modern cloud technologies balance ease-of-use, performance, and security, aligning perfectly with the project’s goals and user needs.