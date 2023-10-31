<template>
  <div class="d-flex align-items-center mb-3 mt-1">
    <span class="badge rounded me-3 ms-1 badge-subtle-primary">
      <span class="fas fa-dolly fs-2 text-primary"></span>
    </span>
    <div class="col">
      <h5 class="mb-0 text-primary position-relative">
        <span class="bg-200 dark__bg-1100 pe-3 fs-2">Product List</span>
        <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
      </h5>
      <p class="mb-0 fs--1"><a href="javascript:void(0)" class="text-dark">Martha Tilaar Shop</a> / Master Product</p>
    </div>
  </div>

  <div class="card mb-3">
    <div class="card-body">
      <div class="d-lg-flex justify-content-between">
        <div class="d-flex align-items-center justify-content-between justify-content-lg-end">
          <div class="d-none" id="table-ticket-actions">
            <div class="d-flex">
              <select class="form-select" aria-label="Bulk actions">
                <option selected="">Bulk actions</option>
                <option value="Refund">Refund</option>
                <option value="Delete">Delete</option>
                <option value="Archive">Archive</option>
              </select>
              <button class="btn btn-falcon-default ms-2" type="button">Apply</button>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <button class="btn btn-primary btn-sm me-2" type="button" data-bs-toggle="modal" data-bs-target="#modalAddNewProduct">
              <span class="fas fa-plus" data-fa-transform="shrink-3"></span>
              <span class="d-none d-md-inline-block ms-1">Baru</span>
            </button>
            <div class="d-flex align-items-center">
              <small class="fw-semi-bold d-none d-lg-block lh-1">View:</small>
              <div class="d-flex">
                <a class="btn btn-link btn-sm text-400 hover-700" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Course Grid" data-bs-original-title="Course Grid">
                  <span class="fas fa-th fs-1" data-fa-transform="down-1"></span>
                </a>
                <a class="btn btn-link btn-sm px-1 text-700" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Course List" data-bs-original-title="Course List">
                  <span class="fas fa-list-ul fs-1" data-fa-transform="down-1"></span>
                </a>
              </div>
            </div>
            <div class="ms-2">
              <select class="form-select">
                <option value="">Pilih Brand Product</option>
                <option v-for="brand in dataBrandProduct" :id="brand.slug" :value="brand.slug">{{ brand.nama_brand }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="border-bottom border-200 my-3"></div>
        <div class="flex-between-center">
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
  </div>

  <div class="card">
    <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-4.png);"></div>
    <div class="card-body position-relative">
      <div class="scrollable-customize mb-3" style="max-height: 63vh; min-height: 63vh;">
        
      </div>
    </div>
  </div>

  <div class="modal fade" id="modalAddNewProduct" tabindex="-1" role="dialog" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 950px">
      <div class="modal-content position-relative">
        <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
          <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div class="rounded-top-3 py-3 ps-4 pe-6 bg-body-tertiary">
            <h5 class="mb-1" id="modalExampleDemoLabel">Tambah Product Baru </h5>
          </div>
          <div class="mt-3">
            <ul class="nav nav-pills justify-content-center" id="pill_addProductTab" role="tablist">
              <li class="nav-item">
                <a class="nav-link rounded-pill active py-1" style="color: #ababab;" id="pill-Product-tab" data-bs-toggle="tab" href="#pill-tab-Product" role="tab" aria-controls="pill-tab-Product" aria-selected="true">
                  <span class="fas fa-box-open"></span> Product
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link rounded-pill py-1" style="color: #ababab;" id="pill-price-tab" data-bs-toggle="tab" href="#pill-tab-price" role="tab" aria-controls="pill-tab-price" aria-selected="false">
                  <span class="fas fa-dollar-sign"></span> Price
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link rounded-pill py-1" style="color: #ababab;" id="pill-inventory-tab" data-bs-toggle="tab" href="#pill-tab-inventory" role="tab" aria-controls="pill-tab-inventory" aria-selected="false">
                  <span class="fas fa-truck-loading"></span> Inventory
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link rounded-pill py-1" style="color: #ababab;" id="pill-review-tab" data-bs-toggle="tab" href="#pill-tab-review" role="tab" aria-controls="pill-tab-review" aria-selected="false">
                  <span class="fas fa-thumbs-up"></span> Review
                </a>
              </li>
            </ul>
            <div class="tab-content border p-4 mt-3" id="pill-addProduct">
              <div class="tab-pane fade show active" id="pill-tab-Product" role="tabpanel" aria-labelledby="home-tab">
                <form>
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Product SKU<span class="text-danger">*</span></label>
                      <input class="form-control" type="text" name="name" placeholder="Masukkan SKU product">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Product Barcode<span class="text-danger">*</span></label>
                      <input class="form-control" type="text" name="name" placeholder="Masukkan barcode product">
                    </div>
                    <div class="col-md-12 mb-3">
                      <label class="form-label">Nama Product<span class="text-danger">*</span></label>
                      <input class="form-control" type="text" name="name" placeholder="John Smith">
                    </div>
                    <div class="col-md-12 mb-4">
                      <label class="form-label">Brand Product<span class="text-danger">*</span></label>
                      <select class="form-select">
                        <option value="">Pilih Brand Product</option>
                        <option v-for="brand in dataBrandProduct" :id="brand.slug" :value="brand.slug">{{ brand.nama_brand }}</option>
                      </select>
                    </div>
                    <div class="col-md-12">
                      <div class="dropzone-area px-2 py-3">
                        <div class="text-center">
                          <img class="me-2" src="@/assets/img/icons/cloud-upload.svg" width="25" alt="">
                          Upload of product picture
                          <p class="mb-0 fs--1 text-400">Upload a 300x300 jpg image with <br>a maximum size of 400KB</p>
                        </div>
                      </div>
                      <input class="form-control" type="file" hidden>
                    </div>
                  </div>
                </form>
              </div>
              <div class="tab-pane fade" id="pill-tab-price" role="tabpanel" aria-labelledby="profile-tab">
                Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic.
              </div>
              <div class="tab-pane fade" id="pill-tab-inventory" role="tabpanel" aria-labelledby="contact-tab">
                Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.
              </div>
              <div class="tab-pane fade" id="pill-tab-review" role="tabpanel" aria-labelledby="contact-tab">
                Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <button class="btn btn-link ps-0" type="button" @click="prevPillTabAddProducrt()"><span class="fas fa-chevron-left me-2" data-fa-transform="shrink-3"></span> Prev</button>
          <button class="btn btn-primary px-2 px-sm-3" type="submit" @click="nextPillTabAddProducrt()">Next <span class="fas fa-chevron-right ms-2" data-fa-transform="shrink-3"> </span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  
  export default {
    name: 'ProductList',
    data(){
      return {
        dataBrandProduct: [],
      }
    },

    async beforeMount(){
      await this.loadAllData();
    },

    methods: {
      loadAllData: async function(){
        try{
          const getAllData = await axios({
            method: 'get',
            url: this.$root.API_URL + '/master-product',
          });
          const allData = getAllData.data;
          this.dataBrandProduct = allData.getAllBrand; //All Brand

        } catch (error) {
          console.log(error);
        }
        this.$root.hideLoading();
      },

      openModalAddNewProduct: () => {
        const modal = $('#modalAddNewProduct');
        modal.modal('show');
      },

      nextPillTabAddProducrt: () => {
        const modal = $('#modalAddNewProduct');

        const pillTab = modal.find('#pill_addProductTab');
        const pillTabNavLink = pillTab.find('.nav-link');

        const pillBody = modal.find('#pill-addProduct');
        const pillBodyTabPane = pillBody.find('.tab-pane');

        for (let i = 0; i < pillTabNavLink.length; i++) {
          const element = pillTabNavLink[i];
          if ($(element).hasClass('active')) {
            if (i < pillTabNavLink.length - 1) {
              $(element).removeClass('active');
              $(pillTabNavLink[i + 1]).addClass('active');
            }
            break;
          }
        }

        for (let i = 0; i < pillBodyTabPane.length; i++) {
          const element = pillBodyTabPane[i];
          if ($(element).hasClass('active')) {
            if (i < pillBodyTabPane.length - 1) {
              $(element).removeClass('show').removeClass('active');
              $(pillBodyTabPane[i + 1]).addClass('show active');
            }
            break;
          }
        }
      },

      prevPillTabAddProducrt: () => {
        const modal = $('#modalAddNewProduct');

        const pillTab = modal.find('#pill_addProductTab');
        const pillTabNavLink = pillTab.find('.nav-link');

        const pillBody = modal.find('#pill-addProduct');
        const pillBodyTabPane = pillBody.find('.tab-pane');

        for (let i = 0; i < pillTabNavLink.length; i++) {
          const element = pillTabNavLink[i];
          if ($(element).hasClass('active')) {
            if (i > 0) {
              $(element).removeClass('active');
              $(pillTabNavLink[i - 1]).addClass('active');
            }
            break;
          }
        }
        
        for (let i = 0; i < pillBodyTabPane.length; i++) {
          const element = pillBodyTabPane[i];
          if ($(element).hasClass('active')) {
            if (i > 0) {
              $(element).removeClass('show').removeClass('active');
              $(pillBodyTabPane[i - 1]).addClass('show active');
            }
            break;
          }
        }
      },
    },
  }
</script>