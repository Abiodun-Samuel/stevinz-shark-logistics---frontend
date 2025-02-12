<template>
  <div class="container">
    <div class="bg-white p-3 rounded shadow-sm my-3">
      <p class="lead fw-bold text-info">Users</p>
      <hr />
      <div class="row">
        <div class="col-lg-3">
          <div class="form-floating my-3">
            <Field
              name="user_role"
              as="select"
              v-model="user_role"
              @change="handleAssignUserRole"
              :validateOnBlur="false"
              class="form-select"
              id="floatingSelect"
              aria-label="Select location"
              placeholder="Select location"
            >
              <option v-for="(item, index) in roles" :key="index + item" :value="item">
                {{ item }}
              </option>
            </Field>
            <label for="floatingSelect">Assign role</label>
          </div>
        </div>
        <div class="col-lg-9" style="height: 350px; overflow-y: scroll">
          <div class="card">
            <div v-if="users.loading" class="card-body px-0">
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
                      <th
                        class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3"
                      >
                        S/N
                      </th>
                      <th
                        class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3"
                      >
                        Name
                      </th>
                      <th
                        class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3"
                      >
                        Email
                      </th>
                      <th
                        class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3"
                      >
                        Assigned Role
                      </th>
                      <th
                        class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3"
                      >
                        <div
                          class="d-flex justify-content-start align-items-center gap-2 cursor-pointer"
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
                      <th
                        class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(user, index) in users?.users" :key="index">
                      <td class="align-middle text-center text-sm">
                        {{ user?.id }}
                      </td>
                      <td class="align-middle">
                        <p class="m-0 p-0">
                          <span class="small m-0 p-0">
                            {{ user?.first_name }} {{ user?.last_name }}
                          </span>
                        </p>
                      </td>
                      <td class="align-middle">
                        <p class="m-0 p-0">
                          <span class="small m-0 p-0">
                            {{ user?.email }}
                          </span>
                        </p>
                      </td>
                      <td class="align-middle">
                        <p
                          class="fw-bold small m-0 p-0"
                          :class="
                            user?.roles[0] == 'superadmin'
                              ? 'text-danger'
                              : user?.roles[0] == 'admin'
                                ? 'text-info'
                                : 'text-success'
                          "
                        >
                          {{ user?.roles[0] }}
                        </p>
                      </td>
                      <td class="align-middle">
                        <p class="text-secondary text-xs m-0">
                          {{ formatWithoutTimeStamps(user?.created_at) }}
                        </p>
                      </td>
                      <td class="align-middle">
                        <div v-if="auth?.user?.email !== user?.email" class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            :value="user.id"
                            :disabled="auth?.user?.email === user?.email"
                            v-model="selectedUsers"
                            id="flexCheckDefault"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white p-3 rounded shadow-sm my-3">
      <p class="lead fw-bold text-info">Location</p>
      <hr />
      <div class="row">
        <div class="col-lg-4 col-md-5">
          <p>Save new location</p>
          <Form @submit="handleCreateLocation" :validation-schema="locationFormSchema">
            <div class="form-floating">
              <Field
                name="city"
                type="text"
                :validateOnBlur="false"
                class="form-control"
                id="floatingInput112"
                placeholder=""
              />
              <ErrorMessage name="city" class="text-danger" />
              <label for="floatingInput112" class="opacity-50">City</label>
            </div>
            <div class="flex items-center justify-end mt-4">
              <Button
                type="submit"
                :loading="locations.loading"
                buttonText="Save"
                class="btn btn-login d-flex justify-content-center align-items-center rounded-2 w-100 p-3"
              />
            </div>
          </Form>
        </div>
        <div class="col-lg-8 col-md-7" style="height: 350px; overflow-y: scroll">
          <div class="card">
            <div v-if="locations.loading" class="card-body px-0">
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
                      <th
                        class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3"
                      >
                        S/N
                      </th>
                      <th
                        class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3"
                      >
                        City
                      </th>
                      <th
                        class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3"
                      >
                        City Code
                      </th>
                      <th
                        class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3"
                      >
                        <div
                          class="d-flex justify-content-start align-items-center gap-2 cursor-pointer"
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
                      <th
                        class="text-left text-uppercase text-xxs font-weight-bolder opacity-7 ps-3"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(location, index) in locations?.locations" :key="index">
                      <td class="align-middle text-center text-sm">
                        {{ location?.id }}
                      </td>
                      <td class="align-middle">
                        <p class="m-0 p-0">
                          <span class="small m-0 p-0">
                            {{ location?.city }}
                          </span>
                        </p>
                      </td>
                      <td class="align-middle">
                        <p class="fw-bold small m-0">
                          {{ location?.city_code }}
                        </p>
                      </td>
                      <td class="align-middle">
                        <p class="text-secondary text-xs m-0">
                          {{ formatWithoutTimeStamps(location?.created_at) }}
                        </p>
                      </td>
                      <td class="align-middle d-flex gap-2 flex-wrap">
                        <button
                          @click="
                            () => {
                              selectedLocation = location
                              openUpdateLocationModal = true
                            }
                          "
                          class="btn btn-sm btn-success"
                        >
                          <Icon icon="tabler:edit" />
                        </button>

                        <button
                          @click="
                            () => {
                              selectedLocation = location
                              openDeleteLocationModal = true
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- delete modal  -->
  <Modal
    :show="openDeleteLocationModal"
    :size="'modal-md'"
    @close="openDeleteLocationModal = false"
    position="centered"
  >
    <template #header>
      <h5 class="modal-title text-danger">Delete Location</h5>
    </template>

    <template #body>
      <div class="my-3">
        <h6 class="text-center">Are you sure you want to delete this location?</h6>
        <p class="text-center fst-italic text-danger">
          <i>You won't be able to undo this!</i>
        </p>
      </div>
    </template>

    <template #footer>
      <Button
        @callFunction="handleDeleteLocation"
        type="button"
        :loading="locations?.loading"
        class="btn btn-sm btn-danger d-block ms-auto"
        buttonText="Delete"
      />
    </template>
  </Modal>
  <!-- update modal  -->
  <Modal
    :show="openUpdateLocationModal"
    :size="'modal-md'"
    @close="openUpdateLocationModal = false"
    position="centered"
  >
    <template #header>
      <h5 class="modal-title text-danger">Update Location</h5>
    </template>

    <template #body>
      <div class="my-3">
        <Form @submit="handleUpdateLocation" :validation-schema="locationFormSchema">
          <div class="form-floating">
            <Field
              name="city"
              type="text"
              v-model="selectedLocation.city"
              :validateOnBlur="false"
              class="form-control"
              id="floatingInput112"
              placeholder=""
            />
            <ErrorMessage name="city" class="text-danger" />
            <label for="floatingInput112" class="opacity-50">City</label>
          </div>
          <div class="flex items-center justify-end mt-4">
            <Button
              type="submit"
              :loading="locations.loading"
              buttonText="Save"
              class="btn btn-login d-flex justify-content-center align-items-center rounded-2 w-100 p-3"
            />
          </div>
        </Form>
      </div>
    </template>

    <template #footer> </template>
  </Modal>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useLocationStore } from '@/stores/locations'
