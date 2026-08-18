// ================================
// NEXORA AI - GENERAL WEBSITE
// ================================

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
// NEXORA AI
// ================================

const WORKER_URL =
  "https://nexora-ai.manjarresmartinezandresfelipe.workers.dev";


// Buscar el chat
function getChat() {
  return (
    document.getElementById("nexora-chat") ||
    document.querySelector(".chat-widget")
  );
}


// Abrir chat
function openNexoraChat() {

  const chat = getChat();

  if (!chat) {
    console.log("No se encontró el chat.");
    return;
  }

  chat.classList.add("open");

  const input =
    document.getElementById("nexora-input") ||
    document.querySelector(".chat-form input");

  if (input) {
    setTimeout(() => input.focus(), 100);
  }
}


// Cerrar chat
function closeNexoraChat() {

  const chat = getChat();

  if (!chat) return;

  chat.classList.remove("open");
}


// ================================
// CONFIGURAR CHAT
// ================================

function setupNexoraChat() {

  const chat = getChat();

  if (!chat) {
    console.log("Chat Nexora no encontrado.");
    return;
  }


  // BOTÓN DE ABRIR
  const openButtons = document.querySelectorAll(
    "#nexora-ai-button, .chat-toggle"
  );

  openButtons.forEach(button => {

    button.onclick = function(event) {

      event.preventDefault();

      openNexoraChat();

    };

  });


  // BOTONES DE CERRAR
  const closeButtons = document.querySelectorAll(
    "#nexora-close, #close-nexora-chat, .chat-header button"
  );

  closeButtons.forEach(button => {

    button.onclick = function(event) {

      event.preventDefault();
      event.stopPropagation();

      closeNexoraChat();

    };

  });


  // FORMULARIO
  const form =
    document.getElementById("nexora-form") ||
    document.querySelector(".chat-form");


  if (form) {

    form.onsubmit = function(event) {

      sendNexoraMessage(event);

    };

  }


  // ENTER EN EL INPUT
  const input =
    document.getElementById("nexora-input") ||
    document.querySelector(".chat-form input");


  if (input) {

    input.onkeydown = function(event) {

      if (event.key === "Enter") {

        event.preventDefault();

        sendNexoraMessage();

      }

    };

  }


  // BOTÓN ENVIAR
  const sendButton =
    document.getElementById("nexora-send");


  if (sendButton) {

    sendButton.onclick = function(event) {

      event.preventDefault();

      sendNexoraMessage();

    };

  }

}


// ================================
// ENVIAR MENSAJE A LA IA
// ================================

async function sendNexoraMessage(event) {

  if (event) {
    event.preventDefault();
  }


  const input =
    document.getElementById("nexora-input") ||
    document.querySelector(".chat-form input");


  const messages =
    document.getElementById("nexora-messages") ||
    document.querySelector(".chat-messages");


  if (!input || !messages) {

    console.log("No se encontró el input o los mensajes.");

    return;

  }


  const message = input.value.trim();


  if (!message) return;


  // Mostrar mensaje del usuario
  messages.innerHTML += `
    <div class="chat-bubble user">
      ${escapeHtml(message)}
    </div>
  `;


  input.value = "";


  // Mostrar Thinking
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


    // Revisar si el Worker respondió correctamente

    if (!response.ok) {

      throw new Error(
        "Worker error: " + response.status
      );

    }


    const data = await response.json();


    // Quitar Thinking

    document
      .getElementById("nexora-thinking")
      ?.remove();


    // Buscar diferentes nombres posibles
    const answer =
      data.response ||
      data.answer ||
      data.message ||
      data.text;


    messages.innerHTML += `
      <div class="chat-bubble bot">
        ${escapeHtml(
          answer ||
          "No recibí una respuesta de la IA."
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
        No pude conectar con la IA.
        <br><br>
        Please contact:
        <strong>ianexora3@gmail.com</strong>
      </div>
    `;

  }


  messages.scrollTop = messages.scrollHeight;

}


// ================================
// SEGURIDAD
// ================================

function escapeHtml(text) {

  const div = document.createElement("div");

  div.textContent = String(text);

  return div.innerHTML;

}


// ================================
// INICIAR
// ================================

document.addEventListener(
  "DOMContentLoaded",
  setupNexoraChat
);
