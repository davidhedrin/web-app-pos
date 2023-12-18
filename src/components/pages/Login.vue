<template>
  <div class="row min-vh-100 flex-center g-0">
    <div class="col-lg-8 col-xxl-5 py-3 position-relative">
      <img class="bg-auth-circle-shape" src="@/assets/img/auth/bg-shape.png" alt="" width="250">
      <img class="bg-auth-circle-shape-2" src="@/assets/img/auth/shape-1.png" alt="" width="150">
      <div class="card overflow-hidden z-1">
        <div class="card-body p-0">
          <div class="row g-0 h-100">
            <div class="col-md-6 text-center bg-card-gradient">
              <div class="position-relative p-4 pt-md-6" data-bs-theme="light">
                <div class="bg-holder bg-auth-card-shape" style="background-image: url('assets/img/auth/half-circle.png');"></div>
                <div class="z-1 position-relative">
                  <a class="link-light pb-5 font-sans-serif fs-4 d-inline-block fw-bolder" href="javascript:void(0)">
                    <img src="@/assets/img/mtsiconland-white.png" alt="" width="300"/>
                  </a>
                  <p class="opacity-75 text-white">
                    Martha Tilaar Shop dikelola oleh PT Tara Parama Semesta yang juga menjadi anak perusahaan PT Martina Berto Tbk, perusahaan kecantikan ternama yang berdiri sejak tahun 1978. 
                  </p>
                </div>
              </div>
              <div class="mt-4 mb-4" data-bs-theme="light">
                <img src="@/assets/img/tps-mtg-logo-text-white.png" width="130" alt="">
              </div>
            </div>
            <div class="col-md-6 d-flex flex-center">
              <div class="px-4 py-4 flex-grow-1">
                <div class="row flex-between-center mb-2">
                  <div class="col-auto">
                    <h3>Account Login</h3>
                  </div>
                </div>
                <form @submit.prevent="executeLogin">
                  <div class="mb-3">
                    <label class="form-label" for="card-email">Email address</label>
                    <input v-model="dataLogin.email" class="form-control" id="card-email" type="email" placeholder="Enter email address">
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="card-password">Password</label>
                    <div class="input-group mb-3">
                      <input v-model="dataLogin.password" class="form-control" :type="togglePassword ? 'password' : 'text'" placeholder="***********" id="card-password"/>
                      <span class="input-group-text px-2 cursor-pointer" @click="togglePasswordAction()">
                        <div v-if="togglePassword">
                          <span class="far fa-eye"></span>
                        </div>
                        <div v-else>
                          <span class="far fa-eye-slash"></span>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div class="row flex-between-center">
                    <div class="col-auto"><a class="fs--1" href="javascript:void(0)">Forgot Password?</a></div>
                  </div>
                  <div class="mb-4">
                    <button type="submit" class="btn btn-primary d-block w-100 mt-3">Login</button>
                  </div>
                </form>

                <div class="position-relative mb-4">
                  <hr>
                  <div class="divider-content-center">or log in with</div>
                </div>
                
                <div class="g-2"><!-- @click="executeLoginSSO" -->
                  <button class="btn btn-outline-google-plus d-block w-100">
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
    data() {
      return {
        local_storage: this.$root.local_storage,
        pages: this.$root.pages,

        dataLogin: {
          email: null,
          password: null,
        },

        togglePassword: true,
      }
    },

    mounted(){
      this.cekToken();
    },

    methods: {
      executeLogin: async function(){
        this.$root.showLoading();
        try{
          const store = await axios({
            method: 'post',
            url: this.$root.API_ERP + '/pos/login',
            data: this.dataLogin
          });

          if(store.status == 200){
            const dataUser = store.data;
            localStorage.setItem(this.local_storage.is_dynamic, dataUser.user_uuid);

            if(dataUser.access_store_outlet.length == 1){
              const firstUserStoreAccess = dataUser.access_store_outlet[0];
              firstUserStoreAccess.storeName = firstUserStoreAccess.store_outlet.storeName;
              this.$root.selectedStoreAccess = firstUserStoreAccess;
            }
            
            if(dataUser.flag_active == true){
              this.$root.goto(this.pages.dashboard);
            }else{
              this.$root.goto(this.pages.profile);
            }
            
            window.location.reload();
          }else{
            this.$root.showAlertFunction('warning', 'Login Fatal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
          }

          this.$root.hideLoading();
        } catch (error) {
          if(error.response.status == 404){
            const responseData = error.response.data;
            this.$root.showAlertFunction('warning', 'Login Gagal!', responseData.message);
          } else if(error.response.status == 408){
            this.$root.showAlertFunction('danger', 'Login Gagal!', 'Percobaan login telah mencapai batas, tunggu dalam waktu ' + responseData.minute + ' menit');
          } else{
            this.$root.showAlertFunction('warning', 'Login Fatal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
          }
          this.$root.hideLoading();
          console.log(error);
        }
      },

      executeLoginSSO: function(){
        window.location.href = this.$root.APP_SSO_URL;
      },

      cekToken: async function (){
        this.$root.showLoading();

        // const getTokenSSO = localStorage.getItem("token_sso");
        // if(getTokenSSO){
        //   const getStatusToken = await this.$root.checkAuthenticationToken();
        //   if(getStatusToken){
        //     const current_page = sessionStorage.getItem('current_page');
        //     if(current_page){
        //       this.$root.goto(current_page);
        //       window.location.reload();
        //     }else{
        //       this.$root.goto('dashboard');
        //       window.location.reload();
        //     }
        //   }
        // }else{
        //   const uri = new URL(window.location);
        //   const token_sso = uri.searchParams.get('app_token');
        //   if (token_sso != "undefined" && token_sso != null){
        //     localStorage.setItem("token_sso", token_sso);
        //     const getStatusToken = await this.$root.checkAuthenticationToken();
            
        //     if(getStatusToken){
        //       this.$root.goto('dashboard');
        //       window.location.reload();
        //     }

        //     const originalHost = window.location.origin;
        //     window.location.href = originalHost;
        //   }
        // }
        
        const uri = new URL(window.location);
        const token_sso = uri.searchParams.get(this.local_storage.app_token);
        if (token_sso != "undefined" && token_sso != null){
          localStorage.setItem(this.local_storage.token_sso, token_sso);
          const getStatusToken = await this.$root.checkAuthenticationToken();
          if(getStatusToken){
            const getUserExist = await this.$root.checkUserRegistered(getStatusToken.uuid);
            if(getUserExist && getUserExist.flag_active){
              localStorage.setItem(this.local_storage.is_dynamic, getStatusToken.uuid);
              this.$root.goto(this.pages.dashboard);
            }else{
              this.$root.goto(this.pages.profile);
            }
            window.location.reload();
          }

          const originalHost = window.location.origin;
          window.location.href = originalHost;
        }
        this.$root.hideLoading();
      },

      togglePasswordAction: function(){
        if(this.togglePassword == true){
          this.togglePassword = false;
        }else{
          this.togglePassword = true;
        }
      }
    }
  }
</script>
