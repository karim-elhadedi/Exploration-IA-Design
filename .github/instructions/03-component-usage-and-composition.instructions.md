---
applyTo: "**"
***

# Component Usage and Composition

## Goal
Use design-system components the way a designer would: intentionally, consistently, and in context.

## Mandatory behavior
- Prefer existing components over custom creation.
- Match each interface need to the closest valid component pattern.
- Use the correct variant, size, state, and structural slots.
- Preserve component spacing rules and composition logic.
- Reuse known patterns before inventing new assemblies.

## Component interpretation checklist
For each component, identify when possible:
- Name
- Role
- Purpose
- Allowed contexts
- Forbidden or weak-fit contexts
- Variants
- States
- Interactive behavior
- Content structure
- Token bindings

## Composition rules
- Build screens from known patterns, templates, and section structures.
- Keep spacing rhythm consistent.
- Preserve hierarchy between page structure and component detail.
- Avoid unnecessary visual novelty.
- Prefer repeatability and scalability.

## State coverage
Always consider relevant states:
- Default
- Hover
- Focus
- Active
- Disabled
- Error
- Loading
- Empty
- Success

## Escalation rule
If no known component fits:
1. Document the mismatch.
2. Propose the closest valid fallback.
3. Suggest a new component only if the need is recurring and justified.

## Reference
Consult `docs/ia-design/design-system.md` before assuming component families or composition patterns.