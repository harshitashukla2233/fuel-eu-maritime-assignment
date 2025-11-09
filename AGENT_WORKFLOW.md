# AI Agent Workflow Log

## Agents Used
- **GitHub Copilot** — For boilerplate TypeScript, React components, Tailwind styling.
- **Claude Code** — For refactoring domain logic and generating backend service methods.
- **Cursor Agent** — Task management, guided code scaffolding, and test generation.
- **OpenAI Codex** — Assisted in computing formulas for Compliance Balance, Banking, and Pooling.

## Prompts & Outputs

### Example 1: Generating a React Table Component
**Prompt:**  
"Create a React + TypeScript table component for displaying routes with columns routeId, vesselType, fuelType, year, ghgIntensity, fuelConsumption, distance, totalEmissions, using TailwindCSS."

**Output:**  
- Generated `<RoutesTable />` component with dynamic props and sorting/filtering hooks.  
- Required minor corrections for strict TypeScript type checking.

### Example 2: Backend Banking Logic
**Prompt:**  
"Write a TypeScript function to apply banked compliance balance to deficit ships, ensuring no ship exits with negative CB."

**Output:**  
- Generated function `applyBankedSurplus` with validation.  
- Adjusted logic manually to ensure floating-point precision for gCO₂e calculations.

## Validation / Corrections
- Verified all generated code against unit tests.
- Refactored AI-generated code to follow hexagonal architecture and domain boundaries.
- Fixed minor type mismatches and added defensive checks for edge cases (e.g., CB ≤ 0).

## Observations
- Copilot was fastest for frontend scaffolding and repetitive boilerplate.
- Claude Code excelled in refactoring domain services and writing clean backend logic.
- Cursor Agent helped keep tasks organized and generate test stubs efficiently.
- Hallucinations occurred mostly for exact formula implementations — manually verified with the Fuel EU methodology PDF.

## Best Practices Followed
- Always validate AI outputs against domain rules.
- Use Copilot inline for boilerplate, Claude Code for critical calculations.
- Document prompts and outputs for transparency.
- Keep AI-generated code modular for easy testing and debugging.
