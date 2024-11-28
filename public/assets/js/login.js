function setUpLoginForm(){
    const loginForm = document.getElementById("login-form")
    if(loginForm){
        loginForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            response = await apiCall('/api/users/login', 'POST', { email, password });
            if(response?.valid){
                localStorage.setItem("sessionToken", response.token);
                account = await getAccount();
                userData = await getAccountDetails(account.userId);
                window.location.href = "index.html";
                /*const popup = document.querySelector(".pop-up");
                if (popup) {
                    const popupContent = document.querySelector(".pop-up-content");
                    popupContent.innerHTML = `
                        <h1>Welcome back ${userData.username}</h1>
                        <p>Come Enjoy with us</p>
                        <button id="close-pop-up-btn">Will Do!</button>
                    `;
                    popup.classList.toggle("pop-up-hidden");

                    const close_btn = document.getElementById("close-pop-up-btn");
                    close_btn.addEventListener("click", function(event) {
                        event.preventDefault();
                        popup.classList.toggle("pop-up-hidden");
                    });
                }*/
                return;
            }
            alert("invalid");
        });
    }
}

function setUpSignUpButton(){
    const singupbtn = document.querySelector(".signup-btn")

    singupbtn.addEventListener("click", function() {
        window.location.href = "signup.html";
    })
}

window.addEventListener("DOMContentLoaded", async () => {
    setUpLoginForm();
    setUpSignUpButton();
})