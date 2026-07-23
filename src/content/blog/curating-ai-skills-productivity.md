---
title: '"I Have No Skills": How Curating AI Skills Can Improve Productivity'
date: 2026-02-03
description: "Borrowed AI skills promise productivity but often deliver hidden costs. A practical guide to curating skills, the case for agents over skills, and why your own skills are the ones worth keeping."
tags: ["ai", "agent-skills", "prompt-engineering", "productivity", "agents", "platform-engineering"]
draft: false
---

Since Anthropic released [Agent Skills](https://www.anthropic.com/news/skills) in October 2025, they've quietly taken over prompt engineering. What used to be a folder of ad hoc instructions and copy-pasted system prompts is now a format, a convention, and increasingly a market — Anthropic's own [engineering writeup](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) frames skills as a way to package expertise into resources an agent can discover and load dynamically, and the spec later became an [open standard](https://www.anthropic.com/news/skills) for cross-platform portability. Marketplaces like [Skills.sh](https://skills.sh/) have sprung up as the install channel for this ecosystem, and today prominent industry developers maintain their own public skill repositories spanning everything from software productivity to engineering management. Worth noting: a meaningful share of these skills are themselves generated with AI assistance, drawing on the author's own limited dataset — their one codebase, their one team's habits — rather than anything broadly validated.

![](/images/curating-ai-skills-productivity/image3.png)

Establishing real team standards used to require empirical data, hands-on experience, and structured artifacts — linting rules, test suites, CI gates. Those are typically debated in pull requests before anyone trusts them. An externally authored skill file can create the appearance of those same results with a single install command, without any of that validation happening first. When adoption is frictionless, effectiveness tends to get judged by first impression rather than evidence, and the gap only shows up later.

Picture a well-documented backend skill released by a respected, practical engineer — someone who ships real systems, not a guru. It circulates fast across your network, promising the same review rigor for your pull requests that the author uses on their own team. Weeks later you notice AI costs creeping up, agent responses getting less reliable, multi-agent workflows behaving erratically. On the teams I work with, this pattern shows up almost every time someone traces a cost or reliability regression back far enough: not a model issue, but an installed skill quietly issuing instructions that made sense in someone else's context and don't in yours.

The engineer who wrote it wasn't wrong — the skill fit their stack, their principles, their organization. That context simply doesn't travel with the file. This is the quiet deception in the AI-skills trend: promising you can absorb someone else's leverage by installing their output. In practice, a skill isn't a clean standard-library function with a stable interface. It's a dense bundle of someone else's opinions, written by a person who has never seen your codebase or your team's culture.

## The Hype and the Quiet Cost

The current wave of skill marketplaces leans on the promise that borrowing someone else's process is nearly free — drop in a file, inherit their productivity. What gets skipped is that most of these are installed globally, meaning they run against everything you touch, not just the one project or agent where they made sense. A skill written to enforce "explain your reasoning in every commit message" is fine for a solo learning project and actively annoying on a team shipping fifty commits a day. Once installed globally, it stops being a tool and becomes an ambient policy shaping your day-to-day output whether you notice it or not.

This is the same lesson engineering teams already learned about dependencies: convenience today, audit debt tomorrow. Skills just make that debt less visible, because they operate in the prompt layer instead of the dependency tree, where nobody's running an equivalent of `npm audit`.

## Why Someone Else's Skill Is Usually a Bad Fit

A skill encodes assumptions — about your tools, your risk tolerance, your current bar for quality. Adopting it wholesale means importing those assumptions without ever agreeing to them. The failure mode isn't usually catastrophic. It appears as a subtle drift. For example, review comments start echoing a style nobody on the team actually chose. Multiply that across a handful of borrowed skills, each from a different well-regarded author with a different stack, and the workflow becomes an accretion of other people's defaults rather than a reflection of how the team actually works.

## Curating Is More Work Than Writing

Reviewing, testing, and trusting someone else's skill is often more expensive than writing your own. A focused skill for your own workflow takes a few paragraphs and a clear sense of what you want the agent to stop doing wrong. Curating a borrowed one means reading unfamiliar logic, running it against edge cases you didn't design, and keeping it validated as it is updated. It's the classic build-versus-adopt trade-off — except the adopt side rarely gets the scrutiny a new backend dependency would.

## Maintenance Hell

Three failure patterns show up repeatedly once teams accumulate more than a handful of skills:

- Skills padded with large amounts of example code that go stale the moment the underlying API or convention shifts, turning the skill into a maintenance liability instead of a shortcut.
- AI-generated skills carrying AI-generated "good enough" instructions — verbose, low-signal text that reads well but doesn't actually constrain behavior.
- Skills that look harmless individually but change process or cost meaningfully once applied broadly — a PR-review skill that adds a check nobody asked for, multiplied across every repository it touches, is a process decision disguised as a productivity tool.

This pattern mirrors the typical lifecycle of any internal tool, lint rule, or CI check — except skills accelerate adoption while bypassing critical scrutiny. They are often perceived as simple configuration rather than actual code, and the presence of a well-known author makes rigorous evaluation seem redundant. This friction can be meaningfully addressed through proper scaffolding and automated generation, a topic [I explored in a previous post](https://wtrocki.com/blog/does-scaffolding-matter-in-the-era-of-ai/).

## Organization Skills vs. Personal Skills

The choice boundary that actually matters isn't "skill or no skill" — it's who the skill serves. Organization-level skills should encode things that are genuinely shared: security constraints, compliance language, style conventions the team has explicitly agreed to. Personal skills should encode individual habits — how you like commits structured, how you want a summary written depending on the type of work, what shortcuts you personally trust an agent to take.

| Layer | Should encode | Failure mode when misapplied |
| --- | --- | --- |
| Organization | Shared constraints — security, compliance, agreed conventions | Becomes one person's opinion enforced org-wide |
| Personal | Individual habits and shortcuts | Silently overrides team-agreed policy |

This gets harder once you add more layers — teams, sub-teams, business units — and harder again once you account for the different paths a skill can be invoked through: MCP servers, CLIs, direct API calls. Each invocation path is effectively a separate enforcement surface, so a policy that's consistent when triggered through one path can quietly diverge when triggered through another — governance stops being two-dimensional the moment you have more than one layer and more than one entry point.

![](/images/curating-ai-skills-productivity/image2.png)

In practice issues can leak from both layers at the same time. A personal preference can silently speak out as a team skill, or org policy gets quietly bypassed by an individually-crafted skill that overrides it.

## A Taxonomy Worth Keeping in Mind

It helps to know which of a few distinct categories a given skill falls into before deciding whether it belongs in your setup:

- Agents that run multi-step autonomous workflows
- Tool wrappers that give an existing utility an agent-friendly interface
- Personal skills hand-crafted for one person's habits
- Organization skills applied by deliberate selection rather than automatically

![](/images/curating-ai-skills-productivity/image4.png)

Most of the trouble in this post traces back to confusing these categories — an org skill installed like a personal one, or a multi-step agent workflow flattened into a single prompt that nobody scoped for repo-wide use. That last case deserves a closer look, because it points toward a different kind of fix than "curate harder."

## Agents, Not Skills, Are the Abstraction We Want

If the friction inherent in skills is unavoidable, is there a viable path forward for making them effective?

The solution lies in shifting our perspective: crafting dedicated agents, rather than individual skills, as the primary unit of ownership for a platform team.

The agent model moves away from ad hoc installations toward a system that is continuously evaluated, monitored, and rigorously tested — triggered only under well-defined conditions and equipped with native sandboxing, scheduling, and event-driven architectures from the outset.

The agent-based approach represents a fundamental departure from the "everyone installs their own files" approach. It aligns more closely with the platform-team stewardship model I've advocated for previously — the core belief that shared infrastructure requires dedicated ownership, not merely a collection of contributors. For a deeper dive into this shift, explore my [analysis of the platform engineering foundation for autonomous agents](https://wtrocki.com/blog/platform-engineering-foundation-autonomous-agents/). This also maps to the [AI maturity model](https://wtrocki.com/blog/from-ai-assistant-to-engineering-infrastructure) I proposed — where agents at the final stage become infrastructure, not just assistants.

While not a silver bullet — since decisions about which agents are built and adopted still persist — moving these choices to a team with genuine accountability for evaluation is a major shift. It establishes a framework for meaningful governance, consistent utility, and sustainable long-term support for an organization's shared AI pipelines.

![](/images/curating-ai-skills-productivity/image1.png)

## Skills vs. Engineering Principles

Worth separating clearly: a skill that wraps an existing tool to save real steps is a different category from one that just encodes a preference or principle. [Plannotator](https://plannotator.ai/), for instance, gives agent plans and diffs an actual review surface instead of raw terminal text — a tool wrapped as a skill, with a concrete workflow attached. [Caveman](https://github.com/juliusbrussee/caveman) compresses agent output tokens with measurable before/after benchmarks — again, a tool doing a specific job. Compare that to a skill that just says "write clean code" or "review PRs carefully" — no tool, no measurable behavior change. The tool skill category earns its place in your daily workflows. The second is usually better left as a norm for highly curated personal or team standards.

## Skills as Personal Process Structure

The most durable use of skills isn't team standardization at all — it's using them to externalize your own process so it survives context switches, tool migrations, and the day you eventually switch agents entirely. A personal skill isn't a shortcut you install and forget; it's closer to a personal runbook — daily habit automation written in a format an agent can actually execute rather than just read.

The [keyclaude](https://github.com/wtrocki/keyclaude) project demonstrates how to craft a complete repository of highly curated AI skills, tools, and scripts. Keyclaude goes even further, simplifying skills UX — they can be triggered by a single keystroke, deliberately isolated from day-to-day team agents and workflows.

![](/images/curating-ai-skills-productivity/image5.png)

The distinction matters. A borrowed skill asks you to adopt a workflow whenever the AI decides it feels appropriate. A keystroke-triggered personal skill asks you to compress your own repeated actions — the git flow you always follow, the review checklist you always run, the summary format you always want — into something you don't have to re-type or re-explain to an agent every session. It's automation scoped to one person's actual habits, not a general best practice broadcast to whoever installs it.

That scoping is the whole point. A skill built this way doesn't need curating, because there's no gap between author and user — you wrote it because you do the thing, and you'll notice immediately if it stops matching how you actually work. It doesn't need governance either, because it never leaves your own environment unless you choose to publish it. The keyclaude approach treats skills less like a marketplace commodity and more like a personal toolbelt. The project and approach is worth its own dedicated post that will come in the future.

## Close

None of this means borrowed skills are always the wrong call, or that the engineers publishing them are doing anything wrong — most are solving real problems for their own teams in good faith. The recommendation, more than a rule, is this: treat a skill with roughly the same scrutiny you'd give a new dependency you can't fully read yet. Skim it, understand what it actually changes about your workflow, and decide deliberately rather than by default. Read it like a dependency, write your own when the borrowed one doesn't fit your context, and put your trust where it belongs — in an engineer's judgment, not automatically in whatever they happened to publish. Finally, remember — context is everything. Calling skills explicitly in prompts or even via keystrokes (like [keyclaude](https://github.com/wtrocki/keyclaude)) can give you more predictability and success going forward.

As always, I would love to hear your perspectives — feel free to tag me on [Twitter (@typeapi)](https://twitter.com/typeapi) with your thoughts or stories about how you curate your skills. Happy upskilling!
