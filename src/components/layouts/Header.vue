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
      <li v-if="$root.dataAuthToken" class="nav-item d-none d-md-block">
        <span>{{ $root.dataAuthToken.nama_lengkap }} ({{ $root.selectedStoreAccess.storeName }})</span>
      </li>
      <li class="nav-item">
        <a @click="validateGoto('sales')" class="nav-link py-0" role="button">
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
          <div class="card shadow-none p-2" style="width: 270px;">
            <div class="scrollable-customize" style="max-height: 250px;">
              <div class="row gx-0 gy-0">
                <div class="col-4">
                  <a @click="validateGoto('dashboard')" class="d-block hover-bg-200 px-2 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-chart-pie" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">Dashboard</p>
                  </a>
                </div>
                <div class="col-4">
                  <a class="d-block hover-bg-200 px-2 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-chart-line" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">Transaksi</p>
                  </a>
                </div>
                <div class="col-4">
                  <a @click="validateGoto('sales')" class="d-block hover-bg-200 px-2 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-cash-register" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">POS</p>
                  </a>
                </div>
              </div>

              <div v-if="$root.dataAuthToken && $root.dataAuthToken.role.id == '1'" class="row gx-0 gy-0">
                <div class="col-12 px-0">
                  <hr class="my-2 bg-200">
                  <span class="px-1">Master Menu</span>
                </div>
                <div class="col-4">
                  <a @click="validateGoto('promo-product')" class="d-block hover-bg-200 px-2 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-box-open" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">All Product</p>
                  </a>
                </div>
                <div class="col-4">
                  <a @click="validateGoto('promo-list')" class="d-block hover-bg-200 px-2 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-ticket-alt" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">Promo List</p>
                  </a>
                </div>
                <div class="col-4">
                  <a class="d-block hover-bg-200 px-2 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-tags" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">Bundle</p>
                  </a>
                </div>

                <div class="col-4">
                  <a @click="validateGoto('user-list')" class="d-block hover-bg-200 px-2 py-2 rounded-3 text-center text-decoration-none" href="javascript:void(0)">
                    <div class="avatar"> <span class="fas fa-users" style="font-size: 30px;"></span></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">User List</p>
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

            <!-- <a class="dropdown-item d-flex" href="#settings-offcanvas" data-bs-toggle="offcanvas">
              <span class="fa-spin d-flex flex-center ms-0 me-1">
                <span class="icon-spin d-flex flex-center text-dark">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.7369 12.3941L19.1989 12.1065C18.4459 11.7041 18.0843 10.8487 18.0843 9.99495C18.0843 9.14118 18.4459 8.28582 19.1989 7.88336L19.7369 7.59581C19.9474 7.47484 20.0316 7.23291 19.9474 7.03131C19.4842 5.57973 18.6843 4.28943 17.6738 3.20075C17.5053 3.03946 17.2527 2.99914 17.0422 3.12011L16.393 3.46714C15.6883 3.84379 14.8377 3.74529 14.1476 3.3427C14.0988 3.31422 14.0496 3.28621 14.0002 3.25868C13.2568 2.84453 12.7055 2.10629 12.7055 1.25525V0.70081C12.7055 0.499202 12.5371 0.297594 12.2845 0.257272C10.7266 -0.105622 9.16879 -0.0653007 7.69516 0.257272C7.44254 0.297594 7.31623 0.499202 7.31623 0.70081V1.23474C7.31623 2.09575 6.74999 2.8362 5.99824 3.25599C5.95774 3.27861 5.91747 3.30159 5.87744 3.32493C5.15643 3.74527 4.26453 3.85902 3.53534 3.45302L2.93743 3.12011C2.72691 2.99914 2.47429 3.03946 2.30587 3.20075C1.29538 4.28943 0.495411 5.57973 0.0322686 7.03131C-0.051939 7.23291 0.0322686 7.47484 0.242788 7.59581L0.784376 7.8853C1.54166 8.29007 1.92694 9.13627 1.92694 9.99495C1.92694 10.8536 1.54166 11.6998 0.784375 12.1046L0.242788 12.3941C0.0322686 12.515 -0.051939 12.757 0.0322686 12.9586C0.495411 14.4102 1.29538 15.7005 2.30587 16.7891C2.47429 16.9504 2.72691 16.9907 2.93743 16.8698L3.58669 16.5227C4.29133 16.1461 5.14131 16.2457 5.8331 16.6455C5.88713 16.6767 5.94159 16.7074 5.99648 16.7375C6.75162 17.1511 7.31623 17.8941 7.31623 18.7552V19.2891C7.31623 19.4425 7.41373 19.5959 7.55309 19.696C7.64066 19.7589 7.74815 19.7843 7.85406 19.8046C9.35884 20.0925 10.8609 20.0456 12.2845 19.7729C12.5371 19.6923 12.7055 19.4907 12.7055 19.2891V18.7346C12.7055 17.8836 13.2568 17.1454 14.0002 16.7312C14.0496 16.7037 14.0988 16.6757 14.1476 16.6472C14.8377 16.2446 15.6883 16.1461 16.393 16.5227L17.0422 16.8698C17.2527 16.9907 17.5053 16.9504 17.6738 16.7891C18.7264 15.7005 19.4842 14.4102 19.9895 12.9586C20.0316 12.757 19.9474 12.515 19.7369 12.3941ZM10.0109 13.2005C8.1162 13.2005 6.64257 11.7893 6.64257 9.97478C6.64257 8.20063 8.1162 6.74905 10.0109 6.74905C11.8634 6.74905 13.3792 8.20063 13.3792 9.97478C13.3792 11.7893 11.8634 13.2005 10.0109 13.2005Z" fill="#2A7BE4"></path>
                  </svg>
                </span>
              </span>
              Customized
            </a> -->
            <a @click="validateGoto('profilepage')" class="dropdown-item" href="javascript:void(0)">
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
  
  <div class="modal fade" id="modalSelectAccessStoreHeader" tabindex="0" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
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
  </div>
</template>

<script>
export default {
  name: 'Header',

  data(){
    return{
      local_storage: this.$root.local_storage,

      accessStoreUser: [],
      selectedStoreOutlet: null,
    }
  },

  computed: {
    handleFormatStoreOutlet(){
      if(this.accessStoreUser){
        return this.accessStoreUser.map(store => {
          store.storeName = store.store_outlet.storeName;
          return store;
        });
      }
    }
  },

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