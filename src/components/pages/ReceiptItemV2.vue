<template>
  <div class="d-flex align-items-center mb-3 mt-1">
    <span class="badge rounded me-3 ms-1 badge-subtle-primary">
      <span class="fas fa-dolly fs-2 text-primary"></span>
    </span>
    <div class="col">
      <h5 class="mb-0 text-primary position-relative">
        <span class="bg-200 dark__bg-1100 pe-3 fs-2">Penerimaan Barang</span>
        <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
      </h5>
      <p class="mb-0 fs--1"><a href="javascript:void(0)" class="text-dark">Martha Tilaar Shop</a> / Penerimaan Barang</p>
    </div>
  </div>
  
  <div class="card shadow-none border mb-3">
    <div class="bg-holder bg-card d-none d-md-block" style="background-image:url('assets/img/illustration/reports-bg.png');"></div><!--/.bg-holder-->
    <div class="card-header z-1">
      <div class="row flex-between-center gx-0">
        <div class="col-lg-auto d-flex align-items-center"><img class="img-fluid" src="@/assets/img/illustration/reports-greeting.png" alt="">
          <div class="ms-x1">
            <h6 class="mb-1 text-primary">Martha Tilaar Shop</h6>
            <h4 class="mb-0 text-primary fw-bold"><span class="text-info fw-medium">Penerimaan Barang</span></h4>
          </div>
        </div>
        <div class="col-lg-auto pt-3 pt-lg-0">
          <button class="btn btn-primary" type="button" @click="clickNew()">
            New
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <Pages>
    <div>
      <!------------------------>

      <!-- <div style="text-align: right">
        <button type="button" class="btn btn-success" @click="clickNew()">
          NEW
        </button>
      </div> -->
      <div class="block-content">
        <div id="wrapper2"></div>
        <div id="box"></div>
      </div>

      <!------------------------>
    </div>

    <!-- modals -->
    <Teleport to="body">
      <!-------------------------------------------------------->
      <FormModal
        :show="showModal11"
        :style="showmodal11_zindex"
        @close2="showModal11 = false"
      >
        <template #header>
          <h4>Browse Data From Delivery Order</h4>
        </template>
        <template #body>
          <div style="width: 90vw">
            <template v-if="flagGetHeaderDN == false">
              <button
                class="btn btn-success btn-sm me-1"
                @click="getpagingPenerimaanBarangV2fromDN()"
              >
                Get data from DO
              </button>
            </template>
            <div class="block-content">
              <div class="block-content">
                <div id="wrapper11"></div>
                <div id="box11"></div>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <button
            class="modal-default-button btn btn-secondary btn-sm me-1"
            @click="close11"
          >
            Close
          </button>
        </template>
      </FormModal>
      <!-------------------------------------------------------->

      <!-- use the modal component, pass in the prop -->

      <FormModal
        :show="showModal"
        :style="showmodal_zindex"
        @close="showModal = false"
      >
        <template #header>
          <h4>Goods Receipt Form</h4>
          <button type="button" class="btn-close" @click="close"></button>
        </template>
        <template #body>
          <div style="width: 90vw">
            <!-- <div class="table-responsive">
              <table
                class="table table-borderless"
                style="background-color: #f5f7fa"
              >
                <tbody>
                  <tr>
                    <td class="text-left" width="10">Doc Number</td>
                    <td class="text-left" width="1">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{ dataTr301.docNum == "" ? "-" : dataTr301.docNum }}
                      </strong>
                    </td>
                    <td class="text-left" width="10">Doc Status</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr301.docStatus == undefined
                            ? "-"
                            : dataTr301.docStatus == "O"
                            ? "Open"
                            : "Close"
                        }}</strong
                      >
                    </td>
                    <td class="text-left" width="10">Reff Number</td>
                    <td class="text-left" width="1">:</td>
                    <td class="text-success text-left">
                      <template v-if="idRincian == ''">
                        <button
                          class="btn btn-success btn-sm me-1"
                          @click="clickReffNo"
                        >
                          Browse
                        </button>
                      </template>
                      <strong>
                        {{
                          dataTr301.reffNo == undefined ? "-" : dataTr301.reffNo
                        }}
                      </strong>
                    </td>
                    <td class="text-left" width="10">Doc Date</td>
                    <td class="text-left" width="1">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr301.docDate == undefined
                            ? "-"
                            : dataTr301.docDate
                        }}
                      </strong>
                    </td>
                  </tr>

                  <tr>
                    <td class="text-left">Store Code</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr301.storeCode == undefined
                            ? "-"
                            : dataTr301.storeCode
                        }}
                      </strong>
                    </td>
                    <td class="text-left">Store Name</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong
                        >{{
                          dataTr301.storeName == undefined
                            ? "-"
                            : dataTr301.storeName
                        }}
                      </strong>
                    </td>
                    <td class="text-left">Reference</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr301.reference == undefined
                            ? "-"
                            : dataTr301.reference
                        }}</strong
                      >
                    </td>
                    <td class="text-left">&nbsp;</td>
                    <td class="text-left">&nbsp;</td>
                    <td class="text-success text-left">&nbsp;</td>
                  </tr>

                  <tr>
                    <td class="text-left">Warehouse Code</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <template v-if="idRincian != ''">
                        <v-select
                          :options="getCboWhsCodeInventoryOptions"
                          v-model="tmp_getCboWhsCodeInventoryOptions"
                          @update:modelValue="mySelectEvent2()"
                          :clearable="false"
                          :disabled="dataTr301.docStatus == 'C'"
                        ></v-select>
                      </template>
                    </td>
                    <td class="text-left">Price Code</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <template v-if="idRincian != ''">
                        <v-select
                          :options="getCboPriceCodeInventoryOptions"
                          v-model="tmp_getCboPriceCodeInventoryOptions"
                          @update:modelValue="mySelectEvent22()"
                          :clearable="false"
                          :disabled="dataTr301.docStatus == 'C'"
                        ></v-select>
                      </template>
                    </td>

                    <td class="text-left">Discout Code</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <template v-if="idRincian != ''">
                        <v-select
                          :options="getCboDiscCodeInventoryOptions"
                          v-model="tmp_getCboDiscCodeInventoryOptions"
                          @update:modelValue="mySelectEvent222()"
                          :clearable="false"
                          :disabled="dataTr301.docStatus == 'C'"
                        ></v-select>
                      </template>
                    </td>
                    <td class="text-left">&nbsp;</td>
                    <td class="text-left">&nbsp;</td>
                    <td class="text-success text-left">&nbsp;</td>
                  </tr>

                  <tr>
                    <td class="text-left">Comments</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left" colspan="4">
                      <template v-if="idRincian != ''">
                        <textarea
                          id="w3review"
                          name="w3review"
                          rows="5"
                          cols="60"
                          v-model="dataTr301.comments"
                          placeholder="Kosongkan jika tidak ada selisih penerimaan"
                          :disabled="dataTr301.docStatus == 'C'"
                        ></textarea>
                      </template>
                    </td>

                    <td class="text-left">&nbsp;</td>
                    <td class="text-left">&nbsp;</td>
                    <td class="text-success text-left">&nbsp;</td>
                    <td class="text-left">&nbsp;</td>
                    <td class="text-left">&nbsp;</td>
                    <td class="text-success text-left">&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div> -->
            
            <div class="card">
              <div class="card-header">
                <div class="row align-items-start">
                  <div class="col-md-4 text-center mb-2">
                    <span class="fs--1"><u>Doc No</u></span>
                    <h5>
                      {{ dataTr301.docNum == undefined || dataTr301.docNum == "" ? "-" : dataTr301.docNum }}
                    </h5>
                  </div>
                  <div class="col-md-4 text-center mb-2">
                    <span class="fs--1"><u>Doc Status</u></span>
                    <h5>
                      {{
                        dataTr301.docStatus == undefined
                          ? "-"
                          : dataTr301.docStatus == "O"
                          ? "Open"
                          : "Close"
                      }}
                    </h5>
                  </div>
                  <div class="col-md-4 text-center mb-2">
                    <span class="fs--1"><u>Reff No</u></span>
                    <h5>
                      {{
                        dataTr301.reffNo == undefined ? "-" : dataTr301.reffNo
                      }}
                    </h5>
                  </div>
                  <div class="col-md-4 text-center mb-2">
                    <span class="fs--1"><u>Doc Date</u></span>
                    <h5>
                      {{
                        dataTr301.docDate == undefined
                          ? "-"
                          : dataTr301.docDate
                      }}
                    </h5>
                  </div>
                  <div class="col-md-4 text-center mb-2">
                    <span class="fs--1"><u>Store Code</u></span>
                    <h5>
                      {{
                        dataTr301.storeCode == undefined
                          ? "-"
                          : dataTr301.storeCode
                      }}
                    </h5>
                  </div>
                  <div class="col-md-4 text-center mb-2">
                    <span class="fs--1"><u>Store Name</u></span>
                    <h5>
                      {{
                        dataTr301.storeName == undefined
                          ? "-"
                          : dataTr301.storeName
                      }}
                    </h5>
                  </div>
                  <div class="col-md-4 text-center mb-2">
                    <span class="fs--1"><u>Reference</u></span>
                    <div v-if="idRincian == ''">
                      <button class="btn btn-sm btn-primary" type="button" @click="clickReffNo()">
                        Browse
                      </button>
                    </div>
                    <h5 v-else>
                      {{
                        dataTr301.reference == undefined
                          ? "-"
                          : dataTr301.reference
                      }}
                        </h5>
                  </div>
                  <div class="col-md-4 text-center mb-2">
                    <span class="fs--1"><u>Total Qty DO</u></span>
                    <h5>
                      {{
                        dataTr301.totalQty == undefined
                          ? "-"
                          : dataTr301.totalQty
                      }}
                    </h5>
                  </div>
                  <div class="col-md-4 text-center mb-2">
                    <span class="fs--1"><u>Total Qty Goods Receipt</u></span>
                    <h5>
                      {{
                        dataTr301.totalQtyTerima == undefined
                          ? "-"
                          : dataTr301.totalQtyTerima
                      }}
                    </h5>
                  </div>
                  <div class="col-md-4 text-center mb-2">
                    <span class="fs--1"><u>WHS Code</u></span>
                    <template v-if="idRincian != ''">
                      <v-select
                        :options="getCboWhsCodeInventoryOptions"
                        v-model="tmp_getCboWhsCodeInventoryOptions"
                        @update:modelValue="mySelectEvent2()"
                        :clearable="false"
                        :disabled="dataTr301.docStatus == 'C'"
                      ></v-select>
                    </template>
                    <h5 v-else>-</h5>
                  </div>
                  <div class="col-md-4 text-center mb-2">
                    <span class="fs--1"><u>Price Code</u></span>
                    <template v-if="idRincian != ''">
                      <v-select
                        :options="getCboPriceCodeInventoryOptions"
                        v-model="tmp_getCboPriceCodeInventoryOptions"
                        @update:modelValue="mySelectEvent22()"
                        :clearable="false"
                        :disabled="dataTr301.docStatus == 'C'"
                      ></v-select>
                    </template>
                    <h5 v-else>-</h5>
                  </div>
                  <div class="col-md-4 text-center mb-2">
                    <span class="fs--1"><u>Discount Code</u></span>
                    <template v-if="idRincian != ''">
                      <v-select
                        :options="getCboDiscCodeInventoryOptions"
                        v-model="tmp_getCboDiscCodeInventoryOptions"
                        @update:modelValue="mySelectEvent222()"
                        :clearable="false"
                        :disabled="dataTr301.docStatus == 'C'"
                      ></v-select>
                    </template>
                    <h5 v-else>-</h5>
                  </div>
                  <div class="col-md-12 text-center mb-2">
                    <span class="fs--1"><u>Remarks</u></span>
                    <template v-if="idRincian != ''">
                      <textarea
                        class="form-control"
                        id="w3review"
                        name="w3review"
                        rows="1"
                        cols="60"
                        v-model="dataTr301.comments"
                        placeholder="Kosongkan jika tidak ada selisih penerimaan"
                        :disabled="dataTr301.docStatus == 'C'"
                      ></textarea>
                    </template>
                    <h5 v-else>-</h5>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <template v-if="flagDownloadPDF == 1">
                <button
                  class="btn btn-sm btn-info"
                  @click="exportToPDFConfirm()"
                >
                  <i class="fas fa-file-pdf"></i> Download
                </button>
            </template>
            <br />
            <br />
            <template v-if="flagUpdate == true">
              <button
                type="button"
                class="btn btn-success"
                @click="getFlagUpdate()"
              >
                Get Data Goods Receipt
              </button>
            </template>

            <div class="block-content">
              <div id="wrapper3"></div>
              <div id="box3"></div>
            </div>

            <template v-if="flagGetData">
              <!-- <button
                class="btn btn-success btn-sm me-1"
                @click="getDataRincian()"
              >
                Get data
              </button> -->
            </template>
            <template v-else>
              <br />
              <div class="text-left">
                <template v-if="dataRincianHeaderIDTR.docStatus != 'C'">
                  <template v-if="total_bpitem_null == 0">
                    <button
                      type="button"
                      class="btn btn-success"
                      @click="savePenerimaanBarang()"
                    >
                      Save Data
                    </button>
                  </template>
                </template>
              </div>
              <div class="text-center">
                <template v-if="status_save_PenerimaanBarang > 0">
                  <template v-if="flagSave == 1">
                    <button
                      type="button"
                      class="btn btn-success"
                      @click="confirmPenerimaanBarang()"
                    >
                      Confirmation Goods Receipt
                    </button>
                  </template>
                </template>
              </div>
            </template>
          </div>
        </template>

        <template #footer>
          <button
            class="modal-default-button btn btn-secondary btn-sm me-1"
            @click="close"
          >
            Close
          </button>
        </template>
      </FormModal>
    </Teleport>
  </Pages>
