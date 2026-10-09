"use strict";

const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const themeButtons = document.querySelectorAll(".theme-toggle");

function setTheme(theme) {
  root.dataset.theme = theme;
  themeButtons.forEach((button) => {
    const label = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;
    button.setAttribute("aria-label", label);
    button.title = label;
    button.querySelector("i").className =
      `bi bi-${theme === "dark" ? "sun" : "moon"}`;
  });
  document.querySelector('meta[name="theme-color"]').content =
    theme === "dark" ? "#080a0e" : "#f6f7f9";
}

try {
  setTheme(
    localStorage.getItem("portfolio-space-theme") === "light"
      ? "light"
      : "dark",
  );
} catch {
  setTheme("dark");
}
themeButtons.forEach((button) =>
  button.addEventListener("click", () => {
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    setTheme(theme);
    try {
      localStorage.setItem("portfolio-space-theme", theme);
    } catch {}
  }),
);

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  reveals.forEach((element) => revealObserver.observe(element));
  root.classList.add("js-ready");
}

const navigationLinks = [...document.querySelectorAll("#navigation .nav-link")];
const sections = [...document.querySelectorAll("main .section-anchor")];
const backToTop = document.getElementById("back-to-top");
let scrollScheduled = false;
function updateScrollState() {
  const marker = window.scrollY + 160;
  let current = sections[0].id;
  sections.forEach((section) => {
    if (section.offsetTop <= marker) current = section.id;
  });
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 5
  )
    current = "contact";
  navigationLinks.forEach((link) => {
    const active = link.hash === `#${current}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  backToTop.hidden = window.scrollY < 600;
  scrollScheduled = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!scrollScheduled) {
      scrollScheduled = true;
      window.requestAnimationFrame(updateScrollState);
    }
  },
  { passive: true },
);
window.addEventListener("resize", updateScrollState);
updateScrollState();
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: reducedMotion.matches ? "instant" : "smooth",
  });
  document.querySelector(".navbar-brand").focus({ preventScroll: true });
});
navigationLinks.forEach((link) =>
  link.addEventListener("click", () => {
    const navigation = document.getElementById("navigation");
    if (window.bootstrap && navigation.classList.contains("show")) {
      window.bootstrap.Collapse.getOrCreateInstance(navigation).hide();
    }
  }),
);

const filters = document.querySelectorAll(".filter-button");
const projectColumns = document.querySelectorAll(".project-column");
filters.forEach((button) =>
  button.addEventListener("click", () => {
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    let visibleCount = 0;
    projectColumns.forEach((column) => {
      const visible =
        button.dataset.filter === "all" ||
        column.dataset.category === button.dataset.filter;
      column.hidden = !visible;
      if (visible) {
        visibleCount += 1;
        column.classList.add("is-visible");
      }
    });
    document.getElementById("filter-status").textContent =
      `Showing ${visibleCount} work ${visibleCount === 1 ? "highlight" : "highlights"}.`;
  }),
);

const projectDetails = {
  automation: {
    title: "Business apps & workflows",
    category: "PROCESS AUTOMATION",
    problem:
      "Business processes and task management require practical applications and connected workflows.",
    solution:
      "Canvas and model-driven Power Apps integrated with Power Automate workflows.",
    contribution:
      "Develop and design Power Apps solutions, build integrated workflows, gather requirements, and produce implementation and training documentation.",
    technologies: ["Power Apps", "Power Automate"],
  },
  reporting: {
    title: "Operational reporting",
    category: "DATA & INSIGHTS",
    problem:
      "Operational reporting and analysis depend on accessible data and appropriate database structures.",
    solution:
      "SQL Server application databases and data warehouse structures, paired with SSRS reports and Power BI dashboards.",
    contribution:
      "Build databases and warehouse structures using stored procedures and indexes; develop SSRS reports and Power BI reports and dashboards.",
    technologies: [
      "SQL Server",
      "Stored procedures",
      "Indexes",
      "SSRS",
      "Power BI",
    ],
  },
  development: {
    title: "Business web applications",
    category: "APPLICATION DEVELOPMENT",
    problem:
      "End-user requirements need to be translated into practical application and system solutions.",
    solution:
      "ASP.NET Core applications with Angular, supported by documentation and training.",
    contribution:
      "Develop applications, gather and analyze requirements, create functional designs and training documentation, and support end-user training.",
    technologies: ["ASP.NET Core", "Angular", "C#"],
  },
};

function showPlaceholder(message) {
  document.getElementById("placeholder-message").textContent = message;
  if (window.bootstrap)
    window.bootstrap.Toast.getOrCreateInstance(
      document.getElementById("placeholder-toast"),
      { delay: 5000 },
    ).show();
  else window.alert(message);
}
document.querySelectorAll("[data-missing]").forEach((button) =>
  button.addEventListener("click", () => {
    showPlaceholder(
      `${button.dataset.missing}: [Add details]. Not provided in the CV.`,
    );
  }),
);
document.querySelectorAll(".project-details").forEach((button) =>
  button.addEventListener("click", () => {
    const project = projectDetails[button.dataset.project];
    if (!window.bootstrap) {
      showPlaceholder(
        "Project details require the Bootstrap resource. Check your internet connection and reload.",
      );
      return;
    }
    document.getElementById("project-modal-title").textContent = project.title;
    document.getElementById("project-modal-category").textContent =
      project.category;
    const body = document.getElementById("project-modal-body");
    body.replaceChildren();
    const note = document.createElement("p");
    note.className = "detail-note";
    note.textContent =
      "This is an experience-based work highlight from the Omnia Holdings role, not a separately documented project. Specific project name, scope, dates, and outcomes: [Add details].";
    body.append(note);
    [
      ["Problem context", project.problem],
      ["Solution approach", project.solution],
      ["My contribution", project.contribution],
      ["Screenshot", "[Add details]"],
      ["Outcomes & achievements", "[Add details]"],
    ].forEach(([heading, description]) => {
      const title = document.createElement("h3");
      title.textContent = heading;
      const paragraph = document.createElement("p");
      paragraph.textContent = description;
      body.append(title, paragraph);
    });
    const tags = document.createElement("div");
    tags.className = "tags";
    project.technologies.forEach((technology) => {
      const tag = document.createElement("span");
      tag.textContent = technology;
      tags.append(tag);
    });
    const links = document.createElement("p");
    links.className = "detail-links";
    links.textContent = "GitHub: [Add details] | Live demo: [Add details]";
    body.append(tags, links);
    window.bootstrap.Modal.getOrCreateInstance(
      document.getElementById("project-modal"),
    ).show();
  }),
);

const form = document.getElementById("contact-form");
const formFields = [
  {
    input: document.getElementById("contact-name"),
    error: "name-error",
    message: "Please enter your name.",
  },
  {
    input: document.getElementById("contact-email"),
    error: "email-error",
    message: "Please enter a valid email address.",
  },
  {
    input: document.getElementById("contact-subject"),
    error: "subject-error",
    message: "Please enter a subject.",
  },
  {
    input: document.getElementById("contact-message"),
    error: "message-error",
    message: "Please enter a message of at least 10 characters.",
  },
];
function validateField(field) {
  const value = field.input.value.trim();
  const valid =
    value.length > 0 &&
    field.input.validity.valid &&
    (field.input.name !== "message" || value.length >= 10);
  field.input.setAttribute("aria-invalid", String(!valid));
  document.getElementById(field.error).textContent = valid ? "" : field.message;
  return valid;
}
formFields.forEach((field) =>
  field.input.addEventListener("input", () => {
    document.getElementById("form-status").textContent = "";
    if (field.input.hasAttribute("aria-invalid")) validateField(field);
  }),
);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const results = formFields.map(validateField);
  const firstInvalid = results.indexOf(false);
  if (firstInvalid !== -1) {
    formFields[firstInvalid].input.focus();
    document.getElementById("form-status").textContent =
      "Please check the highlighted fields.";
    return;
  }
  const values = Object.fromEntries(new FormData(form));
  const subject = encodeURIComponent(values.subject.trim());
  const body = encodeURIComponent(
    `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`,
  );
  document.getElementById("form-status").textContent =
    "Opening your email app. Review and send the message there. If it does not open, email nhlanhlamtambo2000@gmail.com directly.";
  window.location.href = `mailto:nhlanhlamtambo2000@gmail.com?subject=${subject}&body=${body}`;
});
document.getElementById("copyright-year").textContent = String(
  new Date().getFullYear(),
);
