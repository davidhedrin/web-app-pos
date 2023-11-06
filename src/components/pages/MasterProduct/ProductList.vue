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
      <div class="table-scrollable-wrapper" style="max-height: 64vh; min-height: 64vh;">
        <table class="table table-scrollable table-sm">
          <thead>
            <tr>
              <td class="bg-white">#</td>
              <td class="bg-white">Image</td>
              <td class="bg-white">Item Code</td>
              <td class="bg-white">Nama</td>
              <td class="bg-white">Store</td>
              <td class="bg-white">Manufaktur</td>
              <td class="bg-white">Harga</td>
              <td class="bg-white">Stok</td>
              <td class="bg-white">Aksi</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in allDataProduct">
              <td class="tr-middle">{{ index + 1 }}</td>
              <td class="tr-middle"><img class="img-product rounded-2" :src="'src/assets/img/product/' + product.image" alt=""></td>
              <td class="tr-middle">{{ product.itemCode }}</td>
              <td class="tr-middle">{{ product.itemName }}</td>
              <td class="tr-middle">{{ product.store.nama_toko }} ({{ product.store.store_code }})</td>
              <td class="tr-middle">{{ product.mnfctName }} ({{ product.mnfctCode }})</td>
              <td class="tr-middle">Rp {{ $root.formatPrice(product.product_price.price) }}</td>
              <td class="tr-middle">
                {{ product.inventory_stok.onHand }} 
              </td>
              <td class="tr-middle">
                <!-- data-bs-toggle="modal" data-bs-target="#modalViewProduct" -->
                <button class="btn btn-link p-0" type="button" @click="showModalDetailProduct(product)">
                  <span class="fas fa-edit text-warning"></span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modalViewProduct" tabindex="-1" role="dialog" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 1100px">
      <div class="modal-content position-relative">
        <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
          <!-- data-bs-dismiss="modal" aria-label="Close" -->
          <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base"  @click="hideModalDetailProduct()"></button>
        </div>
        <div class="modal-body p-0">
          <div class="rounded-top-3 py-3 ps-4 pe-6 bg-body-tertiary">
            <h5 class="mb-0">Detail Product </h5>
          </div>
          <div class="mt-3">
            <div class="scrollable-customize mb-3" style="min-height: 200px; max-height: 650px;">
              <div v-if="productShowDetail">
                <div class="row mx-0 mb-3">
                  <div class="col-md-3 mb-3">
                    <img class="rounded" src="@/assets/img/product/sariayu_martha.jpg" alt="" style="width: 100%; height: 170px; object-fit: cover;">
                  </div>
                  <!-- Review Product -->
                  <div class="col-md-9 mb-2">
                    <h5 class="mb-0"><span class="fas fa-box-open"></span> Product:</h5>
                    <hr class="my-1">
  
                    <div class="row">
                      <div class="col-md-6">
                        <div class="fs--1">
                          Store: <span class="fw-bold">{{ productShowDetail.store.nama_toko }}</span>
                        </div>
                        <div class="fs--1">
                          Manufaktur: <span class="fw-bold">{{ productShowDetail.mnfctName }} ({{ productShowDetail.mnfctCode }})</span>
                        </div>
                        <div class="fs--1">
                          Reting Product: 
                          <span class="fw-bold">
                            {{ productShowDetail.itemReting }}
                            <span v-for="index in $root.convertToInteger(productShowDetail.itemReting)" :key="index" class="fas fa-star"></span>
                            <!-- <span v-if="ishasHalfStar" class="fas fa-star-half-alt"></span> -->
                          </span>
                        </div>
                        <div class="fs--1">
                          Harga Satuan: 
                          <span class="fw-bold">
                            Rp {{ $root.formatPrice(productShowDetail.product_price.price) }} 
                            ({{ productShowDetail.product_price.price_code }})
                          </span>
                        </div>
                        <div class="fs--1">
                          Diskon: 
                          <span class="fw-bold">
                            {{ productShowDetail.product_diskon.disc_code != '0' ? productShowDetail.product_diskon.discount : '0' }}%
                            ({{ productShowDetail.product_diskon.discName }})
                          </span>
                        </div>
                        <div class="fs--1">
                          Stok Warehouse: 
                          <span class="fw-bold">
                            {{ productShowDetail.inventory_stok.onHand }} - 
                            ({{ productShowDetail.inventory_stok.whsCode }} {{ productShowDetail.inventory_stok.whsName }})
                          </span>
                        </div>
                      </div>
                      <div class="col-md-6 text-md-end text-start">
                        <div class="fs--1">
                          Nilai UOM 2: <span class="fw-bold">{{ productShowDetail.uom2 }}</span>
                        </div>
                        <div class="fs--1">
                          Nilai UOM 3: <span class="fw-bold">{{ productShowDetail.uom3 }}</span>
                        </div>
                        <div class="fs--1">
                          Parent Code: <span class="fw-bold">{{ productShowDetail.parentCode }}</span>
                        </div>
                        <div class="fs--1">
                          Product Barcode: <span class="fw-bold">{{ productShowDetail.barCode }}</span>
                        </div>
                        <div class="fs--1">
                          Product Code (SKU): <span class="badge rounded-pill bg-secondary fs--2">{{ productShowDetail.itemCode }}</span>
                        </div>
                      </div>
                      <div class="fs--1">
                        Nama Pendek: <span class="fw-bold">{{ productShowDetail.itemNameShort }}</span>
                      </div>
                    </div>
                  </div>

                  <hr class="d-md-none d-sm-inline-block my-1">
                  
                  <div class="fs-1">
                    <span class="fw-bold">{{ productShowDetail.itemName }}</span>
                  </div>
                  <div class="fs--1">
                    Deskripsi Produk: 
                    <div class="scrollable-customize" style="max-height: 60px;">
                      <span class="fw-bold">{{ productShowDetail.deskripsi }}</span>
                    </div>
                  </div>
                </div>

                <hr>
  
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
                          <tr v-for="price in data_master_price" class="fs--1">
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
                          <tr v-for="diskon in data_master_diskon" class="fs--1">
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
                          <tr v-for="whs in data_master_warehouse" class="fs--1">
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
                          <tr v-for="supplier in data_master_supplier" class="fs--1">
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
                        <tr v-for="code in data_master_opt_info" class="fs--1">
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
        allDataProduct: [],
        productShowDetail: null,
        data_master_price: [],
        data_master_diskon: [],
        data_master_warehouse: [],
        data_master_supplier: [],
        data_master_opt_info: [],

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
      // filteredOptionsInfoProduct() {
      //   return (optionalCode) => {
      //     return this.dataMasterOptionInfo.filter(option => option.optionalCode === optionalCode);
      //   }
      // },
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
          const getAllDataMaster = await axios({
            method: 'get',
            url: this.$root.API_URL + '/master-product',
          });
          const allData = getAllDataMaster.data;
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

          const getAllDataProduct = await axios({
            method: 'get',
            url: this.$root.API_URL + '/master-product/get-all-prodcut',
          });

          const allDataProduct = getAllDataProduct.data;
          this.allDataProduct = allDataProduct;
          // console.log(allDataProduct);
        } catch (error) {
          console.log(error);
        }
        this.$root.hideLoading();
      },

      showModalDetailProduct: function(product){
        this.productShowDetail = product;
        console.log(product);
        
        // Set Object master price
        this.data_master_price = this.dataMasterPriceCode.map(price => {
          const have_master = product.all_product_price;
          const masterExists = have_master.find(item => item.priceCode === price.priceCode);

          return {
            price_code: price,
            name: price.priceName + ` (${price.priceCode})`,
            price: masterExists ? masterExists.price : null,
            cost: masterExists ? masterExists.cost :  null,
          };
        });
        
        // Set Object master diskon
        this.data_master_diskon = this.dataMasterDiskonCode.map(diskon => {
          const have_master = product.all_product_diskon;
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
          const have_master = product.all_inventory_stok;
          const masterExists = have_master.find(item => item.whsCode === whs.whsCode);

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
        this.data_master_supplier = this.dataMasterSupplierCode.map(supplier => {
          const have_master = product.all_product_supplier;
          const masterExists = have_master.find(item => item.suppCode === supplier.suppCode);

          return {
            supplier_code: supplier,
            code: supplier.suppCode,
            name: supplier.suppName,
            priority: masterExists ? masterExists.priority : null,
            status: masterExists ? masterExists.status : null, // Default
          }
        });
        
        // Set Object master optional info
        this.data_master_opt_info = this.dataMasterOptionInfoCode.map(info => {
          const have_master = product.all_product_detail;
          const masterExists = have_master.find(item => item.optionalCode === info.optionalCode);

          return {
            opt_info: info,
            code: info.optionalCode,
            name: info.optionalName,
            select_opt_info: masterExists ? masterExists : null,
          }
        });

        $('#modalViewProduct').modal('show');
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

.img-product{
  height: 40px;
  width: 60px;
  object-fit: cover;
}
</style>