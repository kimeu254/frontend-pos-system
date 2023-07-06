<script setup>
import CardComponent from "@/components/global/CardComponent.vue";
import TextInput from "@/components/global/TextInput.vue";
import {DEFAULT_UPLOAD_IMG} from "@/image";
import {ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2";

let name = ref(null)
let pickedImage = ref(null)
let url = ref(null)
let errors = ref([])
let processing = ref(false)

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

        let res = await axios.post('api/category/new', data)

        name.value = ''
        pickedImage.value = ''
        url.value = ''

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
</script>

<template>
    <h5>New Category</h5>
    <div class="row my-5">
        <CardComponent col-class="col-lg-6" label="Create Category">
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
                            <img v-else :src="DEFAULT_UPLOAD_IMG" alt="Profile" class="img-fluid rounded profile-img"/>
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