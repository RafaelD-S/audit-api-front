# Audit API Frontend

A React and TypeScript frontend for the IFBA Internal Control Understanding project. It sends a natural-language request to the audit API, displays the generated response as Markdown, and keeps multiple results available in the current session.

[API Repository](https://github.com/Vessierre/audit-api)

<img width="1915" height="903" alt="image" src="https://github.com/user-attachments/assets/3e394cc9-5b08-4afd-a49a-0d5d69d58113" />


## Features

- Submit natural-language audit requests.
- Select the Gemini model used by the API:
  - Gemini Hydrogen
  - Gemini Flash
  - Gemini Flash Lite
- Display API responses with Markdown and GitHub-Flavored Markdown support.
- Animate response text as it is rendered.
- Copy responses to the clipboard or remove individual response cards.
- Disable the form while a request is being processed.

## Tech Stack

- React 19
- TypeScript
- Vite
- Sass
- `react-markdown` and `remark-gfm`
- ESLint

## Prerequisites

- Node.js with npm
- The audit API running locally on `http://localhost:8080`

## Getting Started

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the URL shown by Vite, usually `http://localhost:5173`.

The frontend currently sends requests to:

```text
POST http://localhost:8080/api/audit/natural-text/{model}
```

with the following JSON body:

```json
{
  "entrada": "Your audit request"
}
```

The API response is expected as plain text. The backend must support the model values `hydrogen`, `flash`, and `flash-lite`, and must allow requests from the frontend origin when running locally.

## Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite development server        |
| `npm start`       | Start the Vite development server        |
| `npm run build`   | Type-check and create a production build |
| `npm run lint`    | Run ESLint                               |
| `npm run preview` | Preview the production build locally     |

## Project Structure

```text
src/
├── components/       # Reusable UI components
├── pages/            # Application pages
├── styles/           # Global styles
├── utils/            # Shared React utilities
├── App.tsx           # Application root
└── main.tsx          # Application entry point
```

## Production Build

Create an optimized build with:

```bash
npm run build
```

To serve the generated build locally:

```bash
npm run preview
```

## Contributors

- Rafael Dantas
- Liz Maria
- Vinicius Santos
- Sheldon Mesquita
