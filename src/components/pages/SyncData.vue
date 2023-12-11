<template>
  <div class="d-flex align-items-center mb-3 mt-1">
    <span class="badge rounded me-3 ms-1 badge-subtle-primary">
      <span class="fas fa-sync fs-2 text-primary"></span>
    </span>
    <div class="col">
      <h5 class="mb-0 text-primary position-relative">
        <span class="bg-200 dark__bg-1100 pe-3 fs-2">Penarikan Data</span>
        <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
      </h5>
      <p class="mb-0 fs--1"><a href="javascript:void(0)" class="text-dark">Martha Tilaar Shop</a> / Penarikan Data</p>
    </div>
  </div>

  <div class="alert alert-info d-flex align-items-center" role="alert">
    <div class="w-sm-15">
      <div class="bg-info me-3 icon-item">
        <span class="fas fa-info-circle text-white fs-3"></span>
      </div>
    </div>
    <div class="row align-items-center w-100">
      <div class="col-md-10">
        <h4 class="mb-0 text-info">Master Data <u>{{ storeAccess ? storeAccess.storeName + ` (${storeAccess.store_code})` : '' }}</u></h4>
        <p class="m-0">
          Menunggu prosees penarikan data untuk hari ini: <strong>{{ dateNow }}</strong>
        </p>
      </div>
      <div class="col-md-2 text-start text-lg-end">
        <button class="btn btn-outline-primary btn-sm mt-2" type="button" @click="getAllMasterConfig()">Get Data <span class="fas fa-sync"></span></button>
      </div>
    </div>
  </div>
  
  <div class="card" v-if="dataAllConfig.length < 1">
    <div class="card-body overflow-hidden pb-0 pt-5">
      <div class="row align-items-center">
        <div class="col-lg-4"><img style="max-width: 100%; height: auto;" src="@/assets/img/illustration/21.png" alt=""></div>
        <div class="col-lg-8 ps-lg-4 my-5 text-center text-lg-start">
          <h3 class="text-primary">Edit me!</h3>
          <p class="lead">Lakukan penarikan data master.</p>
          <button class="btn btn-falcon-primary" @click="getAllMasterConfig()">
            Getting started <span class="fas fa-sync"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="card">
    <div class="bg-holder bg-card" style="background-image:url(src/assets/img/illustration/corner-1-left.png); background-position: left; background-size: cover;"></div>
    <div class="card-body pb-0 position-relative">
      <h5>Penarikan Data</h5>
      <div class="table-scrollable-wrapper mb-2" style="min-height: 2vh; max-height: 62vh;">
        <table class="table table-scrollable">
          <thead>
            <tr class="p-0">
              <th class="py-1 bg-white">#</th>
              <th class="py-1 bg-white">Doc Number</th>
              <th class="py-1 bg-white">Doc Date</th>
              <th class="py-1 bg-white">Table Name</th>
              <th class="py-1 bg-white">Status</th>
              <th class="py-1 bg-white">Last Update</th>
              <th class="py-1 bg-white text-center">Updated</th>
              <th class="py-1 bg-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(config, index) in dataAllConfig">
              <td>{{ index + 1 }}</td>
              <td>{{ config.docNum }}</td>
              <td>{{ $root.formatDate(config.docDate) }}</td>
              <td>{{ config.name }}</td>
              <td>
                <span v-if="config.isActive" class="badge rounded-pill badge-subtle-success">Active</span>
                <span v-else class="badge rounded-pill badge-subtle-danger">Disabled</span>
              </td>
              <td>{{ config.updated_at != null ? $root.formatDateTime(config.updated_at) : '-' }}</td>
              <td class="text-center">
                <img v-if="config.updated_at == null" src="@/assets/img/icons/Gif/danger-icon.gif" height="25" alt="">
                <img v-else src="@/assets/img/icons/Gif/success-icon-2.gif" height="25" alt="">
              </td>
              <td>
                <button class="btn btn-link p-0" type="button" data-bs-toggle="modal" data-bs-target="#modalConfirmPenarikanSingle" @click="selectedDownloadDataSingle = config">
                  <span class="fas fa-cloud-download-alt text-primary"> </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="totalPageConfig > 1" class="d-flex justify-content-end">
        <nav aria-label="Page navigation example">
          <ul class="pagination pagination-sm">
            <li class="page-item" :class="{ 'disabled': currentPageConfig === 1 }">
              <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="fatchDataConfiPenarikan(currentPageConfig - 1)">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            <li v-for="pageNumber in totalPageConfig" :key="pageNumber" class="page-item"  :class="{ 'active': pageNumber === currentPageConfig }">
              <a class="page-link" href="javascript:void(0)" @click="fatchDataConfiPenarikan(pageNumber)">{{ pageNumber }}</a>
            </li>

            <li class="page-item" :class="{ 'disabled': currentPageConfig === totalPageConfig }">
              <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="fatchDataConfiPenarikan(currentPageConfig + 1)">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modalConfirmPenarikanSingle" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
      <div class="modal-content position-relative">
        <div class="modal-body p-0 pb-2">
          <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
            <h3 class="mb-1" id="modalExampleDemoLabel">Konfirmasi Penarikan</h3>
          </div>
          <div class="py-2 text-center">
            <div class="d-flex justify-content-center mb-2">
              <img src="@/assets/img/icons/Gif/info-icon.gif" height="60" alt="">
            </div>
            <h5 class="m-0 px-1">
              Yakin ingin lanjut proses penarikan?
            </h5>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal" @click="selectedDownloadDataSingle = null">Batal</button>
          <button class="btn btn-primary btn-sm" type="submit" @click="downloadDataSingle()">Lanjut</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading penarikan data -->
  <div class="modal fade" id="modalLoadingProsesData" tabindex="-1" role="dialog" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 500px">
      <div class="modal-content position-relative">
        <!-- <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
          <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
        </div> -->
        <div class="modal-body p-0">
          <div class="rounded-3 py-3 p-4 bg-body-tertiary">
            <h5 class="mb-0" id="modalExampleDemoLabel">Proses Penarikan</h5>
            <p class="m-0 mb-1 fs--1">
              Proses penarikan data table 
              <span class="badge rounded-pill badge-subtle-secondary">
                {{ selectedDownloadDataSingle ? selectedDownloadDataSingle.tbName : '' }}
              </span>
            </p>
            <div class="progress" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar progress-bar-striped progress-bar-animated" id="progress-toggle" style="width: 100%"></div>
            </div>
            <a href="" class="fs--2 fw-semi-bold">simpan dibackground</a>
            <!-- <div class="text-end mt-3">
              <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Batal</button>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'SyncData',
    data() {
      const limitPenarikan = import.meta.env.VITE_APP_LIMIT_GET_DATA_PENARIKAN;
      const apiKeyConf = import.meta.env.VITE_APP_API_KEY_GET_DATA_PENARIKAN;
      return {
        local_storage: this.$root.local_storage,
        dateNow: null,
        limitPenarikan: limitPenarikan,
        apiKeyConf: apiKeyConf,

        dataAllConfig: [],
        currentPageConfig: 1,
        perPageConfig: 50,
        totalPageConfig: 0,

        storeAccess: null,

        selectedDownloadDataSingle: null,
      }
    },

    async beforeMount(){
      this.dateNow = this.$root.formatDateIdn(new Date());
      await this.loadAllData();
    },

    methods: {
      loadAllData: async function(){
        this.$root.showLoading();
        try{
          const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
          this.storeAccess = cacheStoreAccess;

          await this.fatchDataConfiPenarikan(this.currentPageConfig);
        } catch (e){
          console.log(e);
        }
        this.$root.hideLoading();
      },

      fatchDataConfiPenarikan: async function(page){
        this.$root.showLoading();
        try{
          const getAllConfig = await axios({
            method: 'get',
            url: this.$root.API_URL + '/sync-data/allConfData',
            params: {
              page: page,
              per_page: this.perPageConfig,
            },
          });

          const response = getAllConfig.data;
          this.currentPageConfig = response.current_page;
          this.totalPageConfig = response.last_page;
          this.dataAllConfig = response.data;
        } catch (e){
          console.log(e);
        }
        this.$root.hideLoading();
      },

      getAllMasterConfig: async function(){
        this.$root.showLoading();
        try{
          const getData = await axios({
            method: 'get',
            url: 'https://ipos-tpsmtg.com:8087/pos/poscontroller/getAllConfNoLimit',
          });
          
          if(getData.status == 200 || getData.status == 201){
            const resData = getData.data;
            const storeData = await axios({
              method: 'post',
              url: this.$root.API_URL + '/sync-data/storeAllConfig',
              data: {
                allMaster: resData,
              }
            });

            if(storeData.status == 200 || storeData.status == 201){
              await this.fatchDataConfiPenarikan(this.currentPageConfig);
              this.$root.showAlertFunction('success', 'Sinkronisasi Berhasil!', 'Data master penarikan telah berhasil disimpan.');
            }
          }
        } catch (e){
          this.$root.showAlertFunction('warning', 'Traksaksi Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
          console.log(e);
        }
        this.$root.hideLoading();
      },

      downloadDataSingle: async function(){
        $('#modalConfirmPenarikanSingle').modal('hide');
        $('#modalLoadingProsesData').modal('show');

        try{
          if(this.selectedDownloadDataSingle.url != null){
            var count = 1;
            var iOffset = 0;
            var start_truncate = 1;

            while (count > 0) {
              try{
                const getData = await axios({
                  method: 'get',
                  url: `https://ipos-tpsmtg.com:8087/${this.selectedDownloadDataSingle.url}`,
                  params: {
                    offset: iOffset * parseInt(this.limitPenarikan),
                    limit: parseInt(this.limitPenarikan),
                    APIkey: this.apiKeyConf
                  },
                });

                if(getData.status == 200 || getData.status == 201){
                  const getResPenarikan = getData.data.data;
                  count = getData.data.count;

                  const storeData = await axios({
                    method: 'post',
                    url: this.$root.API_URL + '/sync-data/insertDataPenarikan',
                    data: {
                      obj_penarikan: this.selectedDownloadDataSingle,
                      count_truncate: count,
                      start_truncate: start_truncate,
                      data: getResPenarikan
                    }
                  });

                  if(storeData.status == 200 || storeData.status == 201){
                    const getResponseStore = storeData.data;
                    start_truncate = 0;
                    iOffset++;
                    console.log(getResponseStore);
                  }else{
                    count = 0;
                  }
                }else{
                  count = 0;
                }
              } catch (e){
                count = 0;
                this.$root.showAlertFunction('warning', 'Permintaan Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
                console.log(e);
              }
            }
            await this.fatchDataConfiPenarikan(this.currentPageConfig);
          }else{

          }
          
          this.$root.showAlertFunction('success', 'Permintaan Berhasil!', `Proses penarikan data table ${this.selectedDownloadDataSingle.tbName} berhasil!!`);
          this.selectedDownloadDataSingle = null;
        } catch (e){
          this.$root.showAlertFunction('warning', 'Permintaan Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
          console.log(e);
        }
        $('#modalLoadingProsesData').modal('hide');
      },
    },
  }
</script>