# Mission: how this course teaches

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
- **Quizzes** at conceptual forks (public vs private, 0-indexed controllers,
  `1.0/GEARING`, tolerance vs exact target).
- **Fill-in-the-blank** for syntax that must be exact.
- **Sim checkpoints** telling learners what to look for in their projects.

### 7. Type the code, don't paste it
Instructional C++ is non-copyable by design. Typing code out helps learners 
remember. 

### 8. Let learners struggle productively (tasks)
Task lessons (feeder, climber) give a brief and hide the solution behind a reveal.
Getting stuck and working through it is where the learning happens — the solution
is there for after the attempt, not instead of it.

### 9. Cite and link out
Link to further resources when it is useful but either not necessary to continue 
the guide (eg, PhotonVision, PathPlanner) or not worth replicating an online
resource in the guide (factory list, FF/FB explainers, the IC GitHub repos).

