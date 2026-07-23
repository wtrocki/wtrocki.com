---
title: "Does Scaffolding Matter in the Era of AI?"
date: 2025-11-02
description: "A practical look at whether traditional scaffolding tools still matter when AI can generate code. Covers where scaffolding beats AI, where AI beats scaffolding, and the durable model that pairs both."
tags: ["ai", "scaffolding", "developer-tools", "code-generation"]
draft: false
---

It's 2016 — as an engineer you run one command, wait eight seconds, and a full project drops into your editor — API routes, tests, a Dockerfile, even a README that's suspiciously well-written. It's genuinely impressive the first time.

Scaffolding — a term used to universally name tools that help with generating code that follows certain structure — was never really about typing speed. It was about getting the same answer every time you put in a different input. I have personally seen a lot of value of scaffolding for all contract based development where generated OpenAPI or JSON Schemas can help to "scaffold" standardized clients.

As of 2026, AI generation is extraordinary at reasoning and can technically replicate use cases we follow for scaffolding. In the following blog post I'm looking through both use cases, formalizing where they work or complement each other. If you wonder whether you really need any open-source or self-developed CLI generators whose entire job is to be boring and predictable and replace it with AI, this blog post is for you.

## Scaffolding: Software Engineering Like a Factory?

![](/images/does-scaffolding-matter-in-the-era-of-ai/image2.gif)

Anyone who used [Yeoman](https://yeoman.io/) generators or [Maven archetypes](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html) remembers the promise of fast application scaffolders: you gave up some flexibility on day one in exchange for never having to think about project structure again on day 4,000. For example, the 20+ year old Maven archetype system was an attempt to scaffold Java applications on top of the JVM side — many engineers, including myself, have been tasked to compile and generate parameterized versions of project templates for entire organizations, incorporating all the "best patterns and practices at the time."

I also spent years building scaffolding engines for projects like [Apache Cordova](https://cordova.apache.org/), contributing to the [OpenAPI Generator](https://openapi-generator.tech/), and implementing scaffolding at scale at Red Hat, IBM, and MongoDB. Projects like [Graphback](https://github.com/aerogear/graphback), which scaffolded Node.js GraphQL backends, and [Raincatcher](https://github.com/feedhenry-raincatcher), which scaffolded workforce-management apps for field service teams, weren't clever — they were repeatable, predictable, and let engineers focus on reflecting their business requirements with ease.

The true productivity benefit of scaffolding was never about rapid code generation. Instead, its real value lies in establishing structural consistency across dozens of teams, allowing any engineer to step into an unfamiliar codebase and immediately know where core components, like authentication middleware, reside. At its core, scaffolding serves as a deployment mechanism for institutional consensus. By codifying past architectural decisions into a reusable template, it prevents teams from having to relitigate the same choices for every new project and eliminates countless hours spent reviewing repetitive patterns in pull requests.

## Planning Is Not the New Scaffolding

There's a tempting idea going around that AI "planning" replaces scaffolding — that if the model can reason through your requirements up front, you don't need a template anymore. This doesn't hold up. Planning is sophisticated precisely because it produces a different result every time you run it. That's its strength for novel problems and its fatal weakness as a substitute for scaffolding, whose entire value proposition is sameness. A planning step that gives you a new answer every run isn't a scaffolder with extra steps — it's the opposite of one.

Recently announced AI Skills sit in a similar spot. On the surface, a well-written skill looks like the new scaffold: verbal instructions instead of file templates, model instead of generator script. And it works — right up until the skill accumulates enough embedded code, rules, and branching logic that it's no longer "guidance" the model interprets, it's logic the model has to faithfully execute. At that point you've built a scaffolder, just an unreliable one, because you handed deterministic work to a probabilistic executor. The more conditional branches we add into a skill's prose, the more that skill behaves like brittle legacy code — except now it fails silently, in natural language, instead of loudly, in a stack trace.

## When to scaffold, when to use AI

![](/images/does-scaffolding-matter-in-the-era-of-ai/image1.png)

The productive move isn't picking a side between AI and Scaffolders. It is to use AI to build them and skills to document them:

- If the pattern has real branching complexity — multiple valid shapes, conditional structure, decisions that recur identically across projects — generate a scaffolder (possibly with AI's help) and let the skill supplement it, not replace it.
- If the requirement is a one-off, or its handling keeps drifting away from anything template-shaped, that's the signal it doesn't belong in a scaffold at all — let AI handle it directly.
- The moment a "skill" needs more than a light layer of rules to stay correct, treat that as a scaffolding requirement wearing a disguise.

| Use case | Recommendation | Why |
|---|---|---|
| API client or server generation | Always scaffold | Highly template-shaped, low variance, strong guardrail payoff at scale |
| Service layer logic | Scaffold the skeleton, leave the TODOs to AI/skills | Business logic is where variance is legitimate, not a bug |

API surface generation is where scaffolding earns its keep hardest: contracts, boilerplate, and guardrails compound in value the more times you generate them. Service layers are the opposite case — the logic inside them is exactly the part that should differ project to project, so forcing a template there just recreates the copy-paste-and-modify anti-pattern scaffolding was invented to kill.

## The Durable Model

Scaffolding and agentic code generation aren't rivals competing for the same job — they're complementary systems solving different failure modes, and they get stronger paired than either does alone. But that pairing only holds up if the surrounding system has real guardrails, which is a separate and harder problem than either tool alone — one I've written about in more depth in [Platform Engineering as the Foundation for Autonomous Agents](/blog/platform-engineering-foundation-autonomous-agents).

As always, I would love to hear your perspectives — feel free to tag me on [Twitter (@typeapi)](https://twitter.com/typeapi) with your thoughts or stories about your scaffolding setups! Happy scaffolding!