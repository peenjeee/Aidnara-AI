# Aidnara AI - Frontend

This is the frontend application for the Aidnara AI project, built to provide a fast and responsive user interface for donation tracking, campaign management, and verifiable impact certificates.

## Tech Stack
* Framework: SolidStart (SolidJS)
* Styling: Tailwind CSS
* Language: TypeScript
* Package Manager: npm

## Prerequisites
* Node.js (v18 or newer)
* npm

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Setup:
   Copy the example environment file and configure the necessary variables.
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your backend API URL and Web3 configuration.

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure
* `src/routes/` - Contains the file-based routing components (Homepage, Campaigns, etc).
* `src/app.tsx` - The main entry point configuring SolidStart Router.
* `src/app.css` - Global stylesheet including Tailwind directives and CSS variables.
