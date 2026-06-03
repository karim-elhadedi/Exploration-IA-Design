---
applyTo: "**"
***

# Accessibility

## Goal
Ensure every generated, reviewed, or documented interface follows accessibility best practices by default.

## Core principles
- Preserve readable structure and clear hierarchy.
- Ensure sufficient contrast.
- Maintain visible focus states.
- Support keyboard and assistive technology use.
- Avoid relying only on color to communicate meaning.
- Consider state clarity, error clarity, and content readability.

## Minimum checklist
Check at minimum:
- Text contrast
- Focus visibility
- Target sizes
- Form labels and errors
- Heading structure
- State communication
- Keyboard access
- Light/dark mode consistency when relevant
- Semantic clarity for icons, badges, and status elements

## Audit behavior
When an issue is found, report:
- The issue
- Why it matters
- Severity
- Suggested fix
- Whether the issue comes from the source design system or from the generated output

## Rule
Never assume that a design-system example is accessible by default; validate it.