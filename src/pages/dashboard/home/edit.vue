<template>
  <div class="container pt-4">
    <div v-if="inventories?.loading" class="row">
      <div class="col-12">
        <Loader
          containerClass="d-flex gap-1 flex-wrap justify-content-between"
          skeletonClass="mb-2 rounded"
          height="70px"
          width="49%"
          :tableCount="10"
        />
      </div>
    </div>
    <Inventory v-else :inventory="inventories?.inventory" />
  </div>
</template>

<script setup>
import Inventory from '@/components/page/Inventory.vue'
import { useInventoryStore } from '@/stores/inventory'
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const inventories = useInventoryStore()

onBeforeMount(async () => {
  const inventoryId = route?.params?.id
  if (inventoryId) await inventories.getInventory(inventoryId)
})
</script>
