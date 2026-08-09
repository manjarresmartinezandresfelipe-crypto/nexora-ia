const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 16);
});

function toggleMenu() {
  document.getElementById("mobile-nav").classList.toggle("open");
}

document.getElementById("year").textContent = new Date().getFullYear();

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
  const elements = document.querySelectorAll("button, a");

  const aiButton = Array.from(elements).find(element =>
    element.textContent.toLowerCase().includes("ia asistente")
  );

  if (!aiButton) return;

  aiButton.addEventListener("click", openNexoraChat);
}

function openNexoraChat() {
  if (document.getElementById("nexora-chat")) return;

  const chat = document.createElement("div");

  chat.id = "nexora-chat";

  chat.innerHTML = `
    <div class="nexora-chat-header">
      <div>
        <strong>✦ Nexora AI</strong>
        <small>AI Assistant</small>
      </div>

      <button id="close-nexora-chat">×</button>
    </div>

    <div id="nexora-messages" class="nexora-messages">
      <div class="nexora-message bot">
        Hi! 👋 I'm the Nexora AI assistant.
        How can I help you today?
      </div>
    </div>

    <div class="nexora-chat-input">
      <input
        id="nexora-input"
        type="text"
        placeholder="Ask something..."
      />

      <button id="nexora-send">➤</button>
    </div>
  `;

  document.body.appendChild(chat);

  document
    .getElementById("close-nexora-chat")
    .addEventListener("click", () => {
      chat.remove();
    });

  document
    .getElementById("nexora-send")
    .addEventListener("click", sendNexoraMessage);

  document
    .getElementById("nexora-input")
    .addEventListener("keydown", event => {
      if (event.key === "Enter") {
        sendNexoraMessage();
      }
    });
}

async function sendNexoraMessage() {
  const input = document.getElementById("nexora-input");
  const messages = document.getElementById("nexora-messages");

  if (!input || !messages) return;

  const message = input.value.trim();

  if (!message) return;

  messages.innerHTML += `
    <div class="nexora-message user">
      ${escapeHtml(message)}
    </div>
  `;

  input.value = "";

  messages.innerHTML += `
    <div id="nexora-loading" class="nexora-message bot">
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
      .getElementById("nexora-loading")
      ?.remove();

    messages.innerHTML += `
      <div class="nexora-message bot">
        ${escapeHtml(
          data.response ||
          "Sorry, I couldn't answer that."
        )}
      </div>
    `;

  } catch (error) {

    document
      .getElementById("nexora-loading")
      ?.remove();

    messages.innerHTML += `
      <div class="nexora-message bot">
        Sorry, something went wrong.
        Please contact us at
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
