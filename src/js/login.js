const { default: axios } = require("axios");

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    e.preventDefault();
    axios.post("", {
        username: username,
        password: password,
    }).then(res => {
        const acsessToken = res.data.access_token;
        const refreshToken = res.data.refresh_token;
        if (refreshToken && acsessToken) {
            localStorage.setItem("acsessToken", acsessToken);
            localStorage.setItem("refreshToken", refreshToken);
            console.log("token");
        } else {
            console.log("not token");
        }

        if (res.status === 200) {
            window.location.href = 'index.html'
        }
    }).catch((err) => console.log(err));
})
