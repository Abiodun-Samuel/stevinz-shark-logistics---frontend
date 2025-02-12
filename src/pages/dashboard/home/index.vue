<template>
  <div class="container">
    <div class="row">
      <!-- navigation search bar and date picker  -->
      <div class="bg-white p-2 my-3 mx-0 rounded-2 shadow-sm row">
        <div class="col-lg-2 col-md-3 col-sm-4 col-6 my-1">
          <div class="form-floating w-100">
            <select
              class="form-select form-select-admin"
              id="floatingSelectStatus"
              aria-label="Floating label select example"
              v-model="filterParameters.user_id"
              @change="filterInventories"
            >
              <option value="">All</option>
              <option v-for="(item, index) in users?.users" :key="index + item.id" :value="item.id">
                {{ item.name }}
              </option>
            </select>
            <label for="floatingSelectStatus">Staff</label>
          </div>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 col-6 my-1">
          <div class="form-floating w-100">
            <select
              class="form-select form-select-admin"
              id="floatingSelectStatus1"
              aria-label="Floating label select example"
              v-model="filterParameters.payment_mode"
              @change="filterInventories"
            >
              <option value="">All</option>
              <option
                v-for="(item, index) in modeOfPayment"
                :key="index + item.value"
                :value="item.value"
              >
                {{ item.name }}
              </option>
            </select>
            <label for="floatingSelectStatus">Mode of Payment</label>
          </div>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 col-6 my-1">
          <div class="form-floating w-100">
            <select
              class="form-select form-select-admin"
              id="floatingSelectStatus1"
              aria-label="Floating label select example"
              v-model="filterParameters.location"
              @change="filterInventories"
            >
              <option value="">All</option>
              <option
                v-for="(item, index) in locations?.locations"
                :key="index + item?.id"
                :value="item.city"
              >
                {{ item.city }}
              </option>
            </select>
            <label for="floatingSelectStatus">Location</label>
          </div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-4 col-6 my-1">
          <div class="DatePicker" id="navbarSupportedContent">
            <VueDatePicker
              class="border-0 rounded-2"
              range
              :multi-calendars="{ solo: true }"
              v-model="date"
              :auto-position="false"
              placeholder="Select Date"
              :clearable="true"
              :preview-format="format"
              :format="format"
              :model-value="date"
              @update:model-value="filterInventories(date)"
            ></VueDatePicker>
          </div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-4 col-6 my-1">
          <div class="form-floating w-100">
            <input
              class="form-control"
              type="search"
              @keyup.enter="handleSearchInventories"
              v-model="filterParameters.search_query"
              placeholder="Search Inventory"
              aria-label="Search"
              id="floatingInput"
            />
            <label for="floatingInput">Search Inventory</label>
          </div>
        </div>
      </div>

      <div class="bg-white p-2 my-2 mx-0 rounded-2 shadow-sm d-flex flex-wrap gap-4">
        <router-link
          :to="{ name: 'dashboard.create' }"
          class="btn btn-info btn-sm d-flex align-items-center gap-2"
        >
          <Icon icon="zondicons:add-outline" />
          New Inventory</router-link
        >
        <button @click="clearFilter" class="btn btn-danger btn-sm d-flex align-items-center gap-2">
          <Icon icon="ic:sharp-clear" />
          Clear Filter
        </button>
        <button
          @click="downloadInventories"
          class="btn btn-success btn-sm d-flex align-items-center gap-2"
        >
          <Icon icon="icon-park-outline:download-one" />
          Dowload
        </button>
      </div>

      <!-- tables  -->
      <div class="card my-3">
        <div v-if="inventories.loading" class="card-body px-0 py-3">
          <Loader
            containerClass="px-2 pt-1 mx-1"
            skeletonClass="rounded mb-1"
            height="60px"
            width="100%"
            :tableCount="10"
          />
        </div>
        <div v-else class="card-body px-0 py-3">
          <div class="table-responsive p-0">
            <table class="table align-items-center mb-0">
              <thead>
                <tr>
                  <th class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3">
                    S/N
                  </th>
                  <th class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3">
                    Staff
                  </th>
                  <th class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3">
                    <div
                      :class="{
                        'fw-bolder text-info': filterParameters.order_column === 'shipment_number',
                      }"
                      @click="updateOrdering('shipment_number')"
                      class="d-flex justify-content-start align-items-center gap-2 cursor-pointer"
                    >
                      <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Shipment No
                      </div>
                      <div class="select-none">
                        <span>&uarr;</span>
                        <span>&darr;</span>
                      </div>
                    </div>
                  </th>
                  <th class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3">
                    <div
                      @click="updateOrdering('item')"
                      :class="{
                        'fw-bolder text-info': filterParameters.order_column === 'item',
                      }"
                      class="d-flex justify-content-start align-items-center gap-2 cursor-pointer"
                    >
                      <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </div>
                      <div class="select-none">
                        <span>&uarr;</span>
                        <span>&darr;</span>
                      </div>
                    </div>
                  </th>
                  <th class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3">
                    <div
                      class="d-flex justify-content-start align-items-center gap-2 cursor-pointer"
                      @click="updateOrdering('location')"
                      :class="{
                        'fw-bolder text-info': filterParameters.order_column === 'location',
                      }"
                    >
                      <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </div>
                      <div class="select-none">
                        <span>&uarr;</span>
                        <span>&darr;</span>
                      </div>
                    </div>
                  </th>

                  <th class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3">
                    Sender Details
                  </th>
                  <th class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3">
                    Reciever Details
                  </th>
                  <th class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3">
                    Volume
                  </th>
                  <th class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3">
                    <div
                      class="d-flex justify-content-start align-items-center gap-2 cursor-pointer"
                      @click="updateOrdering('payment_mode')"
                      :class="{
                        'fw-bolder text-info': filterParameters.order_column === 'payment_mode',
                      }"
                    >
                      <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Mode of Payment
                      </div>
                      <div class="select-none">
                        <span>&uarr;</span>
                        <span>&darr;</span>
                      </div>
                    </div>
                  </th>
                  <th class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3">
                    <div
                      class="d-flex justify-content-start align-items-center gap-2 cursor-pointer"
                      @click="updateOrdering('created_at')"
                      :class="{
                        'fw-bolder text-info': filterParameters.order_column === 'created_at',
                      }"
                    >
                      <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </div>
                      <div class="select-none">
                        <span>&uarr;</span>
                        <span>&darr;</span>
                      </div>
                    </div>
                  </th>
                  <th class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(inventory, index) in allInventories" :key="index">
                  <td class="align-middle text-center text-sm">
                    {{ inventory?.id }}
                  </td>
                  <td>
                    <div class="d-flex align-items-center justify-content-start py-1">
                      <img
                        :src="inventory?.user?.avatar ?? defaultAvatar"
                        class="avatar avatar-xs me-3 object-fit-cover"
                        :alt="inventory?.user?.first_name"
                      />
                      <p class="m-0 p-0">
                        <span class="small m-0 p-0">
                          {{ inventory?.user?.first_name }}
                          {{ inventory?.user?.last_name }}
                        </span>
                      </p>
                    </div>
                  </td>
                  <td class="align-middle">
                    <p class="m-0 p-0">
                      <span class="small m-0 p-0">
                        {{ inventory?.shipment_number }}
                      </span>
                    </p>
                  </td>
                  <td class="align-middle">
                    <p class="fw-bold small m-0">
                      {{ inventory?.item }}
                    </p>
                  </td>
                  <td class="align-middle">
                    <p class="m-0 p-0">
                      <span class="small m-0 p-0">
                        {{ inventory?.location }}
                      </span>
                    </p>
                  </td>
                  <td class="align-middle">
                    <p class="m-0 p-0">
                      <span class="small m-0 p-0">
                        {{ inventory?.sender }}
                      </span>
                    </p>
                  </td>
                  <td class="align-middle">
                    <p class="m-0 p-0">
                      <span class="small m-0 p-0">
                        {{ inventory?.receiver }}
                      </span>
                    </p>
                  </td>
                  <td class="align-middle">
                    <p class="m-0 p-0">
                      <span class="small m-0 p-0">
                        {{ inventory?.volume }}
                      </span>
                    </p>
                  </td>
                  <td class="align-middle">
                    <p class="m-0 p-0">
                      <span class="small m-0 p-0">
                        {{ inventory?.payment_mode }}
                      </span>
                    </p>
                  </td>
                  <td class="align-middle">
                    <p class="text-secondary text-xs m-0">
                      {{ formatWithoutTimeStamps(inventory?.created_at) }}
                    </p>
                  </td>
                  <td class="align-middle d-flex gap-2 flex-wrap">
                    <router-link
                      class="btn btn-sm btn-success"
                      :to="{ name: 'dashboard.edit', params: { id: inventory?.id } }"
                    >
                      <Icon icon="tabler:edit" />
                    </router-link>
                    <button
                      @click="
                        () => {
                          selectedInventoryId = inventory?.id
                          openDeleteInventoryModal = true
                        }
                      "
                      class="btn btn-sm btn-danger"
                    >
                      <Icon icon="material-symbols:delete-outline" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="w-100">
            <Pagination
              :data="inventories.inventories"
              :limit="20"
              @pagination-change-page="navigate"
              class="mt-4 ms-3 d-flex flex-wrap"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- delete modal  -->
  <Modal
    :show="openDeleteInventoryModal"
    :size="'modal-md'"
    @close="openDeleteInventoryModal = false"
    position="centered"
  >
    <template #header>
      <h5 class="modal-title text-danger">Delete Inventory</h5>
    </template>

    <template #body>
      <div class="my-3">
        <h6 class="text-center">Are you sure you want to delete this inventory?</h6>
        <p class="text-center fst-italic text-danger">
          <i>You won't be able to undo this!</i>
        </p>
      </div>
    </template>

    <template #footer>
      <Button
        @callFunction="handleDeleteInventory"
        type="button"
        :loading="inventories?.loading"
        class="btn btn-sm btn-danger d-block ms-auto"
        buttonText="Delete"
      />
    </template>
  </Modal>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { onMounted, ref, computed } from 'vue'
