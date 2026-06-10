# IC Interactive Programming Course

An interactive, browser-based version of the **IC Programming Guide 2025-26** —
the course ICRobotics (FRC Team 5584) uses to teach new members how to program a
robot in C++ with WPILib.

It covers the same material as the PDF guide, but as **27 short interactive
lessons** with comprehension quizzes, fill-in-the-blank exercises, hidden task
solutions, simulation checkpoints, and saved progress.

## What's inside

Eight modules, building a working command-based robot in simulation from scratch:

| Module | Topic |
| ------ | ----- |
| 0 | Getting set up (WPILib, your first project, vendor libraries) |
| 1 | Your first subsystem: the shooter |
| 2 | Writing cleaner code (constants, the feeder task, command groups) |
| 3 | Working as a team (Git, utilities, CTRE Phoenix) |
| 4 | Smart motor control (feedforward/feedback, velocity, sim, PIDF tuning) |
| 5 | Position control: the turret (parameterized commands, gear ratios, AtTarget) |
| 6 | Automating the robot (command lifecycle, ShootSequence, the climber task) |
| 7 | Going further (swerve, vision, autonomous — curated links) |

## Running it

It's a **static site with no build step**. Two ways to view it:

- **Locally:** open `index.html` in any modern browser (it works over `file://`).
- **Hosted:** enable GitHub Pages (see below) and share the link.

No installation, no dependencies, no internet required once you have the files —
everything (styles, the lesson engine, syntax highlighting) is self-contained.

## How the lessons work

- **Type the code, don't paste it.** Instructional C++ blocks are deliberately
  **not** copy-pasteable — typing it out is how you learn, and it mirrors how the
  original PDF used code screenshots. Plain shell commands and long URLs *are*
  copyable, since typing those is just error-prone busywork.
- **Quizzes & fill-ins** give instant feedback with explanations.
- **Task lessons** (feeder, climber) hide their solution behind a reveal — try it
  yourself first.
- **Progress** is saved in your browser (`localStorage`); the hub shows a progress
  bar and per-lesson checkmarks. There are no accounts and no server.

The real feedback loop for C++ is the **WPILib simulator** — the browser can't
compile C++, so lessons send you to sim and tell you exactly what to look for.

## Deploying to GitHub Pages

A workflow at `.github/workflows/pages.yml` publishes the site automatically.
Enable it under **Settings → Pages → Build and deployment → Source: GitHub
Actions**. The site is plain static files at the repo root, so it also works
opened locally or served from `/`.

## Project layout

```
index.html              Course hub (modules, lessons, progress bar)
assets/
  css/styles.css        Design system
  js/lesson.js          Lesson engine (highlighting, quizzes, fills, anti-copy)
  js/progress.js        localStorage progress tracking
lessons/
  01-*.html … 27-*.html One file per lesson
MISSION.md              The pedagogy this course is built on
CONTRIBUTING.md         How mentors add/edit lessons
IC Programming Guide 2025-26.pdf   Source of truth for all transcriptions
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add or edit a lesson while
keeping the course consistent, and [MISSION.md](MISSION.md) for the teaching
principles behind it.

---

ICRobotics Team 5584 · Interactive Programming Course
