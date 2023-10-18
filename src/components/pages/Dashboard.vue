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
  <div class="row g-3">
    <div class="col-xl-12">
      <div class="card bg-transparent-50 overflow-hidden">
        <div class="card-header position-relative">
          <div class="bg-holder d-none d-md-block bg-card z-1"
            style="background-image:url(src/assets/img/ecommerce-bg.png);background-size:230px;background-position:right bottom;z-index:-1;">
          </div><!--/.bg-holder-->
          <div class="position-relative z-2">
            <div>
              <h3 class="text-primary fw-light overflow-hidden mb-1">
                Good Morning,
                <span class="typed-text fw-bold ms-1">David Simbolon!</span>
              </h3>
              <p>Here’s what happening with your store today </p>
            </div>
            <div class="d-flex py-3">
              <div class="pe-3">
                <p class="text-600 fs--1 fw-medium">Transaction </p>
                <h4 class="text-800 mb-0">149</h4>
              </div>
              <div class="ps-3">
                <p class="text-600 fs--1">Month Incentive </p>
                <h4 class="text-800 mb-0">Rp 10.000 </h4>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body p-0">
          <ul class="mb-0 list-unstyled list-group font-sans-serif">
            <li class="list-group-item mb-0 rounded-0 py-3 px-x1 list-group-item-warning border-x-0 border-top-0">
              <div class="row flex-between-center">
                <div class="col">
                  <div class="d-flex">
                    <svg class="svg-inline--fa fa-circle fa-w-16 mt-1 fs--2" aria-hidden="true" focusable="false"
                      data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512" data-fa-i2svg="">
                      <path fill="currentColor"
                        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
                    </svg><!-- <div class="fas fa-circle mt-1 fs--2"></div> Font Awesome fontawesome.com -->
                    <p class="fs--1 ps-2 mb-0"><strong>5 products</strong> didn’t publish to your Facebook page
                    </p>
                  </div>
                </div>
                <div class="col-auto d-flex align-items-center"><a class="fs--1 fw-medium text-warning-emphasis"
                    href="#!">View products<svg class="svg-inline--fa fa-chevron-right fa-w-10 ms-1 fs--2"
                      aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="">
                      <path fill="currentColor"
                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
                      </path>
                    </svg><!-- <i class="fas fa-chevron-right ms-1 fs--2"></i> Font Awesome fontawesome.com --></a>
                </div>
              </div>
            </li>
            <li class="list-group-item mb-0 rounded-0 py-3 px-x1 greetings-item text-700 border-x-0 border-top-0">
              <div class="row flex-between-center">
                <div class="col">
                  <div class="d-flex">
                    <svg class="svg-inline--fa fa-circle fa-w-16 mt-1 fs--2 text-primary" aria-hidden="true"
                      focusable="false" data-prefix="fas" data-icon="circle" role="img"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                      <path fill="currentColor"
                        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
                    </svg><!-- <div class="fas fa-circle mt-1 fs--2 text-primary"></div> Font Awesome fontawesome.com -->
                    <p class="fs--1 ps-2 mb-0"><strong>7 orders</strong> have payments that need to be captured
                    </p>
                  </div>
                </div>
                <div class="col-auto d-flex align-items-center"><a class="fs--1 fw-medium" href="#!">View
                    payments<svg class="svg-inline--fa fa-chevron-right fa-w-10 ms-1 fs--2" aria-hidden="true"
                      focusable="false" data-prefix="fas" data-icon="chevron-right" role="img"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="">
                      <path fill="currentColor"
                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
                      </path>
                    </svg><!-- <i class="fas fa-chevron-right ms-1 fs--2"></i> Font Awesome fontawesome.com --></a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-xl-12">
      <div class="card py-3">
        <div class="card-body py-3">
          <div class="row g-0">
            <div class="col-6 col-md-4 border-200 border-bottom border-end pb-4">
              <h6 class="pb-1 text-700">Orders </h6>
              <p class="font-sans-serif lh-1 mb-1 fs-2">15,450 </p>
              <div class="d-flex align-items-center">
                <h6 class="fs--1 text-500 mb-0">13,675 </h6>
                <h6 class="fs--2 ps-3 mb-0 text-primary"><svg class="svg-inline--fa fa-caret-up fa-w-10 me-1"
                    aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="">
                    <path fill="currentColor"
                      d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z">
                    </path>
                  </svg><!-- <span class="me-1 fas fa-caret-up"></span> Font Awesome fontawesome.com -->21.8%</h6>
              </div>
            </div>
            <div class="col-6 col-md-4 border-200 border-bottom border-end-md pb-4 ps-3">
              <h6 class="pb-1 text-700">Items sold </h6>
              <p class="font-sans-serif lh-1 mb-1 fs-2">1,054 </p>
              <div class="d-flex align-items-center">
                <h6 class="fs--1 text-500 mb-0">13,675 </h6>
                <h6 class="fs--2 ps-3 mb-0 text-warning"><svg class="svg-inline--fa fa-caret-up fa-w-10 me-1"
                    aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="">
                    <path fill="currentColor"
                      d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z">
                    </path>
                  </svg><!-- <span class="me-1 fas fa-caret-up"></span> Font Awesome fontawesome.com -->21.8%</h6>
              </div>
            </div>
            <div class="col-6 col-md-4 border-200 border-bottom border-end border-end-md-0 pb-4 pt-4 pt-md-0 ps-md-3">
              <h6 class="pb-1 text-700">Refunds </h6>
              <p class="font-sans-serif lh-1 mb-1 fs-2">$145.65 </p>
              <div class="d-flex align-items-center">
                <h6 class="fs--1 text-500 mb-0">13,675 </h6>
                <h6 class="fs--2 ps-3 mb-0 text-success"><svg class="svg-inline--fa fa-caret-up fa-w-10 me-1"
                    aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="">
                    <path fill="currentColor"
                      d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z">
                    </path>
                  </svg><!-- <span class="me-1 fas fa-caret-up"></span> Font Awesome fontawesome.com -->21.8%</h6>
              </div>
            </div>
            <div
              class="col-6 col-md-4 border-200 border-bottom border-bottom-md-0 border-end-md pt-4 pb-md-0 ps-3 ps-md-0">
              <h6 class="pb-1 text-700">Gross sale </h6>
              <p class="font-sans-serif lh-1 mb-1 fs-2">$100.26 </p>
              <div class="d-flex align-items-center">
                <h6 class="fs--1 text-500 mb-0">$109.65 </h6>
                <h6 class="fs--2 ps-3 mb-0 text-danger"><svg class="svg-inline--fa fa-caret-up fa-w-10 me-1"
                    aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="">
                    <path fill="currentColor"
                      d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z">
                    </path>
                  </svg><!-- <span class="me-1 fas fa-caret-up"></span> Font Awesome fontawesome.com -->21.8%</h6>
              </div>
            </div>
            <div class="col-6 col-md-4 border-200 border-bottom-md-0 border-end pt-4 pb-md-0 ps-md-3">
              <h6 class="pb-1 text-700">Shipping </h6>
              <p class="font-sans-serif lh-1 mb-1 fs-2">$365.53 </p>
              <div class="d-flex align-items-center">
                <h6 class="fs--1 text-500 mb-0">13,675 </h6>
                <h6 class="fs--2 ps-3 mb-0 text-success"><svg class="svg-inline--fa fa-caret-up fa-w-10 me-1"
                    aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="">
                    <path fill="currentColor"
                      d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z">
                    </path>
                  </svg><!-- <span class="me-1 fas fa-caret-up"></span> Font Awesome fontawesome.com -->21.8%</h6>
              </div>
            </div>
            <div class="col-6 col-md-4 pb-0 pt-4 ps-3">
              <h6 class="pb-1 text-700">Processing </h6>
              <p class="font-sans-serif lh-1 mb-1 fs-2">861 </p>
              <div class="d-flex align-items-center">
                <h6 class="fs--1 text-500 mb-0">13,675 </h6>
                <h6 class="fs--2 ps-3 mb-0 text-info"><svg class="svg-inline--fa fa-caret-up fa-w-10 me-1"
                    aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="">
                    <path fill="currentColor"
                      d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z">
                    </path>
                  </svg><!-- <span class="me-1 fas fa-caret-up"></span> Font Awesome fontawesome.com -->21.8%</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data(){
    return{
      dateNow: null,
    }
  },

  mounted(){
    this.dateNow = this.$root.formatDateIdn(new Date());
    this.$root.hideLoading();
  }
}
</script>