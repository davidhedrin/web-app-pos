<template>
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
import Alert from '@/components/layouts/Alert.vue';

// Pages
import Login from '@/components/pages/Login.vue';
import Dashboard from '@/components/pages/Dashboard.vue';
import Sales from '@/components/pages/Sales.vue';
import PromoList from '@/components/pages/MasterPromo/PromoList.vue';

const routeComponent = {
  'dashboard': Dashboard,
  'sales': Sales,
  'login': Login,
  'promo-list': PromoList,
}

export default {
  data(){
    return {
      activeRoute: markRaw(routeComponent['login']),
      navbar: markRaw(NavbarLayout),
      header: markRaw(HeaderLayout),
      login: markRaw(Login),

      alert: markRaw(Alert),
      params: null,

      valueParam: '',
      
      showAlert: false,
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
      if(typeof p != 'undefined'){
        this.params = p;
      }

      this.activeRoute = markRaw(routeComponent[comp]);
      sessionStorage.setItem('current_page', comp);
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
      if (price) {
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

    formatPhoneNumber(phoneNumber) {
      // Memformat nomor telepon dengan format tiap 4 digit
      const formatted = phoneNumber.replace(/(\d{4})(?=\d)/g, "$1.");
      return formatted;
    },
    
    gotoCompoWithParam(param, goto){
      this.valueParam = param;
      this.goto(goto);
    }
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
</style>