</template>

<script>
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";

import Pages from "@/components/template/Pages.vue";
import FormInput from "@/components/forms/FormInput.vue";
import Button from "@/components/forms/FormButton.vue";
import FormModal from "@/components/forms/FormModal.vue";
import axios from "axios";
import { ref } from "vue";
import toast from "@/assets/js/toast";

import { Grid, h, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { idID } from "gridjs/l10n";

import $ from "jquery";

import Swal from "sweetalert2";

import html2pdf from "html2pdf.js";

export default {
  components: { Pages, FormInput, Button, FormModal },
  props: {
    params: {
      default: null,
    },
  },
  setup() {
    const headers = [
      // { text: "Kode Role Akses", value: "role_code", sortable: true },
      { text: "Nama Role Akses", value: "role_name", sortable: true },
      { text: "Deskripsi", value: "role_description", sortable: true },
      { text: "Aksi", value: "action" },
    ];

    return {
      headers,
    };
  },
  data() {
    return {
      master_code: this.$root.master_code,
      master_coll: this.$root.master_coll,
      local_storage: this.$root.local_storage,

      title: "Goods Receipt",
      showModal: false,
      showmodal_zindex: "z-index:1030",
      grid2: new Grid(),
      dataTr301: {},

      showModal11: false,
      showmodal11_zindex: "z-index:1031",
      grid11: new Grid(),

      flagGetHeaderDN: false,

      showModal2: false,
      showmodal2_zindex: "z-index:1031;",

      grid3: new Grid(),
      idRincian: "",
      idRincianUpdate: "",
      dataDocNumTRDN: "",

      getCboWhsCodeInventoryOptions: [],
      tmp_getCboWhsCodeInventoryOptions: "",

      getCboPriceCodeInventoryOptions: [],
      tmp_getCboPriceCodeInventoryOptions: "",

      getCboDiscCodeInventoryOptions: [],
      tmp_getCboDiscCodeInventoryOptions: "",

      //////////////////////////////
      flagGetData: true,
      dataRincianHeaderID: {},
      dataRincianDetailID: {},
      total_bpitem_null: 0,
      confirm_approve: 0,
      var_penerimaan_DN: {},
      var_penerimaan_Actual: {},
      status_save_PenerimaanBarang: 0,
      data_CboWhs: "",
      flagSave: 0,
      txtareaBA: "",
      userid: "",

      dataRincianHeaderIDTR: {},
      flagUpdate: false,
      dataTr301_comments: "",

      x_nomor_baris: 0,
      x_count: 0,

      limit_x: 100,
      nomor_x: 1,
      html_pdf: "",
      flagDownloadPDF: 0,
    };
  },
  mounted() {
    const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
    this.getTable();
    this.userid = cacheStoreAccess.user_uuid;
    this.userStoreCode = cacheStoreAccess.store_code;
    this.$root.hideLoading();
  },
  methods: {
    ///////////////////////////////////////////////////
    padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    },
    formatDate(date) {
      return (
        [
          date.getFullYear(),
          this.padTo2Digits(date.getMonth() + 1),
          this.padTo2Digits(date.getDate()),
        ].join("-") +
        " " +
        [
          this.padTo2Digits(date.getHours()),
          this.padTo2Digits(date.getMinutes()),
          this.padTo2Digits(date.getSeconds()),
        ].join(":")
      );
    },
    async exportToPDFConfirm() {
      //alert("AAAA");
      this.$root.showLoading();

      //var tanggal = `${year}` + "-" + months[month] + "-" + `${day}`;
      var data_x = "";
      // var data_x = await this.getDataStockCard(
      //   tmp_storeCode[0].trim(),
      //   tmp_whsCode[0].trim(),
      //   tanggal.trim(),
      //   tmp_itemCode[0].trim()
      // );

      var xxx =
        '<style> p, span, table { font-size: 10px } table { width: 100%; } .borderx { border-bottom: 1px solid black; border-top: 1px solid black; } .bordery { border-top: 1px solid black; } </style> <h4>GOODS RECEIPT</h4><table cellpadding="0"> <tr> <th width="12%">Store Code</th> <th width="40%">: ' +
        this.dataTr301.storeCode +
        '</th> <th width="20%">WHS Code</th> <th>: ' +
        this.tmp_getCboWhsCodeInventoryOptions +
        "</th> </tr> <tr> <th>Store Name</th> <th>: " +
        this.dataTr301.storeName +
        "</th> <th>Price Code</th> <th>: " +
        this.tmp_getCboPriceCodeInventoryOptions +
        "</th> </tr> <tr> <th>Doc No</th> <th>: " +
        (this.dataTr301.docNum == undefined ? "-" : this.dataTr301.docNum) +
        "</th> <th>Reff No</th> <th>: " +
        this.dataTr301.reffNo +
        "</th> </tr> <tr> <th>Doc Status</th> <th>: " +
        (this.dataTr301.docStatus == "O" ? "Open" : "Close") +
        "</th> <th>Doc Date</th> <th>: " +
        this.dataTr301.docDate +
        "</th> </tr> <tr> <th>Reference</th> <th>: " +
        this.dataTr301.reference +
        "</th> <th>Discount Code</th> <th>: " +
        this.tmp_getCboDiscCodeInventoryOptions +
        "</th> </tr> <tr> <th>Total Qty DO</th> <th>: " +
        this.dataTr301.totalQty +
        "</th> <th>Total Qty Goods Receipt</th> <th>: " +
        (this.dataTr301.totalQtyTerima == undefined
          ? "-"
          : this.dataTr301.totalQtyTerima) +
        "</th> </tr> <tr> <th>Remarks</th> <th>: " +
        this.dataTr301.comments +
        "</th> <th>Print Date</th> <th>: " +
        this.formatDate(new Date()) +
        ' </tr> </table><table id="tb-item" cellpadding="4" border="0"> <tr> <th class="borderx">No.</th> <th class="borderx">Item Code</th> <th class="borderx">Item Name</th> <th class="borderx">Batch No</th> <th class="borderx">Exp Date</th> <th style="text-align:right" class="borderx">DO QTy</th> <th style="text-align:right" class="borderx">Actual Qty</th> <th style="text-align:right" class="borderx">Variant</th> </tr>' +
        this.html_pdf +
        '<tr> <th colspan="8" class="bordery"></th></tr> <tr> <th colspan="2" class="">Mengetahui,</th> <th style="text-align:right" colspan="2" class="">Menyetujui,</th> <th style="text-align:right" colspan="2" class="">&nbsp</th> </tr></table>';

      //'<tr> <th colspan="2" class="bordery">Mengetahui,</th> <th style="text-align:right" colspan="2" class="">Menyetujui,</th> <th style="text-align:right" colspan="2" class="">&nbsp</th> </tr>

      this.$root.hideLoading();

      var element = xxx;
      var opt = {
        //margin: 10,
        margin: [10, 10, 0, 10], //top, left, buttom, right,
        //margin: [0, -0.1, 0, 0],
        filename:
          "GOODS_RECEIPT_" +
          this.dataTr301.docNum +
          "_" +
          this.dataTr301.docStatus +
          ".pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { dpi: 300, letterRendering: true },
        //jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { before: ".newPage" },
      };

      //this.flagDownloadPDF = 0;

      html2pdf()
        .from(element)
        .set(opt)
        .toPdf()
        .get("pdf")
        .then(function (pdf) {
          var totalPages = pdf.internal.getNumberOfPages();
          //print current pdf width & height to console
          console.log("getHeight:" + pdf.internal.pageSize.getHeight());
          console.log("getWidth:" + pdf.internal.pageSize.getWidth());
          for (var i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(7);
            pdf.setTextColor(150);
            //divided by 2 to go center
            pdf.text(
              "Page " + i + " of " + totalPages,
              pdf.internal.pageSize.getWidth() / 2,
              pdf.internal.pageSize.getHeight() -
                pdf.internal.pageSize.getHeight() / 40
            );
          }
        })
        .save();
    },

    async getTableRincianDataUpdate(id) {
      this.$root.showLoading();
      var mythis = this;

      mythis.nomor_x = 1;
      mythis.html_pdf = "";

      var br_pdf = 1;
      var br_flag = 0;
      var br_string = "";

      var sum_do_qty = 0;
      var sum_actual_qty = 0;
      var sum_variant_qty = 0;

      var nn = 0;
      var count = 1;
      var limitx = 100;
      var offsetx = 0;
      while (count > 0) {
        offsetx = limitx * nn;

        const reqData = await axios({
          method: "get",
          url:
            this.$root.API_ERP +
            "/wms/pagingRincianPenerimaanBarangUpdate/" +
            this.idRincianUpdate +
            "?limit=100&offset=" +
            offsetx,
        });

        const resData = reqData.data;
        mythis.x_nomor_baris = parseInt(resData.nomorBaris);
        mythis.x_count = parseInt(resData.count);
        mythis.status_save_PenerimaanBarang =
          resData.status_save_PenerimaanBarang;
        mythis.total_bpitem_null = resData.total_bpitem_null;
        mythis.confirm_approve = resData.confirm_approve;

        Object.keys(resData.results).forEach(function (key) {
          mythis.var_penerimaan_DN[
            resData.results[key].id + "XXYYZZ" + resData.results[key].itemCode
          ] = resData.results[key].baseQty1;

          mythis.var_penerimaan_Actual[
            resData.results[key].id + "XXYYZZ" + resData.results[key].itemCode
          ] =
            resData.results[key].openQty_save == null
              ? resData.results[key].openQty1
              : resData.results[key].openQty_save;

            br_string = "";
            if (br_pdf == 36 && br_flag == 0) {
              br_pdf = 0;
              br_flag = 1;
              br_string = 'class="newPage"';
              //mythis.html_pdf +='<tr id="newPage"><td colspan="8">&nbsp;</td></tr>';
            }
            if (br_pdf == 45 && br_flag == 1) {
              //mythis.html_pdf +='<tr id="newPage"><td colspan="8">&nbsp;</td></tr>';
              br_pdf = 0;
              br_string = 'class="newPage"';
            }

            if (br_string == 'class="newPage"') {
              //mythis.html_pdf += '<tr ><td colspan="8">&nbsp;</td></tr>';
              //mythis.html_pdf += '<tr ><td colspan="8">&nbsp;</td></tr>';
              mythis.html_pdf +=
                "<tr " +
                br_string +
                '><td colspan="8">&nbsp;</td></tr><tr> <th class="borderx">No.</th> <th class="borderx">Item Code</th> <th class="borderx">Item Name</th> <th class="borderx">Batch No</th> <th class="borderx">Exp Date</th> <th style="text-align:right" class="borderx">DO QTy</th> <th style="text-align:right" class="borderx">Actual Qty</th> <th style="text-align:right" class="borderx">Variant</th> </tr>';
            }

            sum_do_qty += resData.results[key].baseQty1;
            sum_actual_qty += resData.results[key].openQty1;
            sum_variant_qty +=
              resData.results[key].baseQty1 - resData.results[key].openQty1;

            mythis.html_pdf +=
              "<tr " +
              "" +
              'style="font-size: 9px"><th>' +
              mythis.nomor_x +
              "</th><th>" +
              resData.results[key].itemCode1 +
              "</th><th>" +
              resData.results[key].itemName +
              "</th><th>" +
              resData.results[key].batchNo +
              "</th><th>" +
              resData.results[key].expiredDate1 +
              '</th><th style="text-align:center">' +
              resData.results[key].baseQty1 +
              '</th><th style="text-align:center">' +
              resData.results[key].openQty1 +
              '</th><th style="text-align:center">' +
              (resData.results[key].baseQty1 - resData.results[key].openQty1) +
              "</th></tr>";

            mythis.nomor_x++;
            br_pdf++;
        });

        // axios
        //   .get(
        //     this.$root.API_ERP +
        //       "/wms/pagingRincianPenerimaanBarangUpdate/" +
        //       this.idRincianUpdate +
        //       "?limit=100&offset=" +
        //       offsetx
        //   )
        //   .then((res) => {
        //     console.log(res);

        //     mythis.x_nomor_baris = parseInt(res.data.nomorBaris);
        //     mythis.x_count = parseInt(res.data.count);

        //     mythis.status_save_PenerimaanBarang =
        //       res.data.status_save_PenerimaanBarang;
        //     mythis.total_bpitem_null = res.data.total_bpitem_null;
        //     mythis.confirm_approve = res.data.confirm_approve;
        //     //console.log(res.data.results);
        //     Object.keys(res.data.results).forEach(function (key) {
        //       mythis.var_penerimaan_DN[
        //         res.data.results[key].id +
        //           "XXYYZZ" +
        //           res.data.results[key].itemCode
        //       ] = res.data.results[key].baseQty1;

        //       mythis.var_penerimaan_Actual[
        //         res.data.results[key].id +
        //           "XXYYZZ" +
        //           res.data.results[key].itemCode
        //       ] =
        //         res.data.results[key].openQty_save == null
        //           ? res.data.results[key].openQty1
        //           : res.data.results[key].openQty_save;
        //     });
        //   });

        nn = nn + 1;
        //console.log("MASUKK A");
        // console.log("aaa " + mythis.x_count + "<" + mythis.x_nomor_baris);
        if (mythis.x_count < mythis.x_nomor_baris) {
          count = 0;
          //console.log("MASUKK B");
        }
        if (nn >= 30) {
          count = 0;
        }
      }

      mythis.html_pdf +=
        "<tr " +
        "" +
        'style="font-size: 9px"><th>' +
        "&nbsp;" +
        "</th><th>" +
        "&nbsp;" +
        "</th><th>" +
        "TOTAL" +
        "</th><th>" +
        "&nbsp;" +
        "</th><th>" +
        "&nbsp;" +
        '</th><th style="text-align:center">' +
        sum_do_qty +
        '</th><th style="text-align:center">' +
        sum_actual_qty +
        '</th><th style="text-align:center">' +
        sum_variant_qty +
        "</th></tr>";

      this.$root.hideLoading();
    },
    getTableRincianUpdate() {
      //////////////////////////////
      $("#wrapper3").remove();
      var e = $('<div id="wrapper3"></div>');
      $("#box3").append(e);
      this.grid3 = new Grid();
      //////////////////////////////

      this.grid3.updateConfig({
        //language: idID,
        fixedHeader: true,
        height: 500,
        pagination: {
          limit: 50,
          server: {
            url: (prev, page, limit) =>
              `${prev}${prev.includes("?") ? "&" : "?"}limit=${limit}&offset=${
                page * limit
              }`,
          },
        },
        search: {
          server: {
            url: (prev, keyword) => `${prev}?search=${keyword}`,
          },
        },
        columns: [
          { name: "ID", hidden: true },
          {
            name: "#",
            formatter: (_, row) =>
              html(
                `
              <button data-id="${row.cells[0].data}XXYYZZ${row.cells[1].data}" class="btn btn-sm btn-warning text-white" id="changeLock" data-toggle="tooltip" title="View" > <i class="fa fa-retweet" aria-hidden="true"></i></button>
              `
              ),
          },
          {
            id: "No",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>No</b></div>'
            ),
          },
          // {
          //   id: "docEntry",
          //   name: html(
          //     '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Doc Entry</b></div>'
          //   ),
          // },

          {
            id: "bpItem",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>BP Item</b></div>'
            ),
          },

          {
            id: "itemCode",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Item Code</b></div>'
            ),
          },

          {
            id: "itemName",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Item Name</b></div>'
            ),
          },

          {
            id: "batchNo",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Batch No</b></div>'
            ),
          },

          {
            id: "expiredDate",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Expired Date</b></div>'
            ),
          },
          {
            id: "openQty",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>DO Qty</b></div>'
            ),
          },
          {
            id: "actualQty",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Actual Qty</b></div>'
            ),
            // formatter: (_, row) =>
            //   html(
            //     `<input value="${row.cells[9].data}"  type="number" style="width:6em" oninput="this.value = this.value.replace(/\D+/g, '')" />`
            //   ),
          },
          {
            id: "variant",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Variant</b></div>'
            ),
          },
          {
            id: "updatedAt",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Updated Date</b></div>'
            ),
          },
        ],
        style: {
          container: {
            "font-size": "12px",
          },
          table: {
            border: "1px solid #ccc",
            "font-size": "13px",
          },
          th: {
            "background-color": "#CDDDFF",
            color: "#000000",
            "border-bottom": "1px solid #ccc",
            "text-align": "center",
            "z-index": "1002",
          },
          td: {
            "text-align": "center",
            padding: "5px 10px",
          },
        },
        server: {
          url:
            this.$root.API_ERP +
            "/wms/pagingRincianPenerimaanBarangUpdate/" +
            this.idRincianUpdate,
          then: (data) =>
            data.results.map((card) => [
              card.id,
              card.itemCode1,
              (data.nomorBaris += 1),
              //card.docEntry,
              card.bpItem1,

              card.itemCode1 == null
                ? html(
                    "<div style='color: #000;background: #f1aeb5;height: 100%;display: flex;justify-content: center;align-items: center;'>" +
                      "-" +
                      "</div>"
                  )
                : html("<div>" + card.itemCode1 + "</div>"),

              card.itemName,
              card.batchNo,
              card.expiredDate1,

              html("<strong>" + card.baseQty1 + "</strong>"),
              html(
                "<strong>" +
                  '<input id="txt_' +
                  card.id +
                  "XXYYZZ" +
                  card.itemCode1 +
                  '" name="' +
                  card.id +
                  "XXYYZZ" +
                  card.itemCode1 +
                  '"value="' +
                  card.openQty1 +
                  '" type="number" pattern="[0-9]" style="width: 6em" min="1" max="' +
                  card.baseQty1 +
                  '" data-id="' +
                  card.id +
                  "XXYYZZ" +
                  card.itemCode1 +
                  '" readonly>' +
                  "</strong>" +
                  '&nbsp; <b id="lock_' +
                  card.id +
                  "XXYYZZ" +
                  card.itemCode1 +
                  '"><i id="fa_' +
                  card.id +
                  "XXYYZZ" +
                  card.itemCode1 +
                  '"class="fa fa-lock fa-2x" style="color:red"></i></b>'
              ),

              html(
                "<div'>" +
                  '<input id="variant_' +
                  card.id +
                  "XXYYZZ" +
                  card.itemCode1 +
                  '" type="number" value="' +
                  (card.baseQty1 - card.openQty1) +
                  '" pattern="[0-9]" style="width: 6em" readonly />' +
                  "</div>"
              ),
            ]),
          total: (data) => data.count,
          handle: (res) => {
            // no matching records found
            if (res.status === 404) return { data: [] };
            if (res.ok) return res.json();

            throw Error("oh no :(");
          },
        },
      });
      // DOM instead of vue selector because we are using vanilla JS
      this.grid3.render(document.getElementById("wrapper3"));
      //this.jqueryDelEdit2();
      //this.number = 0;
    },
    ///////////////////////////////////////////////////
    getRincianHeaderTR_Update(id) {
      var mythis = this;
      mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getRincianheaderIDUpdate/" + id)
        .then((res) => {
          mythis.dataRincianHeaderID = res.data.data[0];
          mythis.dataRincianHeaderIDTR = res.data.data[0];
          mythis.dataTr301.docNum = res.data.data[0].docNum;

          mythis.dataTr301.storeCode = res.data.data[0].storeCode;
          mythis.dataTr301.storeName = res.data.data[0].storeName;
          mythis.dataTr301.docStatus = res.data.data[0].docStatus;
          mythis.dataTr301.reffNo = res.data.data[0].reffNo;
          mythis.dataTr301.comments = res.data.data[0].comments;
          mythis.dataTr301_comments = mythis.dataTr301.comments;
          mythis.dataTr301.docDate = res.data.data[0].docDate1;
          mythis.dataTr301.reference = res.data.data[0].reference;
          mythis.dataTr301.totalQty = res.data.data[0].totalQty;
          mythis.dataTr301.totalQtyTerima = res.data.data[0].totalQtyTerima;
          mythis.dataTr301.whsCode = res.data.data[0].whsCode;
          mythis.tmp_getCboWhsCodeInventoryOptions =
            res.data.data[0].whsCode + " - " + res.data.data[0].whsName;
          mythis.dataTr301.whsName = "";
          mythis.dataTr301.priceCode = res.data.data[0].priceCode;
          mythis.tmp_getCboPriceCodeInventoryOptions =
            res.data.data[0].priceName;
          mythis.dataTr301.priceName = "";
          mythis.dataTr301.discCode = res.data.data[0].discCode;
          mythis.tmp_getCboDiscCodeInventoryOptions = res.data.data[0].discName;
          mythis.dataTr301.discName = "";

          mythis.idRincian = res.data.data[0].baseEntry;

          mythis.$root.hideLoading();
          //console.log(this.dataRincianDetailID);
        });
    },
    ///////////////////////////////////////////////////
    async getFlagUpdate() {
      this.getTableRincianUpdate();

      await this.getTableRincianDataUpdate();
      this.flagGetData = false;
      this.flagUpdate = false;
      this.flagSave = 0;
      this.flagDownloadPDF = 1;
      this.flagSdataTr301_commentsave = "";
    },
    clickReffNo() {
      this.modal11();
    },
    modal11() {
      this.showModal11 = true;
    },
    close11: function () {
      this.showModal11 = false;
      this.flagGetHeaderDN = false;
    },
    clickNew() {
      this.modal();
    },
    modal() {
      this.showModal = true;
    },
    close: function () {
      this.showModal = false;
      this.idRincian = "";
      this.idRincianUpdate = "";
      this.refreshTable();
      this.flagUpdate = false;

      this.dataRincianHeaderID = {};
      this.dataTr301 = {};
      this.var_penerimaan_DN = {};
      this.var_penerimaan_Actual = {};
      this.data_CboWhs = "";
      this.dataRincianHeaderIDTR = {};
      this.dataRincianHeaderIDTR.docStatus = "X";
      this.total_bpitem_null = null;

      this.flagSave = 0;
      this.flagDownloadPDF = 0;
    },
    close2: function () {
      this.dataRincianHeaderID = {};
      this.dataRincianDetailID = {};
      this.showModal2 = false;
      this.total_bpitem_null = 0;
    },
    modal2() {
      // binding data to form modal
      this.showModal2 = true;
    },
    refreshTable() {
      var mythis = this;
      //////////////////////////////
      $("#wrapper2").remove();
      var e = $('<div id="wrapper2"></div>');
      $("#box").append(e);
      this.getTable();
      //////////////////////////////
    },
    jqueryDelEdit() {
      const mythis = this;

      $(document).on("change", "input", function () {
        let id = $(this).data("id");
        let x_value = $("#txt_" + id).val();
        //alert(id + x_value);
        //alert(mythis.var_penerimaan_DN[id]);
        //alert(mythis.var_penerimaan_Actual[id]);
        // var_penerimaan_DN: {},
        // var_penerimaan_Actual: {},

        if (x_value > mythis.var_penerimaan_DN[id]) {
          Swal.fire(
            "Ubah Qty gagal!",
            "Actual Qty (" +
              x_value +
              ") melebihi Delivery Note Qty (" +
              mythis.var_penerimaan_DN[id] +
              ") value otomatis dirubah menjadi (" +
              mythis.var_penerimaan_DN[id] +
              ")",
            "error"
          );

          x_value = mythis.var_penerimaan_DN[id];
          $("#txt_" + id).val(x_value);
          mythis.var_penerimaan_Actual[id] = x_value;
          var variantx = mythis.var_penerimaan_DN[id] - x_value;
          $("#variant_" + id).val(variantx);
        } else {
          var variantx = mythis.var_penerimaan_DN[id] - x_value;
          $("#variant_" + id).val(variantx);
          mythis.var_penerimaan_Actual[id] = x_value;
        }
      });

      $(document).on("click", "#viewDeliveryNoteUpdate", function () {
        let id = $(this).data("id");
        //alert(id);
        mythis.modal();
        mythis.flagUpdate = true;
        mythis.getCboWhsCodeInventory();
        mythis.getCboPriceCodeInventory();
        mythis.getCboDiscCodeInventory();
        //alert(id);
        /////////////////////////////////////
        mythis.idRincianUpdate = id;
        mythis.getRincianHeaderTR_Update(id);
        /////////////////////////////////////
        //mythis.idRincian = id;
        //mythis.getRincianHeaderID(id);
        //mythis.getRincianHeaderIDTR();
        //mythis.$root.showLoading();
      });

      $(document).on("click", "#viewDeliveryNote", async function () {
        let id = $(this).data("id");
        //alert(id);
        mythis.idRincian = id;
        mythis.close11();
        //mythis.$root.showLoading();
        mythis.getTableRincian();
        mythis.getRincianHeaderID(id);

        await mythis.getTableRincianData();
        mythis.getRincianHeaderIDTR();
        mythis.flagGetData = false;

        mythis.getCboWhsCodeInventory();
        mythis.getCboPriceCodeInventory();
        mythis.getCboDiscCodeInventory();

        mythis.flagDownloadPDF = 1;
      });
      $(document).on("click", "#updateDeliveryNoteD1", function () {
        let id = $(this).data("id");
        //alert("view " + id);
        mythis.getRincianDetailID(id);
        mythis.modal2();
      });
      $(document).on("click", "#changeLock", function () {
        let id = $(this).data("id");

        if (mythis.dataTr301.docStatus == "C") return false;

        //alert(id);
        if ($("#txt_" + id).is("[readonly]")) {
          //$(this).removeAttr("readonly");
          $("#txt_" + id).attr("readonly", false);
          $("#fa_" + id).remove();
          var e = $(
            '<i id="fa_' +
              id +
              '" class="fa fa-unlock fa-2x" style="color:green"></i>'
          );
          $("#lock_" + id).append(e);
          //alert("WW");
        } else {
          $("#txt_" + id).attr("readonly", true);
          $("#fa_" + id).remove();
          var e = $(
            '<i id="fa_' +
              id +
              '" class="fa fa-lock fa-2x" style="color:red"></i>'
          );
          $("#lock_" + id).append(e);
          //alert("ZZ");
        }
      });
    },
    getTable() {
      var mythis = this;
      //////////////////////////////
      $("#wrapper2").remove();
      var e = $('<div id="wrapper2"></div>');
      $("#box").append(e);
      this.grid2 = new Grid();
      //////////////////////////////

      this.grid2.updateConfig({
        //language: idID,
        fixedHeader: true,
        height: "10",
        pagination: {
          limit: 20,
          server: {
            url: (prev, page, limit) =>
              `${prev}${prev.includes("?") ? "&" : "?"}limit=${limit}&offset=${
                page * limit
              }&storeCode=${this.userStoreCode}`,
          },
        },
        search: {
          server: {
            url: (prev, keyword) => `${prev}?search=${keyword}`,
          },
        },
        columns: [
          { name: "ID", hidden: true },
          {
            name: "---- # ----",
            // formatter: (_, row) =>
            //   html(
            //     `
            //   <button data-id="${row.cells[0].data}" class="btn btn-sm btn-info text-white" id="viewDeliveryNoteUpdate" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> Update</button>
            //   `
            //   ),
          },

          {
            id: "docStatus",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Doc Status</b></div>'
            ),
          },

          {
            id: "docNum",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Doc Number</b></div>'
            ),
          },

          {
            id: "reffNo",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Doc Reff</b></div>'
            ),
          },

          {
            id: "storeCode",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Store Code</b></div>'
            ),
          },

          {
            id: "docDate",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Doc Date</b></div>'
            ),
          },
        ],
        style: {
          container: {
            "font-size": "12px",
          },
          table: {
            border: "1px solid #ccc",
            "font-size": "12px",
            margin: "0",
            padding: "0",
            "max-height": "500px",
          },
          th: {
            "background-color": "#CDDDFF",
            color: "#000000",
            border: "1px solid #ccc",
            "text-align": "center",
          },
          td: {
            "text-align": "center",
            border: "1px solid #ccc",
            padding: "5px 10px",
          },
        },
        server: {
          url: this.$root.API_ERP + "/wms/pagingPenerimaanBarangV2",
          then: (data) =>
            data.results.map((card) => [
              card.id,
              //"",

              card.docStatus == "O"
                ? html(
                    `
              <button data-id="${card.id}" class="btn btn-sm btn-info text-white" id="viewDeliveryNoteUpdate" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> Update</button>
              `
                  )
                : html(
                    `
              <button data-id="${card.id}" class="btn btn-sm btn-success text-white" id="viewDeliveryNoteUpdate" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> View</button>
              `
                  ),

              card.docStatus,
              card.docNum,
              card.reffNo,
              card.storeCode,
              card.docDate,
            ]),
          total: (data) => data.count,
          handle: (res) => {
            // no matching records found
            if (res.status === 404) return { data: [] };
            if (res.ok) return res.json();

            throw Error("oh no :(");
          },
        },
      });
      // DOM instead of vue selector because we are using vanilla JS
      this.grid2.render(document.getElementById("wrapper2"));
      this.number = 0;

      $(document).off("change", "input");
      $(document).off("click", "#viewDeliveryNoteUpdate");
      $(document).off("click", "#viewDeliveryNote");
      $(document).off("click", "#updateDeliveryNoteD1");
      $(document).off("click", "#changeLock");
      mythis.jqueryDelEdit();
    },

    getpagingPenerimaanBarangV2fromDN() {
      //////////////////////////////
      $("#wrapper11").remove();
      var e = $('<div id="wrapper11"></div>');
      $("#box11").append(e);
      this.grid11 = new Grid();
      //////////////////////////////
      this.grid11.updateConfig({
        //language: idID,
        fixedHeader: true,
        height: "10",
        pagination: {
          limit: 20,
          server: {
            url: (prev, page, limit) =>
              `${prev}${prev.includes("?") ? "&" : "?"}limit=${limit}&offset=${
                page * limit
              }&storeCode=${this.userStoreCode}`,
          },
        },
        search: {
          server: {
            url: (prev, keyword) => `${prev}?search=${keyword}`,
          },
        },
        columns: [
          { name: "ID", hidden: true },
          {
            name: "---- # ----",
            formatter: (_, row) =>
              html(
                `
              <button data-id="${row.cells[0].data}" class="btn btn-sm btn-info text-white" id="viewDeliveryNote" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> Pilih</button>
              `
              ),
          },

          {
            id: "docNum",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Doc Number</b></div>'
            ),
          },

          {
            id: "docDate",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Tanggal Doc</b></div>'
            ),
          },

          {
            id: "docStatus",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Status Doc</b></div>'
            ),
          },

          {
            id: "custmrCode",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Kode Cust</b></div>'
            ),
          },

          {
            id: "storeCode",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Kode Toko</b></div>'
            ),
          },

          {
            id: "poNo",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Nomor PO</b></div>'
            ),
          },

          {
            id: "totalItem",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Total Item</b></div>'
            ),
          },

          {
            id: "ApprovalAt",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Approval</b></div>'
            ),
          },
        ],
        style: {
          container: {
            "font-size": "12px",
          },
          table: {
            border: "1px solid #ccc",
            "font-size": "12px",
            margin: "0",
            padding: "0",
            "max-height": "500px",
          },
          th: {
            "background-color": "#CDDDFF",
            color: "#000000",
            border: "1px solid #ccc",
            "text-align": "center",
          },
          td: {
            "text-align": "center",
            border: "1px solid #ccc",
            padding: "5px 10px",
          },
        },
        server: {
          url: this.$root.API_ERP + "/wms/pagingPenerimaanBarangV2fromDN",
          then: (data) =>
            data.results.map((card) => [
              card.id,
              "",
              card.docNum,
              card.docDate1,
              card.docStatus,
              card.custmrCode,
              card.storeCode,
              card.poNo,
              card.totalQty,
              card.approval_at,
            ]),
          total: (data) => data.count,
          handle: (res) => {
            // no matching records found
            if (res.status === 404) return { data: [] };
            if (res.ok) return res.json();

            throw Error("oh no :(");
          },
        },
      });
      // DOM instead of vue selector because we are using vanilla JS
      this.grid11.render(document.getElementById("wrapper11"));
      this.number = 0;
      this.flagGetHeaderDN = true;
    },

    getTableRincian() {
      //////////////////////////////
      $("#wrapper3").remove();
      var e = $('<div id="wrapper3"></div>');
      $("#box3").append(e);
      this.grid3 = new Grid();
      //////////////////////////////

      this.grid3.updateConfig({
        //language: idID,
        fixedHeader: true,
        height: 500,
        pagination: {
          limit: 50,
          server: {
            url: (prev, page, limit) =>
              `${prev}${prev.includes("?") ? "&" : "?"}limit=${limit}&offset=${
                page * limit
              }`,
          },
        },
        search: {
          server: {
            url: (prev, keyword) => `${prev}?search=${keyword}`,
          },
        },
        columns: [
          { name: "ID", hidden: true },
          {
            name: "#",
            formatter: (_, row) =>
              html(
                `
              <button data-id="${row.cells[0].data}XXYYZZ${row.cells[1].data}" class="btn btn-sm btn-warning text-white" id="changeLock" data-toggle="tooltip" title="View" > <i class="fa fa-retweet" aria-hidden="true"></i></button>
              `
              ),
          },
          {
            id: "No",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>No</b></div>'
            ),
          },
          // {
          //   id: "docEntry",
          //   name: html(
          //     '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Doc Entry</b></div>'
          //   ),
          // },

          {
            id: "bpItem",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>bpItem</b></div>'
            ),
          },

          {
            id: "itemCode",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Item Code</b></div>'
            ),
          },

          {
            id: "itemName",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Item Name</b></div>'
            ),
          },

          {
            id: "batchNo",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Batch No</b></div>'
            ),
          },

          {
            id: "expiredDate",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Expired Date</b></div>'
            ),
          },
          {
            id: "openQty",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>DO Qty</b></div>'
            ),
          },
          {
            id: "actualQty",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Actual Qty</b></div>'
            ),
            // formatter: (_, row) =>
            //   html(
            //     `<input value="${row.cells[9].data}"  type="number" style="width:6em" oninput="this.value = this.value.replace(/\D+/g, '')" />`
            //   ),
          },
          {
            id: "variant",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Variant</b></div>'
            ),
          },
          {
            id: "updatedAt",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Updated Date</b></div>'
            ),
          },
        ],
        style: {
          container: {
            "font-size": "12px",
          },
          table: {
            border: "1px solid #ccc",
            "font-size": "13px",
          },
          th: {
            "background-color": "#CDDDFF",
            color: "#000000",
            "border-bottom": "1px solid #ccc",
            "text-align": "center",
            "z-index": "1002",
          },
          td: {
            "text-align": "center",
            padding: "5px 10px",
          },
        },
        server: {
          url:
            this.$root.API_ERP +
            "/wms/pagingRincianPenerimaanBarang/" +
            this.idRincian,
          then: (data) =>
            data.results.map((card) => [
              card.id,
              card.itemCode1,
              (data.nomorBaris += 1),
              //card.docEntry,
              card.bpItem1,

              card.itemCode1 == null
                ? html(
                    "<div style='color: #000;background: #f1aeb5;height: 100%;display: flex;justify-content: center;align-items: center;'>" +
                      "-" +
                      "</div>"
                  )
                : html("<div>" + card.itemCode1 + "</div>"),

              card.itemName,
              card.batchNo,
              card.expiredDate1,

              html("<strong>" + card.openQty1 + "</strong>"),
              html(
                "<strong>" +
                  '<input id="txt_' +
                  card.id +
                  "XXYYZZ" +
                  card.itemCode1 +
                  '" name="' +
                  card.id +
                  "XXYYZZ" +
                  card.itemCode1 +
                  '"value="' +
                  (card.openQty_save == null
                    ? card.openQty1
                    : card.openQty_save) +
                  '" type="number" pattern="[0-9]" style="width: 6em" min="1" max="' +
                  (card.openQty_save == null
                    ? card.openQty1
                    : card.openQty_save) +
                  '" data-id="' +
                  card.id +
                  "XXYYZZ" +
                  card.itemCode1 +
                  '" readonly>' +
                  "</strong>" +
                  '&nbsp; <b id="lock_' +
                  card.id +
                  "XXYYZZ" +
                  card.itemCode1 +
                  '"><i id="fa_' +
                  card.id +
                  "XXYYZZ" +
                  card.itemCode1 +
                  '"class="fa fa-lock fa-2x" style="color:red"></i></b>'
              ),

              html(
                "<div'>" +
                  '<input id="variant_' +
                  card.id +
                  "XXYYZZ" +
                  card.itemCode1 +
                  '" type="number" value="' +
                  (card.openQty1 - card.openQty_save) +
                  '" pattern="[0-9]" style="width: 6em" readonly />' +
                  "</div>"
              ),
            ]),
          total: (data) => data.count,
          handle: (res) => {
            // no matching records found
            if (res.status === 404) return { data: [] };
            if (res.ok) return res.json();

            throw Error("oh no :(");
          },
        },
      });
      // DOM instead of vue selector because we are using vanilla JS
      this.grid3.render(document.getElementById("wrapper3"));
      //this.jqueryDelEdit2();
      //this.number = 0;
    },

    getRincianHeaderID(id) {
      var mythis = this;
      mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getRincianheaderIDNew/" + id)
        .then((res) => {
          mythis.dataRincianHeaderID = res.data.data[0];
          mythis.dataTr301.storeCode = res.data.data[0].storeCode;
          mythis.dataTr301.storeName = res.data.data[0].storeName;
          mythis.dataTr301.docStatus = "O";
          mythis.dataTr301.reffNo = res.data.data[0].docNum;
          mythis.dataTr301.comments = res.data.data[0].comments;
          mythis.dataTr301.docDate = new Date().toISOString().slice(0, 10);
          mythis.dataTr301.reference = res.data.data[0].poNo;
          mythis.dataTr301.totalQty = res.data.data[0].totalQty;
          mythis.dataTr301.whsCode = res.data.data[0].whsCode;
          mythis.tmp_getCboWhsCodeInventoryOptions =
            res.data.data[0].whsCode + " - " + res.data.data[0].whsName;
          mythis.dataTr301.comments = "";
          mythis.dataTr301.whsName = "";
          mythis.dataTr301.priceCode = res.data.data[0].priceCode;
          mythis.tmp_getCboPriceCodeInventoryOptions =
            res.data.data[0].priceName;
          mythis.dataTr301.priceName = "";
          mythis.dataTr301.discCode = res.data.data[0].discCode;
          mythis.tmp_getCboDiscCodeInventoryOptions = res.data.data[0].discName;
          mythis.dataTr301.discName = "";
          mythis.$root.hideLoading();
          //console.log(this.dataRincianDetailID);
        });
    },

    getCboWhsCodeInventory() {
      var mythis = this;
      //mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getCboWhsCodeInventory")
        .then((res) => {
          // console.log(res);
          mythis.getCboWhsCodeInventoryOptions = res.data.data;
          //mythis.$root.hideLoading();
        });
    },
    getCboPriceCodeInventory() {
      var mythis = this;
      //mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getCbopriceCode")
        .then((res) => {
          // console.log(res);
          mythis.getCboPriceCodeInventoryOptions = res.data.data;
          //mythis.$root.hideLoading();
        });
    },
    getCboDiscCodeInventory() {
      var mythis = this;
      //mythis.$root.showLoading();
      axios.get(this.$root.API_ERP + "/wms/getCbodiscCode").then((res) => {
        // console.log(res);
        mythis.getCboDiscCodeInventoryOptions = res.data.data;
        //mythis.$root.hideLoading();
      });
    },
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

    mySelectEvent2() {
      this.data_CboWhs = this.tmp_getCboWhsCodeInventoryOptions.code;
      this.dataTr301.whsCode = this.tmp_getCboWhsCodeInventoryOptions.code;
    },

    mySelectEvent22() {
      this.dataTr301.priceCode = this.tmp_getCboPriceCodeInventoryOptions.code;
    },

    mySelectEvent222() {
      this.dataTr301.discCode = this.tmp_getCboDiscCodeInventoryOptions.code;
    },
    savePenerimaanBarang() {
      var mythis = this;

      if (
        mythis.dataTr301.discCode == null ||
        mythis.dataTr301.discCode == "" ||
        mythis.dataTr301.discCode == undefined
      ) {
        // toast.error("Silakan pilih kode diskon terlebih dahulu");
        mythis.$root.showAlertFunction('warning', 'Gagal Melanjutkan!', 'Silakan pilih kode diskon terlebih dahulu.');
        return false;
      }

      if (
        mythis.dataTr301.whsCode == null ||
        mythis.dataTr301.whsCode == "" ||
        mythis.dataTr301.whsCode == undefined
      ) {
        // toast.error("Silakan pilih warehouse terlebih dahulu");
        mythis.$root.showAlertFunction('warning', 'Gagal Melanjutkan!', 'Silakan pilih warehouse terlebih dahulu.');
        return false;
      }

      if (
        mythis.dataTr301.priceCode == null ||
        mythis.dataTr301.priceCode == "" ||
        mythis.dataTr301.priceCode == undefined
      ) {
        // toast.error("Silakan pilih kode harga terlebih dahulu");
        mythis.$root.showAlertFunction('warning', 'Gagal Melanjutkan!', 'Silakan pilih kode harga terlebih dahulu.');
        return false;
      }

      Swal.fire({
        title: "Simpan?",
        text: "Apakah Anda ingin menyimpan data ini?",
        icon: "question",

        //showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: `Batal`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          //////////////////////////////////////////////////////
          mythis.$root.showLoading();
          axios
            .put(
              mythis.$root.API_ERP +
                "/wms/savePenerimaanBarang/" +
                mythis.idRincian,
              {
                var_penerimaan_DN: mythis.var_penerimaan_DN,
                var_penerimaan_Actual: mythis.var_penerimaan_Actual,
                docEntry: mythis.idRincian,
                userid: mythis.userid,
                dataHeader: mythis.dataTr301,
                dataHeaderSave: mythis.dataRincianHeaderIDTR,
              }
            )
            .then((res) => {
              //console.log(res);
              //toast.success("Data telah berhasil di approve");
              Swal.fire(
                "Update Success!",
                "Data telah disimpan sementara, silakan konfirmasi untuk menaikkan stok",
                "success"
              );
              mythis.$root.hideLoading();
              mythis.flagSave = 1;
              mythis.status_save_PenerimaanBarang = 1;
              mythis.getRincianHeaderIDTR();
              //mythis.close();
              // mythis.close2();
            })
            .catch(function (error) {
              mythis.$root.hideLoading();
              if (error.response) {
                //console.log(error.response.data);
                Swal.fire("Failed!", error.response.data.message, "error");
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log("Error", error.message);
              }
            });
          //////////////////////////////////////////////////////

          //Swal.fire("Saved!", "", "success");
        }
      });
    },

    confirmPenerimaanBarang() {
      var mythis = this;
      Swal.fire({
        title: "Confirm?",
        text: "Apakah Anda ingin mengkonfirmasi Penerimaan Barang ini?",
        icon: "question",

        //showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: `Batal`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          mythis.savePenerimaanBarang();
          //////////////////////////////////////////////////////
          mythis.$root.showLoading();
          axios
            .put(
              mythis.$root.API_ERP +
                "/wms/confirmPenerimaanBarang/" +
                mythis.idRincian,
              {
                docEntry: mythis.dataRincianHeaderID.id,
                userid: mythis.userid,
              }
            )
            .then((res) => {
              //console.log(res);
              //toast.success("Data telah berhasil di approve");
              Swal.fire(
                "Update Success!",
                "Penerimaan Barang telah dikonfirmasi sesuai",
                "success"
              );
              mythis.$root.hideLoading();
              mythis.close2();
              mythis.close();
              mythis.refreshTable();
            })
            .catch(function (error) {
              mythis.$root.hideLoading();
              if (error.response) {
                //console.log(error.response.data);
                Swal.fire("Failed!", error.response.data.message, "error");
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log("Error", error.message);
              }
            });
          //////////////////////////////////////////////////////

          //Swal.fire("Saved!", "", "success");
        }
      });
    },
    updateRincianDeliveryNoteDetail() {
      var mythis = this;
      mythis.$root.showLoading();
      axios
        .put(
          mythis.$root.API_ERP +
            "/wms/updateRincianDeliveryNoteDetail/" +
            mythis.dataRincianDetailID.id,
          {
            openQty: mythis.dataRincianDetailID.openQty,
            userid: mythis.userid,
          }
        )
        .then((res) => {
          //console.log(res);

          // toast.success("Data Qty berhasil diubah");
          mythis.$root.showAlertFunction('success', 'Berhasil Diubah!', 'Data Qty berhasil diubah');
          mythis.dataRincianDetailID = {};
          mythis.$root.hideLoading();
          mythis.close();
          mythis.close2();
        })
        .catch(function (error) {
          if (error.response) {
            //console.log(error.response.data);
            if (error.response.status == 422) {
              mythis.errorList = error.response.data;
              mythis.isHidden = false;
              if (Object.keys(mythis.errorList).length > 0) {
                //refresh semua menjadi false
                Object.keys(mythis.errorField).forEach(function (key) {
                  mythis.errorField[key] = false;
                });
                //membuat jika error jadi true
                Object.keys(mythis.errorList).forEach(function (key) {
                  toast.error(mythis.errorList[key], { theme: "colored" });
                  mythis.$root.showAlertFunction('warning', 'Gagal Melanjutkan!', mythis.errorList[key]);

                  const myArray = key.split(".");
                  mythis.errorField[myArray[1]] = true;
                });
              }
            }
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },

    getRincianDetailID(id) {
      var mythis = this;
      mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getRincianDetailID/" + id)
        .then((res) => {
          mythis.dataRincianDetailID = res.data.data[0];
          mythis.$root.hideLoading();
          //console.log(this.dataRincianDetailID);
        });
    },

    getRincianHeaderIDTR() {
      var mythis = this;
      mythis.$root.showLoading();
      axios
        .get(
          this.$root.API_ERP +
            "/wms/getRincianHeaderIDTR/" +
            this.idRincian
        )
        .then((res) => {
          console.log(res.data.data);
          if (res.data.data.length > 0) {
            mythis.dataRincianHeaderIDTR = res.data.data[0];
            mythis.dataTr301.docNum = res.data.data[0].docNum;
            //mythis.txtareaBA = res.data.data[0].comments;
            //mythis.tmp_getCboWhsCodeInventoryOptions = res.data.data[0].whsCode;
            //mythis.data_CboWhs = res.data.data[0].whsCode;
          }

          mythis.$root.hideLoading();
          //console.log(this.dataRincianDetailID);
        });
    },

    async getTableRincianData(id) {
      this.$root.showLoading();
      var mythis = this;

      mythis.nomor_x = 1;
      mythis.html_pdf = "";

      var br_pdf = 1;
      var br_flag = 0;
      var br_string = "";

      var nn = 0;
      var count = 1;
      var limitx = 100;
      var offsetx = 0;
      while (count > 0) {
        //////////////////////////////////////////////////////
        offsetx = limitx * nn;

        const reqData = await axios({
          method: "get",
          url:
            this.$root.API_ERP +
            "/wms/pagingRincianPenerimaanBarang/" +
            this.idRincian +
            "?limit=100&offset=" +
            offsetx,
        });

        const resData = reqData.data;
        mythis.x_nomor_baris = parseInt(resData.nomorBaris);
        mythis.x_count = parseInt(resData.count);

        mythis.status_save_PenerimaanBarang =
          resData.status_save_PenerimaanBarang;
        mythis.total_bpitem_null = resData.total_bpitem_null;
        mythis.confirm_approve = resData.confirm_approve;

        Object.keys(resData.results).forEach(function (key) {
          mythis.var_penerimaan_DN[
            resData.results[key].id + "XXYYZZ" + resData.results[key].itemCode
          ] = resData.results[key].openQty1;

          mythis.var_penerimaan_Actual[
            resData.results[key].id + "XXYYZZ" + resData.results[key].itemCode
          ] =
            resData.results[key].openQty_save == null
              ? resData.results[key].openQty1
              : resData.results[key].openQty_save;

            br_string = "";
            if (br_pdf == 36 && br_flag == 0) {
              br_pdf = 0;
              br_flag = 1;
              br_string = 'class="newPage"';
              //mythis.html_pdf +='<tr id="newPage"><td colspan="8">&nbsp;</td></tr>';
            }
            if (br_pdf == 45 && br_flag == 1) {
              //mythis.html_pdf +='<tr id="newPage"><td colspan="8">&nbsp;</td></tr>';
              br_pdf = 0;
              br_string = 'class="newPage"';
            }

            if (br_string == 'class="newPage"') {
              //mythis.html_pdf += '<tr ><td colspan="8">&nbsp;</td></tr>';
              //mythis.html_pdf += '<tr ><td colspan="8">&nbsp;</td></tr>';
              mythis.html_pdf +=
                "<tr " +
                br_string +
                '><td colspan="8">&nbsp;</td></tr><tr> <th class="borderx">No.</th> <th class="borderx">Item Code</th> <th class="borderx">Item Name</th> <th class="borderx">Batch No</th> <th class="borderx">Exp Date</th> <th style="text-align:right" class="borderx">DO QTy</th> <th style="text-align:right" class="borderx">Actual Qty</th> <th style="text-align:right" class="borderx">Variant</th> </tr>';
            }

            mythis.html_pdf +=
              "<tr " +
              br_string +
              'style="font-size: 9px"><th>' +
              mythis.nomor_x +
              "</th><th>" +
              resData.results[key].itemCode1 +
              "</th><th>" +
              resData.results[key].itemName +
              "</th><th>" +
              resData.results[key].batchNo +
              "</th><th>" +
              resData.results[key].expiredDate1 +
              '</th><th style="text-align:center">' +
              resData.results[key].baseQty1 +
              '</th><th style="text-align:center">' +
              "________" +
              '</th><th style="text-align:center">' +
              "________" +
              "</th></tr>";

            mythis.nomor_x++;
            br_pdf++;
        });

        // axios
        //   .get(
        //     this.$root.API_ERP +
        //       "/wms/pagingRincianPenerimaanBarang/" +
        //       this.idRincian +
        //       "?limit=100&offset=" +
        //       offsetx
        //   )
        //   .then((res) => {
        //     //console.log(res);
        //     console.log(res.data.count + "<" + res.data.nomorBaris);

        //     mythis.x_nomor_baris = parseInt(res.data.nomorBaris);
        //     mythis.x_count = parseInt(res.data.count);

        //     mythis.status_save_PenerimaanBarang =
        //       res.data.status_save_PenerimaanBarang;
        //     mythis.total_bpitem_null = res.data.total_bpitem_null;
        //     mythis.confirm_approve = res.data.confirm_approve;
        //     //console.log(res.data.results);
        //     Object.keys(res.data.results).forEach(function (key) {
        //       mythis.var_penerimaan_DN[
        //         res.data.results[key].id +
        //           "XXYYZZ" +
        //           res.data.results[key].itemCode
        //       ] = res.data.results[key].openQty1;

        //       mythis.var_penerimaan_Actual[
        //         res.data.results[key].id +
        //           "XXYYZZ" +
        //           res.data.results[key].itemCode
        //       ] =
        //         res.data.results[key].openQty_save == null
        //           ? res.data.results[key].openQty1
        //           : res.data.results[key].openQty_save;
        //     });
        //   });

        nn = nn + 1;
        //console.log("MASUKK");
        //console.log("aaa " + mythis.x_count + "<" + mythis.x_nomor_baris);
        if (mythis.x_count < mythis.x_nomor_baris) {
          count = 0;
          //console.log("MASUKK");
        }
        if (nn >= 30) {
          count = 0;
        }
        //////////////////////////////////////////////////////
      }

      this.$root.hideLoading();
    },

    async getDataRincian() {
      this.flagGetData = false;

      this.getCboWhsCodeInventory();
      this.getRincianHeaderIDTR();
      this.getTableRincian();
      await this.getTableRincianData();
    },

    //////////////////////////////////
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border: 0.5px solid black;
  border-spacing: 0px;
  border-collapse: separate;
}
table td,
table th {
  border: 0.5px solid black;
}
.table-borderless > tbody > tr > td,
.table-borderless > tbody > tr > th,
.table-borderless > tfoot > tr > td,
.table-borderless > tfoot > tr > th,
.table-borderless > thead > tr > td,
.table-borderless > thead > tr > th {
  border: none;
}

input[readonly] {
  background-color: rgb(204, 219, 254);
}
</style>
