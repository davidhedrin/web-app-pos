<template>
  <div class="row">
    <div class="col-lg-9">
      <div class="card mb-3">
        <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-5j.png); background-size: cover;"></div>
        <div class="card-header pb-0">
          <h5 class="mb-0 d-flex align-items-center">
            Order List 
            <span class="badge rounded-pill badge-subtle-primary fs-0 ms-1">{{ dataProductInList.length > 0 ? dataProductInList.length : '0' }} item{{ dataProductInList.length > 1 ? 's' : '' }}</span>
            <!-- <span class="badge rounded-pill bg-info fs--1 ms-1"></span> -->
          </h5>
          <hr class="m-1">
        </div>
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
                    <!-- <p>
                      Product list empty <br> No products added!
                    </p> -->
                  </td>
                </tr>
                <tr v-else class="align-middle" v-for="(product, index) in dataProductInList" :key="index" :id="product.sku">
                  <td class="text-nowrap">
                    {{ index+1 }}.
                  </td>
                  <td class="text-nowrap">
                    {{ product.sku }}
                  </td>
                  <td class="text-nowrap">
                    <div class="d-flex align-items-center">
                      <div>{{ product.product.nama_product }}</div>
                    </div>
                  </td>
                  <td class="text-nowrap">
                    Rp {{ $root.formatPrice(product.product.harga) }}
                  </td>
                  <td>
                    -
                  </td>
                  <td class="col-md-2">
                    <input class="form-control p-0 ps-2" type="number" min="1" :value="product.qty" style="width: 60px;" 
                    @input="incDecQtyInput($event, product)"
                    @change="incDecQtyChange($event, product)">
                  </td>
                  <td class="text-end">
                    <a href="javascript:void(0)" v-on:click="deleteProductById(product.sku)" class="p-0 ms-2 text-secondary">
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
          <div class="col-md-7 py-2">
            <div class="form-check form-check-inline m-0 me-2">
              <input class="form-check-input" id="checkBoxBestSellerAll" type="checkbox" value="" />
              <label class="form-check-label mb-0" for="checkBoxBestSellerAll">Best Seller All</label>
            </div>
            <div class="form-check form-check-inline m-0 me-2">
              <input class="form-check-input" id="checkBoxBestSellerToko" type="checkbox" value="" />
              <label class="form-check-label mb-0" for="checkBoxBestSellerToko">Best Seller Toko</label>
            </div>
            <div class="form-check form-check-inline m-0 me-2">
              <input class="form-check-input" id="checkBoxTopThisMonth" type="checkbox" value="" />
              <label class="form-check-label mb-0" for="checkBoxTopThisMonth">Top This Month</label>
            </div>
          </div>
          <div class="col-md-2 py-2">
            <select v-model="selectedFilterBrand" class="form-select">
              <option value="">Pilih Brand</option>
              <option v-for="brand in dataBrandProduct" :id="brand.slug" :value="brand.slug">{{ brand.nama_brand }}</option>
            </select>
          </div>
          <div class="col-md-3">
            <div class="input-group">
              <input class="form-control search-input fuzzy-search" type="search" placeholder="Search...">
              <button class="btn btn-primary card-link" style="z-index: 1"><span class="fas fa-search"></span></button>
            </div>
          </div>
        </div>
        <div class="card-body position-relative p-0">
          <div class="scrollable-customize mb-3" style="max-height: 44vh;">
            <div v-if="isLoadingProduct" class="text-center py-4">
              <component :is="loading"></component>
              <div>
                <img src="@/assets/img/mtsiconland.png" width="200" alt="" />
              </div>
            </div>
            <div class="px-3">
              <div class="row px-3">
                <div class="mb-1 col-lg-2 p-1" v-for="product in filteredProducts" :key="product.sku">
                  <div class="border rounded-1 h-100 d-flex flex-column justify-content-between"><!--  -->
                    <div class="overflow-hidden">
                      <div class="position-relative rounded-top overflow-hidden" v-on:click="addProductToList(product.sku)" style="cursor: pointer;">
                        <div class="d-block text-center">
                          <img class="img-fluid rounded-top" :src="'src/assets/img/product/' + product.image" style="width: 100%;" alt="">
                          <span class="badge rounded-pill bg-success position-absolute mt-2 me-2 z-2 top-0 end-0">Flash Sale</span>
                          <span class="badge badge-subtle-secondary position-absolute mb-1 ms-2 z-2 bottom-0 start-0 fs--2 fw-bold" style="font-weight: normal;">{{ product.sku }}</span>
                          <span class="badge badge-subtle-success position-absolute mb-1 me-2 z-2 bottom-0 end-0 fs--2" style="font-weight: normal;">{{ product.stok }}</span>
                        </div>
                      </div>
                      <div class="p-2 text-center">
                        <!-- <p class="fs--1 mb-0"><u>{{ product.sku }}</u></p> -->
                        <button v-on:click="productShowDetail = product" class="btn btn-sm p-0 ps-1" data-bs-toggle="offcanvas" data-bs-target="#canvasShowDetailProduct" aria-controls="canvasShowDetailProduct">
                          <h5 class="fs-0 mb-0">
                            <div class="text-1100">
                              <span class="d-inline-block text-truncate" style="max-width: 145px;">
                                {{ product.nama_product }}
                              </span>
                            </div>
                          </h5>
                        </button>
                        <div>
                          <strong class="fs-md-0 text-warning mb-0 text-center">
                            Rp {{ $root.formatPrice(product.harga) }}
                          </strong>
                        </div>
                        <!-- <p class="fs--1 mb-0">Brand: <strong class="text-dark">{{ product.brand.nama_brand }}</strong></p> -->
                        <!-- <p class="fs--1 mb-0">Stock: <strong class="text-success">{{ product.stok }}</strong></p> -->
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
            <button v-on:click="memberFindOrRegis = true" class="btn btn-outline-primary btn-sm me-1" type="button" data-bs-toggle="modal" data-bs-target="#modalFindMember">
              Find Member
              <span class="fas fa-search"></span>
            </button>
          </div>

          <div class="card mb-3" :class="{'border-red' : invalidMemberSelect}">
            <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-4.png);"></div>
            <div class="card-body position-relative p-2">
              <div class="d-flex justify-content-between mb-0">
                <p class="mb-0 fs--1">No.Member</p>
                <span class="text-dark"><strong>{{ Object.keys(memberOverview).length > 0 ? memberOverview.member_id : "-" }}</strong></span>
              </div>
              <div class="d-flex justify-content-between mb-0">
                <p class="mb-0 fs--1">Nama</p>
                <span class="text-dark"><strong>{{ Object.keys(memberOverview).length > 0 ? memberOverview.nama : "-" }}</strong></span>
              </div>
              <div class="d-flex justify-content-between mb-0">
                <p class="mb-0 fs--1">No Hp</p>
                <span class="text-dark">
                  <strong >{{ Object.keys(memberOverview).length > 0 ? $root.formatPhoneNumber(memberOverview.no_hp) : "-" }}</strong>
                  <button v-if="Object.keys(memberOverview).length > 0" v-on:click="$root.copyTextClipboard(memberOverview.no_hp, 'Nomor handphone')" class="btn btn-sm p-0 ps-1" style="border: none;">
                    <span class="fas fa-copy"></span>
                  </button>
                </span>
              </div>
              <div class="d-flex justify-content-between mb-0">
                <p class="mb-0 fs--1">Point</p>
                <span class="text-dark"><strong>{{ Object.keys(memberOverview).length > 0 ? $root.formatPrice(memberOverview.point) : "-" }}</strong></span>
              </div>
            </div>
          </div>

          <h5 class="card-title text-center mb-2">Billing Detail</h5>
          <div class="input-group mb-3">
            <input class="form-control" type="text" placeholder="Voucher code">
            <button class="btn btn-primary card-link" style="z-index: 1"><span class="fas fa-percent"></span></button>
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
                <th class="ps-0 py-1" style="font-weight: normal;">Total Bayar </th>
                <th class="pe-0 fs-0 py-1 text-end text-warning">Rp {{ $root.formatPrice(totalBayarPrice) }}</th>
              </tr>
            </tbody>
          </table>
          
          <div class="mb-3">
            <div class="mb-2">
              <label class="form-label mb-0" for="selectSalesBy">Sales By:</label>
              <select v-model="selectSalesBy" class="form-select mb-0" id="selectSalesBy">
                <!-- <option value="">Pilih Salse By</option> -->
                <option value="wi">Walk In (WI)</option>
                <option value="wa">Whatsapp (WA)</option>
                <option value="grabmart">Grabmart</option>
              </select>
            </div>
            <div class="mb-2">
              <label class="form-label mb-0" for="selectMethodPayment">Metode Pembayaran:</label>
              <select v-model="selectMethodPayment" class="form-select mb-0" :class="{'border-red' : invalidMetodePembayaran}" v-on:change="onChangeSelectedMetodeBayar" id="selectMethodPayment">
                <option value="">Pilih Metode Bayar</option>
                <option :value="metodeBayarCash.id">{{ metodeBayarCash.nama }}</option>
                <optgroup label="Transfer Bank">
                  <option v-for="metode in dataMetodeBayarTF" :value="metode.id">{{ metode.nama }}</option>
                </optgroup>
                <optgroup label="E-Wallet">
                  <option v-for="metode in dataMetodeBayarEWal" :value="metode.id">{{ metode.nama }}</option>
                </optgroup>
                <optgroup label="Kartu Kredit">
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
            <button class="btn btn-success" type="submit" v-on:click="confirmationPayment">Confirm &amp; Pay</button>
          </div>
          <hr class="mb-1 mt-2">
          <p class="p-0 m-0 fs--1 text-center">Tekan 'Confirm' untuk menyelesaikan</p>
        </div>
      </div>
    </div>
  </div>
    
  <div class="modal fade" id="modalFindMember" tabindex="-1" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document" :style="!memberFindOrRegis ? 'max-width: 450px' : ''">
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
                <button v-on:click="memberFindOrRegis = !memberFindOrRegis" class="btn btn-outline-primary btn-sm me-1 mb-1" type="button">
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
                      <!-- <form class="position-relative show mb-3" data-bs-toggle="search" data-bs-display="static" aria-expanded="true">
                      </form> -->
                    </div>
                  </div>
                  <hr class="p-0 m-0">
                  <div v-if="isLoadingMembers" class="text-center py-4">
                    <component :is="loading"></component>
                  </div>
                  <div v-else class="table-scrollable-wrapper" style="min-height: 30vh; max-height: 30vh;">
                    <table class="table table-scrollable table-sm table-hover">
                      <thead>
                        <tr>
                          <th class="bg-white">Name</th>
                          <th class="bg-white">Email</th>
                          <th class="bg-white">Phone</th>
                          <th class="bg-white">Tanggal Lahir</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="member in filteredMembers" :id="member.member_id" class="align-middle" v-on:click="selectMemberOverview(member)" style="cursor: pointer;">
                          <td class="text-nowrap">{{ member.nama }}</td>
                          <td class="text-nowrap">{{ member.email }}</td>
                          <td class="text-nowrap">{{ member.no_hp }}</td>
                          <td class="text-nowrap">{{ member.tanggal_lahir }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div v-else>
                 <form class="px-2 needs-validation" novalidate="">  <!-- @submit.prevent="storeNewMember" -->
                    <div class="mb-1">
                      <label class="form-label mb-1" for="nama_member">Name</label>
                      <input v-model="nama_member" class="form-control bg-transparent" id="nama_member" name="nama_member" type="text" placeholder="Masukkan nama lengkap" required="">
                      <div class="invalid-feedback">Nama member wajib untuk diisi</div>
                    </div>
                    <div class="mb-1">
                      <label class="form-label mb-1" for="no_hp_member">No Hp</label>
                      <input v-model="no_hp_member" class="form-control bg-transparent" id="no_hp_member" name="no_hp_member" type="text" placeholder="Masukkan nomor handpone" required="">
                    </div>
                    <div class="mb-1">
                      <label class="form-label mb-1" for="email_member">Email address</label>
                      <input v-model="email_member" class="form-control bg-transparent" id="email_member" name="email_member" type="email" placeholder="email@example.com" required="">
                    </div>
                    <div class="mb-1">
                      <label class="form-label mb-1" for="select_jk_member">Jenis Kelamin</label>
                      <select v-model="select_jk_member" class="form-select bg-transparent" id="select_jk_member" name="select_jk_member" required="">
                        <option value="">Pilih jenis kelamin</option>
                        <option value="male">Laki-laki</option>
                        <option value="female">Perempuan</option>
                        <option value="other">Lainnya</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label mb-1" for="tanggal_lahir">Tanggal Lahir</label>
                      <input v-model="tanggal_lahir" class="form-control bg-transparent" id="tanggal_lahir" name="tanggal_lahir" type="date" required="">
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
                <div class="d-flex justify-content-between fs--1 mb-2">
                  <p class="fs--1 m-0">
                    Member: {{ Object.keys(memberOverview).length > 0 ? memberOverview.member_id : '' }}
                  </p>
                  <span class="fs--1">{{ formattedDateNow }}, {{ formattedTimeNow }}</span>
                </div>
    
                <div class="mb-3">
                  <label class="form-label mb-0">Ringkasan Produk</label>
                  <hr class="m-0">
                  <div class="scrollable-customize" style="max-height: 120px;">
                    <div v-for="product in dataProductInList" :id="product.sku" class="d-flex justify-content-between fs--1 mb-1">
                      <p class="mb-0 text-dark"><strong>{{ product.qty }} x </strong>{{ product.product.nama_product }}</p><span class="text-dark"><strong>{{ $root.formatPrice(product.qty * product.product.harga) }}</strong></span>
                    </div>
                  </div>
                  <hr class="mb-1 mt-0">
                  <div class="d-flex justify-content-between fs--1 mb-0">
                    <p class="mb-0 text-dark"><strong>Total</strong></p>
                    <span class="text-dark"><strong>Rp {{ $root.formatPrice(subTotalPrice) }}</strong></span>
                  </div>
                  <hr class="m-0 mt-1">
                </div>
    
                <!-- <div v-if="subTotalPrice > 1000000" class="card mb-3">
                  <div class="bg-holder bg-card" style="background-image:url(src/assets/img/illustration/corner-1-w-left.png); background-position: left;"></div>
                  <div class="card-body p-0 px-3 py-2">
                    <div class="row align-items-center text-center">
                      <div class="col text-sm-start mt-3 mt-sm-0">
                        <span class="mb-0 fs-0 fw-medium">Gelar Pembelian</span>
                        <h5 class="mb-0">Gelar Pembelian <span class="text-warning">PREMIUM</span></h5>
                        <p class="fs--1 mb-0">Melakukan pembelian dengan jumlah sebagai <u>RESALLER</u></p>
                      </div>
                      <div class="col-sm-4 text-sm-end">
                        <img class="py-2" src="@/assets/img/illustration/rewords-payment.png" alt="invoice" width="50">
                      </div>
                    </div>
                  </div>
                </div> -->
    
                <span class="text-dark">Billing Detail:</span>
                <hr class="m-0">
                <table class="table fs--1 mb-3">
                  <tbody>
                    <tr v-if="subTotalPrice > 1000000" class="border-bottom">
                      <th class="ps-0 py-1" style="font-weight: normal;">
                        Member RESELLER 
                        <span v-if="Object.keys(getCheckGelarPembelian).length > 0" class="me-1">
                          <span v-if="getCheckGelarPembelian.jenis_diskon == '2'" class="badge badge-subtle-danger px-1 fs--2">
                            {{ getCheckGelarPembelian.amount }}%
                          </span>
                          <span v-else-if="getCheckGelarPembelian.jenis_diskon == '3'" class="badge badge-subtle-danger px-1 fs--2">
                            Buy {{ getCheckGelarPembelian.amount }} Get 1
                          </span>
                        </span>
                        <img class="py-0" src="@/assets/img/illustration/rewords-payment.png" alt="invoice" width="20">
                      </th>
                      <th class="pe-0 py-1 text-end text-dark">- Rp 25.000</th>
                    </tr>
                    <tr class="border-bottom">
                      <th class="ps-0 py-1" style="font-weight: normal;">Hemat </th>
                      <th class="pe-0 py-1 text-end text-dark">-Rp 15.000</th>
                    </tr>
                    <tr class="border-bottom">
                      <th class="ps-0 py-1" style="font-weight: normal;">Diskon </th>
                      <th class="pe-0 py-1 text-end text-dark">-Rp 5.000</th>
                    </tr>
                    <tr class="border-bottom">
                      <th class="ps-0 py-1" style="font-weight: normal;">Total Bayar </th>
                      <th class="pe-0 fs-0 py-1 text-end text-warning">Rp {{ $root.formatPrice(totalBayarPrice) }}</th>
                    </tr>
                  </tbody>
                </table>
    
                <div class="d-flex align-items-center justify-content-between mb-1">
                  <label class="form-label mb-0">Metode Pembayaran (Max 3): </label>
                  <div class="btn-group" role="group">
                    <button class="btn btn-sm p-0 ms-2 text-primary dropdown-toggle" id="btnGroupTambahMetode" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Tambah Metode
                    </button>
                    <div class="dropdown-menu py-0" aria-labelledby="btnGroupTambahMetode">
                      <a class="dropdown-item" v-on:click="addMoreMetodeBayar(metodeBayarCash)" href="javascript:void(0)">{{ metodeBayarCash.nama }}</a>
                      <a v-for="metode in dataMetodeBayarTF" class="dropdown-item" v-on:click="addMoreMetodeBayar(metode)" href="javascript:void(0)">{{ metode.nama }}</a>
                      <hr class="dropdown-divider" />
                      <a v-for="metode in dataMetodeBayarEWal" class="dropdown-item" v-on:click="addMoreMetodeBayar(metode)" href="javascript:void(0)">{{ metode.nama }}</a>
                      <hr class="dropdown-divider" />
                      <a v-for="metode in dataMetodeBayarCC" class="dropdown-item" v-on:click="addMoreMetodeBayar(metode)" href="javascript:void(0)">{{ metode.nama }}</a>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center justify-content-between rounded-3 bg-body-tertiary p-2">
                  <div class="w-35">
                    <img class="img-icon-po1" :src="'src/assets/img/po-img/' + selectedMetodeBayar.image" />
                  </div>
                  <div class="w-40 me-1">
                    <input v-if="selectedMetodeBayar.tipe != '1'" v-model="modelInputSelectedMetodeBayar" id="inputSelectedMetodeBayar" @input="modelInputSelectedMetodeBayar = onChangeCheckNumberVal($event)" class="form-control form-control-sm" type="text" :placeholder="selectedMetodeBayar.tipe == '3' ? 'Nomor telepon' : '4 digit nomor' " />
                    <i v-else>Pembayaran Cash</i>
                  </div>
                  <div class="w-25">
                    <input class="form-control form-control-sm text-end" id="inputSelectedNominalMetode" @input="onChangeCheckVal($event)" type="text" :value="$root.formatPrice(calculateTotalBayarPrice)" disabled />
                  </div>
                </div>
                
                <div v-for="(metode, index) in dataMoreMetodeBayar" :key="index" class="d-flex align-items-center justify-content-between rounded-3 bg-body-tertiary p-2">
                  <div class="w-35 d-flex align-items-center">
                    <a href="javascript:void(0)" class="text-secondary me-1" v-on:click="removeMoreMetodeBayar(metode, index)">
                      <span class="fas fa-window-close"></span>
                    </a>
                    <img class="img-icon-po1" :src="'src/assets/img/po-img/' + metode.image" />
                  </div>
                  <div class="w-40 me-1">
                    <input v-if="metode.tipe != '1'" v-model="modelInputMoreMetodeBayar[index]" class="form-control form-control-sm" :id="'inputMoreMetodeBayar_' + index" @input="modelInputMoreMetodeBayar[index] = onChangeCheckNumberVal($event)" type="text" :placeholder="metode.tipe == '3' ? 'Nomor telepon' : '4 digit nomor' " />
                    <i v-else>Pembayaran Cash</i>
                  </div>
                  <div class="w-25">
                    <input v-model="nominalMoreMetodeBayar[index]" @input="nominalMoreMetodeBayar[index] = formatCalculatePriceMoreMetode($event, index)" :id="'inputNominalMoreMetodeBayar_' + index" class="form-control form-control-sm text-end" type="text" placeholder="Nominal"/>
                  </div>
                </div>
    
                <!-- <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="form-label mb-0">Metode Pembayaran: </label>
                  <div>
                    <img class="img-icon-po1" :src="'/img/po-img/' + selectedMetodeBayar.image" />
                  </div>
                </div> -->
                
                <hr class="m-0 mt-2">
    
                <div v-if="selectSalesBy == 'wa'" class="mb-2 mt-2">
                  <label class="form-label mb-0" for="selectSalesBy">Sales By WA:</label>
                  <select v-model="selectedBscWa" v-on:change="invalidSelectSalesBsc = false" class="form-select mb-0" :class="{'border-red' : invalidSelectSalesBsc}" id="selectSalesBy">
                    <option value="">Pilih BSC WA</option>
                    <option value="1">David Simbolon</option>
                    <option value="2">Jonatan Hudson</option>
                    <option value="3">Surya Hasan</option>
                  </select>
                </div>
                
                <label class="form-label mb-0">Keterangan: </label>
                <div class="scrollable-customize" style="max-height: 7vh">
                  <p class="fs--1 mb-0 pb-0">
                    {{ $root.trimString(keteranganTransaksi) == '' ? '-' : $root.trimString(keteranganTransaksi) }}
                  </p>
                </div>
              </div>
              <div class="text-end px-3 pt-0 pb-3">
                <button class="btn btn-secondary me-2 btn-sm" type="button" v-on:click="batalModalCheckoutConfirm" data-bs-dismiss="modal">Batal</button>
                <button class="btn btn-primary btn-sm" type="button" v-on:click="openModalCheckoutConfirm">Checkout <span class="fas fa-shopping-basket"></span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="modal fade" id="modalCheckoutConfirm" tabindex="0" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
      <div class="modal-content position-relative">
        <div class="modal-body p-0">
          <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
            <h3 class="mb-1" id="modalExampleDemoLabel">Konfirmasi Pesanan</h3>
          </div>
          <div class="py-4 text-center">
            <div class="d-flex justify-content-center mb-2">
              <div class="bg-warning me-3 icon-item">
                <span class="fas fa-exclamation-circle text-white fs-3"></span>
              </div>
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

  <div class="offcanvas offcanvas-end" id="canvasShowDetailProduct" tabindex="-1" aria-labelledby="canvasShowDetailProductLabel">
    <div class="offcanvas-header pb-0 align-items-start">
      <div>
        <h5>{{ productShowDetail.nama_product }}</h5>
        <span class="badge badge-subtle-secondary fs--1 fw-bold mb-3" style="font-weight: normal;">
          {{ productShowDetail.sku }}
        </span>
      </div>
      <button class="btn-close text-reset mt-1" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-header pt-0">
      <img class="img-fluid rounded" :src="'src/assets/img/product/' + productShowDetail.image" style="width: 100%; height: 200px;" alt="" />
    </div>
    <div class="offcanvas-header justify-content-between pt-0 pb-2">
      <div>
        <span class="fs--1 mb-0">Brand Produk: </span>
        <p class="mb-1">
          <strong>
            {{ Object.keys(productShowDetail).length > 0 ? productShowDetail.brand.nama_brand : '' }}
          </strong>
        </p>
      </div>
      <div class="text-end">
        <span class="fs--1 mb-0">Stok Tersedia: </span>
        <p class="mb-1">
          <span class="badge badge-subtle-success fs-0">{{ Object.keys(productShowDetail).length > 0 ? productShowDetail.stok : '' }}</span>
        </p>
      </div>
    </div>
    <div class="offcanvas-header py-0">
      <span class="fs--1 mb-1">Keterangan Produk: </span>
    </div>
    <div class="offcanvas-body pt-0">
      <p class="mb-1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda beatae totam nihil quidem optio odio dolorum necessitatibus animi, incidunt consectetur voluptas impedit nesciunt alias delectus ex eius repellat ipsam aperiam laboriosam enim provident nisi molestias quibusdam. Ipsam ab, illo illum assumenda ex voluptas sit odit doloremque reprehenderit consequuntur facilis ipsa atque quo eius unde dicta! Laboriosam, suscipit, ex, expedita vitae ea maxime tenetur ut ipsum inventore dignissimos fugit quae. Odio fuga corporis maiores suscipit eos, hic numquam vero illum amet delectus eum minima optio id, tempore vitae dolores. Alias quibusdam aspernatur possimus? Eos cumque voluptatibus dolores aperiam veritatis voluptates consectetur quae quo nihil ratione laboriosam ut totam ab, recusandae, numquam impedit vel minus aliquam dignissimos fugiat ad incidunt iste expedita ea! Iusto, enim! Eos dolore ipsam recusandae ullam rem minima facilis, eligendi eaque? Reprehenderit, nostrum amet repudiandae, explicabo maxime modi magni illo, consequatur placeat natus ab at a enim fugiat!
      </p>
    </div>
    <div class="d-flex justify-content-between align-items-center p-3">
      <div>
        <h5 class="text-warning">
          Rp {{ Object.keys(productShowDetail).length > 0 ? $root.formatPrice(productShowDetail.harga) : '0' }}
        </h5>
      </div>
      <div class="d-flex justify-content-end">
        <input class="form-control p-0 ps-2 me-2" type="number" min="1" :value="qtyProductShowDetail" style="width: 60px;" @input="incDecQtyInputCanvas($event)" @change="incDecQtyChangeCanvas($event)">
        <button v-on:click="addProductToList(productShowDetail.sku, qtyProductShowDetail)" class="btn btn-primary px-2" type="button" data-bs-dismiss="offcanvas" aria-label="Close">
          Tambah <span class="fas fa-cart-plus" data-fa-transform="shrink-3"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { markRaw } from 'vue';
import Loading from '../layouts/Loading.vue';

export default {
  name: 'SalesPage',
  data() {
    return {
      loading: markRaw(Loading),
      isLoadingProduct: true,
      isLoadingMembers: true,
      currentTime: new Date(),

      hostUrl: import.meta.env.VITE_API_URL,
      memberFindOrRegis: true,
      dataAllProducts: [],
      dataProductInList: [],
      dataBrandProduct: [],
      dataAllMembers: [],
      dataAllGelars: [],
      dataAllKodeResellers: [],
      dataAllKodeToko: [],

      // Metode bayar
      dataAllMetodeBayar: [],
      metodeBayarCash: {},
      dataMetodeBayarTF: [],
      dataMetodeBayarEWal: [],
      dataMetodeBayarCC: [],
      dataMoreMetodeBayar: [],
      selectedMetodeBayar: {},
      modelInputSelectedMetodeBayar: '',
      modelInputMoreMetodeBayar:[],

      memberOverview: {},

      subTotalPrice: 0,
      diskonPrice: 0,
      totalBayarPrice: 0,
      calculateTotalBayarPrice: 0,
      nominalMoreMetodeBayar: [],
      tempValueInputMoreMetode: 0,

      // For register new member
      nama_member: '',
      no_hp_member: '',
      email_member: '',
      select_jk_member: '',
      tanggal_lahir: '',

      select_kode_reseller: '',
      select_kode_toko: '',
      
      selectMethodPayment: '',
      keteranganTransaksi: '',

      selectedFilterBrand: '',
      inputSearchMember: '',
      selectSalesBy: 'wi',
      selectedBscWa: '',

      invalidMemberSelect: false,
      invalidMetodePembayaran: false,
      invalidSelectSalesBsc: false,

      productShowDetail: {},
      qtyProductShowDetail: 1,

      getCheckGelarPembelian: {},
    };
  },

  beforeMount(){
    this.loadAlldatas();
  },

  mounted() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  },

  computed: {
    filteredProducts() {
      if (this.selectedFilterBrand == '') {
        return this.dataAllProducts;
      }

      return this.dataAllProducts.filter(product => {
        return product.brand.slug === this.selectedFilterBrand;
      });
    },
    
    filteredMembers() {
      const query = this.inputSearchMember.toLowerCase();
      return this.dataAllMembers.filter(member => {
        return (
          member.member_id.toLowerCase().includes(query) ||
          member.nama.toLowerCase().includes(query) ||
          member.no_hp.toLowerCase().includes(query) ||
          member.email.toLowerCase().includes(query) ||
          member.tanggal_lahir.toLowerCase().includes(query)
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
    async loadAlldatas(){
      try {
        const getAllDataSales = await axios({
          method: 'get',
          url: this.hostUrl + '/sales',
          withCredentials: false,
        });
        const allData = getAllDataSales.data;
        this.dataBrandProduct = allData.getAllBrand; //All Brand
        allData.getAllMember.forEach(member => {
          member.tanggal_lahir = this.$root.formatDate(member.tanggal_lahir);
        });
        this.dataAllMembers = allData.getAllMember; //All Member
        this.dataAllGelars = allData.getAllGelar; //All Gelar
        this.dataAllKodeResellers = allData.getAllKodeReseller; //All Kode Reseller
        this.dataAllKodeToko = allData.getAllKodeToko; //All Kode Toko
        this.select_kode_toko = allData.getAllKodeToko[0].id;
        this.dataAllMetodeBayar = allData.getAllMetodeBayar; //All Metode Bayar
        this.metodeBayarCash = this.dataAllMetodeBayar.find((m) => m.tipe == '1'); // Metode Bayar Cash
        allData.getAllMetodeBayar.forEach(metode => {
          if(metode.tipe === '2'){
            this.dataMetodeBayarTF.push(metode);
          }
          if(metode.tipe === '3'){
            this.dataMetodeBayarEWal.push(metode);
          }
          if(metode.tipe === '4'){
            this.dataMetodeBayarCC.push(metode);
          }
        });

        this.isLoadingMembers = false;

        const getAllProduct = await axios({
          method: 'get',
          url: this.hostUrl + '/sales/getAllProduct',
          withCredentials: false,
        });
        this.dataAllProducts = getAllProduct.data;
        this.isLoadingProduct = false;
      } catch (error) {
        console.error(error);
      }
    },

    async storeNewMember(){
      try{
        const storeMember = await axios({
          method: 'post',
          url: this.hostUrl + '/sales/storeNewMember',
          withCredentials: false,
          data: {
            nama_member: this.nama_member,
            no_hp_member: this.no_hp_member,
            email_member: this.email_member,
            select_jk_member: this.select_jk_member,
            tanggal_lahir: this.tanggal_lahir,
          }
        });

        var getResponsStore = storeMember.data;
        var getDataUser = getResponsStore.data;
        this.memberOverview = getDataUser;
        this.dataAllMembers.push(getDataUser);
        $('#modalFindMember').modal('hide');

        this.nama_member = '';
        this.no_hp_member = '';
        this.email_member = '';
        this.select_jk_member = '';
        this.tanggal_lahir = '';
        this.select_kode_reseller = '';
        
        this.$root.showAlertFunction('success', 'Pendaftaran Berhasil!', 'Selamat, member baru telah berhasil ditambahkan.');
      } catch (error) {
        console.error(error);
      }
    },

    calculateAmoutPrice(){
      this.subTotalPrice = 0;
      this.totalBayarPrice = 0;
      this.dataProductInList.forEach((product) => {
        var getProduct = product.product;
        
        var formatHarga = parseFloat(getProduct.harga);
        var calculatePrice = formatHarga * product.qty;
        this.subTotalPrice += calculatePrice;
      });
      
      var tatalUntukBayar = this.subTotalPrice - this.diskonPrice;
      this.totalBayarPrice = tatalUntukBayar;
      this.calculateTotalBayarPrice = tatalUntukBayar;
    },

    addProductToList(sku, qty = 1){
      if(qty > 0){
        const product = this.dataAllProducts.find((product) => product.sku === sku);
        if(product){
          const existingProduct = this.dataProductInList.find((p) => p.sku === sku);
          if (existingProduct) {
            existingProduct.qty = existingProduct.qty + qty;
          }else{
            const productObj = {
              sku: product.sku,
              product: product,
              qty: qty,
            };
            this.dataProductInList.push(productObj);
          }
        } else {
          console.log('Product not found');
        }
  
        this.qtyProductShowDetail = 1;
        this.calculateAmoutPrice();
      }
    },
    
    deleteProductById(sku) {
      const indexToDelete = this.dataProductInList.findIndex((item) => item.sku === sku);
      if (indexToDelete !== -1) {
        this.dataProductInList.splice(indexToDelete, 1);
      } else {
        console.log('Product not found');
      }
      
      this.calculateAmoutPrice();
    },

    emptyProductList(){
      this.dataProductInList = [];
      this.calculateAmoutPrice();
    },

    incDecQtyInput(event, product){
      const newValue = parseInt(event.target.value);
      const existingProduct = this.dataProductInList.find((p) => p.sku === product.sku);

      existingProduct.qty = newValue;
      if (!isNaN(newValue) || newValue > 0) {
        this.calculateAmoutPrice();
      }
    },

    incDecQtyChange(event, product){
      const newValue = parseInt(event.target.value);
      const existingProduct = this.dataProductInList.find((p) => p.sku === product.sku);

      if (!isNaN(newValue) || newValue > 0) {
        existingProduct.qty = newValue;
      }else{
        existingProduct.qty = 1;
      }
      
      this.calculateAmoutPrice();
    },

    incDecQtyInputCanvas(event){
      const newValue = parseInt(event.target.value);
      this.qtyProductShowDetail = newValue;
    },

    incDecQtyChangeCanvas(event){
      const newValue = parseInt(event.target.value);
      if (isNaN(newValue) || newValue < 1) {
        this.qtyProductShowDetail = 1;
      }
    },

    disableBackspace(event, product) {
      if (product.qty <= 1 && event.key === 'Backspace') {
        event.preventDefault();
      }
    },

    selectMemberOverview(member){
      this.memberOverview = member;
        this.invalidMemberSelect = false;
      $('#modalFindMember').modal('hide');
    },

    onChangeSelectedMetodeBayar(){
      this.selectedMetodeBayar = {};
      this.invalidMetodePembayaran = false;
      
      const findMetodeBayar = this.dataAllMetodeBayar.find((metode) => metode.id === this.selectMethodPayment);
      if(findMetodeBayar){
        this.selectedMetodeBayar = findMetodeBayar;
      }
    },

    addMoreMetodeBayar(metode){
       // Metode pembayaran tidak boleh lebih dari 3
      if(this.dataMoreMetodeBayar.length > 1){
        this.$root.showAlertFunction('info', 'Ops...!', 'Metode pembayaran sudah mencapai batas (Maksimal 3).');
        return false;
      }
      
      // Metode pembayaran yang sama tidak boleh bertambah
      const existingMetode = this.dataMoreMetodeBayar.find((m) => m.id === metode.id);
      if(existingMetode || metode.id === this.selectedMetodeBayar.id){
        return false;
      }

      // Metode pembayaran kartu kredit tidak dapat dikombinasikan atau ditambahkan jika sudah ada yang lain
      if(this.selectedMetodeBayar.tipe !== '4'){
        if(metode.tipe === '4'){
          this.$root.showAlertFunction('info', 'Ops...!', "Metode pembayaran 'Kredit' tidak dapat dikombinasi.");
          return false;
        }
      }

      // Hanya boleh metode pembayaran kartu kredit jika dipilih dari awal
      if(this.selectedMetodeBayar.tipe === '4'){
        this.$root.showAlertFunction('info', 'Ops...!', 'Metode pembayaran hanya boleh Kartu Kredit.');
        return false;
      }

      // Metode pembayaran debit dan kartu kredit tidak dapat dikombinasikan
      if(
        (this.selectedMetodeBayar.tipe === '4' && metode.tipe === '2') || 
        (this.selectedMetodeBayar.tipe === '2' && metode.tipe === '4')
      ){
        this.$root.showAlertFunction('info', 'Ops...!', "Metode pembayaran 'Debit' dan 'Kredit' tidak dapat dikombinasi.");
        return false;
      }

      // Metode pembayaran debit tidak boleh lebih dari 1
      const existingMetodeDebit = this.dataMoreMetodeBayar.find((m) => m.tipe === '2');
      if((this.selectedMetodeBayar.tipe === '2' && metode.tipe === '2') || (existingMetodeDebit && metode.tipe === '2')){
        this.$root.showAlertFunction('info', 'Ops...!', "Metode pembayaran 'Debit' tidak boleh lebih.");
        return false;
      }
      
      this.dataMoreMetodeBayar.push(metode);
    },

    formatCalculatePriceMoreMetode(event, index) {
      var inputId = event.target;
      var valueInput = inputId.value;
      
      if (valueInput || valueInput.length > 0){
        inputId.classList.remove('border-red');
      }else{
        inputId.classList.add('border-red');
      }

      let total = 0;
      for (let i = 0; i < this.nominalMoreMetodeBayar.length; i++) {
        if (this.nominalMoreMetodeBayar[i] !== '') {
          const value = this.nominalMoreMetodeBayar[i] ? parseFloat(this.nominalMoreMetodeBayar[i].replace(/\./g, '')) || 0 : 0;
          total += value;
        }
      }

      this.calculateTotalMoreMetode(index);
      
      if (total > this.totalBayarPrice) {
        return;
      }
      const price = event.target.value;
      const numericPrice = price.replace(/[^0-9]/g, '');
      
      if (numericPrice === null || numericPrice.trim() === "") {
        return;
      }
      
      const number = parseFloat(numericPrice);

      const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'decimal',
        minimumFractionDigits: 0,
      }).format(number);

      return formattedPrice;
    },

    removeMoreMetodeBayar(metode, indexInpNominal){
      const indexToDelete = this.dataMoreMetodeBayar.findIndex((item) => item.id === metode.id);
      if (indexToDelete !== -1) {
        this.dataMoreMetodeBayar.splice(indexToDelete, 1);
        this.nominalMoreMetodeBayar.splice(indexInpNominal, 1);
        this.calculateTotalMoreMetode(indexInpNominal);
      } else {
        console.log('Metode bayar not found');
      }
    },

    batalModalCheckoutConfirm(){
      dataMoreMetodeBayar = [];
      nominalMoreMetodeBayar = [];
      getCheckGelarPembelian = {};
      calculateTotalMoreMetode();
    },

    calculateTotalMoreMetode(index = null){
      let total = 0;
      for (let i = 0; i < this.nominalMoreMetodeBayar.length; i++) {
        if (this.nominalMoreMetodeBayar[i] !== '') {
          const value = this.nominalMoreMetodeBayar[i] ? parseFloat(this.nominalMoreMetodeBayar[i].replace(/\./g, '')) || 0 : 0;
          total += value;
        }
      }
      
      if(index != null){
        if (total >= this.totalBayarPrice) {
          let thisNominalTotal = 0;
          for (let i = 0; i < this.nominalMoreMetodeBayar.length; i++) {
            if (i !== index && this.nominalMoreMetodeBayar[i] !== '') {
              const value = this.nominalMoreMetodeBayar[i] ? parseFloat(this.nominalMoreMetodeBayar[i].replace(/\./g, '')) || 0 : 0;
              thisNominalTotal += value;
            }
          }
          this.calculateTotalBayarPrice = this.totalBayarPrice - thisNominalTotal;
          return;
        }
      }

      this.calculateTotalBayarPrice = this.totalBayarPrice - total;
    },

    checkValidasiGelarMember(){
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

      if (!gelarTerpilih) {
        gelarTerpilih = this.dataAllGelars.find((gelar) => gelar.id === 1);
      }

      return gelarTerpilih;
    },

    confirmationPayment(){
      if(this.dataProductInList.length < 1){
        this.$root.showAlertFunction('warning', 'Order List', 'Tidak ada product yang ditambahkan dalam Order List!');
        return false;
      }

      if(Object.keys(this.memberOverview).length < 1){
        this.$root.showAlertFunction('warning', 'Validasi Transaksi', 'Silahkan pilih dan tentukan member!');
        this.invalidMemberSelect = true;
        return false;
      }

      if(this.selectMethodPayment == ''){
        this.$root.showAlertFunction('warning', 'Validasi Transaksi', 'Silahkan pilih metode pembayaran!');
        this.invalidMetodePembayaran = true;
        return false;
      }
      
      var checkGelarPembelian = this.checkValidasiGelarMember();
      this.getCheckGelarPembelian = checkGelarPembelian;

      $('#modalConfirmPay').modal('show');
    },

    onChangeCheckVal(event){
      var inputId = event.target;
      var valueInput = inputId.value;
      
      if (valueInput || valueInput.length > 0){
        inputId.classList.remove('border-red');
      }else{
        inputId.classList.add('border-red');
      }
    },
    onChangeCheckNumberVal(event){
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

    openModalCheckoutConfirm(){
      this.invalidSelectSalesBsc = false;

      function checkAllInputMetodAndNominal(selectedMetodeBayar, dataMoreMetodeBayar, nominalMoreMetodeBayar) {
        var result = true;
      
        if(selectedMetodeBayar.tipe != '1'){
          var inputSelectedMetodeBayar = $("#inputSelectedMetodeBayar");
          var inputSelectedMetodeBayarVal = inputSelectedMetodeBayar.val().trim();
  
          if (inputSelectedMetodeBayarVal === "" ){
            inputSelectedMetodeBayar.addClass('border-red');
            result = false;
          }
        }

        for(let i=0; i < dataMoreMetodeBayar.length; i++){
          if(dataMoreMetodeBayar[i].tipe != '1'){
            var inputMoreMetode = $('#inputMoreMetodeBayar_' + i);
            var inputMoreMetodeVal = inputMoreMetode.val().trim();
            if (inputMoreMetodeVal === ""){
              inputMoreMetode.addClass('border-red');
              result = false;
            }
          }

          var inputMoreNominalMetode = $('#inputNominalMoreMetodeBayar_' + i);
          var inputMoreNominalMetodeVal = inputMoreNominalMetode.val().trim();
          if (inputMoreNominalMetodeVal === ""){
            inputMoreNominalMetode.addClass('border-red');
            result = false;
          }
        }

        return result;
      }

      if(!checkAllInputMetodAndNominal(this.selectedMetodeBayar, this.dataMoreMetodeBayar, this.nominalMoreMetodeBayar)){
        return false;
      }

      if(this.selectSalesBy == 'wa' && this.selectedBscWa == ''){
        this.invalidSelectSalesBsc = true;
        return false;
      }
      $('#modalCheckoutConfirm').modal('show');
    },
    
    checkoutBtn(){
      this.dataProductInList = [];
      this.memberOverview = {};

      this.dataMoreMetodeBayar = [];
      this.nominalMoreMetodeBayar = [];
      this.selectedMetodeBayar = {};
      this.selectMethodPayment = '';
      this.modelInputSelectedMetodeBayar = '';
      this.modelInputMoreMetodeBayar = [];

      this.selectedFilterBrand = '';
      this.selectedBscWa = '';
      this.inputSearchMember = '';
      this.keteranganTransaksi = '';
      this.calculateAmoutPrice();
      $('#modalCheckoutConfirm').modal('hide');
      $('#modalConfirmPay').modal('hide');

      this.$root.showAlertFunction('success', 'Traksaksi Berhasil!', 'Selamat, transaksi baru telah berhasil disimpan.');
    },
  },
}
</script>

<style scope>
.img-icon-po1{
  height: 22px;
  object-fit: cover;
}
.img-icon-po2{
  width: 100px;
  object-fit: cover;
}
</style>