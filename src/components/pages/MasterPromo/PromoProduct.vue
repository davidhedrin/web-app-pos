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

  <div class="card mb-3">
    <div class="card-header row justify-content-between pb-0">
      <div class="col-md-3 mb-3">
        <select class="form-select">
          <option value="">Pilih Jenis Promo</option>
          <option value="">Promo 1</option>
          <option value="">Promo 2</option>
          <option value="">Promo 3</option>
          <option value="">Promo 4</option>
        </select>
      </div>
      <div class="col-md-3 mb-3">
        <input class="form-control search-input fuzzy-search" type="search" placeholder="Search...">
      </div>
    </div>
  </div>

  
  <div class="scrollable-customize mb-3" style="max-height: 72vh;">
    <div class="row">
      <div v-for="product in dataAllPromoProduct" :key="product.id" class="mb-4 col-sm-6 col-md-3 col-lg-2">
        <div class="border rounded-1 h-100 d-flex flex-column justify-content-between pb-3">
          <div class="overflow-hidden">
            <div class="position-relative rounded-top overflow-hidden">
              <a class="d-block" href="javascripts:void(0)">
                <img class="img-fluid rounded-top" src="@/assets/img/product/sariayu_martha.jpg" style="width: 100%; height: 150px;" alt="">
              </a>
              <span class="badge rounded-pill position-absolute mt-2 me-2 z-2 top-0 end-0" :class="'bg-' + product.master_promo.master_kode_promo.badge">
                {{ product.master_promo.master_kode_promo.nama_promo }}
              </span>
              <span class="badge badge-subtle-secondary position-absolute mb-1 ms-2 z-2 bottom-0 start-0 fs--2 fw-bold" style="font-weight: normal;">OUR8128932836</span>
            </div>
            <div class="p-3 pt-2 pb-0">
              <h5 class="fs-0 mb-2"><a class="text-1100" href="javascripts:void(0)">Apple</a></h5>
              <p class="fs--1 mb-0"><del class="fs--1 text-500">Rp 100.000</del></p>
              <h5 class="fs-md-1 text-warning mb-0 d-flex align-items-center mb-2">Rp 50.000</h5>
              <p class="fs--1 mb-0">Stock: <strong class="text-success">Available</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'PromoProduct',
    data(){
      return {
        hostUrl: import.meta.env.VITE_API_URL,

        dataAllProduct: [],
        dataAllMasterKodePromo: [],
        dataAllMasterNamaPromo: [],
        dataAllMasterPromo: [],
        dataAllPromoProduct: [],
      }
    },
    beforeMount(){
      this.loadAllData();
    },
    methods: {
      async loadAllData(){
        try{
          const getAllData = await axios({
            method: 'get',
            url: this.hostUrl + '/master-promo',
          });
          const allData = getAllData.data;
          this.dataAllProduct = allData.getAllProduct; // All Products
          this.dataAllMasterKodePromo = allData.getAllKodePromo; // Master Kode Promo
          this.dataAllMasterNamaPromo = allData.getAllNamaPromo; // Master Nama Promo

          //Get all data master promo
          const getAllDataPromo = await axios({
            method: 'get',
            url: this.hostUrl + '/master-promo/getAllMasterPromo',
          });
          const allDataPromo = getAllDataPromo.data;
          this.dataAllMasterPromo = allDataPromo;

          for(let i = 0; i < allDataPromo.length; i++){
            for(let j = 0; j < allDataPromo[i].all_promo_product.length; j++){
              this.dataAllPromoProduct.push(allDataPromo[i].all_promo_product[j]);
            }
          }
          
          console.log(allDataPromo);


          this.$root.hideLoading();
        } catch (error) {
          console.log(error);
        }
      }
    },
  }
</script>