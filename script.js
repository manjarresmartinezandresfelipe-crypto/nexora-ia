// ================================
// NEXORA AI - GENERAL WEBSITE
// ================================

const navbar = document.getElementById("navbar");

if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 16);
  });
}


// ================================
// MOBILE MENU
// ================================

function toggleMenu() {
  const menu = document.getElementById("mobile-nav");

  if (menu) {
    menu.classList.toggle("open");
  }
}


// ================================
// YEAR
// ================================

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


// ================================
// CONTACT FORM
// ================================

function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById("name")?.value || "";
  const business = document.getElementById("business")?.value || "";
  const email = document.getElementById("email")?.value || "";
  const message = document.getElementById("message")?.value || "";

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


// ================================
// NEXORA AI WORKER
// ================================

const WORKER_URL =
  "https://nexora-ai.manjarresmartinezandresfelipe.workers.dev";


// ================================
// GET CHAT
// ================================

function getChat() {
  return document.getElementById("nexora-chat");
}


// ================================
// OPEN CHAT
// ================================

function openNexoraChat() {

  const chat = getChat();

  if (!chat) {
    console.log("Nexora chat not found.");
    return;
  }

  chat.classList.add("open");

  const input = document.getElementById("nexora-input");

  if (input) {
    setTimeout(() => {
      input.focus();
    }, 150);
  }
}


// ================================
// CLOSE CHAT
// ================================

function closeNexoraChat() {

  const chat = getChat();

  if (!chat) {
    console.log("Nexora chat not found.");
    return;
  }

  chat.classList.remove("open");
}


// ================================
// SETUP CHAT
// ================================

function setupNexoraChat() {

  const chat = document.getElementById("nexora-chat");
  const openButton = document.getElementById("nexora-ai-button");
  const closeButton = document.getElementById("nexora-close");
  const form = document.getElementById("nexora-form");
  const input = document.getElementById("nexora-input");
  const sendButton = document.getElementById("nexora-send");

  if (!chat) {
    console.log("Nexora chat not found.");
    return;
  }


  // ================================
  // OPEN BUTTON
  // ================================

  if (openButton) {

    openButton.addEventListener("click", function(event) {

      event.preventDefault();
      event.stopPropagation();

      openNexoraChat();

    });

  }


  // ================================
  // CLOSE BUTTON
  // ================================

  if (closeButton) {

    closeButton.addEventListener("click", function(event) {

      event.preventDefault();
      event.stopPropagation();

      closeNexoraChat();

    });

  }


  // ================================
  // FORM SUBMIT
  // ================================

  if (form) {

    form.addEventListener("submit", function(event) {

      sendNexoraMessage(event);

    });

  }


  // ================================
  // ENTER KEY
  // ================================

  if (input) {

    input.addEventListener("keydown", function(event) {

      if (event.key === "Enter") {

        event.preventDefault();

        sendNexoraMessage();

      }

    });

  }


  // ================================
  // SEND BUTTON
  // ================================

  if (sendButton) {

    sendButton.addEventListener("click", function(event) {

      event.preventDefault();

      sendNexoraMessage();

    });

  }

}


// ================================
// SEND MESSAGE
// ================================

async function sendNexoraMessage(event) {

  if (event) {
    event.preventDefault();
  }

  const input =
    document.getElementById("nexora-input");

  const messages =
    document.getElementById("nexora-messages");

  if (!input || !messages) {

    console.log("Chat input or messages not found.");

    return;

  }

  const message = input.value.trim();

  if (!message) {
    return;
  }


  // ================================
  // USER MESSAGE
  // ================================

  const userBubble = document.createElement("div");

  userBubble.className = "chat-bubble user";

  userBubble.textContent = message;

  messages.appendChild(userBubble);

  input.value = "";


  // ================================
  // THINKING
  // ================================

  const thinkingBubble =
    document.createElement("div");

  thinkingBubble.id = "nexora-thinking";

  thinkingBubble.className = "chat-bubble bot";

  thinkingBubble.textContent = "Thinking...";

  messages.appendChild(thinkingBubble);

  messages.scrollTop = messages.scrollHeight;


  // ================================
  // SEND TO WORKER
  // ================================

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


    if (!response.ok) {

      throw new Error(
        "Worker error: " + response.status
      );

    }


    const data = await response.json();


    // ================================
    // REMOVE THINKING
    // ================================

    thinkingBubble.remove();


    // ================================
    // GET AI RESPONSE
    // ================================

    const answer =
      data.response ||
      data.answer ||
      data.message ||
      data.text ||
      "No recibí una respuesta de la IA.";


    // ================================
    // BOT MESSAGE
    // ================================

    const botBubble =
      document.createElement("div");

    botBubble.className = "chat-bubble bot";

    botBubble.textContent = answer;

    messages.appendChild(botBubble);

  } catch (error) {

    console.error(
      "Nexora AI error:",
      error
    );


    thinkingBubble.remove();


    const errorBubble =
      document.createElement("div");

    errorBubble.className = "chat-bubble bot";

    errorBubble.innerHTML =
      `No pude conectar con la IA.
      <br><br>
      Please contact:
      <strong>ianexora3@gmail.com</strong>`;


    messages.appendChild(errorBubble);

  }


  messages.scrollTop =
    messages.scrollHeight;

}


// ================================
// START
// ================================

document.addEventListener(
  "DOMContentLoaded",
  setupNexoraChat
);
