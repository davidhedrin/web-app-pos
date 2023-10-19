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
            <div class="form-check form-check-inline m-0 me-2">
              <input class="form-check-input" id="checkBoxPromo" type="checkbox" value="" />
              <label class="form-check-label mb-0" for="checkBoxPromo">Promo</label>
            </div>
            <div class="form-check form-check-inline m-0 me-2">
              <input class="form-check-input" id="checkBoxFlushOut" type="checkbox" value="" />
              <label class="form-check-label mb-0" for="checkBoxFlushOut">Flush Out</label>
            </div>
            <div v-if="Object.keys(memberOverview).length > 0 && memberOverview.tipe_konsumen.id == '3'" class="form-check form-check-inline m-0 me-2">
              <input class="form-check-input" id="checkBoxPromoKaryawan" type="checkbox" value="" />
              <label class="form-check-label mb-0" for="checkBoxPromoKaryawan">Promo Karyawan</label>
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
            <div v-if="filteredProducts.length < 1" class="text-center py-4">
              <div>
                <img src="@/assets/img/mtsiconland.png" width="200" alt="" />
              </div>
            </div>
            <div class="px-3">
              <div class="row px-3">
                <div class="mb-1 col-md-2 p-1" v-for="product in filteredProducts" :key="product.sku">
                  <div class="border rounded-1 h-100 d-flex flex-column justify-content-between">
                    <div class="overflow-hidden">
                      <div class="position-relative rounded-top overflow-hidden" v-on:click="addProductToList(product.sku)" style="cursor: pointer;">
                        <div class="d-block text-center">
                          <img class="img-fluid rounded-top" :src="'src/assets/img/product/' + product.image" style="width: 100%;" alt="">
                          <!-- <span class="badge rounded-pill bg-success position-absolute mt-2 me-2 z-2 top-0 end-0">Flash Sale</span> -->
                          <span class="badge badge-subtle-secondary position-absolute mb-1 ms-2 z-2 bottom-0 start-0 fs--2 fw-bold" style="font-weight: normal;">{{ product.sku }}</span>
                          <span class="badge badge-subtle-success position-absolute mb-1 me-2 z-2 bottom-0 end-0 fs--2" style="font-weight: normal;">{{ product.stok }}</span>
                        </div>
                      </div>
                      <div class="p-2 text-center">
                        <!-- <p class="fs--1 mb-0"><u>{{ product.sku }}</u></p> -->
                        <button v-on:click="productShowDetail = product" class="btn btn-sm p-0 ps-1" data-bs-toggle="offcanvas" data-bs-target="#canvasShowDetailProduct" aria-controls="canvasShowDetailProduct">
                          <h5 class="fs-0 mb-0">
                            <div class="text-1100">
                              <span class="d-inline-block text-truncate max-width-text-truncate">
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
              <select v-model="selectSalesBy" @change="selectMethodPayment = ''" class="form-select mb-0" id="selectSalesBy">
                <option v-for="sales in dataAllMasterSalesBy" :value="sales.slug">{{ sales.nama_sales }}</option>
              </select>
            </div>
            <div class="mb-2">
              <label class="form-label mb-0" for="selectMethodPayment">Metode Pembayaran:</label>
              <select v-model="selectMethodPayment" class="form-select mb-0" :class="{'border-red' : invalidMetodePembayaran}" v-on:change="onChangeSelectedMetodeBayar" id="selectMethodPayment">
                <option value="">Pilih Metode Bayar</option>
                <option v-if="selectSalesBy == 'wi'" :value="metodeBayarCash.id">{{ metodeBayarCash.nama }}</option>
                <option v-if="Object.keys(memberOverview).length > 0 && memberOverview.tipe_konsumen.id == '3'" :value="metodeBayarKaryawan.id">{{ metodeBayarKaryawan.nama }}</option>
                <optgroup label="Transfer Bank">
                  <option v-for="metode in dataMetodeBayarTF" :value="metode.id">{{ metode.nama }}</option>
                </optgroup>
                <optgroup v-if="selectSalesBy != 'selly'" label="E-Wallet">
                  <option v-for="metode in dataMetodeBayarEWal" :value="metode.id">{{ metode.nama }}</option>
                </optgroup>
                <optgroup v-if="selectSalesBy != 'selly'" label="Kartu Kredit">
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
          <hr class="mb-1 mt-2">
          <p class="p-0 m-0 fs--1 text-center">Tekan 'Confirm' untuk menyelesaikan</p>
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
                            <span class="badge rounded-pill" :class="member.tipe_konsumen.id == '1' ? 'badge-subtle-success' : member.tipe_konsumen.id == '2' ? 'badge-subtle-warning' : member.tipe_konsumen.id == '3' ? 'badge-subtle-primary' : ''">
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
                      <label class="form-label mb-1" for="nama_member">Name</label>
                      <input v-model="dataInputMember.nama" class="form-control bg-transparent" id="nama_member" type="text" placeholder="Masukkan nama lengkap">
                    </div>
                    <div class="mb-1">
                      <label class="form-label mb-1" for="no_hp_member">No Hp</label>
                      <input v-model="dataInputMember.no_hp" class="form-control bg-transparent" id="no_hp_member" type="text" placeholder="Masukkan nomor handpone">
                    </div>
                    <div class="mb-1">
                      <label class="form-label mb-1" for="email_member">Email address</label>
                      <input v-model="dataInputMember.email" class="form-control bg-transparent" id="email_member" type="email" placeholder="email@example.com">
                    </div>
                    <div class="mb-1">
                      <label class="form-label mb-1" for="select_jk_member">Jenis Kelamin</label>
                      <select v-model="dataInputMember.jenis_kelamin" class="form-select bg-transparent" id="select_jk_member">
                        <option value="">Pilih jenis kelamin</option>
                        <option value="male">Laki-laki</option>
                        <option value="female">Perempuan</option>
                        <option value="other">Lainnya</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label mb-1" for="tanggal_lahir">Tanggal Lahir</label>
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
                    <label class="form-label mb-1" for="edit_nama_member">Name</label>
                    <input v-model="dataInputMember.nama" class="form-control bg-transparent" id="edit_nama_member" type="text" placeholder="Masukkan nama lengkap">
                  </div>
                  <div class="mb-1">
                    <label class="form-label mb-1" for="edit_no_hp_member">No Hp</label>
                    <input v-model="dataInputMember.no_hp" class="form-control bg-transparent" id="edit_no_hp_member" type="text" placeholder="Masukkan nomor handpone">
                  </div>
                  <div class="mb-1">
                    <label class="form-label mb-1" for="edit_email_member">Email address</label>
                    <input v-model="dataInputMember.email" class="form-control bg-transparent" id="edit_email_member" type="email" placeholder="email@example.com">
                  </div>
                  <div class="mb-1">
                    <label class="form-label mb-1" for="edit_select_jk_member">Jenis Kelamin</label>
                    <select v-model="dataInputMember.jenis_kelamin" class="form-select bg-transparent" id="edit_select_jk_member">
                      <option value="">Pilih jenis kelamin</option>
                      <option value="male">Laki-laki</option>
                      <option value="female">Perempuan</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label class="form-label mb-1" for="edit_tanggal_lahir">Tanggal Lahir</label>
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

  <div class="modal fade" id="modalConfirmPay" ref="modalConfirmPay" data-bs-keyboard="false" data-bs-backdrop="static" tabindex="-1" aria-labelledby="modalConfirmPayLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 500px">
      <div class="modal-content border-0">
        <div class="modal-body p-0">
          <div class="card">
            <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-1-left.png); background-position: left; background-size: cover;"></div>
            <div class="card-body position-relative p-0">
              <div class="rounded-top-3 py-3 text-center">
                <img src="@/assets/img/mtsiconland.png" width="200" alt="" />
                <div class="fs--2 mt-2 px-5 mx-2">
                  <hr class="m-0 mb-1">
                  Jl. Pulo Kambing II No.1, RW.11, Jatinegara, Kec. Cakung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13930
                  <br>
                  021 59407217
                </div>
              </div>
              <div class="p-3 py-0">
                <hr class="p-0 m-0 mb-2">
                <div class="d-flex justify-content-between fs--1 mb-0">
                  <p class="fs--1 m-0">
                    BSC: David Simbolon
                  </p>
                  <span class="fs--1">{{ formattedDateNow }}</span>
                </div>
                <div class="d-flex justify-content-between fs--1 mb-2">
                  <p class="fs--1 m-0">
                    Member: {{ Object.keys(memberOverview).length > 0 ? memberOverview.nama : '' }}
                    ({{ Object.keys(memberOverview).length > 0 ? $root.formatPrice(memberOverview.point) : '' }} Point)
                  </p>
                  <span class="fs--1">{{ formattedTimeNow }}</span>
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
                      <th class="ps-0 py-1" style="font-weight: normal;">Hemat Produk </th>
                      <th class="pe-0 py-1 text-end text-dark">-Rp 15.000</th>
                    </tr>
                    <tr class="border-bottom">
                      <th class="ps-0 py-1" style="font-weight: normal;">Diskon </th>
                      <th class="pe-0 py-1 text-end text-dark">-Rp 5.000</th>
                    </tr>
                    <tr class="border-bottom">
                      <th class="ps-0 py-1" style="font-weight: normal;">Total Bayar </th>
                      <th class="pe-0 fs-1 py-0 text-end text-warning">Rp {{ $root.formatPrice(totalBayarPrice) }}</th>
                    </tr>
                  </tbody>
                </table>
    
                <div class="d-flex align-items-center justify-content-between mb-1">
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
                </div>
                <div class="d-flex align-items-center justify-content-between rounded-3 bg-body-tertiary ps-2 py-1 py-0">
                  <div class="w-35">
                    <img class="img-icon-po2" :src="'src/assets/img/po-img/' + selectedMetodeBayar.image" />
                  </div>
                  <div class="w-40 me-2 text-end">
                    <input v-if="selectedMetodeBayar.kode != 'cash' && selectedMetodeBayar.kode != 'karyawan'" v-model="modelInputSelectedMetodeBayar" id="inputSelectedMetodeBayar" @input="modelInputSelectedMetodeBayar = onChangeCheckNumberVal($event)" class="form-control form-control-sm" type="text" :placeholder="selectedMetodeBayar.kode == 'ewal' ? 'Nomor telepon' : '4 digit nomor' " />
                    <i v-if="selectedMetodeBayar.kode == 'cash'" class="fs--1">Pembayaran Cash</i>
                    <i v-if="selectedMetodeBayar.kode == 'karyawan'" class="fs--1">Karyawan</i>
                  </div>
                  <div class="w-25">
                    <input class="form-control form-control-sm text-end" id="inputSelectedNominalMetode" @input="onChangeCheckVal($event)" type="text" :value="$root.formatPrice(calculateTotalBayarPrice)" disabled />
                  </div>
                </div>
                
                <div v-for="(metode, index) in dataMoreMetodeBayar" :key="index" class="d-flex align-items-center justify-content-between rounded-3 bg-body-tertiary ps-2 py-1 mt-1">
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
                </div>
    
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
                      <input class="form-control form-control-sm" type="text" placeholder="Cash diberikan" />
                    </div>
                    <div class="col-md-6 d-flex align-items-center justify-content-between">
                      <label class="form-lable mb-0 me-1">Kembalian:</label>
                      <label class="form-lable mb-0">Rp. 10.000</label>
                    </div>
                  </div>
                </div>
                
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
        <div class="modal-body p-0 pb-2">
          <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
            <h3 class="mb-1" id="modalExampleDemoLabel">Konfirmasi Pesanan</h3>
          </div>
          <div class="py-2 text-center">
            <div class="d-flex justify-content-center mb-2">
              <img src="@/assets/img/icons/gif/warning-icon-2.gif" height="60" alt="">
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
      <span class="fs--1 mb-1">Keterangan: </span>
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

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import imageMts from '@/assets/img/mtsiconland.png';

