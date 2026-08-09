const navbar = document.getElementById("navbar");

if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 16);
  });
}

function toggleMenu() {
  const menu = document.getElementById("mobile-nav");
  if (menu) {
    menu.classList.toggle("open");
  }
}

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

function submitForm(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const business = document.getElementById("business").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const subject = encodeURIComponent(
    "New Nexora AI inquiry from " + name
  );

  const body = encodeURIComponent(
    `Name: ${name}
Business: ${business || "Not provided"}
Email: ${email}

${message}`
  );

  window.location.href =
    `mailto:ianexora3@gmail.com?subject=${subject}&body=${body}`;
}


/* =========================
   NEXORA AI ASSISTANT
========================= */

const WORKER_URL =
  "https://nexora-ai.manjarresmartinezandresfelipe.workers.dev";

function setupNexoraChat() {

  const aiButton = document.getElementById("nexora-ai-button");
  const chat = document.getElementById("nexora-chat");
  const closeButton = document.getElementById("nexora-close");
  const form = document.getElementById("nexora-form");
  const input = document.getElementById("nexora-input");

  if (!aiButton || !chat) {
    console.log("Nexora AI elements not found");
    return;
  }

  aiButton.addEventListener("click", () => {
    chat.classList.add("open");

    if (input) {
      input.focus();
    }
  });

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      chat.classList.remove("open");
    });
  }

  if (form) {
    form.addEventListener("submit", sendNexoraMessage);
  }
}


async function sendNexoraMessage(event) {

  if (event) {
    event.preventDefault();
  }

  const input = document.getElementById("nexora-input");
  const messages = document.getElementById("nexora-messages");

  if (!input || !messages) return;

  const message = input.value.trim();

  if (!message) return;

  messages.innerHTML += `
    <div class="chat-bubble user">
      ${escapeHtml(message)}
    </div>
  `;

  input.value = "";

  messages.innerHTML += `
    <div id="nexora-thinking" class="chat-bubble bot">
      Thinking...
    </div>
  `;

  messages.scrollTop = messages.scrollHeight;

  try {

    const response = await fetch(WORKER_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    document
      .getElementById("nexora-thinking")
      ?.remove();

    messages.innerHTML += `
      <div class="chat-bubble bot">
        ${escapeHtml(
          data.response || "Sorry, I couldn't answer that."
        )}
      </div>
    `;

  } catch (error) {

    console.error("Nexora AI error:", error);

    document
      .getElementById("nexora-thinking")
      ?.remove();

    messages.innerHTML += `
      <div class="chat-bubble bot">
        Sorry, something went wrong.
        Please contact
        <strong>ianexora3@gmail.com</strong>.
      </div>
    `;
  }

  messages.scrollTop = messages.scrollHeight;
}


function escapeHtml(text) {

  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}


document.addEventListener(
  "DOMContentLoaded",
  setupNexoraChat
);
