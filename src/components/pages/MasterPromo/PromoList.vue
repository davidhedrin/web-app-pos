<template>
  <div class="d-flex align-items-center mb-3 mt-1">
    <span class="badge rounded me-3 ms-1 badge-subtle-primary">
      <span class="fas fa-ticket-alt fs-2 text-primary"></span>
    </span>
    <div class="col">
      <h5 class="mb-0 text-primary position-relative">
        <span class="bg-200 dark__bg-1100 pe-3 fs-2">Promo List</span>
        <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
      </h5>
      <p class="mb-0 fs--1"><a href="javascript:void(0)" class="text-dark">Martha Tilaar Shop</a> / Master Promo / Promo List</p>
    </div>
  </div>

  <div class="card mb-3">
    <!-- <div class="card-header d-flex align-items-center justify-content-between">
      <button class="btn btn-falcon-default btn-sm py-1" type="button" data-bs-toggle="modal" data-bs-target="#modalAddEditPromo" v-on:click="openModalAddPromo">
        <span class="fas fa-edit"></span>
        <span class="d-none d-xl-inline-block ms-1">Tambah</span>
      </button>
      <div>
        <form>
          <div class="input-group">
            <input class="form-control shadow-none search" type="search" placeholder="Search..." aria-label="search">
            <button class="btn btn-outline-secondary border-300 hover-border-secondary">
              <span class="fa fa-search fs--1"></span>
            </button>
          </div>
        </form>
      </div>
    </div> -->
    <div class="card-header">
      <div class="d-lg-flex justify-content-between">
        <div class="d-flex align-items-center justify-content-between justify-content-lg-end">
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center">
              <small class="fw-semi-bold lh-1">View:</small>
              <div class="d-flex">
                <button class="btn btn-link btn-sm text-900" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Course List" data-bs-original-title="Course List">
                  <span class="fas fa-list-ul fs-1" data-fa-transform="down-1"></span>
                </button>
                <button class="btn btn-link btn-sm px-1 text-400 hover-700" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Course Grid" data-bs-original-title="Course Grid">
                  <span class="fas fa-th fs-1" data-fa-transform="down-1"></span>
                </button>
              </div>
            </div>
            <!-- <div class="ms-2">
              <select class="form-select">
                <option value="">Pilih Brand Product</option>
              </select>
            </div> -->
          </div>
        </div>
        <div class="border-bottom border-200 my-3"></div>
        <div class="flex-between-center">
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
  </div>

  <div class="row">
    <div v-for="promo in dataAllMasterPromo" class="col-lg-4 mb-3">
      <div class="card">
        <div class="bg-holder bg-card" style="background-image:url(src/assets/img/illustration/discount-i.png); background-size: cover;"></div>
        <div class="card-header d-flex justify-content-between position-relative">
          <div>
            <!-- <h6><span class="badge rounded-pill mb-0" :class="'bg-'+promo.master_kode_promo.badge">{{ promo.master_kode_promo.nama_promo }}</span></h6> -->
            <div class="display-4 fs-2 fw-bold font-sans-serif">
              {{ promo.nama_promo }}
            </div>
            <span class="fw-semi-bold fs--1 text-nowrap">
              {{ formatDateTime(promo.start_date) }} - {{ formatDateTime(promo.end_date) }}
            </span>
            <div class="fw-semi-bold fs-0">
              <span v-if="promo.kode_tipe_promo == master_coll.tipeMasterPromo.first">
                Buy 1 Get 1
              </span>
              <span v-else-if="promo.kode_tipe_promo == master_coll.tipeMasterPromo.secound">Diskon {{ promo.percent }}%</span>
            </div>
          </div>
          <div class="text-end">
            <span class="badge badge rounded-pill fs--1" :class="promo.kode_tipe_promo == master_coll.tipeMasterPromo.first ? 'badge-subtle-warning' : 'badge-subtle-primary'">
              {{ promo.master_kode_promo.name }}
            </span>
            <div>
              <a class="fs--1" href="javascript:void(0)" @click="openModalDetailPromo(promo)">Detail <span class="far fa-eye"></span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card" v-if="dataAllMasterPromo.length < 1">
    <div class="card-body overflow-hidden pb-0 pt-5">
      <div class="row align-items-center">
        <div class="col-lg-4"><img style="max-width: 100%; height: auto;" src="@/assets/img/illustration/21.png" alt=""></div>
        <div class="col-lg-8 ps-lg-4 my-5 text-center text-lg-start">
          <h3 class="text-primary">Edit me!</h3>
          <p class="lead">Tidak ada promo terdaftar.</p>
        </div>
      </div>
    </div>
  </div>
  
  <div v-if="totalPagePromo > 1" class="d-flex justify-content-end">
    <nav aria-label="Page navigation example">
      <ul class="pagination pagination-sm">
        <li class="page-item" :class="{ 'disabled': currentPagePromo === 1 }">
          <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="fatchProductData(currentPagePromo - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li v-for="pageNumber in totalPagePromo" :key="pageNumber" class="page-item"  :class="{ 'active': pageNumber === currentPagePromo }">
          <a class="page-link" href="javascript:void(0)" @click="fatchProductData(pageNumber)">{{ pageNumber }}</a>
        </li>

        <li class="page-item" :class="{ 'disabled': currentPagePromo === totalPagePromo }">
          <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="fatchProductData(currentPagePromo + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>

  <div class="modal fade" id="modalDetailPromo" tabindex="-1" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 600px;">
      <div class="modal-content position-relative border-0">
        <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
          <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div class="card">
            <div class="bg-holder bg-card" style="background-image:url(src/assets/img/illustration/corner-1i.png); background-position: left; background-size: cover;"></div>
            <div class="card-body position-relative">
              <div class="rounded-top-3 mb-2">
                <h5 class="mb-1">Detail Promo</h5>
              </div>
              
              <div v-if="detailDataPromo != null">
                <div class="row align-items-center">
                  <div class="col-md-6">
                    <span class="fs--2"><u>nama promo:</u></span>
                    <h4 class="mb-0">{{ detailDataPromo.nama_promo }}</h4>
                  </div>
                  <div class="col-md-6 text-start text-sm-end">
                    <span class="fs--2"><u>promo code:</u></span>
                    <p class="mb-0">
                      <strong>{{ detailDataPromo.promo_code }}</strong>
                    </p>
                    <!-- <span class="badge badge rounded-pill fs--2" :class="detailDataPromo.kode_tipe_promo == master_coll.tipeMasterPromo.first ? 'badge-subtle-warning' : 'badge-subtle-primary'">
                      {{ detailDataPromo.master_kode_promo.name }}
                      <span v-if="detailDataPromo.kode_tipe_promo == master_coll.tipeMasterPromo.secound">
                        ({{ detailDataPromo.percent }}%)
                      </span>
                    </span> -->
                  </div>
                </div>

                <div class="row mb-2">
                  <div class="col-md-6">
                    <div>
                      <span class="fs--2"><u>promo start:</u></span>
                      <p class="mb-0">
                        <strong>
                          {{ formatDateTime(detailDataPromo.start_date) }}
                        </strong>
                      </p>
                    </div>
                    <div>
                      <span class="fs--2"><u>promo end:</u></span>
                      <p class="mb-0">
                        <strong>
                          {{ formatDateTime(detailDataPromo.end_date) }}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div class="col-md-6 text-start text-sm-end">
                    <span class="fs--2"><u>type:</u></span>
                    <div>
                      <span class="badge badge rounded-pill fs--2" :class="detailDataPromo.kode_tipe_promo == master_coll.tipeMasterPromo.first ? 'badge-subtle-warning' : 'badge-subtle-primary'">
                        {{ detailDataPromo.master_kode_promo.name }}
                      </span>
                    </div>
                    <h1 class="mb-0" v-if="detailDataPromo.kode_tipe_promo == master_coll.tipeMasterPromo.secound">
                      {{ detailDataPromo.percent }}%
                    </h1>
                  </div>
                </div>

                <span class="fs--1 fw-bold">Syarat & Ketentuan:</span>
                <hr class="my-0">

                <div class="row mb-2">
                  <div class="col-md-3">
                    <span class="fs--2"><u>minimal pcs:</u></span>
                    <p class="mb-0">
                      <strong>{{ detailDataPromo.min_buy ?? '-' }}</strong>
                    </p>
                  </div>
                  <div class="col-md-3">
                    <span class="fs--2"><u>minimal value buy:</u></span>
                    <p class="mb-0">
                      <strong>Rp {{ detailDataPromo.min_value ? $root.formatPrice(detailDataPromo.min_value) : '-' }}</strong>
                    </p>
                  </div>
                  <div class="col-md-3">
                    <span class="fs--2"><u>after discount:</u></span>
                    <p class="mb-0">
                      <strong>{{ detailDataPromo.percent_after_dic ? detailDataPromo.percent_after_dic + '%' : '-' }}</strong>
                    </p>
                  </div>
                  <div class="col-md-3">
                    <span class="fs--2"><u>additional discount:</u></span>
                    <p class="mb-0">
                      <strong>{{ detailDataPromo.percent_additional ? detailDataPromo.percent_additional + '%' : '-' }}</strong>
                    </p>
                  </div>
                </div>

                <span class="fs--1 fw-bold">
                  Gift With Purchase:
                  <span v-if="detailDataPromo.is_gwp" class="badge rounded-pill bg-success">
                    <span class="fas fa-check-circle"></span> Active
                  </span>
                  <span v-else class="badge rounded-pill bg-danger">
                    <span class="fas fa-window-close"></span> Not Added
                  </span>
                </span>
                <hr class="my-0">

                <div v-if="detailDataPromo.is_gwp && detailDataPromo.master_tipe_gwp" class="row">
                  <div class="col-md-6">
                    <span class="fs--2"><u>GWP type:</u></span>
                    <p class="mb-0">
                      <strong>{{ detailDataPromo.master_tipe_gwp.name ?? '-' }}</strong>
                    </p>
                  </div>
                  <div v-if="detailDataPromo.tipe_gwp == master_coll.tipe_gwp.three" class="col-md-6">
                    <div>
                      <span class="fs--2"><u>maximal get:</u></span>
                      <p class="mb-0">
                        <strong>{{ detailDataPromo.mix_get_pcs_gwp }} pcs</strong>
                      </p>
                    </div>
                  </div>
                  <div v-if="detailDataPromo.tipe_gwp == master_coll.tipe_gwp.secound" class="col-md-6">
                    <div>
                      <span class="fs--2"><u>maximal value:</u></span>
                      <p class="mb-0">
                        <strong>Rp {{ $root.formatPrice(detailDataPromo.min_value_product) }}</strong>
                      </p>
                    </div>
                  </div>
                  <div v-if="detailDataPromo.tipe_gwp != master_coll.tipe_gwp.secound" class="col-md-12">
                    <span class="fs--2"><u>list added product:</u></span>
                    <div>
                      <span v-for="product in detailDataPromo.detail_promo" class="badge bg-secondary me-2">{{ product.item.itemName }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-end mt-2">
                <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Selesai</button>
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
  import { markRaw } from 'vue';
  import LoadingWhite from '@/components/layouts/LoadingWhite.vue';

  export default {
    name: 'PromoList',
    data() {
      return {
        master_code: this.$root.master_code,
        master_coll: this.$root.master_coll,
        local_storage: this.$root.local_storage,

        detailDataPromo: null,

        dataAllMasterPromo: [],
        currentPagePromo: 1,
        perPagePromo: 12,
        totalPagePromo: 0,
        
        dataAllProduct: [],
        dataAllMasterKodePromo: [],
        dataAllMasterNamaPromo: [],
        modalAddOrEditPromo: true,

        dataMasterPromo: {
          id: '',
          master_promo_id: '',
          kode_promo: '',
          nama_promo: '',
          start_date: null,
          end_date: null,
          tipe_promo: '',
          buy_item: '',
          get_item: '',
          percent: '',
          keterangan: '',
          
          product_promo_buy_get: [],
          products_promo_percent: [],
        },
      }
    },

    beforeMount() {
      this.loadAllData();
    },
    
    methods: {
      loadAllData: async function(){
        try{
          const getAllData = await axios({
            method: 'get',
            url: this.$root.API_URL + '/master-promo',
          });
          const allData = getAllData.data;
          this.dataAllMasterKodePromo = allData.getAllKodePromo; // Master Kode Promo
          this.dataAllMasterNamaPromo = allData.getAllNamaPromo; // Master Nama Promo

          const getAllProduct = await axios({
            method: 'get',
            url: this.$root.API_URL + '/master-promo/getAllProduct',
          });
          this.dataAllProduct = getAllProduct.data; // All Products

          await this.fatchPromoData(this.currentPagePromo);
        } catch (error) {
          console.log(error);
        }
        this.$root.hideLoading();
      },

      fatchPromoData: async function(page){
        this.$root.showLoading();
        try{
          const requestPromo = await axios({
            method: 'get',
            url: this.$root.API_ERP + '/pos/getAllPromo',
            params: {
              page: page,
              per_page: this.perPagePromo,
            },
          });
          
          const response = requestPromo.data;
          this.currentPagePromo = response.current_page;
          this.totalPagePromo = response.last_page;
          this.dataAllMasterPromo = response.data;
        } catch(e) {
          console.log(e);
        }
        this.$root.hideLoading();
      },

      openModalDetailPromo: function(promo){
        promo.selectedSingleGwpProduct = promo.detail_promo.length > 0 ? this.dataAllProduct.find((p) => p.itemCode == promo.detail_promo[0].itemCode) : null;
        promo.selectedMultiGwpProduct = this.dataAllProduct.filter((p) => {
          return promo.detail_promo.some(detail => detail.itemCode === p.itemCode);
        });

        this.detailDataPromo = promo;
        // console.log(promo);
        $('#modalDetailPromo').modal('show');
      },

      actionSubmitNewPromo: async function(){
        // Store new
        if (this.modalAddOrEditPromo == true){
          try{
            $('#modalAddEditPromo').modal('hide');
            this.$root.showLoading();
            const store = await axios({
              method: 'post',
              url: this.$root.API_URL + '/master-promo/storeNewPromo',
              data: this.dataMasterPromo,
            });
    
            if(store.status == 201 || store.status == 200){
              var getResponsStore = store.data.data;
              getResponsStore.all_promo_product = getResponsStore.promo_product_save;
              this.dataAllMasterPromo.push(getResponsStore);
    
              for (let prop in this.dataMasterPromo) {
                if(prop != 'product_promo_buy_get' && prop != 'products_promo_percent'){
                  this.dataMasterPromo[prop] = '';
                }else{
                  this.dataMasterPromo[prop] = [];
                }
              }
    
              this.$root.showAlertFunction('success', 'Promo Berhasil!', 'Selamat, Promo baru telah berhasil ditambahkan.');
            }else{
              this.$root.showAlertFunction('warning', 'Pendaftaran Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
            }
            
            this.$root.hideLoading();
          } catch (error) {
            this.$root.showAlertFunction('warning', 'Menyimpan Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
            this.$root.hideLoading();
            console.log(error);
          }
        }

        // Update
        if (this.modalAddOrEditPromo == false) {
          // Validasi tipe promo
          if(this.dataMasterPromo.tipe_promo == '1'){ // Bundle
            this.dataMasterPromo.percent = null;
          }
          if(this.dataMasterPromo.tipe_promo == '2'){ // Percent
            this.dataMasterPromo.buy_item = null;
            this.dataMasterPromo.get_item = null;
          }

          try{
            $('#modalAddEditPromo').modal('hide');
            this.$root.showLoading();
            const store = await axios({
              method: 'put',
              url: this.$root.API_URL + '/master-promo/updateDataPromo',
              data: this.dataMasterPromo,
            });

            if(store.status == 201 || store.status == 200){
              var getDataStore = store.data.data;
              getDataStore.all_promo_product = getDataStore.promo_product_save;
              var findIndexPromo = this.dataAllMasterPromo.findIndex((promo) => promo.id == getDataStore.id);
              this.dataAllMasterPromo[findIndexPromo] = getDataStore;

              this.$root.showAlertFunction('success', 'Update Berhasil!', 'Selamat, Data promo telah berhasil diperbaharui.');
            }else{
              this.$root.showAlertFunction('warning', 'Mengubah Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
            }
            
            this.$root.hideLoading();
          } catch (error) {
            this.$root.showAlertFunction('warning', 'Update Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
            this.$root.hideLoading();
            console.log(error);
          }
        }
      },

      onChangeTipePromo: function(){
        if (this.modalAddOrEditPromo == true) {
          this.dataMasterPromo.product_promo_buy_get = [];
          this.dataMasterPromo.products_promo_percent = [];
        }
        if(this.dataMasterPromo.tipe_promo == '1'){
          const setObject = {
            index: 0,
            product_buy: null,
            product_get: null
          }

          this.dataMasterPromo.product_promo_buy_get.push(setObject);
        }
      },

      addMoreProductBundle: function(){
        const getLengthProductBundle = this.dataMasterPromo.product_promo_buy_get.length;
        const setObject = {
          index: getLengthProductBundle + 1,
          product_buy: null,
          product_get: null
        }
        this.dataMasterPromo.product_promo_buy_get.push(setObject);
      },

      removeMoreProductBundle: function (index){
        const findIndexProduct = this.dataMasterPromo.product_promo_buy_get.findIndex((item) => item.index === index);
        if (findIndexProduct !== -1) {
          this.dataMasterPromo.product_promo_buy_get.splice(findIndexProduct, 1);
        } else {
          console.log('Product not found');
        }
      },

      openModalAddPromo: function(){
        for (let prop in this.dataMasterPromo) {
          if(prop != 'product_promo_buy_get' && prop != 'products_promo_percent'){
            this.dataMasterPromo[prop] = '';
          }else{
            this.dataMasterPromo[prop] = [];
          }
        }
        
        this.modalAddOrEditPromo = true;
      },
      
      openModalEditPromo: function (promo){
        this.$root.showLoading();

        for (let prop in this.dataMasterPromo) {
          if(prop != 'product_promo_buy_get' && prop != 'products_promo_percent'){
            this.dataMasterPromo[prop] = '';
          }else{
            this.dataMasterPromo[prop] = [];
          }
        }

        for (let prop in this.dataMasterPromo) {
          if(prop == 'product_promo_buy_get'){
            for(let i = 0; i < promo.all_promo_product.length ; i++){
              if(promo.tipe_promo == '1'){ // Bundle
                const setObject = {
                  index: i,
                  product_buy: promo.all_promo_product[i].for_product,
                  product_get: promo.all_promo_product[i].get_product
                }
                this.dataMasterPromo.product_promo_buy_get.push(setObject);
              }
            }
          }
          else if(prop == 'products_promo_percent'){
            for(let i = 0; i < promo.all_promo_product.length ; i++){
              if(promo.tipe_promo == '2'){ // Percent
                this.dataMasterPromo.products_promo_percent.push(promo.all_promo_product[i].for_product);
              }
            }
          }else{
            this.dataMasterPromo[prop] = promo[prop];
          }
        }
        
        this.modalAddOrEditPromo = false;
        this.$root.hideLoading();
        $('#modalAddEditPromo').modal('show');
      },

      formatDateTime: function (dateTimeString) {
        const isTFormat = dateTimeString.includes('T');
        const separator = isTFormat ? 'T' : ' ';
        const [datePart, timePart] = dateTimeString.split(separator);
        const [year, month, day] = datePart.split('-');
        const [hour, minute] = timePart.split(':');

        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hour}:${minute}`;

        return `${formattedDate} ${formattedTime}`;
      },
    }
  }
</script>