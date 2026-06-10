/* ============================================================
   ICRobotics course — lesson engine
   - lightweight C++ / bash syntax highlighter (no dependencies)
   - anti-copy "type it out" code blocks + copyable command blocks
   - multiple-choice quizzes, fill-in-the-blank, reveal solutions
   No build step. Loaded via a plain <script> tag.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- helpers ---------- */
  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function norm(s) {
    // collapse whitespace for forgiving answer matching
    return s.replace(/\s+/g, " ").trim();
  }

  /* ---------- syntax highlighter ---------- */
  var CPP_KW = new Set(["alignas","auto","break","case","catch","class","const","constexpr",
    "continue","default","delete","do","else","enum","explicit","extern","false","for","friend",
    "if","inline","namespace","new","noexcept","nullptr","operator","override","private",
    "protected","public","return","sizeof","static","struct","switch","template","this","throw",
    "true","try","typedef","typename","union","using","virtual","volatile","while","bool","int",
    "double","float","char","unsigned","signed","long","short"]);

  var TOKEN_RE = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(^[ \t]*#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b0x[0-9a-fA-F]+\b|\b\d[\d.']*(?:_[A-Za-z_]+)?\b)|([A-Za-z_]\w*)|(::|->|[-+*/%=<>!&|^~?:.,;(){}\[\]])/gm;

  function highlightCpp(src) {
    var out = "", last = 0, m;
    TOKEN_RE.lastIndex = 0;
    while ((m = TOKEN_RE.exec(src))) {
      if (m.index > last) out += esc(src.slice(last, m.index));
      last = TOKEN_RE.lastIndex;
      if (m[1]) { out += '<span class="tok-com">' + esc(m[1]) + "</span>"; }
      else if (m[2]) { out += '<span class="tok-pre">' + esc(m[2]) + "</span>"; }
      else if (m[3]) { out += '<span class="tok-str">' + esc(m[3]) + "</span>"; }
      else if (m[4]) { out += '<span class="tok-num">' + esc(m[4]) + "</span>"; }
      else if (m[5]) {
        var id = m[5];
        // is the next non-space char a '(' ? then it's a function/call
        var rest = src.slice(last);
        var isCall = /^\s*\(/.test(rest);
        if (CPP_KW.has(id)) out += '<span class="tok-kw">' + id + "</span>";
        else if (isCall) out += '<span class="tok-fn">' + id + "</span>";
        else if (/^[A-Z]/.test(id) || /^k[A-Z]/.test(id)) out += '<span class="tok-typ">' + id + "</span>";
        else out += id;
      }
      else if (m[6]) { out += '<span class="tok-op">' + esc(m[6]) + "</span>"; }
    }
    if (last < src.length) out += esc(src.slice(last));
    return out;
  }

  function highlightBash(src) {
    // comments + double-quoted strings; everything else plain
    return src.replace(/(#[^\n]*)|("[^"]*")/g, function (_, c, s) {
      if (c) return '<span class="tok-com">' + esc(c) + "</span>";
      return '<span class="tok-str">' + esc(s) + "</span>";
    });
  }

  /* ---------- build code blocks ---------- */
  function setupCodeBlocks() {
    document.querySelectorAll(".codeblock").forEach(function (block) {
      var codeEl = block.querySelector("code");
      if (!codeEl || codeEl.dataset.built) return;
      codeEl.dataset.built = "1";

      var lang = block.dataset.lang || "cpp";
      var raw = codeEl.textContent.replace(/^\n/, "").replace(/\s+$/, "");
      var html = lang === "bash" ? highlightBash(raw) : highlightCpp(raw);

      // wrap code in <pre>
      var pre = document.createElement("pre");
      var newCode = document.createElement("code");
      newCode.innerHTML = html;
      pre.appendChild(newCode);

      // header bar
      var head = document.createElement("div");
      head.className = "cb-head";
      var copyable = block.classList.contains("copyable");
      var label = block.dataset.file || (lang === "bash" ? "terminal" : "");
      head.innerHTML =
        '<span class="dot"></span>' +
        (label ? '<span class="fname">' + esc(label) + "</span>" : "") +
        '<span class="spacer"></span>' +
        (block.classList.contains("type") ? '<span class="badge type">type it</span>' : "");

      if (copyable) {
        var btn = document.createElement("button");
        btn.className = "copy-btn";
        btn.type = "button";
        btn.textContent = "Copy";
        btn.addEventListener("click", function () {
          navigator.clipboard && navigator.clipboard.writeText(raw);
          btn.textContent = "Copied!";
          setTimeout(function () { btn.textContent = "Copy"; }, 1400);
        });
        head.appendChild(btn);
      }

      codeEl.remove();
      block.appendChild(head);
      block.appendChild(pre);

      // anti-copy for "type" blocks
      if (block.classList.contains("type")) {
        ["copy", "cut", "contextmenu", "dragstart"].forEach(function (ev) {
          pre.addEventListener(ev, function (e) { e.preventDefault(); });
        });
      }
    });
  }

  /* ---------- multiple choice quizzes ---------- */
  function setupQuizzes() {
    document.querySelectorAll(".quiz").forEach(function (quiz) {
      if (quiz.dataset.built) return;
      quiz.dataset.built = "1";
      var explain = quiz.querySelector(".explain");
      var opts = quiz.querySelectorAll(".opt");
      opts.forEach(function (opt) {
        var marker = document.createElement("span");
        marker.className = "marker";
        opt.appendChild(marker);
        opt.addEventListener("click", function () {
          if (quiz.dataset.answered) return;
          quiz.dataset.answered = "1";
          var correct = opt.dataset.correct === "true";
          opts.forEach(function (o) {
            o.disabled = true;
            if (o.dataset.correct === "true") o.classList.add("correct");
          });
          if (!correct) opt.classList.add("wrong");
          if (explain) {
            explain.classList.add("show", correct ? "ok" : "no");
            var pre = explain.querySelector("[data-when]");
            // optional per-answer note already in markup; just reveal
          }
        });
      });
    });
  }

  /* ---------- fill in the blank ---------- */
  function setupFills() {
    document.querySelectorAll(".fill").forEach(function (fill) {
      if (fill.dataset.built) return;
      fill.dataset.built = "1";
      var input = fill.querySelector("input[type=text]");
      var checkBtn = fill.querySelector("button.check");
      var hintBtn = fill.querySelector("button.hintbtn");
      var feedback = fill.querySelector(".feedback");
      var answers = (fill.dataset.answer || "").split("|").map(norm);
      var hint = fill.dataset.hint || "";
      var hintsShown = 0;

      function check() {
        var val = norm(input.value);
        var ok = answers.some(function (a) { return a.toLowerCase() === val.toLowerCase(); });
        input.classList.remove("ok", "no");
        input.classList.add(ok ? "ok" : "no");
        feedback.classList.add("show");
        feedback.classList.remove("ok", "no");
        feedback.classList.add(ok ? "ok" : "no");
        feedback.textContent = ok ? "✓ Nice — that's it." :
          "Not quite. " + (hint ? "Hint: " + hint : "Check your spelling and punctuation.");
      }
      checkBtn && checkBtn.addEventListener("click", check);
      input && input.addEventListener("keydown", function (e) { if (e.key === "Enter") check(); });
      hintBtn && hintBtn.addEventListener("click", function () {
        feedback.classList.add("show"); feedback.classList.remove("ok"); feedback.classList.add("no");
        feedback.textContent = "Hint: " + (hint || "Look closely at the code above.");
      });
    });
  }

  /* ---------- init ---------- */
  function init() {
    setupCodeBlocks();
    setupQuizzes();
    setupFills();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
