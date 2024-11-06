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
    axios.post('http://192.168.1.25:8000/auth/sign-up', {
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
            localStorage.setItem("access_token" , access_token)
            localStorage.setItem('refresh_token' , refresh_token)
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

        if (err.res && (err.res.status === 400 || err.res.status === 401)) {
            p.textContent = "Opened";
        } else {
            p.textContent = "Opened before";
        }
    }) 
})