export default {
  name: 'SalesPage',
  data() {
    return {
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
      dataAllMasterSalesBy: [],

      // Metode bayar
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

      memberOverview: {},

      subTotalPrice: 0,
      diskonPrice: 0,
      totalBayarPrice: 0,
      calculateTotalBayarPrice: 0,
      nominalMoreMetodeBayar: [],
      tempValueInputMoreMetode: 0,

      // For register new member
      dataInputMember: {
        id: '',
        nama: '',
        no_hp: '',
        email: '',
        jenis_kelamin: '',
        tanggal_lahir: '',
      },

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
    async loadAlldatas(){
      try {
        const getAllDataSales = await axios({
          method: 'get',
          url: this.hostUrl + '/sales',
          // withCredentials: false,
        });
        const allData = getAllDataSales.data;
        this.dataBrandProduct = allData.getAllBrand; //All Brand
        // allData.getAllMember.forEach(member => {
        //   member.tanggal_lahir = this.$root.formatDate(member.tanggal_lahir);
        // });
        this.dataAllMembers = allData.getAllMember; //All Member
        this.dataAllGelars = allData.getAllGelar; //All Gelar
        this.dataAllKodeResellers = allData.getAllKodeReseller; //All Kode Reseller
        this.dataAllKodeToko = allData.getAllKodeToko; //All Kode Toko
        this.select_kode_toko = allData.getAllKodeToko[0].id;
        this.dataAllMetodeBayar = allData.getAllMetodeBayar; //All Metode Bayar
        this.dataAllMasterSalesBy = allData.getAllMasterSalesBy; //All Master Sales By
        this.metodeBayarCash = this.dataAllMetodeBayar.find((m) => m.kode == 'cash'); // Metode Bayar Cash
        this.metodeBayarKaryawan = this.dataAllMetodeBayar.find((m) => m.kode == 'karyawan'); // Metode Bayar Karyawan
        allData.getAllMetodeBayar.forEach(metode => {
          if(metode.kode === 'tf'){
            this.dataMetodeBayarTF.push(metode);
          }
          if(metode.kode === 'ewal'){
            this.dataMetodeBayarEWal.push(metode);
          }
          if(metode.kode === 'cc'){
            this.dataMetodeBayarCC.push(metode);
          }
        });

        const getAllProduct = await axios({
          method: 'get',
          url: this.hostUrl + '/sales/getAllProduct',
        });
        this.dataAllProducts = getAllProduct.data;

        this.$root.hideLoading();
      } catch (error) {
        console.log(error);
      }
    },

    async storeNewMember(){
      try{
        $('#modalFindMember').modal('hide');
        this.$root.showLoading();
        const store = await axios({
          method: 'post',
          url: this.hostUrl + '/sales/storeNewMember',
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

    async updateEditDataMember(){
      try{
        $('#modalEditMember').modal('hide');
        this.$root.showLoading();
        const store = await axios({
          method: 'put',
          url: this.hostUrl + '/sales/updateDataMember',
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

    openModalFindOrRegis(){
      this.memberFindOrRegis = true;
      for (let prop in this.dataInputMember) {
        this.dataInputMember[prop] = '';
      }
      $('#modalEditMember').modal('hide');
      $('#modalFindMember').modal('show');
    },

    selectEditMemberForm(member){
      for (let prop in this.dataInputMember) {
        console.log(member[prop]);
        this.dataInputMember[prop] = member[prop];
      }

      $('#modalFindMember').modal('hide');
      $('#modalEditMember').modal('show');
    },

    onChangeSelectedMetodeBayar(){
      this.validasiMetodePembayaran = [];
      this.selectedMetodeBayar = {};
      this.invalidMetodePembayaran = false;
    },

    addMoreMetodeBayar(metode){
       // Metode pembayaran tidak boleh lebih dari 3
      // if(this.dataMoreMetodeBayar.length > 1){
      //   this.$root.showAlertFunction('info', 'Ops...!', 'Metode pembayaran sudah mencapai batas (Maksimal 3).');
      //   return false;
      // }
      
      // Metode pembayaran yang sama tidak boleh bertambah
      const existingMetode = this.dataMoreMetodeBayar.find((m) => m.id === metode.id);
      if(existingMetode || metode.id === this.selectedMetodeBayar.id){
        return false;
      }
      
      // Validasi jika ada metode pembayaran cash
      if(metode.kode == 'cash'){
        this.checkMetodeCashSelect = true;
      }

      // Metode pembayaran kartu kredit tidak dapat dikombinasikan atau ditambahkan jika sudah ada yang lain
      // if(this.selectedMetodeBayar.kode !== 'cc'){
      //   if(metode.kode === 'cc'){
      //     this.$root.showAlertFunction('info', 'Ops...!', "Metode pembayaran 'Kredit' tidak dapat dikombinasi.");
      //     return false;
      //   }
      // }

      // Hanya boleh metode pembayaran kartu kredit jika dipilih dari awal
      // if(this.selectedMetodeBayar.kode === 'cc'){
      //   this.$root.showAlertFunction('info', 'Ops...!', 'Metode pembayaran hanya boleh Kartu Kredit.');
      //   return false;
      // }

      // Hanya boleh metode pembayaran karyawan jika dipilih dari awal
      // if(this.selectedMetodeBayar.kode === 'karyawan'){
      //   this.$root.showAlertFunction('info', 'Ops...!', 'Metode pembayaran hanya boleh Karyawan.');
      //   return false;
      // }

      // Metode pembayaran debit dan kartu kredit tidak dapat dikombinasikan
      // if(
      //   (this.selectedMetodeBayar.kode === 'cc' && metode.kode === 'tf') || 
      //   (this.selectedMetodeBayar.kode === 'tf' && metode.kode === 'cc')
      // ){
      //   this.$root.showAlertFunction('info', 'Ops...!', "Metode pembayaran 'Debit' dan 'Kredit' tidak dapat dikombinasi.");
      //   return false;
      // }

      // Metode pembayaran debit tidak boleh lebih dari 1
      // const existingMetodeDebit = this.dataMoreMetodeBayar.find((m) => m.kode === 'tf');
      // if((this.selectedMetodeBayar.kode === 'tf' && metode.kode === 'tf') || (existingMetodeDebit && metode.kode === 'tf')){
      //   this.$root.showAlertFunction('info', 'Ops...!', "Metode pembayaran 'Debit' tidak boleh lebih.");
      //   return false;
      // }

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

        // Validasi jika ada metode pembayaran cash
        if(metode.kode == 'cash'){
          this.checkMetodeCashSelect = false;
        }
      } else {
        console.log('Metode bayar not found');
      }
    },

    batalModalCheckoutConfirm(){
      this.dataMoreMetodeBayar = [];
      this.validasiMetodePembayaran = [];
      this.nominalMoreMetodeBayar = [];
      this.getCheckGelarPembelian = {};
      this.calculateTotalMoreMetode();
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
      
      const findMetodeBayar = this.dataAllMetodeBayar.find((metode) => metode.id === this.selectMethodPayment);

      // Penentuan tambahan metode pembayaran pada struk checkout apa saja berdasarkan logic
      this.validasiMetodePembayaran = this.dataAllMetodeBayar.filter((metode) => {
        if(findMetodeBayar.kode != 'cc' && findMetodeBayar.kode != 'karyawan' && this.selectSalesBy != 'selly'){
          if(this.selectSalesBy != 'wi'){
            return metode.kode != 'cash' && metode.kode != 'cc' && metode.kode != 'karyawan';
          }else{
            return metode.kode != 'cc' && metode.kode != 'karyawan';
          }
        }
      });

      // Tentukan metode pembayaran pertama
      if(findMetodeBayar){
        this.selectedMetodeBayar = findMetodeBayar;
      }

      // Validasi jika ada metode pembayaran cash
      if(findMetodeBayar.kode == 'cash'){
        this.checkMetodeCashSelect = true;
      }else{
        this.checkMetodeCashSelect = false;
      }
      
      var checkGelarPembelian = this.checkValidasiGelarMember();
      this.getCheckGelarPembelian = checkGelarPembelian;

      $('#modalConfirmPay').modal('show');

      // this.generatePdfCheckout();
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
      
        if(selectedMetodeBayar.kode != 'cash' && selectedMetodeBayar.kode != 'karyawan'){
          var inputSelectedMetodeBayar = $("#inputSelectedMetodeBayar");
          var inputSelectedMetodeBayarVal = inputSelectedMetodeBayar.val().trim();
  
          if (inputSelectedMetodeBayarVal === "" ){
            inputSelectedMetodeBayar.addClass('border-red');
            result = false;
          }
        }

        for(let i=0; i < dataMoreMetodeBayar.length; i++){
          if(dataMoreMetodeBayar[i].kode != 'cash' && dataMoreMetodeBayar[i].kode != 'karyawan'){
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

    generatePdfCheckout(){
      const docStruk = new jsPDF();
      const imgDataMts = imageMts;
      
      // Mengukur halaman dokumen
      const pageWidth = docStruk.internal.pageSize.width;
      const pageHeight = docStruk.internal.pageSize.height;

      const imgWidth = 90;
      const imgHeight = 17;

      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      docStruk.addImage(imgDataMts, 'PNG', x, 14, imgWidth, imgHeight);
      const tableProps = {
        startY: 35,
      };

      autoTable(docStruk, {
        ...tableProps,
        body: [
          [
            {
              content: 'Jl. Pulo Kambing II No.1, RW.11, Jatinegara, Kec. Cakung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13930',
              styles: {
                halign: 'center',
                fontSize: 11,
                cellPadding: [0, 20, 0, 20],
              }
            }
          ],

          [
            {
              content: '021 59407217',
              styles: {
                halign: 'center',
                fontSize: 11,
                cellPadding: [0, 0, 0, 0],
              }
            }
          ],
        ],
        theme: 'plain',
      });

      const startY1 = docStruk.autoTable.previous.finalY; // Mengambil posisi Y terakhir tabel
      const lineY1 = startY1 + 3; // Atur tinggi garis horizontal
      docStruk.setDrawColor(0); // Warna garis
      docStruk.setLineWidth(0.4); // Lebar garis
      docStruk.line(10, lineY1, 200, lineY1);

      autoTable(docStruk, {
        body: [
          [
            {
              content: 'Ringkasan Produk:',
              styles: {
                halign: 'left',
                fontSize: 11,
                cellPadding: [0, 0, 1, 0],
              }
            },
            {
              content: '',
              styles: {
                halign: 'right',
                fontSize: 11,
                cellPadding: [0, 0, 1, 0],
              }
            }
          ],

          [
            {
              content: '3x OUR IN ONE GENTLE FACE & BODY WASH 245ml',
              styles: {
                halign: 'left',
                fontSize: 11,
                cellPadding: [1, 0, 0, 0],
              }
            },
            {
              content: '30.000',
              styles: {
                halign: 'right',
                fontSize: 11,
                cellPadding: [1, 0, 0, 0],
              }
            }
          ],
          [
            {
              content: '2x RN RHENZA BELLE WOMAN PARFUM 24/100',
              styles: {
                halign: 'left',
                fontSize: 11,
                cellPadding: [1, 0, 0, 0],
              }
            },
            {
              content: '78.000',
              styles: {
                halign: 'right',
                fontSize: 11,
                cellPadding: [1, 0, 0, 0],
              }
            }
          ]
        ],
        theme: 'plain',
      });

      const startY2 = docStruk.autoTable.previous.finalY; // Mengambil posisi Y terakhir tabel
      const lineY2 = startY2 + 3; // Atur tinggi garis horizontal
      docStruk.setDrawColor(0); // Warna garis
      docStruk.setLineWidth(0.4); // Lebar garis
      docStruk.line(10, lineY2, 200, lineY2);

      // return docStruk.save('Struk Belanja');
      const pdfDataUri = docStruk.output('datauristring');
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

      this.generatePdfCheckout();
    },
  },
}
</script>

<style scope>
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
  max-width: 145px;
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