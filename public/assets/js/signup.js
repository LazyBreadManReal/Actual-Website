function setUpLoginForm(){
    const loginForm = document.getElementById("signup-form")
    if(loginForm){
        loginForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById("confirm-password").value;

            if(password == confirmPassword){
                response = await apiCall('/api/users/register', 'POST', { fullname, email, password });
                if(response?.success){
                    window.location.href = "login.html";
                    return;
                }
                alert("invalid");
            }
        });
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    setUpLoginForm();
})