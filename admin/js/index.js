import {renderBlogs} from "./blog.js"
import { updateDashboard } from "./dashboard.js";
import { loadMessages } from "./messages.js";

const links = document.querySelectorAll(".links p");
const mainContents = document.querySelectorAll(".main-contents > div");
const sidebar = document.getElementById("side-bar");
const closeMe = document.getElementById("close-me");
const burger = document.getElementById("burger");
const blogContainer = document.getElementById("blog-cont");
const messageContainer = document.getElementById("messages");

let windowWidth;

burger.addEventListener("click", () => (sidebar.style.display = "block"));
closeMe.addEventListener("click", () => (sidebar.style.display = "none"));
links.forEach((link) => {
  link.addEventListener("click", async(e) => {
    e.preventDefault();

    links.forEach((otherLink) => {
      otherLink.classList.remove("active");
    });

    link.classList.add("active");

    mainContents.forEach((content) => {
      content.style.display = "none";
    });

    const targetId = link.textContent.toLowerCase();

    const targetContent = document.getElementById(targetId);
    if (targetContent) {
      targetContent.style.display = "block";
      console.log(targetContent.id)
      // sidebar.style.display = "none"
      if(targetContent.id == "dashboard") {



        // await renderBlogs()
        await updateDashboard()
        
      } else if(targetContent.id == "blogs"){
        blogContainer.innerHTML = `<div class="loading-wrapper" id="wraper">
        <div class="loading-spinner"></div>
      </div> `;
        await renderBlogs()
        // sidebar.style.display = "none"
      } else if(targetContent.id == "messages"){

        
        messageContainer.innerHTML = `<div class="loading-wrapper" id="wraper">
        <div class="loading-spinner"></div>
      </div> `;
        await loadMessages()
      }
    }
  });
});

window.addEventListener("resize", () => {
  windowWidth = window.innerWidth;
  console.log(windowWidth);
  if (windowWidth > 786) {
    sidebar.style.display = "block";
  } else {
  }
});
