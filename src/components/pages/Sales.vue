<template>
  <div class="row">
    <div class="col-lg-9">
      <div class="card mb-3">
        <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-5j.png); background-size: cover;"></div>
        <div class="card-header position-relative pb-0">
          <div class="row">
            <div class="col-md-6">
              <h5 class="mb-0 d-flex align-items-center">
                <span class="d-none d-sm-block">Order List</span>
                <span class="badge rounded-pill badge-subtle-primary fs-0 ms-1">{{ dataProductInList.length > 0 ? dataProductInList.length : '0' }} item{{ dataProductInList.length > 1 ? 's' : '' }} <span v-if="dataProductInList.length > 0" class="fs--1">({{ totalPcsItemOrder }} pcs)</span></span>
                <!-- <span class="badge rounded-pill bg-info fs--1 ms-1"></span> -->
              </h5>
            </div>
            <div class="col-md-6">
              <div class="d-flex justify-content-end">
                <div>
                  <form class="input-group">
                    <input class="form-control form-control-sm ps-2 pe-0" type="search" placeholder="#No Tiket" style="width: 90px;">
                    <button class="btn btn-primary btn-sm card-link" type="submit"><span class="fas fa-ticket-alt"></span></button>
                  </form>
                </div>
                <div class="ms-2">
                  <button class="btn btn-primary btn-sm card-link" type="submit" @click="showListModalTiket()">Tiket <span class="far fa-list-alt"></span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="m-1">
        <div class="card-body position-relative p-0">
          <div class="table-scrollable-wrapper">
            <table class="table table-scrollable table-sm">
              <div v-if="!dataProductInList || dataProductInList.length === 0"></div>
              <thead v-else>
                <tr class="p-0">
                  <th class="py-1 bg-white">#</th>
                  <th class="py-1 bg-white">SKU</th>
                  <th class="py-1 bg-white">Produk</th>
                  <th class="py-1 bg-white">Harga</th>
                  <th class="py-1 bg-white">Info</th>
                  <th class="py-1 bg-white">Banyak</th>
                  <th class="text-end py-1 bg-white">
                    <a href="javascript:void(0)" v-on:click="emptyProductList" class="p-0 ms-2 text-danger">
                      <span class="fas fa-trash-alt"></span>
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!dataProductInList || dataProductInList.length === 0">
                  <td class="text-center" style="border: none;" colspan="7">
                    <img class="py-5" src="@/assets/img/mtsiconland.png" width="200" alt="" />
                  </td>
                </tr>
                <tr v-else class="align-middle" v-for="(data, index) in dataProductInList" :key="index">
                  <td class="text-nowrap">
                    {{ index+1 }}.
                  </td>
                  <td class="text-nowrap">
                    {{ data.product.itemCode }}
                  </td>
                  <td class="text-nowrap">
                    <div class="d-flex align-items-center">
                      <div>
                        {{ data.product.itemName }}
                      </div>
                      <span v-if="data.is_promo_product" class="badge rounded-pill p-1 px-2 fs--3 ms-1" :class="'bg-' + data.is_promo_product.master_promo.master_kode_promo.badge">
                        {{ data.is_promo_product.master_promo.master_kode_promo.nama_promo }}
                      </span>
                    </div>
                  </td>
                  <td class="text-nowrap">
                    Rp
                    <span v-if="data.is_promo_product">
                      <span v-if="data.is_promo_product.master_promo.tipe_promo == master_coll.tipePromo.bundle">
                        {{ $root.formatPrice($root.filterPriceProduct(data.is_promo_product.for_product).price) }}
                      </span>
                      <span v-if="data.is_promo_product.master_promo.tipe_promo == master_coll.tipePromo.percent">
                        {{ $root.formatPrice($root.filterPriceProduct(data.is_promo_product.for_product).price - ($root.filterPriceProduct(data.is_promo_product.for_product).price * (data.is_promo_product.master_promo.percent/100))) }}
                      </span>
                    </span>
                    <span v-else>
                      <span v-if="$root.filterDiskonProduct(data.product).disc_code == master_code.diskon.tanpa_diskon_code">
                        {{ $root.formatPrice($root.filterPriceProduct(data.product).price) }}
                      </span>
                      <span v-else>
                        {{ $root.formatPrice($root.filterPriceProduct(data.product).price - ($root.filterPriceProduct(data.product).price * ($root.filterDiskonProduct(data.product).discount/100))) }}
                      </span>
                    </span>
                  </td>
                  <td>
                    <span v-if="data.is_promo_product">
                      <span v-if="data.is_promo_product.master_promo.tipe_promo == master_coll.tipePromo.percent" class="badge bg-danger rounded-pill p-1 fs--2">
                        -{{ data.is_promo_product.master_promo.percent }}%
                      </span>
                    </span>
                    <span v-else>
                      <span v-if="$root.filterDiskonProduct(data.product).disc_code != master_code.diskon.tanpa_diskon_code" class="badge bg-danger rounded-pill p-1 fs--2">
                        -{{ $root.filterDiskonProduct(data.product).discount }}%
                      </span>
                    </span>
                  </td>
                  <td>
                    <input class="form-control p-0 ps-2" type="number" min="1" :value="data.qty" style="width: 60px;" 
                    @input="incDecQtyInput($event, data)"
                    @change="incDecQtyChange($event, data)">
                  </td>
                  <td class="text-end">
                    <a href="javascript:void(0)" v-on:click="deleteProductById(data)" class="p-0 ms-2 text-secondary">
                      <span class="fas fa-window-close"></span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div class="card mb-3">
        <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-4.png);"></div>
        <div class="row card-header position-relative align-items-center pb-2 pt-1">
          <div class="col-md-6 py-1">
            <div class="form-check form-check-inline m-0 me-2">
              <input v-model="checkboxProducts.bestSellerAll" class="form-check-input" id="checkBoxBestSellerAll" type="checkbox" value="" />
              <label class="form-check-label mb-0" for="checkBoxBestSellerAll">Best Seller All</label>
            </div>
            <div class="form-check form-check-inline m-0 me-2">
              <input v-model="checkboxProducts.bestSellerToko" class="form-check-input" id="checkBoxBestSellerToko" type="checkbox" value="" />
              <label class="form-check-label mb-0" for="checkBoxBestSellerToko">Best Seller Toko</label>
            </div>
            <div class="form-check form-check-inline m-0 me-2">
              <input v-model="checkboxProducts.topThisMonth" class="form-check-input" id="checkBoxTopThisMonth" type="checkbox" value="" />
              <label class="form-check-label mb-0" for="checkBoxTopThisMonth">Top This Month</label>
            </div>

            <div v-if="isCheckBoxPromo" class="form-check form-check-inline m-0 me-2">
              <input v-model="checkboxProducts.promo" class="form-check-input" id="checkBoxPromo" type="checkbox" value="" />
              <label class="form-check-label mb-0" for="checkBoxPromo">Promo</label>
            </div>
            <div v-if="isCheckBoxFlushOut" class="form-check form-check-inline m-0 me-2">
              <input v-model="checkboxProducts.flushOut" class="form-check-input" id="checkBoxFlushOut" type="checkbox" value="" />
              <label class="form-check-label mb-0" for="checkBoxFlushOut">Flush Out</label>
            </div>
            <div v-if="isCheckBoxKaryawan && memberOverview != null && memberOverview.tipe_konsumen.slug == master_code.tipeKonsumen.karyawan" class="form-check form-check-inline m-0 me-2">
              <input v-model="checkboxProducts.promoKaryawan" class="form-check-input" id="checkBoxPromoKaryawan" type="checkbox" value="" />
              <label class="form-check-label mb-0" for="checkBoxPromoKaryawan">Promo Karyawan</label>
            </div>
          </div>
          <div class="col-md-3 py-2">
            <v-select 
              v-model="selectedFilterBrand" 
              :options="filteredOptionsInfoProduct(this.master_code.productOptInfo.brand_code)"
              label="optDtlName"
              value="optDtlCode"
              placeholder="Pilih brand"
            />
            <!-- <select v-model="selectedFilterBrand" class="form-select">
              <option value="">Pilih Brand</option>
              <option v-for="brand in dataMasterOptionInfo" :id="brand.optDtlCode" :value="brand.optDtlCode">{{ brand.optDtlName }}</option>
            </select> -->
          </div>
          <div class="col-md-3">
            <form @submit.prevent="btnSearchSubmitProduct()">
              <div class="input-group">
                <input v-model="inputSearchProduct" class="form-control search-input fuzzy-search" type="search" placeholder="Search...">
                <button class="btn btn-primary card-link" type="submit" style="z-index: 1"><span class="fas fa-search"></span></button>
              </div>
            </form>
          </div>
        </div>
        <div class="card-body position-relative p-0">
          <div class="scrollable-customize mb-3" style="max-height: 46vh; min-height: 46vh">
            <div v-if="$root.selectedStoreAccess === null || filteredProducts.length < 1" class="text-center py-5">
              <div class="mt-5">
                <img src="@/assets/img/mtsiconland.png" width="200" alt="" />
              </div>
              <h5 class="fs-0 mt-3">
                Product Tidak Ditemukan!
              </h5>
            </div>
            <div class="px-3">
              <div class="row px-3">
                <div v-if="$root.selectedStoreAccess" class="mb-1 col-sm-6 col-md-2 p-1" v-for="product in filteredProducts" :key="product.sku">
                  <div class="border rounded-1 h-100 d-flex flex-column justify-content-between">
                    <div class="overflow-hidden">
                      <div class="position-relative rounded-top overflow-hidden" v-on:click="addProductToList(product)" style="cursor: pointer;">
                        <div class="d-block text-center">
                          <img v-if="product.master_promo_id" class="img-fluid rounded-top" :src="'src/assets/img/product/' + product.for_product.image" style="width: 100%; height: 110px;" alt="">
                          <img v-else class="img-fluid rounded-top" :src="'src/assets/img/product/' + product.image" style="width: 100%; height: 110px;" alt="">
                          <div class=" position-absolute mt-1 me-2 z-2 top-0 end-0">
                            <div v-if="product.master_promo_id">
                              <span class="badge rounded-pill p-1 fs--3 me-1" :class="'bg-' + product.master_promo.master_kode_promo.badge">
                                {{ product.master_promo.master_kode_promo.nama_promo }}
                              </span>
                              <span v-if="product.master_promo.tipe_promo == master_coll.tipePromo.bundle" class="badge bg-warning rounded-pill p-1 fs--3">
                                {{ product.master_promo.buy_item }} Get {{ product.master_promo.get_item }}
                              </span>
                              <span v-if="product.master_promo.tipe_promo == master_coll.tipePromo.percent" class="badge bg-danger rounded-pill p-1 fs--3">
                                -{{ product.master_promo.percent }}%
                              </span>
                            </div>
                            <div v-else>
                              <span v-if="$root.filterDiskonProduct(product).disc_code != master_code.diskon.tanpa_diskon_code" class="badge bg-danger rounded-pill p-1 fs--3">
                                -{{ $root.filterDiskonProduct(product).discount }}%
                              </span>
                            </div>
                          </div>
                          <span class="badge badge-subtle-secondary position-absolute mb-1 ms-2 z-2 px-1 bottom-0 start-0 fs--2 fw-bold" style="font-weight: normal;">{{ product.master_promo_id ? product.for_product.itemCode : product.itemCode }}</span>
                          <span class="badge badge-subtle-success position-absolute mb-1 me-2 z-2 px-1 bottom-0 end-0 fs--2" style="font-weight: normal;">{{ product.master_promo_id ? $root.filterStokProduct(product.for_product).onHand : $root.filterStokProduct(product).onHand }}</span>
                        </div>
                      </div>
                      <div class="p-2 text-center">
                        <button v-on:click="productShowDetail = product" class="btn btn-sm p-0 ps-1" data-bs-toggle="offcanvas" data-bs-target="#canvasShowDetailProduct" aria-controls="canvasShowDetailProduct">
                          <h5 class="fs-0 mb-0">
                            <div class="text-1100">
                              <span class="d-inline-block text-truncate max-width-text-truncate">
                                {{ product.master_promo_id ? product.for_product.itemName : product.itemName }}
                              </span>
                            </div>
                          </h5>
                        </button>
                        <div v-if="product.master_promo_id">
                          <strong class="fs-md-0 text-warning mb-0 text-center">
                            Rp {{ $root.formatPrice($root.filterPriceProduct(product.for_product).price - ($root.filterPriceProduct(product.for_product).price * (product.master_promo.percent/100))) }}
                            <del v-if="product.master_promo.tipe_promo == master_coll.tipePromo.percent" class="text-secondary fs--1">
                              {{ $root.formatPrice($root.filterPriceProduct(product.for_product).price) }}
                            </del>
                          </strong>
                        </div>
                        <div v-else>
                          <div v-if="$root.filterDiskonProduct(product).disc_code == master_code.diskon.tanpa_diskon_code">
                            <strong class="fs-md-0 text-warning mb-0 text-center">
                              Rp {{ $root.formatPrice($root.filterPriceProduct(product).price) }}
                            </strong>
                          </div>
                          <div v-else>
                            <strong class="fs-md-0 text-warning mb-0 text-center">
                              Rp {{ $root.formatPrice($root.filterPriceProduct(product).price - ($root.filterPriceProduct(product).price * ($root.filterDiskonProduct(product).discount/100))) }}
                              <del class="text-secondary fs--1">{{ $root.formatPrice($root.filterPriceProduct(product).price) }}</del>
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center mb-2">Member Overview</h5>
          
          <div class="text-center mb-3">
            <button v-on:click="openModalFindOrRegis" class="btn btn-outline-primary btn-sm me-1" type="button" data-bs-toggle="modal" data-bs-target="#modalFindMember">
              Find Member
              <span class="fas fa-search"></span>
            </button>
          </div>

          <div class="card mb-3" :class="{'border-red' : invalidMemberSelect}">
            <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-4.png);"></div>
            <div class="card-body position-relative p-2">
              <div class="d-flex justify-content-between mb-0">
                <p class="mb-0 fs--1">No.Member</p>
                <span class="text-dark"><strong>{{ memberOverview ? memberOverview.member_id : "-" }}</strong></span>
              </div>
              <div class="d-flex justify-content-between mb-0">
                <p class="mb-0 fs--1">Nama</p>
                <span class="text-dark"><strong>{{ memberOverview ? memberOverview.nama : "-" }}</strong></span>
              </div>
              <div class="d-flex justify-content-between mb-0">
                <p class="mb-0 fs--1">No Hp</p>
                <span class="text-dark">
                  <strong >{{ memberOverview ? $root.formatPhoneNumber(memberOverview.no_hp) : "-" }}</strong>
                  <button v-if="memberOverview" v-on:click="$root.copyTextClipboard(memberOverview.no_hp, 'Nomor handphone')" class="btn btn-sm p-0 ps-1" style="border: none;">
                    <span class="fas fa-copy"></span>
                  </button>
                </span>
              </div>
              <div class="d-flex justify-content-between mb-0">
                <p class="mb-0 fs--1">Point</p>
                <span class="text-dark"><strong>{{ memberOverview ? $root.formatPrice(memberOverview.point) : "-" }}</strong></span>
              </div>
            </div>
          </div>

          <h5 class="card-title text-center mb-2">Billing Detail</h5>
          <div class="input-group mb-3">
            <input class="form-control" type="text" placeholder="Voucher code">
            <button class="btn btn-primary card-link">Rp</button>
          </div>
          <hr class="m-0">
          <table class="table fs--1 mb-3">
            <tbody>
              <tr class="border-bottom">
                <th class="ps-0 py-1" style="font-weight: normal;">Subtotal</th>
                <th class="pe-0 py-1 text-end text-dark">Rp {{ $root.formatPrice(subTotalPrice) }}</th>
              </tr>
              <tr class="border-bottom">
                <th class="ps-0 py-1" style="font-weight: normal;">Diskon Voucher </th>
                <th class="pe-0 py-1 text-end text-dark">
                  <span v-if="diskonPrice > 0">-Rp {{ $root.formatPrice(diskonPrice) }}</span>
                  <span v-else>-</span>
                </th>
              </tr>
              <tr class="border-bottom">
                <th class="ps-0 py-1" style="font-weight: normal;">Total </th>
                <th class="pe-0 fs-0 py-1 text-end text-warning">Rp {{ $root.formatPrice(totalBayarPrice) }}</th>
              </tr>
            </tbody>
          </table>
          
          <div class="mb-3">
            <div class="mb-2">
              <label class="form-label mb-0" for="selectSalesBy">Sales By:</label>
              <select v-model="selectSalesBy" @change="selectMethodPayment = ''" class="form-select mb-0" id="selectSalesBy">
                <option v-for="sales in dataAllMasterSalesBy" :value="sales.slug">{{ sales.nama_sales }}</option>
              </select>
            </div>
            <div class="mb-2">
              <label class="form-label mb-0" for="selectMethodPayment">Metode Pembayaran:</label>
              <select v-model="selectMethodPayment" class="form-select mb-0" :class="{'border-red' : invalidMetodePembayaran}" v-on:change="onChangeSelectedMetodeBayar" id="selectMethodPayment">
                <option value="">Pilih Metode Bayar</option>
                <option v-if="selectSalesBy == master_code.salesBy.wi" :value="metodeBayarCash.id">{{ metodeBayarCash.nama }}</option>
                <option v-if="memberOverview != null && memberOverview.tipe_konsumen.slug == master_code.tipeKonsumen.karyawan" :value="metodeBayarKaryawan.id">
                  {{ metodeBayarKaryawan.nama }}
                </option>
                <optgroup label="Transfer Bank">
                  <option v-for="metode in dataMetodeBayarTF" :value="metode.id">{{ metode.nama }}</option>
                </optgroup>
                <optgroup v-if="selectSalesBy != master_code.salesBy.selly" label="E-Wallet">
                  <option v-for="metode in dataMetodeBayarEWal" :value="metode.id">{{ metode.nama }}</option>
                </optgroup>
                <optgroup v-if="selectSalesBy != master_code.salesBy.selly" label="Kartu Kredit">
                  <option v-for="metode in dataMetodeBayarCC" :value="metode.id">{{ metode.nama }}</option>
                </optgroup>
              </select>
            </div>
            <div>
              <label class="form-label mb-0" for="keterangan_detail">Keterangan:</label>
              <input v-model="keteranganTransaksi" class="form-control" id="keterangan_detail" placeholder="Keterangan jika ada" />
            </div>
          </div>

          <div class="d-grid gap-2">
            <!-- Kontrol untuk penambahan metode pembayaran distruk checkout button confirm pay (di event v-on:click) -->
            <button class="btn btn-success" type="submit" v-on:click="confirmationPayment">Confirm &amp; Pay</button>
          </div>
          <hr class="mb-2 mt-2">
          <div class="d-grid gap-2">
            <button v-if="isBuatkanTiketBtn" class="btn btn-info" type="submit" v-on:click="buatkanSebagaiTiket"><span class="me-2">Buatkan Tiket</span><span class="fas fa-ticket-alt"></span></button>
            <button v-else class="btn btn-secondary" type="submit" disabled><span class="me-2">Buatkan Tiket</span><span class="fas fa-ticket-alt"></span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="modal fade" id="modalListTicket" tabindex="-1" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="max-width: 700px;">
      <div class="modal-content position-relative border-0">
        <div class="modal-body p-0">
          <div class="card">
            <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-5i.png); background-position: left; background-size: cover;"></div>
            <div class="card-body position-relative p-0">
              <div class="position-absolute top-0 end-0 mt-3 me-3 z-1">
                <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="card-header rounded-top-3 py-3 ps-3 pe-6">
                <h5 class="mb-0" id="modalFindMemberLabel">Daftar List Tiket</h5>
              </div>
              <div class="p-4 pt-0">
                <div class="table-scrollable-wrapper" style="min-height: 30vh; max-height: 30vh;">
                  <table class="table table-scrollable table-hover">
                    <thead>
                      <tr>
                        <!-- <th class="bg-white">Tipe</th> -->
                        <th class="bg-white">#</th>
                        <th class="bg-white">Konsumen</th>
                        <th class="bg-white">No Hp</th>
                        <th class="bg-white">Tiket Pesanan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="showLoadingTicket">
                        <td class="text-center" colspan="4">
                          <component :is="loadingBlack"></component>
                        </td>
                      </tr>
                      <tr v-if="dataFilterAllTicket.length > 0 && !showLoadingTicket" v-for="(ticket, index) in dataFilterAllTicket" :key="ticket.member_id" style="cursor: pointer;" @click="clickRowTicketList(ticket)">
                        <td>{{ index+1 }}</td>
                        <td>{{ ticket.member.nama }}</td>
                        <td>{{ ticket.member.no_hp }}</td>
                        <td>
                          <span class="badge badge-subtle-primary mx-1" v-for="no_ticket in ticket.no_ticket">
                            {{ no_ticket }}
                          </span>
                        </td>
                      </tr>
                      <tr v-if="!showLoadingTicket">
                        <td class="text-center" colspan="4">
                          <h5 class="fs--1">Tidak ada tiket terdaftar</h5>
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
  
  <div class="modal fade" id="modalFindMember" tabindex="-1" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document" :style="!memberFindOrRegis ? 'max-width: 450px' : 'max-width: 850px'">
      <div class="modal-content position-relative border-0">
        <div class="modal-body p-0">
          <div class="card">
            <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-5i.png); background-position: left; background-size: cover;"></div>
            <div class="card-body position-relative p-0">
              <div class="position-absolute top-0 end-0 mt-3 me-3 z-1">
                <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="card-header rounded-top-3 py-3 ps-3 pe-6">
                <h5 class="mb-0" id="modalFindMemberLabel">{{ memberFindOrRegis ? "Temukan" : "Daftarkan" }} Member</h5>
                <button v-on:click="this.memberFindOrRegis = !this.memberFindOrRegis" class="btn btn-outline-primary btn-sm me-1 mb-1" type="button">
                  <p class="fs--2 mb-0">{{ memberFindOrRegis ? "Daftarkan member" : "Temukan member" }}</p>
                </button>
              </div>
              <div class="p-4 pt-0">
                <div v-if="memberFindOrRegis">
                  <div class="row align-items-center">
                    <div class="col-md-8">
                      <h5 class="mb-2 fs-0"><u>Daftar Member:</u></h5>
                    </div>
                    <div class="col-md-4">
                      <input v-model="inputSearchMember" class="form-control search-input fuzzy-search mb-3" type="search" placeholder="Search..." aria-label="Search">
                    </div>
                  </div>
                  <hr class="p-0 m-0">
                  <div class="table-scrollable-wrapper" style="min-height: 30vh; max-height: 30vh;">
                    <table class="table table-scrollable table-sm table-hover">
                      <thead>
                        <tr>
                          <!-- <th class="bg-white">Tipe</th> -->
                          <th class="bg-white">Name</th>
                          <th class="bg-white">Email</th>
                          <th class="bg-white">Phone</th>
                          <th class="bg-white">Tanggal Lahir</th>
                          <th class="bg-white text-end">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="member in filteredMembers" :id="member.member_id" class="align-middle">
                          <!-- <td class="text-nowrap" v-on:click="selectMemberOverview(member)" style="cursor: pointer;">
                            <span class="badge rounded-pill" :class="member.tipe_konsumen.slug == master_code.tipeKonsumen.member ? 'badge-subtle-success' : member.tipe_konsumen.slug == master_code.tipeKonsumen.reseller ? 'badge-subtle-warning' : member.tipe_konsumen.id == master_code.tipeKonsumen.karyawan ? 'badge-subtle-primary' : ''">
                              {{ member.tipe_konsumen.nama_tipe }}
                            </span>
                          </td> -->
                          <td class="text-nowrap" v-on:click="selectMemberOverview(member)" style="cursor: pointer;">{{ member.nama }}</td>
                          <td class="text-nowrap" v-on:click="selectMemberOverview(member)" style="cursor: pointer;">{{ member.email }}</td>
                          <td class="text-nowrap" v-on:click="selectMemberOverview(member)" style="cursor: pointer;">{{ member.no_hp }}</td>
                          <td class="text-nowrap" v-on:click="selectMemberOverview(member)" style="cursor: pointer;">{{ $root.formatDate(member.tanggal_lahir) }}</td>
                          <td class="text-end">
                            <button class="btn btn-link p-0" type="button" v-on:click="selectEditMemberForm(member)">
                              <span class="fas fa-edit text-warning"></span>
                            </button>
                            <!-- <button class="btn btn-link p-0 ms-2" type="button">
                              <span class="fas fa-trash-alt text-danger"></span>
                            </button> -->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div v-else>
                 <form @submit.prevent="storeNewMember">
                    <div class="mb-1">
                      <label class="form-label mb-0" for="nama_member">Name</label>
                      <input v-model="dataInputMember.nama" class="form-control bg-transparent" id="nama_member" type="text" placeholder="Masukkan nama lengkap">
                    </div>
                    <div class="mb-1">
                      <label class="form-label mb-0" for="no_hp_member">No Hp</label>
                      <input v-model="dataInputMember.no_hp" class="form-control bg-transparent" id="no_hp_member" type="text" placeholder="Masukkan nomor handpone">
                    </div>
                    <div class="mb-1">
                      <label class="form-label mb-0" for="email_member">Email address</label>
                      <input v-model="dataInputMember.email" class="form-control bg-transparent" id="email_member" type="email" placeholder="email@example.com">
                    </div>
                    <div class="mb-1">
                      <label class="form-label mb-0" for="select_jk_member">Jenis Kelamin</label>
                      <select v-model="dataInputMember.jenis_kelamin" class="form-select bg-transparent" id="select_jk_member">
                        <option value="">Pilih jenis kelamin</option>
                        <option value="male">Laki-laki</option>
                        <option value="female">Perempuan</option>
                        <option value="other">Lainnya</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label mb-0" for="tanggal_lahir">Tanggal Lahir</label>
                      <input v-model="dataInputMember.tanggal_lahir" class="form-control bg-transparent" id="tanggal_lahir" type="date">
                    </div>
                    <div class="text-end">
                      <button class="btn btn-primary btn-sm" type="submit">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="modal fade" id="modalEditMember" tabindex="-1" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content position-relative border-0">
        <div class="modal-body p-0">
          <div class="card">
            <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-5i.png); background-position: left; background-size: cover;"></div>
            <div class="card-body position-relative p-0">
              <div class="position-absolute top-0 end-0 mt-3 me-3 z-1">
                <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="card-header rounded-top-3 py-3 ps-3 pe-6">
                <h5 class="mb-0" id="modalFindMemberLabel">Edit Member</h5>
                <button class="btn btn-outline-primary btn-sm me-1 mb-1" type="button" v-on:click="openModalFindOrRegis">
                  <p class="fs--2 mb-0">Temukan member</p>
                </button>
              </div>
              <div class="p-4 pt-0">
                <form @submit.prevent="updateEditDataMember">
                  <div class="mb-1">
                    <label class="form-label mb-0" for="edit_nama_member">Name</label>
                    <input v-model="dataInputMember.nama" class="form-control bg-transparent" id="edit_nama_member" type="text" placeholder="Masukkan nama lengkap">
                  </div>
                  <div class="mb-1">
                    <label class="form-label mb-0" for="edit_no_hp_member">No Hp</label>
                    <input v-model="dataInputMember.no_hp" class="form-control bg-transparent" id="edit_no_hp_member" type="text" placeholder="Masukkan nomor handpone">
                  </div>
                  <div class="mb-1">
                    <label class="form-label mb-0" for="edit_email_member">Email address</label>
                    <input v-model="dataInputMember.email" class="form-control bg-transparent" id="edit_email_member" type="email" placeholder="email@example.com">
                  </div>
                  <div class="mb-1">
                    <label class="form-label mb-0" for="edit_select_jk_member">Jenis Kelamin</label>
                    <select v-model="dataInputMember.jenis_kelamin" class="form-select bg-transparent" id="edit_select_jk_member">
                      <option value="">Pilih jenis kelamin</option>
                      <option value="male">Laki-laki</option>
                      <option value="female">Perempuan</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label class="form-label mb-0" for="edit_tanggal_lahir">Tanggal Lahir</label>
                    <input v-model="dataInputMember.tanggal_lahir" class="form-control bg-transparent" id="edit_tanggal_lahir" type="date">
                  </div>
                  <div class="text-end">
                    <button class="btn btn-primary btn-sm" type="submit">Simpan</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal rincian dan detail pesanan -->
  <div class="modal fade" id="modalConfirmPay" ref="modalConfirmPay" data-bs-keyboard="false" data-bs-backdrop="static" tabindex="-1" aria-labelledby="modalConfirmPayLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 500px">
      <div class="modal-content border-0">
        <div class="modal-body p-0">
          <div class="card">
            <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-1-left.png); background-position: left; background-size: cover;"></div>
            <div class="card-body position-relative p-0">
              <div class="rounded-top-3 py-3 text-center">
                <img src="@/assets/img/mtsiconland.png" width="200" alt="" />
              </div>
              <div class="p-3 py-0">
                <hr class="p-0 m-0 mb-2">
                <div class="d-flex justify-content-between fs--1 mb-0">
                  <p class="fs--1 m-0">
                    BSC: {{ this.$root.dataAuthToken ? this.$root.dataAuthToken.nama_lengkap : '' }}
                  </p>
                  <span class="fs--1">{{ formattedDateNow }}</span>
                </div>
                <div class="d-flex justify-content-between fs--1 mb-2">
                  <p class="fs--1 m-0">
                    Member: {{ memberOverview ? memberOverview.nama : '' }}
                    ({{ memberOverview ? $root.formatPrice(memberOverview.point) : '' }} Point)
                  </p>
                  <span class="fs--1">{{ formattedTimeNow }}</span>
                </div>
    
                <div class="mb-3">
                  <label class="form-label mb-0">Ringkasan Produk</label>
                  <hr class="m-0">
                  <div class="scrollable-customize" style="max-height: 150px;">
                    <div v-for="data in dataProductInList" :id="data.product.itemCode" class="d-flex justify-content-between fs--1 mb-1">
                      <p class="mb-0 text-dark me-4"><strong>{{ data.qty }} x </strong>{{ data.product.itemName }}</p>
                      <span class="text-dark"><strong>{{ $root.formatPrice(data.qty * $root.filterPriceProduct(data.product).price) }}</strong></span>
                    </div>
                  </div>
                  <hr class="mb-1 mt-0">
                  <div class="d-flex justify-content-between fs--1 mb-0">
                    <p class="mb-0 text-dark"><strong>Total</strong></p>
                    <span class="text-dark fs-0"><strong>Rp {{ $root.formatPrice(totalPriceRingkasanProduct) }}</strong></span>
                  </div>
                  <hr class="m-0 mt-1">
                </div>
    
                <span class="text-dark">Billing Detail:</span>
                <div class="form-check form-switch mb-1 mt-1">
                  <input v-model="checkboxMemberPotonganPoint" @change="changeCheckboxMemberPotonganPoint()" class="form-check-input" id="flexSwitchCheckDefault" type="checkbox" />
                  <label class="form-check-label mb-0" for="flexSwitchCheckDefault">
                    Gunakan Potongan Point ({{ memberOverview ? $root.formatPrice(memberOverview.point) : '' }} pt)
                  </label>
                </div>
                <hr class="m-0">
                
                <table class="table fs--1 mb-3">
                  <tbody>
                    <tr v-if="totalHematDiskon > 0" class="border-bottom">
                      <th class="ps-0 py-1" style="font-weight: normal;">Hemat Diskon </th>
                      <th class="pe-0 py-1 text-end text-dark">-Rp {{ $root.formatPrice(totalHematDiskon) }}</th>
                    </tr>
                    <tr class="border-bottom">
                      <th class="ps-0 py-1" style="font-weight: normal;">Total Setelah Diskon </th>
                      <th class="pe-0 py-1 text-end text-dark">Rp {{ $root.formatPrice(totalBayarPrice) }}</th>
                    </tr>
                    <tr v-if="getCheckGelarPembelian" class="border-bottom">
                      <th class="ps-0 py-1" style="font-weight: normal;">
                        Reseller (Extra Diskon) 
                        <span v-if="getCheckGelarPembelian.slug == master_code.gelarBeli.silver" class="badge badge-subtle-danger px-1 fs--2">
                          {{ getCheckGelarPembelian.amount }}%
                        </span>
                        <img class="py-0" src="@/assets/img/illustration/rewords-payment.png" alt="invoice" width="20">
                      </th>
                      <th class="pe-0 py-1 text-end text-dark">
                        <span v-if="getCheckGelarPembelian.slug == master_code.gelarBeli.silver">
                          -Rp {{ $root.formatPrice(totalDiskonPercentReseller) }}
                        </span>
                        <span v-else-if="getCheckGelarPembelian.slug == master_code.gelarBeli.gold" class="badge badge-subtle-warning px-1 fs--2">
                          Buy {{ getCheckGelarPembelian.amount }} Get 1
                        </span>
                      </th>
                    </tr>
                    <!-- <tr class="border-bottom">
                      <th class="ps-0 py-1" style="font-weight: normal;">Diskon Voucher </th>
                      <th class="pe-0 py-1 text-end text-dark">-Rp 5.000</th>
                    </tr> -->
                    <tr class="border-bottom">
                      <th class="ps-0 py-1" style="font-weight: normal;">Total Bayar </th>
                      <th class="pe-0 fs-1 py-0 text-end text-warning">Rp {{ $root.formatPrice(calculateTotalBayarPrice) }}</th>
                    </tr>
                  </tbody>
                </table>
    
                <!-- Logic add metode pembayaran -->
                <!-- <div class="d-flex align-items-center justify-content-between mb-1">
                  <label class="form-label mb-0">Metode Pembayaran: </label>
                  <div class="btn-group" role="group">
                    <button v-if="validasiMetodePembayaran.length > 0" class="btn btn-sm p-0 ms-2 text-primary dropdown-toggle" id="btnGroupTambahMetode" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Tambah Metode
                    </button>
                    <button v-else class="btn btn-sm p-0 ms-2 text-primary" type="button" disabled>
                      Tambah Metode <span class="fas fa-caret-down"></span>
                    </button>
                    <div class="dropdown-menu py-0" aria-labelledby="btnGroupTambahMetode">
                      <a v-for="metode in validasiMetodePembayaran" class="dropdown-item" v-on:click="addMoreMetodeBayar(metode)" href="javascript:void(0)">{{ metode.nama }}</a>
                    </div>
                  </div>
                </div> -->
                <div class="d-flex align-items-center justify-content-between rounded-3 bg-body-tertiary ps-2 py-1 py-0">
                  <div class="w-35">
                    <img class="img-icon-po2" :src="'src/assets/img/po-img/' + selectedMetodeBayar.image" />
                  </div>
                  <div class="w-40 me-2 text-end">
                    <input v-if="selectedMetodeBayar.kode != master_code.metodeBayar.cash && selectedMetodeBayar.kode != master_code.metodeBayar.karyawan" v-model="modelInputSelectedMetodeBayar" id="inputSelectedMetodeBayar" @input="modelInputSelectedMetodeBayar = onChangeCheckNumberVal($event)" class="form-control form-control-sm" type="text" placeholder="4 digit nomor" />
                    <i v-if="selectedMetodeBayar.kode == master_code.metodeBayar.cash" class="fs--1">Pembayaran Cash</i>
                    <i v-if="selectedMetodeBayar.kode == master_code.metodeBayar.karyawan" class="fs--1">Karyawan</i>
                  </div>
                  <div class="w-25">
                    <input class="form-control form-control-sm text-end" id="inputSelectedNominalMetode" @input="onChangeCheckVal($event)" type="text" :value="$root.formatPrice(calculateTotalBayarPrice)" disabled />
                  </div>
                </div>
                
                <!-- Logic add metode pembayaran -->
                <!-- <div v-for="(metode, index) in dataMoreMetodeBayar" :key="index" class="d-flex align-items-center justify-content-between rounded-3 bg-body-tertiary ps-2 py-1 mt-1">
                  <div class="w-35 d-flex align-items-center">
                    <a href="javascript:void(0)" class="text-secondary me-1" v-on:click="removeMoreMetodeBayar(metode, index)">
                      <span class="fas fa-window-close fs--1"></span>
                    </a>
                    <img class="img-icon-po1" :src="'src/assets/img/po-img/' + metode.image" />
                  </div>
                  <div class="w-40 me-2 text-end">
                    <input v-if="metode.kode != 'cash' && metode.kode != 'karyawan'" v-model="modelInputMoreMetodeBayar[index]" class="form-control form-control-sm" :id="'inputMoreMetodeBayar_' + index" @input="modelInputMoreMetodeBayar[index] = onChangeCheckNumberVal($event)" type="text" :placeholder="metode.kode == 'ewal' ? 'Nomor telepon' : '4 digit nomor' " />
                    <i v-if="metode.kode == 'cash'" class="fs--1">Pembayaran Cash</i>
                    <i v-if="metode.kode == 'karyawan'" class="fs--1">Karyawan</i>
                  </div>
                  <div class="w-25">
                    <input v-model="nominalMoreMetodeBayar[index]" @input="nominalMoreMetodeBayar[index] = formatCalculatePriceMoreMetode($event, index)" :id="'inputNominalMoreMetodeBayar_' + index" class="form-control form-control-sm text-end" type="text" placeholder="Nominal"/>
                  </div>
                </div> -->

                <!-- <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="form-label mb-0">Metode Pembayaran: </label>
                  <div>
                    <img class="img-icon-po1" :src="'/img/po-img/' + selectedMetodeBayar.image" />
                  </div>
                </div> -->
                
                <div v-if="checkMetodeCashSelect">
                  <hr class="m-0 mt-2 mb-2">
                  <div class="row">
                    <div class="col-md-6">
                      <input v-model="inputNominalMethodCash" @input="inputNominalMethodCash = checkInputNominalMethodCash()" id="inputNominalMethodCash" class="form-control form-control-sm" type="text" placeholder="Cash diberikan" />
                    </div>
                    <div class="col-md-6 d-flex align-items-end justify-content-end">
                      <label class="form-lable mb-0 me-1">Kembalian:</label>
                      <label class="form-lable mb-0 fs-0">Rp {{ $root.formatPrice(totalKembalianMetodeCash) }}</label>
                    </div>
                  </div>
                </div>
                
                <hr class="m-0 mt-2">
    
                <div v-if="selectSalesBy == master_code.salesBy.wa" class="mb-2 mt-2">
                  <label class="form-label mb-0" for="selectSalesBy">Sales By WA:</label>
                  <select v-model="selectedBscWa" v-on:change="invalidSelectSalesBsc = false" class="form-select mb-0" :class="{'border-red' : invalidSelectSalesBsc}" id="selectedBscWa">
                    <option value="">Pilih BSC WA</option>
                    <option value="1">David Simbolon</option>
                    <option value="2">Jonatan Hudson</option>
                    <option value="3">Surya Hasan</option>
                  </select>
                </div>
                
                <label class="form-label mb-0">Keterangan: </label>
                <div class="scrollable-customize" style="max-height: 7vh">
                  <p class="fs--1 mb-0 pb-0">
                    {{ keteranganTransaksi ? $root.trimString(keteranganTransaksi) == '' ? '-' : $root.trimString(keteranganTransaksi) : '-' }}
                  </p>
                </div>
              </div>
              <div class="text-end px-3 pt-0 pb-3">
                <button class="btn btn-secondary me-2 btn-sm" type="button" @click="openModalCancelConfirm()">Batal</button>
                <button class="btn btn-primary btn-sm" type="button" v-on:click="openModalCheckoutConfirm">Checkout <span class="fas fa-shopping-basket"></span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal konfirmasi menyelesaikan pesanan atau checkout -->
  <div class="modal fade" id="modalCheckoutConfirm" tabindex="0" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
      <div class="modal-content position-relative">
        <div class="modal-body p-0 pb-2">
          <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
            <h3 class="mb-1" id="modalExampleDemoLabel">Konfirmasi Pesanan</h3>
          </div>
          <div class="py-2 text-center">
            <div class="d-flex justify-content-center mb-2">
              <img src="@/assets/img/icons/Gif/warning-icon-2.gif" height="60" alt="">
            </div>
            <h5 class="m-0 px-1">
              Pastikan konsumen telah membayar!
            </h5>
            <p class="m-0 px-3">
              Produk yang telah dibeli tidak dapat dikembalikan kembali.
            </p>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Batal</button>
          <button class="btn btn-primary btn-sm" type="button" v-on:click="checkoutBtn">Konfirmasi</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal konfirmasi untuk menutup modal rincian pesanan -->
  <div class="modal fade" id="modalBatalConfirm" tabindex="0" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
      <div class="modal-content position-relative">
        <div class="modal-body p-0 pb-2">
          <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
            <h3 class="mb-1" id="modalExampleDemoLabel">Batalkan Konfirmasi</h3>
          </div>
          <div class="py-2 text-center">
            <div class="d-flex justify-content-center mb-2">
              <img src="@/assets/img/icons/Gif/info-icon.gif" height="60" alt="">
            </div>
            <h5 class="m-0 px-1">
              Yakin ingin menutup konfirmasi?
            </h5>
            <p class="m-0 px-3">
              Semua perubahan billing detail akan diatur ualng kembali ke awal!!!
            </p>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Tidak</button>
          <button class="btn btn-danger btn-sm" type="button" v-on:click="batalModalCheckoutConfirm()">Ya</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal transaksi berhasil dan selesai -->
  <div class="modal fade" id="modalTransactionFinishSuccess" tabindex="0" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
      <div class="modal-content position-relative">
        <div class="modal-body p-0 pb-2">
          <div class="py-2 text-center">
            <div class="justify-content-center mb-0">
              <img src="@/assets/img/icons/Gif/success-gif.gif" height="120" alt="">
            </div>
            <h3 class="mb-1">Transaksi selesai!</h3>
            <p class="m-0 px-4">
              Selamat! Transaksi telah berhasil disimpan.
            </p>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button class="btn btn-success btn-sm" type="button" data-bs-dismiss="modal">Selesai</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal konfirmasi untuk lanjut membuatkan tiket booking -->
  <div class="modal fade" id="modalConfirmCreateTicket" tabindex="0" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
      <div class="modal-content position-relative">
        <div class="modal-body p-0 pb-2">
          <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
            <h3 class="mb-1" id="modalExampleDemoLabel">Konfirmasi Buat Tiket</h3>
          </div>
          <div class="py-2 text-center">
            <div class="d-flex justify-content-center mb-2">
              <img src="@/assets/img/icons/Gif/info-icon.gif" height="60" alt="">
            </div>
            <h5 class="m-0 px-1">
              Yakin ingin lanjut membuat tiket?
            </h5>
            <p class="m-0 px-3">
              Pastikan bahwa konsumen mengingat nomor tiket.
            </p>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Batal</button>
          <button class="btn btn-primary btn-sm" type="button" @click="confirmasiBuatTiket">Buat</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal menunjukkan nomor tiket -->
  <div class="modal fade" id="showCreateNoTicket" tabindex="0" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
      <div class="modal-content position-relative">
        <div class="modal-body p-0 pb-2">
          <div class="py-2 text-center">
            <div class="d-flex justify-content-center mb-0">
              <img src="@/assets/img/icons/Gif/success-gif.gif" height="120" alt="">
            </div>
            <u class="m-0">No Tiket:</u>
            <h2 class="m-0 mb-2 px-1">
              "{{ numberTicketOrder }}"
            </h2>
            <p class="m-0 px-4">
              Tiket order berhasil dibuat! Pastikan bahwa konsumen mengingat nomor tiket.
            </p>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button class="btn btn-success btn-sm" type="button" data-bs-dismiss="modal">Selesai</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal menampilkan product yang dicari lebih dari 1 -->
  <div class="modal fade" id="modalSearchFoundProductMore" tabindex="-1" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content position-relative border-0">
        <div class="modal-body p-0">
          <div class="card">
            <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-5i.png); background-position: left; background-size: cover;"></div>
            <div class="card-body position-relative p-0">
              <div class="position-absolute top-0 end-0 mt-3 me-3 z-1">
                <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="card-header rounded-top-3 py-3 ps-3 pe-6">
                <h5 class="mb-0">Product lebih ditemukan</h5>
              </div>
              <div class="p-0">
                <div class="table-scrollable-wrapper" style="max-height: 34vh;">
                  <table class="table table-hover table-scrollable">
                    <thead>
                      <tr>
                        <td>#</td>
                        <td>Nama</td>
                        <td>Info</td>
                        <td>Harga</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(product, index) in allProductFindSearchBtn" :key="index" style="cursor: pointer" @click="addProductToList(product)">
                        <td>{{ index + 1 }}</td>
                        <td>
                          {{ product.master_promo_id ? product.for_product.itemName : product.itemName }}
                          <span v-if="product.master_promo_id" class="badge rounded-pill p-1 px-2 fs--3 ms-1" :class="'bg-' + product.master_promo.master_kode_promo.badge">
                            {{ product.master_promo.master_kode_promo.nama_promo }}
                          </span>
                        </td>
                        <td>
                          <div v-if="product.master_promo_id">
                            <span v-if="product.master_promo.tipe_promo == master_coll.tipePromo.bundle" class="badge bg-warning rounded-pill p-1 fs--3">
                              {{ product.master_promo.buy_item }} Get {{ product.master_promo.get_item }}
                            </span>
                            <span v-if="product.master_promo.tipe_promo == master_coll.tipePromo.percent" class="badge bg-danger rounded-pill p-1 fs--3">
                              -{{ product.master_promo.percent }}%
                            </span>
                          </div>
                          <div v-else>
                            <span v-if="$root.filterDiskonProduct(product).disc_code != master_code.diskon.tanpa_diskon_code" class="badge bg-danger rounded-pill p-1 fs--3">
                              -{{ $root.filterDiskonProduct(product).discount }}%
                            </span>
                            <span v-else>-</span>
                          </div>
                        </td>
                        <td>
                          Rp
                          <span v-if="product.master_promo_id">
                            <span v-if="product.master_promo.tipe_promo == master_coll.tipePromo.bundle">
                              {{ $root.formatPrice($root.filterPriceProduct(product.for_product).price) }}
                            </span>
                            <span v-if="product.master_promo.tipe_promo == master_coll.tipePromo.percent">
                              {{ $root.formatPrice($root.filterPriceProduct(product.for_product).price - ($root.filterPriceProduct(product.for_product).price * (product.master_promo.percent/100))) }}
                            </span>
                          </span>
                          <span v-else>
                            <span v-if="$root.filterDiskonProduct(product).disc_code == master_code.diskon.tanpa_diskon_code">
                              {{ $root.formatPrice($root.filterPriceProduct(product).price) }}
                            </span>
                            <span v-else>
                              {{ $root.formatPrice($root.filterPriceProduct(product).price - ($root.filterPriceProduct(product).price * ($root.filterDiskonProduct(product).discount/100))) }}
                            </span>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="card-footer position-relative text-end">
              <button class="btn btn-primary btn-sm" data-bs-dismiss="modal" @click="allProductFindSearchBtn = []">Selesai</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="offcanvas offcanvas-end" id="canvasShowDetailProduct" tabindex="-1" aria-labelledby="canvasShowDetailProductLabel">
    <!-- Header nama product dan btn close -->
    <div v-if="productShowDetail" class="offcanvas-header pb-0 align-items-start">
      <h5>
        {{ productShowDetail.master_promo_id ? productShowDetail.for_product.itemName : productShowDetail.itemName }}
        <span class="badge badge-subtle-secondary fs--1 fw-bold mb-3" style="font-weight: normal;">
          {{ productShowDetail.master_promo_id ? productShowDetail.for_product.itemCode : productShowDetail.itemCode }}
        </span>
      </h5>
      <button class="btn-close text-reset mt-1" type="button" data-bs-dismiss="offcanvas" aria-label="Close" @click="productShowDetail = null"></button>
    </div>
    
    <!-- Image gambar product -->
    <div v-if="productShowDetail" class="offcanvas-header pt-0 pb-1">
      <img v-if="productShowDetail.master_promo_id" class="img-fluid rounded" :src="'src/assets/img/product/' + productShowDetail.for_product.image" style="width: 100%; height: 200px;" alt="" />
      <img v-else class="img-fluid rounded" :src="'src/assets/img/product/' + productShowDetail.image" style="width: 100%; height: 200px;" alt="" />
    </div>

    <!-- Budge juka product mempunyai promo atau diskon -->
    <div v-if="productShowDetail" class="offcanvas-header justify-content-start pt-1 pb-1">
      <div v-if="productShowDetail.master_promo_id">
        <span v-if="productShowDetail.master_promo.tipe_promo == master_coll.tipePromo.bundle" class="badge bg-warning rounded-pill px-2 fs--2">
          Buy {{ productShowDetail.master_promo.buy_item }} Get {{ productShowDetail.master_promo.get_item }}
        </span>
        <span v-if="productShowDetail.master_promo.tipe_promo == master_coll.tipePromo.percent" class="badge bg-danger rounded-pill px-2 fs--2">
          -{{ productShowDetail.master_promo.percent }}%
        </span>
        
        <span class="badge rounded-pill px-2 fs--2 ms-1" :class="'bg-' + productShowDetail.master_promo.master_kode_promo.badge">
          {{ productShowDetail.master_promo.master_kode_promo.nama_promo }}
        </span>
      </div>
      <div v-else>
        <span v-if="$root.filterDiskonProduct(productShowDetail).disc_code != master_code.diskon.tanpa_diskon_code" class="badge bg-danger rounded-pill px-2 fs--2">
          -{{ productShowDetail.product_diskon.discount }}%
        </span>
      </div>
    </div>

    <!-- Detail info product dan stok -->
    <div v-if="productShowDetail" class="offcanvas-header align-items-start justify-content-between pt-0 pb-2">
      <div v-if="productShowDetail.master_promo_id">
        <div v-for="detail in productShowDetail.for_product.all_product_detail">
          <span class="fs--1 mb-0">{{ detail.optionalName }} Produk: </span>
          <p class="mb-1">
            <strong>
              {{ detail.optDtlName }} ({{ detail.optDtlCode }})
            </strong>
          </p>
        </div>
      </div>
      <div v-else>
        <div v-for="detail in productShowDetail.all_product_detail">
          <span class="fs--1 mb-0">{{ detail.optionalName }} Produk: </span>
          <p class="mb-1">
            <strong>
              {{ detail.optDtlName }} ({{ detail.optDtlCode }})
            </strong>
          </p>
        </div>
      </div>
      <div class="text-end">
        <span class="fs--1 mb-0">Stok Tersedia: </span>
        <p class="mb-1">
          <span class="badge badge-subtle-success fs-0">{{ productShowDetail.master_promo_id ? $root.filterStokProduct(productShowDetail.for_product).onHand : $root.filterStokProduct(productShowDetail).onHand }}</span>
        </p>
      </div>
    </div>

    <!-- Header text label deskripsi -->
    <div v-if="productShowDetail" class="offcanvas-header py-0">
      <span class="fs--1 mb-1">Deskripsi Produk: </span>
    </div>

    <!-- Deskripsi -->
    <div v-if="productShowDetail" class="offcanvas-body pt-0">
      <p class="mb-1">
        {{ productShowDetail.master_promo_id ? productShowDetail.for_product.deskripsi : productShowDetail.deskripsi }}
      </p>
    </div>

    <!-- Footer harga, quntity, dan btn tambah -->
    <div v-if="productShowDetail" class="d-flex justify-content-between align-items-center p-3">
      <div v-if="productShowDetail.master_promo_id">
        <h5 v-if="productShowDetail.master_promo.tipe_promo == master_coll.tipePromo.bundle" class="text-warning mb-0">
          Rp {{ $root.formatPrice($root.filterPriceProduct(productShowDetail.for_product).price) }}
        </h5>
        <span v-if="productShowDetail.master_promo.tipe_promo == master_coll.tipePromo.percent" class="fs--1">
          <del>Rp {{ $root.formatPrice($root.filterPriceProduct(productShowDetail.for_product).price) }}</del>
        </span>
        <h5 v-if="productShowDetail.master_promo.tipe_promo == master_coll.tipePromo.percent" class="text-warning mb-0">
          Rp {{ $root.formatPrice($root.filterPriceProduct(productShowDetail.for_product).price - ($root.filterPriceProduct(productShowDetail.for_product).price * (productShowDetail.master_promo.percent/100))) }}
        </h5>
      </div>
      <div v-else>
        <div v-if="$root.filterDiskonProduct(productShowDetail).disc_code != master_code.diskon.tanpa_diskon_code">
          <span class="fs--1">
            <del>Rp {{ $root.formatPrice(productShowDetail.product_price.price) }}</del>
          </span>
          <h5 class="text-warning mb-0">
            Rp {{ $root.formatPrice(productShowDetail.product_price.price - (productShowDetail.product_price.price * (productShowDetail.product_diskon.discount/100))) }}
          </h5>
        </div>
        <div v-else>
          <h5 class="text-warning mb-0">
            Rp {{ $root.formatPrice($root.filterPriceProduct(productShowDetail).price) }}
          </h5>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <input class="form-control p-0 ps-2 me-2" type="number" min="1" :value="qtyProductShowDetail" style="width: 60px;" @input="incDecQtyInputCanvas($event)" @change="incDecQtyChangeCanvas($event)">
        <button v-on:click="addProductToList(productShowDetail, qtyProductShowDetail)" class="btn btn-primary px-2" type="button" data-bs-dismiss="offcanvas" aria-label="Close">
          Tambah <span class="fas fa-cart-plus" data-fa-transform="shrink-3"></span>
        </button>
      </div>
    </div>
  </div>

  <iframe id="pdf_struk_transaksi_id" ref="pdf_struk_transaksi" src="" frameborder="0" hidden></iframe>
