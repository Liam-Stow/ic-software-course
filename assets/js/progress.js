/* ============================================================
   ICRobotics course — progress tracking (localStorage, no server)
   Marks lessons complete and reflects that on the hub.
   ============================================================ */
(function () {
  "use strict";
  var KEY = "ic-frc-course:done";

  function getDone() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save(obj) {
    try { localStorage.setItem(KEY, JSON.stringify(obj)); } catch (e) {}
  }

  function initLessonPage() {
    var id = document.body.getAttribute("data-lesson");
    if (!id) return;
    var btn = document.querySelector(".btn-complete");
    if (!btn) return;
    var done = getDone();

    function render() {
      var isDone = !!done[id];
      btn.classList.toggle("done", isDone);
      btn.textContent = isDone ? "Lesson complete" : "Mark this lesson complete";
    }
    btn.addEventListener("click", function () {
      done = getDone();
      if (done[id]) delete done[id]; else done[id] = true;
      save(done);
      render();
    });
    render();
  }

  function initHub() {
    if (document.body.getAttribute("data-page") !== "hub") return;
    var done = getDone();
    var cards = Array.prototype.slice.call(document.querySelectorAll(".lesson-card[data-lesson]"));
    var total = cards.length, count = 0;

    cards.forEach(function (card) {
      var id = card.getAttribute("data-lesson");
      if (done[id]) { card.classList.add("done"); count++; }
    });

    var fill = document.querySelector(".course-progress .bar > i");
    var label = document.querySelector(".course-progress .label");
    var pct = total ? Math.round((count / total) * 100) : 0;
    if (fill) fill.style.width = pct + "%";
    if (label) label.textContent = count + " / " + total + " lessons complete (" + pct + "%)";

    var reset = document.querySelector(".btn-reset");
    if (reset) reset.addEventListener("click", function () {
      if (confirm("Reset your progress for the whole course?")) {
        save({});
        location.reload();
      }
    });
  }

  function init() { initLessonPage(); initHub(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
