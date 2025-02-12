<template>
  <div
    class="page-wrapper"
    id="main-wrapper"
    data-layout="vertical"
    data-navbarbg="skin6"
    data-sidebartype="full"
    data-sidebar-position="fixed"
    data-header-position="fixed"
  >
    <DashboardSidebar />
    <div class="body-wrapper">
      <DashboardHeader />
      <div class="container-fluid">
        <router-view></router-view>
        <DashboardFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import DashboardSidebar from '@/components/includes/DashboardSidebar.vue'
import DashboardHeader from '@/components/includes/DashboardHeader.vue'
import DashboardFooter from '@/components/includes/DashboardFooter.vue'
import { dashboard } from '@/lib/dashboard'

onMounted(() => {
  dashboard()
})
</script>
