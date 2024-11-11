import "../sass/post.scss";
import { axiosInstance } from "./request";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);

axiosInstance.get(`/posts/${id}`).then(res => {
    console.log(res);
    const container = document.createElement("div");
    container.className = "container";

    const card = document.createElement("div");
    card.className = "card";

    const cardProfile = document.createElement("div");
    cardProfile.className = "card-profile";

    const profileImg = document.createElement("img");
    if (res.data.user_image) {
        profileImg.src = res.data.user_image
    } else {
        profileImg.src = "./images/user-solid (1).svg";
    }
    const profileLink = document.createElement("a");
    profileLink.href = "#";
    profileLink.innerText = res.data.username;

    cardProfile.appendChild(profileImg);
    cardProfile.appendChild(profileLink);

    const cardImg = document.createElement("div");
    cardImg.className = "card-img";

    const img = document.createElement("img");
    img.src = res.data.image || null;
    if (img.src === null) {
        img.style.border = 'none'
    }
    img.alt = "";

    cardImg.appendChild(img);

    const cardText = document.createElement('div');
    cardText.className = 'card-text';
    cardText.innerHTML = res.data.text;

    const likeSection = document.createElement("div");
    likeSection.className = "like";

    const likeImg = document.createElement("img");
    likeImg.src = "./images/heart-solid (3).svg";
    likeImg.alt = "";

    const likeText = document.createElement("p");
    likeText.innerText = "Like";
    likeText.innerHTML = res.data.likes;
    if (res.data.has_liked === true) {
        likeImg.classList.value = 'liked';
    }

    likeImg.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        axiosInstance.post("/posts/like", { post_id: id })
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

    likeSection.appendChild(likeImg);
    likeSection.appendChild(likeText);

    const commentSection = document.createElement("div");
    commentSection.className = "coment";

    const form = document.createElement("form");
    form.id = "form_coment";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "comment";
    form.appendChild(input);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerText = "Submit";
    form.appendChild(submitButton);

    commentSection.appendChild(form);

    const comments = document.createElement("div");
    comments.className = "coments";

    function addCommentToDOM(comment) {
        const commentUserContainer = document.createElement("div");
        commentUserContainer.style.display = 'flex';
        commentUserContainer.style.alignItems = 'center';
        commentUserContainer.style.marginBottom = '10px';

        const commentUserImg = document.createElement("img");
        if (comment.user_img) {
            commentUserImg.src = comment.user_img
        } else {
            commentUserImg.src = "./images/user-solid (1).svg";
            commentUserImg.alt = "User Image";
        }
        commentUserImg.style.width = '30px';
        commentUserImg.style.height = '30px';
        commentUserImg.style.borderRadius = '50%';

        const commentUser = document.createElement("a");
        commentUser.style.color = '#fff';
        commentUser.style.fontSize = '15px';
        commentUser.style.marginLeft = '10px';
        commentUser.innerText = comment.username;
        commentUser.href = "#";

        commentUserContainer.appendChild(commentUserImg);
        commentUserContainer.appendChild(commentUser);

        const commentText = document.createElement('p');
        commentText.className = 'gg';
        commentText.style.marginTop = '5px';
        commentText.innerHTML = comment.content;

        const commentDate = document.createElement("p");
        commentDate.style.fontSize = '12px';
        commentDate.style.color = '#ccc';
        commentDate.style.marginTop = '5px';
        commentDate.innerText = `Posted on: ${new Date(comment.created_at).toLocaleString()}`;

        const comea = document.createElement('a');
        comea.href = '#'
        const commentMenuImg = document.createElement("img");
        commentMenuImg.src = "./images/trash-solid.svg";
        commentMenuImg.alt = "Comment Menu";
        commentMenuImg.style.position = 'absolute';
        commentMenuImg.style.top = '15px';
        commentMenuImg.style.right = '15px';

        comea.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            axiosInstance.delete(`/comments/${comment.id}`)
                .then((res) => {
                    if (res.data.success) {
                        newComment.remove()
                    }
                    location.reload()
                }).catch((error) => {
                    console.error("Izohni o'chirishda xatolik:", error);
                });
        })

        comea.appendChild(commentMenuImg);

        const newComment = document.createElement("div");
        newComment.className = "comment";
        newComment.style.position = 'relative';
        newComment.style.marginBottom = '15px';
        newComment.style.padding = '10px';
        newComment.style.border = '1px solid #ddd';
        newComment.style.borderRadius = '8px';
        newComment.style.backgroundColor = '#2c2c2c';

        newComment.appendChild(commentUserContainer);
        newComment.appendChild(commentText);
        newComment.appendChild(commentDate);
        newComment.appendChild(comea);

        comments.appendChild(newComment);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const commentInput = form.querySelector("input");
        const commentText = commentInput.value.trim();

        if (commentText !== "") {
            axiosInstance
                .post("/comments", { post_id: id, content: commentText })
                .then((res) => {
                    if (res.data.success) {
                        addCommentToDOM(res.data.comment);
                        commentInput.value = '';
                    }
                    location.reload()
                })
                .catch((error) => {
                    console.error("Izoh yuborishda xatolik:", error);
                });
        }
    });
    axiosInstance
        .get(`/comments/${id}`)
        .then(res => {
            if (res.data && Array.isArray(res.data)) {
                res.data.forEach(comment => addCommentToDOM(comment));
            } else {
                console.log('No comments found or incorrect response format');
            }
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
    commentSection.appendChild(comments);

    card.appendChild(cardProfile);
    card.appendChild(cardText);
    card.appendChild(cardImg);
    card.appendChild(likeSection);
    card.appendChild(commentSection);

    container.appendChild(card);
    document.body.appendChild(container);
});
