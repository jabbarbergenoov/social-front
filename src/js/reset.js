import axios from "axios";
import "../sass/reser.scss";
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const code = document.getElementById('code').value;

    axios.post('https://social-backend-kzy5.onrender.com/auth/reset-pass', {
        username: username,
        new_pass: password,
        code: Number(code),
    }).then(res => {
        if (res.status === 200) {
            window.location.href = 'login.html';
        } else {
            console.log(p);
        }
    })
})