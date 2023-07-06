<script setup>
import CardComponent from "@/components/global/CardComponent.vue";
import TextInput from "@/components/global/TextInput.vue";
import {API_BRANDS_URL, DEFAULT_UPLOAD_IMG} from "@/image";
import {onMounted, ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import {useRoute} from "vue-router";

let name = ref(null)
let pickedImage = ref(null)
let url = ref(null)
let image = ref(null)
let errors = ref([])
let processing = ref(false)

const route = useRoute()
const id = route.params.id

onMounted(async () => {
    await getBrand()
})

const getBrand = async () => {
    try
    {
        let res = await axios.get('api/brand/' + id)
        console.log(res)
        name.value = res.data.brand.name
        if (res.data.brand.image)
        {
            image.value = API_BRANDS_URL+res.data.brand.image
        }
        else
        {
            image.value = DEFAULT_UPLOAD_IMG
        }
    }
    catch (err)
    {
        console.log(err)
        await Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            toast: true,
            showConfirmButton: false,
            position: 'top',
            timer: 3000,
            timerProgressBar: true,
            iconColor: '#fff',
            background: '#FA896B',
        })
    }
}

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

        data.append('name', name.value || '')
        data.append('image', pickedImage.value || '')

        let res = await axios.post('api/brand/edit/' + id + '?_method=PUT', data)

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
                axios.delete('api/brand/image/remove/' + id).then((res) => {
                    Swal.fire({
                        title: 'Deleted!',
                        text: res.data.message,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    pickedImage.value = ''
                    url.value = ''
                    image.value = DEFAULT_UPLOAD_IMG
                    getBrand()
                })
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
    <h5>Edit Brand</h5>
    <div class="row my-5">
        <CardComponent col-class="col-lg-6" label="Update Brand">
            <template #content>
                <form class="row" @submit.prevent="onSubmit">
                    <TextInput
                            label="Name"
                            div-class="col-12 mb-3"
                            input-type="text"
                            v-model:input="name"
                            :error = "errors.name ? errors.name[0] : ''"
                    />
                    <div class="mb-5">
                        <label for="profileImage" class="col-form-label">Image</label>
                        <div class="d-flex align-items-end">
                            <img v-if="url" :src="url" alt="Profile" class="img-fluid rounded profile-img"/>
                            <img v-else :src="image" alt="Profile" class="img-fluid rounded profile-img"/>
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