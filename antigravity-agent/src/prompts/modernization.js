const modernizationPrompts = {
  migrateBackend: (vb6Code, filename) => `
You are an expert software modernization engineer.
Your task is to migrate the database and logical operations in the legacy VB6 code file "${filename}" to a modern Node.js/Express backend.

Legacy VB6 Code:
\`\`\`vba
${vb6Code}
\`\`\`

Migration Guidelines:
1. Replace ADODB connections with SQLite.
2. Formulate proper REST endpoints matching the data-access operations.
3. Catch all potential errors and return suitable HTTP status codes.
4. Output only clean, working JavaScript code.
`,

  migrateFrontend: (vb6FormCode, filename) => `
You are an expert UX and frontend modernization engineer.
Your task is to migrate the UI controls and event-handlers in the legacy VB6 form "${filename}" to a premium React component.

Legacy VB6 Form:
\`\`\`vba
${vb6FormCode}
\`\`\`

Migration Guidelines:
1. Translate controls (TextBox, CommandButton, Label) to modern React equivalents.
2. Implement visual state management using hooks (useState, useEffect).
3. Use a premium, responsive layout.
4. Integrate fetch requests to point to Express API endpoints.
5. Output only working React JSX.
`
};

module.exports = modernizationPrompts;
