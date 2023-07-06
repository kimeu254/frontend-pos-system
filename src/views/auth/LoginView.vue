<script setup>
import AuthComponent from "@/components/AuthComponent.vue";
import TextInput from "@/components/global/TextInput.vue";
import {ref} from "vue";
import Swal from "sweetalert2";
import axios from "axios";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user-store";

let errors = ref([])
let email = ref(null)
let password = ref(null)
let processing = ref(false)

const router = useRouter()
const userStore = useUserStore()

const login = async () => {

    errors.value = []

    try
    {
        processing.value = true

        let res = await axios.post('api/user/login', {
            email: email.value,
            password: password.value
        })

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token

        userStore.setUserDetails(res)

        await router.push({name:'dashboard'}).then(() => {
            Swal.fire({
                icon: 'success',
                title: res.data.message,
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                iconColor: '#fff',
                background: '#13DEB9',
            })
        })

    }
    catch (err)
    {
        if (err.response.data.errors)
        {
            errors.value = err.response.data.errors
        }
        else
        {
            await Swal.fire({
                icon: 'error',
                title: err.response.data.message,
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                iconColor: '#fff',
                background: '#FA896B',
            })
        }
    }
    finally
    {
        processing.value = false
    }
}
</script>

<template>
    <AuthComponent>
        <template #form-title>Sign in to your account</template>
        <template #form>
            <form @submit.prevent="login">
                <TextInput
                    label="Email"
                    div-class="mb-3"
                    input-type="email"
                    v-model:input="email"
                    :error="errors.email ? errors.email[0] : ''"
                />
                <TextInput
                    label="Password"
                    div-class="mb-4"
                    input-type="password"
                    v-model:input="password"
                    :error="errors.password ? errors.password[0] : ''"
                />
                <div class="d-flex align-items-center justify-content-between mb-4">
                    <div class="form-check">
                        <input class="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" checked>
                        <label class="form-check-label text-dark" for="flexCheckChecked">
                            Remember me
                        </label>
                    </div>
                    <a class="text-primary fw-bold" href="#">Forgot Password ?</a>
                </div>
                <button type="submit" class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2" :disabled="processing">
                    {{ processing ? "Please wait..." : "Login" }}
                </button>
            </form>
        </template>
    </AuthComponent>
</template>