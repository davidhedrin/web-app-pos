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
    <div class="card-header d-flex align-items-center justify-content-between">
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
    </div>
  </div>

  <div class="row">
    <div v-for="promo in dataAllMasterPromo" class="col-lg-4 mb-3">
      <div class="border rounded-3 h-100 d-flex justify-content-between p-3 bg-white">
        <div>
          <h6><span class="badge rounded-pill mb-0" :class="'bg-'+promo.master_kode_promo.badge">{{ promo.master_kode_promo.nama_promo }}</span></h6>
          <div class="display-4 fs-2 fw-bold font-sans-serif">
            {{ promo.nama_promo }}
          </div>
          <span class="fw-semi-bold fs--1 text-nowrap" href="index.html">
            {{ formatDateTime(promo.start_date) }} - {{ formatDateTime(promo.end_date) }}
          </span>
        </div>
        <div class="text-end">
          <div>
            <span class="badge badge rounded-pill fs--1" :class="promo.tipe_promo == '1' ? 'badge-subtle-warning' : 'badge-subtle-primary'">{{ promo.tipe_promo == '1' ? 'Bundle' : 'Percent' }}</span>
          </div>
          <span class="fw-semi-bold fs-0">
            <span v-if="promo.tipe_promo == '1'">
            Buy {{ promo.buy_item }} Get {{ promo.get_item }}
            </span>
            <span v-else-if="promo.tipe_promo == '2'">Diskon {{ promo.percent }}%</span>
          </span>
          <div>
            <button class="btn btn-link p-0" type="button" v-on:click="openModalEditPromo(promo)">
              <span class="fas fa-edit text-warning"></span>
            </button>
            <button class="btn btn-link p-0 ms-2" type="button" v-on:click="openModalDeletePromo(promo.id)">
              <span class="fas fa-trash-alt text-danger"></span>
            </button>
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
          <a class="btn btn-falcon-primary" href="javascript:void(0)">
            Getting started
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="card">
    <div class="bg-holder d-none d-lg-block bg-card"
      style="background-image:url(src/assets/img/illustration/corner-4.png);"></div>
    <div class="card-body position-relative">
      <div class="table-responsive scrollbar">
        <table class="table table-hover overflow-hidden">
          <thead>
            <tr class="p-0">
              <th>#</th>
              <th>Promo</th>
              <th>Periode</th>
              <th>Tipe Promo</th>
              <th class="text-end">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="va-middle">1</td>
              <td class="va-middle">
                <span class="badge rounded-pill bg-success fs--1">Flash Sale</span>
                <div class="mt-1">
                  <h5 class="mb-0">
                    10.10
                  </h5>
                </div>
              </td>
              <td class="va-middle">10 Oktober 2023 - 15 Oktober 2023</td>
              <td class="va-middle">
                <span class="badge badge rounded-pill badge-subtle-primary fs--1">Percent %</span>
                <div class="mt-1">
                  <h5>20%</h5>
                </div>
              </td>
              <td class="text-end va-middle">
                <div>
                  <button class="btn btn-link p-0" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
                    <span class="fas fa-edit text-warning"></span>
                  </button>
                  <button class="btn btn-link p-0 ms-2" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                    <span class="fas fa-trash-alt text-danger"></span>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td class="va-middle">2</td>
              <td class="va-middle">
                <span class="badge rounded-pill bg-danger fs--1">Promo</span>
                <div class="mt-1">
                  <h5 class="mb-0">
                    Promo Akhir Bulan
                  </h5>
                </div>
              </td>
              <td class="va-middle">25 Agustus 2023 - 31 Agustus 2023</td>
              <td class="va-middle">
                <span class="badge badge rounded-pill badge-subtle-info fs--1">Bundle</span>
                <div class="mt-1">
                  <h5>Buy 3 Get 1</h5>
                </div>
              </td>
              <td class="text-end va-middle">
                <div>
                  <button class="btn btn-link p-0" type="button" data-bs-toggle="tooltip" data-bs-placement="top"
                    title="Edit">
                    <span class="fas fa-edit text-warning"></span>
                  </button>
                  <button class="btn btn-link p-0 ms-2" type="button" data-bs-toggle="tooltip" data-bs-placement="top"
                    title="Delete">
                    <span class="fas fa-trash-alt text-danger"></span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div> -->

  <div class="modal fade" id="modalAddEditPromo" tabindex="-1" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content position-relative border-0">
        <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
          <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div class="card">
            <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-4-left.png); background-position: left; background-size: cover;"></div>
            <div class="card-body position-relative p-0">
              <div class="rounded-top-3 py-3 ps-4 pe-6">
                <h5 class="mb-1">{{ modalAddOrEditPromo ? 'Buat Promo Baru' : 'Edit Promo' }}</h5>
              </div>
              <form @submit.prevent="actionSubmitNewPromo">
                <div class="p-4 pb-2 pt-1">
                  <div class="row" id="formAddNewPromo">
                    <div class="col-md-6 mb-2">
                      <label class="form-label mb-0" for="select_kode_promo">Kode Promo <span class="text-danger">*</span></label>
                      <select v-model="dataMasterPromo.kode_promo" class="form-select bg-transparent" id="select_kode_promo" aria-label="Default select example">
                        <option value="">Pilih kode promo</option>
                        <option v-for="kode in dataAllMasterKodePromo" :key="kode.id" :value="kode.slug">{{ kode.nama_promo }}</option>
                      </select>
                    </div>
                    <div class="col-md-6 mb-2">
                      <label class="form-label mb-0" for="select_tipe_promo">Tipe Promo <span class="text-danger">*</span></label>
                      <select v-model="dataMasterPromo.tipe_promo" @change="onChangeTipePromo" class="form-select bg-transparent" id="select_tipe_promo" aria-label="Default select example">
                        <option value="">Pilih tipe promo</option>
                        <option value="1">Bundle (Buy & Get Free)</option>
                        <option value="2">Percent (%)</option>
                      </select>
                    </div>
                    <div class="col-md-12 mb-2">
                      <label class="form-label mb-0" for="input_nama_promo">Nama Promo <span class="text-danger">*</span></label>
                      <input v-model="dataMasterPromo.nama_promo" class="form-control bg-transparent" id="input_nama_promo" type="text" placeholder="Masukkan nama tambahan">
                    </div>
                    <div class="col-md-6 mb-2">
                      <label class="form-label mb-0" for="tanggal_mulai">Tanggal Mulai <span class="text-danger">*</span></label>
                      <input v-model="dataMasterPromo.start_date" class="form-control bg-transparent" id="tanggal_mulai" type="datetime-local">
                    </div>
                    <div class="col-md-6 mb-2">
                      <label class="form-label mb-0" for="tanggal_akhir">Tanggal Berakhir <span class="text-danger">*</span></label>
                      <input v-model="dataMasterPromo.end_date" class="form-control bg-transparent" id="tanggal_akhir" type="datetime-local">
                    </div>
                    <div class="col-md-12">
                      <label class="form-label mb-0" for="keterangan">Keterangan</label>
                      <textarea v-model="dataMasterPromo.keterangan" class="form-control bg-transparent" id="keterangan" placeholder="Keterangan jika ada"></textarea>
                    </div>
                    
                    <div v-if="dataMasterPromo.tipe_promo == '1'" class="col-md-12">
                      <div class="row">
                        <div class="col-md-6 mt-2 mb-0">
                          <label class="form-label mb-0" for="input_buy_tipe_bundle">Buy Unit <span class="text-danger">*</span></label>
                          <input v-model="dataMasterPromo.buy_item" class="form-control bg-transparent" type="number" min="1" id="input_buy_tipe_bundle" placeholder="Masukkan jumlah beli">
                        </div>
                        <div class="col-md-6 mt-2 mb-0">
                          <label class="form-label mb-0" for="input_get_tipe_bundle">Get Unit <span class="text-danger">*</span></label>
                          <input v-model="dataMasterPromo.get_item" class="form-control bg-transparent" type="number" min="1" id="input_get_tipe_bundle" placeholder="Masukkan jumlah free">
                        </div>
                      </div>
                      
                      <div v-for="(product, index) in dataMasterPromo.product_promo_buy_get" :key="index" class="card mt-3">
                        <div class="card-body p-2 px-3">
                          <div class="d-flex justify-content-between">
                            <label class="form-label mb-0">Product - {{ index + 1 }}</label>
                            <a v-if="index != 0" href="javascript:void(0)" class="text-danger" @click="removeMoreProductBundle(product.index)">hapus</a>
                            <span v-else class="text-secondary" style="cursor: not-allowed;">hapus</span>
                          </div>
                          <hr class="m-0">
                          <div class="row">
                            <div class="col-md-6">
                              <label class="form-label mb-0" :for="'promo_bundle_buy_' + index">Buy Product <span class="text-danger">*</span></label>
                              <v-select  
                                :id="'promo_bundle_buy_' + index"
                                v-model="product.product_buy"
                                :options="dataAllProduct"
                                label="itemName"
                                value="itemCode"
                                :placeholder="'Pilih product'"
                              />
                            </div>
                            <div class="col-md-6">
                              <label class="form-label mb-0" :for="'promo_bundle_get_' + index">Get Product <span class="text-danger">*</span></label>
                              <v-select  
                                :id="'promo_bundle_get_' + index"
                                v-model="product.product_get"
                                :options="dataAllProduct"
                                label="itemName"
                                value="itemCode"
                                :placeholder="'Pilih product'"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12 mt-2 text-end">
                        <a href="javascript:void(0)" class="fw-semi-bold text-primary fs--1" type="button" @click="addMoreProductBundle">
                          Tambah Product <span class="fas fa-plus"></span>
                        </a>
                      </div>
                    </div>

                    <div v-if="dataMasterPromo.tipe_promo == '2'">
                      <div class="col-md-12 mt-2">
                        <label class="form-label mb-0" for="input_tipe_percent">Nilai Persen <span class="text-danger">*</span></label>
                        <input v-model="dataMasterPromo.percent" class="form-control bg-transparent" type="number" min="1" max="100" id="input_tipe_percent" placeholder="Masukkan nilai persen">
                      </div>
                      <div class="col-md-12 mt-2">
                        <label class="form-label mb-0">Products <span class="text-danger">*</span></label>
                        <v-select 
                          v-model="dataMasterPromo.products_promo_percent"
                          multiple 
                          :options="dataAllProduct"
                          label="itemName"
                          value="itemCode"
                          :placeholder="'Pilih product'"
                        />
                      </div>
                    </div>

                    <div class="col-md-12 mt-3 mb-2">
                      <i>Field dengan tanda <span class="text-danger">*</span> wajib untuk diisi</i>
                    </div>
                  </div>
                </div>
                <div class="text-end px-4 pt-0 pb-3">
                  <button class="btn btn-secondary me-2" type="button" data-bs-dismiss="modal">Close</button>
                  <!-- <button class="btn btn-secondary me-2" type="button" @click="console.log(dataMasterPromo.products_promo_percent)">Test</button> -->
                  <button class="btn btn-primary" type="submit">{{ modalAddOrEditPromo ? 'Simpan' : 'Update' }}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="modal fade" id="modalConfirmDeletePromo" tabindex="0" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
      <div class="modal-content position-relative">
        <div class="modal-body p-0 pb-2">
          <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
            <h3 class="mb-1" id="modalExampleDemoLabel">Konfirmasi Hapus</h3>
          </div>
          <div class="py-2 text-center">
            <div class="d-flex justify-content-center mb-2">
              <img src="@/assets/img/icons/Gif/warning-icon-2.gif" height="60" alt="">
            </div>
            <h5 class="m-0 px-1">
              Yakin ingin menghapus!
            </h5>
            <p class="m-0 px-3">
              Menghapus master promo akan menghapus daftar product yang terkait!
            </p>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Batal</button>
          <button class="btn btn-primary btn-sm" type="button" v-on:click="actionDeletePromo">Konfirmasi</button>
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
        dataAllProduct: [],
        dataAllMasterPromo: [],
        dataAllMasterKodePromo: [],
        dataAllMasterNamaPromo: [],
        modalAddOrEditPromo: true,

        idPromoForDelete: 0,

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
        }
      }
    },
    beforeMount() {
      this.loadAllData();
    },
    methods: {
      loadAllData: async function () {
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
          // console.log(this.dataAllMasterPromo);

          this.$root.hideLoading();
        } catch (error) {
          console.log(error);
        }
      },

      actionSubmitNewPromo: async function (){
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

      openModalDeletePromo: function(promo_id){
        this.idPromoForDelete = promo_id;
        $('#modalConfirmDeletePromo').modal('show');
      },

      actionDeletePromo: async function (){
        try{
          $('#modalConfirmDeletePromo').modal('hide');
          this.$root.showLoading();
          const store = await axios({
            method: 'delete',
            url: this.$root.API_URL + '/master-promo/deleteDataPromo',
            data: {
              id: parseInt(this.idPromoForDelete),
            }
          });
          
          if(store.status == 201 || store.status == 200){
            var findIndexPromo = this.dataAllMasterPromo.findIndex((promo) => promo.master_promo_id == this.idPromoForDelete);
            this.dataAllMasterPromo.splice(findIndexPromo, 1);

            // this.idPromoForDelete = '';
            this.$root.showAlertFunction('success', 'Delete Berhasil!', 'Selamat, Data promo telah berhasil dihapus.');
          }else{
            this.$root.showAlertFunction('warning', 'Menghapus Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
          }
          
          this.$root.hideLoading();
        } catch (error) {
          this.$root.showAlertFunction('warning', 'Delete Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
          this.$root.hideLoading();
          console.log(error);
        }
      },

      onChangeTipePromo: function (){
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

      addMoreProductBundle: function (){
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

      openModalAddPromo: function (){
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