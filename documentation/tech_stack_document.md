# Tech Stack Document

This document outlines the technology choices made for the quick prototype. It explains each component in everyday language, ensuring that anyone can understand how these technologies work together to deliver a modern and efficient demo experience.

## Frontend Technologies

For the user interface, we are leveraging:

- **NextJS 15**: This modern framework allows us to build a clean, responsive, and efficient single-page application. It simplifies the development process and ensures a smooth experience for users as they input customer details and review generated scripts.

These choices ensure fast loading times, ease of navigation, and a modern look and feel that supports the overall demo purpose.

## Backend Technologies

The backend of our application is designed to seamlessly manage data storage, script generation, and call integration. Key components include:

- **Supabase**: Acts as our hosted backend solution, managing a robust PostgreSQL database.
- **Postgres**: A reliable relational database system used to store customer information and call transcripts.
- **Prisma ORM**: Simplifies database interactions and ensures smooth communication with the Postgres database.
- **LangChainJS**: Utilized to integrate with generative AI services, it processes the input data and generates a non-editable calling sales script through OpenAI.
- **OpenAI**: Powers the generative AI component to produce the calling sales script based on customer input.

These backend choices work together to handle data processing, storage, and advanced script generation, making sure the application functions smoothly from end-to-end.

## Infrastructure and Deployment

Our infrastructure decisions have been made with reliability and scalability in mind:

- **pnpm**: This package manager is used to efficiently manage project dependencies, ensuring fast and consistent builds.
- **Environment Variables (.env file)**: Sensitive API keys for both Bland AI and OpenAI are securely managed using environment files, enhancing overall security.
- **CI/CD Practices & Version Control** (Implicit): While not explicitly detailed, standard practices including automated builds, continuous integration, and controlled version management are in place to ensure smooth deployment and updates.

These choices enable us to quickly deploy and iterate on the prototype while ensuring that our environment is both secure and scalable.

## Third-Party Integrations

The prototype incorporates several third-party services to extend its functionality:

- **Bland AI**: Integrated for telephony services, it initiates calls, records the conversation, and provides call transcripts. API keys for Bland AI are securely stored in the .env file.
- **OpenAI (via LangChainJS)**: Used for generating the calling sales script automatically based on customer input. This integration simplifies advanced AI processes and delivers dynamic content without requiring manual intervention.

These integrations significantly enhance functionality by connecting advanced AI capabilities and telephony features, ensuring the end-to-end process runs seamlessly.

## Security and Performance Considerations

Ensuring both security and performance is vital to a smooth user experience. Our approach includes:

- **Security Measures**:
  - Sensitive information such as API keys is handled securely through environment variables (.env file).
  - Best practices in code and database interactions are followed, particularly with tools like Prisma and Supabase, to protect customer data.

- **Performance Optimizations**:
  - Utilizing NextJS 15 for efficient, fast page rendering and smooth user interactions.
  - Auto-refresh functionality is built into the call transcript retrieval process, with a manual refresh option in case of delays, ensuring minimal disruption to the user experience.

Together, these measures help maintain a robust, secure, and responsive application that meets the demo objectives without sacrificing performance.

## Conclusion and Overall Tech Stack Summary

In summary, our chosen technologies align perfectly with the goals of quickly building and showcasing a prototype. Here’s a recap:

- **Frontend**: NextJS 15 offers a modern, clean, and responsive interface.
- **Backend**: Supabase with Postgres and Prisma ORM provide reliable data management, while LangChainJS with OpenAI drives the smart generation of calling scripts.
- **Infrastructure**: pnpm ensures efficient dependency management and secure environment configuration practices are in place.
- **Third-Party Integrations**: Bland AI seamlessly brings in telephony capabilities, rounding out the project’s functionality.
- **Security and Performance**: Best practices and optimized design guarantee that the application remains responsive and secure during use.

This combination of tools and technologies not only streamlines the entire process—from data input and script generation to call recording—but it also sets the stage for a robust demo environment that is both easy to maintain and scalable for future enhancements.