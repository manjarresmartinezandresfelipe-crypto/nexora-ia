const navbar=document.getElementById("navbar");
function updateNavbar(){navbar.classList.toggle("scrolled",window.scrollY>20)}
window.addEventListener("scroll",updateNavbar);
updateNavbar();

function toggleMenu(){
  const mobileNav=document.getElementById("mobile-nav");
  const menuButton=document.getElementById("menu-btn");
  const isOpen=mobileNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded",isOpen);
  menuButton.textContent=isOpen?"✕":"☰";
}
document.addEventListener("click",(event)=>{
  const mobileNav=document.getElementById("mobile-nav");
  const menuButton=document.getElementById("menu-btn");
  if(mobileNav.classList.contains("open")&&!mobileNav.contains(event.target)&&!menuButton.contains(event.target)){
    mobileNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded","false");
    menuButton.textContent="☰";
  }
});

document.getElementById("year").textContent=new Date().getFullYear();

const revealElements=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){
  const observer=new IntersectionObserver((entries,obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  revealElements.forEach(el=>observer.observe(el));
}

function submitForm(event){
  event.preventDefault();
  const name=document.getElementById("name").value.trim();
  const business=document.getElementById("business").value.trim();
  const email=document.getElementById("email").value.trim();
  const message=document.getElementById("message").value.trim();
  if(!name||!email||!message)return;
  const subject=encodeURIComponent(`New Nexora AI inquiry from ${name}`);
  const body=encodeURIComponent(`Hello Nexora AI,

I would like to discuss a project.

Name: ${name}
Business: ${business||"Not provided"}
Email: ${email}

Project details:
${message}

Thank you.`);
  window.location.href=`mailto:ianexora3@gmail.com?subject=${subject}&body=${body}`;
}

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",event=>{
    const targetId=link.getAttribute("href");
    if(!targetId||targetId==="#")return;
    const target=document.querySelector(targetId);
    if(!target)return;
    event.preventDefault();
    target.scrollIntoView({behavior:"smooth",block:"start"});
  });
});

/* AI CHATBOT */
const CHATBOT_API_URL=""; // Paste your Cloudflare Worker URL here after deploying it.
const chatToggle=document.getElementById("chat-toggle");
const chatWidget=document.getElementById("chat-widget");
const chatClose=document.getElementById("chat-close");
const chatForm=document.getElementById("chat-form");
const chatInput=document.getElementById("chat-input");
const chatMessages=document.getElementById("chat-messages");
const chatStatus=document.getElementById("chat-status");

function openChat(){chatWidget.classList.add("open");chatInput.focus()}
function closeChat(){chatWidget.classList.remove("open")}
chatToggle.addEventListener("click",()=>chatWidget.classList.contains("open")?closeChat():openChat());
chatClose.addEventListener("click",closeChat);

function addMessage(text,type){
  const div=document.createElement("div");
  div.className=`chat-bubble ${type}`;
  div.textContent=text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop=chatMessages.scrollHeight;
}

function setTyping(on){
  chatStatus.innerHTML=on?'<span class="typing"><i></i><i></i><i></i></span>':"";
}

async function sendChatMessage(text){
  const clean=text.trim();
  if(!clean)return;
  addMessage(clean,"user");
  chatInput.value="";
  setTyping(true);

  if(!CHATBOT_API_URL){
    setTyping(false);
    addMessage("The AI assistant is ready, but it still needs its secure backend URL. Ask us directly at ianexora3@gmail.com for now.", "bot");
    return;
  }

  try{
    const response=await fetch(CHATBOT_API_URL,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({message:clean})
    });
    const data=await response.json();
    if(!response.ok)throw new Error(data.error||"Request failed");
    addMessage(data.reply||"Sorry, I couldn't answer that right now.","bot");
  }catch(error){
    addMessage("Sorry, the AI assistant is temporarily unavailable. You can contact us at ianexora3@gmail.com.","bot");
  }finally{
    setTyping(false);
  }
}

chatForm.addEventListener("submit",e=>{
  e.preventDefault();
  sendChatMessage(chatInput.value);
});

document.querySelectorAll(".chat-suggestions button").forEach(button=>{
  button.addEventListener("click",()=>sendChatMessage(button.dataset.question));
});
