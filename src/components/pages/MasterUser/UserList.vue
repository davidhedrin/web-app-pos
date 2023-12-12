<template>
  <div class="d-flex align-items-center mb-3 mt-1">
    <span class="badge rounded me-3 ms-1 badge-subtle-primary">
      <span class="fas fa-users fs-2 text-primary"></span>
    </span>
    <div class="col">
      <h5 class="mb-0 text-primary position-relative">
        <span class="bg-200 dark__bg-1100 pe-3 fs-2">User List</span>
        <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
      </h5>
      <p class="mb-0 fs--1"><a href="javascript:void(0)" class="text-dark">Martha Tilaar Shop</a> / Master User</p>
    </div>
  </div>
  
  <div class="card mb-3">
    <div class="card-header row justify-content-between pb-0">
      <div class="col-md-3 mb-3">
        <select class="form-select">
          <option value="">Pilih Jenis Role</option>
          <option v-for="role in allMasterRole" :value="role.id">{{ role.nama_role }}</option>
        </select>
      </div>
      
      <div class="col-md-3 mb-3">
        <form>
          <div class="input-group">
            <input class="form-control shadow-none search" type="search" placeholder="Search..." aria-label="search">
            <button class="btn btn-outline-secondary border-300 hover-border-secondary">
              <span class="fa fa-search fs--1"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  
  <div class="card">
    <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url('assets/img/illustration/corner-5i.png'); background-size: cover;"></div>
    <div class="card-body position-relative pb-0">
      <div  class="table-scrollable-wrapper" style="max-height: 67vh; min-height: 67vh;">
        <table class="table table-scrollable">
          <thead>
            <tr>
              <th class="py-2 bg-white">#</th>
              <th class="py-2 bg-white">Role</th>
              <th class="py-2 bg-white">Nama</th>
              <th class="py-2 bg-white">Email</th>
              <th class="py-2 bg-white">No Hp</th>
              <th class="py-2 bg-white">Tanggal Lahir</th>
              <th class="py-2 bg-white">Status</th>
              <th class="py-2 bg-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in allDataUser" :key="user.id">
              <td>{{ index + 1  }}</td>
              <td>
                <span v-if="user.role" class="badge rounded-pill badge-subtle-primary">{{ user.role.nama_role }}</span>
                <span v-else class="fs--1">-</span>
              </td>
              <td>{{ user.nama_lengkap  }}</td>
              <td>{{ user.email  }}</td>
              <td>{{ user.no_hp  }}</td>
              <td>{{ $root.formatDateIdn(user.tanggal_lahir) }}</td>
              <td class="d-flex">
                <div v-if="user.flag_active != null">
                  <span v-if="user.flag_active == true" class="badge rounded-pill bg-success">
                    Active
                    <span class="fas fa-check ms-1" data-fa-transform="shrink-2"></span>
                  </span>
                  <span v-else class="badge rounded-pill bg-danger">
                    Inactive
                    <span class="fas fa-ban ms-1" data-fa-transform="shrink-2"></span>
                  </span>
                </div>
                <div v-else>
                  <span class="badge rounded-pill badge-subtle-warning">
                    <i>Waiting for Approved</i>
                    <span class="fas fa-exclamation-triangle ms-1"></span>
                  </span>
                </div>
                <!-- <div v-if="!user.this_user" class="dropdown font-sans-serif position-static">
                  <button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false">
                    <span class="fas fa-ellipsis-h fs--1"></span>
                  </button>
                  <div class="dropdown-menu dropdown-menu-end border py-0">
                    <div v-if="user.flag_active != null" class="py-2">
                      <a class="dropdown-item" href="#!" data-bs-toggle="modal" data-bs-target="#modalActiveInactiveUser" @click="setStatusUserUpdate = user.flag_active; idUserForApprove = user.id">{{ user.flag_active ? 'Inactived' : 'Actived' }}</a>
                    </div>
                    <div v-else class="py-2">
                      <a class="dropdown-item" href="javascript:void(0)" @click="showModalApproveUser(user)">Approve</a>
                    </div>
                  </div>
                </div> -->
              </td>
              <td>
                <button class="btn btn-link p-0" type="button" @click="showModalDataUser(user)">
                  <span class="fas fa-edit text-warning"></span>
                </button>
                <!-- <button class="btn btn-link p-0 ms-2" type="button" :disabled="user.this_user">
                  <span class="fas fa-trash-alt text-danger"></span>
                </button> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="totalPageUser > 1" class="d-flex justify-content-end">
        <nav aria-label="Page navigation example">
          <ul class="pagination pagination-sm">

            <li v-if="displayedPagesUser[0] > 1">
              <a class="page-link" href="javascript:void(0)" @click="fatchUserData(1)">First</a>
            </li>

            <li class="page-item" :class="{ 'disabled': currentPageUser === 1 }">
              <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="fatchUserData(currentPageUser - 1)">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            <li v-for="pageNumber in displayedPagesUser" :key="pageNumber" class="page-item" :class="{ 'active': pageNumber === currentPageUser }">
              <a class="page-link" href="javascript:void(0)" @click="fatchUserData(pageNumber)">{{ pageNumber }}</a>
            </li>

            <li class="page-item" :class="{ 'disabled': currentPageUser === totalPageUser }">
              <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="fatchUserData(currentPageUser + 1)">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>

            <li v-if="displayedPagesUser[displayedPagesUser.length - 1] < totalPageUser">
              <a class="page-link" href="javascript:void(0)" @click="fatchUserData(totalPageUser)">Last</a>
            </li>

          </ul>
        </nav>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modalEditDataUser" tabindex="-1" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content position-relative border-0">
        <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
          <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close" @click="showDataUserModal = {}"></button>
        </div>
        <div class="modal-body p-0">
          <div class="card">
            <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url('assets/img/illustration/corner-4-left.png'); background-position: left; background-size: cover;"></div>
            <div class="card-body position-relative p-0">
              <div class="rounded-top-3 py-3 ps-4 pe-6">
                <h5 class="mb-1">Edit Data User</h5>
              </div>
              <form>
                <div class="p-4 pb-2 pt-1">
                  <div class="row" id="formEditDataUser">
                    <div class="col-md-12 mb-2">
                      <label class="form-label mb-0" for="input_alamat_email">Alamat Email <span class="text-danger">*</span></label>
                      <input v-model="showDataUserModal.email" class="form-control bg-transparent" id="input_alamat_email" type="email" placeholder="Masukkan alamat email" disabled>
                    </div>
                    <div class="col-md-12 mb-2">
                      <label class="form-label mb-0" for="input_nama_lengkap">Nama Lengkap <span class="text-danger">*</span></label>
                      <input v-model="showDataUserModal.nama_lengkap" class="form-control bg-transparent" id="input_nama_lengkap" type="text" placeholder="Masukkan nama lengkap" disabled>
                    </div>
                    <div class="col-md-12 mb-2">
                      <label class="form-label mb-0" for="input_no_hp">No Handphone <span class="text-danger">*</span></label>
                      <input v-model="showDataUserModal.no_hp" class="form-control bg-transparent" id="input_no_hp" type="text" placeholder="Masukkan nomor handphone" disabled>
                    </div>
                    <div class="col-md-12 mb-2">
                      <label class="form-label mb-0" for="select_gender">Gender <span class="text-danger">*</span></label>
                      <select v-model="showDataUserModal.gender" class="form-select bg-transparent" id="select_gender" aria-label="Default select example">
                        <option value="">Pilih jenis kelamin</option>
                        <option value="1">Laki-laki</option>
                        <option value="2">Perempuan</option>
                      </select>
                    </div>
                    <div class="col-md-12 mb-2">
                      <label class="form-label mb-0" for="tanggal_lahir">Tanggal Lahir <span class="text-danger">*</span></label>
                      <input v-model="showDataUserModal.tanggal_lahir" class="form-control bg-transparent" id="tanggal_lahir" type="date">
                    </div>
                    <div class="col-md-12 mt-3 mb-2">
                      <i>Field dengan tanda <span class="text-danger">*</span> wajib untuk diisi</i>
                    </div>
                  </div>
                </div>
                <div class="text-end px-4 pt-0 pb-3">
                  <button class="btn btn-secondary me-2" type="button" data-bs-dismiss="modal" @click="showDataUserModal = {}">Close</button>
                  <button class="btn btn-primary" type="submit">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modalConfirmApproveUser" tabindex="0" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
      <div class="modal-content position-relative">
        <form @submit.prevent="confirmApproveUser()" id="formApproveUser">
          <div class="modal-body p-0 pb-2">
            <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
              <h3 class="mb-1" id="modalExampleDemoLabel">Konfirmasi Approve</h3>
            </div>
            <div class="py-2 text-center">
              <div class="d-flex justify-content-center mb-2">
                <img src="@/assets/img/icons/Gif/info-icon.gif" height="60" alt="">
              </div>
              <h5 class="m-0 px-1 mb-2">
                Lanjut untuk menyetujui permintaan!
              </h5>
              <p class="m-0 px-3 mb-1">
                Pilih Role dan Store User untuk lanjut menyetujui
              </p>
              <div class="m-0 px-3">
                <select v-model="idRoleForApprove" class="form-select bg-transparent mb-2" id="select_role_user" @change="$root.removeRedBorder('select_role_user')">
                  <option value="">Pilih role user</option>
                  <option v-for="role in allMasterRole" :value="role.role_code">{{ role.nama_role }}</option>
                </select>

                <v-select id="select_access_store_outlet"
                  v-model="selectedStoreOutlet"
                  :options="allMasterStoreOutlet" 
                  multiple 
                  value="store_code" 
                  label="storeName"
                  placeholder="Pilih store outlet"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Batal</button>
            <button class="btn btn-primary btn-sm" type="submit">Approve</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  <div class="modal fade" id="modalActiveInactiveUser" tabindex="0" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
      <div class="modal-content position-relative">
        <div class="modal-body p-0 pb-2">
          <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
            <h3 class="mb-1" id="modalExampleDemoLabel">Konfirmasi {{ setStatusUserUpdate ? 'Inactived' : 'Actived' }}</h3>
          </div>
          <div class="py-2 text-center">
            <div class="d-flex justify-content-center mb-2">
              <img src="@/assets/img/icons/Gif/info-icon.gif" height="60" alt="">
            </div>
            <h5 class="m-0 px-1 mb-0">
              Yakin ingin mengubah status user?
            </h5>
            <p class="m-0 px-3 mb-1">
              Konfirmasi untuk melanjutkan update status
            </p>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Batal</button>
          <button class="btn btn-sm" :class="setStatusUserUpdate ? 'btn-danger' : 'btn-success'" type="submit" @click="activeInactiveStatusUser()">{{ setStatusUserUpdate ? 'Inactived' : 'Actived' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'UserList',
    data(){
      return {
        dataUserLogin: null,
        allDataUser: [],
        displayedPagesUser: [],
        totalDisplayedPagesUser: 3,
        currentPageUser: 1,
        perPageUser: 10,
        totalPageUser: 0,

        allMasterRole: [],
        allMasterStoreOutlet: [],

        showDataUserModal: {},
        idUserForApprove: null,
        userForApprove: null,
        idRoleForApprove: '',

        setStatusUserUpdate: false,
        selectedStoreOutlet: [],
      }
    },

    async beforeMount() {
      await this.loadAllData();
    },

    methods: {
      loadAllData: async function(){
        this.$root.showLoading();
        let check_uuid = localStorage.getItem("is_dynamic");
        this.dataUserLogin = await this.$root.checkUserRegistered(check_uuid);

        try{
          const store = await axios({
            method: 'get',
            url: this.$root.API_ERP + '/pos/loadDataUser'
          });

          const storeData = store.data;
          this.allMasterRole = storeData.getAllMasterRole;
          this.allMasterStoreOutlet = storeData.getAllStoreOutlet;

          await this.fatchUserData(this.currentPageUser);
        } catch (error) {
          console.log(error);
        }
          
        this.$root.hideLoading();
      },

      fatchUserData: async function(page){
        this.$root.showLoading();
        try{
          const getData = await axios({
            method: 'get',
            url: this.$root.API_ERP + '/pos/getAllDataUser',
            params: {
              page: page,
              per_page: this.perPageUser,
            },
          });

          const response = getData.data;
          this.currentPageUser = response.current_page;
          this.totalPageUser = response.last_page;
          this.allDataUser = response.data;

          this.updateDisplayedPagesUser();
        } catch (error) {
          console.log(error);
        }
        this.$root.hideLoading();
      },
      
      updateDisplayedPagesUser() {
        const halfDisplayedPages = Math.floor(this.totalDisplayedPagesUser / 2);

        let startPage = Math.max(1, this.currentPageUser - halfDisplayedPages);
        let endPage = Math.min(this.totalPageUser, startPage + this.totalDisplayedPagesUser - 1);

        if (endPage - startPage + 1 < this.totalDisplayedPagesUser) {
          startPage = Math.max(1, endPage - this.totalDisplayedPagesUser + 1);
        }

        this.displayedPagesUser = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
      },

      showModalDataUser: function(user){
        this.showDataUserModal = user;
        $('#modalEditDataUser').modal('show');
      },
      
      showModalApproveUser: function(user){
        this.userForApprove = user;
        $('#modalConfirmApproveUser').modal('show');
      },

      checkFormApprove: function(){
        var formApprove = $('#formApproveUser');
        var selectRole = formApprove.find('#select_role_user');
        var selectStore = formApprove.find('#select_access_store_outlet');
        var valueSelectRole = selectRole.val();

        var result = true;

        if(valueSelectRole.trim() == ''){
          selectRole.addClass('border-red');
          result = false;
        }

        if(this.selectedStoreOutlet.length == 0){
          selectStore.addClass('border-red');
          result = false;
        }

        return result;
      },

      confirmApproveUser: async function(){
        if(this.checkFormApprove() == false){
          return false;
        }

        this.$root.showLoading();
        $('#modalConfirmApproveUser').modal('hide');

        try{
          const store = await axios({
            method: 'put',
            url: this.$root.API_URL + '/master-user/approve-user',
            data: {
              for_user: this.userForApprove,
              role_code: this.idRoleForApprove,
              access_store: this.selectedStoreOutlet,
              user_login: this.$root.dataAuthToken
            }
          });

          if(store.status == 200 || store.status == 201){
            const resDataUser = store.data.data;
            const findIndex = this.allDataUser.findIndex((x) => x.id == resDataUser.id);
            this.allDataUser[findIndex] = resDataUser;

            this.$root.showAlertFunction('success', 'Approve Selesai!', 'Status approve user telah berhasil.');
          }else{
            this.$root.showAlertFunction('warning', 'Approve Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
          }
        } catch (error) {
          this.$root.showAlertFunction('warning', 'Approve Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
          console.log(error);
        }

        this.$root.hideLoading();
      },

      activeInactiveStatusUser: async function(){
        this.$root.showLoading();
        $('#modalActiveInactiveUser').modal('hide');

        try{
          const store = await axios({
            method: 'put',
            url: this.$root.API_URL + '/master-user/udpate-status',
            data: {
              id_user: this.idUserForApprove,
              flag_active: !this.setStatusUserUpdate
            }
          });

          if(store.status == 200 || store.status == 201){
            const resDataUser = store.data.data;
            const findIndex = this.allDataUser.findIndex((x) => x.id == resDataUser.id);
            this.allDataUser[findIndex] = resDataUser;

            this.$root.showAlertFunction('success', 'Update Selesai!', 'Status user telah berhasil diperbaharui.');
          }else{
            this.$root.showAlertFunction('warning', 'Update Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
          }
        } catch (error) {
          this.$root.showAlertFunction('warning', 'Update Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
          console.log(error);
        }

        this.$root.hideLoading();
      },
    },
  }
</script>