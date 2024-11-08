
import "../sass/new-post.scss";
import { axiosInstance } from "./request";
const fileInput = document.getElementById("file-upload");
const preview = document.getElementById("preview");

fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        alert("Iltimos, rasm faylini tanlang.");
    }
});
const form = document.getElementById('form')

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (fileInput.value) {
        const file = fileInput.files[0]
        if (!file) {
            return
        }

        const formData = new FormData();
        formData.append('file', file)
        axiosInstance.post('/image/', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((res) => {

            const text = document.getElementById('text').value;
            axiosInstance.post('/posts/upload', {
                text: text,
                image_id: res.data.image_id
            }).then(res => {
                if (res.status === 200) {
                    window.location.href = 'index.html';
                }
            })
        })
            .catch(err => {
                console.log(err);
            })
    }
})