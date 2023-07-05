import {defineStore} from "pinia";
import axios from "axios";
import {API_PROFILE_URL, DEFAULT_PROFILE_IMG} from "@/image";

export const useUserStore = defineStore('user', {
    state: () => ({
        id: null,
        token: null,
        fname: null,
        lname: null,
        email: null,
        phone: null,
        image: null,
        role: null
    }),

    actions: {
        setUserDetails(res) {
            this.$state.id = res.data.user.id
            this.$state.token = res.data.access_token
            this.$state.fname = res.data.user.first_name
            this.$state.lname = res.data.user.last_name
            this.$state.email = res.data.user.email
            this.$state.phone = res.data.user.phone
            this.$state.role = res.data.role
            this.$state.role = res.data.role
            if (res.data.user.image) {
                this.$state.image = API_PROFILE_URL + res.data.user.image
            } else {
                this.$state.image = DEFAULT_PROFILE_IMG
            }
        },

        async fetchUser() {
            let res = await axios.get('api/user/profile/' + this.$state.id)

            this.$state.id = res.data.user.id
            this.$state.fname = res.data.user.first_name
            this.$state.lname = res.data.user.last_name
            this.$state.phone = res.data.user.phone
            this.$state.email = res.data.user.email
            this.$state.role = res.data.role
            if (res.data.user.image) {
                this.$state.image = API_PROFILE_URL + res.data.user.image
            } else {
                this.$state.image = DEFAULT_PROFILE_IMG
            }
        },

        clearUser() {
            this.$state.id = null
            this.$state.token = null
            this.$state.fname = null
            this.$state.lname = null
            this.$state.email = null
            this.$state.phone = null
            this.$state.image = null
            this.$state.role = null
        }
    },

    persist: true
})