import { useInventoryStore } from '@/stores/inventory'
import { useUserStore } from '@/stores/user'
import { defaultAvatar, modeOfPayment } from '@/utils/constant'
import { formatWithoutTimeStamps } from '@/utils/helper'
import moment from 'moment'
import { useLocationStore } from '@/stores/locations'

const inventories = useInventoryStore()
const users = useUserStore()
const locations = useLocationStore()

const allInventories = computed(() => {
  return inventories?.inventories?.data ?? []
})
const openDeleteInventoryModal = ref(false)
const selectedInventoryId = ref(null)
const filterParameters = ref({
  search_query: '',
  payment_mode: '',
  location: '',
  order_column: '',
  order_state: '',
  start_date: '',
  end_date: '',
  user_id: '',
  page: 1,
})
const date = ref()
const format = (date) => {
  if (date[0] && date[1]) {
    let start = date[0]
    let end = date[1]
    let endDate = moment(end)
    let startDate = moment(start)

    let formattedStartDate = (filterParameters.value.start_date = startDate.format('YYYY/MM/DD'))
    let formattedEndDate = (filterParameters.value.end_date = endDate.format('YYYY/MM/DD'))

    return `${formattedStartDate} - ${formattedEndDate}`
  }
}

const clearFilter = async () => {
  for (let key in filterParameters.value) {
    filterParameters.value[key] = ''
  }
  await inventories.getInventories(filterParameters.value)
}

