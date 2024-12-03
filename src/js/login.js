import axios from 'axios';
import "../sass/login.scss";

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const p = document.getElementById('p'); 
    p.style.color = "red"
    axios.post("https://b410-213-230-92-237.ngrok-free.app/auth/login", {
        login: username,
        password: password,
    },{
        withCredentials:true
    })
    .then(res => {
        const accessToken = res.data.access_token;
        const refreshToken = res.data.refresh_token;

        if (accessToken && refreshToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            console.log("Token saved");

            if (res.status === 200) {
                window.location.href = 'index.html';
            }
        } 
        // else {
        //     p.textContent = "Tokens not found";
        // }
    })
    .catch((err) => {
        console.error(err);

        if (err.response && (err.response.status === 400 || err.response.status === 401)) {
            p.textContent = "Incorrect username or password";
        } else {
            p.textContent = "Incorrect username or password";
        }
    });
});
