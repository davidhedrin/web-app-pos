<template>
  <div v-if="isLoading" class="loading">
    <div class="center-content-loading">
      <component :is="loadingWhite"></component>
      <img src="@/assets/img/mtsiconland-white.png" width="200" alt="" />
    </div>
  </div>
  <main class="main" id="top">
    <div class="container-fluid" data-layout="container">
      <component v-if="activeRoute.name != 'Login'" :is="navbar"></component>
      <div class="content pb-0">
        <component v-if="activeRoute.name != 'Login'" :is="header"></component>

        <component :is="alert" :status="alertParam.status" :title="alertParam.title" :msg="alertParam.msg" :show-alert="showAlert"  @close-alert="showAlert = false"></component>
        <component :is="activeRoute"></component>

        <!-- <Footer></Footer> -->
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { markRaw } from 'vue';

// Layouts
import NavbarLayout from '@/components/layouts/Navbar.vue';
import HeaderLayout from '@/components/layouts/Header.vue';
import FooterLayout from '@/components/layouts/Footer.vue';
import LoadingWhite from '@/components/layouts/LoadingWhite.vue';
import Alert from '@/components/layouts/Alert.vue';

// Pages
import Login from '@/components/pages/Login.vue';
import Dashboard from '@/components/pages/Dashboard.vue';
import ProfilePage from '@/components/pages/Profile.vue';
import Sales from '@/components/pages/Sales.vue';

import PromoList from '@/components/pages/MasterPromo/PromoList.vue';
import PromoProduct from '@/components/pages/MasterPromo/PromoProduct.vue';
import UserList from '@/components/pages/MasterUser/UserList.vue';
import ProductList from '@/components/pages/MasterProduct/ProductList.vue';

const routeComponent = {
  'login': Login,
  'dashboard': Dashboard,
  'profilepage': ProfilePage,
  'sales': Sales,

  // Master Promo
  'promo-list': PromoList,
  'promo-product': PromoProduct,

  // Master User
  'user-list': UserList,

  // Master Product
  'product-list': ProductList,
}

