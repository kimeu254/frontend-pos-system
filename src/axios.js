import axios from "axios";
import {MY_API_URL} from "@/service";
import router from "@/router";
import {useUserStore} from "@/stores/user-store";

const user = JSON.parse(window.localStorage.getItem('user'))

axios.defaults.baseURL = MY_API_URL

if (user) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
}

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.data.message === 'Unauthenticated.') {
            router.push({name: 'login'}).then(() => {
                useUserStore().clearUser()
            })
        }
        return Promise.reject(error)
    }
)
