import { axiosInstance } from "./request";
import "../sass/global.scss";

const slideBars = document.querySelector('.aslide-bars');
const slideMain = document.querySelector('.aslide-main');
const btn = document.querySelector('.btn')
const hostname = window.location.hostname
const port = window.location.port
const url = `${hostname}${port ? `:${port}` : ''}`
console.log(url);
const logout = document.querySelector('.logout')

logout.addEventListener('click', () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    location.href = 'login.html'
})



slideBars.addEventListener('click', () => {
    slideMain.classList.toggle('open');
});

const accessToken = localStorage.getItem('accessToken')
const refreshToken = localStorage.getItem('refreshToken')

const aslideInner = document.querySelector('.aslide-inner')
btn.addEventListener('click', (e) => {
    e.preventDefault();
    mes()
})


function mes() {
    axiosInstance.get('/posts').then(res => {
        const cardsContainer = document.querySelector(".cards-inner");
        res.data.forEach(post => {
            const card = document.createElement("a");
            card.className = "card";
            card.href = `${window.location.protocol}//${url}/post?id=${post.id}`;
            card.id = post.id

            const cardProfile = document.createElement("div");
            cardProfile.className = "card-profile";

            const profileImg = document.createElement("img");
            if (post.user_image) {
                console.log(post.user_image);
                profileImg.src = post.user_image
                profileImg.style.filter = 'none'
            }
            else {
                profileImg.src = "./images/user-solid (1).svg";
            }
            profileImg.alt = "User Profile";

            const username = document.createElement("a");
            username.style.color = '#fff'
            username.href = `${window.location.protocol}//${url}/user.html?username=${post.username}`
            username.id = "username";
            username.innerText = post.username;

            const follow = document.createElement('a');
            follow.id = 'follow';
            follow.innerText = post.has_followed ? "followed" : "follow";

            follow.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (follow.textContent == 'follow') {
                    axiosInstance.post("/followings/follow", { username: post.username })
                        .then(res => {
                            if (res.status === 200) {
                                follow.classList.toggle('followed');
                                location.reload()
                            }
                        })
                        .catch(error => {
                            console.error("Follow qilishda xatolik:", error);
                        });
                }
                else {
                    axiosInstance.post("/followings/unfollow", { username: post.username })
                        .then(res => {
                            if (res.status === 200) {
                                follow.classList.toggle('followed');
                                location.reload()
                            }
                        })
                        .catch(error => {
                            console.error("Follow qilishda xatolik:", error);
                        });
                }
            });

            cardProfile.appendChild(profileImg);
            cardProfile.appendChild(username);
            cardProfile.appendChild(follow);

            const cardText = document.createElement("div");
            cardText.className = "card-text";

            const textParagraph = document.createElement("p");
            textParagraph.className = "card-p";
            textParagraph.innerText = post.text;

            const cardImg = document.createElement("img");
            cardImg.id = "card-img";
            cardImg.src = post.image;
            cardImg.alt = "";

            cardText.appendChild(textParagraph);
            cardText.appendChild(cardImg);

            const cardIndicators = document.createElement("div");
            cardIndicators.className = "card-idntucators";
            cardIndicators.style.display = 'flex'
            cardIndicators.style.gap = "20px"

            const cardLike = document.createElement("div");
            cardLike.className = "card-like";

            const likeImg = document.createElement("img");
            likeImg.src = "./images/heart-solid (3).svg";
            likeImg.alt = "img";

            const likeText = document.createElement("p");
            likeText.innerText = post.likes;
            if (post.has_liked == true) {
                likeImg.classList.value = 'liked'
            }
            likeImg.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                axiosInstance.post("/posts/like", { post_id: card.id })
                    .then(res => {
                        if (res.data.success) {
                            likeText.innerText = res.data.likes;
                        }
                        location.reload();
                    })
                    .catch(error => {
                        console.error("Like qo'shishda xatolik:", error);
                    });
            });

            cardLike.appendChild(likeImg);
            cardLike.appendChild(likeText);
            cardIndicators.appendChild(cardLike);

            const cardComment = document.createElement("div");
            cardComment.className = "card-comment";

            const commentImg = document.createElement("img");
            commentImg.src = "./images/comment-solid.svg";
            commentImg.alt = "Comment";

            const commentText = document.createElement("p");
            commentText.id = "b"
            commentText.innerText = post.comments

            cardComment.appendChild(commentImg);
            cardComment.appendChild(commentText);
            cardIndicators.appendChild(cardComment);

            card.appendChild(cardProfile);
            card.appendChild(cardText);
            card.appendChild(cardIndicators);

            cardsContainer.appendChild(card);
        });
    }).catch(error => {
        console.error("Xatolik yuz berdi:", error);
    });


}
window.addEventListener('DOMContentLoaded', (e) => {
    mes()
})