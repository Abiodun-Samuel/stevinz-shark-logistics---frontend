<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div
        class="modal-dialog modal-dialog-scrollable"
        :class="`${position ? 'modal-dialog-' + position : size}`"
      >
        <div class="modal-content bg-white px-3 py-2 rounded shadow">
          <div class="modal-header">
            <slot name="header">default header</slot>
            <button
              v-if="closeBtn != false"
              type="button"
              class="btn-close"
              @click="$emit('close')"
            >
              {{}}
            </button>
          </div>

          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>
          <div class="modal-footer" v-if="footer && closeFooterBtn != false">
            <!-- <button
              v-if="closeBtn != false "
              type="button"
              class="btn btn-info btn-sm"
              @click="$emit('close')"
            >
             close
            </button> -->
            <slot name="footer"> </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  show: Boolean,
  closeBtn: { type: Boolean, default: true },
  closeFooterBtn: { type: Boolean, default: true },
  footer: { type: Boolean, default: true },
  size: { type: String, default: 'modal-md' },
  position: { type: String, default: null },
})
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-dialog-scrollable .modal-content {
  overflow: visible;
}

.modal-header {
  background-color: #f8f8f8;
}

.btn-close {
  padding: 0.8rem !important;
  box-shadow: 0 5px 20px 0 rgb(34 41 47 / 10%);
  border-radius: 0.357rem;
  background-color: #fff;
  opacity: 1;
  -webkit-transition: all 0.23s ease 0.1s;
  transition: all 0.23s ease 0.1s;
  position: relative;
  -webkit-transform: translate(18px, -10px);
  -ms-transform: translate(18px, -10px);
  transform: translate(18px, -10px);
}

.btn-close:hover {
  opacity: 1;
  outline: 0;
  -webkit-transform: translate(15px, -2px);
  -ms-transform: translate(15px, -2px);
  transform: translate(15px, -2px);
  box-shadow: none;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/*  */
.modal-dialog-centered,
.toast-header {
  display: -webkit-box;
  display: -webkit-flex;
}
.modal-dialog {
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
}

.modal.fade .modal-dialog {
  -webkit-transition: -webkit-transform 0.3s ease-out;
  transition: -webkit-transform 0.3s ease-out;
  transition: transform 0.3s ease-out;
  transition:
    transform 0.3s ease-out,
    -webkit-transform 0.3s ease-out;
  -webkit-transform: translate(0, -50px);
  -ms-transform: translate(0, -50px);
  transform: translate(0, -50px);
}

@media (prefers-reduced-motion: reduce) {
  .modal.fade .modal-dialog {
    -webkit-transition: none;
    transition: none;
  }
}

.modal.show .modal-dialog {
  -webkit-transform: none;
  -ms-transform: none;
  transform: none;
}

.modal.modal-static .modal-dialog {
  -webkit-transform: scale(1.02);
  -ms-transform: scale(1.02);
  transform: scale(1.02);
}

.modal-dialog-scrollable {
  height: calc(100% - 1rem);
}

.modal-dialog-scrollable .modal-content {
  max-height: 100%;
  overflow: hidden;
}

.modal-dialog-scrollable .modal-body,
.modal-fullscreen .modal-body,
.offcanvas-body {
  overflow-y: auto;
}

.modal-dialog-centered {
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  min-height: calc(100% - 1rem);
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 500px;
    margin: 1.75rem auto;
  }

  .modal-dialog-scrollable {
    height: calc(100% - 3.5rem);
  }

  .modal-dialog-centered {
    min-height: calc(100% - 3.5rem);
  }

  .modal-sm {
    max-width: 400px;
  }
}

@media (min-width: 992px) {
  .modal-lg,
  .modal-xl {
    max-width: 800px;
  }
}

@media (min-width: 1200px) {
  .modal-xl {
    max-width: 94%;
  }
}
</style>
