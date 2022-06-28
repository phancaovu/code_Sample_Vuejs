<template>
  <div class="modal fade" id="modalStep" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalStep" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content mywallet-modal">
        <div class="modal-body pt-0">
          <div class="row mx-0 my-3">
            <div class="col-8 offset-2 text-center">
              <h4>Step {{ step_detail.step }}</h4>
              <h6>{{ step_detail.message }}</h6>
              <div id="loading-register" class="loading d-flex justify-content-center align-items-center pt-4">
                <div class="spinner-border text-warning" role="status"><span class="visually-hidden"></span></div>
              </div>
            </div>
          </div>
        </div>
        <!-- loading-mark -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalStep",
  props: {
    step_detail: {
      type: Object,
      default: {
        step: null,
        message: null
      }
    }
  }
}
</script>

<style scoped>

</style>
