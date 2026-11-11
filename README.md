# Employee Explorer

**Author:** Mariam Atwy

A Next.js application built as part of Assignment 3 – Maya's Interview Challenge.

The application demonstrates server-side and client-side data fetching, independent loading experiences using React Suspense, and error handling when API requests fail.

It uses JSONPlaceholder as a sample API to retrieve employee information and posts.

The project focuses on understanding how data fetching works in Next.js, how different loading states behave, and how to handle unsuccessful requests.

## Technologies Used

- **Next.js (App Router):** For building the application and organizing Server and Client Components.
- **React:** For component-based UI and state management.
- **TypeScript:** For defining data types and improving code safety.
- **Tailwind CSS:** For styling the dashboard and making it responsive.
- **Native Fetch API:** For retrieving employee and post data from JSONPlaceholder.
- **React Suspense:** For displaying a loading fallback.

## Application Architecture

The application separates server-side data fetching from client-side interactions.

- **Employee Profile (Server Component):** Fetches and displays the employee's name, email, and company name.
- **Recent Posts Preview (Server Component):** Fetches the employee's posts and displays up to three titles.
- **Client Post Explorer (Client Component):** Allows users to load all employee posts interactively after clicking the Load Posts button.
- **Suspense:** Provides an independent loading fallback for the recent posts preview, allowing other page sections to remain visible while it loads.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mariam558-cmd/maya-interview.git
   ```

2. Navigate to the project directory:

   ```bash
   cd maya-interview
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Run the Development Server

Start the application:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Demo Scenarios

The Employee Explorer includes a scenario selector that allows users to test different client-side data-fetching behaviors.

Choose a scenario before clicking **Load Posts** or **Retry**.

- **Success:** Fetches posts from the JSONPlaceholder API and displays them.
- **Slow:** Adds an intentional 2-second delay before making the real API request. This demonstrates the loading state.
- **HTTP Error:** Simulates an HTTP 503 Service Unavailable response using the native `Response` constructor. The application handles it using the custom `ApiError` class.
- **Empty:** Simulates a successful response containing an empty array. The application displays a "No posts found" message.

### Important Notes

- The Slow scenario uses the real JSONPlaceholder API after the delay.
- HTTP Error and Empty are locally simulated scenarios. They do not represent actual responses from JSONPlaceholder.
- The Recent Posts server-side preview also includes an intentional 2-second delay to demonstrate Suspense loading behavior.

## Quality Checks

The following commands can be used to verify code quality and production build readiness.

### ESLint

Run the lint command:

```bash
npm run lint
```

### Production Build

Create a production build:

```bash
npm run build
```

## Limitations

- The application uses JSONPlaceholder as a sample API rather than a real employee management backend.
- Employee ID 1 is used consistently throughout the application.
- The application does not include authentication, a database, CRUD operations, or employee selection.
- The HTTP Error and Empty scenarios are simulated locally for demonstration purposes.
- The artificial delays are included only to demonstrate loading behavior and are not part of the actual API response time.

## Project Information

- **Next.js Version:** 16.4.3
- **Language:** TypeScript
- **Package Manager:** npm