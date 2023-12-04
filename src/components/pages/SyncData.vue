<template>
  <div class="d-flex align-items-center mb-3 mt-1">
    <span class="badge rounded me-3 ms-1 badge-subtle-primary">
      <span class="fas fa-sync fs-2 text-primary"></span>
    </span>
    <div class="col">
      <h5 class="mb-0 text-primary position-relative">
        <span class="bg-200 dark__bg-1100 pe-3 fs-2">Synchronize Data</span>
        <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
      </h5>
      <p class="mb-0 fs--1"><a href="javascript:void(0)" class="text-dark">Martha Tilaar Shop</a> / Synchronize Data</p>
    </div>
  </div>

  <div class="card">
    <div class="bg-holder bg-card" style="background-image:url(src/assets/img/illustration/corner-1-left.png); background-position: left; background-size: auto;"></div>
    <div class="card-body pb-0 position-relative">
      <h5>Synchronize Data</h5>
      <div class="table-scrollable-wrapper mb-2" style="min-height: 2vh; max-height: 80vh;">
        <table class="table table-scrollable">
          <thead>
            <tr class="p-0">
              <th class="py-1 bg-white">Nomor DO</th>
              <th class="py-1 bg-white">Tanggal DO</th>
              <th class="py-1 bg-white">Status DO</th>
              <th class="py-1 bg-white">Kode Pelanggan</th>
              <th class="py-1 bg-white">Kode Toko</th>
              <th class="py-1 bg-white">Nomor PO</th>
              <th class="py-1 bg-white">Total Item</th>
              <th class="py-1 bg-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SyncData',

    async beforeMount(){
      await this.loadAllData();
    },

    methods: {
      loadAllData: async function(){
        this.$root.hideLoading();
      }
    },
  }
</script>