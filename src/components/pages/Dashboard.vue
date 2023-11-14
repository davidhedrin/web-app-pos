<template>
  <div class="card shadow-none border mb-3">
    <div class="bg-holder bg-card d-none d-md-block" style="background-image:url(src/assets/img/illustration/reports-bg.png);"></div><!--/.bg-holder-->
    <div class="card-header z-1">
      <div class="row flex-between-center gx-0">
        <div class="col-lg-auto d-flex align-items-center">
          <img class="img-fluid" src="@/assets/img/illustration/reports-greeting.png" alt="">
          <div class="ms-x1">
            <h6 class="mb-1 text-primary">Welcome to</h6>
            <h4 class="mb-0 text-primary fw-bold"><span class="text-primary fw-medium">Martha Tilaar Shop </span>Sales POS</h4>
          </div>
        </div>
        <div class="col-lg-auto">
          <div class="row">
            <div class="col-lg-auto pt-3 pt-lg-0">
              <div class="row flex-lg-column flex-xxl-row gx-3 gy-2 align-items-center align-items-lg-start align-items-xxl-center">
                <div class="col-auto">
                  <h6 class="text-700 mb-0">Store Active: </h6>
                </div>
                <div class="col-md-auto position-relative">
                  <div class="input-group">
                    <input :value="selectedStoreOutlet ? `${selectedStoreOutlet.store_outlet.storeName} (${selectedStoreOutlet.store_code})` : ''" class="form-control datetimepicker flatpickr-input" type="text" readonly="readonly">
                    <button class="btn btn-primary btn-sm card-link" type="button" data-bs-toggle="modal" data-bs-target="#modalSelectAccessStore">
                      <span class="me-1">Pindah</span> <span class="fas fa-store-alt"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-auto pt-3 pt-lg-0">
              <div class="row flex-lg-column flex-xxl-row gx-3 gy-2 align-items-center align-items-lg-start align-items-xxl-center">
                <div class="col-auto">
                  <h6 class="text-700 mb-0">Tanggal: </h6>
                </div>
                <div class="col-md-auto position-relative">
                  <input :value="dateNow" class="form-control datetimepicker ps-4 flatpickr-input" type="text" readonly="readonly">
                  <span class="fas fa-calendar-alt text-primary position-absolute top-50 translate-middle-y ms-2"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card bg-transparent-50 mb-3 overflow-hidden">
    <div class="card-header position-relative">
      <div class="bg-holder d-none d-md-block bg-card z-1"
        style="background-image:url(src/assets/img/ecommerce-bg.png);background-size:230px;background-position:right bottom;z-index:-1;">
      </div><!--/.bg-holder-->
      <div class="position-relative z-2">
        <div>
          <h3 class="text-primary fw-light overflow-hidden mb-0">
            {{ dataUserLogin ? 'Good Morning,' : '...' }}
            <span class="typed-text fw-bold ms-1">{{ dataUserLogin && dataUserLogin.nama_lengkap + '!' }}</span>
          </h3>
          <p>Here’s what happening with your store today </p>
        </div>
        <div class="d-flex py-1">
          <div class="pe-3">
            <p class="text-600 fs--1 fw-medium">Transaction </p>
            <h4 class="text-800 mb-0">149</h4>
          </div>
          <div class="ps-3">
            <p class="text-600 fs--1">Month Incentive </p>
            <h4 class="text-800 mb-0">Rp 10.000 </h4>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body p-0">
      <ul class="mb-0 list-unstyled list-group font-sans-serif">
        <li class="list-group-item mb-0 rounded-0 py-3 px-x1 list-group-item-warning border-x-0 border-top-0">
          <div class="row flex-between-center">
            <div class="col">
              <div class="d-flex">
                <div class="fas fa-circle mt-1 fs--2"></div>
                <p class="fs--1 ps-2 mb-0"><strong>5 products</strong> didn’t publish to your Facebook page
                </p>
              </div>
            </div>
            <div class="col-auto d-flex align-items-center">
              <a class="fs--1 fw-medium text-warning-emphasis" href="#!">View products <i class="fas fa-chevron-right ms-1 fs--2"></i></a>
            </div>
          </div>
        </li>
        <li class="list-group-item mb-0 rounded-0 py-3 px-x1 greetings-item text-700 border-x-0 border-top-0">
          <div class="row flex-between-center">
            <div class="col">
              <div class="d-flex">
                <div class="fas fa-circle mt-1 fs--2 text-primary"></div>
                <p class="fs--1 ps-2 mb-0"><strong>7 orders</strong> have payments that need to be captured
                </p>
              </div>
            </div>
            <div class="col-auto d-flex align-items-center"><a class="fs--1 fw-medium" href="#!">
              View payments <i class="fas fa-chevron-right ms-1 fs--2"></i></a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div class="card mb-3">
    <div class="card-body">
      <h5 class="text-primary">
        Daftar Product, <span class="typed-text fw-bold ms-1">Kalapa Gading</span>
      </h5>
      <div class="row align-items-center">
        <div class="col-md-8">
          <span class="fs--1">
            Store: <strong class="text-dark">Kalapa Gading</strong> <br>
            Alamat: Alamat
          </span>
        </div>
        <div class="col-md-4">
          <form @submit.prevent="">
            <div class="input-group">
              <input class="form-control search-input fuzzy-search" type="search" placeholder="Search...">
              <button class="btn btn-primary card-link" type="submit" style="z-index: 1"><span class="fas fa-search"></span></button>
            </div>
          </form>
        </div>
      </div>

      <div class="table-responsive scrollbar">
        <table class="table table-hover table-striped overflow-hidden mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th scope="col">Kode</th>
              <th scope="col">Name</th>
              <th scope="col">Stok</th>
              <th scope="col">Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr class="align-middle" v-for="(product, index) in dataAllProduct">
              <td>{{ index + 1 }}</td>
              <td class="text-nowrap">{{ product.itemCode }}</td>
              <td class="text-nowrap">
                {{ product.itemName }}
              </td>
              <td class="text-nowrap text-success fw-semi-bold">{{ $root.filterStokProduct(product).onHand }}</td>
              <td class="text-nowrap">Rp {{ $root.formatPrice($root.filterPriceProduct(product).price) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- <div class="accordion" id="accordionExample" v-for="(store, index) in accessStoreUser">
    <div class="accordion-item mb-3">
      <h2 class="accordion-header" :id="`heading${index + 1}`">
        <button class="accordion-button fs-1 collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#multiCollapseExample${index + 1}`" aria-expanded="false" :aria-controls="`multiCollapseExample${index + 1}`">
          Daftar Product, <span class="typed-text fw-bold ms-1">{{ store.store_outlet.storeName }}</span>
        </button>
      </h2>
      <div class="collapse multi-collapse" :id="`multiCollapseExample${index + 1}`">
        <div class="card">
          <div class="card-header pb-1">
            <div class="row align-items-center">
              <div class="col-md-8 mb-2">
                <span class="fs--1">
                  Store: <strong class="text-dark">{{ store.store_outlet.storeName }}</strong> <br>
                  Alamat: {{ store.store_outlet.address }}
                </span>
              </div>
              <div class="col-md-4">
                <form @submit.prevent="">
                  <div class="input-group">
                    <input class="form-control search-input fuzzy-search" type="search" placeholder="Search...">
                    <button class="btn btn-primary card-link" type="submit" style="z-index: 1"><span class="fas fa-search"></span></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive scrollbar">
              <table class="table table-hover table-striped overflow-hidden">
                <thead>
                  <tr>
                    <th>#</th>
                    <th scope="col">Kode</th>
                    <th scope="col">Name</th>
                    <th scope="col">Stok</th>
                    <th scope="col">Harga</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="align-middle" v-for="(product, index) in filterProductStore(store.store_code)">
                    <td>{{ index + 1 }}</td>
                    <td class="text-nowrap">{{ product.itemCode }}</td>
                    <td class="text-nowrap">
                      {{ product.itemName }}
                    </td>
                    <td class="text-nowrap text-success fw-semi-bold">{{ product.inventory_stok.onHand }}</td>
                    <td class="text-nowrap">Rp {{ $root.formatPrice(product.product_price.price) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->

  <div class="modal fade" id="modalSelectAccessStore" tabindex="0" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
      <div class="modal-content position-relative">
        <form @submit.prevent="selesaiSelectStoreAccessBtn()" id="formApproveUser">
          <div class="modal-body p-0">
            <div class="py-3 text-center">
              <div class="d-flex justify-content-center mb-2 mt-2">
                <img src="@/assets/img/ecommerce-bg.png" height="160" alt="">
              </div>
              <h5 class="m-0 px-1 mb-0">
                Pilih akses store!
              </h5>
              <p class="m-0 px-3 mb-2">
                Lanjutkan pilih store/outlet untuk diakses.
              </p>
              <div class="m-0 px-3">
                <v-select id="select_access_store_outlet"
                  v-model="selectedStoreOutlet"
                  :options="handleFormatStoreOutlet" 
                  value="store_code" 
                  label="storeName"
                  placeholder="Pilih store outlet"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button v-if="selectedStoreOutlet == null" class="btn btn-secondary btn-sm" type="button" @click="logoutModalSelectStoreBtn()">Logout <span class="fas fa-sign-out-alt"></span></button>
            <button v-else class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Batal</button>
            <button class="btn btn-primary btn-sm" type="submit">Selesai</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'Dashboard',
    data(){
      return{
        local_storage: this.$root.local_storage,

        dateNow: null,
        dataUserLogin: null,
        accessStoreUser: [],

        dataAllProduct: [],

        selectedStoreOutlet: null,
      }
    },

    computed: {
      handleFormatStoreOutlet(){
        return this.accessStoreUser.map(store => {
          store.storeName = store.store_outlet.storeName;
          return store;
        });
      }
    },

    async beforeMount(){
      this.dateNow = this.$root.formatDateIdn(new Date());
      await this.loadAllDatas();
    },

    methods: {
      loadAllProduct: async function(){
        try{
          const store = await axios({
            method: 'get',
            url: this.$root.API_URL + '/master-product/get-all-prodcut',
          });
          const getDataProduct = store.data;
          
          return getDataProduct;
        } catch (error) {
          console.log(error);
          return null;
        }
      },

      loadAllDatas: async function(){
        try{
          const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
          let check_uuid = localStorage.getItem(this.local_storage.is_dynamic);

          const getUserLogo = await this.$root.checkUserRegistered(check_uuid);
          if(getUserLogo){
            this.dataUserLogin = getUserLogo;
            this.accessStoreUser = getUserLogo.access_store_outlet;
            const getAllProduct = await this.loadAllProduct();
            
            if(cacheStoreAccess == null){
              if(getUserLogo.access_store_outlet.length > 1) {
                $('#modalSelectAccessStore').modal('show');
              }else{
                const firstUserStoreAccess = getUserLogo.access_store_outlet[0];
                firstUserStoreAccess.storeName = firstUserStoreAccess.store_outlet.storeName;

                this.selectedStoreOutlet = firstUserStoreAccess;
                this.dataAllProduct = getAllProduct;
              }
            }else{
              this.selectedStoreOutlet = cacheStoreAccess;
              this.dataAllProduct = getAllProduct;
            }
          }else{
            this.$root.clearSessionLocalStorege();
          }
        } catch (error) {
          console.log(error);
        }
        this.$root.hideLoading();
      },

      selesaiSelectStoreAccessBtn: async function(){
        if(this.selectedStoreOutlet == null){
          $('#select_access_store_outlet').addClass('border-red');
          return false;
        }

        $('#modalSelectAccessStore').modal('hide');
        this.$root.showLoading();
        this.$root.selectedStoreAccess = this.selectedStoreOutlet;
        localStorage.setItem(this.local_storage.access_store, JSON.stringify(this.selectedStoreOutlet));

        const getAllProduct = await this.loadAllProduct();
        this.dataAllProduct = getAllProduct;
        
        this.$root.hideLoading();
      },

      logoutModalSelectStoreBtn: function(){
        $('#modalSelectAccessStore').modal('hide');
        this.$root.clearSessionLocalStorege();
      }
    }
  }
</script>