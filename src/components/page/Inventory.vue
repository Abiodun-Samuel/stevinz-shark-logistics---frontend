<template>
  <div class="p-3 bg-white shadow-sm">
    <Form @submit="handleSaveInventory" :validation-schema="inventoryFormSchema">
      <Field
        name="user_id"
        type="hidden"
        class="form-control"
        id="floatingInput2"
        v-model="selectedInventory.user_id"
      />

      <div class="row">
        <div class="col-lg-4 col-md-6">
          <div class="form-floating my-3">
            <Field
              name="item"
              type="text"
              class="form-control"
              id="floatingInput3"
              placeholder="Item"
              :validateOnBlur="false"
              v-model="selectedInventory.item"
            />
            <ErrorMessage name="item" class="text-danger" />
            <label for="floatingInput3">Item</label>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="form-floating my-3">
            <Field
              name="branch"
              type="text"
              :validateOnBlur="false"
              class="form-control"
              id="floatingInputValue4"
              placeholder="Branch"
              v-model="selectedInventory.branch"
            />
            <ErrorMessage name="branch" class="text-danger" />
            <label for="floatingInputValue4">Branch</label>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="form-floating my-3">
            <Field
              name="volume"
              type="text"
              :validateOnBlur="false"
              class="form-control"
              id="floatingInput5"
              placeholder="volume"
              v-model="selectedInventory.volume"
            />
            <ErrorMessage name="volume" class="text-danger" />
            <label for="floatingInput5">Volume</label>
          </div>
        </div>
      </div>

      <hr />

      <div class="row">
        <div class="col-lg-6 col-sm-6">
          <div class="form-floating my-3">
            <Field
              name="sender"
              type="text"
              class="form-control"
              :validateOnBlur="false"
              id="floatingInput6"
              placeholder="Sender's details"
              v-model="selectedInventory.sender"
            />
            <ErrorMessage name="sender" class="text-danger" />
            <label for="floatingInput6">Sender's details</label>
          </div>
        </div>
        <div class="col-lg-6 col-sm-6">
          <div class="form-floating my-3">
            <Field
              name="receiver"
              type="text"
              @change="generateShipmentNumber"
              class="form-control"
              :validateOnBlur="false"
              id="floatingInput7"
              placeholder="Receiver's details"
              v-model="selectedInventory.receiver"
            />
            <ErrorMessage name="receiver" class="text-danger" />
            <label for="floatingInput7">Receiver's details</label>
          </div>
        </div>
      </div>

      <hr />

      <div class="row">
        <div class="col-lg-4 col-md-6">
          <div class="form-floating my-3">
            <Field
              name="location"
              as="select"
              @change="generateShipmentNumber"
              :validateOnBlur="false"
              v-model="selectedInventory.location"
              class="form-select"
              id="floatingSelect"
              aria-label="Select location"
              placeholder="Select location"
            >
              <option v-for="(item, index) in nigerianCities" :key="index + item" :value="item">
                {{ item }}
              </option>
            </Field>
            <ErrorMessage name="location" class="text-danger" />
            <label for="floatingSelect">Location</label>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="form-floating my-3">
            <Field
              name="payment_mode"
              as="select"
              :validateOnBlur="false"
              v-model="selectedInventory.payment_mode"
              class="form-select"
              id="floatingSelect1"
              aria-label="Select Payment"
              placeholder="Select Payment"
            >
              <option
                v-for="(item, index) in modeOfPayment"
                :key="index + item.value"
                :value="item.value"
              >
                {{ item.name }}
              </option>
            </Field>
            <ErrorMessage name="payment_mode" class="text-danger" />
            <label for="floatingSelect1">Mode of Payment</label>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="form-floating my-3">
            <Field
              name="shipment_number"
              type="text"
              :validateOnBlur="false"
              class="form-control"
              disabled
              id="floatingInput10"
              placeholder="Shipment Number"
              v-model="selectedInventory.shipment_number"
            />
            <ErrorMessage name="shipment_number" class="text-danger" />
            <label for="floatingInput10">Shipment Number</label>
          </div>
        </div>
      </div>

      <hr />
      <Button
        type="submit"
        :loading="inventories?.loading"
        class="btn btn-md btn-primary"
        buttonText="Save Inventory"
      />
    </Form>
  </div>
</template>

<script setup>
import { inventoryFormSchema } from '@/validation/schema'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useInventoryStore } from '@/stores/inventory'
import { modeOfPayment, nigerianCities } from '@/utils/constant'
import { useAuthStore } from '@/stores/auth'
import { shipmentNumberGen } from '@/utils/helper'
import { ref } from 'vue'

const props = defineProps({
  inventory: { type: Object, required: false, default: null },
})

const auth = useAuthStore()
const inventories = useInventoryStore()
const selectedInventory = ref({
  user_id: auth.user.id,
  item: props?.inventory?.item ?? null,
  branch: props?.inventory?.branch ?? null,
  volume: props?.inventory?.volume ?? null,
  receiver: props?.inventory?.receiver ?? null,
  sender: props?.inventory?.sender ?? null,
  location: props?.inventory?.location ?? null,
  payment_mode: props?.inventory?.payment_mode ?? null,
  shipment_number: props?.inventory?.shipment_number ?? null,
})

const generateShipmentNumber = () => {
  if (selectedInventory.value.location && selectedInventory.value.receiver)
    selectedInventory.value.shipment_number = shipmentNumberGen(
      selectedInventory.value.location,
      selectedInventory.value.receiver,
    )
}

const handleSaveInventory = async (data) => {
  const inventoryId = props?.inventory?.id
  if (inventoryId) {
    const form = { ...data, id: inventoryId }
    await inventories.updateInventory(form)
  } else {
    const res = await inventories.createInventory(data)
    if (res)
      for (let key in selectedInventory.value) {
        if (key != 'user_id') {
          selectedInventory.value[key] = null
        }
      }
  }
}
</script>
