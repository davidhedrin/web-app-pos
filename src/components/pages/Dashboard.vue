<template>
  <div class="card shadow-none border mb-3">
    <div class="bg-holder bg-card d-none d-md-block" style="background-image:url(src/assets/img/illustration/reports-bg.png);"></div><!--/.bg-holder-->
    <div class="card-header z-1">
      <div class="row flex-between-center gx-0">
        <div class="col-lg-auto d-flex align-items-center"><img class="img-fluid" src="@/assets/img/illustration/reports-greeting.png" alt="">
          <div class="ms-x1">
            <h6 class="mb-1 text-primary">Welcome to</h6>
            <h4 class="mb-0 text-primary fw-bold"><span class="text-primary fw-medium">Martha Tilaar Shop </span>Sales POS</h4>
          </div>
        </div>
        <div class="col-lg-auto pt-3 pt-lg-0">
          <form class="row flex-lg-column flex-xxl-row gx-3 gy-2 align-items-center align-items-lg-start align-items-xxl-center">
            <div class="col-auto">
              <h6 class="text-700 mb-0">Tanggal: </h6>
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

  <div class="accordion" id="accordionExample" v-for="(store, index) in accessStoreUser">
    <div class="accordion-item mb-3">
      <h2 class="accordion-header" :id="`heading${index + 1}`"> <!-- :class="index > 0 && 'collapsed'" -->
        <button class="accordion-button fs-1 collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#multiCollapseExample${index + 1}`" aria-expanded="false" :aria-controls="`multiCollapseExample${index + 1}`">
          Daftar Product, <span class="typed-text fw-bold ms-1">{{ store.store_outlet.nama_toko }}</span>
        </button>
      </h2>
      <div class="collapse multi-collapse" :id="`multiCollapseExample${index + 1}`">
        <div class="card">
          <div class="card-header pb-1">
            <div class="row align-items-center">
              <div class="col-md-8 mb-2">
                <span class="fs--1">
                  Store: <strong class="text-dark">{{ store.store_outlet.nama_toko }}</strong> <br>
                  Alamat: {{ store.store_outlet.alamat }}
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
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'Dashboard',
    data(){
      return{
        dateNow: null,
        dataUserLogin: null,
        accessStoreUser: [],

        dataAllProduct: [],
      }
    },

    computed: {
      filterProductStore(){
        return (kodeStore) => {
          return this.dataAllProduct.filter(product => product.store_code === kodeStore);
        };
      }
    },

    async beforeMount(){
      this.dateNow = this.$root.formatDateIdn(new Date());
      await this.loadAllDatas();
    },

    methods: {
      loadAllDatas: async function(){
        try{
          let check_uuid = localStorage.getItem("is_dynamic");
          const getUserLogo = await this.$root.checkUserRegistered(check_uuid);
          this.dataUserLogin = getUserLogo;
          this.accessStoreUser = getUserLogo.access_store_outlet;
  
          const store = await axios({
            method: 'get',
            url: this.$root.API_URL + '/sales/getAllProduct',
          });
          const getDataProduct = store.data;

          this.dataAllProduct = getDataProduct.getAllProduct;
          // console.log(this.dataAllProduct);
        } catch (error) {
          console.log(error);
        }

        this.$root.hideLoading();
      },
    }
  }
</script>