/* ============================================================
   ICRobotics course — shared site chrome
   Defines <site-header>, the top bar used on every page, and the
   light/dark toggle that lives in it.
   Change the title, logo or links HERE and every page follows.
   No build step. Loaded via a plain <script defer> tag.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- edit these ---------- */
  var TITLE = "ICRobotics Programming Guide";
  var LOGO = "assets/img/ic-logo-white.png";
  var HOME = "index.html";

  /* ---------- theme ----------
     Three states: "light", "dark", or absent = follow the OS.
     The <head> snippet on each page applies the saved choice before
     first paint; this only has to handle clicks after that. */
  var THEME_KEY = "ic-frc-course:theme";

  function savedTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }
  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function currentTheme() {
    return savedTheme() || (systemPrefersDark() ? "dark" : "light");
  }
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

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

  var SUN_ICON =
    '<svg class="i-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/>' +
    '<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2' +
    'M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

  var MOON_ICON =
    '<svg class="i-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

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
        '</a>' +
        '<button class="theme-toggle" type="button" title="Switch between light and dark">' +
          SUN_ICON + MOON_ICON +
        '</button>';

      var btn = this.querySelector(".theme-toggle");
      function label() {
        var next = currentTheme() === "dark" ? "light" : "dark";
        btn.setAttribute("aria-label", "Switch to " + next + " theme");
      }
      btn.addEventListener("click", function () {
        setTheme(currentTheme() === "dark" ? "light" : "dark");
        label();
      });
      label();

      // If the reader hasn't chosen, keep following the OS as it changes.
      if (window.matchMedia) {
        window.matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", function () { if (!savedTheme()) label(); });
      }
    }
  }

  customElements.define("site-header", SiteHeader);
})();
