<template>
  <div class="container">
    <div class="row vh-100 d-flex justify-content-center align-items-center">
      <div class="col-lg-5 col-md-10 col-sm-11 col-12">
        <router-link to="/" title="Homepage: Stevinz Shark Logistics">
          <img class="mb-3 w-100" src="/src/assets/images/logo/logo-box.jpeg" alt="login logo" />
        </router-link>

        <Form @submit="auth.login" :validation-schema="loginFormSchema">
          <div class="mb-3">
            <div class="form-floating mb-3">
              <Field
                name="email"
                type="email"
                :validateOnBlur="false"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <ErrorMessage name="email" class="text-danger" />
              <label for="floatingInput" class="opacity-50">Email address</label>
            </div>

            <div class="form-floating">
              <Field
                name="password"
                type="password"
                :validateOnBlur="false"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <ErrorMessage name="password" class="text-danger" />
              <label for="floatingPassword" class="opacity-50">Password</label>
            </div>
          </div>

          <div class="flex items-center justify-end mt-4">
            <Button
              type="submit"
              :loading="auth.loading"
              buttonText="Login"
              class="btn btn-login d-flex justify-content-center align-items-center rounded-2 w-100 p-3"
            />
          </div>
        </Form>
        <small class="text-info"
          >Don't have an account yet?
          <router-link :to="{ name: 'register' }" class="text-danger text-decoration-underline"
            >Register</router-link
          >
        </small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { loginFormSchema } from '@/validation/schema'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>
