const navbar=document.getElementById("navbar");window.addEventListener("scroll",()=>navbar.classList.toggle("scrolled",window.scrollY>16));
function toggleMenu(){document.getElementById("mobile-nav").classList.toggle("open")}
document.getElementById("year").textContent=new Date().getFullYear();
function submitForm(e){
  e.preventDefault();
  const name=document.getElementById("name").value, business=document.getElementById("business").value, email=document.getElementById("email").value, message=document.getElementById("message").value;
  const subject=encodeURIComponent("New Nexora AI inquiry from "+name);
  const body=encodeURIComponent(`Name: ${name}
Business: ${business||"Not provided"}
Email: ${email}

${message}`);
  // Replace YOUR_EMAIL below with your real email before publishing.
  window.location.href=`mailto:ianexora3@gmail.com?subject=${subject}&body=${body}`;
}
