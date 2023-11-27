<template>
  <div class="d-flex align-items-center mb-3 mt-1">
    <span class="badge rounded me-3 ms-1 badge-subtle-primary">
      <span class="fas fa-chart-line fs-2 text-primary"></span>
    </span>
    <div class="col">
      <h5 class="mb-0 text-primary position-relative">
        <span class="bg-200 dark__bg-1100 pe-3 fs-2">Transaksi</span>
        <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
      </h5>
      <p class="mb-0 fs--1"><a href="javascript:void(0)" class="text-dark">Martha Tilaar Shop</a> / Transaksi List</p>
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
        <h4 class="mb-0 text-info">Transfer Transaksi</h4>
        <p class="m-0">
          <strong class="text-warning">3</strong> Transaksi dalam antrian menunggu proses transfer
        </p>
      </div>
      <div class="col-md-2 text-end">
        <button class="btn btn-outline-primary btn-sm mt-2" type="button">Transfer Sekarang</button>
      </div>
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-sm-6 col-md-3">
      <div class="card overflow-hidden" style="min-width: 12rem">
        <div class="card-body">
          <h6>Jumlah Transaksi</h6>
          <div class="display-4 fs-4 mb-2 fw-normal font-sans-serif">
            {{ dataAllTransaction.length }}
          </div>
          <span class="badge badge-subtle-warning rounded-pill fs--2">+ 2 Hari ini</span>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-3">
      <div class="card overflow-hidden" style="min-width: 12rem">
        <div class="card-body">
          <h6>Tiket Booking <span class="badge badge-subtle-info rounded-pill ms-2">0.0%</span>
          </h6>
          <div class="display-4 fs-4 mb-2 fw-normal font-sans-serif">23.43k</div>
          <a class="fw-semi-bold fs--1 text-nowrap" href="javascript:void(0)">
            Semua Tiket 
            <span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span>
          </a>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card overflow-hidden" style="min-width: 12rem">
        <div class="card-body">
          <h6>Revenue <span class="badge badge-subtle-success rounded-pill ms-2">9.54%</span>
          </h6>
          <div class="display-4 fs-4 mb-2 fw-normal font-sans-serif">Rp 43.594</div>
          <a class="fw-semi-bold fs--1 text-nowrap" href="javascript:void(0)">
            Statistics 
            <span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span>
          </a>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card overflow-hidden" style="min-width: 12rem">
        <div class="card-body">
          <h6>Revenue <span class="badge badge-subtle-success rounded-pill ms-2">9.54%</span>
          </h6>
          <div class="display-4 fs-4 mb-2 fw-normal font-sans-serif">Rp 13.594</div>
          <a class="fw-semi-bold fs--1 text-nowrap" href="javascript:void(0)">
            Statistics 
            <span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="bg-holder bg-card" style="background-image:url(src/assets/img/illustration/corner-1-left.png); background-position: left; background-size: auto;"></div>
    <div class="card-body position-relative">
      <div class="row align-items-center">
        <div class="col-md-8 mb-3">
          <h4>Daftar transaksi</h4>
        </div>
        <div class="col-md-4 mb-3 d-flex align-items-center">
          <input v-model="dateRangeStart" type="datetime-local" class="form-control">
          <span class="fw-semi-bold px-2">s/d</span>
          <input v-model="dateRangeEnd" type="datetime-local" class="form-control">
        </div>
      </div>
      <div class="table-scrollable-wrapper" style="min-height: 2vh; max-height: 42vh;">
        <table class="table table-scrollable">
          <thead>
            <tr class="p-0">
              <th class="py-1 bg-white">#</th>
              <th class="py-1 bg-white">ID Transaksi</th>
              <th class="py-1 bg-white">Transfer Data</th>
              <th class="py-1 bg-white">Sales By</th>
              <th class="py-1 bg-white">Pembayaran</th>
              <th class="py-1 bg-white">Total Jual</th>
              <th class="py-1 bg-white">Waktu Transaksi</th>
              <th class="py-1 bg-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(trans, index) in dataAllTransaction" :key="trans.ducNum">
              <td>{{ index + 1 }}</td>
              <td>{{ trans.ducNum }}</td>
              <td>
                <span class="badge rounded-pill" :class="trans.confirm_transfer ? 'badge-subtle-success' : 'badge-subtle-secondary'">
                  {{ trans.confirm_transfer ? 'Transfered' : 'Not-Transfer' }}
                </span>
              </td>
              <td>{{ trans.sales_type.nama_sales }}</td>
              <td><img :src="'src/assets/img/po-img/' + trans.payment_type.image" height="23" alt=""></td>
              <td class="text-warning">Rp {{ $root.formatPrice(trans.paymentAmount) }}</td>
              <td>{{ formatDateTime(trans.docDate) }}</td>
              <td>
                <button class="btn btn-link p-0 me-1" type="button" @click="showDetailTransaction(trans)">
                  <span class="far fa-eye text-primary"></span>
                </button>
                <button class="btn btn-link p-0" type="button">
                  <span class="fas fa-print text-secondary"> </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  
  <div class="modal fade" id="modalViewProduct" tabindex="0" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 1100px">
      <div class="modal-content position-relative">
        <div class="modal-body p-0">
          <div class="card">
            <div class="bg-holder bg-card" style="background-image:url(src/assets/img/illustration/corner-1i.png); background-size: cover;"></div>
            <div class="card-body position-relative p-2">
              <div v-if="selectedTrView" class="mb-3 mt-2">
                <div class="row align-items-center text-center mx-0">
                  <div class="col-sm-6 text-sm-start">
                    <img src="@/assets/img/mtsiconland.png" alt="invoice" height="55">
                  </div>
                  <div class="col text-sm-end mt-3 mt-sm-0">
                    <h3>Detail Transaksi</h3>
                    <h6 class="mb-0"><u>Transaksi Number</u></h6>
                    <p class="fs-0 mb-0">{{ selectedTrView.ducNum }}</p>
                    <h6 class="mb-0"><u>Status Transfer Data</u></h6>
                    <span class="badge rounded-pill" :class="selectedTrView.confirm_transfer ? 'badge-subtle-success' : 'badge-subtle-secondary'">
                      {{ selectedTrView.confirm_transfer ? 'Transfered' : 'Not-Transfer' }}
                    </span>
                  </div>
                  <div class="col-12">
                    <hr class="my-3 my-sm-1">
                  </div>
                </div>
                
                <div class="row align-items-center mx-0">
                  <div class="col text-center text-sm-start">
                    <h6 class="text-600 mb-0"><u>Transaksi Dari</u></h6>
                    <h5 class="mb-0">{{ selectedTrView.member.nama }}</h5>
                    <p class="fs--1 mb-1">
                      Member ID: {{ selectedTrView.member.member_id }}
                    </p>
                    <p class="fs--1">
                      <a :href="`mailto:${selectedTrView.member.email}`">{{ selectedTrView.member.email }}</a>
                      <br>
                      <a :href="`tel:${selectedTrView.member.no_hp}`">{{ selectedTrView.member.no_hp }}</a>
                    </p>
                  </div>
                  <div class="col-sm-auto ms-auto">
                    <div class="table-responsive">
                      <table class="table table-sm table-borderless fs--1">
                        <tbody>
                          <tr>
                            <th class="text-end py-0">Sales By:</th>
                            <td class="p-0 text-sm-end">
                              <span class="text-info fw-bold fs--1">{{ selectedTrView.sales_type.nama_sales }}</span>
                            </td>
                          </tr>
                          <tr>
                            <th class="text-end py-0">Waktu Transaksi:</th>
                            <td class="p-0 text-sm-end">
                              {{ formatDateTime(selectedTrView.docDate) }}
                            </td>
                          </tr>
                          <tr>
                            <th class="text-end">Metode Bayar:</th>
                            <td class="p-0 text-sm-end">
                              <img :src="'src/assets/img/po-img/' + selectedTrView.payment_type.image" height="18" alt="">
                            </td>
                          </tr>
                          <tr class="align-middle">
                            <th class="text-end py-0">Unik Number:</th>
                            <td class="p-0 pb-2 text-sm-end">
                              <span class="badge bg-dark dark__bg-dark">{{ selectedTrView.uniquePayment }}</span>
                            </td>
                          </tr>
                          <tr class="alert alert-success fw-bold">
                            <th class="text-success-emphasis text-end">Jumlah Bayar:</th>
                            <td class="text-success-emphasis text-sm-end">
                              Rp {{ $root.formatPrice(selectedTrView.paymentAmount) }},00
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div class="table-scrollable-wrapper mb-2 fs--1 mx-3" style="min-height: 1vh; max-height: 26vh;">
                  <table class="table table-scrollable border-bottom table-sm">
                    <thead>
                      <tr>
                        <th class="text-white bg-primary py-1 border-0">#</th>
                        <th class="text-white bg-primary py-1 border-0 text-center">Image</th>
                        <th class="text-white bg-primary py-1 border-0">Products</th>
                        <th class="text-white bg-primary py-1 border-0 text-center">Quantity</th>
                        <th class="text-white bg-primary py-1 border-0 text-center">Harga</th>
                        <th class="text-white bg-primary py-1 border-0 text-end">Jumlah</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(data, index) in selectedTrView.all_data_tr_d1">
                        <td class="align-middle">{{ index + 1 }}</td>
                        <td class="align-middle text-center">
                          <img class="img-product rounded-2" :src="'src/assets/img/product/' + data.product.image" alt="">
                        </td>
                        <td class="align-middle">
                          <h6 class="mb-0 text-nowrap">{{ data.product.itemName }}</h6>
                          <p class="mb-0">{{ data.product.itemCode }}</p>
                        </td>
                        <td class="align-middle text-center">x{{ data.qty }}</td>
                        <td class="align-middle text-center">Rp {{ $root.formatPrice($root.filterPriceProduct(data.product).price) }}</td>
                        <td class="align-middle text-end">
                          Rp
                          {{ $root.formatPrice(data.qty * $root.filterPriceProduct(data.product).price) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="row justify-content-end mx-0">
                  <div class="col-12">
                    <table class="table table-sm table-borderless fs--1">
                      <tbody>
                        <tr>
                          <th class="text-1000 fs-0">Billing Detail:</th>
                        </tr>
                        <tr>
                          <th class="text-900">Subtotal</th>
                          <td class="fw-semi-bold text-end">Rp {{ $root.formatPrice(selectedTrView.subTotalAmount) }}</td>
                        </tr>
                        <tr v-if="selectedTrView.totalDicountAmount && selectedTrView.totalDicountAmount > 0" class="border-top">
                          <th class="text-900">Hemat Diskon</th>
                          <td class="fw-semi-bold text-end">Rp {{ $root.formatPrice(selectedTrView.totalDicountAmount) }}</td>
                        </tr>
                        <tr v-if="selectedTrView.extraDiscountAmount && selectedTrView.extraDiscountAmount > 0" class="border-top">
                          <th class="text-900">Diskon Reseller</th>
                          <td class="fw-semi-bold text-end">-Rp {{ $root.formatPrice(selectedTrView.extraDiscountAmount) }}</td>
                        </tr>
                        <tr v-if="selectedTrView.amountDiskonPoint && selectedTrView.amountDiskonPoint > 0" class="border-top">
                          <th class="text-900">Point Member</th>
                          <td class="fw-semi-bold text-end">-Rp {{ $root.formatPrice(selectedTrView.amountDiskonPoint) }}</td>
                        </tr>
                        <tr class="border-top border-top-2 fw-bolder">
                          <th class="text-900">Total</th>
                          <td class="text-end fs-0 text-dark">Rp {{ $root.formatPrice(selectedTrView.paymentAmount) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!-- <div v-else class="text-center mb-5">
                <div class="mt-5">
                  <img src="@/assets/img/mtsiconland.png" width="200" alt="" />
                </div>
                <h5 class="fs-0 mt-3">
                  Transaksi Tidak Ditemukan!
                </h5>
              </div> -->
              <div v-if="selectedTrView" class="text-end px-3 pb-2">
                <button class="btn btn-secondary btn-sm me-2">Invoice <span class="fas fa-print"></span></button>
                <button class="btn btn-secondary btn-sm me-2">Struk <span class="fas fa-print"></span></button>
                <button class="btn btn-primary btn-sm" data-bs-dismiss="modal">Selesai</button>
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
    name: 'Transaksi',
    data(){
      return{
        local_storage: this.$root.local_storage,
        dataAllTransaction: [],

        dateRangeStart: null,
        dateRangeEnd: null,

        selectedTrView: null,
      }
    },

    async beforeMount(){
      this.dateRangeStart = this.formatDateRangeNow();
      this.dateRangeEnd = this.formatDateRangeNow();

      await this.loadAllData();
    },
    

    methods: {
      loadAllData: async function(){
        this.$root.showLoading();

        try{
          const check_uuid = localStorage.getItem(this.local_storage.is_dynamic);
          const getAllDataTr = await axios({
            method: 'get',
            url: this.$root.API_URL + '/transaksi/getTrByUserLogin/' + check_uuid,
          });

          if(getAllDataTr.status == 200){
            this.dataAllTransaction = getAllDataTr.data;
          }
        } catch (error) {
          console.log(error);
        }
        
        this.$root.hideLoading();
      },

      showDetailTransaction: function(trans){
        this.selectedTrView = trans;
        $('#modalViewProduct').modal('show');
      },

      formatDateRangeNow: function(){
        const date = new Date();
        date.setHours(0, 0, 0, 0);

        const localDate = new Date(
          date.getTime() - date.getTimezoneOffset() * 60000
        );

        return localDate.toISOString().slice(0, 16);
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
    },
  }
</script>
<style scoped>
.img-product{
  height: 35px;
  width: 60px;
  object-fit: cover;
}
</style>