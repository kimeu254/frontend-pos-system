<script setup>
import SidebarComponent from "@/components/SidebarComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
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
        <!-- Sidebar Start -->
       <SidebarComponent/>
        <!--  Sidebar End -->
        <!--  Main wrapper -->
        <div class="body-wrapper">
            <!--  Header Start -->
            <HeaderComponent/>
            <!--  Header End -->
            <div class="container-fluid">
                <router-view></router-view>
                <FooterComponent/>
            </div>
        </div>
    </div>
</template>