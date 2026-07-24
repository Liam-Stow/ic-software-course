# Contributing lessons

This guide is for mentors adding or editing lessons. The goal is consistency: a
learner should never notice a "seam" between lessons. Read
[MISSION.md](MISSION.md) first — it's the teaching bar every lesson must meet.

## Ground rules

- **No build step, no dependencies, no CDNs.** Everything must work opened
  straight from `file://` and offline. Don't add npm, frameworks, or external
  scripts. The two brand fonts are already self-hosted in `assets/fonts/` —
  don't swap them for a Google Fonts `<link>`, and don't add more.
- **One concept per lesson.** If it needs two, make two lessons.

## Branding

Team 5584's look lives entirely in `assets/css/styles.css`. Use the CSS
variables — never hard-code a colour in a lesson file.

| Use | Token | Value |
| --- | --- | --- |
| Page background | `--bg` | `#191919` |
| Cards / panels | `--panel`, `--panel-2` | `#212121`, `#2b2b2b` |
| Body text | `--ink`, `--ink-soft` | `#f2f2f2`, `#b8b8b8` |
| Accent (primary) | `--brand` | `#f35924` orange |
| Accent (secondary) | `--ink-faint` | `#7f7f7f` grey |

Headings (`h1`–`h3`) are **Russo One**, body text is **Roboto**. Russo One ships
one weight only, so never set `font-weight` on a heading. Green, red and amber
survive in the palette for one job each — right, wrong and careful — in quizzes
and callout boxes. Don't reach for them as decoration.

## Anatomy of a lesson

Every lesson is a self-contained HTML file in `lessons/`, named
`NN-name.html`. The fastest way to make a new one is to **copy the nearest
existing lesson** and edit the body — the surrounding structure must stay
identical. Each file has:

1. `<head>` with a `<title>` like `NN · Lesson name — ICRobotics Course` and the
   stylesheet link `../assets/css/styles.css`.
2. `<body data-lesson="NN">` — the number drives progress tracking. **It must
   match the filename number and the hub card.**
3. `.topbar` header (copy verbatim).
4. `.lesson-head` with the lesson `<h1>`.
5. `.goal` banner: "By the end…" — the one tangible win.
6. The lesson body (prose, code blocks, boxes, quizzes).
7. `.complete-bar` with the **Mark complete** button (copy verbatim).
8. `.lesson-nav` with prev/next links.
9. The two script tags: `../assets/js/lesson.js` then `../assets/js/progress.js`.

## Building blocks

### Code blocks
```html
<div class="codeblock type" data-lang="cpp" data-file="src/main/cpp/Foo.cpp">
<code>
... your code, with &lt; &gt; &amp; escaped ...
</code>
</div>
```
- `class="codeblock type"` → **non-copyable** instructional code (the default for
  C++). Learners type it out.
- `class="codeblock copyable"` → adds a copy button. Use **only** for shell
  commands and long URLs.
- `data-lang` is `cpp` or `bash`. `data-file` shows a filename chip — use it for
  C++ so learners know which file they're editing.
- Escape `<`, `>`, `&` as `&lt;`, `&gt;`, `&amp;`. The highlighter handles the
  rest; don't add markup inside `<code>`.

### Callout boxes
`<div class="box VARIANT">` with a `.box-title`. Variants:
`concept` (explaining an idea), `project` (a do-this-in-your-project step),
`simcheck` (what to look for in the simulator), `pitfall` (a gotcha), `task` (a
challenge brief).

### Quiz
```html
<div class="quiz">
  <div class="q"><span class="qmark">?</span> Question?</div>
  <div class="options">
    <button class="opt" data-correct="true">Right answer</button>
    <button class="opt" data-correct="false">Wrong answer</button>
  </div>
  <div class="explain ok">Why the right answer is right.</div>
</div>
```

### Fill-in-the-blank
```html
<div class="fill" data-answer="bool|boolean" data-hint="A hint.">
  <div class="q"><span class="qmark">?</span> Prompt:</div>
  <div class="prompt-code">______ Foo::AtTarget() { ... }</div>
  <div class="row">
    <input type="text" placeholder="type your answer">
    <button class="check" type="button">Check</button>
    <button class="hintbtn" type="button">Hint</button>
  </div>
  <div class="feedback"></div>
</div>
```
`data-answer` accepts multiple correct answers separated by `|`; matching is
whitespace-forgiving.

### Reveal (task solutions)
```html
<details class="reveal">
  <summary>Show the solution <span class="hint">— try it yourself first!</span></summary>
  <div class="reveal-body"> ... code & prose ... </div>
</details>
```

## When you add a lesson

1. Create `lessons/NN-slug.html` from a copied template.
2. Add a matching card to `index.html` in the right module, with `data-lesson="NN"`
   and `href="lessons/NN-slug.html"`.
3. Fix the **prev/next** links in the neighbouring lessons so the chain stays
   unbroken.
4. Run the checks below.

## Verifying

- Open `index.html` over `file://` and click through prev/next end to end.
- Confirm code highlights, instructional blocks can't be selected/copied, and
  shell/URL blocks still copy.
- Answer each quiz and fill-in; confirm correct/incorrect feedback and hints work.
- Mark lessons complete, reload, and confirm the progress bar and checkmarks
  persist.
- If you have the node test harness, run it to confirm every lesson parses, wires
  up its interactive elements, and is listed on the hub.
- **The only true correctness check for the C++ is building it in the WPILib
  simulator.** For new code, do that once.
