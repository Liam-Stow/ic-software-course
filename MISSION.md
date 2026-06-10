# Mission: how this course teaches

This course exists to test one hypothesis: **interactive lessons teach FRC
programming better than a static PDF.** ICRobotics already had a solid 61-page
guide — but a document can't give feedback, can't check understanding, and can't
show progress. This is the same content, rebuilt around proven teaching
principles.

Every lesson — existing and new — should hold to the principles below. If you're
adding or editing a lesson, this is the bar.

## Principles

### 1. Teach one thing
Each lesson teaches a **single concept** and names it up front ("By the end…").
If a lesson needs two ideas, it's two lessons. The shooter took six lessons for a
reason.

### 2. Give a tangible win
Every lesson ends somewhere concrete: the shooter spins in sim, the turret holds
an angle, the AtTarget boolean flips true. Learners should *feel* progress, not
just read about it.

### 3. Keep it short
A lesson is ~10–25 minutes. Short lessons are finishable, and finishing builds
momentum. Long explanations get split.

### 4. Make it beautifully readable
Generous typography, clear headings, short paragraphs, concrete analogies (the
"pen" for objects, rack-and-pinion for the climber). Code is clean and
syntax-highlighted. Readability is a feature, not decoration.

### 5. Ramp difficulty sensibly
Module 0 assumes nothing. Each lesson builds only on what came before. New syntax
is explained the first time it appears (the `&` operator, lambda capture lists,
`bool` return types) and reused freely afterward.

### 6. Tight feedback loops
This is the core advantage over the PDF. Every place the old guide relied on the
reader to silently "get it," add a check:
- **Quizzes** at conceptual forks (public vs private, 0-indexed controllers,
  `1.0/GEARING`, tolerance vs exact target).
- **Fill-in-the-blank** for syntax that must be exact.
- **Sim checkpoints** telling learners precisely what to look for, since C++
  can't compile in the browser.

### 7. Type the code, don't paste it
Instructional C++ is non-copyable by design. Typing code out is how syntax sticks,
and it mirrors the original guide's code screenshots. Only shell commands and URLs
are copyable — typing those is error-prone busywork, not skill practice.

### 8. Let learners struggle productively (tasks)
Task lessons (feeder, climber) give a brief and hide the solution behind a reveal.
Getting stuck and working through it is where the learning happens — the solution
is there for after the attempt, not instead of it.

### 9. Cite and link out
Carry over every external resource from the guide (WPILib docs, the command
factory list, FF/FB explainers, PhotonVision, PathPlanner, the IC GitHub repos).
The course is a launchpad, not a walled garden.

### 10. Fidelity to the source
All code is transcribed faithfully from `IC Programming Guide 2025-26.pdf`. The
guide is the source of truth. When in doubt, match the PDF — the only true
correctness check is building the code in the WPILib simulator.

## What we deliberately left out

This is a **single shared course** for all learners, so there are no per-learner
records, no accounts, and no server. Progress is local to the browser. The focus
is the lessons themselves.
