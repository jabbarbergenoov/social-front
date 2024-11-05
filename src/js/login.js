import axios from 'axios';
import "../sass/login.scss";

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const p = document.getElementById('p'); // p elementi oldindan mavjud

    axios.post("http://192.168.1.15:8000/auth/login", {
        username: username,
        password: password,
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
        } else {
            p.textContent = "Tokens not found";
        }
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
