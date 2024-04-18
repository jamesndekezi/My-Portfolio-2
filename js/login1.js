async function handleLogin() {
  const errorMessage = document.getElementById('error-message');
  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const buttonToloady = document.getElementById("btn");
  let loading = false;

  // Check if username and password are filled
  if (!email || !password) {
      errorMessage.textContent = 'Fill UserName and Passwoed';
      return;
}
// check weak password
if (password.length < 4) {
  return errorMessage.textContent = "Weak Password";
}
buttonToloady.textContent = "Loading...";
buttonToloady.attributes.disabled = true;



const response = await fetch('https://backend-ctov.onrender.com/api/v1/users/login',{
  method: "POST",
  body:JSON.stringify({email, password}),
  headers:{
    "Content-Type": "application/json"
  }

  
});
buttonToloady.textContent = "Login";
buttonToloady.attributes.disabled = false;





const data = await response.json();
if(response.status === 200){
  localStorage.setItem("token",data.token);
  window.alert("You have successfully logeged in, you can comment, like and leave message");
  if(data.user.role!== "admin"){
    return window.location.href="./index.html"
  }
  window.location.href = './dashboard.html';
  

}
else{
  return errorMessage.textContent = data.message;
}

  
}

