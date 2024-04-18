const registerForm = document.getElementById('register-form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const registerBtn = document.getElementById('register-btn');
const loader3 = document.getElementById('loader3');
const span2 = document.getElementById('span2');

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

registerForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (!emailValue || !usernameValue || !passwordValue) {
        showError("Please fill in all fields");
        registerBtn.style.background = "orange"

        setTimeout(() => {

            registerBtn.style.background = "aqua"
            showError("Register")
            
        }, 2000);
        return;
    }

    if (!emailRegex.test(emailValue)) {
        showError("Please enter a valid email address");
        registerBtn.style.background = "orange"

        setTimeout(() => {

            registerBtn.style.background = "aqua"
            showError("Register")
            
        }, 2000);
        return;
    }

    toggleLoader(true); // Show loader

    try {
        const response = await fetch("https://my-brand-backend-1-cqku.onrender.com/api/v1/users/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameValue,
                email: emailValue,
                password: passwordValue,
            }),
        });

        const data = await response.json();

        if (response.status === 201) {
            span2.textContent = "Successfully registered account 😎";
            span2.style.color = "white";
            registerBtn.style.background = "green"

            setTimeout(() => {
                showError("Redirecting to login ...")

                setTimeout(() => {
                    window.location.href ="/login.html"
                }, 1500);
                
            }, 2000);
        } else if (response.status === 400) {
            showError("Email already registered");
            registerBtn.style.background = "orange"

        setTimeout(() => {

            registerBtn.style.background = "aqua"
            showError("Register")
            
        }, 2000);
        } else {
            showError("Registration failed. Please try again later.");
            registerBtn.style.background = "orange"

        setTimeout(() => {

            registerBtn.style.background = "aqua"
            showError("Register")
            
        }, 2000);
        }
    } catch (error) {
        showError("An error occurred while registering. Please try again later.");
    } finally {
        toggleLoader(false); // Hide loader
    }
});

function showError(message) {
    span2.textContent = message;
    span2.style.display = "block";
}

function toggleLoader(show) {
    loader3.style.display = show ? 'flex' : 'none';
    span2.style.display = show ? 'none' : 'block';
}
