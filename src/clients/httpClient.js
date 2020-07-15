import axios from 'axios';

axios.defaults.withCredentials = true;

const httpClient = axios.create({
    baseURL: process.env.VUE_APP_API_REMOTE_URL,
    // https://stackoverflow.com/a/5381626/11171240
    // "...  Apache's default is 5 seconds"
    timeout: 5000, // indicates, 1000ms ie. 1 second
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

export default httpClient