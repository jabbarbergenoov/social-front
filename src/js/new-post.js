import axios from "axios";
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
const sendImage = () => {

    const file = fileInput.files[0]
    if (!file) {
        return
    }

    const formData = new FormData();
    formData.append('file', file)
    axiosInstance.post('http://192.168.1.25:8000/image/', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then((res) => {
        console.log(res.data.image_id);
        localStorage.setItem('image_id', res.data.image_id)
    }).catch(err=>{
        console.log(err);
    })
}

form.addEventListener('submit', async(e)=> {
    e.preventDefault();
    
    if (fileInput.value) {
       const image_id = JSON.parse(localStorage.getItem('image_id'))
       const text =document.getElementById('text').value;
       console.log(image_id);
       axiosInstance.post('http://192.168.1.25:8000/posts/upload', {
        text:text,
        image_id:image_id
       })
    }
})