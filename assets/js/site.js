/* ============================================================
   ICRobotics course — shared site chrome
   Defines <site-header>, the top bar used on every page.
   Change the title, logo or links HERE and every page follows.
   No build step. Loaded via a plain <script defer> tag.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- edit these ---------- */
  var TITLE = "ICRobotics Programming Guide";
  var LOGO = "assets/img/ic-logo-white.png";
  var HOME = "index.html";

  /* ---------- path back to the site root ----------
     Derived from this script's own URL (assets/js/site.js), so it works
     at any folder depth and when the pages are opened straight off disk. */
  var ROOT = document.currentScript.src.replace(/assets\/js\/site\.js.*$/, "");

  function url(path) { return ROOT + path; }

  // Shown in place of the logo on lesson pages, so the title reads as "back".
  var BACK_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M15 5 8 12l7 7"/></svg>';

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      // The title always links home. On a lesson page the logo becomes a back
      // arrow so that's obvious; the hub shows the logo.
      var isLesson = document.body.hasAttribute("data-lesson");
      var mark = isLesson
        ? BACK_ICON
        : '<img src="' + url(LOGO) + '" alt="">';

      this.innerHTML =
        '<a class="logo' + (isLesson ? " back" : "") + '" href="' + url(HOME) + '">' +
          '<span class="mark">' + mark + '</span>' +
          TITLE +
        '</a>';
    }
  }

  customElements.define("site-header", SiteHeader);
})();
