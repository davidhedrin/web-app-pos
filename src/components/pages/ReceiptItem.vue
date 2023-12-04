<template>
  <div class="d-flex align-items-center mb-3 mt-1">
    <span class="badge rounded me-3 ms-1 badge-subtle-primary">
      <span class="fas fa-boxes fs-2 text-primary"></span>
    </span>
    <div class="col">
      <h5 class="mb-0 text-primary position-relative">
        <span class="bg-200 dark__bg-1100 pe-3 fs-2">Goods Receipt</span>
        <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
      </h5>
      <p class="mb-0 fs--1"><a href="javascript:void(0)" class="text-dark">Martha Tilaar Shop</a> / Goods Receipt</p>
    </div>
  </div>
  
  <div class="card shadow-none border mb-3">
    <div class="bg-holder bg-card d-none d-md-block" style="background-image:url(src/assets/img/illustration/reports-bg.png);"></div><!--/.bg-holder-->
    <div class="card-header z-1">
      <div class="row flex-between-center gx-0">
        <div class="col-lg-auto d-flex align-items-center"><img class="img-fluid" src="@/assets/img/illustration/reports-greeting.png" alt="">
          <div class="ms-x1">
            <h6 class="mb-1 text-primary">Martha Tilaar Shop</h6>
            <h4 class="mb-0 text-primary fw-bold"><span class="text-info fw-medium">Penerimaan Barang</span></h4>
          </div>
        </div>
        <div class="col-lg-auto pt-3 pt-lg-0">
          <form class="row flex-lg-column flex-xxl-row gx-3 gy-2 align-items-center align-items-lg-start align-items-xxl-center">
            <div class="col-auto">
              <h6 class="text-700 mb-0">Terakhir Penerimaan: </h6>
            </div>
            <div class="col-md-auto position-relative">
              <input :value="dateNow" class="form-control datetimepicker ps-4 flatpickr-input" type="text" readonly="readonly">
              <span class="fas fa-calendar-alt text-primary position-absolute top-50 translate-middle-y ms-2"></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <div class="card">
    <div class="bg-holder bg-card" style="background-image:url(src/assets/img/illustration/corner-1-left.png); background-position: left; background-size: auto;"></div>
    <div class="card-body pb-0 position-relative">
      <h5>Penerimaan Barang</h5>
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
            <tr v-for="paging in allDataPaging" :id="paging.id">
              <td>{{ paging.docNum }}</td>
              <td>{{ paging.docDate1 }}</td>
              <td>
                <span v-if="paging.docStatus.toLowerCase() == 'o'" class="badge rounded-pill badge-subtle-success">
                  Open
                </span>
                <span v-else class="badge rounded-pill badge-subtle-danger">
                  Close
                </span>
              </td>
              <td>{{ paging.custmrCode }}</td>
              <td>{{ paging.storeCode }}</td>
              <td>{{ paging.poNo }}</td>
              <td>{{ paging.totalQty }}</td>
              <td>
                <button class="btn btn-link p-0" type="button" @click="showModalDetailPenerimaan(paging)">
                  <span class="far fa-edit text-warning"> </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modalFormPenerimaanBarang" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="max-width: 95%;">
      <div class="modal-content position-relative">
        <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
          <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div class="card">
            <div class="bg-holder bg-card" style="background-image:url(src/assets/img/illustration/corner-1i.png);background-size: cover;"></div>
            <div class="card-body p-0 position-relative">
              <div class="py-3 ps-4 pe-6">
                <h5 class="mb-1" id="modalExampleDemoLabel">Form Peneriaman Barang</h5>
              </div>
              <div class="p-4 pt-0 pb-3">
                <div class="row align-items-center justify-content-center">
                  <div class="col-sm-6 col-md-3 mb-3 text-center">
                    <img src="@/assets/img/mtsiconland.png" alt="invoice" style="width: 100%;">
                    
                    <div v-if="dataDetailPenerimaan.length > 0" class="text-start mt-2">
                      <span class="fs--1"><u>Pilih Warehouse Tujuan:</u></span>
                      <select class="form-select">
                        <option value="">Pilih Wharehouse</option>
                        <option v-for="whs in getAllMasterWarehouse" :value="whs.whsCode">{{ whs.whsName }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-9">
                    <div class="card mb-4">
                      <div class="card-header">
                        <div v-if="dataShowFormPenerimaan != null" class="row align-items-center">
                          <div class="col-md-3 text-center mb-2">
                            <span class="fs--1"><u>Nomor DO</u></span>
                            <h5>{{ dataShowFormPenerimaan.docNum }}</h5>
                          </div>
                          <div class="col-md-3 text-center mb-2">
                            <span class="fs--1"><u>Tanggal DO</u></span>
                            <h5>{{ dataShowFormPenerimaan.docDate1 }}</h5>
                          </div>
                          <div class="col-md-3 text-center mb-2">
                            <span class="fs--1"><u>Kode Pelanggan</u></span>
                            <h5>{{ dataShowFormPenerimaan.custmrCode }}</h5>
                          </div>
                          <div class="col-md-3 text-center mb-2">
                            <span class="fs--1"><u>Kode Toko</u></span>
                            <h5>{{ dataShowFormPenerimaan.storeCode }}</h5>
                          </div>
                          <div class="col-md-3 text-center mb-2">
                            <span class="fs--1"><u>Nomor PO</u></span>
                            <h5>{{ dataShowFormPenerimaan.poNo }}</h5>
                          </div>
                          <div class="col-md-3 text-center mb-2">
                            <span class="fs--1"><u>Total Item</u></span>
                            <h5>{{ dataShowFormPenerimaan.totalQty }}</h5>
                          </div>
                          <div class="col-md-3 text-center mb-2">
                            <span class="fs--1"><u>Tanggal Approval</u></span>
                            <h5>{{ dataShowFormPenerimaan.approval_at ?? '-' }}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="dataDetailPenerimaan.length > 0" class="table-scrollable-wrapper mb-3" style="min-height: 0vh; max-height: 55vh;">
                  <table class="table table-scrollable table-sm table-hover">
                    <thead>
                      <tr>
                        <th class="bg-white py-2">#</th>
                        <th class="bg-white py-2">Doc Entry</th>
                        <th class="bg-white py-2">BP Item</th>
                        <th class="bg-white py-2">Item Code</th>
                        <th class="bg-white py-2">Item Name</th>
                        <th class="bg-white py-2">Nomor Batch</th>
                        <th class="bg-white py-2">Expired Date</th>
                        <th class="bg-white py-2">DN Qty</th>
                        <th class="bg-white py-2">Actual Qty</th>
                        <th class="bg-white py-2">Variant</th>
                        <th class="bg-white py-2">Updated</th>
                        <th class="bg-white py-2 text-end">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- <tr v-if="dataDetailPenerimaan.length < 1">
                        <td class="text-center" colspan="12"><i>Get data item untuk menemukan!</i></td>
                      </tr> -->
                      <tr v-for="(detail, index) in dataDetailPenerimaan" :key="index" class="align-middle">
                        <td>{{ index + 1 }}</td>
                        <td>{{ detail.docEntry }}</td>
                        <td>{{ detail.bpItem1 }}</td>
                        <td>{{ detail.itemCode }}</td>
                        <td>{{ detail.itemName }}</td>
                        <td>{{ detail.batchNo }}</td>
                        <td>{{ detail.expiredDate1 }}</td>
                        <td>{{ detail.openQty1 }}</td>
                        <td>
                          <form @submit.prevent="editActionDetailPenerimaan(detail)">
                            <div class="input-group input-group-sm">
                              <input v-model="detail.qtyEditable" class="form-control form-control-sm hide-input-btn" type="number" style="width: 40px;" :disabled="!detail.is_edit" />
                              <span v-if="!detail.is_edit" class="input-group-text px-2 text-danger">
                                <span class="fas fa-lock"></span>
                              </span>
                              <span v-else class="input-group-text px-2 text-success">
                                <span class="fas fa-unlock-alt"></span>
                              </span>
                            </div>
                          </form>
                        </td>
                        <td>
                          <input type="number" class="form-control form-control-sm hide-input-btn" :class="detail.openQty1 - detail.qtyEditable > 0 && 'border-red backgroud-red'" :value="detail.openQty1 - detail.qtyEditable < 0 ? 0 : detail.openQty1 - detail.qtyEditable" style="width: 40px;" disabled>
                        </td>
                        <td>{{ detail.approval_at ?? '-' }}</td>
                        <td>
                          <button v-if="detail.is_edit" class="btn btn-link p-0" type="button" @click="editActionDetailPenerimaan(detail)">
                            <span class="far fa-edit text-warning"></span>
                          </button>
                          <button v-else class="btn btn-link p-0" type="button" @click="detail.is_edit = !detail.is_edit; this.isDisabledSaveData = true">
                            <span class="far fa-edit text-secondary"></span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="d-flex justify-content-end">
                  <button v-if="isBtnGetOrSave" class="btn btn-primary btn-sm" type="button" @click="getDataDetailPenerimaan(dataShowFormPenerimaan.id)">
                    Get Data <span class="fas fa-cloud-download-alt"></span>
                  </button>
                  <div v-else>
                    <button v-if="isDisabledSaveData" class="btn btn-secondary btn-sm" type="button" @click="$root.showAlertFunction('warning', 'Gagal Menyimpan!', 'Pastikan semua field Actual Qty sudah terkunci')">
                      Save Data <span class="fas fa-save"></span>
                    </button>
                    <button v-else class="btn btn-success btn-sm" type="button" @click="saveDataPenerimaan(dataShowFormPenerimaan.id)">
                      Save Data <span class="fas fa-save"></span>
                    </button>
                  </div>
                  <button class="btn btn-secondary btn-sm ms-2" type="button" data-bs-dismiss="modal">
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="modal fade" id="modalIncorectVariant" tabindex="1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
      <div class="modal-content position-relative">
        <div class="modal-body p-0 pb-2">
          <div class="py-2 text-center">
            <div class="d-flex justify-content-center my-3">
              <img src="@/assets/img/icons/Gif/warning-icon-2.gif" height="60" alt="">
            </div>
            <h4 class="m-0 mb-1 px-1">
              Invalid Variant!
            </h4>
            <p class="m-0 px-4">
              Actual QTY melebihi Delivery Note QTY.
            </p>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Selesai</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'ReceiptItem',
    data() {
      return {
        master_code: this.$root.master_code,
        master_coll: this.$root.master_coll,
        local_storage: this.$root.local_storage,
        urlPoduction: 'https://ipos-tpsmtg.com:8087',

        allDataPaging: [],
        dataShowFormPenerimaan: null,
        dataDetailPenerimaan: [],
        isBtnGetOrSave: true,
        isDisabledSaveData: false,

        getAllMasterWarehouse: [],
      }
    },

    async beforeMount() {
      await this.loadAllData();
    },

    methods: {
      loadAllData: async function(){
        this.$root.showLoading();
        try{
          const storeActive = JSON.parse(localStorage.getItem(this.local_storage.access_store));
          const storeDetail = storeActive.store_outlet;

          const getDataItem = await axios({
            method: 'get',
            url: this.urlPoduction + `/wms/paging?offset=0&limit=1000&storecode=${storeDetail.store_code}`
          });
          const response = getDataItem.data;
          const resData = response.results;
          this.allDataPaging = resData;

          const getData = await axios({
            method: 'get',
            url: this.$root.API_URL + '/recipt-item',
          });
          const resGetData = getData.data;
          this.getAllMasterWarehouse = resGetData.getAllMasterWarehouse;
        } catch (error) {
          console.log(error);
        }
        this.$root.hideLoading();
      },

      // openModalFormPeneriamaan: async function(id){
      //   this.$root.showLoading();

      //   try{
      //     const getData = await axios({
      //       method: 'get',
      //       url: this.urlPoduction + `/wms/getRincianheaderID/${id}`,
      //     });

      //     console.log(getData);
      //   } catch (error) {
      //     console.log(error);
      //   }

      //   this.$root.hideLoading();
      //   $('#modalFormPenerimaanBarang').modal('show');
      // }

      showModalDetailPenerimaan: function(paging){
        this.dataShowFormPenerimaan = null;
        this.isBtnGetOrSave = true;
        this.dataDetailPenerimaan = [];

        this.dataShowFormPenerimaan = paging;
        $('#modalFormPenerimaanBarang').modal('show');
      },

      getDataDetailPenerimaan: async function(id){
        this.$root.showLoading();
        try{
          const getData = await axios({
            method: 'get',
            url: this.urlPoduction + `/wms/pagingRincian/${id}?limit=1000&offset=0`,
          });

          const resData = getData.data.results;
          const modifdata = resData.map(item => ({ 
            ...item, 
            is_edit: false, 
            qtyEditable: item.openQty1,
          }));
          this.dataDetailPenerimaan = modifdata;
          this.isBtnGetOrSave = false;
          this.$root.showAlertFunction('success', 'Data Ditemukan!', 'Data item berhasil ditemukan!.');
        } catch (error) {
          console.log(error);
        }
        this.$root.hideLoading();
      },

      editActionDetailPenerimaan: function(detail){
        if(detail.qtyEditable > detail.openQty1){
          detail.qtyEditable = detail.openQty1;
          $('#modalIncorectVariant').modal('show');
        }

        detail.is_edit = !detail.is_edit;
        const hasTrueIsEdit = this.dataDetailPenerimaan.some(item => item.is_edit === true);
        this.isDisabledSaveData = hasTrueIsEdit;
      },

      saveDataPenerimaan: async function(id){
        let objDn = {};
        let objAct = {};
        let objVariant = {};

        this.dataDetailPenerimaan.forEach(detail => {
          let newKey = detail.id + "XXYYZZ" + detail.itemCode;
          objDn[newKey] = parseInt(detail.openQty1);
          objAct[newKey] = parseInt(detail.openQty1);
          objVariant[newKey] = parseInt(detail.openQty1) - parseInt(detail.qtyEditable);
        });

        const dataPost = {
          var_penerimaan_DN: objDn,
          var_penerimaan_Actual: objAct,
          docEntry: id,
          userId: this.$root.dataAuthToken.user_uuid,
        };

        // const getData = await axios({
        //   method: 'post',
        //   url: this.urlPoduction + `/wms/savePenerimaanBarang/${id}`,
        //   data: dataPost
        // });
      }
    }
  }
</script>

<style scoped>
.backgroud-red{
  background-color: rgb(250 210 210) !important;
}
</style>