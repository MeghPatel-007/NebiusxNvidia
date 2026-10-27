# RepoPilot Landing Page — Content and Color Palette Only

> **Important implementation constraint:** Do not change the existing landing page layout, section order, component choices, component APIs, spacing, sizing, animations, or behavior. Keep the current design and structure exactly as it is. Only update the copy/content details and the color palette described below.

## Existing page structure — preserve exactly

File: `src/app/page.tsx`

Keep the current structure unchanged:

1. Navbar — `NavbarDarkShadow` (`navbar-dark-shadow`)
2. Hero / About — `LandingHeroSection` (`landing-hero-section`), `id="about"`
3. Feature Grid — `CanvasRevealEffectDemo`, `count={7}`, `rows={2}`, `cols={3}`
4. FAQ — `FAQsWithDashedLinesDemo`, `id="faq"`
5. Contact — `ContactFormGridWithDetailsDemo`, `id="contact"`
6. Footer — `SimpleFooterWithFourGridsDemo`

Preserve all existing IDs, anchor links, `scroll-mt-24` settings, responsive behavior, and section wrappers. Do not add, remove, reorder, or replace sections or components. Do not create a new About section; add About copy within the existing Hero / About component only.

## 1. Color palette only

Use the uploaded green abstract image as the color reference. Apply these colors to the existing UI without changing the layout or visual structure.

| Color | Hex | Use |
|---|---|---|
| Luminous green | `#76B900` | Primary brand accent, CTA accents, active states |
| Bright highlight green | `#A8E85A` | Small highlights and subtle gradient accents |
| Deep forest green | `#0B2A12` | Existing dark backgrounds or subtle background accents |
| Near-black | `#080B08` | Existing dark surfaces, navbar/footer if already dark |
| Soft black | `#111511` | Existing dark cards or panels |
| White | `#FFFFFF` | Existing light surfaces and text on dark surfaces |
| Soft white | `#F5F7F4` | Existing light background surfaces |
| Muted gray | `#A6AEA4` | Secondary text on dark surfaces |
| Light border gray | `#E1E7DF` | Existing borders on light surfaces |
| Dark border green-gray | `#263326` | Existing borders on dark surfaces |

### Palette rules
- Change colors only; retain existing component dimensions, positions, layout, spacing, typography scale, animation, and interactions.
- Do not add a new background image, new decorative element, new gradient, glow, or effect unless the current design already has that treatment. If gradients already exist, adjust their colors to this palette without changing their shape or behavior.
- Use the luminous green sparingly for emphasis and keep text contrast accessible.
- Do not use NVIDIA logos or imply NVIDIA sponsorship, endorsement, or partnership. This is a color palette reference only.

## 2. Content details only

Update the text inside the existing sections. Do not redesign or restructure any section.

### Navbar — `NavbarDarkShadow`
Keep the existing navbar layout and controls. Use:
- Brand: `RepoPilot`
- Existing About link: `#about`
- Existing Features link: use the feature section's current anchor, if one exists
- Existing FAQ link: `#faq`
- Existing Contact link: `#contact`
- Existing primary CTA label, if present: `Connect GitHub`

Do not add new navbar items or controls. Do not change link behavior except to ensure existing links point to the correct existing sections.

### Hero / About — `LandingHeroSection`
Keep the existing hero layout, text placement, buttons, and visual elements.

**Eyebrow:**
`AI-POWERED GITHUB DEBUGGING`

**Headline:**
`Find the bug. Understand the cause. Ship the fix.`

**Description:**
`RepoPilot helps developers investigate issues across their GitHub repositories, understand likely root causes, and review AI-generated code-fix suggestions in one focused workflow.`

Use the existing primary CTA, if present: `Connect GitHub`.

Use the existing secondary CTA, if present: `Explore features`.

**About copy** — place within the existing Hero / About section's current content area, without adding a new section or changing the layout:

`Debugging often means jumping between issue descriptions, source files, recent commits, and test output to work out what went wrong. RepoPilot brings repository context and AI-assisted investigation into one focused workflow, helping developers explore relevant code, understand possible causes, and review proposed fixes. Developers remain in control of what gets accepted and shipped.`

If the existing component has room for short value statements, use these; otherwise do not add new UI elements:
- **Repository-aware context:** Find code relevant to the reported issue using repository information available to RepoPilot.
- **Understand before changing:** Review the suspected cause and related files before making a change.
- **Keep control:** Review proposed changes before accepting or shipping a fix.

### Feature Grid — `CanvasRevealEffectDemo`
Preserve exactly `count={7}`, `rows={2}`, `cols={3}` and the current card layout. Change card copy only.

**Section heading, if the component already supports one:**
`Built to make debugging clearer`

**Intro, only if an existing intro text area exists:**
`Spend less time hunting for the source of a bug and more time making informed changes.`

