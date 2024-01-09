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
    <div class="card-header">
      <div class="d-lg-flex justify-content-between">
        <div class="d-flex align-items-center justify-content-between justify-content-lg-end">
          <div class="d-flex align-items-center">
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
              </select>
            </div>
          </div>
        </div>
        <div class="border-bottom border-200 my-3"></div>
        <div class="flex-between-center">
          <form @submit.prevent="fatchProductData(1)">
            <div class="input-group">
              <input v-model="inputSearchProduct" @input="inputSearchProduct.trim() == '' && fatchProductData(currentPageProduct)" class="form-control shadow-none search" type="search" placeholder="Search..." aria-label="search">
              <button class="btn btn-primary border-300 hover-border-secondary">
                <span class="fa fa-search fs--1"></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url('assets/img/illustration/corner-4.png');"></div>
    <div class="card-body position-relative pb-0">
      <div class="table-scrollable-wrapper mb-2" style="min-height: 10vh; max-height: 62vh;">
        <table class="table table-scrollable table-sm">
          <thead>
            <tr>
              <td class="bg-white">#</td>
              <td class="bg-white">Image</td>
              <td class="bg-white">Item Code</td>
              <td class="bg-white">Nama</td>
              <td class="bg-white">Manufaktur</td>
              <td class="bg-white">Barcode</td>
              <td class="bg-white">Perent Code</td>
              <td class="bg-white">Aksi</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in allDataProduct">
              <td class="tr-middle">{{ index + 1 }}</td>
              <td class="tr-middle">
                <img v-if="product.imageUrl == null || product.imageUrl.trim() == ''" class="img-product rounded-2" src="@/assets/img/product/no_image.jpg" alt="">
                <img v-else class="img-product rounded-2" :src="product.imageUrl" alt="">
              </td>
              <td class="tr-middle">{{ product.itemCode }}</td>
              <td class="tr-middle">{{ product.itemName }}</td>
              <td class="tr-middle">{{ product.mnfctName }} ({{ product.mnfctCode }})</td>
              <td class="tr-middle">{{ product.barCode }}</td>
              <td class="tr-middle">{{ product.parentCode }}</td>
              <td class="tr-middle">
                <button class="btn btn-link p-0" type="button" @click="showModalDetailProduct(product)">
                  <span class="fas fa-edit text-warning"></span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- <div v-if="totalPageProduct > 1" class="d-flex justify-content-end">
        <nav aria-label="Page navigation example">
          <ul class="pagination pagination-sm">
            <li class="page-item" :class="{ 'disabled': currentPageProduct === 1 }">
              <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="fatchProductData(currentPageProduct - 1)">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
  
            <li v-for="pageNumber in totalPageProduct" :key="pageNumber" class="page-item"  :class="{ 'active': pageNumber === currentPageProduct }">
              <a class="page-link" href="javascript:void(0)" @click="fatchProductData(pageNumber)">{{ pageNumber }}</a>
            </li>
  
            <li class="page-item" :class="{ 'disabled': currentPageProduct === totalPageProduct }">
              <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="fatchProductData(currentPageProduct + 1)">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div> -->

      
      <div v-if="totalPageProduct > 1" class="d-flex justify-content-end">
        <nav aria-label="Page navigation example">
          <ul class="pagination pagination-sm">

            <li v-if="displayedPages[0] > 1">
              <a class="page-link" href="javascript:void(0)" @click="fatchProductData(1)">First</a>
            </li>

            <li class="page-item" :class="{ 'disabled': currentPageProduct === 1 }">
              <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="fatchProductData(currentPageProduct - 1)">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            <li v-for="pageNumber in displayedPages" :key="pageNumber" class="page-item" :class="{ 'active': pageNumber === currentPageProduct }">
              <a class="page-link" href="javascript:void(0)" @click="fatchProductData(pageNumber)">{{ pageNumber }}</a>
            </li>

            <li class="page-item" :class="{ 'disabled': currentPageProduct === totalPageProduct }">
              <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="fatchProductData(currentPageProduct + 1)">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>

            <li v-if="displayedPages[displayedPages.length - 1] < totalPageProduct">
              <a class="page-link" href="javascript:void(0)" @click="fatchProductData(totalPageProduct)">Last</a>
            </li>

          </ul>
        </nav>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modalViewProduct" tabindex="-1" role="dialog" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 1100px">
      <div class="modal-content position-relative">
        <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
          <!-- data-bs-dismiss="modal" aria-label="Close" -->
          <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div class="rounded-top-3 py-3 ps-4 pe-6 bg-body-tertiary">
            <h5 class="mb-0">Detail Product </h5>
          </div>
          <div class="card">
            <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-4i.png'); background-size: cover;"></div>
            <div class="card-body position-relative">
              <div v-if="productShowDetail">
                <div class="row mx-0 mb-3">
                  <div class="col-md-3 mb-3">
                    <img v-if="productShowDetail.imageUrl == null || productShowDetail.imageUrl.trim() == ''" class="rounded" src="@/assets/img/product/no_image.jpg" alt="" style="width: 100%; height: 155px; object-fit: cover;">
                    <img v-else class="rounded" :src="productShowDetail.imageUrl" alt="" style="width: 100%; height: 155px; object-fit: cover;">
                  </div>
                  <!-- Review Product -->
                  <div class="col-md-9 mb-2">
                    <h5 class="mb-0"><span class="fas fa-box-open"></span> Product:</h5>
                    <hr class="my-1">
  
                    <div class="row">
                      <div class="col-md-6">
                        <div class="fs--1">
                          Manufaktur: <span class="fw-bold">{{ productShowDetail.mnfctName }} ({{ productShowDetail.mnfctCode }})</span>
                        </div>
                        <div class="fs--1">
                          Reting Product: 
                          <span class="fw-bold">
                            {{ productShowDetail.itemReting }}
                            <span v-for="index in $root.convertToInteger(productShowDetail.itemReting)" :key="index" class="fas fa-star"></span>
                          </span>
                        </div>
                        <div class="fs--1">
                          Nilai UOM 2: <span class="fw-bold">{{ productShowDetail.uom2 }}</span>
                        </div>
                        <div class="fs--1">
                          Nilai UOM 3: <span class="fw-bold">{{ productShowDetail.uom3 }}</span>
                        </div>
                      </div>
                      <div class="col-md-6 text-md-end text-start">
                        <div class="fs--1">
                          Parent Code: <span class="fw-bold">{{ productShowDetail.parentCode == null || productShowDetail.parentCode.trim() == '' ? '-' : productShowDetail.parentCode }}</span>
                        </div>
                        <div class="fs--1">
                          Product Barcode: <span class="fw-bold">{{ productShowDetail.barCode == null || productShowDetail.barCode.trim() == '' ? '-' : productShowDetail.barCode }}</span>
                        </div>
                        <div class="fs--1">
                          Product Code (SKU): <span class="badge rounded-pill bg-secondary fs--2">{{ productShowDetail.itemCode == null || productShowDetail.itemCode.trim() == '' ? '-' : productShowDetail.itemCode }}</span>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="fs--1">
                          Nama Pendek: <span class="fw-bold">{{ productShowDetail.itemNameShort }}</span>
                        </div>
                        <div class="fs-1">
                          <span class="fw-bold">{{ productShowDetail.itemName }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="fs--1">
                    Deskripsi Produk: 
                    <div class="scrollable-customize" style="max-height: 10vh;">
                      <span class="fw-bold">
                        {{ productShowDetail.deskripsi }}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, qui! Aliquid optio voluptatem quibusdam qui pariatur excepturi facere quas expedita, placeat officia? Quos doloremque necessitatibus aperiam, esse vitae iure aliquam.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, qui! Aliquid optio voluptatem quibusdam qui pariatur excepturi facere quas expedita, placeat officia? Quos doloremque necessitatibus aperiam, esse vitae iure aliquam.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, qui! Aliquid optio voluptatem quibusdam qui pariatur excepturi facere quas expedita, placeat officia? Quos doloremque necessitatibus aperiam, esse vitae iure aliquam.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, qui! Aliquid optio voluptatem quibusdam qui pariatur excepturi facere quas expedita, placeat officia? Quos doloremque necessitatibus aperiam, esse vitae iure aliquam.
                      </span>
                    </div>
                  </div>
                </div>

                <hr>
  
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="price-tab" data-bs-toggle="tab" href="#tab-price" role="tab" aria-controls="tab-price" aria-selected="true">
                      <span class="fas fa-dollar-sign"></span> Price
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="diskon-tab" data-bs-toggle="tab" href="#tab-diskon" role="tab" aria-controls="tab-diskon" aria-selected="false">
                      <span class="fas fa-percentage"></span> Diskon
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="inventory-tab" data-bs-toggle="tab" href="#tab-inventory" role="tab" aria-controls="tab-inventory" aria-selected="false">
                      <span class="fas fa-dolly"></span> Inventory
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="supplier-tab" data-bs-toggle="tab" href="#tab-supplier" role="tab" aria-controls="tab-supplier" aria-selected="false">
                      <span class="fas fa-truck-loading"></span> Supplier
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="optinfo-tab" data-bs-toggle="tab" href="#tab-optinfo" role="tab" aria-controls="tab-optinfo" aria-selected="false">
                      <span class="fas fa-adobe"></span> Optional Info
                    </a>
                  </li>
                </ul>
                <div class="tab-content pt-2" id="myTabContent">
                  <!-- Price Pannel -->
                  <div class="tab-pane fade show active" id="tab-price" role="tabpanel" aria-labelledby="price-tab">
                    <div class="table-scrollable-wrapper" style="min-height: 200px; max-height: 200px;">
                      <table class="table table-scrollable table-sm">
                        <thead>
                          <tr class="fs--1">
                            <th class="py-2 bg-white">Price Name</th>
                            <th class="py-2 bg-white">Price Code</th>
                            <th class="py-2 bg-white">Product Price</th>
                            <th class="py-2 bg-white">Product Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="price in data_master_price" class="fs--1">
                            <td>{{ price.priceData.priceName }}</td>
                            <td>{{ price.priceData.priceCode }}</td>
                            <td>Rp {{ price.price ? $root.formatPrice(price.price) : '-' }}</td>
                            <td>Rp {{ price.cost ? $root.formatPrice(price.cost) : '-' }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <!-- Discount Pannel -->
                  <div class="tab-pane fade" id="tab-diskon" role="tabpanel" aria-labelledby="diskon-tab">
                    <div class="table-scrollable-wrapper" style="min-height: 200px; max-height: 200px;">
                      <table class="table table-scrollable table-sm">
                        <thead>
                          <tr class="fs--1">
                            <th class="py-2 bg-white">Diskon Code</th>
                            <th class="py-2 bg-white">Deskripsi</th>
                            <th class="py-2 bg-white">Diskon(%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="diskon in data_master_diskon" class="fs--1">
                            <td>#{{ diskon.diskon_code.discCode }}</td>
                            <td>{{ diskon.name }}</td>
                            <td>
                              <span v-if="diskon.diskon_code.discCode != '0'">{{ diskon.nilai_diskon ? diskon.nilai_diskon : '0' }}</span>
                              <span v-else>-</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <!-- Inventory Pannel -->
                  <div class="tab-pane fade" id="tab-inventory" role="tabpanel" aria-labelledby="inventory-tab">
                    <div class="table-scrollable-wrapper" style="min-height: 200px; max-height: 200px;">
                      <table class="table table-scrollable table-sm">
                        <thead>
                          <tr class="fs--1">
                            <th class="py-2 bg-white">Code</th>
                            <th class="py-2 bg-white">Name</th>
                            <th class="py-2 bg-white">On Hand</th>
                            <th class="py-2 bg-white">On Order</th>
                            <th class="py-2 bg-white">Min Buffer</th>
                            <th class="py-2 bg-white">Max Buffer</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="whs in data_master_warehouse" class="fs--1">
                            <td>{{ whs.whs_code.whsCode }}</td>
                            <td>{{ whs.name }}</td>
                            <td>{{ whs.on_hand ? whs.on_hand : '-' }}</td>
                            <td>{{ whs.on_order ? whs.on_order : '-' }}</td>
                            <td>{{ whs.min_buffer ? whs.min_buffer : '-' }}</td>
                            <td>{{ whs.max_buffer ? whs.max_buffer : '-' }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <!-- Supplier Pannel -->
                  <div class="tab-pane fade" id="tab-supplier" role="tabpanel" aria-labelledby="supplier-tab">
                    <div class="table-scrollable-wrapper" style="min-height: 200px; max-height: 200px;">
                      <table class="table table-scrollable table-sm">
                        <thead>
                          <tr class="fs--1">
                            <th class="py-2 bg-white">Code</th>
                            <th class="py-2 bg-white">Name</th>
                            <th class="py-2 bg-white">Priority</th>
                            <th class="py-2 bg-white">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="supplier in data_master_supplier" class="fs--1">
                            <td>{{ supplier.code }}</td>
                            <td>{{ supplier.name }}</td>
                            <td>{{ getSelectedNamePriority(supplier.priority) }}</td>
                            <td>
                              <span class="badge rounded-pill" :class="supplier.status ? 'badge-subtle-success' : 'badge-subtle-danger'">
                                {{ supplier.status ? 'Active' : 'No Active' }}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <!-- Option Info Pannel -->
                  <div class="tab-pane fade" id="tab-optinfo" role="tabpanel" aria-labelledby="optinfo-tab">
                    <div class="table-scrollable-wrapper" style="min-height: 0; max-height: 200px;">
                      <table class="table table-scrollable table-sm">
                        <thead>
                          <tr class="fs--1">
                            <th class="py-2 bg-white">Info Code</th>
                            <th class="py-2 bg-white">Info Name</th>
                            <th class="py-2 bg-white">Detail Code</th>
                            <th class="py-2 bg-white">Detail Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="code in data_master_opt_info" class="fs--1">
                            <td>{{ code.code }}</td>
                            <td>{{ code.name }}</td>
                            <td>{{ code.select_opt_info ? code.select_opt_info.optDtlCode : '-' }}</td>
                            <td>{{ code.select_opt_info ? code.select_opt_info.optDtlName : '-' }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-center">
                <div class="mt-5">
                  <img src="@/assets/img/mtsiconland.png" width="200" alt="" />
                </div>
                <h5 class="fs-0 mt-3">
                  Product Tidak Ditemukan!
                </h5>
              </div>
            </div>
          </div>
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
        master_code: this.$root.master_code,
        master_coll: this.$root.master_coll,
        local_storage: this.$root.local_storage,
        cacheStoreAccess: JSON.parse(localStorage.getItem(this.$root.local_storage.access_store)),

        allDataProduct: [],
        displayedPagesProduct: [],
        totalDisplayedPagesProduct: 3,
        currentPageProduct: 1,
        perPageProduct: 10,
        totalPageProduct: 0,

        productShowDetail: null,
        data_master_price: [],
        data_master_diskon: [],
        data_master_warehouse: [],
        data_master_supplier: [],
        data_master_opt_info: [],

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
            id: 1,
            name: 'Highest'
          },
          {
            id: 2,
            name: 'Middle'
          },
          {
            id: 3,
            name: 'Lowest'
          }
        ],

        inputSearchProduct: '',
      }
    },

    async beforeMount(){
      await this.loadAllData();
    },

    methods: {
      loadAllData: async function(){
        try{
          const getAllDataMaster = await axios({
            method: 'get',
            url: this.$root.API_ERP + '/pos/app/master-product',
          });
          const allData = getAllDataMaster.data;
          this.dataMasterStoreOutlet = allData.getAllStoreOutlet; //All Store Outlet
          this.dataMasterManufaktur = allData.getAllManufaktur; //All Manufaktur
          this.dataMasterPriceCode = allData.getAllMasterPriceCode; //All Price Code
          this.dataMasterDiskonCode = allData.getAllMasterDiskon; //All Diskon Code
          this.dataMasterWarehouse = allData.getAllMasterWarehouse; //All Warehouse
          this.dataMasterSupplierCode = allData.getAllMasterSupplierCode; //All Supplier Code

          
          const getAllDataOptInfo = await axios({
            method: 'get',
            url: this.$root.API_ERP + '/pos/app/master-product/getMasterOptInfoData',
          });
          const dataMasterOptInfo = getAllDataOptInfo.data;
          this.dataMasterOptionInfoCode = dataMasterOptInfo.getAllMasterOptionInfoCode; //All Option Info Code
          this.dataMasterOptionInfo = dataMasterOptInfo.getAllMasterOptionInfo; //All Option Info
          dataMasterOptInfo.getAllMasterOptionInfo.forEach((data) => {
            if(data.optionalCode === this.master_code.productOptInfo.brand_code){
              this.dataMasterOptionInfoBrand.push(data);
            }
            if(data.optionalCode === this.master_code.productOptInfo.category_code){
              this.dataMasterOptionInfoCateg.push(data);
            }
          });

          await this.fatchProductData(this.currentPageProduct);
        } catch (error) {
          console.log(error);
        }
        this.$root.hideLoading();
      },

      fatchProductData: async function(page){
        this.$root.showLoading();
        try{
          const getAllDataProduct = await axios({
            method: 'get',
            url: this.$root.API_ERP + '/pos/app/master-product/getAllMasterProduct',
            params: {
              page: page,
              per_page: this.perPageProduct,
              search: this.inputSearchProduct.trim(),
            },
          });

          const response = getAllDataProduct.data;
          this.currentPageProduct = response.current_page;
          this.totalPageProduct = response.last_page;
          this.allDataProduct = response.data;

          this.updateDisplayedPages();
        } catch (error) {
          console.log(error);
        }
        this.$root.hideLoading();
      },

      updateDisplayedPages() {
        const halfDisplayedPages = Math.floor(this.totalDisplayedPagesProduct / 2);

        let startPage = Math.max(1, this.currentPageProduct - halfDisplayedPages);
        let endPage = Math.min(this.totalPageProduct, startPage + this.totalDisplayedPagesProduct - 1);

        if (endPage - startPage + 1 < this.totalDisplayedPagesProduct) {
          startPage = Math.max(1, endPage - this.totalDisplayedPagesProduct + 1);
        }

        this.displayedPages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
      },

      showModalDetailProduct: async function(product){
        this.productShowDetail = product;
        this.$root.showLoading();
        try{
          const reqData = await axios({
            method: 'get',
            url: this.$root.API_ERP + `/pos/app/master-product/getMasterProductById/${parseInt(product.id)}`,
          });

          const resData = reqData.data;

          // Set Object master price
          this.data_master_price = this.dataMasterPriceCode.map(price => {
            const have_master = resData.all_product_price;
            const masterExists = have_master.find(item => item.priceCode === price.priceCode);

            return {
              priceData: price,
              priceName: price.priceName,
              price: masterExists ? masterExists.price : null,
              cost: masterExists ? masterExists.cost :  null,
            };
          });

          // Set Object master diskon
          this.data_master_diskon = this.dataMasterDiskonCode.map(diskon => {
            const have_master = resData.all_product_diskon;
            const masterExists = have_master.find(item => item.discCode === diskon.discCode);

            return {
              diskon_code: diskon,
              code: '#' + diskon.discCode,
              name: diskon.discName,
              nilai_diskon: masterExists ? masterExists.discount : null
            }
          });

          // Set Object master inventory
          this.data_master_warehouse = this.dataMasterWarehouse.map(whs => {
            const have_master = resData.all_inventory_stok;
            const masterExists = have_master.find(item => item.whsCode === whs.whsCode && item.storeCode === this.cacheStoreAccess.store_code);

            return {
              whs_code: whs,
              code: whs.whsCode,
              name: whs.whsName,
              on_hand: masterExists ? masterExists.onHand : null,
              on_order: masterExists ? masterExists.onOrder : null,
              min_buffer: masterExists ? masterExists.minBuffer : null,
              max_buffer: masterExists ? masterExists.maxBuffer : null,
            }
          });

          // Set Object master supplier
          // this.data_master_supplier = this.dataMasterSupplierCode.map(supplier => {
          //   const have_master = resData.all_product_supplier;
          //   const masterExists = have_master.find(item => item.suppCode === supplier.suppCode);

          //   return {
          //     supplier_code: supplier,
          //     code: supplier.suppCode,
          //     name: supplier.suppName,
          //     priority: masterExists ? masterExists.priority : null,
          //     status: masterExists ? masterExists.status : null, // Default
          //   }
          // });
          
          // Set Object master optional info
          this.data_master_opt_info = this.dataMasterOptionInfoCode.map(info => {
            const have_master = resData.all_product_detail;
            const masterExists = have_master.find(item => item.optionalCode === info.optionalCode);

            return {
              opt_info: info,
              code: info.optionalCode,
              name: info.optionalName,
              select_opt_info: masterExists ? masterExists : null,
            }
          });
        }catch(e){
          console.log(e);
        }
        this.$root.hideLoading();
        $('#modalViewProduct').modal('show');
        // Set Object master price
        // this.data_master_price = this.dataMasterPriceCode.map(price => {
        //   const have_master = product.all_product_price;
        //   const masterExists = have_master.find(item => item.priceCode === price.priceCode);

        //   return {
        //     price_code: price,
        //     name: price.priceName + ` (${price.priceCode})`,
        //     price: masterExists ? masterExists.price : null,
        //     cost: masterExists ? masterExists.cost :  null,
        //   };
        // });
        
        // Set Object master diskon
        // this.data_master_diskon = this.dataMasterDiskonCode.map(diskon => {
        //   const have_master = product.all_product_diskon;
        //   const masterExists = have_master.find(item => item.discCode === diskon.discCode);

        //   return {
        //     diskon_code: diskon,
        //     code: '#' + diskon.discCode,
        //     name: diskon.discName,
        //     nilai_diskon: masterExists ? masterExists.discount : null
        //   }
        // });
        
        // Set Object master inventory
        // this.data_master_warehouse = this.dataMasterWarehouse.map(whs => {
        //   const have_master = product.all_inventory_stok;
        //   const masterExists = have_master.find(item => item.whsCode === whs.whsCode);

        //   return {
        //     whs_code: whs,
        //     code: whs.whsCode,
        //     name: whs.whsName,
        //     on_hand: masterExists ? masterExists.onHand : null,
        //     on_order: masterExists ? masterExists.onOrder : null,
        //     min_buffer: masterExists ? masterExists.minBuffer : null,
        //     max_buffer: masterExists ? masterExists.maxBuffer : null,
        //   }
        // });

        // Set Object master supplier
        // this.data_master_supplier = this.dataMasterSupplierCode.map(supplier => {
        //   const have_master = product.all_product_supplier;
        //   const masterExists = have_master.find(item => item.suppCode === supplier.suppCode);

        //   return {
        //     supplier_code: supplier,
        //     code: supplier.suppCode,
        //     name: supplier.suppName,
        //     priority: masterExists ? masterExists.priority : null,
        //     status: masterExists ? masterExists.status : null, // Default
        //   }
        // });
        
        // Set Object master optional info
        // this.data_master_opt_info = this.dataMasterOptionInfoCode.map(info => {
        //   const have_master = product.all_product_detail;
        //   const masterExists = have_master.find(item => item.optionalCode === info.optionalCode);

        //   return {
        //     opt_info: info,
        //     code: info.optionalCode,
        //     name: info.optionalName,
        //     select_opt_info: masterExists ? masterExists : null,
        //   }
        // });
      },

      hideModalDetailProduct: function() {
        $('#modalViewProduct').modal('hide');
        setTimeout(function() {
          this.productShowDetail = null;
          this.data_master_price = [];
          this.data_master_diskon = [];
          this.data_master_warehouse = [];
          this.data_master_supplier = [];
          this.data_master_opt_info = [];
        }, 500);
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

.img-product{
  height: 40px;
  width: 60px;
  object-fit: cover;
}
</style>