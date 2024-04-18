document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const userError = document.getElementById("user-error");
  const loginBtn = document.getElementById("login-btn");

  let validate = 0

 
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))




  

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();


    loginBtn.value = "Loading..."

   

  


    if (!passwordInput.value || !usernameInput.value) {
      loginBtn.value = "Please Fill All Fields"
      loginBtn.style.background="#ff7f0e"
      setTimeout(() => {
        loginBtn.style.background="aqua"
        loginBtn.value= "Login"
      }, 3000);
      return;
    } else {
      const response = await fetch("https://my-brand-backend-1-cqku.onrender.com/api/v1/users/auth/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: usernameInput.value,
          password: passwordInput.value,
        }),
      })
  
      const data = await response.json();
    

      if (response.status === 200) {

        const currentUser = data.data

        if(currentUser.isAdmin){

          window.location.href = "./admin/index.html"

        } else {
          window.location.href = "./index.html"
        }

        localStorage.setItem("token", data.token)
        loginBtn.style.background="#00cc00"
        loginBtn.value = "Successfully logged in"
        
         setTimeout(() => {
          loginBtn.style.background="aqua"
          loginBtn.style.color="black"
          loginBtn.value="Redirecting user ..."
        }, 2000);
  
        const isAdmin = userd.data.isAdmin
  
        console.log(isAdmin)
        
      } else if(response.status ===404){
        
        loginBtn.style.background="#808080"
        loginBtn.value=`Account not found`
         setTimeout(() => {
          loginBtn.style.background="aqua"
          loginBtn.value="Login"
        }, 3000);
        
     } else if(response.status ===401){
        
      loginBtn.style.background="#ff0000"
      loginBtn.style.color="white"
      loginBtn.value="Invalid username or password"
    
       setTimeout(() => {
        loginBtn.style.background="aqua"
        loginBtn.value = "Login"
        loginBtn.style.color="black"
      }, 3000);
      
   }
  
    }

 

    // loginForm.reset()
  });

});
