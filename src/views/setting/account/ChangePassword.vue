<script setup>
import CardComponent from "@/components/global/CardComponent.vue";
import {ref} from "vue";
import TextInput from "@/components/global/TextInput.vue";
import Swal from "sweetalert2";
import axios from "axios";
import {useUserStore} from "@/stores/user-store";

const userStore = useUserStore()

let id = ref(userStore.id)
let old_password = ref(null)
let new_password = ref(null)
let new_password_confirm = ref(null)
let errors = ref([])
let processing = ref(false)

const onSubmit = async () => {

    errors.value = []

    try
    {
        processing.value = true

        let res = await axios.put('api/user/account/change-password/' + id.value, {
            old_password : old_password.value,
            new_password : new_password.value,
            new_password_confirmation : new_password_confirm.value
        })

        old_password.value = ''
        new_password.value = ''
        new_password_confirm.value = ''

        await Swal.fire({
            icon: 'success',
            title: res.data.message,
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            iconColor: '#fff',
            background: '#2eca6a',
        })
    }
    catch (err)
    {
        console.log(err)
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
    <h5>My Account</h5>
    <div class="row my-5">
        <CardComponent col-class="col-lg-6" label="Change My Password">
            <template #content>
                <form class="row" @submit.prevent="onSubmit">
                    <TextInput
                            label="Current Password"
                            div-class="col-12 mb-3"
                            input-type="password"
                            v-model:input="old_password"
                            :error = "errors.old_password ? errors.old_password[0] : ''"
                    />

                    <TextInput
                            label="New Password"
                            div-class="col-12 mb-3"
                            input-type="password"
                            v-model:input="new_password"
                            :error="errors.new_password ? errors.new_password[0] : ''"
                    />

                    <TextInput
                            label="Re-enter New Password"
                            div-class="col-12 mb-4"
                            input-type="password"
                            v-model:input="new_password_confirm"
                            :error="errors.new_password_confirm ? errors.new_password_confirm[0] : ''"
                    />
                    <button type="submit" class="btn btn-primary" :disabled="processing">
                        {{ processing ? "Please wait..." : "Change Password"}}
                    </button>
                </form>
            </template>
        </CardComponent>
    </div>
</template>