export default {
  data(){
    const API_URL = import.meta.env.VITE_API_URL;
    const APP_SSO_URL = import.meta.env.VITE_APP_SSO_URL;
    const APP_SSO_TOKEN_STATUS = import.meta.env.VITE_APP_SSO_TOKEN_STATUS;
    // const APP_SSO_URL = 'http://178.1.7.230:8072?t=sso&app_id=019e4e2609fc2c0eb334a1901797f856';
    // const APP_SSO_TOKEN_STATUS = 'http://178.1.7.230:8071';

    return {
      API_URL: API_URL,
      APP_SSO_URL: APP_SSO_URL,
      APP_SSO_TOKEN_STATUS: APP_SSO_TOKEN_STATUS,
      dataAuthToken: null,
      
      current_page: sessionStorage.getItem('current_page'),
      activeRoute: markRaw(routeComponent['dashboard']),
      navbar: markRaw(NavbarLayout),
      header: markRaw(HeaderLayout),
      login: markRaw(Login),

      alert: markRaw(Alert),
      loadingWhite: markRaw(LoadingWhite),

      valueParam: '',
      
      showAlert: false,
      isLoading: true,
      alertParam: {
        status: '',
        title: '',
        msg: '',
      },
      
      superAdminMenu: [
        'promo-list',
        'promo-product',
        'user-list',
        'product-list',
      ],
    }
  },

  async beforeMount() {
    const current_page = sessionStorage.getItem('current_page');
    if(current_page){
      this.activeRoute = markRaw(routeComponent[current_page]);
      sessionStorage.setItem('current_page', current_page);
    }

    await this.checkSessionAuthSSO();
  },

  // async mounted(){
  // },
  
  methods: {
    goto: async function(comp){
      const current_page = sessionStorage.getItem('current_page');
      if(comp != current_page){
        this.showLoading();
      }

      this.activeRoute = markRaw(routeComponent[comp]);
      sessionStorage.setItem('current_page', comp);
    },
    
    checkSessionAuthSSO: async function(){
      // this.showLoading();
      let check_uuid = localStorage.getItem("is_dynamic");

      if(!check_uuid){
        const getStatusToken = await this.checkAuthenticationToken();
        if(!getStatusToken){
          this.clearSessionLocalStorege();
          this.hideLoading();
          return false;
        }
        check_uuid = getStatusToken.uuid;
      }

      const getDatUserRegis = await this.checkUserRegistered(check_uuid);
      if(getDatUserRegis){
        // this.clearSessionLocalStorege();
        // this.hideLoading();
        // return false;
        this.dataAuthToken = getDatUserRegis;
  
        if(getDatUserRegis.flag_active == false){
          this.$root.goto('profilepage');
        }
      }
      
      // this.hideLoading();
    },

    checkUserRegistered: async function(uuid){
      try{
        const checkUserAxios = await axios({
          method: 'get',
          url: this.$root.API_URL + '/auth/check-user/' + uuid,
        });

        if(checkUserAxios.data.status == 200){
          return checkUserAxios.data.data;
        }
        if(checkUserAxios.data.status == 404){
          return false;
        }
      } catch (error) {
        this.clearSessionLocalStorege();
        this.$root.showAlertFunction('warning', 'Something Goes Wrong!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
        console.log(error);
      }
    },

    checkAuthenticationToken: async function(){
      try{
        const token_sso = localStorage.getItem("token_sso");

        if(token_sso){
          const AuthStr = "App " + token_sso;
          const URL = this.APP_SSO_TOKEN_STATUS + "/auth/get";
  
          const resposeCekToken = await axios({
            method: 'get',
            url: URL,
            headers: {
              Authorization: AuthStr,
            },
          });
  
          if(resposeCekToken.status == 200){
            const responseDataToken = resposeCekToken.data.data;
            const dtToken = Date.parse(responseDataToken.until_at);
            const toTimeStamp = dtToken / 1000;
  
            const objToken = {
              access_token: responseDataToken.access_token,
              email: responseDataToken.email,
              uuid: responseDataToken.uuid,
              until_at: responseDataToken.until_at,
            };
            
            return objToken;
          }
        }else{
          return null;
        }
      } catch (error) {
        this.clearSessionLocalStorege();
        if (error.response.status == 401) {
          localStorage.setItem("token_expired", 1);
        }
        console.log(error);
        return null;
      }
    },
    
    getProfileUserSSO: async function (token){
      try{
        const AuthStr = "bearer " + token;
        const URL = this.APP_SSO_TOKEN_STATUS + '/mng/user/profile/check';

        const store = await axios({
          method: 'get',
          url: URL,
          headers: {
            Authorization: AuthStr,
          },
        });

        const dataUser = store.data.data;
        return dataUser;
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    clearSessionLocalStorege: function(){
      this.dataAuthToken = null;
      localStorage.clear();
      sessionStorage.clear();
      this.activeRoute = markRaw(routeComponent['login']);
    },
    
    gotoCompoWithParam: function(param, goto){
      this.valueParam = param;
      this.goto(goto);
    },

    showAlertFunction: function(status, title, msg){
      this.alertParam.status = status;
      this.alertParam.title = title;
      this.alertParam.msg = msg;
      this.showAlert = true;
    },

    trimString: function(string){
      return string.trim();
    },
    
    copyTextClipboard: function(text, title = null) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      var generateMsgAlert = title ? title : 'Text';
      this.showAlertFunction('info', 'Well Done', generateMsgAlert + ' telah berhasil disalin');
    },
    
    formatPrice: function(price) {
      // if (price) {
      //   const number = parseFloat(price);
      //   if (isNaN(number)) {
      //     return;
      //   }
        
      //   const formattedPrice = number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      //   return formattedPrice;
      // }
      if (price !== null && price !== undefined) {
        const number = parseFloat(price);
        if (isNaN(number)) {
          return;
        }
        
        const formattedPrice = number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return formattedPrice;
      }
    },

    formatCurrencyRemoveSeparator: function(price){
      return price.replace(/\./g, '');
    },
    
    formatDate: function(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },

    formatDateIdn: function(dateString) {
      const date = new Date(dateString);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return date.toLocaleDateString('id-ID', options);
    },

    formatPhoneNumber: function(phoneNumber) {
      // Memformat nomor telepon dengan format tiap 4 digit
      const formatted = phoneNumber.replace(/(\d{4})(?=\d)/g, "$1.");
      return formatted;
    },

    showLoading: function(){
      this.isLoading = true;
    },
    hideLoading: function(){
      this.isLoading = false;
    },

    removeRedBorder(selectId) {
      const selectElement = document.getElementById(selectId);
      selectElement.classList.remove('border-red');
    },

    convertToLowerCase(text) {
      return text.toLowerCase();
    },
  }
}
</script>

<style>
.hide-input-btn::-webkit-inner-spin-button,
.hide-input-btn::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}

.loading {
  background: #1c1c1cc6;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 9999;
  text-align: center;
}

.center-content-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>