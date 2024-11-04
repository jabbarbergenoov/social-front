import axios from "axios";
import "../sass/global.scss"
axios.get('https://jsonplaceholder.typicode.com/todos/').then(res => {
    console.log(res.data)
})