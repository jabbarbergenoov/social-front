import axios from 'axios';
import "../sass/sign.scss" ;

const form = document.querySelector('#form');
form.addEventListener("submit" , (e) => {
    e.preventDefault();
    const first_name = document.querySelector("#first_name").value;
    const last_name = document.querySelector("#last_name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const username = document.querySelector("#username").value;
    axios.post('https://social-backend-kzy5.onrender.com/auth/sign-up', {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        username: username
    })
    .then((res) => {
        const access_token = res.data.access_token
        const refresh_token = res.data.refresh_token
        if (access_token && refresh_token) {
            localStorage.setItem("accessToken" , access_token)
            localStorage.setItem('refreshToken' , refresh_token)
            console.log("token");
        } else {
            console.log("not token");
        }
        if (res.status === 201 ) {
            window.location.href = 'index.html'
        }
        console.log(res.data);
        console.log(res.status);
    })
    .catch((err) => {
        console.log(err);
        p.style.color = "red"
        if (err.res && (err.res.status === 400 || err.res.status === 401)) {
            p.textContent = "created";
        } else {
            p.textContent = "previously created account ";
        }
    }) 
})