import { axiosInstance } from "./request";
import "../sass/profile.scss";

const imgInput = document.getElementById('imgInput');
const displayImg = document.getElementById('displayImg');
const form = document.getElementById('form');

imgInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            displayImg.src = e.target.result;
            displayImg.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

axiosInstance.get("/auth/me")
    .then((res) => {
        console.log(res.data);
        const container = document.createElement('div');
        container.className = 'container';

        const userDiv = document.createElement('div');
        userDiv.className = 'user';

        const userImgDiv = document.createElement('div');
        userImgDiv.className = 'user-img';

        const userImg = document.createElement('img');
        userImg.src = res.data.user_img || './images/user-solid (1).svg';
        userImg.alt = 'User Image';
        userImgDiv.appendChild(userImg);

        const userTextDiv = document.createElement('div');
        userTextDiv.className = 'user-text';

        const userName = document.createElement('h2');
        userName.textContent = res.data.username;

        const userEmail = document.createElement('p');
        userEmail.textContent = res.data.email;

        userTextDiv.appendChild(userName);
        userTextDiv.appendChild(userEmail);

        userDiv.appendChild(userImgDiv);
        userDiv.appendChild(userTextDiv);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';

        const lastName = document.createElement('h2');
        lastName.textContent = res.data.last_name;

        const firstName = document.createElement('h2');
        firstName.textContent = res.data.first_name;

        infoDiv.appendChild(lastName);
        infoDiv.appendChild(firstName);

        const followDiv = document.createElement('div');
        followDiv.className = 'follow';

        const followersDiv = document.createElement('div');
        followersDiv.className = 'followers';

        const followersTitle = document.createElement('h2');
        followersTitle.textContent = 'Followers';

        const followersCount = document.createElement('p');
        followersCount.textContent = res.data.followers;

        followersDiv.appendChild(followersTitle);
        followersDiv.appendChild(followersCount);

        const followingsDiv = document.createElement('div');
        followingsDiv.className = 'followings';

        const followingsTitle = document.createElement('h2');
        followingsTitle.textContent = 'Followings';

        const followingsCount = document.createElement('p');
        followingsCount.textContent = res.data.followings;

        followingsDiv.appendChild(followingsTitle);
        followingsDiv.appendChild(followingsCount);

        followDiv.appendChild(followersDiv);
        followDiv.appendChild(followingsDiv);

        container.appendChild(userDiv);
        container.appendChild(infoDiv);
        container.appendChild(followDiv);

        // Append the container to the body
        document.body.appendChild(container); // This appends the container at the end, keeping the elements centered
    })
    .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
    });


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (imgInput.files.length > 0) {
        formData.append('file', imgInput.files[0]);
    } else {
        console.error("Fayl tanlanmagan.");
        return;
    }

    axiosInstance.post('/image/user', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        });
});
