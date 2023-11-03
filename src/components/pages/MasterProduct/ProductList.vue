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
          <div class="d-flex align-items-center">
            <!-- <button class="btn btn-primary btn-sm me-2" type="button" data-bs-toggle="modal" data-bs-target="#modalAddNewProduct">
              <span class="fas fa-plus" data-fa-transform="shrink-3"></span>
              <span class="d-none d-md-inline-block ms-1">Baru</span>
            </button> -->
            <div class="d-flex align-items-center">
              <small class="fw-semi-bold lh-1">View:</small>
              <div class="d-flex">
                <button class="btn btn-link btn-sm text-900" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Course List" data-bs-original-title="Course List">
                  <span class="fas fa-list-ul fs-1" data-fa-transform="down-1"></span>
                </button>
                <button class="btn btn-link btn-sm px-1 text-400 hover-700" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Course Grid" data-bs-original-title="Course Grid">
                  <span class="fas fa-th fs-1" data-fa-transform="down-1"></span>
                </button>
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

  <div class="modal fade" id="modalViewProduct" tabindex="-1" role="dialog" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 1100px">
      <div class="modal-content position-relative">
        <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
          <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div class="rounded-top-3 py-3 ps-4 pe-6 bg-body-tertiary">
            <h5 class="mb-1" id="modalExampleDemoLabel">Tambah Product Baru </h5>
          </div>
          <div class="mt-3">
            <div class="scrollable-customize" style="max-height: 540px;">
              <div class="row mx-0">
                <div class="col-md-4 mb-3">
                  <img class="rounded" src="@/assets/img/product/sariayu_martha.jpg" alt="" style="width: 100%; height: 190px; object-fit: cover;">
                </div>
                <!-- Review Product -->
                <div class="col-md-8 mb-3">
                  <h5 class="mb-0"><span class="fas fa-box-open"></span> Product:</h5>
                  <hr class="my-1">

                  <div class="row">
                    <div class="col-md-6">
                      <div class="fs--1">
                        Store: <span class="fw-bold">{{ dataAddProduct.store_outlet ? dataAddProduct.store_outlet.nama_toko : '' }}</span>
                      </div>
                      <div class="fs--1">
                        Manufaktur: <span class="fw-bold">{{ dataAddProduct.manufaktur_product ? dataAddProduct.manufaktur_product.mnfctName : '' }}</span>
                      </div>
                      <div class="fs--1">
                        Reting Product: 
                        <span class="fw-bold">
                          {{ dataAddProduct.rating ? dataAddProduct.rating : '' }}
                          <span v-if="fullStarsCount > 0" v-for="index in fullStarsCount" :key="index" class="fas fa-star"></span>
                          <span v-if="ishasHalfStar" class="fas fa-star-half-alt"></span>
                        </span>
                      </div>
                      <div class="fs--1">
                        Nama Product: <span class="fw-bold">{{ dataAddProduct.nama_lengkap }}</span>
                      </div>
                      <div class="fs--1">
                        Nama Pendek: <span class="fw-bold">{{ dataAddProduct.nama_singkat }}</span>
                      </div>
                    </div>
                    <div class="col-md-6 text-md-end text-start">
                      <div class="fs--1">
                        Product Code (SKU): <span class="fw-bold">{{ dataAddProduct.product_sku ? dataAddProduct.product_sku : '' }}</span>
                      </div>
                      <div class="fs--1">
                        Product Barcode: <span class="fw-bold">{{ dataAddProduct.product_barcode ? dataAddProduct.product_barcode : '' }}</span>
                      </div>
                      <div class="fs--1">
                        Parent Code: <span class="fw-bold">{{ dataAddProduct.parent_code ? dataAddProduct.parent_code : '' }}</span>
                      </div>
                      <div class="fs--1">
                        Nilai UOM 2: <span class="fw-bold">{{ dataAddProduct.uom2 ? dataAddProduct.uom2 : '' }}</span>
                      </div>
                      <div class="fs--1">
                        Nilai UOM 3: <span class="fw-bold">{{ dataAddProduct.uom3 ? dataAddProduct.uom3 : '' }}</span>
                      </div>
                    </div>
                    <div class="fs--1">
                      <div class="scrollable-customize" style="max-height: 56px;">
                        Deskripsi Produk: 
                        <span class="fw-bold">{{ dataAddProduct.deskripsi }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Review Price and Diskon -->
              <div class="row mx-0">
                <div class="col-md-6 mb-3">
                  <h5 class="mb-0"><span class="fas fa-dollar-sign"></span> Price:</h5>
                  <hr class="my-1">
                  <div class="table-scrollable-wrapper" style="min-height: 146px; max-height: 146px;">
                    <table class="table table-scrollable table-sm">
                      <thead>
                        <tr class="fs--1">
                          <th class="ps-0 py-2 bg-white">Price Code</th>
                          <th class="py-2 bg-white">Product Price</th>
                          <th class="pe-0 py-2 bg-white">Product Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="price in dataAddProduct.master_price" class="fs--1">
                          <td class="ps-0">{{ price.price_code.priceName + ` (${price.price_code.priceCode})` }}</td>
                          <td>Rp {{ price.price ? $root.formatPrice(price.price) : '-' }}</td>
                          <td class="pe-0">Rp {{ price.cost ? $root.formatPrice(price.cost) : '-' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <h5 class="mb-0"><span class="fas fa-percentage"></span> Diskon:</h5>
                  <hr class="my-1">
                  <div class="table-scrollable-wrapper" style="min-height: 146px; max-height: 146px;">
                    <table class="table table-scrollable table-sm">
                      <thead>
                        <tr class="fs--1">
                          <th class="ps-0 py-2 bg-white">Diskon Code</th>
                          <th class="py-2 bg-white">Deskripsi</th>
                          <th class="pe-0 py-2 bg-white">Diskon(%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="diskon in dataAddProduct.master_diskon" class="fs--1">
                          <td class="ps-0">#{{ diskon.diskon_code.discCode }}</td>
                          <td>{{ diskon.name }}</td>
                          <td class="pe-0">
                            <span v-if="diskon.diskon_code.discCode != '0'">{{ diskon.nilai_diskon ? diskon.nilai_diskon : '0' }}</span>
                            <span v-else>-</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Review Inventory and Supplier -->
              <div class="row mx-0">
                <div class="col-md-6 mb-3">
                  <h5 class="mb-0"><span class="fas fa-dolly"></span> Inventory:</h5>
                  <hr class="my-1">
                  <div class="table-scrollable-wrapper" style="min-height: 146px; max-height: 146px;">
                    <table class="table table-scrollable table-sm">
                      <thead>
                        <tr class="fs--1">
                          <th class="ps-0 py-2 bg-white">Code</th>
                          <th class="py-2 bg-white">Name</th>
                          <th class="py-2 bg-white">On Hand</th>
                          <th class="py-2 bg-white">On Order</th>
                          <th class="py-2 bg-white">Min Buffer</th>
                          <th class="pe-0 py-2 bg-white">Max Buffer</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="whs in dataAddProduct.master_warehouse" class="fs--1">
                          <td class="ps-0">{{ whs.whs_code.whsCode }}</td>
                          <td>{{ whs.name }}</td>
                          <td>{{ whs.on_hand ? whs.on_hand : '-' }}</td>
                          <td>{{ whs.on_order ? whs.on_order : '-' }}</td>
                          <td>{{ whs.min_buffer ? whs.min_buffer : '-' }}</td>
                          <td class="pe-0">{{ whs.max_buffer ? whs.max_buffer : '-' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <h5 class="mb-0"><span class="fas fa-truck-loading"></span> Supplier:</h5>
                  <hr class="my-1">
                  <div class="table-scrollable-wrapper" style="min-height: 146px; max-height: 146px;">
                    <table class="table table-scrollable table-sm">
                      <thead>
                        <tr class="fs--1">
                          <th class="ps-0 py-2 bg-white">Code</th>
                          <th class="py-2 bg-white">Name</th>
                          <th class="py-2 bg-white">Priority</th>
                          <th class="pe-0 py-2 bg-white">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="supplier in dataAddProduct.master_supplier" class="fs--1">
                          <td class="ps-0">{{ supplier.code }}</td>
                          <td>{{ supplier.name }}</td>
                          <td>{{ getSelectedNamePriority(supplier.priority) }}</td>
                          <td class="pe-0">
                            <span class="badge rounded-pill" :class="supplier.status ? 'badge-subtle-success' : 'badge-subtle-danger'">
                              {{ supplier.status ? 'Active' : 'No Active' }}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Review Optional Info -->
              <div class="px-3">
                <h5 class="mb-0"><span class="fas fa-adobe"></span> Optional Info:</h5>
                <hr class="my-1">
                <div class="table-scrollable-wrapper" style="min-height: 0; max-height: 146px;">
                  <table class="table table-scrollable table-sm">
                    <thead>
                      <tr class="fs--1">
                        <th class="ps-0 py-2 bg-white">Info Code</th>
                        <th class="py-2 bg-white">Info Name</th>
                        <th class="py-2 bg-white">Detail Code</th>
                        <th class="pe-0 py-2 bg-white">Detail Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="code in dataAddProduct.master_opt_info" class="fs--1">
                        <td class="ps-0">{{ code.code }}</td>
                        <td>{{ code.name }}</td>
                        <td>{{ code.select_opt_info ? code.select_opt_info.optDtlCode : '-' }}</td>
                        <td class="pe-0">{{ code.select_opt_info ? code.select_opt_info.optDtlName : '-' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="modal-footer justify-content-between">
          <button class="btn btn-link ps-0" type="button" @click="prevPillTabAddProducrt()"><span class="fas fa-chevron-left me-2" data-fa-transform="shrink-3"></span> Prev</button>
          <button class="btn btn-primary px-2 px-sm-3" type="submit" @click="nextPillTabAddProducrt()">Next <span class="fas fa-chevron-right ms-2" data-fa-transform="shrink-3"> </span></button>
        </div> -->
      </div>
    </div>
  </div>

  <div class="modal fade" id="modalAddNewProduct" tabindex="-1" role="dialog" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 1100px">
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
                <!-- data-bs-toggle="tab" href="#pill-tab-Product" role="tab" aria-controls="pill-tab-Product" aria-selected="true" -->
                <a class="nav-link rounded-pill active py-1 text-inactive-pill" id="pill-Product-tab">
                  <span class="fas fa-box-open"></span> Product
                </a>
              </li>
              <li class="nav-item">
                <!-- data-bs-toggle="tab" href="#pill-tab-price" role="tab" aria-controls="pill-tab-price" aria-selected="false" -->
                <a class="nav-link rounded-pill py-1 text-inactive-pill" id="pill-price-tab">
                  <span class="fas fa-dollar-sign"></span> Price
                </a>
              </li>
              <li class="nav-item">
                <!-- data-bs-toggle="tab" href="#pill-tab-inventory" role="tab" aria-controls="pill-tab-inventory" aria-selected="false" -->
                <a class="nav-link rounded-pill py-1 text-inactive-pill" id="pill-inventory-tab">
                  <span class="fas fa-dolly"></span> Inventory
                </a>
              </li>
              <li class="nav-item">
                <!-- data-bs-toggle="tab" href="#pill-tab-opt-info" role="tab" aria-controls="pill-tab-opt-info" aria-selected="false" -->
                <a class="nav-link rounded-pill py-1 text-inactive-pill" id="pill-opt-info-tab">
                  <span class="fab fa-adobe"></span> Optional Info
                </a>
              </li>
              <li class="nav-item">
                <!-- data-bs-toggle="tab" href="#pill-tab-review" role="tab" aria-controls="pill-tab-review" aria-selected="false" -->
                <a class="nav-link rounded-pill py-1 text-inactive-pill" id="pill-review-tab">
                  <span class="fas fa-thumbs-up"></span> Review
                </a>
              </li>
            </ul>
            <div class="tab-content border px-2 py-3 mt-3" id="pill-addProduct">
              <!-- Product -->
              <div class="tab-pane fade show active px-3" id="pill-tab-Product" role="tabpanel" aria-labelledby="home-tab">
                <div class="row">
                  <div class="col-md-6 mb-2">
                    <label class="form-label mb-0">Store Outlet<span class="text-danger">*</span></label>
                    <v-select 
                      v-model="dataAddProduct.store_outlet"
                      :options="dataMasterStoreOutlet"
                      label="nama_toko"
                      value="id"
                      placeholder="Pilih brand product"
                    />
                  </div>
                  <div class="col-md-6 mb-2">
                    <label class="form-label mb-0">Manufaktur Product<span class="text-danger">*</span></label>
                    <v-select 
                      v-model="dataAddProduct.manufaktur_product"
                      :options="dataMasterManufaktur"
                      label="mnfctName"
                      value="id"
                      placeholder="Pilih manufaktur product"
                    />
                  </div>
                  
                  <div class="col-md-6 mb-2">
                    <label class="form-label mb-0">Nama Lengkap Product<span class="text-danger">*</span></label>
                    <input v-model="dataAddProduct.nama_lengkap" class="form-control" type="text" placeholder="Masukkan nama lengkap product">
                  </div>
                  <div class="col-md-6 mb-2">
                    <label class="form-label mb-0">Nama Singkat Product</label>
                    <input v-model="dataAddProduct.nama_singkat" class="form-control" type="text" placeholder="Masukkan nama singkat product">
                  </div>

                  <div class="col-md-4 mb-2">
                    <label class="form-label mb-0">Product Code (SKU)<span class="text-danger">*</span></label>
                    <input v-model="dataAddProduct.product_sku" class="form-control" type="text" placeholder="Masukkan SKU product">
                  </div>
                  <div class="col-md-4 mb-2">
                    <label class="form-label mb-0">Product Barcode<span class="text-danger">*</span></label>
                    <input v-model="dataAddProduct.product_barcode" class="form-control" type="text" placeholder="Masukkan barcode product">
                  </div>
                  <div class="col-md-4 mb-2">
                    <label class="form-label mb-0">Parent Code<span class="text-danger">*</span></label>
                    <input v-model="dataAddProduct.parent_code" class="form-control" type="text" placeholder="Masukkan parent code">
                  </div>

                  <div class="col-md-4 mb-2">
                    <label class="form-label mb-0">UOM 2<span class="text-danger">*</span></label>
                    <input v-model="dataAddProduct.uom2" class="form-control" type="number" placeholder="Masukkan nilai UOM 2">
                  </div>
                  <div class="col-md-4 mb-2">
                    <label class="form-label mb-0">UOM 3<span class="text-danger">*</span></label>
                    <input v-model="dataAddProduct.uom3" class="form-control" type="number" placeholder="Masukkan nilai UOM 3">
                  </div>
                  <div class="col-md-4 mb-2">
                    <label class="form-label mb-0">Reting Product (Max 5)</label>
                    <input v-model="dataAddProduct.rating" class="form-control" type="number" step="0.5" min="0" max="5" placeholder="Masukkan reting product">
                  </div>
                  
                  <div class="col-md-12 mb-2">
                    <label class="form-label mb-0">Deskripsi Product</label>
                    <textarea v-model="dataAddProduct.deskripsi" class="form-control" rows="2" placeholder="Masukkan deskripsi product"></textarea>
                  </div>

                  <div class="col-md-12 mb-4">
                    <label class="form-label mb-0">Image Product</label>
                    <div class="dropzone-area py-2" onclick="document.getElementById('input_file_img_product').click()">
                      <div v-if="selectedFileNameImage" class="text-center">
                        <img src="@/assets/img/icons/cloud-upload.svg" width="25" alt="">
                        Selected file: <strong>{{ selectedFileNameImage }}</strong>
                        <p class="mb-0 fs--1 text-400">Upload a 300x300 jpg image with</p>
                      </div>
                      <div v-else>
                        <img src="@/assets/img/icons/cloud-upload.svg" width="25" alt="">
                        Upload of product picture
                        <p class="mb-0 fs--1 text-400">Upload a 300x300 jpg image with</p>
                      </div>
                    </div>
                    <input id="input_file_img_product" class="form-control" type="file" accept="image/jpeg, image/png" @change="changeInputFileImageProduct" hidden>
                  </div>
                </div>
              </div>

              <!-- Price -->
              <div class="tab-pane fade px-3" id="pill-tab-price" role="tabpanel" aria-labelledby="profile-tab">
                <h5 class="fs-0">Product Price</h5>
                <hr class="m-0">
                <div class="mb-2">
                  <div class="table-scrollable-wrapper">
                    <table class="table table-sm table-scrollable">
                      <thead>
                        <tr>
                          <th class="ps-0 py-2 bg-white">Price Code</th>
                          <th class="py-2 bg-white">Product Price</th>
                          <th class="pe-0 py-2 bg-white">Product Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(price, index) in dataMasterPriceCode">
                          <td class="ps-0">
                            <input v-model="dataAddProduct.master_price[index].name" class="form-control" type="text" disabled>
                          </td>
                          <td>
                            <input v-model="dataAddProduct.master_price[index].price" class="form-control hide-input-btn" type="number" placeholder="Masukkan harga product">
                          </td>
                          <td class="pe-0">
                            <input v-model="dataAddProduct.master_price[index].cost" class="form-control hide-input-btn" type="number" placeholder="Masukkan cost product">
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h5 class="fs-0">Product Diskon</h5>
                  <hr class="m-0">
                  <div class="table-scrollable-wrapper">
                    <table class="table table-scrollable table-sm">
                      <thead>
                        <tr>
                          <th class="ps-0 py-2 bg-white">Code</th>
                          <th class="py-2 bg-white">Deskripsi</th>
                          <th class="pe-0 py-2 bg-white">Diskon(%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(diskon, index) in dataMasterDiskonCode">
                          <td class="ps-0" style="width: 100px;">
                            <input v-model="dataAddProduct.master_diskon[index].code" class="form-control" type="text" disabled>
                          </td>
                          <td>
                            <input v-model="dataAddProduct.master_diskon[index].name" class="form-control" type="text" disabled>
                          </td>
                          <td class="pe-0">
                            <input v-if="diskon.discCode != '0'" v-model="dataAddProduct.master_diskon[index].nilai_diskon" class="form-control hide-input-btn" type="number" placeholder="Masukkan nilai diskon">
                            <input v-else class="form-control" type="text" value="0" disabled>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Inventory -->
              <div class="tab-pane fade px-3" id="pill-tab-inventory" role="tabpanel" aria-labelledby="contact-tab">
                <div class="mb-3">
                  <h5 class="fs-0">Warehouse</h5>
                  <hr class="m-0">
                  <div class="table-scrollable-wrapper" style="max-height: 300px; min-height: 0;">
                    <table class="table table-scrollable table-sm">
                      <thead>
                        <tr>
                          <th class="ps-0 py-2 bg-white">Code</th>
                          <th class="py-2 bg-white">Name</th>
                          <th class="py-2 bg-white">On Hand</th>
                          <th class="py-2 bg-white">On Order</th>
                          <th class="py-2 bg-white">Min Buffer</th>
                          <th class="pe-0 py-2 bg-white">Max Buffer</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(whs, index) in dataMasterWarehouse">
                          <td class="ps-0" style="width: 80px;">
                            <input v-model="dataAddProduct.master_warehouse[index].code" class="form-control" type="text" disabled>
                          </td>
                          <td style="width: 240px;">
                            <input v-model="dataAddProduct.master_warehouse[index].name" class="form-control" type="text" disabled>
                          </td>
                          <td style="width: 150px;">
                            <input v-model="dataAddProduct.master_warehouse[index].on_hand" class="form-control hide-input-btn" type="number" placeholder="Masukkan nilai">
                          </td>
                          <td style="width: 150px;">
                            <input v-model="dataAddProduct.master_warehouse[index].on_order" class="form-control hide-input-btn" type="number" placeholder="Masukkan nilai">
                          </td>
                          <td style="width: 150px;">
                            <input v-model="dataAddProduct.master_warehouse[index].min_buffer" class="form-control hide-input-btn" type="number" placeholder="Masukkan nilai">
                          </td>
                          <td class="pe-0" style="width: 150px;">
                            <input v-model="dataAddProduct.master_warehouse[index].max_buffer" class="form-control hide-input-btn" type="number" placeholder="Masukkan nilai">
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h5 class="fs-0">Supplier</h5>
                  <hr class="m-0">
                  <div class="table-scrollable-wrapper" style="min-height: 0;">
                    <table class="table table-scrollable table-sm">
                      <thead>
                        <tr>
                          <th class="ps-0 py-2 bg-white">Code</th>
                          <th class="py-2 bg-white">Name</th>
                          <th class="py-2 bg-white">Priority</th>
                          <th class="pe-0 py-2 bg-white">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(supplier, index) in dataMasterSupplierCode">
                          <td class="ps-0" style="width: 150px;">
                            <input v-model="dataAddProduct.master_supplier[index].code" class="form-control" type="text" disabled>
                          </td>
                          <td>
                            <input v-model="dataAddProduct.master_supplier[index].name" class="form-control" type="text" disabled>
                          </td>
                          <td>
                            <select v-model="dataAddProduct.master_supplier[index].priority" class="form-select">
                              <option value="">Pilih priority</option>
                              <option v-for="list in optionsDataPriority" :value="list.id">{{ list.name }}</option>
                            </select>
                          </td>
                          <td class="d-flex py-2 pe-0" style="width: 60px;">
                            <div>
                              <span class="badge rounded-pill" :class="dataAddProduct.master_supplier[index].status ? 'badge-subtle-success' : 'badge-subtle-danger'">
                                {{ dataAddProduct.master_supplier[index].status ? 'Active' : 'Not Active' }}
                              </span>
                            </div>
                            <div class="dropdown font-sans-serif position-static">
                              <button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false">
                                <span class="fas fa-ellipsis-h fs--1"></span>
                              </button>
                              <div class="dropdown-menu dropdown-menu-end border py-0">
                                <a class="dropdown-item" href="javascript:void(0)" @click="dataAddProduct.master_supplier[index].status = true">Active</a>
                                <a class="dropdown-item" href="javascript:void(0)" @click="dataAddProduct.master_supplier[index].status = false">Inactive</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Options Info -->
              <div class="tab-pane fade px-3" id="pill-tab-opt-info" role="tabpanel" aria-labelledby="contact-tab">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th class="ps-0 py-2 bg-white">Info Code</th>
                      <th class="py-2 bg-white">Info Name</th>
                      <th class="pe-0 py-2 bg-white">Select Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(code, index) in dataMasterOptionInfoCode">
                      <td class="ps-0" style="width: 100px;">
                        <input v-model="dataAddProduct.master_opt_info[index].code" class="form-control" type="text" disabled>
                      </td>
                      <td style="width: 300px;">
                        <input v-model="dataAddProduct.master_opt_info[index].name" class="form-control" type="text" disabled>
                      </td>
                      <td class="pe-0">
                        <v-select 
                          v-model="dataAddProduct.master_opt_info[index].select_opt_info" 
                          :options="filteredOptionsInfoProduct(code.optionalCode)" 
                          label="optDtlName" 
                          value="id" 
                          :placeholder="`Pilih ${$root.convertToLowerCase(code.optionalName)} info`"
                        >
                          <template v-slot:option="option">
                            {{ option.optDtlName }} ({{ option.optDtlCode }})
                          </template>
                        </v-select>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- <div class="table-scrollable-wrapper table-scrollable">
                </div> -->
              </div>

              <!-- Review -->
              <div class="tab-pane fade" id="pill-tab-review" role="tabpanel" aria-labelledby="contact-tab">
                <div class="scrollable-customize" style="max-height: 540px;">
                  <div class="row mx-0">
                    <div class="col-md-4 mb-3">
                      <img class="rounded" src="@/assets/img/product/sariayu_martha.jpg" alt="" style="width: 100%; height: 190px; object-fit: cover;">
                    </div>
                    <!-- Review Product -->
                    <div class="col-md-8 mb-3">
                      <h5 class="mb-0"><span class="fas fa-box-open"></span> Product:</h5>
                      <hr class="my-1">
    
                      <div class="row">
                        <div class="col-md-6">
                          <div class="fs--1">
                            Store: <span class="fw-bold">{{ dataAddProduct.store_outlet ? dataAddProduct.store_outlet.nama_toko : '' }}</span>
                          </div>
                          <div class="fs--1">
                            Manufaktur: <span class="fw-bold">{{ dataAddProduct.manufaktur_product ? dataAddProduct.manufaktur_product.mnfctName : '' }}</span>
                          </div>
                          <div class="fs--1">
                            Reting Product: 
                            <span class="fw-bold">
                              {{ dataAddProduct.rating ? dataAddProduct.rating : '' }}
                              <span v-if="fullStarsCount > 0" v-for="index in fullStarsCount" :key="index" class="fas fa-star"></span>
                              <span v-if="ishasHalfStar" class="fas fa-star-half-alt"></span>
                            </span>
                          </div>
                          <div class="fs--1">
                            Nama Product: <span class="fw-bold">{{ dataAddProduct.nama_lengkap }}</span>
                          </div>
                          <div class="fs--1">
                            Nama Pendek: <span class="fw-bold">{{ dataAddProduct.nama_singkat }}</span>
                          </div>
                        </div>
                        <div class="col-md-6 text-md-end text-start">
                          <div class="fs--1">
                            Product Code (SKU): <span class="fw-bold">{{ dataAddProduct.product_sku ? dataAddProduct.product_sku : '' }}</span>
                          </div>
                          <div class="fs--1">
                            Product Barcode: <span class="fw-bold">{{ dataAddProduct.product_barcode ? dataAddProduct.product_barcode : '' }}</span>
                          </div>
                          <div class="fs--1">
                            Parent Code: <span class="fw-bold">{{ dataAddProduct.parent_code ? dataAddProduct.parent_code : '' }}</span>
                          </div>
                          <div class="fs--1">
                            Nilai UOM 2: <span class="fw-bold">{{ dataAddProduct.uom2 ? dataAddProduct.uom2 : '' }}</span>
                          </div>
                          <div class="fs--1">
                            Nilai UOM 3: <span class="fw-bold">{{ dataAddProduct.uom3 ? dataAddProduct.uom3 : '' }}</span>
                          </div>
                        </div>
                        <div class="fs--1">
                          <div class="scrollable-customize" style="max-height: 56px;">
                            Deskripsi Produk: 
                            <span class="fw-bold">{{ dataAddProduct.deskripsi }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <!-- Review Price and Diskon -->
                  <div class="row mx-0">
                    <div class="col-md-6 mb-3">
                      <h5 class="mb-0"><span class="fas fa-dollar-sign"></span> Price:</h5>
                      <hr class="my-1">
                      <div class="table-scrollable-wrapper" style="min-height: 146px; max-height: 146px;">
                        <table class="table table-scrollable table-sm">
                          <thead>
                            <tr class="fs--1">
                              <th class="ps-0 py-2 bg-white">Price Code</th>
                              <th class="py-2 bg-white">Product Price</th>
                              <th class="pe-0 py-2 bg-white">Product Cost</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="price in dataAddProduct.master_price" class="fs--1">
                              <td class="ps-0">{{ price.price_code.priceName + ` (${price.price_code.priceCode})` }}</td>
                              <td>Rp {{ price.price ? $root.formatPrice(price.price) : '-' }}</td>
                              <td class="pe-0">Rp {{ price.cost ? $root.formatPrice(price.cost) : '-' }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <h5 class="mb-0"><span class="fas fa-percentage"></span> Diskon:</h5>
                      <hr class="my-1">
                      <div class="table-scrollable-wrapper" style="min-height: 146px; max-height: 146px;">
                        <table class="table table-scrollable table-sm">
                          <thead>
                            <tr class="fs--1">
                              <th class="ps-0 py-2 bg-white">Diskon Code</th>
                              <th class="py-2 bg-white">Deskripsi</th>
                              <th class="pe-0 py-2 bg-white">Diskon(%)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="diskon in dataAddProduct.master_diskon" class="fs--1">
                              <td class="ps-0">#{{ diskon.diskon_code.discCode }}</td>
                              <td>{{ diskon.name }}</td>
                              <td class="pe-0">
                                <span v-if="diskon.diskon_code.discCode != '0'">{{ diskon.nilai_diskon ? diskon.nilai_diskon : '0' }}</span>
                                <span v-else>-</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
  
                  <!-- Review Inventory and Supplier -->
                  <div class="row mx-0">
                    <div class="col-md-6 mb-3">
                      <h5 class="mb-0"><span class="fas fa-dolly"></span> Inventory:</h5>
                      <hr class="my-1">
                      <div class="table-scrollable-wrapper" style="min-height: 146px; max-height: 146px;">
                        <table class="table table-scrollable table-sm">
                          <thead>
                            <tr class="fs--1">
                              <th class="ps-0 py-2 bg-white">Code</th>
                              <th class="py-2 bg-white">Name</th>
                              <th class="py-2 bg-white">On Hand</th>
                              <th class="py-2 bg-white">On Order</th>
                              <th class="py-2 bg-white">Min Buffer</th>
                              <th class="pe-0 py-2 bg-white">Max Buffer</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="whs in dataAddProduct.master_warehouse" class="fs--1">
                              <td class="ps-0">{{ whs.whs_code.whsCode }}</td>
                              <td>{{ whs.name }}</td>
                              <td>{{ whs.on_hand ? whs.on_hand : '-' }}</td>
                              <td>{{ whs.on_order ? whs.on_order : '-' }}</td>
                              <td>{{ whs.min_buffer ? whs.min_buffer : '-' }}</td>
                              <td class="pe-0">{{ whs.max_buffer ? whs.max_buffer : '-' }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <h5 class="mb-0"><span class="fas fa-truck-loading"></span> Supplier:</h5>
                      <hr class="my-1">
                      <div class="table-scrollable-wrapper" style="min-height: 146px; max-height: 146px;">
                        <table class="table table-scrollable table-sm">
                          <thead>
                            <tr class="fs--1">
                              <th class="ps-0 py-2 bg-white">Code</th>
                              <th class="py-2 bg-white">Name</th>
                              <th class="py-2 bg-white">Priority</th>
                              <th class="pe-0 py-2 bg-white">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="supplier in dataAddProduct.master_supplier" class="fs--1">
                              <td class="ps-0">{{ supplier.code }}</td>
                              <td>{{ supplier.name }}</td>
                              <td>{{ getSelectedNamePriority(supplier.priority) }}</td>
                              <td class="pe-0">
                                <span class="badge rounded-pill" :class="supplier.status ? 'badge-subtle-success' : 'badge-subtle-danger'">
                                  {{ supplier.status ? 'Active' : 'No Active' }}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <!-- Review Optional Info -->
                  <div class="px-3">
                    <h5 class="mb-0"><span class="fas fa-adobe"></span> Optional Info:</h5>
                    <hr class="my-1">
                    <div class="table-scrollable-wrapper" style="min-height: 0; max-height: 146px;">
                      <table class="table table-scrollable table-sm">
                        <thead>
                          <tr class="fs--1">
                            <th class="ps-0 py-2 bg-white">Info Code</th>
                            <th class="py-2 bg-white">Info Name</th>
                            <th class="py-2 bg-white">Detail Code</th>
                            <th class="pe-0 py-2 bg-white">Detail Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="code in dataAddProduct.master_opt_info" class="fs--1">
                            <td class="ps-0">{{ code.code }}</td>
                            <td>{{ code.name }}</td>
                            <td>{{ code.select_opt_info ? code.select_opt_info.optDtlCode : '-' }}</td>
                            <td class="pe-0">{{ code.select_opt_info ? code.select_opt_info.optDtlName : '-' }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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
        dataMasterStoreOutlet: [],
        dataMasterManufaktur: [],
        dataMasterPriceCode: [],
        dataMasterDiskonCode: [],
        dataMasterWarehouse: [],
        dataMasterSupplierCode: [],

        dataMasterOptionInfoCode: [],
        dataMasterOptionInfo: [],
        dataMasterOptionInfoBrand: [],
        dataMasterOptionInfoCateg: [],

        inputImageProduct: null,
        selectedFileNameImage: null,

        optionsDataPriority: [
          {
            id: '1',
            name: 'Highest'
          },
          {
            id: '2',
            name: 'Middle'
          },
          {
            id: '3',
            name: 'Lowest'
          }
        ],

        ishasHalfStar: false,
        dataAddProduct: {
          // Product
          store_outlet: null,
          manufaktur_product: null,
          nama_lengkap: null,
          nama_singkat: null,
          product_sku: null,
          product_barcode: null,
          parent_code: null,
          uom2: null,
          uom3: null,
          rating: null,
          deskripsi: null,
          img_product: null,
          info_brand: null,
          info_category: null,

          master_price: [],
          master_diskon: [],
          master_warehouse: [],
          master_supplier: [],
          master_opt_info: [],
        },
      }
    },

    async beforeMount(){
      await this.loadAllData();
    },

    computed: {
      filteredOptionsInfoProduct() {
        return (optionalCode) => {
          return this.dataMasterOptionInfo.filter(option => option.optionalCode === optionalCode);
        }
      },
      fullStarsCount: function() {
        if (this.dataAddProduct.rating !== null) {
          // this.ishasHalfStar = this.dataAddProduct.rating % 1 !== 0;
          const integerPart = parseInt(this.dataAddProduct.rating);
          return integerPart;
        }
        return 0;
      },
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
          this.dataMasterStoreOutlet = allData.getAllStoreOutlet; //All Store Outlet
          this.dataMasterManufaktur = allData.getAllManufaktur; //All Manufaktur
          this.dataMasterPriceCode = allData.getAllMasterPriceCode; //All Price Code
          this.dataMasterDiskonCode = allData.getAllMasterDiskon; //All Diskon Code
          this.dataMasterWarehouse = allData.getAllMasterWarehouse; //All Warehouse
          this.dataMasterSupplierCode = allData.getAllMasterSupplierCode; //All Supplier Code

          this.dataMasterOptionInfoCode = allData.getAllMasterOptionInfoCode; //All Option Info Code
          this.dataMasterOptionInfo = allData.getAllMasterOptionInfo; //All Option Info
          allData.getAllMasterOptionInfo.forEach((data) => {
            if(data.optionalCode_id === 1){
              this.dataMasterOptionInfoBrand.push(data);
            }
            if(data.optionalCode_id === 2){
              this.dataMasterOptionInfoCateg.push(data);
            }
          });
          
          // Set Object master price
          this.dataAddProduct.master_price = allData.getAllMasterPriceCode.map(price => {
            return {
              price_code: price,
              name: price.priceName + ` (${price.priceCode})`,
              price: null,
              cost: null,
            }
          });

          // Set Object master diskon
          this.dataAddProduct.master_diskon = allData.getAllMasterDiskon.map(diskon => {
            return {
              diskon_code: diskon,
              code: '#' + diskon.discCode,
              name: diskon.discName,
              nilai_diskon: null
            }
          });

          // Set Object master inventory
          this.dataAddProduct.master_warehouse = allData.getAllMasterWarehouse.map(whs => {
            return {
              whs_code: whs,
              code: whs.whsCode,
              name: whs.whsName,
              on_hand: null,
              on_order: null,
              min_buffer: null,
              max_buffer: null,
            }
          });

          // Set Object master supplier
          this.dataAddProduct.master_supplier = allData.getAllMasterSupplierCode.map(supplier => {
            return {
              supplier_code: supplier,
              code: supplier.suppCode,
              name: supplier.suppName,
              priority: '',
              status: true, // Default
            }
          });

          // Set Object master optional info
          this.dataAddProduct.master_opt_info = allData.getAllMasterOptionInfoCode.map(info => {
            return {
              opt_info: info,
              code: info.optionalCode,
              name: info.optionalName,
              select_opt_info: null,
            }
          });

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
              $(element).removeClass('text-inactive-pill');
              $(element).addClass('text-active-pill');
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

      changeInputFileImageProduct: function(event) {
        const fileInput = event.target;
        if (fileInput.files.length > 0) {
          const fileName = fileInput.files[0].name;
          this.selectedFileNameImage = fileName;
        }
        this.dataAddProduct.img_product = fileInput.value;
      },
      
      getSelectedNamePriority(id) {
        const selectedItem = this.optionsDataPriority.find(item => item.id === id);
        return selectedItem ? selectedItem.name : '';
      },
    },
  }
</script>

<style scoped>
.text-inactive-pill{
  color: #ababab;
}
.text-active-pill{
  color: #3f9a3f;
}
</style>