const updateOrdering = async (val) => {
  filterParameters.value.order_column = val
  filterParameters.value.order_state === 'desc'
    ? (filterParameters.value.order_state = 'asc')
    : (filterParameters.value.order_state = 'desc')
  await inventories.getInventories(filterParameters.value)
}

const filterInventories = async (date) => {
  if (!date) filterParameters.value.end_date = filterParameters.value.start_date = ''
  await inventories.getInventories(filterParameters.value)
}

const handleSearchInventories = async () => {
  await inventories.getInventories(filterParameters.value)
}

const handleDeleteInventory = async () => {
  await inventories?.deleteInventory(selectedInventoryId.value)
  selectedInventoryId.value = null
  openDeleteInventoryModal.value = false
}

const navigate = async (page) => {
  await inventories.getInventories({
    ...filterParameters.value,
    page,
  })
}

const downloadInventories = () => {
  let csvContent = 'data:text/csv;charset=utf-8,'
  // Add table headers
  csvContent +=
    'ID,Staff,Shipment No,Item,Location,Sender Details,Receiver Details,Volume,Mode of Payment,Date\n'
  // Add table rows
  allInventories.value?.forEach((inventory) => {
    csvContent += `${inventory?.id},${inventory?.user?.name},${inventory?.shipment_number},${inventory?.item},${inventory?.location},${inventory?.sender},${inventory?.receiver},${inventory?.volume},${inventory?.payment_mode},${formatWithoutTimeStamps(inventory?.created_at)}\n`
  })

  // Encode and create download link
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `inventory-${moment().format('YYYY/MM/DD')}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(async () => {
  await inventories.getInventories(filterParameters.value)
  await users.getAllUsers()
  await locations.getLocations()
})
</script>

<style>
.DatePicker input.dp__input {
  height: 58px !important;
  width: 100% !important;
}
</style>
