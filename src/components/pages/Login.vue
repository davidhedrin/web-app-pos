<template>
  <div class="row min-vh-100 flex-center g-0">
    <div class="col-lg-8 col-xxl-5 py-3 position-relative">
      <img class="bg-auth-circle-shape" src="@/assets/img/auth/bg-shape.png" alt="" width="250">
      <img class="bg-auth-circle-shape-2" src="@/assets/img/auth/shape-1.png" alt="" width="150">
      <div class="card overflow-hidden z-1">
        <div class="card-body p-0">
          <div class="row g-0 h-100">
            <div class="col-md-6 text-center bg-card-gradient">
              <div class="position-relative p-4 pt-md-5 pb-md-7" data-bs-theme="light">
                <div class="bg-holder bg-auth-card-shape" style="background-image: url(src/assets/img/auth/half-circle.png);"></div>
                <div class="z-1 position-relative">
                  <a class="link-light mb-4 font-sans-serif fs-4 d-inline-block fw-bolder" href="javascript:void(0)">
                    <img src="@/assets/img/mtsiconland-white.png" alt="" width="250"/>
                  </a>
                  <p class="opacity-75 text-white">With the power of Falcon, you can now focus only on
                    functionaries for your digital products, while leaving the UI design on us!</p>
                </div>
              </div>
              <div class="mt-0" data-bs-theme="light">
                <p class="text-white">
                  Don't have an account?<br>
                  <a href="javascript:void(0)" class="text-decoration-underline link-light">Register Here!</a>
                </p>
                <p class="mb-4 mt-4 mt-md-2 fs--1 fw-semi-bold text-white opacity-75">Read our
                  <a class="text-decoration-underline text-white" href="javascript:void(0)">terms</a> and
                  <a class="text-decoration-underline text-white" href="javascript:void(0)">conditions </a>
                </p>
              </div>
            </div>
            <div class="col-md-6 d-flex flex-center">
              <div class="px-4 py-4 flex-grow-1">
                <div class="row flex-between-center mb-2">
                  <div class="col-auto">
                    <h3>Account Login</h3>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="d-flex justify-content-between">
                    <label class="form-label" for="card-email">Email address</label>
                  </div>
                  <input class="form-control" id="card-email" type="email" placeholder="Enter email address">
                </div>
                <div class="mb-3">
                  <div class="d-flex justify-content-between">
                    <label class="form-label" for="card-password">Password</label>
                  </div>
                  <input class="form-control" id="card-password" type="password" placeholder="***********">
                </div>
                <div class="row flex-between-center">
                  <!-- <div class="col-auto">
                    <div class="form-check mb-0">
                      <input class="form-check-input" type="checkbox" id="card-checkbox">
                      <label class="form-check-label mb-0" for="card-checkbox"> Remember me</label>
                    </div>
                  </div> -->
                  <div class="col-auto"><a class="fs--1" href="javascript:void(0)">Forgot Password?</a></div>
                </div>
                <div class="mb-4">
                  <button @click="executeLogin" class="btn btn-primary d-block w-100 mt-3">Login</button>
                </div>

                <div class="position-relative mb-4">
                  <hr>
                  <div class="divider-content-center">or log in with</div>
                </div>
                
                <div class="g-2"><!-- @click="executeLoginSSO" -->
                  <button @click="executeLoginSSO" class="btn btn-outline-google-plus d-block w-100">
                    Login SSO
                  </button>
                </div>
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
  name: 'Login',
  data(){
    return {
    }
  },

  mounted(){
    this.cekToken();
  },

  methods: {
    executeLogin(){
      this.$root.goto('dashboard');
      window.location.reload();
    },

    executeLoginSSO(){
      window.location.href = this.$root.APP_SSO_URL;
    },

    async cekToken(){
      this.$root.showLoading();

      const getTokenSSO = localStorage.getItem("token_sso");
      if(getTokenSSO){
        const getStatusToken = await this.$root.checkAuthenticationToken();
        if(getStatusToken){
          const current_page = sessionStorage.getItem('current_page');
          if(current_page){
            this.$root.goto(current_page);
            window.location.reload();
          }else{
            this.$root.goto('dashboard');
            window.location.reload();
          }
        }
      }else{
        const uri = new URL(window.location);
        const token_sso = uri.searchParams.get('app_token');
        if (token_sso != "undefined" && token_sso != null){
          localStorage.setItem("token_sso", token_sso);
          const getStatusToken = await this.$root.checkAuthenticationToken();
          
          if(getStatusToken){
            this.$root.goto('dashboard');
            window.location.reload();
          }

          const originalHost = window.location.origin;
          window.location.href = originalHost;
        }
      }
      this.$root.hideLoading();
    }
  }
}
</script>