import { locationFormSchema } from '@/validation/schema'
import { onMounted, ref } from 'vue'
import { formatWithoutTimeStamps, toastError } from '@/utils/helper'
import { useUserStore } from '@/stores/user'
import { roles } from '@/utils/constant'
import { useAuthStore } from '@/stores/auth'

const users = useUserStore()
const locations = useLocationStore()
const auth = useAuthStore()

const openDeleteLocationModal = ref(false)
const openUpdateLocationModal = ref(false)
const selectedLocation = ref(null)
const user_role = ref(null)
const selectedUsers = ref([])

const handleDeleteLocation = async () => {
  await locations.deleteLocation(selectedLocation.value?.id)
  openDeleteLocationModal.value = false
  selectedLocation.value = null
}
const handleUpdateLocation = async () => {
  await locations.updateLocation(selectedLocation.value)
  openUpdateLocationModal.value = false
  selectedLocation.value = null
}
const handleCreateLocation = async (data) => {
  const res = await locations.createLocation(data)
  if (res) document.getElementById('floatingInput112').value = null
}
const handleAssignUserRole = async () => {
  if (!selectedUsers.value?.length) return toastError('Please select a user')
  const form = {
    userIds: selectedUsers.value,
    role: user_role.value,
  }
  await users.assignUserRole(form)
}

onMounted(async () => {
  await locations.getLocations()
  await users.getAllUsers()
})
</script>
