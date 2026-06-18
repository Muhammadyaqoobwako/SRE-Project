const documentationPrompts = {
  requirements: (vb6Codebase) => `
You are an IT systems analyst.
Analyze the following VB6 codebase summary and output a clean, formatted Markdown document for "requirements.md".

Legacy Codebase Context:
${vb6Codebase}

Sections to generate:
1. System Overview
2. Core Functional Requirements (Customer management, inventory operations, low-stock checks)
3. Non-Functional Requirements (Performance, Security)
`,

  architecture: (vb6Codebase) => `
You are a Software Architect.
Analyze the following legacy VB6 codebase and produce an "architecture.md" document detailing the target web-based client-server design.

Legacy Codebase Context:
${vb6Codebase}

Sections to generate:
1. High-Level Architecture (decoding from desktop app to client-server)
2. Decoupled Component Design (React frontend, Express backend, SQLite DB)
3. Mermaid Diagrams mapping component relations
4. Database Schema
`,

  apiSpec: (vb6Codebase) => `
You are an API Designer.
Based on the data forms and database queries in this legacy codebase:
${vb6Codebase}

Design the REST API endpoints and create an "api-spec.md" file in OpenAPI-style Markdown.
Include:
- GET/POST endpoints for customers
- GET/POST endpoints for inventory
- GET endpoint for low stock items
`,

  migrationPlan: (vb6Codebase) => `
You are a Project Manager.
Analyze the legacy codebase and write a step-by-step "migration-plan.md" detailing component mappings and conversion schedules.

Codebase context:
${vb6Codebase}
`
};

module.exports = documentationPrompts;
