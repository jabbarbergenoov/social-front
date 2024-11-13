import "../sass/user.scss";
import { axiosInstance } from "./request";

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const container = document.querySelector('.container')


axiosInstance.get(`/auth/user?username=${username}`)
    .then((res) => {
        const userData = res.data[0];
        console.log(userData);

        const container = document.createElement('div');
        container.className = 'container';

        const arrElement = document.createElement('div');
        arrElement.className = 'arr';

        const link = document.createElement('a');
        link.href = './index.html';

        const img = document.createElement('img');
        img.src = './images/arrow-left-solid.svg';
        img.alt = 'Home';
        img.className = 'arr-img';
        link.appendChild(img);
        arrElement.appendChild(link);

        const userDiv = document.createElement('div');
        userDiv.className = 'user';

        const userImgDiv = document.createElement('div');
        userImgDiv.className = 'user-img';

        const userImg = document.createElement('img');
        userImg.src = userData.user_img || './images/user-solid (1).svg';
        userImg.alt = 'User Image';
        userImgDiv.appendChild(userImg);

        const userTextDiv = document.createElement('div');
        userTextDiv.className = 'user-text';

        const userName = document.createElement('h2');
        userName.textContent = userData.username;

        const userEmail = document.createElement('p');
        userEmail.textContent = userData.email || "Email mavjud emas";

        userTextDiv.appendChild(userName);
        userTextDiv.appendChild(userEmail);
        userDiv.appendChild(userImgDiv);
        userDiv.appendChild(userTextDiv);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';

        const lastName = document.createElement('h2');
        lastName.textContent = userData.last_name || "Familiya mavjud emas";

        const firstName = document.createElement('h2');
        firstName.textContent = userData.first_name || "Ism mavjud emas";

        infoDiv.appendChild(lastName);
        infoDiv.appendChild(firstName);

        const followDiv = document.createElement('div');
        followDiv.className = 'follow';

        const followersDiv = document.createElement('div');
        followersDiv.className = 'followers';

        const followersTitle = document.createElement('h2');
        followersTitle.textContent = 'Followers';

        const followersCount = document.createElement('p');
        followersCount.textContent = userData.followers || "0";

        followersDiv.appendChild(followersTitle);
        followersDiv.appendChild(followersCount);

        const followingsDiv = document.createElement('div');
        followingsDiv.className = 'followings';

        const followingsTitle = document.createElement('h2');
        followingsTitle.textContent = 'Followings';

        const followingsCount = document.createElement('p');
        followingsCount.textContent = userData.followings || "0";

        followingsDiv.appendChild(followingsTitle);
        followingsDiv.appendChild(followingsCount);

        followDiv.appendChild(followersDiv);
        followDiv.appendChild(followingsDiv);

        // Follow button
        const followButton = document.createElement('button');
        followButton.className = 'follow-button';
        followButton.textContent = userData.has_followed ? 'Unfollow' : 'Follow';

        followButton.addEventListener('click', () => {
            if (followButton.textContent === 'Follow') {
                // Make the follow API call
                axiosInstance.post("/followings/follow", { username: userData.username })
                    .then((response) => {
                        if (response.status === 200) {
                            followButton.textContent = 'Unfollow';
                            followButton.classList.add('followed');
                            console.log('User followed');
                        }
                    })
                    .catch((error) => {
                        console.error('Error following user:', error);
                    });
            } else {
                // Make the unfollow API call
                axiosInstance.post("/followings/unfollow", { username: userData.username })
                    .then((response) => {
                        if (response.status === 200) {
                            followButton.textContent = 'Follow';
                            followButton.classList.remove('followed');
                            console.log('User unfollowed');
                        }
                    })
                    .catch((error) => {
                        console.error('Error unfollowing user:', error);
                    });
            }
        });

        // Append the follow button to the follow div
        followDiv.appendChild(followButton);

        // Append all elements to the container
        container.appendChild(userDiv);
        container.appendChild(infoDiv);
        container.appendChild(followDiv);

        document.body.appendChild(container);
    })
    .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
    });
