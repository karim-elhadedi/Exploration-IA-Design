---
applyTo: "**"
***

# Figma Tokens and Variables

## Goal
Interpret and use the Figma design system through variables, semantic tokens, collections, aliases, and modes.

## Core idea
Figma variables help store reusable values, support tokens and modes, and make design system updates more scalable. The AI should therefore reason in terms of token logic, not isolated styling values.

## Token hierarchy
Always reason through token layers in this order:
1. Primitive tokens: raw values such as base colors, spacing units, radii, or typography values.
2. Alias tokens: intermediary mappings used to organize or reassign primitives.
3. Semantic tokens: usage-oriented tokens such as text-primary, surface-default, border-subtle, or action-primary-bg.

## Rules
- Prefer semantic tokens over raw values.
- Preserve naming consistency and hierarchy.
- Respect collections and modes when they exist.
- Never replace a tokenized value with a hardcoded value unless explicitly justified.
- If a variable binding exists, preserve the logic of that binding.

## Reasoning workflow
When analyzing or generating a UI:
1. Identify the user intent.
2. Match the need to a known component or pattern.
3. Determine which semantic token category is involved.
4. Check whether a mode or variant applies.
5. Flag any missing or unclear token logic.

## Missing token behavior
If a required token appears missing:
- Reuse the nearest valid semantic token only if it is safe.
- Report the gap clearly.
- Suggest which token should be added.
- Never hide the inconsistency through arbitrary values.

## Important note
For large systems, token organization, mode handling, and update logic matter as much as the token names themselves. Think in terms of maintainability, not only output aesthetics.

## Reference
Use `docs/ia-design/design-system.md` as the main reference for token categories and DS interpretation.