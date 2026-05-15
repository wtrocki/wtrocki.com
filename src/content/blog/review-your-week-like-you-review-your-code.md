---
title: "Review Your Week Like You Review Your Code"
date: 2026-03-22
description: "A weekly planning system for achieving important goals — and helping the people around you move faster."
tags: ["productivity", "engineering", "weekly-planning", "code-review", "ai"]
draft: false
---

A weekly planning system for achieving important goals — and helping the people around you move faster.

**Note:** I received a lot of feedback on this post. The ideas described here are now available in the public [KeyClaude repository](https://github.com/wtrocki/keyclaude). You can fork it, adapt the workflows to your own tools and habits, and use it as a starting point for building your personal execution layer.

The hardest part of a productive week is rarely knowing what to do. The harder problem is keeping the new requests arriving, priorities change, and other people wait for decisions, reviews, or answers. A week can feel full and still produce very little progress on the outcomes that matter especially as your role in organization grows.

Solution: Plan week ahead with lightweight feedback loop:

- Decide what matters this week.
- Make the next actions visible.
- Focus your time to cover various aspects of the job
- Review what changed.
- Adjust the plan before the next week begins.

This is the same basic discipline engineers apply to software. A system needs an intended state, observable signals, a review loop, and a way to respond when reality differs from the plan.

A weekly plan is not a promise that the week will go exactly as expected. It is a control surface for making better decisions when it does not.

This builds on the argument from [the first post, "The Engineer's Personal Assistant"](https://wtrocki.com/blog/engineers-personal-assistant/). That post described an AI assistant as an execution bridge: a low-friction layer that assembles context, turns rough inputs into useful artifacts, and reduces the cost of glue work without taking judgment away from the engineer.

![Weekly planning flow](/images/review-your-week-like-you-review-your-code/image2.png)

## The week is the right planning unit

Daily planning is useful, but it is too close to the noise. It answers questions such as:

- What can be finished today?
- Which meeting is next?
- What is currently blocked?

Long-range planning is useful too, but it is too far from reality. A quarterly goal does not tell you which design decision, review, or conversation deserves attention this afternoon.

The week sits between those two horizons. It is long enough to make meaningful progress and short enough to incorporate feedback.

A useful structure is:

- **Daily:** choose the next action.
- **Weekly:** choose the outcomes, manage trade-offs, and create momentum.
- **Monthly or quarterly:** adjust direction when the environment changes.

The weekly horizon is especially important for senior engineers because the work is rarely a clean sequence of tickets. Progress often depends on resolving ambiguity, reviewing another team's design, helping someone through a difficult change, or making a decision that prevents future rework.

## Planning with outcomes

A task list answers: "What can I do?"

A useful weekly plan answers: "What should be different by the end of the week?"

That difference changes how the week is run.

Instead of writing:

- Review pull requests.
- Talk to the platform team.

Write outcomes such as:

- Resolve the main design uncertainty in the ingestion redesign and publish a decision.
- Keep the review queue moving so other engineers are not blocked for more than one working day.
- Align with the platform team on ownership boundaries and record the agreed interface.

The second version creates room for judgment. It does not prescribe every action, but it makes progress observable.

## Treat the weekly plan as a living object

A weekly plan should be easy to update while work is happening.  Each outcome can have enough context to support decisions:

- Why does this matter now?
- What is the next visible step?
- Who is waiting on it?
- What could make it no longer worth doing?
- What evidence will show that it is complete?

The answers do not need to be elaborate. A few precise lines are usually enough.

The important property is that the plan stays close to the work. When a new request arrives, the engineer can compare it against the current outcomes instead of deciding from scratch.

That creates a simple prioritization rule:

A new task should either advance a current outcome, protect an important dependency, or go into the later queue.

This rule is useful because it preserves flexibility without turning the week into an unstructured stream of interruptions.

## Use categories to keep the week balanced

Outcomes help decide what must happen. Categories help ensure that the week does not optimize one dimension of engineering while starving the others.

A productive engineer does more than implement features. The work also includes creating options, making sound technical decisions, reducing review queues, preserving context, and helping other people become more effective. Those activities compete for the same limited attention, so they should be visible in the weekly plan.

I typically split my week into following categories.

- **Innovation and idea implementation:** Turn promising ideas into experiments, prototypes, technical spikes, or small shipped improvements. The goal is not to collect ideas; it is to create a path from idea to evidence.
- **Architecture work:** Clarify system boundaries, evaluate trade-offs, reduce technical risk, and make decisions that keep future work simpler.
- **PR and document reviews:** Help other people move while protecting correctness, maintainability, and shared standards. This category includes pull requests, design documents, proposals, and operational changes.
- **Important meetings:** Prepare for and follow up on meetings where a decision, alignment point, or unresolved dependency can materially change the work.
- **Documentation:** Turn decisions and discoveries into context that other people can find and reuse. Good documentation reduces repeated explanations and makes the team less dependent on individual memory.
- **Mentoring:** Provide feedback, pairing, coaching, and opportunities that help someone else make progress independently.

At the end of the week, I typically ask which categories received meaningful attention and which were unintentionally starved. That signal should influence the next plan. Otherwise, urgent implementation work will gradually consume architecture, documentation, mentoring, and the reviews that enable everyone else.

This is where Charles Duhigg's *The Power of Habit* is a useful companion. A weekly review becomes sustainable when it has a reliable cue, a small repeatable routine, and a visible reward: Monday starts the plan, Friday closes the loop, and the next week begins with less uncertainty. The goal is not perfect discipline; it is making the useful behavior easy to repeat.

## Review your own work at the end of the week

The Friday review is not a report about how busy the week was. It is a short comparison between the intended week and the actual week. This review should produce a better starting point for Monday. It should not produce guilt about every unfinished task.

Unfinished work is not automatically a failure. A priority may have changed for good reasons. A dependency may have taken longer than expected. A review may have revealed that the original approach was wrong. The valuable signal is not "everything was completed." It is whether the engineer noticed the difference between the plan and reality, understood why it happened, and adjusted accordingly.

That is the same discipline used in a good engineering retrospective: observe, understand, and change the system.

## The other half of productivity: helping others move

Individual productivity is only part of an engineer's impact. A team can lose more time waiting for a review than an author spent writing the change.

That makes reviews — pull requests, design documents, technical proposals, and operational changes — part of weekly planning rather than background administration.

Being explicit about review availability helps other people plan their weeks too. As the volume and impact of PRs and documents grow, no engineer can inspect everything immediately. Constantly monitoring Slack, review queues, or direct messages destroys focus while still producing unpredictable feedback.

My response is to pre-triage every review before scheduling deeper attention. I ask authors to provide the context needed upfront: the problem, intended outcome, scope, important constraints, relevant links, known risks, and the kind of feedback they need. That lets me decide whether the item needs a quick correctness pass, a deeper design review, a short conversation, or a place in the later queue.

I reserve two review windows each day and a deeper design-review block twice a week, while protecting dedicated focus time. Agents can help schedule these sessions automatically, making document alignment faster and more predictable. When the request is clear, authors can proactively fast-track the right review instead of waiting in an invisible queue.

## As review queues grow, weekly structure matters

The fastest useful review is one where the reviewer can quickly understand the author's intent, inspect the important evidence, and communicate a clear decision. Speed comes from reducing ambiguity. As my own document and change-review queues grow, I have to be more deliberate about what receives deep attention and when.

![Review pre-triage model](/images/review-your-week-like-you-review-your-code/image1.png)

### My pre-triage contract with authors

1. **Explain the intent.** What problem does this change solve? What outcome and customer, user, or internal consumer are involved?
2. **Show the main path.** How does the implementation or proposal achieve the intended outcome?
3. **Call out constraints and risks.** Which assumptions, compatibility concerns, rollout details, or operational risks should shape the review?
4. **Ask for the right kind of feedback.** Is the request about correctness, architecture, wording, operational readiness, or a final sanity check?

This pre-triage is not bureaucracy. It makes the review queue legible and ensures that review depth matches the decision being made.

### My review focus

1. **Correctness and risk.** Look for failure modes, compatibility, operability, maintainability, and gaps in the main path.
2. **Blockers versus preferences.** A correctness issue should not be buried among optional style suggestions.
3. **A useful next step.** The author should know what to change, what is acceptable, and whether a follow-up conversation is needed.
4. **Reusable improvements.** When a review reveals a recurring gap in CI/CD, automation, or team standards, capture it as a candidate for a future system improvement rather than repeating the same comment forever.

![Review structure](/images/review-your-week-like-you-review-your-code/image3.png)

This structure improves correctness because it forces the reviewer to evaluate the change against its purpose rather than against personal taste.

It also improves empathy.

The author is usually not asking for approval in the abstract. They are trying to move a piece of work through a system of constraints: a deadline, an incident, an unfamiliar codebase, an existing interface, or feedback from several teams.

A good reviewer tries to understand that context before rewriting the change in their own preferred style. The question is not only "Would I implement it this way?" It is also "Does this satisfy the goal, and what is the smallest feedback that will make it safer or clearer?"

That is how reviews become an enabling mechanism instead of a quality gate that people learn to avoid.

## Use reviewable objects, not chat fragments

Review quality depends heavily on the object being reviewed.

Reviewing a pull request or document is not simply reading the sequence of files and sections the author or GitHub UI presents. If the reviewer accepts that structure as the only path through the material, important context can be buried at the bottom — after pages of implementation detail, background, or discussion. The reviewer becomes a passive consumer of the author's format, and correctness issues can hide in presentation noise.

A better review workflow lets the reviewer reshape the information before evaluating it: bring the intent, expected outcome, constraints, risks, and open decisions to the front by grouping related changes and separating blockers from questions or preferences. Formatting and content is not cosmetic.
It changes how quickly the reviewer can find the important information and how accurately they can judge the work.

This is where a tool such as Plannotator becomes useful. It supports an active review process in which the reviewer can annotate the relevant object, reorganize attention around the important questions, and leave feedback that the author can process directly.

In a weekly workflow, Plannotator can provide that review surface. [KeyClaude](https://github.com/wtrocki/keyclaude) integrates with Plannotator to open and annotate data files such as weekly notes and backlogs. The repository documents commands for reviewing the current weekly note, the backlog, and a work log, as well as a specific week's note. The [KeyClaude documentation](https://github.com/wtrocki/keyclaude) describes the integration as browser-based annotation of data files.

The important idea is broader than the tool: turn planning and review into explicit objects.

A reviewer can then:

- Mark a specific decision that needs clarification.
- Annotate a risk beside the relevant line.
- Distinguish a required change from an optional suggestion.
- Leave a review trail that the author can process in one pass.
- Return to the same object later without reconstructing the context from chat.

The same pattern works for a weekly plan. Instead of discussing priorities across several messages, the engineer can review one document containing the outcomes, current state, open decisions, and later queue.

The artifact becomes a shared coordination surface.

## KeyClaude as a small weekly planning layer

The ideas in this post are implemented in [KeyClaude](https://github.com/wtrocki/keyclaude), rather than being only a theoretical workflow. Its current core provides the building blocks described here: create a weekly note, maintain a later queue, and open those planning objects for review and annotation. The implementation is intentionally narrow, but it is enough to turn weekly planning, protected focus, and reviewable work into a repeatable engineering practice.

The [KeyClaude repository](https://github.com/wtrocki/keyclaude) describes the tool as a keyboard-first productivity layer for engineers. Its weekly workflow includes:

- A Monday action that creates a weekly note.
- A Friday action that reviews the note.
- A later action for capturing work that should not interrupt the current plan.
- Commands that open the weekly note or backlog in Plannotator for annotation.

That is enough to demonstrate the architecture:

- **The weekly note** stores the current focus.
- **The later queue** protects the focus from new ideas.
- **The review tool** turns the note into an object that can be inspected and annotated.
- **The keyboard trigger** reduces the friction of keeping the system current.

The assistant does not need to decide what matters. The engineer decides the goals. The assistant makes those goals easier to create, revisit, and adjust.

## A practical weekly operating rhythm

A lightweight rhythm is enough. On Monday, spend 15–20 minutes choosing one to three outcomes, identifying who needs something from you, checking which categories deserve attention, and moving non-urgent ideas into the later queue. Capture the result in one weekly note.

During the week, keep that note alive. Choose the next action for each outcome, protect review windows, and update the plan when new information changes the priorities. The note is not a diary; it is a small control surface for making better decisions.

Use review windows to enable others without turning every request into an interruption. Pre-triage the work, focus on intent, correctness, and risk, and distinguish a fast acknowledgement from a complete review. Authors should know when feedback is coming and what information will help the review start well.

On Friday, compare the plan with reality. Notice what moved, what changed, which categories were neglected, and which review or decision helped someone else progress. Carry forward only what still matters, move the rest to the later queue, and adjust the next week's plan. The review succeeds when Monday becomes easier — not when the note looks impressive.

## Productivity is a team property

Weekly planning is not only about protecting personal focus. It also determines how much time other people spend waiting, clarifying, or reworking changes.

A reserved review window, a later queue, and a clear weekly note reduce that friction. Authors know when feedback is likely, reviewers start with the context they need, and important decisions remain visible instead of disappearing into chat.

That is why reviewing other people's work belongs in the same planning system as reviewing your own. The questions are the same: what outcome are we trying to achieve, what is the current state, what is risky or unclear, and what should happen next? The difference is simply whose work is being moved forward.

## Summary

A good weekly plan is a small engineering system.

It has inputs: goals, requests, dependencies, and new information. It has a working state: the current week's outcomes and next actions. It has a feedback loop: daily adjustments and a Friday review. It has a queue for work that matters but does not belong in the current plan.

The system becomes more powerful when it includes other people's work. Review windows, design feedback, pairing, and clear decisions are not interruptions to productivity. They are part of how an engineer increases the amount of useful work a team can complete.

[KeyClaude](https://github.com/wtrocki/keyclaude) is one practical implementation of weekly planning, bridging keyboard-first weekly notes, a later queue, and reviewable planning objects opened through Plannotator UI. The tool is not the point. The point is reducing the friction between intention, action, and feedback.

Then extend the same discipline to the work of others. The best weekly planning system does not merely help one engineer stay organized. It helps a whole group make decisions faster, review changes with more care, and keep important work moving.
