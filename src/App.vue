<template>
  <div v-if="isLoading" class="loading">
    <div class="center-content-loading">
      <component :is="loading"></component>
      <img src="@/assets/img/mtsiconland-white.png" width="200" alt="" />
      <!-- <h5 class="text-white">loading...</h5> -->
    </div>
  </div>
  <main class="main" id="top">
    <div class="container-fluid" data-layout="container">
      <component v-if="activeRoute.name != 'Login'" :is="navbar"></component>
      <div class="content pb-0">
        <component v-if="activeRoute.name != 'Login'" :is="header"></component>

        <component :is="alert" :status="alertParam.status" :title="alertParam.title" :msg="alertParam.msg" :show-alert="showAlert"  @close-alert="showAlert = false"></component>
        <component :is="activeRoute" :params="params"></component>

        <!-- <Footer></Footer> -->
      </div>
    </div>
  </main>
</template>

<script>
import { markRaw } from 'vue';

// Layouts
import NavbarLayout from '@/components/layouts/Navbar.vue';
import HeaderLayout from '@/components/layouts/Header.vue';
import FooterLayout from '@/components/layouts/Footer.vue';
import Loading from '@/components/layouts/Loading.vue';
import Alert from '@/components/layouts/Alert.vue';

// Pages
import Login from '@/components/pages/Login.vue';
import Dashboard from '@/components/pages/Dashboard.vue';
import Sales from '@/components/pages/Sales.vue';
import PromoList from '@/components/pages/MasterPromo/PromoList.vue';
import PromoProduct from '@/components/pages/MasterPromo/PromoProduct.vue';

const routeComponent = {
  'dashboard': Dashboard,
  'sales': Sales,
  'login': Login,
  'promo-list': PromoList,
  'promo-product': PromoProduct,
}

export default {
  data(){
    return {
      current_page: sessionStorage.getItem('current_page'),
      activeRoute: markRaw(routeComponent['login']),
      navbar: markRaw(NavbarLayout),
      header: markRaw(HeaderLayout),
      login: markRaw(Login),

      alert: markRaw(Alert),
      loading: markRaw(Loading),
      params: null,

      valueParam: '',
      
      showAlert: false,
      isLoading: true,
      alertParam: {
        status: '',
        title: '',
        msg: '',
      },
    }
  },
  beforeMount() {
    const current_page = sessionStorage.getItem('current_page');
    if(current_page){
      this.goto(current_page);
    }
  },
  methods: {
    goto: function(comp, p){
      const current_page = sessionStorage.getItem('current_page');
      if(comp != current_page){
        this.showLoading();
      }
      if(typeof p != 'undefined'){
        this.params = p;
      }

      this.activeRoute = markRaw(routeComponent[comp]);
      sessionStorage.setItem('current_page', comp);
    },
    
    gotoCompoWithParam(param, goto){
      this.valueParam = param;
      this.goto(goto);
    },

    showAlertFunction(status, title, msg){
      this.alertParam.status = status;
      this.alertParam.title = title;
      this.alertParam.msg = msg;
      this.showAlert = true;
    },

    trimString(string){
      return string.trim();
    },
    
    copyTextClipboard(text, title = null) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      var generateMsgAlert = title ? title : 'Text';
      this.showAlertFunction('info', 'Well Done', generateMsgAlert + ' telah berhasil disalin');
    },
    
    formatPrice(price) {
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

    formatCurrencyRemoveSeparator(price){
      return price.replace(/\./g, '');
    },
    
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },

    formatDateIdn(dateString) {
      const date = new Date(dateString);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return date.toLocaleDateString('id-ID', options);
    },

    formatPhoneNumber(phoneNumber) {
      // Memformat nomor telepon dengan format tiap 4 digit
      const formatted = phoneNumber.replace(/(\d{4})(?=\d)/g, "$1.");
      return formatted;
    },

    showLoading(){
      this.isLoading = true;
    },
    hideLoading(){
      this.isLoading = false;
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