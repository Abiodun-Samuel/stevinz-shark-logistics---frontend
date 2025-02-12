<template>
    <div class="d-flex align-items-center justify-content-center vh-100">
      <div class="text-center">
        <h1 class="display-1 fw-bold">Not Found</h1>
        <p class="lead text-danger">
          Oops!, the page or resources you're looking for does't exist.
        </p>
        <router-link to="/" class="btn btn-primary">Go Home</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "404",
  };
  </script>
  
  <style scoped></style>
  