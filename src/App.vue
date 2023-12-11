<template>
  <div v-if="isLoading" class="loading">
    <div class="center-content-loading">
      <component :is="loadingWhite"></component>
      <img src="@/assets/img/mtsiconland-white.png" width="200" alt="" />
    </div>
  </div>
  <main class="main" id="top">
    <div class="container-fluid" data-layout="container">
      <!-- <component v-if="activeRoute.name != 'Login'" :is="navbar"></component> -->
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
import { master_code, master_coll, local_storage, pages } from '@/components/scripts/collections.js';

// Layouts
import NavbarLayout from '@/components/layouts/Navbar.vue';
import HeaderLayout from '@/components/layouts/Header.vue';
import FooterLayout from '@/components/layouts/Footer.vue';
import LoadingWhite from '@/components/layouts/LoadingWhite.vue';
import Alert from '@/components/layouts/Alert.vue';

// Pages
import Login from '@/components/pages/Login.vue';

const componentPage = import.meta.globEager('@/components/pages/**/*.vue');
let routeComponent = {};
Object.entries(componentPage).forEach((path,i) => {
  let name = path[0].split("/").pop().replace('.vue','');
  routeComponent[name] = path[1].default;
});

export default {
  data(){
    const API_URL = import.meta.env.VITE_API_URL;
    const API_ERP = import.meta.env.VITE_API_ERP;
    const APP_SSO_URL = import.meta.env.VITE_APP_SSO_URL;
    const APP_SSO_TOKEN_STATUS = import.meta.env.VITE_APP_SSO_TOKEN_STATUS;
    // const API_ERP = "https://ipos-tpsmtg.com:8087";
    // const APP_SSO_URL = 'http://178.1.7.230:8072?t=sso&app_id=019e4e2609fc2c0eb334a1901797f856';
    // const APP_SSO_TOKEN_STATUS = 'http://178.1.7.230:8071';

    return {
      API_URL: API_URL,
      API_ERP: API_ERP,
      APP_SSO_URL: APP_SSO_URL,
      APP_SSO_TOKEN_STATUS: APP_SSO_TOKEN_STATUS,
      dataAuthToken: null,
      selectedStoreAccess: JSON.parse(localStorage.getItem(local_storage.access_store)),

      master_code: master_code,
      master_coll: master_coll,
      local_storage: local_storage,
      pages: pages,
      
      current_page: sessionStorage.getItem(local_storage.current_page),
      activeRoute: markRaw(routeComponent[pages.dashboard]),
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
        pages.productlist,
        pages.promolist,
        pages.promoproduct,
        pages.userlist,
      ],
    }
  },

  async beforeMount() {
    const current_page = sessionStorage.getItem(this.local_storage.current_page);
    if(current_page){
      this.activeRoute = markRaw(routeComponent[current_page]);
      sessionStorage.setItem(this.local_storage.current_page, current_page);
    }

    await this.checkSessionAuthSSO();
  },

  // async mounted(){
  // },

  computed: {
    filterPriceProduct(){
      return (product) => {
        if (this.selectedStoreAccess) {
          return product.all_product_price.find(price => price.priceCode === this.selectedStoreAccess.store_outlet.priceCode);
        }
      }
    },
    filterStokProduct(){
      return (product) => {
        if (this.selectedStoreAccess) {
          return product.all_inventory_stok.find(stok => stok.whsCode === this.selectedStoreAccess.store_outlet.whsCode);
        }
      }
    },
    filterDiskonProduct(){
      return (product) => {
        if (this.selectedStoreAccess) {
          return product.all_product_diskon.find(diskon => diskon.discCode === this.selectedStoreAccess.store_outlet.discCode);
        }
      }
    }
  },
  
  methods: {
    goto: async function(comp){
      const current_page = sessionStorage.getItem(this.local_storage.current_page);
      if(comp != current_page){
        this.showLoading();
      }

      this.activeRoute = markRaw(routeComponent[comp]);
      sessionStorage.setItem(this.local_storage.current_page, comp);
    },
    
    checkSessionAuthSSO: async function(){
      // this.showLoading();
      let check_uuid = localStorage.getItem(this.local_storage.is_dynamic);

      if(!check_uuid){
        const getStatusToken = await this.checkAuthenticationToken();
        if(getStatusToken){
          // this.clearSessionLocalStorege();
          // this.hideLoading();
          // return false;
          check_uuid = getStatusToken.uuid;
        }
      }

      let getDatUserRegis = await this.checkUserRegistered(check_uuid);
      if(!getDatUserRegis) getDatUserRegis = await this.checkUserRegistered(check_uuid, true);
      if(getDatUserRegis){
        // this.clearSessionLocalStorege();
        // this.hideLoading();
        // return false;
        this.dataAuthToken = getDatUserRegis;

        if(getDatUserRegis.access_store_outlet && getDatUserRegis.access_store_outlet.length === 1){
          const firstUserStoreAccess = getDatUserRegis.access_store_outlet[0];
          firstUserStoreAccess.storeName = firstUserStoreAccess.store_outlet.storeName;

          this.selectedStoreAccess = firstUserStoreAccess;
          localStorage.setItem(this.local_storage.access_store, JSON.stringify(firstUserStoreAccess));
        }
  
        if(getDatUserRegis.flag_active == false){
          this.goto(pages.profile);
        }
      }
      
      // this.hideLoading();
    },

    checkUserRegistered: async function(uuid){
      try{
        const checkUserAxios = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/checkUser/' + uuid,
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
        const token_sso = localStorage.getItem(this.local_storage.token_sso);

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
          this.clearSessionLocalStorege();
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
      this.selectedStoreAccess = null;
      localStorage.clear();
      sessionStorage.clear();
      this.activeRoute = markRaw(routeComponent['Login']);
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

    inputTextFormatPrice: function(event){
      const price = event.target.value;
      const numericPrice = price.replace(/[^0-9]/g, '');
      
      if (numericPrice === null || numericPrice.trim() === "") {
        return;
      }
      
      const number = parseFloat(numericPrice);

      const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'decimal',
        minimumFractionDigits: 0,
      }).format(number);

      return formattedPrice;
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

    convertToInteger(doubleValue) {
      return parseInt(doubleValue, 10);
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

.tr-middle {
  vertical-align: middle;
}
</style>