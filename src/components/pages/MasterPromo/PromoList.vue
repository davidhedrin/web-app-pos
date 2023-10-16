<template>
  <div class="card mb-3">
    <div class="card-header d-flex align-items-center justify-content-between">
      <h5 class="mb-0">Master Promo</h5>
      <button class="btn btn-falcon-default btn-sm me-2" type="button" data-bs-toggle="modal"
        data-bs-target="#modalAddNewPromo">
        <span class="fas fa-ticket-alt"></span>
        <span class="d-none d-xl-inline-block ms-1">Tambah</span>
      </button>
    </div>
  </div>

  <div class="card">
    <div class="bg-holder d-none d-lg-block bg-card"
      style="background-image:url(src/assets/img/illustration/corner-4.png);"></div>
    <div class="card-body position-relative">
      <div class="table-scrollable-wrapper" style="min-height: 0; max-height: 600px;">
        <table class="table table-scrollable table-sm">
          <thead>
            <tr class="p-0">
              <th class="py-1 bg-white">#</th>
              <th class="py-1 bg-white">Kode Promo</th>
              <th class="py-1 bg-white">Nama Promo</th>
              <th class="py-1 bg-white">Start Date</th>
              <th class="py-1 bg-white">End Date</th>
              <th class="py-1 bg-white">Tipe</th>
              <th class="text-end py-1 bg-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><span class="badge rounded-pill bg-success fs--1">Flash Sale</span></td>
              <td>10.10</td>
              <td>10 Oktober 2023</td>
              <td>15 Oktober 2023</td>
              <td><span class="badge badge rounded-pill badge-subtle-primary fs--1">Percent %</span></td>
              <td class="text-end">
                <div>
                  <button class="btn btn-link p-0" type="button" data-bs-toggle="tooltip" data-bs-placement="top"
                    title="Edit">
                    <span class="fas fa-edit text-warning"></span>
                  </button>
                  <button class="btn btn-link p-0 ms-2" type="button" data-bs-toggle="tooltip" data-bs-placement="top"
                    title="Delete">
                    <span class="fas fa-trash-alt text-danger"></span>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td><span class="badge rounded-pill bg-danger fs--1">Promo</span></td>
              <td>Promo Akhir Bulan</td>
              <td>21 Agustus 2023</td>
              <td>30 Agustus 2023</td>
              <td><span class="badge badge rounded-pill badge-subtle-info fs--1">Bundle</span></td>
              <td class="text-end">
                <div>
                  <button class="btn btn-link p-0" type="button" data-bs-toggle="tooltip" data-bs-placement="top"
                    title="Edit">
                    <span class="fas fa-edit text-warning"></span>
                  </button>
                  <button class="btn btn-link p-0 ms-2" type="button" data-bs-toggle="tooltip" data-bs-placement="top"
                    title="Delete">
                    <span class="fas fa-trash-alt text-danger"></span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modalAddNewPromo" tabindex="-1" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content position-relative border-0">
        <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
          <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div class="card">
            <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(src/assets/img/illustration/corner-4-left.png); background-position: left; background-size: cover;"></div>
            <div class="card-body position-relative p-0">
              <div class="rounded-top-3 py-3 ps-4 pe-6">
                <h5 class="mb-1" id="modalExampleDemoLabel">Buat Promo Baru</h5>
              </div>
              <div class="p-4 pb-2 pt-1">
                <div class="row">
                  <div class="col-6 mb-2">
                    <label class="form-label mb-1" for="select_kode_promo">Kode Promo <span class="text-danger">*</span></label>
                    <select v-model="dataAddNewPromo.selectKodePromo" class="form-select bg-transparent" id="select_kode_promo" aria-label="Default select example">
                      <option value="">Pilih kode promo</option>
                      <option value="1">Flash Sale</option>
                      <option value="2">Promo</option>
                    </select>
                  </div>
                  <div class="col-6 mb-2">
                    <label class="form-label mb-1" for="select_tipe_promo">Tipe Promo <span class="text-danger">*</span></label>
                    <select v-model="dataAddNewPromo.selectTipePromo" class="form-select bg-transparent" id="select_tipe_promo" aria-label="Default select example">
                      <option value="">Pilih tipe promo</option>
                      <option value="1">Bundle (Buy & Get Free)</option>
                      <option value="2">Percent (%)</option>
                    </select>
                  </div>
                  <div class="col 12">
                    <div v-if="dataAddNewPromo.selectTipePromo == '1'" class="row mb-2">
                      <div class="col-md-6">
                        <label class="form-label mb-1" for="input_buy_tipe_bundle">Buy Unit <span class="text-danger">*</span></label>
                        <input class="form-control bg-transparent" type="number" min="1" id="input_buy_tipe_bundle" placeholder="Masukkan jumlah beli">
                      </div>
                      <div class="col-md-6">
                        <label class="form-label mb-1" for="input_get_tipe_bundle">Get Unit <span class="text-danger">*</span></label>
                        <input class="form-control bg-transparent" type="number" min="1" id="input_get_tipe_bundle" placeholder="Masukkan jumlah free">
                      </div>
                    </div>
                    <div v-else-if="dataAddNewPromo.selectTipePromo == '2'" class="mb-2">
                      <label class="form-label mb-1" for="input_tipe_percent">Nilai Persen <span class="text-danger">*</span></label>
                      <input class="form-control bg-transparent" type="number" min="1" max="100" id="input_tipe_percent" placeholder="Masukkan nilai persen">
                    </div>
                  </div>
                  <div class="col-12 mb-2">
                    <label class="form-label mb-1" for="input_nama_promo">Nama Promo <span class="text-danger">*</span></label>
                    <input class="form-control bg-transparent" type="text" id="input_nama_promo" placeholder="Masukkan nama promo">
                  </div>
                  <div class="col-6 mb-2">
                    <label class="form-label mb-1" for="tanggal_mulai">Tanggal Mulai <span class="text-danger">*</span></label>
                    <input class="form-control bg-transparent" id="tanggal_mulai" type="date">
                  </div>
                  <div class="col-6 mb-2">
                    <label class="form-label mb-1" for="tanggal_akhir">Tanggal Berakhir <span class="text-danger">*</span></label>
                    <input class="form-control bg-transparent" id="tanggal_akhir" type="date">
                  </div>
                  <div class="col-12">
                    <label class="form-label mb-1" for="keterangan">Keterangan</label>
                    <textarea class="form-control bg-transparent" id="keterangan" placeholder="Keterangan jika ada"></textarea>
                  </div>
                  <div class="col-12 mt-3">
                    <i>Field dengan tanda <span class="text-danger">*</span> wajib untuk diisi</i>
                  </div>
                </div>
              </div>
              <div class="text-end px-4 pt-0 pb-3">
                <button class="btn btn-secondary me-2" type="button" data-bs-dismiss="modal">Close</button>
                <button class="btn btn-primary" type="button">Simpan</button>
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
  name: 'PromoList',
  data() {
    return {
      dataAddNewPromo: {
        selectKodePromo: '',
        selectTipePromo: '',
        inputBuyTipeBundle: null,
        inputGetTipeBundle: null,
        inputNamaPromo: null,
        tanggalMulai: null,
        tanggalAkhir: null,
        keterangan: null,
      }
    }
  },
  beforeMount() {
    this.loadAllData();
  },
  methods: {
    async loadAllData() {

    }
  }
}
</script>