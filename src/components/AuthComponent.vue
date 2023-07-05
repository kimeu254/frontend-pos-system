<script setup>
import {APP_LOGO} from "@/image";
</script>

<template>
  <!--  Body Wrapper -->
    <div class="page-wrapper"
         id="main-wrapper"
         data-layout="vertical"
         data-navbarbg="skin6"
         data-sidebartype="full"
         data-sidebar-position="fixed"
         data-header-position="fixed"
    >
        <div class="
                position-relative
                overflow-hidden
                radial-gradient
                min-vh-100
                d-flex
                align-items-center
                justify-content-center"
        >
            <div class="d-flex align-items-center justify-content-center w-100">
                <div class="row justify-content-center w-100">
                    <div class="col-md-8 col-lg-6 col-xxl-3">
                        <div class="card mb-0">
                            <div class="card-body">
                                <a href="#" class="text-nowrap logo-img text-center d-block py-3 w-100">
                                    <img :src="APP_LOGO" width="180" alt="logo">
                                </a>
                                <p class="text-center">
                                    <slot name="form-title"></slot>
                                </p>
                                <slot name="form"></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>