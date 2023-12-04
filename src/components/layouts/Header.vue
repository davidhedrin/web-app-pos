<template>
  <nav class="navbar navbar-light navbar-glass navbar-top navbar-expand py-2" style="min-height: 0;">
    <button class="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button" data-bs-toggle="collapse"
      data-bs-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse" aria-expanded="false"
      aria-label="Toggle Navigation"><span class="navbar-toggle-icon"><span class="toggle-line"></span></span>
    </button>
    <a href="#" class="navbar-brand me-1 me-sm-3">
      <div class="d-flex align-items-center"><img class="me-2" src="@/assets/img/mtsiconland.png" alt="" width="150"/></div>
    </a>
    
    <ul class="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
      <li v-if="$root.dataAuthToken && $root.selectedStoreAccess" class="nav-item d-none d-md-block">
        <span>{{ $root.dataAuthToken.nama_lengkap }} ({{ $root.selectedStoreAccess.storeName }})</span>
      </li>
      <li class="nav-item">
        <a @click="validateGoto(pages.sales)" class="nav-link py-0" role="button">
          <span class="fas fa-cash-register" data-fa-transform="shrink-6" style="font-size: 33px;"></span>
        </a>
      </li>
      <li v-if="$root.dataAuthToken && $root.dataAuthToken.flag_active" class="nav-item dropdown">
        <a class="nav-link fa-icon-wait nine-dots py-0" id="navbarDropdownMenuMaster" role="button" data-hide-on-body-scroll="data-hide-on-body-scroll" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="43" viewBox="0 0 16 16" fill="none">
            <circle cx="2" cy="2" r="2" fill="#6C6E71"></circle>
            <circle cx="2" cy="8" r="2" fill="#6C6E71"></circle>
            <circle cx="2" cy="14" r="2" fill="#6C6E71"></circle>
            <circle cx="8" cy="8" r="2" fill="#6C6E71"></circle>
            <circle cx="8" cy="14" r="2" fill="#6C6E71"></circle>
            <circle cx="14" cy="8" r="2" fill="#6C6E71"></circle>
            <circle cx="14" cy="14" r="2" fill="#6C6E71"></circle>
            <circle cx="8" cy="2" r="2" fill="#6C6E71"></circle>
            <circle cx="14" cy="2" r="2" fill="#6C6E71"></circle>
          </svg>
        </a>
        <div class="dropdown-menu dropdown-caret dropdown-menu-end dropdown-menu-card dropdown-caret-bg py-0" aria-labelledby="navbarDropdownMenuMaster">
          <div class="card shadow-none p-2" style="width: 300px;">
            <div class="scrollable-customize" style="max-height: 350px;">
              <div class="row gx-0 gy-0">
                <div class="col-12 px-0">
                  <span class="px-1">Main Menu</span>
                </div>
                <div class="col-4">
                  <a @click="validateGoto(pages.dashboard)" class="d-block hover-bg-200 px-1 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-chart-pie" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">Dashboard</p>
                  </a>
                </div>
                <div class="col-4">
                  <a @click="validateGoto(pages.transaksi)" class="d-block hover-bg-200 px-1 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-chart-line" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">Transaction</p>
                  </a>
                </div>
                <div class="col-4">
                  <a @click="validateGoto(pages.sales)" class="d-block hover-bg-200 px-1 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-cash-register" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">POS</p>
                  </a>
                </div>
                <div class="col-4">
                  <a @click="validateGoto(pages.receiptitem)" class="d-block hover-bg-200 px-1 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-boxes" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">Goods Receipt</p>
                  </a>
                </div>
                <div class="col-4">
                  <a @click="validateGoto(pages.syncdata)" class="d-block hover-bg-200 px-1 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-sync" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">Sync Data</p>
                  </a>
                </div> 
              </div>

              <div v-if="$root.dataAuthToken && $root.dataAuthToken.role.id == '1'" class="row gx-0 gy-0">
                <div class="col-12 px-0">
                  <hr class="my-2 bg-200">
                  <span class="px-1">Master Menu</span>
                </div>
                <div class="col-4">
                  <a @click="validateGoto(pages.productlist)" class="d-block hover-bg-200 px-1 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-dolly" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">All Product</p>
                  </a>
                </div>
                <div class="col-4">
                  <a @click="validateGoto(pages.promoproduct)" class="d-block hover-bg-200 px-1 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-box-open" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">Promo Product</p>
                  </a>
                </div>
                <div class="col-4">
                  <a @click="validateGoto(pages.promolist)" class="d-block hover-bg-200 px-1 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-ticket-alt" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">Promo List</p>
                  </a>
                </div>
                <div class="col-4">
                  <a class="d-block hover-bg-200 px-1 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-tags" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">Bundle</p>
                  </a>
                </div>

                <div class="col-4">
                  <a @click="validateGoto(pages.userlist)" class="d-block hover-bg-200 px-1 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-users" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">User List</p>
                  </a>
                </div>
              </div>
              
              <div class="row gx-0 gy-0">
                <div class="col-12 px-0">
                  <hr class="my-2 bg-200">
                  <span class="px-1">Setting</span>
                </div>
                <div class="col-4">
                  <a @click="validateGoto(pages.profile)" class="d-block hover-bg-200 px-1 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-user" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">Account</p>
                  </a>
                </div>
                <div class="col-4">
                  <a @click="$root.clearSessionLocalStorege()" class="d-block hover-bg-200 px-1 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-sign-out-alt" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">Logout</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link py-0" id="navbarDropdownUser" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <div class="avatar avatar-xl">
            <img class="rounded-circle" src="@/assets/img/profile.png" alt="" />
          </div>
        </a>
        <div class="dropdown-menu dropdown-caret dropdown-menu-end py-0" aria-labelledby="navbarDropdownUser">
          <div class="card shadow-none py-2">
            <div v-if="$root.dataAuthToken">
              <span class="dropdown-item">
                <span class="far fa-user"></span> :
                {{ $root.dataAuthToken.nama_lengkap }}
              </span>
              <!-- href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#modalSelectAccessStoreHeader" -->
              <span v-if="$root.selectedStoreAccess" class="dropdown-item">
                <span class="fas fa-store-alt"></span> :
                {{ $root.selectedStoreAccess.storeName }}
              </span>
              <div class="dropdown-divider"></div>
            </div>
            <a @click="validateGoto(pages.profile)" class="dropdown-item" href="javascript:void(0)">
              <span class="fas fa-user"></span>
              Account
            </a>
            <a v-on:click="$root.clearSessionLocalStorege()" class="dropdown-item" href="javascript:void(0)">
              <span class="fas fa-sign-out-alt"></span>
              Logout
            </a>
          </div>
        </div>
      </li>
    </ul>
  </nav>
  
  <!-- <div class="modal fade" id="modalSelectAccessStoreHeader" tabindex="0" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
      <div class="modal-content position-relative">
        <form @submit.prevent="selesaiSelectStoreAccessBtn()" id="formApproveUserHeader">
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
            <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Batal</button>
            <button class="btn btn-primary btn-sm" type="submit">Selesai</button>
          </div>
        </form>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  name: 'Header',

  data(){
    return{
      local_storage: this.$root.local_storage,
      pages: this.$root.pages,

      accessStoreUser: [],
      selectedStoreOutlet: null,
    }
  },

  // computed: {
  //   handleFormatStoreOutlet(){
  //     if(this.accessStoreUser){
  //       return this.accessStoreUser.map(store => {
  //         store.storeName = store.store_outlet.storeName;
  //         return store;
  //       });
  //     }
  //   }
  // },

  async beforeMount(){
    let check_uuid = localStorage.getItem(this.local_storage.is_dynamic);
    const getUserLog = await this.$root.checkUserRegistered(check_uuid);
    this.accessStoreUser = getUserLog.access_store_outlet;

    this.selectedStoreOutlet = this.$root.selectedStoreAccess;
  },

  methods: {
    validateGoto: function(goto){
      const dataAuth = this.$root.dataAuthToken;
      if(dataAuth){
        if(dataAuth.flag_active == true){
          if(this.$root.superAdminMenu.includes(goto)){
            if(dataAuth.role.id == 1){
              this.$root.goto(goto);
            }
          }else{
            this.$root.goto(goto);
          }
        }
      }
      else{
        return false;
      }
    },
    
    selesaiSelectStoreAccessBtn: async function(){
      if(this.selectedStoreOutlet == null){
        $('#select_access_store_outlet').addClass('border-red');
        return false;
      }

      $('#modalSelectAccessStoreHeader').modal('hide');
      this.$root.selectedStoreAccess = this.selectedStoreOutlet;
      localStorage.setItem(this.local_storage.access_store, JSON.stringify(this.selectedStoreOutlet));
    },
  }
}
</script>