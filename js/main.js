(function () {
  "use strict";

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = lightbox.querySelector("img");
  var lightboxCaption = lightbox.querySelector("figcaption");
  var closeBtn = lightbox.querySelector(".lightbox-close");
  var lastTrigger = null;

  function openLightbox(trigger) {
    lastTrigger = trigger;
    lightboxImg.src = trigger.getAttribute("data-full");
    lightboxImg.alt = trigger.querySelector("img").alt;
    lightboxCaption.textContent = trigger.getAttribute("data-caption") || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
    if (lastTrigger) lastTrigger.focus();
  }

  document.querySelectorAll(".work-open").forEach(function (btn) {
    btn.addEventListener("click", function () { openLightbox(btn); });
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  // Reveal sections on scroll
  var revealTargets = document.querySelectorAll(".work, .about, .skills");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
