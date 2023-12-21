<template>
  <div class="d-flex align-items-center mb-3 mt-1">
    <span class="badge rounded me-3 ms-1 badge-subtle-primary">
      <span class="fas fa-file-download fs-2 text-primary"></span>
    </span>
    <div class="col">
      <h5 class="mb-0 text-primary position-relative">
        <span class="bg-200 dark__bg-1100 pe-3 fs-2">Transfer In</span>
        <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
      </h5>
      <p class="mb-0 fs--1"><a href="javascript:void(0)" class="text-dark">Martha Tilaar Shop</a> / Transfer In</p>
    </div>
  </div>
  
  <div class="card shadow-none border mb-3">
    <div class="bg-holder bg-card d-none d-md-block" style="background-image:url('assets/img/illustration/reports-bg.png');"></div><!--/.bg-holder-->
    <div class="card-header z-1">
      <div class="row flex-between-center gx-0">
        <div class="col-lg-auto d-flex align-items-center"><img class="img-fluid" src="@/assets/img/illustration/reports-greeting.png" alt="">
          <div class="ms-x1">
            <h6 class="mb-1 text-primary">Martha Tilaar Shop</h6>
            <h4 class="mb-0 text-primary fw-bold"><span class="text-info fw-medium">Transfer In</span></h4>
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
    <div class="container-fluid">
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
          <h3>Browse Data From Ticket To Tin</h3>
        </template>
        <template #body>
          <div style="width: 90vw">
            <template v-if="flagGetHeaderDN == false">
              <button
                class="btn btn-success btn-sm me-1"
                @click="getpagingTransInfromTicket()"
              >
                Get data
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
            Tutup
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
          <h3>Form Transfer In Barang</h3>
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
                    <td class="text-left" width="10">docNum</td>
                    <td class="text-left" width="1">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{ dataTr301.docNum == "" ? "-" : dataTr301.docNum }}
                      </strong>
                    </td>
                    <td class="text-left" width="10">docStatus</td>
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
                    <td class="text-left" width="10">reffNo</td>
                    <td class="text-left" width="1">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr301.reffNo == undefined ? "-" : dataTr301.reffNo
                        }}
                      </strong>
                    </td>
                    <td class="text-left" width="10">docDate</td>
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
                    <td class="text-left">storeCode</td>
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
                    <td class="text-left">storeName</td>
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
                    <td class="text-left">whsCode</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <template v-if="idRincian != ''">
                        <v-select
                          :options="getCboWhsCodeInventoryOptions"
                          v-model="tmp_getCboWhsCodeInventoryOptions"
                          @update:modelValue="mySelectEvent2()"
                          :clearable="false"
                          :disabled="
                            dataTr301.docStatus == 'C' ||
                            dataTr301.docStatus == 'O'
                          "
                        ></v-select>
                      </template>
                    </td>
                    <td class="text-left">priceCode</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <template v-if="idRincian != ''">
                        <v-select
                          :options="getCboPriceCodeInventoryOptions"
                          v-model="tmp_getCboPriceCodeInventoryOptions"
                          @update:modelValue="mySelectEvent22()"
                          :clearable="false"
                          :disabled="
                            dataTr301.docStatus == 'C' ||
                            dataTr301.docStatus == 'O'
                          "
                        ></v-select>
                      </template>
                    </td>

                    <td class="text-left">discCode</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <template v-if="idRincian != ''">
                        <v-select
                          :options="getCboDiscCodeInventoryOptions"
                          v-model="tmp_getCboDiscCodeInventoryOptions"
                          @update:modelValue="mySelectEvent222()"
                          :clearable="false"
                          :disabled="
                            dataTr301.docStatus == 'C' ||
                            dataTr301.docStatus == 'O'
                          "
                        ></v-select>
                      </template>
                    </td>
                    <td class="text-left">&nbsp;</td>
                    <td class="text-left">&nbsp;</td>
                    <td class="text-success text-left">&nbsp;</td>
                  </tr>

                  <tr>
                    <td class="text-left">comments</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left" colspan="4">
                      <template v-if="idRincian != ''">
                        <textarea
                          id="w3review"
                          name="w3review"
                          rows="5"
                          cols="60"
                          v-model="dataTr301.comments"
                          placeholder="Kosongkan jika tidak ada selisih"
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
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Doc Number</u></span>
                    <h5>
                      {{ dataTr301.docNum == undefined || dataTr301.docNum == "" ? "-" : dataTr301.docNum }}
                    </h5>
                  </div>
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Reff Number</u></span>
                    <h5>
                      {{
                        dataTr301.reffNo == undefined ? "-" : dataTr301.reffNo
                      }}
                    </h5>
                  </div>
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Doc Date</u></span>
                    <h5>
                      {{
                        dataTr301.docDate == undefined
                          ? "-"
                          : dataTr301.docDate
                      }}
                    </h5>
                  </div>
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Store Code</u></span>
                    <h5>
                      {{
                        dataTr301.storeCode == undefined
                          ? "-"
                          : dataTr301.storeCode
                      }}
                    </h5>
                  </div>
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Store Name</u></span>
                    <h5>
                      {{
                        dataTr301.storeName == undefined
                          ? "-"
                          : dataTr301.storeName
                      }}
                    </h5>
                  </div>
                  <div class="col-md-3 text-center mb-2">
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
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Warehouse Code</u></span>
                    <h5>
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
                    </h5>
                  </div>
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Price Code</u></span>
                    <h5>
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
                    </h5>
                  </div>
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Discount Code</u></span>
                    <h5>
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
                    </h5>
                  </div>
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Comments</u></span>
                    <h5>
                      <template v-if="idRincian != ''">
                        <textarea 
                          class="form-control"
                          id="w3review"
                          name="w3review"
                          rows="5"
                          cols="60"
                          v-model="dataTr301.comments"
                          placeholder="Kosongkan jika tidak ada selisih penerimaan"
                          :disabled="dataTr301.docStatus == 'C'"
                        ></textarea>
                      </template>
                      <h5 v-else>-</h5>
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <br />
            <template v-if="flagUpdate == true">
              <button
                type="button"
                class="btn btn-success"
                @click="getFlagUpdate()"
              >
                Get Data
              </button>
            </template>

            <div class="block-content">
              <div id="wrapper3"></div>
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
                      Confirm TI
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
            Tutup
          </button>
        </template>
      </FormModal>
    </Teleport>
  </Pages>
