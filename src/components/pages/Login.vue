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
                    <img src="@/assets/img/mtsiconland.png" alt="" width="250"/>
                  </a>
                  <p class="opacity-75 text-white">With the power of Falcon, you can now focus only on
                    functionaries for your digital products, while leaving the UI design on us!</p>
                </div>
              </div>
              <div class="mt-0" data-bs-theme="light">
                <p class="text-white">
                  Don't have an account?<br>
                  <RouterLink to="/sign-up" class="text-decoration-underline link-light">Register Here!</RouterLink>
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
                <div class="mb-3">
                  <!-- <button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">
                    Log in
                  </button> -->
                  <a v-on:click="executeLogin" href="javascript:void(0)" class="btn btn-primary d-block w-100 mt-3">Log in</a>
                </div>
                <!-- <div class="mt-2">
                  <div>or with</div>
                </div>
                <div class="row g-2 mt-2">
                  <div class="col-sm-6"><a class="btn btn-outline-google-plus btn-sm d-block w-100"
                      href="javascript:void(0)"><svg class="svg-inline--fa fa-google-plus-g fa-w-20 me-2"
                        data-fa-transform="grow-8" aria-hidden="true" focusable="false" data-prefix="fab"
                        data-icon="google-plus-g" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
                        data-fa-i2svg="" style="transform-origin: 0.625em 0.5em;">
                        <g transform="translate(320 256)">
                          <g transform="translate(0, 0)  scale(1.5, 1.5)  rotate(0 0 0)">
                            <path fill="currentColor"
                              d="M386.061 228.496c1.834 9.692 3.143 19.384 3.143 31.956C389.204 370.205 315.599 448 204.8 448c-106.084 0-192-85.915-192-192s85.916-192 192-192c51.864 0 95.083 18.859 128.611 50.292l-52.126 50.03c-14.145-13.621-39.028-29.599-76.485-29.599-65.484 0-118.92 54.221-118.92 121.277 0 67.056 53.436 121.277 118.92 121.277 75.961 0 104.513-54.745 108.965-82.773H204.8v-66.009h181.261zm185.406 6.437V179.2h-56.001v55.733h-55.733v56.001h55.733v55.733h56.001v-55.733H627.2v-56.001h-55.733z"
                              transform="translate(-320 -256)"></path>
                          </g>
                        </g>
                      </svg>
                      google</a></div>
                  <div class="col-sm-6"><a class="btn btn-outline-facebook btn-sm d-block w-100"
                      href="javascript:void(0)"><svg class="svg-inline--fa fa-facebook-square fa-w-14 me-2"
                        data-fa-transform="grow-8" aria-hidden="true" focusable="false" data-prefix="fab"
                        data-icon="facebook-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                        data-fa-i2svg="" style="transform-origin: 0.4375em 0.5em;">
                        <g transform="translate(224 256)">
                          <g transform="translate(0, 0)  scale(1.5, 1.5)  rotate(0 0 0)">
                            <path fill="currentColor"
                              d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
                              transform="translate(-224 -256)"></path>
                          </g>
                        </g>
                      </svg>
                      facebook</a></div>
                </div> -->
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
    name: 'Login',
    mounted(){
      this.$root.hideLoading();
    },
    methods: {
      executeLogin(){
        this.$root.goto('dashboard');
        window.location.reload();
      }
    }
  }
</script>