---
title: "Platform Engineering: Is Rollout the New Deployment?"
date: 2025-05-03
description: "Why safe rollouts need shadow mode, kill switches, circuit breakers, and runbooks you actually test. A practical framework for treating rollout as a platform primitive."
tags: ["rollout", "deployment", "sre", "operational-excellence", "platform-engineering"]
draft: false
---

We've all seen the classic "Friday deploy" horror story shared on Reddit: an engineer greenlights a seemingly minor tweak, like a simple calculation or business logic adjustment. The deployment completes smoothly — no immediate crashes, no alerts. Hours later, after thousands of requests have been quietly processed, a critical data corruption is discovered. Despite perfect code and passing tests, the engineer is left frantically piecing together revert scenarios or searching for solutions on Reddit.

This recurring theme showcases varying levels of maturity across organizations when it comes to modern software deployment (in books called change management or rollouts). To ensure safe rollouts, teams need a comprehensive strategy that includes deploying behind feature flags, incrementally ramping up traffic, maintaining active runbooks, conducting post-flip observability, and utilizing sandboxes (called shadow deployments).

If you are already a [release engineer](https://sre.google/sre-book/release-engineering/) working on rollout pipelines and are familiar with these concepts, congratulations! If not, stay tuned and join us on this journey to explore those concepts at a high level and help you make successful rollouts.

## The gap AI widened without anyone noticing

Before diving into the mechanics, we need to address the massive shift in how much weight the rollout process now carries.

LLMs have fundamentally broken the speed limit of software construction. What once required a week of refactoring can often be reflected as a single afternoon of aggressive prompting. Here is the catch: the cost of proving that this code is actually safe in production hasn't changed much. In fact, the stakes are higher. AI assistants excel at hallucinating "correct-looking" logic that breezily passes every unit test they generate, only to disintegrate when it hits the messy, non-deterministic chaos of real requirements. The failure isn't usually the syntax. It often comes as the hidden complexity and data patterns that no generic agent or even most conservative AI planning could ever fully anticipate.

Teams ship an order of magnitude more code while leaning on the same creaky trust-building infrastructure they used years ago. In this high-volume world, rollout can't be an afterthought — it has to be a standardized platform primitive designed to extract every possible insight from live systems before you commit.

Shipping more code without a mature rollout discipline isn't a velocity gain. It's just a faster, more expensive way to find your system's breaking point while learning a painful lesson in AI productivity.

![](/images/rollout-is-the-new-deployment/image1.png)

## Deployment and rollout — a pageable difference

I see deployment as a mechanical operation — produce the artifact, approve the build pipeline, and you can be done. Rollout is the actual engineering problem: the deliberate, observed handoff of trust from the old path to the new one. Most teams that get burned aren't sloppy about deployment. They're sloppy about pretending rollout is just deployment's last step, instead of the first one.

In many organizations, we see the same bottleneck: when a single deployment instantly hits every user, teams instinctively pull back on velocity. They retreat into heavy manual approval cycles and bureaucratic change management, yet still lack the production-grade evidence needed to actually sleep through the night. It's a defensive posture that feels like safety but is actually just an absence of data.

The fix? Shift toward constant, invisible deployments. Treat every update as a system-level experiment where legacy and modern paths run in parallel, allowing you to validate logic against live traffic before you ever commit to a cutover.

## Shadow mode: get the receipts before you take the risk

The awkward chicken-and-egg of commoditized rollouts is the introduction of change to production. You need production evidence to trust it, but you need to expose it to get that evidence, test your operational aspects, and validate relevant metrics.

In those cases shadow mode can come into play. You run new logic silently against real production traffic, compare its output against the trusted path, and never let the user see it. Writes get dropped or redirected to a sandbox. The user only ever talks to the legacy code.

Shadow mode is not a way to bring untested code to production. It is a tool to commoditize rollout confidence. Confidence that you can catch system behavior before it's a support ticket.

It's genuinely annoying to build well. You need async pipelines that don't add latency to the real request, comparison logic smart enough to ignore non-deterministic noise (timestamps, UUIDs) without missing actual logic drift, and a plan for downstream rate limits — because doubling load on a third-party API just to validate your own change is how you cause an outage in someone else's system while trying to prevent one in yours.

That is why shadow rollout can be built as a development platform and supported by platform teams. Once it's built, "is this safe to launch" stops being a debate and becomes an automated quality and evaluation system where AI can act as the world's most passionate availability, durability, and performance engineer, assisting users with evaluating system boundaries and failure modes.

Launch reviews that used to be forty-five minutes of people restating their unconfirmed confidence in the code shrink to five: match rate, exception count, ship or hold on anomalies present.

![](/images/rollout-is-the-new-deployment/image2.png)

Think of shadow mode as a high-fidelity evolution of the [Canary Releases](https://sre.google/workbook/canarying-releases/) described in Google's SRE workbook — a mechanism that commoditizes confidence by eliminating user impact entirely. The trade-off, of course, is the engineering tax: you need robust, shared infrastructure capable of supporting these parallel paths across every production environment.

## The rollout — flag vs step-by-step procedure

Your rollout can be documented as a set of steps. Each step has clear entry points and validation criteria. The key is to enable flexibility while catching all traffic patterns (including that nightly batch job that touches the new system). Example rollout strategy:

- **Internal-first**: your team, company group, or engineers that depend on the system in future, then the org, then all employees.
- **1%**: not a scale test. This step exists purely to catch the crash that only shows up outside a sandbox.
- **5–10%**: rare edge cases surface, downstream systems start feeling real pressure.
- **25–50%**: now you're looking into Grafana, checking scale, utilizing infrastructure, not logic — this is where connection pools and socket timeouts often surface in the most unexpected way.
- **100%**: cutover.

With shadow mode this comes for free. The alert you get is a Jira ticket and not sleepless nights restoring the system to the old path.

The key impact is avoiding blast radius math. A memory leak that only shows up under sustained load or certain timings will degrade whatever fraction of the fleet is handling your current step.

![](/images/rollout-is-the-new-deployment/image3.png)

## Kill switches vs circuit breakers: the thing that lets you sleep

Transitioning from a silent shadow mode to a primary traffic path is a critical evolution that teams should automate as a platform primitive. While many still rely on manual feature flags, maturing organizations are shifting toward more robust, declarative mechanisms using a kill switch or even the dynamic Circuit Breaker pattern — a tool that actively evaluates service health to control system enablement.

The distinction lies in human engagement: kill switches require human intervention, while circuit breakers are inherently automated.

Often used in microservices to protect SLOs during downstream failures (as covered in the [SRE book's handling overload chapter](https://sre.google/sre-book/handling-overload/)), the circuit breaker acts as a testing layer triggering an instant fallback to legacy behavior. Like their electrical counterparts, they are tools for handling overload, but also provide a proven pattern for automated system switchovers. This automation alerts the team without demanding an immediate manual response, effectively buying time for daylight investigation. Relying solely on manual kill switches creates a dangerous dependency on 24/7 engineering availability and high-pressure reaction times.

The foundational ground rule for safe operations is that reverting a system should never necessitate a redeploy. A kill switch must be instantaneous, applied at runtime via configuration services, because while CI pipelines take minutes to run, a regressive change can impact systems in milliseconds.

Crucially, every safety mechanism must fail toward safety — routing back to the trusted legacy path with zero cognitive overhead and zero hesitation for the operator. It is also important to design these tools for the person who has never touched the codebase and has only ninety seconds to act.

The discipline that separates elite engineering teams lies strongly in how they document and act around kill switches. Any concern or divergence focuses on a clear and tested process of stopping exposure first. Then teams follow the unscripted and usually more involved diagnose phases. Root-causing a complex logic drift is a task that can wait for the morning.

## Observability has to make the call, not just report on it

Generic CPU-and-latency dashboards don't tell you whether it's safe to go from 10% to 25%. You need side-by-side legacy vs new-path views on the metrics that actually gate the decision: shadow mismatch trend, p95/p99 delta, error rate by routing path, downstream connection pool pressure. Set thresholds before the ramp starts. In practice we see that deciding acceptable deviation mid-incident causes teams to delay decisions on kill switches.

Some teams now even use LLMs as a first-pass triage layer, leveraging AI to deduplicate shadow comparison data into actionable insights.

![](/images/rollout-is-the-new-deployment/image4.png)

## Runbooks

A runbook that reads like an architecture doc is worse than no runbook, because it burns the exact cognitive bandwidth the responder doesn't have. Write it assuming zero context and the original author asleep:

- Verify the alert; check upstream dependency health first.
- Open the metrics dashboard, ideally at the point of interest.
- Important: annotate the incident and leave a report with timeframes and raw observations.
- If the anomaly traces to the new path — kill switch first, investigate later.

The part most teams skip: actually testing the runbook and your team's operational scenarios on imaginary failures. Instead of reading it or discussing it, run it — create a Slack channel or imaginary team meeting. That helps the team stay cold the same way astronauts do not panic when something bad happens in space.

Specifically useful here are tests with someone who didn't write the feature, during a scheduled game day. I personally enjoy having those and always look forward to promoting them as a healthy way to test and ramp up operational excellence in the team.

Runbooks that look airtight on paper routinely fall apart because a dashboard link quietly moved, or "narrow the time window" meant something different to the writer than to the person executing it under pressure. A runbook that's never been executed by someone who didn't build the thing it covers gives false safety. Training with runbooks helps maintain a healthy and confident response team.

## Rollout as a platform primitive

As a final remark, I am convinced that organizations must transition toward treating rollout as a standardized platform primitive. When individual squads are left to manually architect their own shadow logic and safety mechanisms, the result is a fragmented landscape of inconsistent safety standards. You shouldn't have to wait for a production failure to distinguish the disciplined engineers from the "cowboys."

The idea is to give engineers a mechanism for wrapping their software in safety. Support all operational aspects of rollout via metrics, alerts, and automated (AI-driven) insights to raise rollout confidence systemically across organizations.

Rollout maturity for me lies in leveraging shared infrastructure — using declarative "mesh-layer routing" and native kill switches/circuit breaking to automate the heavy lifting that would be hard to support by product teams. As AI continues to commoditize the syntax of software construction, the core value of an engineer shifts from writing lines to mastering exposure management and systems judgment. These elements cannot be outsourced to an agent, and I bet they will remain fundamentally grounded in operational trust and the deliberate handoff of reliability.

## A five-point audit for your rollouts

- Are you able to execute the new logic in a silent shadow mode that bypasses all user impact and state changes?
- Is it possible to isolate exposure to a restricted internal cohort prior to any public traffic hitting the path?
- Can you instantly engage a kill switch to zero-out exposure without triggering a full redeployment pipeline?
- Is each incremental traffic ramp-up governed by real-time observability data rather than arbitrary calendar deadlines?
- Would a responder with no prior knowledge of this codebase have the runbook clarity to act within seconds during an anomaly?

If capturing these signals seems like a distant goal, it is a clear indicator that your team lacks the necessary framework to commoditize rollout safety. For a deeper dive into modern infrastructure, I highly recommend checking out my earlier exploration regarding [Platform Engineering Role in the age of AI](https://wtrocki.com/blog/platform-engineering-foundation-autonomous-agents/).

As always, I would love to hear your perspectives — feel free to tag me on Twitter ([@typeapi](https://twitter.com/typeapi)) with your thoughts or stories about your platform outages! Thanks for joining me on this journey!