</template>

<script>
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
      
      title: "Transfer In",
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
      var_penerimaan_DN_Qty: {},
      var_penerimaan_Actual: {},
      status_save_PenerimaanBarang: 0,
      data_CboWhs: "",
      flagSave: 0,
      txtareaBA: "",
      userid: "",

      dataRincianHeaderIDTR: {},
      flagUpdate: false,
      dataTr301_comments: "",
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
    getTableRincianDataUpdate(id) {
      var mythis = this;
      axios
        .get(
          this.$root.API_ERP +
            "/wms/pagingRincianTIUpdate/" +
            this.idRincianUpdate +
            "?limit=1000&offset=0"
        )
        .then((res) => {
          console.log(res);
          mythis.status_save_PenerimaanBarang =
            res.data.status_save_PenerimaanBarang;
          mythis.total_bpitem_null = res.data.total_bpitem_null;
          mythis.confirm_approve = res.data.confirm_approve;
          //console.log(res.data.results);
          Object.keys(res.data.results).forEach(function (key) {
            mythis.var_penerimaan_DN[
              res.data.results[key].id +
                "XXYYZZ" +
                res.data.results[key].itemCode
            ] = res.data.results[key].baseQty1;

            mythis.var_penerimaan_Actual[
              res.data.results[key].id +
                "XXYYZZ" +
                res.data.results[key].itemCode
            ] =
              res.data.results[key].openQty_save == null
                ? res.data.results[key].openQty1
                : res.data.results[key].openQty_save;
          });
        });
    },
    getTableRincianUpdate() {
      this.grid3.updateConfig({
        // language: idID,
        fixedHeader: true,
        height: 500,
        pagination: {
          limit: 1000,
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
          {
            id: "docEntry",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Doc Entry</b></div>'
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
            id: "onHand",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Stok Toko</b></div>'
            ),
          },

          // {
          //   id: "batchNo",
          //   name: html(
          //     '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>batchNo</b></div>'
          //   ),
          // },

          // {
          //   id: "expiredDate",
          //   name: html(
          //     '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>expiredDate</b></div>'
          //   ),
          // },
          {
            id: "openQty",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Ticket TI Qty</b></div>'
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
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Updated At</b></div>'
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
            "/wms/pagingRincianTIUpdate/" +
            this.idRincianUpdate,
          then: (data) =>
            data.results.map((card) => [
              card.id,
              card.itemCode1,
              (data.nomorBaris += 1),
              card.docEntry,

              card.itemCode1 == null
                ? html(
                    "<div style='color: #000;background: #f1aeb5;height: 100%;display: flex;justify-content: center;align-items: center;'>" +
                      "-" +
                      "</div>"
                  )
                : html("<div>" + card.itemCode1 + "</div>"),

              card.itemName,

              card.onHand,
              //card.batchNo,
              //card.expiredDate1,

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
      mythis.$root.loader = true;
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
          mythis.dataTr301.reference = res.data.data[0].reference;
          mythis.dataTr301.comments = res.data.data[0].comments;
          mythis.dataTr301_comments = mythis.dataTr301.comments;
          mythis.dataTr301.docDate = res.data.data[0].docDate1;
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

          mythis.$root.loader = false;
          //console.log(this.dataRincianDetailID);
        });
    },
    ///////////////////////////////////////////////////
    getFlagUpdate() {
      this.getTableRincianUpdate();

      this.getTableRincianDataUpdate();
      this.flagGetData = false;
      this.flagUpdate = false;
      this.flagSave = 0;
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
      this.var_penerimaan_DN_Qty = {};
      this.var_penerimaan_Actual = {};
      this.data_CboWhs = "";
      this.dataRincianHeaderIDTR = {};
      this.total_bpitem_null = null;

      this.flagSave = 0;
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
        let x_value2 = $("#txt_" + id).val();
        //alert(x_value);
        //alert(mythis.var_penerimaan_DN[id]);
        //alert(mythis.var_penerimaan_Actual[id]);
        // var_penerimaan_DN: {},
        // var_penerimaan_Actual: {},

        if (x_value > mythis.var_penerimaan_DN_Qty[id]) {
          //alert("a");
          Swal.fire(
            "Ubah Qty gagal!",
            "Actual Qty (" +
              x_value +
              ") melebihi onHand Qty (" +
              mythis.var_penerimaan_DN_Qty[id] +
              ") value otomatis dirubah menjadi (" +
              mythis.var_penerimaan_DN_Qty[id] +
              ")",
            "error"
          );

          x_value = mythis.var_penerimaan_DN_Qty[id];
          $("#txt_" + id).val(x_value);
          mythis.var_penerimaan_Actual[id] = x_value;
          var variantx = mythis.var_penerimaan_DN_Qty[id] - x_value;
          $("#variant_" + id).val(variantx);
        }

        if (x_value > mythis.var_penerimaan_DN[id]) {
          //alert("b");
          Swal.fire(
            "Ubah Qty gagal!",
            "Actual Qty (" +
              x_value2 +
              ") melebihi Ticket TI Qty (" +
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

      $(document).on("click", "#viewTicketTIUpdate", function () {
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
        //mythis.getRincianHeaderIDTR_TI();
        //mythis.$root.loader = true;
      });

      $(document).on("click", "#viewTicketTI", function () {
        let id = $(this).data("id");
        //alert("ABCD");
        mythis.idRincian = id;
        mythis.close11();
        //mythis.$root.loader = true;
        mythis.getTableRincian();
        mythis.getRincianHeaderID(id);

        mythis.getTableRincianData();
        mythis.getRincianHeaderIDTR_TI();
        mythis.flagGetData = false;

        mythis.getCboWhsCodeInventory();
        mythis.getCboPriceCodeInventory();
        mythis.getCboDiscCodeInventory();
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
      this.grid2.updateConfig({
        language: idID,
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
            //   <button data-id="${row.cells[0].data}" class="btn btn-sm btn-info text-white" id="viewTicketTIUpdate" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> Update</button>
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
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Reference</b></div>'
            ),
          },

          {
            id: "storeCode",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Kode Toko</b></div>'
            ),
          },

          {
            id: "docDate",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Tanggal Doc</b></div>'
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
          url: this.$root.API_ERP + "/wms/pagingTransIn",
          then: (data) =>
            data.results.map((card) => [
              card.id,
              //"",

              card.docStatus == "O"
                ? html(
                    `
              <button data-id="${card.id}" class="btn btn-sm btn-info text-white" id="viewTicketTIUpdate" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> Update</button>
              `
                  )
                : html(
                    `
              <button data-id="${card.id}" class="btn btn-sm btn-success text-white" id="viewTicketTIUpdate" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> View</button>
              `
                  ),

              card.docStatus,
              card.docNum,
              card.reference,
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
      $(document).off("click", "#viewTicketTIUpdate");
      $(document).off("click", "#viewTicketTI");
      $(document).off("click", "#updateDeliveryNoteD1");
      $(document).off("click", "#changeLock");
      mythis.jqueryDelEdit();
    },

    getpagingTransInfromTicket() {
      this.grid11.updateConfig({
        language: idID,
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
              <button data-id="${row.cells[0].data}" class="btn btn-sm btn-info text-white" id="viewTicketTI" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> Pilih</button>
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
            id: "storeCodeFrm",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Dari Toko</b></div>'
            ),
          },

          {
            id: "storeCodeTo",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Tujuan Toko</b></div>'
            ),
          },

          {
            id: "totalItem",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Total Item</b></div>'
            ),
          },

          {
            id: "quantityAmont",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Total Qty</b></div>'
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
          url: this.$root.API_ERP + "/wms/pagingTransInfromTicket",
          then: (data) =>
            data.results.map((card) => [
              card.id,
              "",
              card.docNum,
              card.docDate1,
              card.docStatus,
              card.storeCodeFrm,
              card.storeCodeTo,
              card.itemCount1,
              card.quantityAmont1,
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
      this.grid3.updateConfig({
        language: idID,
        fixedHeader: true,
        height: 500,
        pagination: {
          limit: 1000,
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
          {
            id: "docEntry",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>docEntry</b></div>'
            ),
          },

          {
            id: "itemCode",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>itemCode</b></div>'
            ),
          },

          {
            id: "itemName",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>itemName</b></div>'
            ),
          },

          {
            id: "onHand",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Stok Toko</b></div>'
            ),
          },

          // {
          //   id: "batchNo",
          //   name: html(
          //     '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>batchNo</b></div>'
          //   ),
          // },

          // {
          //   id: "expiredDate",
          //   name: html(
          //     '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>expiredDate</b></div>'
          //   ),
          // },
          {
            id: "openQty",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Ticket TI Qty</b></div>'
            ),
          },
          {
            id: "actualQty",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>actualQty</b></div>'
            ),
            // formatter: (_, row) =>
            //   html(
            //     `<input value="${row.cells[9].data}"  type="number" style="width:6em" oninput="this.value = this.value.replace(/\D+/g, '')" />`
            //   ),
          },
          {
            id: "variant",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>variant</b></div>'
            ),
          },
          {
            id: "updatedAt",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>updatedAt</b></div>'
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
            this.$root.API_ERP + "/wms/pagingRincianTI/" + this.idRincian,
          then: (data) =>
            data.results.map((card) => [
              card.id,
              card.itemCode1,
              (data.nomorBaris += 1),
              card.docEntry,

              card.itemCode1 == null
                ? html(
                    "<div style='color: #000;background: #f1aeb5;height: 100%;display: flex;justify-content: center;align-items: center;'>" +
                      "-" +
                      "</div>"
                  )
                : html("<div>" + card.itemCode1 + "</div>"),

              card.itemName,

              card.onHand,
              //card.batchNo,
              //card.expiredDate1,

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
                  (card.openQty_save > card.onHand
                    ? card.onHand
                    : card.openQty_save) +
                  '" type="number" pattern="[0-9]" style="width: 6em" min="1" max="' +
                  (card.openQty_save > card.onHand
                    ? card.onHand
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
      mythis.$root.loader = true;
      axios
        .get(this.$root.API_ERP + "/wms/getRincianheaderIDNew_TI/" + id)
        .then((res) => {
          mythis.dataRincianHeaderID = res.data.data[0];
          mythis.dataTr301.storeCode = res.data.data[0].storeCode;
          mythis.dataTr301.storeName = res.data.data[0].storeName;
          mythis.dataTr301.docStatus = "O";
          mythis.dataTr301.reference = res.data.data[0].docNum;
          mythis.dataTr301.comments = res.data.data[0].comments;
          mythis.dataTr301.docDate = new Date().toISOString().slice(0, 10);
          //mythis.dataTr301.reference = res.data.data[0].poNo;
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
          mythis.$root.loader = false;
          //console.log(this.dataRincianDetailID);
        });
    },

    getCboWhsCodeInventory() {
      var mythis = this;
      //mythis.$root.loader = true;
      axios
        .get(this.$root.API_ERP + "/wms/getCboWhsCodeInventory")
        .then((res) => {
          console.log(res);
          mythis.getCboWhsCodeInventoryOptions = res.data.data;
          //mythis.$root.loader = false;
        });
    },
    getCboPriceCodeInventory() {
      var mythis = this;
      //mythis.$root.loader = true;
      axios
        .get(this.$root.API_ERP + "/wms/getCbopriceCode")
        .then((res) => {
          console.log(res);
          mythis.getCboPriceCodeInventoryOptions = res.data.data;
          //mythis.$root.loader = false;
        });
    },
    getCboDiscCodeInventory() {
      var mythis = this;
      //mythis.$root.loader = true;
      axios.get(this.$root.API_ERP + "/wms/getCbodiscCode").then((res) => {
        console.log(res);
        mythis.getCboDiscCodeInventoryOptions = res.data.data;
        //mythis.$root.loader = false;
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
        mythis.$root.showAlertFunction('warning', 'Gagal Melanjutkan!', 'Silakan pilih kode diskon terlebih dahulu');
        return false;
      }

      if (
        mythis.dataTr301.whsCode == null ||
        mythis.dataTr301.whsCode == "" ||
        mythis.dataTr301.whsCode == undefined
      ) {
        // toast.error("Silakan pilih warehouse terlebih dahulu");
        mythis.$root.showAlertFunction('warning', 'Gagal Melanjutkan!', 'Silakan pilih warehouse terlebih dahulu');
        return false;
      }

      if (
        mythis.dataTr301.priceCode == null ||
        mythis.dataTr301.priceCode == "" ||
        mythis.dataTr301.priceCode == undefined
      ) {
        // toast.error("Silakan pilih kode harga terlebih dahulu");
        mythis.$root.showAlertFunction('warning', 'Gagal Melanjutkan!', 'Silakan pilih kode harga terlebih dahulu');
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
          mythis.$root.loader = true;
          axios
            .put(
              mythis.$root.API_ERP +
                "/wms/savePenerimaanBarang_TI/" +
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
              mythis.$root.loader = false;
              mythis.flagSave = 1;
              mythis.status_save_PenerimaanBarang = 1;
              mythis.getRincianHeaderIDTR_TI();
              //mythis.close();
              // mythis.close2();
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
          mythis.$root.loader = true;
          axios
            .put(
              mythis.$root.API_ERP +
                "/wms/confirmPenerimaanBarang_TI/" +
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
                "Penerimaan Barang dari TI telah dikonfirmasi sesuai",
                "success"
              );
              mythis.$root.loader = false;
              mythis.close();
              mythis.close2();
              mythis.refreshTable();
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
                      // toast.error(mythis.errorList[key], { theme: "colored" });
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
          //////////////////////////////////////////////////////

          //Swal.fire("Saved!", "", "success");
        }
      });
    },
    updateRincianDeliveryNoteDetail() {
      var mythis = this;
      mythis.$root.loader = true;
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
          mythis.$root.showAlertFunction('success', 'Berhasil Mengubah!', 'Data Qty berhasil diubah');
          mythis.dataRincianDetailID = {};
          mythis.$root.loader = false;
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
                  // toast.error(mythis.errorList[key], { theme: "colored" });
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
      mythis.$root.loader = true;
      axios
        .get(this.$root.API_ERP + "/wms/getRincianDetailID/" + id)
        .then((res) => {
          mythis.dataRincianDetailID = res.data.data[0];
          mythis.$root.loader = false;
          //console.log(this.dataRincianDetailID);
        });
    },

    getRincianHeaderIDTR_TI() {
      var mythis = this;
      mythis.$root.loader = true;
      axios
        .get(
          this.$root.API_ERP +
            "/wms/getRincianHeaderIDTR_TI/" +
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

          mythis.$root.loader = false;
          //console.log(this.dataRincianDetailID);
        });
    },

    getTableRincianData(id) {
      var mythis = this;
      axios
        .get(
          this.$root.API_ERP +
            "/wms/pagingRincianTI/" +
            this.idRincian +
            "?limit=1000&offset=0"
        )
        .then((res) => {
          //alert("CCC");
          console.log(res);
          mythis.status_save_PenerimaanBarang =
            res.data.status_save_PenerimaanBarang;
          mythis.total_bpitem_null = res.data.total_bpitem_null;
          mythis.confirm_approve = res.data.confirm_approve;
          //console.log(res.data.results);
          Object.keys(res.data.results).forEach(function (key) {
            mythis.var_penerimaan_DN_Qty[
              res.data.results[key].id +
                "XXYYZZ" +
                res.data.results[key].itemCode
            ] = res.data.results[key].onHand;

            mythis.var_penerimaan_DN[
              res.data.results[key].id +
                "XXYYZZ" +
                res.data.results[key].itemCode
            ] = res.data.results[key].openQty1;

            mythis.var_penerimaan_Actual[
              res.data.results[key].id +
                "XXYYZZ" +
                res.data.results[key].itemCode
            ] =
              res.data.results[key].openQty_save > res.data.results[key].onHand
                ? res.data.results[key].onHand
                : res.data.results[key].openQty_save;
          });
        });
    },

    getDataRincian() {
      this.flagGetData = false;

      this.getCboWhsCodeInventory();
      this.getRincianHeaderIDTR_TI();
      this.getTableRincian();
      this.getTableRincianData();
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
