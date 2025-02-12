<template>
  <aside class="left-sidebar shadow-sm">
    <div>
      <div class="brand-logo d-flex align-items-center justify-content-between">
        <router-link to="/" title="Homepage: Stevinz Shark Logistics">
          <img
            src="/src/assets/images/logo/logo-circle.jpeg"
            alt="login logo"
            style="object-fit: contain"
            width="80px"
            class="img-fluid shadow-sm rounded"
          />
        </router-link>
        <div class="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
          <Icon icon="material-symbols:dashboard-outline-rounded" />
        </div>
      </div>

      <hr class="m-0 horizontal dark" />
      <nav class="sidebar-nav scroll-sidebar" data-simplebar="">
        <ul id="sidebarnav">
          <li class="nav-small-cap">
            <span class="hide-menu text-xs font-weight-bold text-info">Home</span>
          </li>
          <li v-if="auth?.isSuperAdmin" class="sidebar-item">
            <router-link class="sidebar-link" :to="{ name: 'admin.index' }" aria-expanded="false">
              <span>
                <Icon icon="ri:admin-line" />
              </span>
              <span class="hide-menu">Admin</span>
            </router-link>
          </li>
          <template v-if="auth?.isSuperAdmin || auth?.isAdmin">
            <li class="sidebar-item">
              <router-link
                class="sidebar-link"
                :to="{ name: 'shipment.index' }"
                aria-expanded="false"
              >
                <span>
                  <Icon icon="streamline:shipment-download" color="text-info" />
                </span>
                <span class="hide-menu">Track Shipment</span>
              </router-link>
            </li>
            <li class="sidebar-item">
              <router-link
                class="sidebar-link"
                :to="{ name: 'dashboard.index' }"
                aria-expanded="false"
              >
                <span>
                  <Icon icon="stash:dashboard-duotone" />
                </span>
                <span class="hide-menu">All Inventories</span>
              </router-link>
            </li>
            <li class="sidebar-item">
              <router-link
                class="sidebar-link"
                :to="{ name: 'dashboard.create' }"
                aria-expanded="false"
              >
                <span>
                  <Icon icon="stash:dashboard-duotone" />
                </span>
                <span class="hide-menu">New Inventory</span>
              </router-link>
            </li>
          </template>
          <li class="sidebar-item mt-5">
            <Button
              @callFunction="auth?.logout"
              type="button"
              :loading="auth?.loading"
              class="btn btn-outline-danger btn-sm d-flex gap-1"
            >
              <Icon icon="material-symbols:logout" /> Logout
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { dashboard } from '@/lib/dashboard'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

const auth = useAuthStore()
onMounted(() => {
  dashboard()
})
</script>
