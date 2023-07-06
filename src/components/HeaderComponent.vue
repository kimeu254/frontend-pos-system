<script setup>
import {onMounted} from "vue";
import {useUserStore} from "@/stores/user-store";
import {useRouter} from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

onMounted( async () => {
    await toggleSideBar()
})
const toggleSideBar = () =>
{

    // eslint-disable-next-line no-undef
    $(function () {
        // Admin Panel settings

        //****************************
        /* This is for the mini-sidebar if width is less than 1170*/
        //****************************
        var setsidebartype = function () {
            var width =
                window.innerWidth > 0 ? window.innerWidth : this.screen.width;
            if (width < 1199) {
                // eslint-disable-next-line no-undef
                $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
                // eslint-disable-next-line no-undef
                $("#main-wrapper").addClass("mini-sidebar");
            } else {
                // eslint-disable-next-line no-undef
                $("#main-wrapper").attr("data-sidebartype", "full");
                // eslint-disable-next-line no-undef
                $("#main-wrapper").removeClass("mini-sidebar");
            }
        };
        // eslint-disable-next-line no-undef
        $(window).ready(setsidebartype);
        // eslint-disable-next-line no-undef
        $(window).on("resize", setsidebartype);
        //****************************
        /* This is for sidebartoggler*/
        //****************************
        // eslint-disable-next-line no-undef
        $(".sidebartoggler").on("click", function () {
            // eslint-disable-next-line no-undef
            $("#main-wrapper").toggleClass("mini-sidebar");
            // eslint-disable-next-line no-undef
            if ($("#main-wrapper").hasClass("mini-sidebar")) {
                // eslint-disable-next-line no-undef
                $(".sidebartoggler").prop("checked", !0);
                // eslint-disable-next-line no-undef
                $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
            } else {
                // eslint-disable-next-line no-undef
                $(".sidebartoggler").prop("checked", !1);
                // eslint-disable-next-line no-undef
                $("#main-wrapper").attr("data-sidebartype", "full");
            }
        });
        // eslint-disable-next-line no-undef
        $(".sidebartoggler").on("click", function () {
            // eslint-disable-next-line no-undef
            $("#main-wrapper").toggleClass("show-sidebar");
        });
    })
}

const router = useRouter()
const userStore = useUserStore()

const logout = async () => {
    try
    {
        let res = await axios.post('api/user/logout')

        userStore.clearUser()

        await router.push({name:'login'}).then(() => {
            Swal.fire({
                title: res.data.message,
                icon: 'success',
                toast: true,
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                iconColor: '#fff',
                background: '#13DEB9',
                position: 'top',
            })
        })
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
            timer: 5000,
            timerProgressBar: true,
            iconColor: '#fff',
            background: '#FA896B',
        })
    }
}
</script>

<template>
    <header class="app-header">
        <nav class="navbar navbar-expand-lg navbar-light">
            <ul class="navbar-nav">
                <li class="nav-item d-block d-xl-none">
                    <a class="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" href="javascript:void(0)">
                        <i class="ti ti-menu-2"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-icon-hover" href="javascript:void(0)">
                        <i class="ti ti-bell-ringing"></i>
                        <div class="notification bg-primary rounded-circle"></div>
                    </a>
                </li>
            </ul>
            <div class="navbar-collapse justify-content-end px-0" id="navbarNav">
                <ul class="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                    <a href="#"
                       target="_blank" class="btn btn-primary rounded-circle">
                        POS
                    </a>
                    <li class="nav-item dropdown">
                        <a class="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown"
                           aria-expanded="false">
                            <img :src="userStore.image" alt="" width="35" height="35" class="rounded-circle"/>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                            <div class="message-body">
                                <div class="text-center">
                                    <h5>{{userStore.fname}} {{userStore.lname}}</h5>
                                    <p class="text-secondary">{{userStore.role}}</p>
                                </div>
                                <router-link :to="{name:'profile'}" class="d-flex align-items-center gap-2 dropdown-item">
                                    <i class="ti ti-user fs-6"></i>
                                    <p class="mb-0 fs-3">My Profile</p>
                                </router-link>
                                <router-link :to="{name:'change-password'}" class="d-flex align-items-center gap-2 dropdown-item">
                                    <i class="ti ti-key fs-6"></i>
                                    <p class="mb-0 fs-3">My Account</p>
                                </router-link>
                                <a href="#" @click="logout" class="btn btn-outline-primary mx-3 mt-2 d-block">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>
