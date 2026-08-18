// ================================
// NEXORA AI - GENERAL WEBSITE
// ================================

document.addEventListener("DOMContentLoaded", () => {

  // ================================
  // NAVBAR
  // ================================

  const navbar = document.getElementById("navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle(
        "scrolled",
        window.scrollY > 16
      );
    });
  }


  // ================================
  // YEAR
  // ================================

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // ================================
  // CHAT
  // ================================

  const openButton =
    document.getElementById("nexora-ai-button");

  const closeButton =
    document.getElementById("nexora-close");

  const chat =
    document.getElementById("nexora-chat");

  const form =
    document.getElementById("nexora-form");

  const input =
    document.getElementById("nexora-input");

  const messages =
    document.getElementById("nexora-messages");

  const sendButton =
    document.getElementById("nexora-send");


  // ================================
  // OPEN
  // ================================

  function openChat() {

    if (!chat) return;

    chat.classList.add("open");

    // Quitar cualquier estilo inline de cierre
    chat.style.display = "";

    if (input) {
      setTimeout(() => {
        input.focus();
      }, 100);
    }
  }


  // ================================
  // CLOSE
  // ================================

  function closeChat() {

    if (!chat) return;

    // Quitar clase
    chat.classList.remove("open");

    // Forzar cierre
    chat.style.display = "none";

  }


  // ================================
  // OPEN BUTTON
  // ================================

  if (openButton) {

    openButton.addEventListener(
      "click",
      function (event) {

        event.preventDefault();
        event.stopPropagation();

        openChat();

      }
    );

  }


  // ================================
  // CLOSE BUTTON
  // ================================

  if (closeButton) {

    closeButton.addEventListener(
      "click",
      function (event) {

        event.preventDefault();
        event.stopPropagation();

        closeChat();

      }
    );

  }


  // ================================
  // SEND MESSAGE
  // ================================

  async function sendMessage(event) {

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!input || !messages) return;

    const message =
      input.value.trim();

    if (!message) return;


    // USER MESSAGE

    const userBubble =
      document.createElement("div");

    userBubble.className =
      "chat-bubble user";

    userBubble.textContent =
      message;

    messages.appendChild(
      userBubble
    );

    input.value = "";


    // THINKING

    const thinking =
      document.createElement("div");

    thinking.className =
      "chat-bubble bot";

    thinking.id =
      "nexora-thinking";

    thinking.textContent =
      "Thinking...";

    messages.appendChild(
      thinking
    );

    messages.scrollTop =
      messages.scrollHeight;


    try {

      const response =
        await fetch(
          "https://nexora-ai.manjarresmartinezandresfelipe.workers.dev",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              message: message
            })
          }
        );


      if (!response.ok) {

        throw new Error(
          "Worker error: " +
          response.status
        );

      }


      const data =
        await response.json();


      thinking.remove();


      const answer =
        data.response ||
        data.answer ||
        data.message ||
        data.text ||
        "No recibí una respuesta de la IA.";


      const botBubble =
        document.createElement("div");

      botBubble.className =
        "chat-bubble bot";

      botBubble.textContent =
        answer;

      messages.appendChild(
        botBubble
      );


    } catch (error) {

      console.error(
        "Nexora AI error:",
        error
      );


      thinking.remove();


      const errorBubble =
        document.createElement("div");

      errorBubble.className =
        "chat-bubble bot";

      errorBubble.innerHTML =
        "No pude conectar con la IA.<br><br>" +
        "Please contact: " +
        "<strong>ianexora3@gmail.com</strong>";

      messages.appendChild(
        errorBubble
      );

    }


    messages.scrollTop =
      messages.scrollHeight;

  }


  // ================================
  // FORM
  // ================================

  if (form) {

    form.addEventListener(
      "submit",
      sendMessage
    );

  }


  // ================================
  // SEND BUTTON
  // ================================

  if (sendButton) {

    sendButton.addEventListener(
      "click",
      sendMessage
    );

  }


  // ================================
  // ENTER
  // ================================

  if (input) {

    input.addEventListener(
      "keydown",
      function (event) {

        if (event.key === "Enter") {

          event.preventDefault();

          sendMessage(event);

        }

      }
    );

  }


  // ================================
  // MOBILE MENU
  // ================================

  window.toggleMenu = function () {

    const menu =
      document.getElementById(
        "mobile-nav"
      );

    if (menu) {
      menu.classList.toggle(
        "open"
      );
    }

  };

});
