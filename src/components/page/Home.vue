<template>
  <section id="hero" class="hero section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="hero-content" data-aos="fade-up" data-aos-delay="200">
            <div class="company-badge mb-4">
              <Icon icon="grommet-icons:validate" class="me-2" />
              Stevinz Shark Logistics
            </div>

            <h1 class="mb-4">
              Delivering Excellence
              <span class="accent-text">Across Nigeria</span>
            </h1>

            <p class="mb-4 mb-md-5">
              We provide seamless logistics solutions tailored to your needs. Whether it's local
              delivery or international shipping, we've got you covered. Let’s move your business
              forward—one shipment at a time.
            </p>

            <div class="hero-buttons col-lg-8">
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
                  buttonText="Track My Shipment"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="hero-image" data-aos="zoom-out" data-aos-delay="300">
            <img src="/src/assets/img/hero.svg" alt="Hero Image" class="img-fluid" />

            <div class="customers-badge">
              <div class="customer-avatars">
                <img src="/src/assets/img/avatar-1.webp" alt="Customer 1" class="avatar" />
                <img src="/src/assets/img/avatar-2.webp" alt="Customer 2" class="avatar" />
                <img src="/src/assets/img/avatar-3.webp" alt="Customer 3" class="avatar" />
                <img src="/src/assets/img/avatar-4.webp" alt="Customer 4" class="avatar" />
                <img src="/src/assets/img/avatar-5.webp" alt="Customer 5" class="avatar" />
                <span class="avatar more">12+</span>
              </div>
              <p class="mb-0 mt-2">1,000+ Trusted Clients</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row stats-row gy-4 mt-5" data-aos="fade-up" data-aos-delay="500">
        <div class="col-lg-3 col-md-6">
          <div class="stat-item">
            <div class="stat-icon">
              <Icon icon="oui:users" width="2em" />
            </div>
            <div class="stat-content">
              <p class="mb-0">1000+ Active Customers</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="stat-item">
            <div class="stat-icon">
              <Icon icon="subway:location" />
            </div>
            <div class="stat-content">
              <p class="mb-0">20+ Locations</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="stat-item">
            <div class="stat-icon">
              <Icon icon="fluent:document-100-16-regular" />
            </div>
            <div class="stat-content">
              <p class="mb-0">Excellent services</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="stat-item">
            <div class="stat-icon">
              <Icon icon="grommet-icons:validate" />
            </div>
            <div class="stat-content">
              <p class="mb-0">Tested & Trusted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Modal
    :show="openShipmentDetailsModal"
    :size="'modal-md'"
    @close="openShipmentDetailsModal = false"
    position="centered"
  >
    <template #header>
      <h5 class="modal-title text-danger">Shipment Details</h5>
    </template>

    <template #body>
      <div class="my-3">
        <p class="small my-0 py-0 text-info">
          {{ inventories?.trackedInventory?.shipment_number }}
        </p>

        <p class="small my-0 py-0">Item: {{ inventories?.trackedInventory?.item }}</p>
        <p class="small my-0 py-0">
          Reciever Details: {{ inventories?.trackedInventory?.receiver }}
        </p>
        <p class="small my-0 py-0">Sender Details: {{ inventories?.trackedInventory?.sender }}</p>
        <p class="small my-0 py-0">Location: {{ inventories?.trackedInventory?.location }}</p>
        <hr />
        <p class="small my-0 py-0 text-info">Events</p>
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
    </template>

    <template #footer>
      <Button
        @callFunction="openShipmentDetailsModal = false"
        type="button"
        class="btn btn-sm btn-outline-primary d-block ms-auto"
        buttonText="Close"
      />
    </template>
  </Modal>
</template>

<script setup>
import { useInventoryStore } from '@/stores/inventory'
import { ref } from 'vue'

const inventories = useInventoryStore()
const openShipmentDetailsModal = ref(false)

const shipment_number = ref('')

const handleTrackInventory = async () => {
  const res = await inventories?.trackInventory({
    shipment_number: shipment_number.value,
  })
  if (res) openShipmentDetailsModal.value = true
}
</script>
