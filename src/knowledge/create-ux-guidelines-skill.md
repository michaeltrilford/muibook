---
name: create-ux-guidelines-skill
description: Help make your own UX Guidelines for your design system, providing a common structure for developers and designers.
---

# Create UX Guidelines Skill

Use this skill to write practical component guidelines that help people, design tools, and coding agents use a Web Component system correctly.

<mui-body size="large">
Treat guidelines as the authored layer between component implementation and generated metadata.
- Component source defines behavior.
- API metadata defines public attributes, properties, events, slots, CSS parts, and CSS variables.
- Guidelines provide the structured content for the documentation site.
</mui-body>

Good guidelines are not marketing copy. They are operating instructions for choosing, composing, reviewing, and shipping components.

## Guidelines Structure

Ensure all guidelines conform to a strict, predictable schema.

## Header And Links
Provide clear, concise explanations of what the component is and what it does. Include URLs pointing to the relevant external resources (e.g., design files, component playgrounds, or code repositories).

## Usage
Outline when and how to use the component. Reserve this for functional rules (e.g., "Reserve buttons for core actions").

## Accessibility
Split accessibility guidance into distinct audiences:
- **Designer:** Guidelines for design-time considerations (e.g., "Never put tooltips on disabled buttons").
- **Engineer:** Guidelines for implementation considerations (e.g., "Ensure buttons are focusable via keyboard navigation", "Use appropriate ARIA roles").

## Anatomy
Name the stable visible structure of a component. Describe specific regions (e.g., "LABEL:", "BEFORE:") and connect them to slots, public attrs, or CSS parts.

## Variants
Use lightweight images to showcase the different states and variant configurations. Variants should map to real usage differences (e.g., Primary, Secondary, Icon-only).

## Rules
Provide clear Do and Don't rules. Use these to visually compare correct versus incorrect usage and clarify nuanced design constraints.

## Behaviour
Detail interactive states (Hover, Focus, Disabled) and how the component responds to user input.

## Writing
Provide copywriting guidelines specific to the component (e.g., "Keep button text short and action-oriented. Use sentence case.").

## Compositions
Use lightweight images to show realistic component combinations and use cases. Visual examples of slot placement and parent-child context are preferred over dense code snippets.

## Related Resources
List related component links to help users find alternatives.
