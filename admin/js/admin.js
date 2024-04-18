

document.addEventListener('DOMContentLoaded', () => {
    const logout = document.getElementById("logout")

    let token  = localStorage.getItem("token")
    let currentUser;
   

logout.addEventListener("click", () => {
  localStorage.removeItem("token")
  window.location.href = "../login.html"
})

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

// if(!currentUser){
//   user.style.display = 'none';
// }


autoLoginUser().then(res=>{

  currentUser = res.data;

  if(!currentUser || !currentUser.isAdmin){
    window.location.href = "../index.html";
  }

})
    
})