Use these seven card content entries in the existing card slots:

1. **GitHub Repository Connection**
   Connect a GitHub repository through the RepoPilot GitHub App using the permissions granted by the user.

2. **Repository-Aware Investigation**
   Use accessible repository files and metadata to help locate code related to a reported issue.

3. **Root-Cause Insights**
   Understand the suspected cause of an issue, with relevant files or code paths where available.

4. **Suggested Code Fixes**
   Review AI-generated change suggestions and understand what each proposed change is intended to address.

5. **Developer-Controlled Review**
   Keep control of code changes by reviewing suggestions before accepting or shipping them.

6. **Validation Visibility**
   Where checks are supported, display their real results and clearly distinguish passed, failed, and not run.

7. **Investigation History**
   If this feature exists, describe how users revisit prior investigations. If it does not exist, use copy for a feature that is implemented; do not claim unavailable functionality.

Do not add, remove, or rearrange cards. Do not change the canvas effect or grid geometry.

### FAQ — `FAQsWithDashedLinesDemo`
Keep the current FAQ component, layout, and interaction behavior. Update question/answer copy only, using the existing number of FAQ slots. If there are fewer slots, prioritize the first questions and do not add new UI.

**What is RepoPilot?**
RepoPilot is an AI-assisted GitHub debugging tool that helps developers investigate repository issues, understand likely causes, and review proposed code fixes.

**How do I connect GitHub?**
Use the existing Connect GitHub flow to authorize the RepoPilot GitHub App and grant the repository access requested by the app.

**Does RepoPilot automatically change my code?**
RepoPilot's suggestions should be reviewed before they are applied or shipped. Describe patch application or pull-request creation only if those capabilities are implemented.

**Can RepoPilot guarantee a fix?**
No. AI-generated analysis and suggestions can be incomplete or incorrect. Review the explanation and proposed changes, then run appropriate checks.

**Does RepoPilot run tests?**
Describe only the test or validation capabilities currently implemented. If test execution is not available, state that clearly.

**Which languages are supported?**
List only languages and frameworks that have actually been tested. Otherwise explain that results depend on the repository and available context.

**How is repository data handled?**
Explain what data the app accesses and stores, and whether repository context is sent to an external AI provider. Link to an actual privacy policy if available.

**Can I revoke access?**
Explain the supported method for revoking the GitHub App's repository access through RepoPilot or GitHub settings.

### Contact — `ContactFormGridWithDetailsDemo`
Preserve the current contact form layout, fields, details grid, and behavior. Update text only.

**Heading:**
`Let's talk about your workflow`

**Supporting copy:**
`Have a question, found a bug, or want to share feedback about RepoPilot? Send a message and tell us how we can help.`

Use the existing form fields and existing submit button. If the button label is editable, use `Send message`.

Use only verified contact details and URLs already available in the project. Do not invent an email address, social profile, or response-time promise. Do not change form behavior as part of this content update.

### Footer — `SimpleFooterWithFourGridsDemo`
Keep the existing four-column footer layout and existing links. Update labels/descriptions only.

**Product description:**
`AI-assisted GitHub debugging to help developers investigate issues and review proposed fixes with confidence.`

Use existing footer slots for links such as About, Features, FAQ, Contact, Documentation, GitHub, Privacy Policy, and Terms only when those destinations already exist. Do not add columns, add new UI, or create placeholder pages.

## 3. Implementation constraints — must follow

- Modify only copy/text and existing color values.
- Do not change the page layout, component order, component names, props, grid dimensions, spacing, sizing, typography scale, animation, or interaction behavior.
- Do not add, remove, or replace components or sections.
- Do not add new UI elements, decorative elements, backgrounds, gradients, or effects.
- Do not add a separate About section; place About content within the existing Hero / About component.
- Preserve all existing section IDs, anchor behavior, and `scroll-mt-24` classes.
- Keep existing links and form behavior; only correct a link if its intended destination already exists.
- Do not invent features, validation results, customer claims, metrics, contact details, or legal URLs.
- Do not claim that NVIDIA endorses or partners with RepoPilot.
- If the requested content does not fit existing component slots, prioritize the core copy instead of changing the layout to fit it.

## 4. Acceptance checklist

- [ ] `src/app/page.tsx` keeps the exact existing six-section layout and order.
- [ ] All current components and their props are preserved.
- [ ] Only existing text and color values are updated.
- [ ] The palette reflects the uploaded luminous green / forest green / black / white image.
- [ ] No new section, card, button, animation, or visual element is introduced.
- [ ] About copy is added only inside the existing Hero / About component.
- [ ] Existing anchor IDs and `scroll-mt-24` behavior remain unchanged.
- [ ] Existing contact form behavior and links remain unchanged.
- [ ] All claims accurately reflect implemented RepoPilot functionality.
