# Frontend Guideline Document

This document explains the frontend setup for our quick sales call prototype in simple, everyday language. It covers how the architecture is put together, the design ideas behind the interface, the technologies we’re using, and our approach to making sure the app is fast and reliable. The following sections are here to give everyone – technical or not – a clear picture of the frontend setup.

## Frontend Architecture

Our application uses NextJS version 15 as the main framework. This means that our project is built as a single-page application (SPA) with a file-based routing system, making the navigation smooth and predictable. We use the following key parts:

- **NextJS v15:** Provides a contemporary framework for building the UI, with efficient server-side rendering and static site generation, which boosts performance.
- **Modern JavaScript & React:** Our components are built using React, ensuring a component-based architecture that is easy to maintain and scale.
- **API Integrations:** Communication is made through APIs with our backend services (Supabase using Prisma ORM, LangChainJS with OpenAI, and Bland AI for call handling). This modular approach allows us to update or replace APIs without affecting the whole frontend.

Overall, this architecture supports scalability (we can add new features or screens as needed), maintainability (clear separation of concerns), and performance (optimized loading and prior use of NextJS built-in optimizations).

## Design Principles

We have designed the user interface around these key ideas:

- **Usability:** The interface is straightforward. Users fill out a simple form with clear fields for name, phone, email, conversation history, and discussion topics. The layout is clean and intuitive so users know exactly what to do.

- **Accessibility:** We ensure that the design is accessible to everyone. This means proper labeling of form elements, good color contrast, and keyboard-friendly navigation.

- **Responsiveness:** The layout adjusts and works well on different devices (desktop, tablet, and mobile). This flexibility means users can enter customer details or view transcripts anywhere, anytime.

- **Error Handling & Feedback:** Any issues in data saving, script generation, or API calls are reported to the user with clear, helpful messages.

These principles guide every design decision, ensuring that customers using the tool have a pleasant and error-free experience.

## Styling and Theming

Our project embraces a modern, clean, and flat design style, keeping the interface simple and visually appealing. Here’s how we do it:

- **Styling Approach:** We use CSS in JS and SASS with a methodology inspired by BEM (Block Element Modifier). This provides clarity in styling by avoiding conflicts and making each component’s style self-contained.

- **Pre-processors & Frameworks:** In addition to SASS, we incorporate Tailwind CSS for quick and responsive styling. This gives us a robust system to ensure consistency across all devices.

- **Theming:** The theming strategy is centered around a consistent look and feel. In practice, this means using the same set of colors, spacing, and fonts across the board. Any required tweaks are managed through well-documented theme files.

  **Style and Palette:**
  - Design Style: Modern and flat design
  - Color Palette:
    - Primary: #1E90FF (a clear, friendly blue)
    - Secondary: #32CD32 (a vibrant green for accents)
    - Accent: #FFA500 (warm orange for calls to action)
    - Background: #F4F4F4 (a light grey to keep the interface clean)
    - Text: #333333 (ensuring clear readability)

  **Font:** The default font is set to 'Roboto', which is modern, clean, and easy to read. This fits well with our modern, flat design philosophy.

## Component Structure

We follow a component-based architecture to keep our code clean and reusable. Here’s how our components are organized:

- **Page-Level Components:** These are the main screens such as the customer data entry page and the transcript display view.

- **UI Components:** These include input fields, buttons, dropdown menus, and text areas. Each of these is built as a stand-alone component, allowing for reuse across different screens.

- **Layout Components:** Shared elements like headers, footers, and navigation layouts are separated into their own files, ensuring consistency in look and feel throughout the app.

With this structure, any part of the UI can be updated without affecting the whole application, making future enhancements or redesigns much easier and faster.

## State Management

Since our project is relatively simple but interactive, state management is straightforward:

- **Local Component State:** We use React’s built-in useState hook for managing local states such as input values and error messages.

- **Global State (Where Needed):** For data that needs to be shared across multiple components (like the call transcript and refresh logic), we use React’s Context API. This keeps state management elegant and avoids the need for more complex libraries like Redux.

This mix ensures the UI remains responsive, updates in real time, and handles transitions (such as form submission and transcript refresh) smoothly.

## Routing and Navigation

Routing in our app is handled by NextJS’s file-based routing system. This setup means:

- **Straightforward Navigation:** Each page corresponds to a file in the pages directory. For instance, the primary customer data entry form is managed in one file, and views for the generated script and transcripts can reside in their own files.

- **Automatic Code Splitting:** Since NextJS automatically splits code by pages, navigation remains efficient with only the necessary code being loaded when a page is accessed.

- **Simple Navigation Options:** A clear navigation flow is provided – users can easily move from entering data to reviewing the generated script and triggering a call with a single click.

## Performance Optimization

To ensure a fast and pleasant user experience, we implement several performance strategies:

- **Lazy Loading:** Parts of the app (like the transcript refresh section) are loaded only when needed, speeding up the initial page load.

- **Code Splitting:** By leveraging NextJS’s automatic code splitting, we ensure that users load only the code required for the current view.

- **Asset Optimization:** We optimize images and other static assets so that they load quickly, even on slower internet connections.

These strategies contribute to a snappy, efficient user experience that keeps wait times low and interactions fluid.

## Testing and Quality Assurance

We place a strong emphasis on testing to make sure our app works as intended. Here’s our approach:

- **Unit Tests:** Individual components (like form fields and buttons) are tested using Jest to confirm that each piece works correctly in isolation.

- **Integration Tests:** Tools like React Testing Library are used to test how components work together. This ensures that the form submission, data storage, and interactions between components are all solid.

- **End-to-End Tests:** We use end-to-end tests (for example, with Cypress) to simulate a user’s journey through the app. This makes sure that the entire flow – from data entry to transcript generation – works seamlessly.

- **Error Handling Checks:** Our tests also simulate error conditions to ensure that failure states (like API call errors) are handled gracefully and that users receive clear feedback.

## Conclusion and Overall Frontend Summary

In summary, the frontend of our sales call prototype is built with clarity, efficiency, and end-user friendliness in mind. Here’s a quick recap:

- We use NextJS 15 and React for a modern, component-based architecture that is scalable and maintainable.

- Our design principles focus on usability, accessibility, and responsiveness, ensuring that the tool is straightforward and easy to use.

- The styling embraces a modern, flat design with a consistent theme and palette (using colors like blue, green, and orange, and the Roboto font), which provides a clean, captivating look.

- With a well-organized component structure, local and global state management, and intuitive routing, we ensure that the application works smoothly for every user.

- Performance optimizations such as lazy loading and code splitting, combined with robust testing strategies using Jest, React Testing Library, and Cypress, lead to a reliable and enjoyable user experience.

This comprehensive guideline ensures that anyone – whether a developer or a non-technical stakeholder – can understand how the frontend is built and maintained, and how it supports the overall goals of our project.