const overlay = document.querySelector(".overlay");
const messageContainer = document.getElementById("messages");
const deleteContentModel = document.querySelector(".delete-model");
const replyContentForm = document.querySelector(".form-setting");
const yesButton = document.querySelector(".yes");
const noButton = document.querySelector(".no");
const loader = document.getElementById("wraper")

let allMessages;
let token = localStorage.getItem('token');
let idToDelete;

let isLoading = true;

const handleLoading =()=>{
  if(isLoading){
    loader.style.display = 'flex';
  } else {
    loader.style.display = 'none';
  }
}

// handleLoading()

const fetchMessages = async () => {
  try {
    const response = await fetch("https://my-brand-backend-1-cqku.onrender.com/api/v1/messages", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
}

const deleteMessage = async (id) => {
  try {
    const response = await fetch(`https://my-brand-backend-1-cqku.onrender.com/api/v1/messages/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

const displayMessages = (messages) => {
  // isLoading=false;
  // handleLoading();
  messageContainer.innerHTML=""
  messages.forEach(info => {
    const messageId = info._id;
    const html = `
      <div class="message">
          <div class="message-left">
              <p><strong>From : </strong> ${info.email}</p>
              <p>${info.message}</p>
          </div>
          </div>`;
          // <div class="message-right">
          //     <button class="reply">Reply</button>
          //     <button class="delete" data-id="${messageId}">Delete</button>
          // </div>
    messageContainer.insertAdjacentHTML("afterbegin", html);
  });
}

export const loadMessages = async () => {
  try {
    const res = await fetchMessages();
    allMessages = res.data;
    displayMessages(res.data);
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

const showModal = (modal) => {
  overlay.style.display = "block";
  modal.style.display = "block";
}

const hideModal = (modal) => {
  overlay.style.display = "none";
  modal.style.display = "none";
}

const handleReplyClick = () => {
  showModal(replyContentForm);
}

const handleDeleteClick = (e) => {
  idToDelete = e.target.dataset.id;
  showModal(deleteContentModel);
}

const handleYesClick = async () => {
  if (idToDelete) {
    await deleteMessage(idToDelete);
    idToDelete = null;
    messageContainer.innerHTML = ""; // Clear the message container
    await loadMessages(); // Reload messages after deletion
  }
  hideModal(deleteContentModel);
}

const handleNoClick = () => {
  hideModal(deleteContentModel);
}

const handleOverlayClick = (e) => {
  if (e.target === overlay) {
    hideModal(replyContentForm);
    hideModal(deleteContentModel);
  }
}

replyContentForm.addEventListener("submit", function (e) {
  e.preventDefault();
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("reply")) {
    handleReplyClick();
  } else if (e.target.classList.contains("delete")) {
    handleDeleteClick(e);
  }
});

yesButton.addEventListener("click", handleYesClick);
noButton.addEventListener("click", handleNoClick);
overlay.addEventListener("click", handleOverlayClick);

loadMessages();
