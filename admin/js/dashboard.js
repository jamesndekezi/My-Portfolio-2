let currentUser;
let num=0;



let token = localStorage.getItem('token');

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


autoLoginUser().then(res=>{

  currentUser = res.data;

  if(!res.data.isAdmin){
    window.location.href = "../index.html";
  }


})



const fetchUsers = async () => {
  try {
    const response = await fetch("https://my-brand-backend-1-cqku.onrender.com/api/v1/users/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    return data;

   
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
fetchUsers();

const fetchBlogs = async () => {
  try {
    const response = await fetch("https://my-brand-backend-1-cqku.onrender.com/api/v1/blogs", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return data;

   
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
}
fetchBlogs()

const fetchMessages = async()=>{
  try {
    const response = await fetch("https://my-brand-backend-1-cqku.onrender.com/api/v1/messages", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    console.log(data)
    return data;

   
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
}
fetchMessages()

const fetchSub = async()=>{
  try {
    const response = await fetch("https://my-brand-backend-1-cqku.onrender.com/api/v1/subscribers", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    console.log(data)
    return data;

   
  } catch (error) {
    console.error('Error fetching subscribers:', error);
  }
}

fetchSub()



// const fetchSubscribers = () => {
//   subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
//   const subscriberCount = document.getElementById("subscriber-count")
//   subscriberCount.innerHTML = `${subscribers.length} Subscribers`;

// }

export const updateDashboard = async() => {


  const userData = await fetchUsers()
  const blogsData = await fetchBlogs()
  const messagesData = await fetchMessages()
  const subsData = await fetchSub()


  const messageCount = document.getElementById("message-count");
  const subscriberCount = document.getElementById("subscriber-count")
  const usersCount = document.getElementById("user-count");
  const blogCount = document.getElementById("blog-count");
  const table= document.getElementById("table");
  const recentSubscribers = document.getElementById("recent-subscribers");

  console.log(2)

  


  // getting stored objects from local storage
  const messages = JSON.parse(localStorage.getItem('contact-messages')) || [];
  const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  messageCount.innerHTML = `${messagesData.count} Messages`;
  subscriberCount.innerHTML = `${subsData.count} Subscribers`;
  usersCount.innerHTML = `${userData.count} Users`;
  blogCount.innerHTML = `${blogsData.count} Blogs`;

  table.innerHTML = ''; // Clear the existing table content
  
  userData.data.slice(-20).forEach(user => {

    const role = user.isAdmin? 'admin' : "user"
    const html = `<tr>
                    <td class="sm-hidden">
                      <img src='${user.profile}' alt="User Image" />
                    </td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td class="sm-hidden">${role}</td>
                    <td class="sm-hidden">${user.createdAt}</td>
                  </tr>`;
    
    table.insertAdjacentHTML("beforeend", html);
  });

  recentSubscribers.innerHTML = ''; 
  
  subsData.data.slice(-5).reverse().forEach(sub => {
    const html = `<div class="subscriber">
                    <img src="../images/me.png" alt="" />
                    <div class="data">
                      <p>${sub.name}</p>
                      <p>${sub.email}</p>
                    </div>
                  </div>`;
  
    recentSubscribers.insertAdjacentHTML("beforeend", html);
  });
};

updateDashboard()

export function customAlert(){
  alert("Custom Alert")
}

let blogLoader = localStorage.getItem('blogLoader');
setInterval(async() => {

  if( blogLoader && blogLoader === "true"){
    await updateDashboard()
    localStorage.removeItem('blogLoader')
  }

  
}, 1000);

// export { updateDashboard };

// module.exports ={fetchBlogs}