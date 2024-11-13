import '../sass/search.scss';
import { axiosInstance } from "./request";

const form = document.getElementById('form');
const search = document.getElementById('search');
const resultsContainer = document.getElementById('results-container');
const hostname = window.location.hostname
const port = window.location.port
const url = `${hostname}${port ? `:${port}` : ''}`
console.log(url);
const logout = document.querySelector('.logout')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = search.value;
    if (username) {
        axiosInstance.get("/search", { params: { username } })
        .then(res => {
            console.log(res.data);
            const results = res.data;
            resultsContainer.innerHTML = ''; 
    
            results.forEach(result => {
                const userElement = document.createElement('div');
                userElement.classList.add('user');
            
                const userImage = document.createElement('img');
                userImage.src = result.user_img || "./images/user-solid (1).svg";
                userImage.alt = result.username;
                userElement.appendChild(userImage);
    
                const userName = document.createElement('a');
                userName.href = `${window.location.protocol}//${url}/user.html?username=${result.username}`;
                userName.textContent = result.username;
                userElement.appendChild(userName);
    
                const follow = document.createElement('a');
                follow.href = '#';
                follow.id = 'follow';
                follow.innerText = result.has_followed ? "Unfollow" : "Follow";
                
                follow.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
    
                    if (follow.innerText === 'Follow') {
                        axiosInstance.post("/followings/follow", { username: result.username })
                            .then(res => {
                                if (res.status === 200) {
                                    follow.innerText = 'Unfollow';
                                    follow.classList.add('followed');
                                }
                            })
                            .catch(error => {
                                console.error("Follow error:", error);
                            });
                    } else if (follow.innerText === 'Unfollow') {
                        axiosInstance.post("/followings/unfollow", { username: result.username })
                            .then(res => {
                                if (res.status === 200) {
                                    follow.innerText = 'Follow';
                                    follow.classList.remove('followed');
                                }
                            })
                            .catch(error => {
                                console.error("Unfollow error:", error);
                            });
                    }
                });
    
                userElement.appendChild(follow);
                resultsContainer.appendChild(userElement);
            });
        })
        .catch(error => {
            console.error("Search error:", error);
        });
    
    } else {
        console.log("Foydalanuvchi nomi kiritilmadi.");
    }
});
