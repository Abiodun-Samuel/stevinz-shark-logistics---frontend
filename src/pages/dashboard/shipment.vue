<template>
  <div class="bg-white p-3 rounded shadow-sm my-3">
    <p class="lead fw-bold text-info">Shipment</p>
    <hr />

    <div class="row d-flex justify-content-between">
      <div class="col-lg-5 col-md-6 my-3">
        <p>Get Shipment details</p>

        <div class="input-group">
          <input
            type="text"
            class="form-control"
            v-model="shipment_number"
            placeholder="Shipment No"
            aria-label="Shipment No"
            aria-describedby="button-addon2"
          />
          <Button
            type="button"
            @callFunction="handleTrackInventory"
            id="button-addon2"
            :loading="inventories?.loading"
            class="btn btn-primary"
            buttonText="Track Shipment"
          />
        </div>
      </div>
      <div class="col-lg-5 col-md-6 my-3">
        <p>Update Shipment events</p>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            v-model="events"
            placeholder="Shipment No"
            aria-label="Shipment No"
            aria-describedby="button-addon4"
          />
          <Button
            type="button"
            @callFunction="handleUpdateEvents"
            id="button-addon4"
            :loading="inventories.loading"
            class="btn btn-primary"
            buttonText="Update"
          />
        </div>
      </div>
    </div>
    <hr />

    <div class="row">
        <div class="col-lg-7 col-md-6">
          <div class="mt-5">
            <p class="small my-0 py-0 text-info">Shipment details</p>
            <hr />
            <p class="small my-0 py-0 text-info">
              {{ inventories?.trackedInventory?.shipment_number }}
            </p>

            <p class="small my-0 py-0">Item: {{ inventories?.trackedInventory?.item }}</p>
            <p class="small my-0 py-0">
              Reciever Details: {{ inventories?.trackedInventory?.receiver }}
            </p>
            <p class="small my-0 py-0">
              Sender Details: {{ inventories?.trackedInventory?.sender }}
            </p>
            <p class="small my-0 py-0">Location: {{ inventories?.trackedInventory?.location }}</p>
            <p class="small my-0 py-0 text-info">Events</p>
            <hr />
            <ul class="">
              <li
                class="small my-0 py-0 ms-3"
                v-for="(inventory, index) in inventories?.trackedInventory?.timelines"
                :key="index"
              >
                {{ index + 1 }}. {{ inventory?.events }}
              </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useInventoryStore } from '@/stores/inventory'
import { toastError } from '@/utils/helper'
import { ref } from 'vue'

const shipment_number = ref('')
const events = ref('')
const inventories = useInventoryStore()

const handleTrackInventory = async () => {
  if (!shipment_number.value?.length) return toastError('Please enter shipment number')
  await inventories?.trackInventory({
    shipment_number: shipment_number.value,
  })
}

const handleUpdateEvents = async (data) => {
  if (!events.value?.length) return toastError('Please enter events details')
  await inventories?.createInventoryTimeline({
    shipment_number: inventories?.trackedInventory?.shipment_number,
    events: data?.events,
    inventory_id: inventories?.trackedInventory?.id,
    location: '',
  })
}
</script>
