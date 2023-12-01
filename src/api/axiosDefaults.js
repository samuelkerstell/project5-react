import axios from "axios"

axios.defaults.baseURL = 'https://project-portfolio-5-sam-7342558136fc.herokuapp.com/'
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;