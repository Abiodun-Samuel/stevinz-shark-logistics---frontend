<template>
  <div class="container">
    <div class="row vh-100 d-flex justify-content-center align-items-center">
      <div class="col-lg-5 col-md-10 col-sm-11 col-12">
        <router-link to="/" title="Homepage: Stevinz Shark Logistics">
          <img class="mb-3 w-100" src="/src/assets/images/logo/logo-box.jpeg" alt="login logo" />
        </router-link>

        <Form @submit="handleRegister" :validation-schema="registerFormSchema">
          <div class="row my-3">
            <div class="col-6">
              <div class="form-floating">
                <Field
                  name="first_name"
                  type="text"
                  :validateOnBlur="false"
                  class="form-control"
                  id="floatingInput1"
                  placeholder=""
                />
                <ErrorMessage name="first_name" class="text-danger" />
                <label for="floatingInput1" class="opacity-50">First name</label>
              </div>
            </div>
            <div class="col-6">
              <div class="form-floating">
                <Field
                  name="last_name"
                  type="text"
                  :validateOnBlur="false"
                  class="form-control"
                  id="floatingInput2"
                  placeholder=""
                />
                <ErrorMessage name="last_name" class="text-danger" />
                <label for="floatingInput2" class="opacity-50">Last name</label>
              </div>
            </div>
          </div>

          <div class="row my-3">
            <div class="col-12">
              <div class="form-floating">
                <Field
                  name="email"
                  type="email"
                  :validateOnBlur="false"
                  class="form-control"
                  id="floatingInput3"
                  placeholder="name@example.com"
                />
                <ErrorMessage name="email" class="text-danger" />
                <label for="floatingInput3" class="opacity-50">Email address</label>
              </div>
            </div>
          </div>

          <div class="row my-3">
            <div class="col-6">
              <div class="form-floating">
                <Field
                  name="password"
                  type="password"
                  :validateOnBlur="false"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="name@example.com"
                />
                <ErrorMessage name="password" class="text-danger" />
                <label for="floatingPassword" class="opacity-50">Password</label>
              </div>
            </div>
            <div class="col-6">
              <div class="form-floating">
                <Field
                  name="password_confirmation"
                  type="password"
                  :validateOnBlur="false"
                  class="form-control"
                  id="floatingPassword1"
                  placeholder="Password"
                />
                <ErrorMessage name="password_confirmation" class="text-danger" />
                <label for="floatingPassword1" class="opacity-50">Password Confirmation</label>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end mt-4">
            <Button
              type="submit"
              :loading="auth.loading"
              buttonText="Register"
              class="btn btn-login d-flex justify-content-center align-items-center rounded-2 w-100 p-3"
            />
          </div>
        </Form>
        <small class="text-info"
          >Already registered?
          <router-link :to="{ name: 'login' }" class="text-danger text-decoration-underline"
            >Login</router-link
          >
        </small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { registerFormSchema } from '@/validation/schema'
import { useAuthStore } from '@/stores/auth'
import { defaultAvatar } from '@/utils/constant'
const auth = useAuthStore()

const handleRegister = (form) => {
  const data = { ...form, avatar: defaultAvatar }
  auth.register(data)
}
</script>