</template>

<script>
  import axios from "axios";
  import { markRaw } from 'vue';

  import LoadingBlack from '@/components/layouts/LoadingBlack.vue';

  import jsPDF from 'jspdf';
  import autoTable from 'jspdf-autotable';
  import imageMts from '@/assets/img/mtsiconland.png';

  export default {
    name: 'SalesPage',
    data() {
      return {
        master_code: this.$root.master_code,
        master_coll: this.$root.master_coll,
        local_storage: this.$root.local_storage,

        loadingBlack: markRaw(LoadingBlack),
        currentTime: new Date(),

        memberFindOrRegis: true,
        dataAllProducts: [],
        dataAllProductsPromo: [],
        dataProductInList: [],
        dataAllMembers: [],
        dataAllGelars: [],
        dataAllKodeResellers: [],
        dataAllMasterSalesBy: [],

        dataAllTicket: [],
        dataFilterAllTicket: [],

        dataAllMetodeBayar: [],
        metodeBayarCash: {},
        metodeBayarKaryawan: {},
        dataMetodeBayarTF: [],
        dataMetodeBayarEWal: [],
        dataMetodeBayarCC: [],
        dataMoreMetodeBayar: [],
        selectedMetodeBayar: {},
        modelInputSelectedMetodeBayar: '',
        modelInputMoreMetodeBayar:[],
        validasiMetodePembayaran: [],
        checkMetodeCashSelect: false,

        memberOverview: null,

        subTotalPrice: 0,
        diskonPrice: 0,
        totalBayarPrice: 0,
        calculateTotalBayarPrice: 0,
        tempValueInputMoreMetode: 0,
        totalPcsItemOrder: 0,
        totalPriceRingkasanProduct: 0,
        totalHematDiskon: 0,
        totalDiskonPercentReseller: 0,
        nominalMoreMetodeBayar: [],
        checkboxMemberPotonganPoint: false,
        inputNominalMethodCash: null,
        totalKembalianMetodeCash: 0,

        // For register new member
        dataInputMember: {
          id: '',
          nama: '',
          no_hp: '',
          email: '',
          jenis_kelamin: '',
          tanggal_lahir: '',
        },

        inputSearchProduct: '',
        select_kode_reseller: '',
        
        selectMethodPayment: '',
        keteranganTransaksi: '',

        selectedFilterBrand: null,
        inputSearchMember: '',
        selectSalesBy: this.$root.master_code.salesBy.wi,
        selectedBscWa: '',

        invalidMemberSelect: false,
        invalidMetodePembayaran: false,
        invalidSelectSalesBsc: false,

        productShowDetail: null,
        qtyProductShowDetail: 1,

        getCheckGelarPembelian: null,

        isCheckBoxPromo: false,
        isCheckBoxFlushOut: false,
        isCheckBoxKaryawan: false,

        checkboxProducts: {
          bestSellerAll: false,
          bestSellerToko: false,
          topThisMonth: false,
          promo: false,
          flushOut: false,
          promoKaryawan: false
        },

        numberTicketOrder: '',
        isBuatkanTiketBtn: true,
        showLoadingTicket: true,
        
        dataMasterOptionInfoCode: [],
        dataMasterOptionInfo: [],
        allProductFindSearchBtn: [],
      };
    },

    async beforeMount(){
      await this.loadAlldatas();
    },

    mounted() {
      this.currentTime = new Date();
      // setInterval(() => {
      //   this.currentTime = new Date();
      // }, 1000);
    },

    computed: {
      filteredProducts() {
        // console.log(this.dataAllProducts);
        const queryInput = this.inputSearchProduct.toLowerCase().trim();
        const valueSeletedBrand = this.selectedFilterBrand ? this.selectedFilterBrand.optDtlCode.toLowerCase().trim() : null;
        const hasTruecheckboxProducts = Object.values(this.checkboxProducts).some(value => value);

        return this.dataAllProducts.filter(product => {
          const checkProduct = product.master_promo_id ? product.for_product : product;
          const brandProduct = checkProduct.all_product_detail.find((detail) => detail.optionalCode == this.master_code.productOptInfo.brand_code);

          let filterExpression = checkProduct.itemName.toLowerCase().includes(queryInput) || 
          checkProduct.itemCode.toLowerCase().includes(queryInput) ||
          checkProduct.barCode.toLowerCase().includes(queryInput);
          if(valueSeletedBrand){
            filterExpression = filterExpression && brandProduct.optDtlCode.toLowerCase().includes(valueSeletedBrand);
          }

          if(hasTruecheckboxProducts){ // Filter jika ada checkbox promo yang true
            if(product.master_promo_id){
              if(this.checkboxProducts.bestSellerAll){ // Filter Checkbox Best Seller All
                if(product.master_promo.master_kode_promo.slug == this.master_code.kodePromo.best_seller_toko){
                  return filterExpression;
                }
              }
              if(this.checkboxProducts.bestSellerToko){ // Filter Checkbox Best Seller Toko
                if(product.master_promo.master_kode_promo.slug == this.master_code.kodePromo.best_seller_all){
                  return filterExpression;
                }
              }
              if(this.checkboxProducts.topThisMonth){ // Filter Checkbox Top This Month
                if(product.master_promo.master_kode_promo.slug == this.master_code.kodePromo.top_this_month){
                  return filterExpression;
                }
              }
              if(this.checkboxProducts.promo){
                if(product.master_promo.master_kode_promo.slug == this.master_code.kodePromo.promo){ // Filter Checkbox Promo
                  return filterExpression;
                }
              }
              if(this.checkboxProducts.flushOut){
                if(product.master_promo.master_kode_promo.slug == this.master_code.kodePromo.flush_out){ // Filter Checkbox Flushout
                  return filterExpression;
                }
              }
              if(this.checkboxProducts.promoKaryawan){
                if(product.master_promo.master_kode_promo.slug == this.master_code.kodePromo.promo_karyawan){ // Filter Checkbox Promo Karyawan
                  return filterExpression;
                }
              }
            }
          }else{
            if(product.master_promo_id){
              if (
                (this.memberOverview != null && this.memberOverview.tipe_konsumen.slug == this.master_code.tipeKonsumen.karyawan) ||
                product.master_promo.master_kode_promo.slug != this.master_code.kodePromo.promo_karyawan
              ) {
                return filterExpression;
              }
            }else{
              return filterExpression;
            }
          }
        });

        // return this.dataAllProducts;
      },
      
      filteredOptionsInfoProduct() {
        return (optionalCode) => {
          return this.dataMasterOptionInfo.filter(option => option.optionalCode === optionalCode);
        }
      },
      
      filteredMembers() {
        const query = this.inputSearchMember.toLowerCase();
        return this.dataAllMembers.filter(member => {
          return (
            member.no_hp.toLowerCase().includes(query) ||
            member.email.toLowerCase().includes(query)
          );
        });
      },

      formattedTimeNow() {
        const hours = this.currentTime.getHours().toString().padStart(2, '0');
        const minutes = this.currentTime.getMinutes().toString().padStart(2, '0');
        const seconds = this.currentTime.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      },

      formattedDateNow() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return this.currentTime.toLocaleDateString('id-ID', options);
      },
    },

    methods: {
      loadAlldatas: async function(){
        this.$root.showLoading();

        try {
          const getAllDataSales = await axios({
            method: 'get',
            url: this.$root.API_URL + '/sales',
            // withCredentials: false,
          });
          const allData = getAllDataSales.data;
          this.dataAllMembers = allData.getAllMember; //All Member
          this.dataAllGelars = allData.getAllGelar; //All Gelar
          this.dataAllKodeResellers = allData.getAllKodeReseller; //All Kode Reseller
          this.dataAllMetodeBayar = allData.getAllMetodeBayar; //All Metode Bayar
          this.dataAllMasterSalesBy = allData.getAllMasterSalesBy; //All Master Sales By
          this.metodeBayarCash = this.dataAllMetodeBayar.find((m) => m.kode == this.master_code.metodeBayar.cash); // Metode Bayar Cash
          this.metodeBayarKaryawan = this.dataAllMetodeBayar.find((m) => m.kode == this.master_code.metodeBayar.karyawan); // Metode Bayar Karyawan
          allData.getAllMetodeBayar.forEach(metode => {
            if(metode.kode === this.master_code.metodeBayar.tf){
              this.dataMetodeBayarTF.push(metode);
            }
            if(metode.kode === this.master_code.metodeBayar.ewal){
              this.dataMetodeBayarEWal.push(metode);
            }
            if(metode.kode === this.master_code.metodeBayar.cc){
              this.dataMetodeBayarCC.push(metode);
            }
          });
          
          this.dataMasterOptionInfoCode = allData.getAllMasterOptionInfoCode; //All Option Info Code
          this.dataMasterOptionInfo = allData.getAllMasterOptionInfo; //All Option Info

          // console.log(this.dataAllGelars);

          const getAllProduct = await axios({
            method: 'get',
            url: this.$root.API_URL + '/sales/getAllProduct',
          });
          var getDataProduct = getAllProduct.data;

          // Logic load master promo product
          const today = new Date();
          for(let i in getDataProduct.getAllMasterPromo){
            const startDate = new Date(getDataProduct.getAllMasterPromo[i].start_date);
            const endDate = new Date(getDataProduct.getAllMasterPromo[i].end_date);
            if(today >= startDate && today <= endDate){
              for(let j in getDataProduct.getAllMasterPromo[i].all_promo_product){
                this.dataAllProducts.push(getDataProduct.getAllMasterPromo[i].all_promo_product[j]);
              }
            }
          }

          // Logic load regular product
          getDataProduct.getAllProduct.forEach(product => {
            this.dataAllProducts.push(product);
          });

          for (let i in getDataProduct.getAllMasterPromo) {
            const startDate = new Date(getDataProduct.getAllMasterPromo[i].start_date);
            const endDate = new Date(getDataProduct.getAllMasterPromo[i].end_date);
            if(today >= startDate && today <= endDate){
              if(getDataProduct.getAllMasterPromo[i].kode_promo == this.master_code.kodePromo.promo){ // Promo
                this.isCheckBoxPromo = true;
              };
              if(getDataProduct.getAllMasterPromo[i].kode_promo == this.master_code.kodePromo.flush_out){ // Flushout
                this.isCheckBoxFlushOut = true;
              };
              if(getDataProduct.getAllMasterPromo[i].kode_promo == this.master_code.kodePromo.promo_karyawan){ // Karyawan
                this.isCheckBoxKaryawan = true;
              };
            }
          }
        } catch (error) {
          console.log(error);
        }

        this.$root.hideLoading();
        // console.log(this.dataAllProducts);
      },
      
      onChangeCheckVal: function(event){
        var inputId = event.target;
        var valueInput = inputId.value;
        
        if (valueInput || valueInput.length > 0){
          inputId.classList.remove('border-red');
        }else{
          inputId.classList.add('border-red');
        }
      },

      onChangeCheckNumberVal: function(event){
        var inputId = event.target;
        var valueInput = inputId.value;

        const numberInput = valueInput.replace(/[^0-9]/g, '');
        
        if (numberInput === null || numberInput.trim() === "") {
          inputId.classList.add('border-red');
          return;
        }
        
        if (valueInput || valueInput.length > 0){
          inputId.classList.remove('border-red');
        }else{
          inputId.classList.add('border-red');
        }

        return numberInput;
      },

      calculateAmoutPrice: function(){
        this.subTotalPrice = 0;
        this.totalBayarPrice = 0;
        this.totalPriceRingkasanProduct = 0;
        this.totalHematDiskon = 0;

        this.dataProductInList.forEach((product) => {
          var getProduct = product.product;
          
          let formatHarga = 0;
          if(product.is_promo_product){
            const isPromoProduct = product.is_promo_product;
            if(isPromoProduct.master_promo.tipe_promo == this.master_coll.tipePromo.bundle){
              formatHarga = parseInt(this.$root.filterPriceProduct(isPromoProduct.for_product).price);
            }
            if(isPromoProduct.master_promo.tipe_promo == this.master_coll.tipePromo.percent) {
              formatHarga = parseInt(this.$root.filterPriceProduct(isPromoProduct.for_product).price - (this.$root.filterPriceProduct(isPromoProduct.for_product).price * (isPromoProduct.master_promo.percent/100)));
            }
          }else{
            if(this.$root.filterDiskonProduct(getProduct).disc_code == this.master_code.diskon.tanpa_diskon_code){
              formatHarga = parseInt(this.$root.filterPriceProduct(getProduct).price);
            }else{
              formatHarga = parseInt(this.$root.filterPriceProduct(getProduct).price  - (this.$root.filterPriceProduct(getProduct).price * (this.$root.filterDiskonProduct(getProduct).discount/100)));
            }
          }
          var calculatePrice = formatHarga * product.qty;
          this.subTotalPrice += calculatePrice;

          this.totalPriceRingkasanProduct += parseInt(this.$root.filterPriceProduct(getProduct).price * product.qty)
        });
        
        var tatalUntukBayar = this.subTotalPrice;
        this.totalBayarPrice = tatalUntukBayar;
        this.calculateTotalBayarPrice = tatalUntukBayar;

        this.totalHematDiskon = this.totalPriceRingkasanProduct - this.totalBayarPrice;
      },

      calculatePcsItemOrderList: function(){
        this.totalPcsItemOrder = 0;
        let qtyPcs = 0;

        this.dataProductInList.forEach(item => {
          qtyPcs += item.qty;
        });

        if(!isNaN(qtyPcs) || qtyPcs > 0){
          this.totalPcsItemOrder = qtyPcs;
        }
      },
      
      // Logic Product In Order List
      addProductToList: function(product, qty = 1){
        if(qty > 0){
          let existingProduct = null;

          if(product.master_promo_id){ // Jika product promo
            try{
              existingProduct = this.dataProductInList.find( (p) => {
                if(p.is_promo_product){ // Jika sudah ada di list product yang diorder
                  return p.is_promo_product.master_promo_id === product.master_promo_id &&
                  p.is_promo_product.for_product.itemCode === product.for_product.itemCode
                }
              });
            }catch(error){
              existingProduct = null;
              console.log(error);
            }
          }else{ // Jika product reguler
            existingProduct = this.dataProductInList.find((p) => !p.is_promo_product && p.product.itemCode === product.itemCode);
          }

          if (existingProduct) {
            existingProduct.qty = existingProduct.qty + qty;
          }else{
            const productObj = {
              product: product.master_promo_id ? product.for_product : product,
              qty: qty,
              is_promo_product: product.master_promo_id ? product : null,
            };
            this.dataProductInList.push(productObj);
          }
          
          this.qtyProductShowDetail = 1;
          this.calculatePcsItemOrderList();
          this.calculateAmoutPrice();
        }
      },

      deleteProductById: function (product){
        let indexToDelete = null;

        if(product.is_promo_product){ // Jika product promo
          try{
            indexToDelete = this.dataProductInList.findIndex((p) => {
              if(p.is_promo_product){
                return p.is_promo_product.master_promo_id === product.is_promo_product.master_promo_id &&
                p.is_promo_product.for_product.itemCode === product.product.itemCode
              }
            });
          }catch(error){
            indexToDelete = null;
            console.log(error);
          }
        }else{ // Jika product reguler
          indexToDelete = this.dataProductInList.findIndex((p) => !p.is_promo_product && p.product.itemCode === product.product.itemCode);
        }
        
        if (indexToDelete != null) {
          this.dataProductInList.splice(indexToDelete, 1);
        } else {
          console.log('Product not found');
        }
        
        this.calculatePcsItemOrderList();
        this.calculateAmoutPrice();
      },
      
      emptyProductList: function(){
        this.dataProductInList = [];
        this.isBuatkanTiketBtn = true;
        this.calculatePcsItemOrderList();
        this.calculateAmoutPrice();
      },

      incDecQtyInput: function(event, product){
        const newValue = parseInt(event.target.value);
        let existingProduct = null;
        
        if(product.is_promo_product){ // Jika product promo
          try{
            existingProduct = this.dataProductInList.find((p) => {
              if(p.is_promo_product){
                return p.is_promo_product.master_promo_id === product.is_promo_product.master_promo_id &&
                p.is_promo_product.for_product.itemCode === product.product.itemCode
              }
            });
          }catch(error){
            existingProduct = null;
            console.log(error);
          }
        }else{ // Jika product reguler
          existingProduct = this.dataProductInList.find((p) => !p.is_promo_product && p.product.itemCode === product.product.itemCode);
        }

        if(existingProduct){
          existingProduct.qty = newValue;
          this.calculatePcsItemOrderList();
          if (!isNaN(newValue) || newValue > 0) {
            this.calculateAmoutPrice();
          }
        }
      },
      
      incDecQtyChange: function(event, product){
        const newValue = parseInt(event.target.value);
        let existingProduct = null;

        if(product.is_promo_product){ // Jika product promo
          try{
            existingProduct = this.dataProductInList.find((p) => {
              if(p.is_promo_product){
                return p.is_promo_product.master_promo_id === product.is_promo_product.master_promo_id &&
                p.is_promo_product.for_product.itemCode === product.product.itemCode
              }
            });
          }catch(error){
            existingProduct = null;
            console.log(error);
          }
        }else{ // Jika product reguler
          existingProduct = this.dataProductInList.find((p) => !p.is_promo_product && p.product.itemCode === product.product.itemCode);
        }

        if(existingProduct){
          if (!isNaN(newValue) || newValue > 0) {
            existingProduct.qty = newValue;
          }else{
            existingProduct.qty = 1;
          }
        }
        
        this.calculatePcsItemOrderList();
        this.calculateAmoutPrice();
      },
      
      incDecQtyInputCanvas: function(event){
        const newValue = parseInt(event.target.value);
        this.qtyProductShowDetail = newValue;
        this.calculatePcsItemOrderList();
      },
      
      incDecQtyChangeCanvas: function(event){
        const newValue = parseInt(event.target.value);
        if (isNaN(newValue) || newValue < 1) {
          this.qtyProductShowDetail = 1;
        }
        this.calculatePcsItemOrderList();
      },
      
      disableBackspace: function(event, product) {
        if (product.qty <= 1 && event.key === 'Backspace') {
          event.preventDefault();
        }
      },
      // End Logic

      // Logic Handle Member
      storeNewMember: async function(){
        try{
          $('#modalFindMember').modal('hide');
          this.$root.showLoading();
          this.dataInputMember.user_login = this.$root.dataAuthToken;
          const store = await axios({
            method: 'post',
            url: this.$root.API_URL + '/sales/storeNewMember',
            data: this.dataInputMember,
          });

          if(store.status == 201 || store.status == 200){
            var getResponsStore = store.data;
            var getDataUser = getResponsStore.data;
            this.memberOverview = getDataUser;
            this.dataAllMembers.push(getDataUser);
    
            for (let prop in this.dataInputMember) {
              this.dataInputMember[prop] = '';
            }
            
            this.invalidMemberSelect = false;
            this.$root.showAlertFunction('success', 'Pendaftaran Berhasil!', 'Selamat, Member baru telah berhasil ditambahkan.');
          }else{
            this.$root.showAlertFunction('warning', 'Pendaftaran Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
          }
          
          this.$root.hideLoading();
        } catch (error) {
          this.$root.showAlertFunction('warning', 'Pendaftaran Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
          this.$root.hideLoading();
          console.log(error);
        }
      },

      updateEditDataMember: async function (){
        try{
          $('#modalEditMember').modal('hide');
          this.$root.showLoading();
          const store = await axios({
            method: 'put',
            url: this.$root.API_URL + '/sales/updateDataMember',
            data: this.dataInputMember,
          });
          
          if(store.status == 201 || store.status == 200){
            var getDataStore = store.data.data;
            var findIndexMember = this.dataAllMembers.findIndex((member) => member.id == getDataStore.id);
            this.dataAllMembers[findIndexMember] = getDataStore;

            this.$root.showAlertFunction('success', 'Update Berhasil!', 'Selamat, Data member telah berhasil diperbaharui.');
          }else{
            this.$root.showAlertFunction('warning', 'Mengubah Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
          }
          
          this.$root.hideLoading();
        } catch (error) {
          this.$root.showAlertFunction('warning', 'Update Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
          this.$root.hideLoading();
          console.log(error);
        }
      },
      
      selectMemberOverview: function(member){
        // if(this.memberOverview != null && this.memberOverview.member_id != member.member_id){
        //   this.dataProductInList = [];
        // }
        this.memberOverview = member;
        this.invalidMemberSelect = false;
        $('#modalFindMember').modal('hide');
      },

      openModalFindOrRegis: function(){
        this.memberFindOrRegis = true;
        for (let prop in this.dataInputMember) {
          this.dataInputMember[prop] = '';
        }
        $('#modalEditMember').modal('hide');
        $('#modalFindMember').modal('show');
      },
      
      selectEditMemberForm: function(member){
        for (let prop in this.dataInputMember) {
          this.dataInputMember[prop] = member[prop];
        }

        $('#modalFindMember').modal('hide');
        $('#modalEditMember').modal('show');
      },
      // End Logic

      // Logic Metode Bayar
      onChangeSelectedMetodeBayar: function(){
        this.validasiMetodePembayaran = [];
        this.selectedMetodeBayar = {};
        this.invalidMetodePembayaran = false;
        this.inputNominalMethodCash = null;
      },

      addMoreMetodeBayar: function(metode){
        // Metode pembayaran yang sama tidak boleh bertambah
        const existingMetode = this.dataMoreMetodeBayar.find((m) => m.id === metode.id);
        if(existingMetode || metode.id === this.selectedMetodeBayar.id){
          return false;
        }

        // Validasi jika ada metode pembayaran cash
        if(metode.kode == 'cash'){
          this.checkMetodeCashSelect = true;
        }

        this.dataMoreMetodeBayar.push(metode);
      },
      // End Logic

      batalModalCheckoutConfirm: function(){
        this.dataMoreMetodeBayar = [];
        this.validasiMetodePembayaran = [];
        this.nominalMoreMetodeBayar = [];
        this.getCheckGelarPembelian = null;
        
        this.inputNominalMethodCash = null;
        this.totalKembalianMetodeCash = 0;
        this.checkboxMemberPotonganPoint = false;

        $('#modalBatalConfirm').modal('hide');
        $('#modalConfirmPay').modal('hide');
      },

      changeCheckboxMemberPotonganPoint(){
        const priceToPay = this.calculateTotalBayarPrice;
        const pointMember = this.memberOverview ? parseInt(this.memberOverview.point) : 0;
        if (this.checkboxMemberPotonganPoint) {
          this.calculateTotalBayarPrice = priceToPay - pointMember;
        } else {
          this.calculateTotalBayarPrice = priceToPay + pointMember;
        }
        
        this.checkInputNominalMethodCash();
      },

      checkInputNominalMethodCash: function(){
        const inputElement = document.getElementById('inputNominalMethodCash');
        const price = inputElement.value;
        const numericPrice = price.replace(/[^0-9]/g, '');
        
        if (numericPrice === null || numericPrice.trim() === "") {
          this.totalKembalianMetodeCash = 0;
          return;
        }
        
        const number = parseFloat(numericPrice);
        if(number > this.calculateTotalBayarPrice){
          this.totalKembalianMetodeCash = number - this.calculateTotalBayarPrice;
          inputElement.classList.remove('border-red');
        }else{
          this.totalKembalianMetodeCash = 0;
          inputElement.classList.add('border-red');
        }

        const hasFormat = this.$root.formatPrice(number);
        return hasFormat;
      },

      checkValidasiGelarMember: function(){
        let gelarTerpilih = this.dataAllGelars.find((gelar) => {
          const minimalNilai = parseFloat(gelar.minimal_nilai);
          const maksimalNilai = parseFloat(gelar.maksimal_nilai);

          if (gelar.minimal_nilai !== null && gelar.maksimal_nilai !== null) {
            return this.totalBayarPrice >= minimalNilai && this.totalBayarPrice <= maksimalNilai;
          } else if (gelar.minimal_nilai !== null) {
            return this.totalBayarPrice >= minimalNilai;
          } else if (gelar.maksimal_nilai !== null) {
            return this.totalBayarPrice <= maksimalNilai;
          }

          return false;
        });

        // if (!gelarTerpilih) {
        //   gelarTerpilih = this.dataAllGelars.find((gelar) => gelar.slug === this.master_code.gelarBeli.reguler);
        // }

        return gelarTerpilih;
      },

      validationBeforeContinueBtnBilling: function(){
        if(this.dataProductInList.length < 1){
          this.$root.showAlertFunction('warning', 'Order List', 'Tidak ada product yang ditambahkan dalam Order List!');
          return false;
        }

        if(this.memberOverview == null){
          this.$root.showAlertFunction('warning', 'Validasi Transaksi', 'Silahkan pilih dan tentukan member!');
          this.invalidMemberSelect = true;
          return false;
        }

        if(this.selectMethodPayment == ''){
          this.$root.showAlertFunction('warning', 'Validasi Transaksi', 'Silahkan pilih metode pembayaran!');
          this.invalidMetodePembayaran = true;
          return false;
        }
      },

      btnSearchSubmitProduct: function(){
        this.allProductFindSearchBtn = [];
        const query = this.inputSearchProduct.trim();
        if(query != ''){
          const checkAllProduct = this.dataAllProducts.filter(product => {
            const checkProduct = product.master_promo_id ? product.for_product : product;
            const filterValidate = checkProduct.barCode.includes(query);
            return filterValidate;
          });

          this.allProductFindSearchBtn = checkAllProduct;
          if(checkAllProduct.length > 1){
            $('#modalSearchFoundProductMore').modal('show');
          }else{
            this.addProductToList(checkAllProduct[0]);
          }
          this.inputSearchProduct = '';
        }
      },
      
      // Control all modal confirm transaksi
      openModalCancelConfirm: function(){
        $('#modalBatalConfirm').modal('show');
      },

      confirmationPayment: function(){
        if(this.validationBeforeContinueBtnBilling() == false){
          return false;
        }
        this.currentTime = new Date();
        
        const findMetodeBayar = this.dataAllMetodeBayar.find((metode) => metode.id === this.selectMethodPayment);

        // Penentuan tambahan metode pembayaran pada struk checkout apa saja berdasarkan logic
        this.validasiMetodePembayaran = this.dataAllMetodeBayar.filter((metode) => {
          if(this.selectSalesBy == this.master_code.salesBy.selly){
            return metode.kode == this.master_code.metodeBayar.tf;
          }else{
            if(findMetodeBayar.kode != this.master_code.metodeBayar.cc && findMetodeBayar.kode != this.master_code.metodeBayar.karyawan){
              if(this.selectSalesBy != this.master_code.salesBy.wi){
                return metode.kode != this.master_code.metodeBayar.cash && metode.kode != this.master_code.metodeBayar.cc && metode.kode != this.master_code.metodeBayar.karyawan;
              }else{
                return metode.kode != this.master_code.metodeBayar.cc && metode.kode != this.master_code.metodeBayar.karyawan;
              }
            }
          }
        });

        // Tentukan metode pembayaran pertama
        if(findMetodeBayar){
          this.selectedMetodeBayar = findMetodeBayar;
        }

        // Validasi jika ada metode pembayaran cash
        if(findMetodeBayar.kode == this.master_code.metodeBayar.cash){
          this.checkMetodeCashSelect = true;
        }else{
          this.checkMetodeCashSelect = false;
        }
        
        // Check total belaja untuk reseller
        var checkGelarPembelian = this.checkValidasiGelarMember();
        if(checkGelarPembelian){
          this.getCheckGelarPembelian = checkGelarPembelian;

          if(checkGelarPembelian.slug === this.master_code.gelarBeli.silver){
            const totalDiskon = this.totalBayarPrice * (checkGelarPembelian.amount/100)
            this.totalDiskonPercentReseller = totalDiskon;

            this.calculateTotalBayarPrice = this.totalBayarPrice - totalDiskon;
          }
        }

        $('#modalConfirmPay').modal('show');

        // this.generatePdfCheckout();
      },
      
      openModalCheckoutConfirm: function(){
        this.invalidSelectSalesBsc = false;

        if(this.selectedMetodeBayar.kode != this.master_code.metodeBayar.cash && this.selectedMetodeBayar.kode != this.master_code.metodeBayar.karyawan){
          var inputSelectedMetodeBayar = $("#inputSelectedMetodeBayar");
          var inputSelectedMetodeBayarVal = inputSelectedMetodeBayar.val().trim();

          if (inputSelectedMetodeBayarVal === "" ){
            inputSelectedMetodeBayar.addClass('border-red');
            return false;
          }
        }

        if(this.selectSalesBy == this.master_code.salesBy.wa && this.selectedBscWa == ''){
          this.invalidSelectSalesBsc = true;
          return false;
        }
        $('#modalCheckoutConfirm').modal('show');
      },

      checkoutBtn: async function(){
        try{
          this.$root.showLoading();
          
          const user_login = this.$root.dataAuthToken;
          const activeStore = this.$root.selectedStoreAccess;

          const dataTr = {
              user_login: user_login,
              
              storeCode: this.$root.selectedStoreAccess.store_code,
              memberId: this.memberOverview.member_id,
              salesBy: this.selectSalesBy,

              totalQty: this.totalPcsItemOrder > 0 ? parseInt(this.totalPcsItemOrder) : null,

              subTotalAmount: this.totalPriceRingkasanProduct > 0 ? parseInt(this.totalPriceRingkasanProduct) : null,
              totalDicountAmount: this.totalHematDiskon > 0 ? parseInt(this.totalHematDiskon) : null,
              afterTotalDicountAmount: this.totalBayarPrice > 0 ? parseInt(this.totalBayarPrice) : null,
              
              gelarPembalian: this.getCheckGelarPembelian,
              // resellerType: this.getCheckGelarPembelian ? this.getCheckGelarPembelian.slug : null,
              // resellerDiskonAmount: this.getCheckGelarPembelian ? this.getCheckGelarPembelian.amount : null,

              extraDiscountAmount: this.totalDiskonPercentReseller > 0 ? parseInt(this.totalDiskonPercentReseller) : null,

              paymentAmount: this.calculateTotalBayarPrice > 0 ? parseInt(this.calculateTotalBayarPrice) : null,

              description: this.keteranganTransaksi.trim() != '' ? this.keteranganTransaksi : null,
              uniquePayment: this.modelInputSelectedMetodeBayar.trim() != '' ? this.modelInputSelectedMetodeBayar : null,

              products: this.dataProductInList,
              activeStore: activeStore,
          }
          
          const storeTr = await axios({
            method: 'post',
            url: this.$root.API_URL + '/sales/storeNewTransaction',
            data: dataTr,
          });

          if(storeTr.status == 201 || storeTr.status == 200){
            const dataStoreTr = storeTr.data.data;

            this.generatePdfCheckout();
            this.dataProductInList = [];
            this.memberOverview = null;
    
            this.dataMoreMetodeBayar = [];
            this.nominalMoreMetodeBayar = [];
            this.selectedMetodeBayar = {};
            this.selectMethodPayment = '';
            this.modelInputSelectedMetodeBayar = '';
            this.modelInputMoreMetodeBayar = [];
    
            this.selectedFilterBrand = null;
            this.selectedBscWa = '';
            this.inputSearchMember = '';
            this.keteranganTransaksi = '';
            this.checkboxMemberPotonganPoint = false;
            
            this.isBuatkanTiketBtn = true;
            this.calculateAmoutPrice();
            $('#modalCheckoutConfirm').modal('hide');
            $('#modalConfirmPay').modal('hide');
            $('#modalTransactionFinishSuccess').modal('show');
          }else{
            this.$root.showAlertFunction('warning', 'Traksaksi Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
          }
        } catch (error) {
          this.$root.showAlertFunction('warning', 'Traksaksi Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
          console.log(error);
        }
        this.$root.hideLoading();
      },

      storeNewTransaction: async function(){
      },

      generatePdfCheckout: function(){
        const docStruk = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: [72, 297],
        });
        const sizeFont = 6;
        const callPadding = [0, 0, 0, 0];
        const callPaddingProduct = [0.5, 0, 0.5, 0];
        const marginPaper = [0, 1, 0, 1];
        const startLine = 1;
        const endLine = 71;
        const plusHeightLine = 3;

        // Logo martha tilaar shop
        const logoImg = new Image();
        logoImg.src = imageMts;
        const pageWidth = docStruk.internal.pageSize.getWidth();
        const imageWidth = 30;
        const imageHeight = 6;
        const x = (pageWidth - imageWidth) / 2;
        docStruk.addImage(logoImg, 'PNG', x, 0, imageWidth, imageHeight);

        // Alamat dibagian atas
        autoTable(docStruk, {
          body: [
            [
              {
                content: 'Jl. Pulo Kambing II No.1, RW.11, Jatinegara, Kec. Cakung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13930',
                styles: {
                  halign: 'center',
                  fontSize: sizeFont,
                  cellPadding: callPadding,
                }
              }
            ],

            [
              {
                content: '021 59407217',
                styles: {
                  halign: 'center',
                  fontSize: sizeFont,
                  cellPadding: callPadding,
                }
              }
            ],
          ],
          margin: marginPaper,
          startY: imageHeight + 3,
          theme: 'plain',
        });

        // Nama bsc dan tanggal transaksi
        autoTable(docStruk, {
          body: [
            [
              {
                content: 'Kasir:',
                styles: {
                  halign: 'left',
                  fontSize: sizeFont,
                  cellPadding: callPadding,
                }
              },
              {
                content: 'Tanggal:',
                styles: {
                  halign: 'right',
                  fontSize: sizeFont,
                  cellPadding: callPadding,
                }
              }
            ],
            [
              {
                content: this.$root.dataAuthToken.nama_lengkap,
                styles: {
                  halign: 'left',
                  fontSize: sizeFont,
                  cellPadding: callPadding,
                }
              },
              {
                content: this.getDateTimeForStruk(),
                styles: {
                  halign: 'right',
                  fontSize: sizeFont,
                  cellPadding: callPadding,
                }
              }
            ],
          ],
          margin: marginPaper,
          theme: 'plain',
        });

        const startY1 = docStruk.autoTable.previous.finalY;
        const lineY1 = startY1 + plusHeightLine;
        docStruk.setDrawColor(0);
        docStruk.setLineWidth(0);
        docStruk.line(startLine, lineY1, endLine, lineY1);

        const bodyRinkasanProduct = [
          [
            {
              content: 'Ringkasan Produk:',
              colSpan: 4,
              styles: {
                halign: 'left',
                fontSize: sizeFont,
                cellPadding: [0, 2, 0, 0],
              }
            }
          ]
        ];

        this.dataProductInList.forEach(data => {
          const product = data.product;
          const obj = [
            {
              content: data.qty,
              styles: {
                halign: 'left',
                fontSize: sizeFont,
                cellPadding: callPaddingProduct,
              }
            },
            {
              content: 'x',
              styles: {
                halign: 'left',
                fontSize: sizeFont,
                cellPadding: callPaddingProduct,
              }
            },
            {
              content: product.itemName,
              styles: {
                halign: 'left',
                fontSize: sizeFont,
                cellPadding: [0.5, 2, 0.5, 0],
              }
            },
            {
              content: this.$root.formatPrice(this.$root.filterPriceProduct(product).price),
              styles: {
                halign: 'right',
                fontSize: sizeFont,
                cellPadding: callPaddingProduct,
              }
            }
          ];

          bodyRinkasanProduct.push(obj);
        });

        // Ringkasan product
        autoTable(docStruk, {
          head: bodyRinkasanProduct,
          margin: marginPaper,
          theme: 'plain',
        });

        const startY2 = docStruk.autoTable.previous.finalY;
        const lineY2 = startY2 + plusHeightLine;
        docStruk.setDrawColor(0);
        docStruk.setLineWidth(0);
        docStruk.line(startLine, lineY2, endLine, lineY2);

        // Total Ringkasan Product
        autoTable(docStruk, {
          head: [
            [
              {
                content: 'Total Bayar Produk:',
                styles: {
                  halign: 'left',
                  fontSize: sizeFont,
                  cellPadding: callPadding,
                }
              },
              {
                content: `Rp ${this.$root.formatPrice(this.totalPriceRingkasanProduct)}`,
                styles: {
                  halign: 'right',
                  fontSize: sizeFont,
                  cellPadding: callPadding,
                }
              }
            ],
          ],
          margin: marginPaper,
          theme: 'plain',
        });

        const dataBillindDetail = [
          [
            {
              content: 'Billing Detail:',
              styles: {
                halign: 'left',
                fontSize: sizeFont,
                cellPadding: [0, 0, 1, 0],
              }
            },
            {
              content: '',
              styles: {
                halign: 'right',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ]
        ];

        // Total Member Reseller Billing
        if(this.getCheckGelarPembelian){
          const forContentTipe = this.getCheckGelarPembelian.slug == this.master_code.gelarBeli.silver ? ` ${this.getCheckGelarPembelian.amount}%` : '';
          const forContentAmount = this.getCheckGelarPembelian.slug == this.master_code.gelarBeli.silver ? `-Rp ${this.$root.formatPrice(this.totalDiskonPercentReseller)}` : `Buy ${this.getCheckGelarPembelian.amount} Get 1`;
          dataBillindDetail.push([
            {
              content: 'Member Reseller' + forContentTipe,
              styles: {
                halign: 'left',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
            {
              content: forContentAmount,
              styles: {
                halign: 'right',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ]);
        }

        // Total Hemat Diskon Billing
        if(this.totalHematDiskon > 0){
          dataBillindDetail.push([
            {
              content: 'Hemat Diskon',
              styles: {
                halign: 'left',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
            {
              content: `-Rp ${this.$root.formatPrice(this.totalHematDiskon)}`,
              styles: {
                halign: 'right',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ]);
        }

        // Total Bayar Billing
        dataBillindDetail.push([
          {
            content: 'Total Bayar:',
            styles: {
              halign: 'left',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          },
          {
            content: this.$root.formatPrice(this.calculateTotalBayarPrice),
            styles: {
              halign: 'right',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          }
        ]);

        // Billing detail
        autoTable(docStruk, {
          head: dataBillindDetail,
          margin: marginPaper,
          theme: 'plain',
        });
        
        const startY3 = docStruk.autoTable.previous.finalY;
        const lineY3 = startY3 + plusHeightLine;
        docStruk.setDrawColor(0);
        docStruk.setLineWidth(0);
        docStruk.line(startLine, lineY3, endLine, lineY3);

        // Kata penutup dan ucapatan terimakasih
        autoTable(docStruk, {
          body: [
            [
              {
                content: 'Terimakasih telah berbelanja di Martha Tilaar Shop, PT Tara Parama Semesta atau Martha Tilaar Shop, one stop beauty online shopping. Selamat menikmati pengalaman berbelanja yang mudah dan menyenangkan di Martha Tilaar Shop.',
                styles: {
                  halign: 'center',
                  fontSize: sizeFont,
                  cellPadding: callPadding,
                }
              },
            ],
          ],
          margin: marginPaper,
          theme: 'plain',
        });

        // --MTS--
        autoTable(docStruk, {
          body: [
            [
              {
                content: '--MTS--',
                styles: {
                  halign: 'center',
                  fontSize: sizeFont,
                  cellPadding: callPadding,
                }
              }
            ],
          ],
          margin: marginPaper,
          theme: 'plain',
        });
        
        autoTable(docStruk, {
          body: [
            [
              {
                content: '-',
                styles: {
                  halign: 'center',
                  fontSize: sizeFont,
                  cellPadding: callPadding,
                }
              }
            ],
            [
              {
                content: '-',
                styles: {
                  halign: 'center',
                  fontSize: sizeFont,
                  cellPadding: callPadding,
                }
              }
            ],
          ],
          margin: marginPaper,
          theme: 'plain',
        });

        // return docStruk.save('Struk Belanja');
        const pdfDataUri = docStruk.output('datauristring');

        // const iframe = this.$refs["pdf_struk_transaksi"];
        // iframe.src = pdfDataUri;

        const newWindow = window.open();
        if (newWindow) {
          const iframe = document.createElement('iframe');
          iframe.src = pdfDataUri;
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.border = 'none';
          newWindow.document.body.style.margin = '0';
          newWindow.document.body.appendChild(iframe);
        } else {
          alert('Pop-up windows are blocked. Please enable pop-ups for this site.');
        }
      },

      getDateTimeForStruk: function(){
        // Mengambil komponen tanggal, bulan, tahun, jam, dan menit
        const day = this.currentTime.getDate().toString().padStart(2, '0');
        const month = (this.currentTime.getMonth() + 1).toString().padStart(2, '0'); // Perlu ditambah 1 karena Januari dimulai dari 0
        const year = this.currentTime.getFullYear();
        const hours = this.currentTime.getHours().toString().padStart(2, '0');
        const minutes = this.currentTime.getMinutes().toString().padStart(2, '0');

        // Membuat string dengan format yang diinginkan
        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
        return formattedDate;
      }
    },
  }
</script>

<style scoped>
.img-icon-po1{
  height: 22px;
  width: 80px;
  object-fit: contain;
}
.img-icon-po2{
  height: 22px;
  width: 90px;
  object-fit: contain;
}

.max-width-text-truncate{
  max-width: 135px;
}
@media (min-width: 600px) and (max-width: 1024px) {
  .max-width-text-truncate{
    max-width: 500px;
  }
}
@media (max-width: 600px) {
  .max-width-text-truncate{
    max-width: 230px;
  }
}
</style>