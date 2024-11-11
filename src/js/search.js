import '../sass/search.scss';
import { axiosInstance } from "./request"; // axiosInstance to'g'ri sozlanganini tekshiring

const form = document.getElementById('form');
const search = document.getElementById('search');
const resultsContainer = document.getElementById('results-container'); 

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = search.value; 
    if (username) {
        axiosInstance.get("/search", { 
            params: { username }
        }).then(res => {
            const results = res.data;
            displayResults(results);
        }).catch(error => {
            console.error("Xato:", error);
        });
    } else {
        console.log("Foydalanuvchi nomi kiritilmadi.");
    }
});

function displayResults(results) {
    resultsContainer.innerHTML = ''; 

    results.forEach(result => {
        const userElement = document.createElement('div');
        userElement.classList.add('user');

        const userImage = document.createElement('img');
        userImage.src = result.user_img;
        userImage.alt = result.username;
        userElement.appendChild(userImage);

        const userName = document.createElement('h3');
        userName.textContent = result.username;
        userElement.appendChild(userName);

        const followStatus = document.createElement('p');
        followStatus.textContent = result.has_followed ? "Sizni kuzatmoqda" : "Sizni kuzatmayapti";
        userElement.appendChild(followStatus);

        resultsContainer.appendChild(userElement);
    });
}
