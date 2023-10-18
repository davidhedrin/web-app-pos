<template>
  <div class="d-flex align-items-center mb-3 mt-1">
    <span class="badge rounded me-3 ms-1 badge-subtle-primary">
      <span class="fas fa-box-open fs-2 text-primary"></span>
    </span>
    <div class="col">
      <h5 class="mb-0 text-primary position-relative">
        <span class="bg-200 dark__bg-1100 pe-3 fs-2">Promo Product</span>
        <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
      </h5>
      <p class="mb-0 fs--1"><a href="javascript:void(0)" class="text-dark">Martha Tilaar Shop</a> / Master Promo / Promo Product</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PromoProduct',
    data(){
      return {
        
      }
    },

    beforeMount(){
      this.loadAllData();
    },

    methods: {
      async loadAllData(){
        this.$root.hideLoading();
      }
    },
  }
</script>