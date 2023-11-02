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
          <div class="d-flex align-items-center justify-content-between">
            <button class="btn btn-primary btn-sm me-2" type="button" data-bs-toggle="modal" data-bs-target="#modalAddNewProduct">
              <span class="fas fa-plus" data-fa-transform="shrink-3"></span>
              <span class="d-none d-md-inline-block ms-1">Baru</span>
            </button>
            <div class="d-flex align-items-center">
              <small class="fw-semi-bold d-none d-lg-block lh-1">View:</small>
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
                    <input v-model="dataAddProduct.rating" class="form-control" type="number" step="0.5" max="5" placeholder="Masukkan reting product">
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
                        <tr v-for="price in dataMasterPriceCode">
                          <td class="ps-0">
                            <input :value="price.priceName + ` (${price.priceCode})`" class="form-control" type="text" disabled>
                          </td>
                          <td>
                            <input class="form-control hide-input-btn" type="number" placeholder="Masukkan harga product">
                          </td>
                          <td class="pe-0">
                            <input class="form-control hide-input-btn" type="number" placeholder="Masukkan cost product">
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
                          <th class="ps-0 py-2 bg-white">Diskon Code</th>
                          <th class="py-2 bg-white">Deskripsi</th>
                          <th class="pe-0 py-2 bg-white">Diskon(%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="diskon in dataMasterDiskonCode">
                          <td class="ps-0" style="width: 100px;">
                            <input :value="'#' + diskon.discCode" class="form-control" type="text" disabled>
                          </td>
                          <td>
                            <input  :value="diskon.discName" class="form-control" type="text" disabled>
                          </td>
                          <td class="pe-0">
                            <input class="form-control hide-input-btn" type="number" placeholder="Masukkan nilai diskon">
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
                        <tr v-for="whs in dataMasterWarehouse">
                          <td class="ps-0" style="width: 80px;">
                            <input :value="whs.whsCode" class="form-control" type="text" disabled>
                          </td>
                          <td style="width: 240px;">
                            <input :value="whs.whsName" class="form-control" type="text" disabled>
                          </td>
                          <td style="width: 150px;">
                            <input class="form-control hide-input-btn" type="number" placeholder="Masukkan nilai">
                          </td>
                          <td style="width: 150px;">
                            <input class="form-control hide-input-btn" type="number" placeholder="Masukkan nilai">
                          </td>
                          <td style="width: 150px;">
                            <input class="form-control hide-input-btn" type="number" placeholder="Masukkan nilai">
                          </td>
                          <td class="pe-0" style="width: 150px;">
                            <input class="form-control hide-input-btn" type="number" placeholder="Masukkan nilai">
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
                        <tr v-for="supplier in dataMasterSupplierCode">
                          <td class="ps-0" style="width: 150px;">
                            <input :value="supplier.suppCode" class="form-control" type="text" disabled>
                          </td>
                          <td>
                            <input  :value="supplier.suppName" class="form-control" type="text" disabled>
                          </td>
                          <td>
                            <select class="form-select">
                              <option value="">Pilih priority</option>
                              <option v-for="list in optionsDataPriority" :value="list.id">{{ list.name }}</option>
                            </select>
                          </td>
                          <td class="d-flex py-2 pe-0" style="width: 60px;">
                            <div>
                              <span class="badge rounded-pill badge-subtle-success">Active</span>
                            </div>
                            <div class="dropdown font-sans-serif position-static">
                              <button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false">
                                <span class="fas fa-ellipsis-h fs--1"></span>
                              </button>
                              <div class="dropdown-menu dropdown-menu-end border py-0">
                                <a class="dropdown-item" href="javascript:void(0)">Active</a>
                                <a class="dropdown-item" href="javascript:void(0)">Inactive</a>
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
                    <tr v-for="code in dataMasterOptionInfoCode">
                      <td class="ps-0" style="width: 100px;">
                        <input :value="code.optionalCode" class="form-control" type="text" disabled>
                      </td>
                      <td style="width: 300px;">
                        <input :value="code.optionalName" class="form-control" type="text" disabled>
                      </td>
                      <td class="pe-0">
                        <v-select 
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
                      <img class="rounded" src="@/assets/img/product/sariayu_martha.jpg" alt="" style="width: 100%; height: 200px; object-fit: cover;">
                    </div>
                    <!-- Review Product -->
                    <div class="col-md-8 mb-3">
                      <h5 class="mb-0"><span class="fas fa-box-open"></span> Product:</h5>
                      <hr class="my-1">
    
                      <div class="row">
                        <div class="col-md-6">
                          <div class="fs--1">
                            Store: <span class="fw-bold"></span>
                          </div>
                          <div class="fs--1">
                            Manufaktur: <span class="fw-bold"></span>
                          </div>
                          <div class="fs--1">
                            Reting Product: <span class="fw-bold"></span>
                          </div>
                          <div class="fs--1">
                            Nama Product: <span class="fw-bold"></span>
                          </div>
                          <div class="fs--1">
                            Nama Pendek: <span class="fw-bold"></span>
                          </div>
                          <div class="fs--1">
                            Info Brand: <span class="fw-bold"></span>
                          </div>
                        </div>
                        <div class="col-md-6 text-md-end text-start">
                          <div class="fs--1">
                            Product Code (SKU): <span class="fw-bold"></span>
                          </div>
                          <div class="fs--1">
                            Product Barcode: <span class="fw-bold"></span>
                          </div>
                          <div class="fs--1">
                            Parent Code: <span class="fw-bold"></span>
                          </div>
                          <div class="fs--1">
                            Nilai UOM 2: <span class="fw-bold"></span>
                          </div>
                          <div class="fs--1">
                            Nilai UOM 3: <span class="fw-bold"></span>
                          </div>
                          <div class="fs--1">
                            Info Category: <span class="fw-bold"></span>
                          </div>
                        </div>
                        <div class="fs--1">
                          <div class="scrollable-customize" style="max-height: 56px;">
                            Deskripsi Produk: 
                            <span class="fw-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
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
                      <div class="table-scrollable-wrapper" style="min-height: 0; max-height: 146px;">
                        <table class="table table-scrollable table-sm">
                          <thead>
                            <tr class="fs--1">
                              <th class="ps-0 py-2 bg-white">Price Code</th>
                              <th class="py-2 bg-white">Product Price</th>
                              <th class="pe-0 py-2 bg-white">Product Cost</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="price in dataMasterPriceCode" class="fs--1">
                              <td class="ps-0">{{ price.priceName + ` (${price.priceCode})` }}</td>
                              <td>Rp 35.000</td>
                              <td class="pe-0">Rp 30.000</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <h5 class="mb-0"><span class="fas fa-percentage"></span> Diskon:</h5>
                      <hr class="my-1">
                      <div class="table-scrollable-wrapper" style="min-height: 0; max-height: 146px;">
                        <table class="table table-scrollable table-sm">
                          <thead>
                            <tr class="fs--1">
                              <th class="ps-0 py-2 bg-white">Diskon Code</th>
                              <th class="py-2 bg-white">Deskripsi</th>
                              <th class="pe-0 py-2 bg-white">Diskon(%)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="diskon in dataMasterDiskonCode" class="fs--1">
                              <td class="ps-0">#{{ diskon.discCode }}</td>
                              <td>{{ diskon.discName }}</td>
                              <td class="pe-0">15%</td>
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
                      <div class="table-scrollable-wrapper" style="min-height: 0; max-height: 146px;">
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
                            <tr v-for="whs in dataMasterWarehouse" class="fs--1">
                              <td class="ps-0">{{ whs.whsCode }}</td>
                              <td>{{ whs.whsName }}</td>
                              <td>120</td>
                              <td>120</td>
                              <td>12</td>
                              <td class="pe-0">13</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <h5 class="mb-0"><span class="fas fa-truck-loading"></span> Supplier:</h5>
                      <hr class="my-1">
                      <div class="table-scrollable-wrapper" style="min-height: 0; max-height: 146px;">
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
                            <tr v-for="supplier in dataMasterSupplierCode" class="fs--1">
                              <td class="ps-0">{{ supplier.suppCode }}</td>
                              <td>{{ supplier.suppName }}</td>
                              <td>{{ getSelectedNamePriority('1') }}</td>
                              <td class="pe-0">
                                <span class="badge rounded-pill badge-subtle-success">Active</span>
                              </td>
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

        dataAddProduct: {
          // Product
          store_outlet: null,
          brand_prodcut: null,
          manufaktur_product: null,
          product_sku: null,
          product_barcode: null,
          parent_code: null,
          nama_lengkap: null,
          nama_singkat: null,
          uom2: null,
          uom3: null,
          rating: null,
          deskripsi: null,
          img_product: null,

          // Price
          price_code: null,
          diskon_code: null,
          product_price: null,
          product_cost: null,

          // Inventory
          warehouse: null,
          on_hand: null,
          on_order: null,
          min_buffer: null,
          max_buffer: null,
          supplier_code: null,
          priority: '',
        }
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
      }
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
      }
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