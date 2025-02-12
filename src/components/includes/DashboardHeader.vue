<template>
  <header class="app-header">
    <div class="container">
      <div class="row">
        <nav class="navbar navbar-expand-lg">
          <ul class="navbar-nav">
            <li class="nav-item d-block d-xl-none">
              <a
                class="nav-link sidebartoggler nav-icon-hover"
                id="headerCollapse"
                href="javascript:void(0)"
                >{{}}
                <Icon icon="healthicons:ui-menu-grid-outline" color="text-info" />
              </a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/" title="Homepage: Stevinz Shark Logistics">
                <img
                  class="img-fluid text-center ms-3"
                  src="/src/assets/images/logo/logo-box.jpeg"
                  alt="logo"
                />
              </router-link>
            </li>
          </ul>
          <div class="navbar-collapse px-0" id="navbarNav">
            <ul class="navbar-nav flex-row ms-auto align-items-center justify-content-end">
              <li class="nav-item">
                <p class="my-0 py-0 fs-4">{{ auth?.user?.first_name }}</p>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link nav-icon-hover d-flex align-items-center"
                  href="javascript:void(0)"
                  id="drop2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  >{{}}
                  <img
                    :src="auth?.user?.avatar ?? defaultAvatar"
                    :alt="auth?.user?.name"
                    style="object-fit: cover"
                    width="35"
                    height="35"
                    class="rounded-circle"
                  />
                </a>
                <div
                  class="dropdown-menu dropdown-menu-end dropdown-menu-animate-up p-3"
                  aria-labelledby="drop2"
                >
                  <div class="message-body">
                    <router-link
                      to="/dashboard/profile"
                      class="d-flex align-items-center gap-2 dropdown-item"
                    >
                      <Icon icon="gg:profile" color="text-info" />
                      <p class="mb-0 fs-3">My Profile</p>
                    </router-link>
                    <br />
                    <Button
                      @callFunction="auth.logout"
                      type="button"
                      :loading="auth.loading"
                      class="btn btn-outline-primary btn-sm w-100"
                      buttonText="Logout"
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { dashboard } from '@/lib/dashboard'
import { onMounted } from 'vue'
import { defaultAvatar } from '@/utils/constant'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

onMounted(() => {
  dashboard()
})
</script>

<style scoped></style>
