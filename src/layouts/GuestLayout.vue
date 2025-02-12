<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div
      class="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between"
    >
      <span
        title="Homepage: Stevinz Shark Logistics"
        class="d-flex align-items-center me-auto me-xl-0"
      >
        <img
          src="/src/assets/images/logo/logo-circle.jpeg"
          alt="login logo"
          style="object-fit: contain"
          width="70px"
          class="img-fluid shadow-sm rounded-circle"
        />
      </span>

      <nav id="navmenu" class="navmenu">
        <ul>
          <li><router-link to="/" class="active">Home</router-link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <i class="mobile-nav-toggle d-xl-none">
          <Icon icon="healthicons:ui-menu-grid-outline" color="text-info" />
        </i>
      </nav>
      <router-link v-if="!auth?.isLoggedIn" class="btn-getstarted btn btn-info" to="/login"
        >Login</router-link
      >
      <router-link v-else class="btn-getstarted btn btn-success" :to="{ name: 'dashboard.index' }"
        >Dashboard</router-link
      >
    </div>
  </header>
  <router-view> </router-view>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>
<style>
@import '../assets/css/main.css';
</style>
