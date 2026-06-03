# Instruction Files

Generated instruction set for GitHub Copilot custom instructions.

## Structure
- `.github/copilot-instructions.md`: repository-wide instructions.
- `.github/instructions/*.instructions.md`: path-scoped instruction files with valid `applyTo` front matter.

## Important note
These files follow GitHub Copilot's documented format:
- repository-wide instructions belong in `.github/copilot-instructions.md`
- path-specific instruction files belong in `.github/instructions/` and require an `applyTo` field in the front matter