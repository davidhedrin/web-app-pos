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
    <div class="card-body position-relative">
      <div class="row">
        <div class="col-md-9">
          <div class="row text-center">
            <div class="col text-md-start">
              <div class="avatar avatar-5xl">
                <img class="rounded-circle img-thumbnail shadow-sm mb-2" src="@/assets/img/profile/avatar-male.png" width="200" alt="">
              </div>
            </div>
            <div class="col-md-9 text-md-start mt-2">
              <h4 class="mb-1"> David Simbolon <span data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Verified" data-bs-original-title="Verified">
                <small class="fa fa-check-circle text-primary" data-fa-transform="shrink-4 down-2"></small>
                </span>
              </h4>
              <h5 class="fs-0 fw-normal">{{ $root.dataAuthToken ? $root.dataAuthToken.email : 'example@mail.email' }}</h5>
              <p class="text-500 fs--1 m-0">082110863133,</p>
              <p class="text-500 fs--1 m-0">Laki-laki,</p>
              <p class="text-500 fs--1">12 Desember 1999</p>
              <button class="btn btn-falcon-primary btn-sm px-3" type="button">Edit <span class="far fa-edit ms-1"></span></button>
              <div class="border-bottom border-dashed my-4 d-lg-none"></div>
            </div>
          </div>
        </div>
        <div class="col px-4 ps-lg-3 mt-2">
          <div class="d-flex align-items-center mb-2">
            <span class="fas fa-user-circle fs-3 me-2 text-700" data-fa-transform="grow-2"></span>
            <div class="flex-1">
              <h5 class="mb-0">Account Info</h5>
            </div>
          </div>
          <div class="mb-2">
            <div class="d-flex align-items-end">
              <h6 class="m-0">Role: </h6>
              <span class="badge rounded-pill badge-subtle-primary ms-1">Super Admin</span>
            </div>
          </div>
          <div class="mb-2">
            <div class="d-flex align-items-center">
              <h6 class="m-0">Status: <span class="text-success">Active</span></h6>
            </div>
          </div>
          <div class="mb-2">
            <div class="d-flex">
              <h6 class="m-0">Access Store: <u>Kelapa Gading</u>, <u>Taman Anggrek</u></h6>
            </div>
          </div>
          <div class="mb-2">
            <div class="d-flex align-items-end">
              <h6 class="m-0">SSO: </h6>
              <span class="badge rounded-pill bg-success fs--2 ms-1">YES</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProfilePage',
    data(){
      return{
        dateNow: null,
      }
    },

    mounted() {
      this.dateNow = this.$root.formatDateIdn(new Date());
      this.$root.hideLoading();
    },

    methods: {

    },
  }
</script>