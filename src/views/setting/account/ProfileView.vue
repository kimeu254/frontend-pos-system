<script setup>
import {onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user-store";
import axios from "axios";
import CardComponent from "@/components/global/CardComponent.vue";
import TextInput from "@/components/global/TextInput.vue";
import Swal from "sweetalert2";

const userStore = useUserStore()

let id = ref(userStore.id)
let first_name = ref(null)
let last_name = ref(null)
let email = ref(null)
let phone = ref(null)
let image = ref(null)
let role = ref(null)
let pickedImage = ref(null)
let url = ref(null)
let errors = ref([])
let processing = ref(false)


onMounted(async () => {
    await userStore.fetchUser()
    id.value = userStore.id || null
    first_name.value = userStore.fname || null
    last_name.value = userStore.lname || null
    email.value = userStore.email || null
    phone.value = userStore.phone || null
    role.value = userStore.role || null
    image.value = userStore.image || null
})

const getUploadedImage = (e) => {
    console.log(e.target.files[0]);
    pickedImage.value = e.target.files[0]
    url.value = URL.createObjectURL(pickedImage.value)
}

const onSubmit = async () => {

    errors.value = []

    try
    {
        processing.value = true

        let data = new FormData();

        data.append('first_name', first_name.value || '')
        data.append('last_name', last_name.value || '')
        data.append('phone', phone.value || '')
        data.append('email', email.value || '')
        data.append('image', pickedImage.value || '')


        let res = await axios.post('api/user/profile/update/' + id.value + '?_method=PUT', data)

        await userStore.fetchUser()

        await Swal.fire({
            icon: 'success',
            title: res.data.message,
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            iconColor: '#fff',
            background: '#13DEB9',
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

const deletePicture = async (id) => {
    try
    {
        await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((response) => {
            if (response.isConfirmed)
            {

                axios.delete('api/user/profile/image/remove/' + id).then((res) => {
                    Swal.fire({
                        title: 'Deleted!',
                        text: res.data.message,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })

                userStore.fetchUser()

            }
            else if (response.dismiss === Swal.DismissReason.cancel)
            {
                Swal.fire({
                    title: 'Canceled',
                    text: 'Your imaginary file is safe :)',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    catch (err)
    {
        console.log(err)
        await Swal.fire({
            title: 'Error',
            icon: 'error',
            text: err.response.data.message,
            showConfirmButton: true,
            confirmButtonColor: "#FA896B",
        })
    }
}

</script>

<template>
    <h3>Profile</h3>
    <div class="row my-5">
        <CardComponent col-class="col-lg-4">
            <template #content>
                <div class="text-center mb-3">
                    <img :src="userStore.image"
                         alt="profile-img"
                         class="img-fluid rounded-circle mb-3"
                         width="150" height="150"
                    />
                    <h4>{{first_name}} {{last_name}}</h4>
                    <p>{{role}}</p>
                    <div class="pt-2">
                        <p>
                            <span class="fw-bolder">Email: </span>
                            <span class="text-info">{{email}}</span>
                        </p>
                        <p>
                            <span class="fw-bolder">Phone: </span>
                            <span class="text-info">{{phone}}</span>
                        </p>
                    </div>
                </div>
            </template>
        </CardComponent>
        <CardComponent col-class="col-lg-8" label="Edit Profile">
            <template #content>
                <form class="row" @submit.prevent="onSubmit">
                    <TextInput
                            div-class="col-md-6 mb-3"
                            label="First Name"
                            input-type="text"
                            v-model:input="first_name"
                            :error="errors.first_name ? errors.first_name[0] : ''"
                    />
                    <TextInput
                            div-class="col-md-6 mb-3"
                            label="Last Name"
                            input-type="text"
                            v-model:input="last_name"
                            :error="errors.last_name ? errors.last_name[0] : ''"
                    />
                    <TextInput
                            label="Email"
                            div-class="col-md-6 mb-3"
                            input-type="email"
                            v-model:input="email"
                            :error="errors.email ? errors.email[0] : ''"
                    />
                    <TextInput
                            div-class="col-md-6 mb-3"
                            label="Phone"
                            input-type="text"
                            v-model:input="phone"
                            :error="errors.phone ? errors.phone[0] : ''"
                    />
                    <div class="mb-5">
                        <label for="profileImage" class="col-form-label">Profile Image</label>
                        <div class="d-flex align-items-end">
                            <div class="px-3">
                                <input type="file"
                                       class="form-control d-none"
                                       id="file-input"
                                       accept="image/x-png,image/jpeg,image/jpg"
                                       ref="fileInput"
                                       @change="getUploadedImage"
                                >
                                <label for="file-input" class="btn btn-primary btn-sm">
                                    <i class="bi bi-upload text-white"></i>
                                </label>
                                <a href="#" @click="deletePicture(id)" class="btn btn-danger btn-sm mx-2" title="Remove my profile image">
                                    <i class="bi bi-trash text-white"></i>
                                </a>
                            </div>
                            <img v-if="url" :src="url" alt="Profile" class="img-fluid rounded profile-img"/>
                            <img v-else :src="userStore.image" alt="Profile" class="img-fluid rounded profile-img"/>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary" :disabled="processing">
                        {{ processing ? "Please wait..." : "Save Changes"}}
                    </button>
                </form>
            </template>
        </CardComponent>
    </div>
</template>

<style lang="css" scoped>
.profile-img {height: 100px; width: 100px}
</style>