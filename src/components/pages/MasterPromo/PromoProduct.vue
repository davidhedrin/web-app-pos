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
      <div class="col-auto mb-3 d-flex">
        <div class="row align-items-center justify-content-between">
          <div class="col-auto">
            <div class="d-flex align-items-center">
              <small class="fw-semi-bold pe-1">View:</small>
              <div class="d-flex">
                <button @click="isListOrGrid = true" class="btn btn-link btn-sm px-2" :class="isListOrGrid ? 'text-900' : 'text-400 hover-700'" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Course List" data-bs-original-title="Course List">
                  <span class="fas fa-list-ul fs-1" data-fa-transform="down-1"></span>
                </button>
                <button @click="isListOrGrid = false" class="btn btn-link btn-sm px-2" :class="!isListOrGrid ? 'text-700' : 'text-400 hover-700'" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Course Grid" data-bs-original-title="Course Grid">
                  <span class="fas fa-th fs-1" data-fa-transform="down-1"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="col-auto">
            <form>
              <select class="form-select">
                <option value="">Pilih Jenis Promo</option>
                <option value="">Promo 1</option>
                <option value="">Promo 2</option>
                <option value="">Promo 3</option>
                <option value="">Promo 4</option>
              </select>
            </form>
          </div>
        </div>
      </div>
      
      <div class="col-md-3 mb-3">
        <form>
          <div class="input-group">
            <input class="form-control shadow-none search" type="search" placeholder="Search..." aria-label="search">
            <button class="btn btn-outline-secondary border-300 hover-border-secondary">
              <span class="fa fa-search fs--1"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  <div class="card">
    <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-5i.png); background-size: cover;"></div>
    <div class="card-body position-relative pb-0 px-0">
      <div v-if="isListOrGrid" class="table-scrollable-wrapper" style="max-height: 66vh; min-height: 66vh;">
        <table class="table table-scrollable table-hover">
          <thead>
            <tr>
              <th class="py-2 bg-white">#</th>
              <th class="py-2 bg-white text-center">Jenis</th>
              <th class="py-2 bg-white">SKU Product</th>
              <th class="py-2 bg-white">Nama Product</th>
              <th class="py-2 bg-white">Promo</th>
              <th class="py-2 bg-white text-center">Harga Product</th>
              <th class="py-2 bg-white">Tipe</th>
              <th class="py-2 bg-white">Info</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(master, index) in dataAllPromoProduct" :key="master.id">
              <td>{{ index+1 }}</td>
              <td class="text-center">
                <span class="badge rounded-pill" :class="'bg-' + master.master_promo.master_kode_promo.badge">
                  {{ master.master_promo.master_kode_promo.nama_promo }}
                </span>
              </td>
              <td>{{ master.for_product.itemCode }}</td>
              <td class="fw-bold">{{ master.for_product.itemName }}</td>
              <td>{{ master.master_promo.nama_promo }}</td>
              <td class="text-center">
                <del v-if="master.master_promo.tipe_promo == master_coll.tipePromo.percent" class="fs--2 me-1">Rp {{$root.formatPrice($root.filterPriceProduct(master.for_product).price) }}</del>
                <span class="fw-bold">Rp {{ master.master_promo.tipe_promo == master_coll.tipePromo.percent ? $root.formatPrice($root.filterPriceProduct(master.for_product).price - ($root.filterPriceProduct(master.for_product).price * (master.master_promo.percent/100))) : $root.formatPrice($root.filterPriceProduct(master.for_product).price) }}</span>
              </td>
              <td>
                <span class="badge rounded-pill" :class="master.master_promo.tipe_promo == master_coll.tipePromo.bundle ? 'badge-subtle-warning' : 'badge-subtle-primary'">
                  {{ master.master_promo.tipe_promo == master_coll.tipePromo.bundle ? 'Bundle' : 'Percent' }}
                </span>
              </td>
              <td>
                {{ master.master_promo.tipe_promo == master_coll.tipePromo.bundle 
                  ? 'Buy ' + master.master_promo.buy_item + ' Get ' + master.master_promo.get_item
                  : 'Diskon ' + master.master_promo.percent + '%'
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    
      <div v-if="!isListOrGrid" class="scrollable-customize mb-3" style="max-height: 66vh; min-height: 66vh;">
        <div class="row mx-0">
          <div v-for="master in dataAllPromoProduct" :key="master.id" class="mb-2 mt-2 col-sm-6 col-md-4 col-lg-2">
            <div class="border rounded-1 h-100 d-flex flex-column justify-content-between pb-3">
              <div class="overflow-hidden">
                <div class="position-relative rounded-top overflow-hidden">
                  <a class="d-block" href="javascripts:void(0)">
                    <img class="img-fluid rounded-top" :src="'src/assets/img/product/' + master.for_product.image" style="width: 100%; height: 120px;" alt="">
                  </a>
                  <span class="badge rounded-pill position-absolute mt-2 me-2 z-2 top-0 end-0" :class="'bg-' + master.master_promo.master_kode_promo.badge">
                    {{ master.master_promo.master_kode_promo.nama_promo }}
                  </span>
                  <span class="badge badge-subtle-secondary position-absolute mb-1 ms-2 z-2 bottom-0 start-0 fs--2 fw-bold" style="font-weight: normal;">{{ master.for_product.itemCode }}</span>
                </div>
                <div class="p-3 pt-2 pb-0">
                  <h5 class="fs-0 mb-0">
                    <a class="text-1100" href="javascripts:void(0)">
                      <span class="d-inline-block text-truncate max-width-text-truncate">
                        {{ master.for_product.itemName }}
                      </span>
                    </a>
                  </h5>
                  <span class="badge rounded-pill badge-subtle-success mb-1">
                    <div v-if="master.master_promo.tipe_promo == '1'">
                      <span>Buy {{ master.master_promo.buy_item }} Get {{ master.master_promo.get_item }}</span>
                    </div>
                    <div v-if="master.master_promo.tipe_promo == '2'">
                      <del class="fs--1 text-500">
                        Rp. {{ $root.formatPrice($root.filterPriceProduct(master.for_product).price) }} 
                      </del>
                      (-{{ master.master_promo.percent }}%)
                    </div>
                  </span>
                  <h5 class="fs-md-1 text-warning mb-0 d-flex align-items-center mb-1">
                    Rp {{ master.master_promo.tipe_promo == '2' ? $root.formatPrice($root.filterPriceProduct(master.for_product).price - ($root.filterPriceProduct(master.for_product).price * (master.master_promo.percent/100))) : $root.formatPrice($root.filterPriceProduct(master.for_product).price) }}
                  </h5>
                  <p class="fs--1 mb-0">
                    <strong class="text-info">
                      "{{ master.master_promo.nama_promo }}"
                    </strong>
                  </p>
                  <p class="fs--1 mb-0">
                    Tipe: <strong class="text-dark">
                      {{ master.master_promo.tipe_promo == '1' ? 'Bundle' : 'Percent' }}
                    </strong>
                  </p>
                </div>
              </div>
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
        master_code: this.$root.master_code,
        master_coll: this.$root.master_coll,

        dataAllProduct: [],
        dataAllMasterKodePromo: [],
        dataAllMasterNamaPromo: [],
        dataAllMasterPromo: [],
        dataAllPromoProduct: [],

        isListOrGrid: true,
      }
    },
    beforeMount(){
      this.loadAllData();
    },
    methods: {
      loadAllData: async function (){
        try{
          const getAllData = await axios({
            method: 'get',
            url: this.$root.API_URL + '/master-promo',
          });
          const allData = getAllData.data;
          this.dataAllProduct = allData.getAllProduct; // All Products
          this.dataAllMasterKodePromo = allData.getAllKodePromo; // Master Kode Promo
          this.dataAllMasterNamaPromo = allData.getAllNamaPromo; // Master Nama Promo

          //Get all data master promo
          const getAllDataPromo = await axios({
            method: 'get',
            url: this.$root.API_URL + '/master-promo/getAllMasterPromo',
          });
          const allDataPromo = getAllDataPromo.data;
          this.dataAllMasterPromo = allDataPromo;

          for(let i = 0; i < allDataPromo.length; i++){
            for(let j = 0; j < allDataPromo[i].all_promo_product.length; j++){
              this.dataAllPromoProduct.push(allDataPromo[i].all_promo_product[j]);
            }
          }
          
          this.$root.hideLoading();
        } catch (error) {
          console.log(error);
        }
      }
    },
  }
</script>

<style scoped>
.max-width-text-truncate{
  max-width: 180px;
}
@media (min-width: 600px) and (max-width: 1024px) {
  .max-width-text-truncate{
    max-width: 500px;
  }
}
@media (max-width: 600px) {
  .max-width-text-truncate{
    max-width: 230px;
  }
}
</style>