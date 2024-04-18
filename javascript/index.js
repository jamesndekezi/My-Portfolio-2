const humburge = document.getElementById("burger");
const sidebar = document.getElementById("sidebar");
const slides = document.getElementById("slides");
const closeBtn = document.getElementById("close-x");
const username = document.getElementById("username");
const logoutBtn = document.getElementById("logout-btna");
const user = document.getElementById("user1");


logoutBtn.addEventListener("click",()=>{
  localStorage.removeItem("token");
  window.location.reload();
})

const slideContainer = document
  .getElementById("slide-container")
  .cloneNode(true);

slides.appendChild(slideContainer);

humburge.addEventListener("click", () => {
  sidebar.classList.toggle("show");
  // alert("Slides")
});

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("show");
});

const load = () => {
  const reveals = document.querySelectorAll(".reveals");

  Array.from(reveals).forEach((item, index) => {
    const windowHeight = window.innerHeight;
    const revealPoint = 30;
    const revealTop = item.getBoundingClientRect().top;

    if (revealTop < windowHeight - revealPoint) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

window.addEventListener("scroll", load);

const sidebarLinks = document.querySelectorAll("ul li a");

sidebarLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const targetId = this.getAttribute("href");

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
      
    }
  });
});
const sidebarLinks2 = document.querySelectorAll(".sidebar a");

sidebarLinks2.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const targetId = this.getAttribute("href");

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
      sidebar.classList.toggle("show")
    }
  });
});


let token = localStorage.getItem("token");
let currentUser;

const autoLoginUser = async ()=>{
  try {
    const response = await fetch("https://my-brand-backend-1-cqku.onrender.com/api/v1/users/auth/verify-token",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json();

    return data

  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    
  }
}

if(!currentUser){
  user.style.display = 'none';
}


autoLoginUser().then(res=>{

  currentUser = res.data;

  if(currentUser){
    user.style.display = 'flex';
    username.textContent = currentUser.username
  } 

})

