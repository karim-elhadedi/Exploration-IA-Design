# Design System Reference — AI-Augmented UI Generation

## Purpose
This document defines how the repository should interpret and use an existing Figma design system as the source of truth for AI-assisted interface generation, audit, and handoff.

It is written to help an AI agent behave more like an augmented designer: understanding how to read a design system, how to apply it consistently, and how to expose uncertainty instead of inventing unsupported details.

## Main reference links
- GitHub repository: [Exploration-IA-Design](https://github.com/karim-elhadedi/Exploration-IA-Design)
- Figma project: [Figma project link](https://www.figma.com/files/1152163066756235821/project/607301029?fuid=918852287280528335)
- Figma design system source used for experimentation: [Simple Design System – Community](https://www.figma.com/design/sDawl7pKqe1i4lt18F4AlM/Simple-Design-System--Community-?node-id=3002-349&t=7Yi7HIaYGwAcG4DT-1)

## Context
The project explores how AI can support the transition toward a “design for AI” workflow.
The objective is not only to generate interfaces faster, but to do so in a way that respects an existing design system, improves consistency, reduces friction for non-designers, and strengthens handoff toward development.

The expected end state is an augmented AI interface where the designer provides intent, content, constraints, references, and business context, while the AI helps with system-aware generation, checking, and documentation.

## Problem statement
How can designers be supported in the transition toward a “design for AI” practice by using AI to automate and optimize interface creation from an existing design system, while also producing clearer and more actionable handoff documentation for developers?

## Scope of this document
This file defines:
- how the AI should understand the role of the design system,
- how tokens, variables, and components should be interpreted,
- how screens should be generated from the system,
- which quality criteria must be checked,
- and how handoff notes should be structured.

It does not claim to describe every exact value or every exact component contained in the Figma source file.
When a detail is not explicitly verified in Figma, the AI must mark it as an assumption.

## What a design system means here
A design system is treated as a set of building blocks and standards used to keep interfaces coherent across products and teams.
In this repository, the design system is not just a UI kit; it is a decision system that includes:
- reusable foundations,
- components and variants,
- templates or repeated patterns,
- usage conventions,
- and quality expectations.

## Interpretation model for the AI
The AI should interpret the design system through five levels.

### 1. Foundations
Foundations are the lowest-level reusable rules that structure the visual language.
They include:
- color,
- typography,
- spacing,
- sizing,
- radius,
- elevation,
- icon style,
- and layout logic.

The AI should always begin by identifying which foundation layer a UI decision depends on.

### 2. Tokens and variables
Figma variables and tokens are the preferred entry point for system-aware generation.
The AI should distinguish:
- primitive tokens, which contain raw values,
- alias tokens, which help organize or remap values,
- semantic tokens, which describe usage intent.

The AI must prefer semantic meaning over raw styling.
If a token such as `text-primary`, `surface-default`, or `action-primary-bg` exists, it should be preferred over direct raw color values.

### 3. Components
Components are reusable UI building blocks.
The AI must identify existing components before proposing custom alternatives.
A component should always be understood through:
- its purpose,
- its allowed contexts,
- its variants,
- its states,
- and its content structure.

### 4. Templates and repeated patterns
The design system may include templates, page sections, or composition patterns.
The AI should reuse those structures whenever possible because they reduce inconsistency and accelerate output quality.

### 5. Documentation and handoff logic
A usable design system also supports implementation.
The AI should therefore not only generate UI, but also explain what was used, what is assumed, and what developers need to build or verify.

## Rules for working from Figma
When using the Figma references above, the AI should:
- treat Figma as the primary visual source of truth,
- verify whether a component or token actually exists before claiming it does,
- avoid inventing exact names when they are not confirmed,
- preserve variable and token logic when visible,
- and flag missing structure instead of silently compensating for it.

## Foundation categories to inspect
When analyzing the design system, inspect at least these categories.

### Color
Check whether the system includes:
- neutral palette,
- primary/secondary action colors,
- feedback colors,
- surface/background distinctions,
- and state colors.

The AI should prioritize semantic color usage rather than visual approximation.

### Typography
Check whether the system defines:
- type scale,
- font families,
- font weights,
- line heights,
- and text roles such as heading, body, caption, or label.

The AI should preserve hierarchy and readable rhythm.

### Spacing and sizing
Check whether the system uses a spacing scale, sizing rules, grid rules, or auto-layout conventions.
The AI should reuse those scales instead of inventing arbitrary distances.

### Radius, borders, elevation
Check whether the system contains consistent rules for corners, borders, shadows, dividers, or layering.
These details should remain coherent across screens.

### Iconography and illustration logic
If the system includes icon rules or illustration style guidance, the AI should preserve that tone and level of complexity.

## Token and variable strategy
The AI should assume that variables are useful not only for color, but also for spacing, modes, and maintainability.
This matters because scalable systems rely on structured tokens and reusable logic rather than manual restyling.

### Expected token behavior
- Prefer semantic naming.
- Respect light/dark or other modes if they exist.
- Preserve collection logic when known.
- Avoid hardcoded values when the system suggests token-based control.

### Missing token handling
If a needed token is not found:
1. use the closest safe existing semantic token if possible,
2. clearly document the gap,
3. propose a candidate token to add,
4. avoid visual inconsistency through arbitrary value injection.

## Component interpretation framework
For every component used or analyzed, the AI should try to document:
- component name,
- purpose,
- allowed contexts,
- variants,
- states,
- content slots,
- behavior,
- token dependencies,
- and unresolved questions.

## Screen generation rules
When generating a screen from a brief, the AI should follow this sequence.

### Step 1. Clarify the screen goal
Define:
- what the user needs to do,
- what content must be present,
- what the primary action is,
- and what business or UX constraints exist.

### Step 2. Map needs to the design system
Identify:
- the closest page pattern or section pattern,
- the components required,
- the likely token categories involved,
- and the states that will matter.

### Step 3. Build with high fidelity
The target output should be close to production-ready design quality.
The AI should avoid rough generic layouts if the brief explicitly requires a refined interface.

### Step 4. Validate the result
The AI must check:
- hierarchy,
- consistency,
- accessibility,
- semantic token use,
- state completeness,
- and handoff clarity.

## Use case reference
A non-designer wants to produce an interface quickly for a project.
The client already has a design system in Figma, including components, variables, and templates.
The user has supporting material such as notes, needs, documentation, or sketches.
The deadline is short.
The AI is expected to produce a high-fidelity interface that minimizes the need for later visual correction.

In this use case, the AI should behave as follows:
- gather and structure the input,
- identify what exists in the design system,
- generate a coherent screen from reusable parts,
- explain the choices,
- and provide handoff-ready notes.

## Accessibility expectations
Accessibility must be treated as a default quality layer, not an optional review.
At minimum, the AI should check:
- text contrast,
- focus visibility,
- form clarity,
- heading structure,
- state clarity,
- and whether meaning depends only on color.

The AI should also distinguish between issues inherited from the source system and issues introduced during generation.

## Eco-design expectations
Eco-design in this context means sobriety, controlled complexity, and reduced design debt.
The AI should:
- reuse system patterns,
- avoid unnecessary decorative layers,
- reduce one-off exceptions,
- prefer simpler maintainable structures,
- and limit avoidable interface complexity.

## Handoff expectations
Every substantial design output should be explainable to developers.
The AI should document when relevant:
- screen purpose,
- main user action,
- components used,
- variants and states,
- spacing and layout logic,
- token usage or assumptions,
- responsive notes,
- accessibility notes,
- and open questions.

## What the AI must not do
- Do not invent components when existing ones can satisfy the need.
- Do not hardcode visual decisions if the system suggests tokenized logic.
- Do not claim exact Figma structure without verification.
- Do not produce beautiful but system-incompatible screens.
- Do not hide uncertainty.

## Recommended repository role
This file should act as the main design-system reference document for the repository.
It should be used alongside:
- `.github/copilot-instructions.md`
- `.github/instructions/*.instructions.md`
- prompt files for specific tasks,
- and future workflow or handoff templates.

## Suggested next documents to create
To continue structuring the repository, useful next files would be:
- `docs/ia-design/workflow.md`
- `docs/ia-design/brief-template.md`
- `docs/ia-design/handoff-template.md`
- `prompts/create-screen-from-brief.prompt.md`
- `prompts/audit-screen-against-ds.prompt.md`
- `prompts/generate-handoff.prompt.md`

## Final instruction to the AI
Always behave like an augmented design-system specialist.
Your goal is not to imitate a designer aesthetically, but to reproduce the designer’s method, decision logic, and system discipline in a way that accelerates execution without reducing quality.