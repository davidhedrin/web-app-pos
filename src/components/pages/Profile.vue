<template>
  <div class="card shadow-none border mb-3">
    <div class="bg-holder bg-card d-none d-md-block" style="background-image:url(src/assets/img/illustration/reports-bg.png);"></div><!--/.bg-holder-->
    <div class="card-header z-1">
      <div class="row flex-between-center gx-0">
        <div class="col-lg-auto d-flex align-items-center"><img class="img-fluid" src="@/assets/img/illustration/reports-greeting.png" alt="">
          <div class="ms-x1">
            <h6 class="mb-1 text-primary">Welcome to</h6>
            <h4 class="mb-0 text-primary fw-bold"><span class="text-info fw-medium">Martha Tilaar Shop </span>Sales POS</h4>
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
  <div class="card mb-3">
    <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-5j.png); background-size: cover; background-position: bottom;"></div>
    <div class="card-body position-relative px-5">
      <div class="row">
        <div class="col-md-9">
          <div class="row text-center">
            <div class="col text-md-start">
              <div class="avatar avatar-5xl">
                <img class="rounded-circle img-thumbnail shadow-sm mb-2" src="@/assets/img/profile/avatar-male.png" width="200" alt="">
              </div>
            </div>
            <div class="col-md-9 text-md-start mt-2">
              <h4 class="mb-1">
                {{ showDataUser.nama_lengkap ? showDataUser.nama_lengkap : 'nama lengkap' }}
                <span v-if="$root.dataAuthToken" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Verified" data-bs-original-title="Verified">
                  <small class="fa fa-check-circle text-primary" data-fa-transform="shrink-4 down-2"></small>
                </span> 
                <span v-else data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Verified" data-bs-original-title="Waiting Verified">
                  <small class="fa fa-check-circle text-secondary" data-fa-transform="shrink-4 down-2"></small>
                </span>
              </h4>
              <h5 class="fs-0 fw-normal">{{ $root.emailUserFromSSO ? $root.emailUserFromSSO : 'email@example.mail' }}</h5>
              <p class="text-500 fs--1 m-0">{{ showDataUser.no_hp ? showDataUser.no_hp : 'XXXX XXXX XXXX' }},</p>
              <p class="text-500 fs--1 m-0">{{ showDataUser.gender ? showDataUser.gender == '1' ? 'Laki-laki' : 'Perempuan' : 'gander'}},</p>
              <p class="text-500 fs--1">{{ showDataUser.tanggal_lahir ? $root.formatDateIdn(showDataUser.tanggal_lahir) : 'day month year' }}</p>
              <button class="btn btn-falcon-primary btn-sm px-3" type="button" data-bs-toggle="modal" data-bs-target="#modalEditDataUser">
                Edit <span class="far fa-edit ms-1"></span>
              </button>
              <span v-if="isRequestApproveBtn">
                <button v-if="isEnableBtnApprove" @click="sendRequestApprove()" class="btn btn-primary btn-sm px-3 ms-3" type="button">
                  Request Approve <span class="far fa-paper-plane ms-1"></span>
                </button>
                <button v-else class="btn btn-secondary btn-sm px-3 ms-3" type="button" disabled>
                  Request Approve <span class="far fa-paper-plane ms-1"></span>
                </button>
              </span>
              <div class="border-bottom border-dashed my-4 d-lg-none"></div>
            </div>
          </div>
        </div>
        <div class="col px-1 ps-lg-3 mt-2">
          <div class="d-flex align-items-center mb-2">
            <span class="fas fa-user-circle fs-3 me-2 text-700" data-fa-transform="grow-2"></span>
            <div class="flex-1">
              <h5 class="mb-0">Personal Info</h5>
            </div>
          </div>
          <div class="mb-2">
            <div class="d-flex align-items-end">
              <h6 class="m-0">Role: <i>Waiting For Registred!!!</i></h6>
              <!-- <span class="badge rounded-pill badge-subtle-primary ms-1">Super Admin</span> -->
            </div>
          </div>
          <div class="mb-2">
            <div class="d-flex align-items-center">
              <h6 class="m-0">Account: <i>Waiting For Registred!!!</i></h6>
              <!-- <span class="text-danger">Not Approve</span> -->
            </div>
          </div>
          <div class="mb-2">
            <div class="d-flex align-items-center">
              <h6 class="m-0">Status: <i>Waiting For Registred!!!</i></h6>
              <!-- <span class="text-danger">Not Approve</span> -->
            </div>
          </div>
          <div class="mb-2">
            <div class="d-flex">
              <h6 class="m-0">Access Store: <i>Waiting For Registred!!!</i></h6>
              <!-- <u>Kelapa Gading</u>, <u>Taman Anggrek</u> -->
            </div>
          </div>
          <div class="mb-2">
            <div class="d-flex align-items-end">
              <h6 class="m-0">Login SSO: </h6>
              <span class="badge rounded-pill bg-success fs--2 ms-1">YES</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="modal fade" id="modalEditDataUser" tabindex="-1" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content position-relative border-0">
        <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
          <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div class="card">
            <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-4-left.png); background-position: left; background-size: cover;"></div>
            <div class="card-body position-relative p-0">
              <div class="rounded-top-3 py-3 ps-4 pe-6">
                <h5 class="mb-1">Edit Data Profile</h5>
              </div>
              <form @submit.prevent="closeModalEditData">
                <div class="p-4 pb-2 pt-1">
                  <div class="row" id="formEditDataUser">
                    <div class="col-md-12 mb-2">
                      <label class="form-label mb-0" for="input_alamat_email">Alamat Email <span class="text-danger">*</span></label>
                      <input :value="$root.emailUserFromSSO" class="form-control" id="input_alamat_email" type="email" placeholder="Masukkan alamat email" disabled>
                    </div>
                    <div class="col-md-12 mb-2">
                      <label class="form-label mb-0" for="input_nama_lengkap">Nama Lengkap <span class="text-danger">*</span></label>
                      <input v-model="dataUser.nama_lengkap" class="form-control bg-transparent" id="input_nama_lengkap" type="text" placeholder="Masukkan nama lengkap">
                    </div>
                    <div class="col-md-12 mb-2">
                      <label class="form-label mb-0" for="input_no_hp">No Handphone <span class="text-danger">*</span></label>
                      <input v-model="dataUser.no_hp" class="form-control bg-transparent" id="input_no_hp" type="text" placeholder="Masukkan nomor handphone">
                    </div>
                    <div class="col-md-12 mb-2">
                      <label class="form-label mb-0" for="select_gender">Gender <span class="text-danger">*</span></label>
                      <select v-model="dataUser.gender" class="form-select bg-transparent" id="select_gender" aria-label="Default select example">
                        <option value="">Pilih jenis kelamin</option>
                        <option value="1">Laki-laki</option>
                        <option value="2">Perempuan</option>
                      </select>
                    </div>
                    <div class="col-md-12 mb-2">
                      <label class="form-label mb-0" for="tanggal_lahir">Tanggal Lahir <span class="text-danger">*</span></label>
                      <input v-model="dataUser.tanggal_lahir" class="form-control bg-transparent" id="tanggal_lahir" type="date">
                    </div>

                    <div class="col-md-12 mt-3 mb-2">
                      <i>Field dengan tanda <span class="text-danger">*</span> wajib untuk diisi</i>
                    </div>
                  </div>
                </div>
                <div class="text-end px-4 pt-0 pb-3">
                  <button class="btn btn-secondary me-2" type="button" data-bs-dismiss="modal">Close</button>
                  <button class="btn btn-primary" type="submit">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="modal fade" id="modalFinishSendApprove" tabindex="0" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
      <div class="modal-content position-relative">
        <div class="modal-body p-0 pb-2">
          <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
            <h3 class="mb-1" id="modalExampleDemoLabel">Permintaan Approve</h3>
          </div>
          <div class="py-2 text-center">
            <div class="d-flex justify-content-center mb-2">
              <img src="@/assets/img/icons/Gif/success-gif.gif" height="120" alt="">
            </div>
            <h5 class="m-0 px-1">
              Sukses mengirim permintaan Approve!
            </h5>
            <p class="m-0 px-3">
              Silahkan tunggu atau hubungi admin untuk menyetujui permintaan Approve.
            </p>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button class="btn btn-success btn-sm" type="button" data-bs-dismiss="modal">Selesai</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ProfilePage',
  data(){
    return{
      dateNow: null,
      dataAuthUserSso: null,
      isRequestApproveBtn: true,
      isEnableBtnApprove: false,

      dataUser: {
        nama_lengkap: '',
        no_hp: '',
        gender: '',
        tanggal_lahir: '',
      },

      showDataUser: {
        uuid: null,
        nama_lengkap: null,
        no_hp: null,
        gender: null,
        tanggal_lahir: null,
        email:null,
      }
    }
  },

  async beforeMount() {
    const getAuthSso = await this.$root.checkAuthenticationToken();
    this.dataAuthUserSso = getAuthSso;

    const checkUserRegis = await this.$root.checkUserRegistered(getAuthSso.uuid);
    if(checkUserRegis){
      this.showDataUser.nama_lengkap = checkUserRegis.nama_lengkap;
      this.showDataUser.no_hp = checkUserRegis.no_hp;
      this.showDataUser.gender = checkUserRegis.gender;
      this.showDataUser.tanggal_lahir = checkUserRegis.tanggal_lahir;
      this.showDataUser.email = checkUserRegis.email;

      this.isRequestApproveBtn = false;
    }else{
      this.isRequestApproveBtn = true;
    }

    this.dateNow = this.$root.formatDateIdn(new Date());
    this.$root.hideLoading();
  },

  methods: {
    closeModalEditData(){
      for (let prop in this.dataUser) {
        if(!this.dataUser[prop]){
          this.isEnableBtnApprove = false;
          this.$root.showAlertFunction('warning', 'Lengkapi Data!', 'Ops...! Lengkapi semua data untuk melanjutkan.');
          return false;
        }
      }

      $('#modalEditDataUser').modal('hide');
      this.showDataUser.nama_lengkap = this.dataUser.nama_lengkap;
      this.showDataUser.no_hp = this.dataUser.no_hp;
      this.showDataUser.gender = this.dataUser.gender;
      this.showDataUser.tanggal_lahir = this.dataUser.tanggal_lahir;
      this.showDataUser.email = this.$root.emailUserFromSSO;
      
      this.isEnableBtnApprove = true;
    },
    
    async sendRequestApprove(){
      try{
        this.$root.showLoading();

        if(this.dataAuthUserSso){
          this.showDataUser.uuid = this.dataAuthUserSso.uuid;
          const store = await axios({
            method: 'post',
            url: this.$root.API_URL + '/auth/send-request-approve',
            data: this.showDataUser
          });
          
          if(store.status == 201 || store.status == 200){
            const response = store.data;
            const getCheckUser = await this.$root.checkUserRegistered(this.dataAuthUserSso.uuid);
            if(getCheckUser){
              $('#modalFinishSendApprove').modal('show');
              this.isRequestApproveBtn = false;
              
              for (let prop in this.dataUser) {
                this.dataUser[prop] = '';
              }
            }else{
              this.$root.showAlertFunction('warning', 'Request Approve!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
            }
          }
        }else{
          this.$root.clearSessionLocalStorege();
        }

        this.$root.hideLoading();
      } catch (error) {
        this.$root.showAlertFunction('warning', 'Request Approve!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
        this.$root.hideLoading();
        console.log(error);
      }
    },
  },
}
</script>