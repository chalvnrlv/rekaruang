# TEXTILE DESIGN

## Mission
Create implementation-ready, token-driven UI guidance for TEXTILE DESIGN that is optimized for consistency, accessibility, and fast delivery across documentation site.

## Brand
- Product/brand: TEXTILE DESIGN
- URL: https://www.fab-brick.com/
- Audience: developers and technical teams
- Product surface: documentation site

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=Arial`, `font.family.stack=Arial, Helvetica, sans-serif`, `font.size.base=10px`, `font.weight.base=400`, `font.lineHeight.base=normal`
- Typography scale: `font.size.xs=10px`, `font.size.sm=12px`, `font.size.md=13.33px`, `font.size.lg=14px`, `font.size.xl=16px`
- Color palette: `color.surface.base=#000000`, `color.text.secondary=#2f2e2e`, `color.text.tertiary=#0000ee`, `color.text.inverse=#607d96`, `color.surface.muted=#ffffff`, `color.surface.raised=#fafafa`, `color.surface.strong=#a0a09f`
- Spacing scale: `space.1=1px`, `space.2=4px`, `space.3=6px`, `space.4=10px`, `space.5=16px`, `space.6=20px`, `space.7=21px`, `space.8=80px`
- Radius/shadow/motion tokens: `radius.xs=29px`, `radius.sm=50px` | `shadow.1=rgba(158, 153, 142, 0.7) 0px 0px 6px 0px inset`, `shadow.2=rgba(0, 0, 0, 0.1) -8px -7px 20px 0px` | `motion.duration.instant=200ms`, `motion.duration.fast=250ms`, `motion.duration.normal=400ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (25), buttons (22), inputs (5), lists (3), navigation (2).


## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
