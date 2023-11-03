<template>
  <nav class="navbar navbar-light navbar-vertical navbar-expand-xl">
    <div class="d-flex align-items-center">
      <div class="toggle-icon-wrapper">
        <button class="btn navbar-toggler-humburger-icon navbar-vertical-toggle" data-bs-toggle="tooltip"
          data-bs-placement="left" title="Toggle Navigation">
          <span class="navbar-toggle-icon">
            <span class="toggle-line"></span>
          </span>
        </button>
      </div>
      <a href="javascript:void(0)" class="navbar-brand">
        <div class="d-flex align-items-center py-3">
          <img class="me-2" src="@/assets/img/mtsiconland.png" alt="" width="150" />
        </div>
      </a>
    </div>
    <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
      <div class="navbar-vertical-content scrollbar">
        <ul class="navbar-nav flex-column mb-3" id="navbarVerticalNav">
          <li class="nav-item">
            <a v-on:click="validateGoto('dashboard')" href="javascript:void(0)" class="nav-link" role="button">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <span class="fas fa-chart-pie"></span>
                </span>
                <span class="nav-link-text ps-1">Dashboard</span>
              </div>
            </a>
          </li>
          
          <li class="nav-item">
            <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
              <div class="col-auto navbar-vertical-label">App</div>
              <div class="col ps-0">
                <hr class="mb-0 navbar-vertical-divider" />
              </div>
            </div>
            
            <a v-on:click="validateGoto('sales')" href="javascript:void(0)" class="nav-link" role="button">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <span class="fas fa-cash-register"></span>
                </span>
                <span class="nav-link-text ps-1">POS</span>
              </div>
            </a>
            
            <a class="nav-link" href="javascript:void(0)" role="button">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <span class="fas fa-calendar-alt"></span>
                </span>
                <span class="nav-link-text ps-1">Absensi</span>
              </div>
            </a>
          </li>
          
          <li v-if="this.$root.dataAuthToken && this.$root.dataAuthToken.role.id == '1'" class="nav-item">
            <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
              <div class="col-auto navbar-vertical-label">Master</div>
              <div class="col ps-0">
                <hr class="mb-0 navbar-vertical-divider" />
              </div>
            </div>
            
            <a class="nav-link dropdown-indicator collapsed" href="#master_promo" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="master_promo">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <span class="fas fa-tags"></span>
                </span>
                <span class="nav-link-text ps-1">Promo</span>
              </div>
            </a>
            <ul class="nav collapse" id="master_promo">
              <li class="nav-item">
                <a v-on:click="validateGoto('promo-product')" class="nav-link" href="javascript:void(0)">
                  <div class="d-flex align-items-center">
                    <span class="nav-link-text ps-1">Promo Product</span>
                  </div>
                </a>
              </li>
              <li class="nav-item">
                <a v-on:click="validateGoto('promo-list')" class="nav-link" href="javascript:void(0)">
                  <div class="d-flex align-items-center">
                    <span class="nav-link-text ps-1">Promo List</span>
                  </div>
                </a>
              </li>
            </ul>
            
            <a v-on:click="validateGoto('user-list')" class="nav-link" href="javascript:void(0)" role="button">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <span class="fas fa-users"></span>
                </span>
                <span class="nav-link-text ps-1">User List</span>
              </div>
            </a>

            
            <a class="nav-link dropdown-indicator collapsed" href="#master_product" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="master_product">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <span class="fas fa-dolly"></span>
                </span>
                <span class="nav-link-text ps-1">Product</span>
              </div>
            </a>
            <ul class="nav collapse" id="master_product">
              <li class="nav-item">
                <a v-on:click="validateGoto('product-list')" class="nav-link" href="javascript:void(0)">
                  <div class="d-flex align-items-center">
                    <span class="nav-link-text ps-1">Product List</span>
                  </div>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)">
                  <div class="d-flex align-items-center">
                    <span class="nav-link-text ps-1">Product Master</span>
                  </div>
                </a>
              </li>
            </ul>
          </li>
          
          <li class="nav-item">
            <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
              <div class="col-auto navbar-vertical-label">Setting</div>
              <div class="col ps-0">
                <hr class="mb-0 navbar-vertical-divider" />
              </div>
            </div>
            
            <a @click="validateGoto('profilepage')" class="nav-link" href="javascript:void(0)" role="button">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <span class="fas fa-user"></span>
                </span>
                <span class="nav-link-text ps-1">Account</span>
              </div>
            </a>
            
            <a class="nav-link" v-on:click="$root.clearSessionLocalStorege()" href="javascript:void(0)" role="button">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <span class="fas fa-sign-out-alt"></span>
                </span>
                <span class="nav-link-text ps-1">Logout</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',

  methods: {
    validateGoto: function(goto){
      $('#navbarVerticalCollapse').collapse('hide');
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
        // this.activeRoute = markRaw(routeComponent['profilepage']);
        // sessionStorage.setItem('current_page', 'profilepage');
        return false;
      }
    },
  }
}
</script>