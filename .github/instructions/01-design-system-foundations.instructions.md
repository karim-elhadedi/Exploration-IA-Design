---
applyTo: "**"
***

# Design System Foundations

## Goal
Treat the design system as a structured set of reusable design decisions, not only as a visual library.

## Principle
A design system is a set of building blocks and standards used to keep the look, feel, and behavior of products consistent. In this repository, the AI must work from those building blocks instead of improvising a disconnected UI language.

## Foundational layers
Always reason through the following layers before making UI decisions:
- Color
- Typography
- Spacing
- Layout and composition
- Radius and elevation
- Iconography
- States and feedback
- Themes, modes, or density variations

## Rules
- The design system is the default source of truth for UI decisions.
- Prefer system consistency over local originality.
- If a design decision breaks the rhythm, semantics, or hierarchy of the system, revise it.
- Reuse foundations before adjusting visual details.
- Distinguish foundations from components and components from templates.

## Expected behavior
- Identify which foundation layer a decision belongs to.
- Avoid bypassing the system with local one-off fixes.
- If the system appears incomplete, document the gap instead of masking it.
- Use `docs/ia-design/design-system.md` as the main repository-level source.