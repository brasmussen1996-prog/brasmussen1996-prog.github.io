// HAVBRYG – Main JavaScript

//FADE IN AND OUT

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (!href.startsWith("#") && !href.startsWith("mailto")) {
      e.preventDefault();

      document.body.classList.remove("loaded");

      setTimeout(() => {
        window.location = href;
      }, 400);
    }
  });
});

// SCROLL

document.addEventListener("DOMContentLoaded", () => {
  const scrollArrow = document.querySelector(".scroll-arrow");
  const hero = document.querySelector("#hero");
  const sections = Array.from(document.querySelectorAll("main section"));

  if (!scrollArrow || !hero || sections.length === 0) return;

  function isAtBottom() {
    return (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 10
    );
  }

  function setArrowDirection() {
    if (isAtBottom()) {
      scrollArrow.classList.add("is-up");
    } else {
      scrollArrow.classList.remove("is-up");
    }
  }

  // Set CSS variable for header height so the fixed menu positions correctly
  function updateHeaderHeight() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const h = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty("--header-height", `${h}px`);
  }

  window.addEventListener("load", updateHeaderHeight);
  window.addEventListener("resize", updateHeaderHeight);

  // Close mobile menu if viewport grows to desktop size
  function closeMobileMenuOnDesktop() {
    const mq = window.matchMedia('(min-width: 1251px)');
    const toggle = document.getElementById('menu-toggle');
    if (mq.matches && toggle && toggle.checked) {
      toggle.checked = false;
    }
  }

  window.addEventListener('resize', closeMobileMenuOnDesktop);
  window.addEventListener('load', closeMobileMenuOnDesktop);

  function scrollToNextSection() {
    const currentScroll = window.scrollY;

    const nextSection = sections.find(
      (section) => section.offsetTop > currentScroll + 50,
    );

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  function scrollToHero() {
    hero.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  scrollArrow.addEventListener("click", (event) => {
    event.preventDefault();

    if (scrollArrow.classList.contains("is-up")) {
      scrollToHero();
    } else {
      scrollToNextSection();
    }
  });

  window.addEventListener("scroll", setArrowDirection);
  setArrowDirection();
});

// GLOWING IN TEXTS
const glowTexts = document.querySelectorAll(".mouse-glow-text");

glowTexts.forEach((text) => {
  text.addEventListener("mousemove", (e) => {
    const rect = text.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    text.style.setProperty("--x", `${x}px`);
    text.style.setProperty("--y", `${y}px`);
  });
});

// STORYTELLING VIDEO LOGIC

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".video-wrapper");
  if (!wrapper) return;

  const video = wrapper.querySelector(".storytelling-video");

  wrapper.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      wrapper.classList.add("is-playing");
    } else {
      video.pause();
      wrapper.classList.remove("is-playing");
    }
  });

  video.addEventListener("ended", () => {
    wrapper.classList.remove("is-playing");
    video.currentTime = 0;
  });

  // hvis brugeren pauser via tastatur/andet (sikkerhed)
  video.addEventListener("pause", () => {
    wrapper.classList.remove("is-playing");
  });

  video.addEventListener("play", () => {
    wrapper.classList.add("is-playing");
  });
});

// IMAGES MOVING BASED ON MOUSEMOVE

let basic = document.querySelectorAll(".basic");
let behind = document.querySelectorAll(".behind");
let between = document.querySelectorAll(".between");
let front = document.querySelectorAll(".front");
let extrafront = document.querySelectorAll(".extra-front");

document.querySelector("body").addEventListener("mousemove", (event) => {
  const x = event.pageX;
  const y = event.pageY;

  console.log(y);

  basic.forEach((el) => {
    el.style.transform = `translateX(${0.015 * x}px) translateY(${0.015 * y}px)`;
  });

  behind.forEach((el) => {
    el.style.transform = `translateX(${0.02 * x}px) translateY(${0.02 * y}px)`;
  });

  between.forEach((el) => {
    el.style.transform = `translateX(${0.025 * x}px) translateY(${0.025 * y}px)`;
  });

  front.forEach((el) => {
    el.style.transform = `translateX(${0.03 * x}px) translateY(${0.03 * y}px)`;
  });

  extrafront.forEach((el) => {
    el.style.transform = `translateX(${0.035 * x}px) translateY(${0.035 * y}px)`;
  });
});

//BUBBLES MOUSEMOVE
const container = document.querySelector(".bubble-container");
let lastBubble = 0;
let lastX = 0;
let lastY = 0;

if (container) {
  document.addEventListener("mousemove", (e) => {
    const now = Date.now();

    if (now - lastBubble < 20) return;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    lastX = e.clientX;
    lastY = e.clientY;

    if (distance < 18) return;

    lastBubble = now;

    const bubbleCount = distance > 40 ? 2 : 1;

    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");

      const size = Math.random() * 8 + 4;
      const driftX = (Math.random() - 0.5) * 30;
      const offsetX = (Math.random() - 0.5) * 15;
      const offsetY = (Math.random() - 0.5) * 20;

      bubble.style.width = size + "px";
      bubble.style.height = size + "px";

      bubble.style.left = e.clientX + offsetX - size / 2 + "px";
      bubble.style.top = e.clientY + offsetY - size / 2 + "px";

      bubble.style.animationDuration = Math.random() * 0.3 + 0.7 + "s";
      bubble.style.setProperty("--drift-x", `${driftX}px`);

      container.appendChild(bubble);

      setTimeout(() => {
        bubble.remove();
      }, 1000);
    }
  });
}
