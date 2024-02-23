<template>
  <div class="d-flex align-items-center mb-3 mt-1">
    <span class="badge rounded me-3 ms-1 badge-subtle-primary">
      <span class="fas fa-clipboard-list fs-2 text-primary"></span>
    </span>
    <div class="col">
      <h5 class="mb-0 text-primary position-relative">
        <span class="bg-200 dark__bg-1100 pe-3 fs-2">Stock Mutation</span>
        <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
      </h5>
      <p class="mb-0 fs--1"><a href="javascript:void(0)" class="text-dark">Martha Tilaar Shop</a> / Stock Mutation</p>
    </div>
  </div>
  <div class="card shadow-none border mb-3">
    <div class="bg-holder bg-card d-none d-md-block" style="background-image:url('assets/img/illustration/reports-bg.png');"></div><!--/.bg-holder-->
    <div class="card-header z-1">
      <div class="row flex-between-center gx-0 mb-3">
        <div class="col-lg-auto d-flex align-items-center"><img class="img-fluid" src="@/assets/img/illustration/reports-greeting.png" alt="">
          <div class="ms-x1">
            <h6 class="mb-1 text-primary">Martha Tilaar Shop</h6>
            <h4 class="mb-0 text-primary fw-bold"><span class="text-info fw-medium">Stock Mutation</span></h4>
          </div>
        </div>
        <!-- <div class="col-lg-auto pt-3 pt-lg-0 d-flex align-items-end">
          <form class="row flex-lg-column flex-xxl-row gx-3 gy-2 align-items-center align-items-lg-start align-items-xxl-center">
            <div class="col-auto">
              <h6 class="text-700 mb-0">Terakhir Penerimaan: </h6>
            </div>
            <div class="col-md-auto position-relative">
              <input :value="dateNow" class="form-control datetimepicker ps-4 flatpickr-input" type="text" readonly="readonly">
              <span class="fas fa-calendar-alt text-primary position-absolute top-50 translate-middle-y ms-2"></span>
            </div>
          </form>
          <div class="ms-3">
            <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#modalFormNewRequest">
              New
            </button>
          </div>
        </div> -->
      </div>

      <div class="row align-items-end">
        <div class="col-md-3 mb-2">
          <div class="form-group">
            <label class="m-0">Store Code</label>
            <v-select
              :class="errorField.storeCode ? 'input-error' : ''"
              :options="storeCodeOptions"
              v-model="tmp_storeCode"
              @update:modelValue="mySelectEvent()"
              :clearable="false"
              disabled
            ></v-select>
          </div>
        </div>
        <div class="col-md-3 mb-2">
          <label class="m-0">WHS Code</label>
          <v-select
            :class="errorField.whsCode ? 'input-error' : ''"
            :options="whsCodeOptions"
            v-model="tmp_whsCode"
            @update:modelValue="mySelectEvent2()"
            :clearable="false"
          ></v-select>
        </div>
        <div class="col-md-3 mb-2">
          <label class="m-0">Month/Year Period</label>
          <VueDatePicker
            v-model="blth"
            month-picker
            disable-year-select
          />
        </div>
        <div class="col-md-3 mb-2">
          <label class="m-0">Price</label>
          <v-select
            :class="errorField.priceCode ? 'input-error' : ''"
            :options="priceCodeOptions"
            v-model="tmp_priceCode"
            @update:modelValue="mySelectEvent5()"
            :clearable="false"
          ></v-select>
        </div>
        
        <div class="col-md-3 mb-2">
          <label class="m-0">Optional</label>
          <v-select
            :class="errorField.optCode ? 'input-error' : ''"
            :options="optCodeOptions"
            v-model="tmp_optCode"
            @update:modelValue="mySelectEvent3()"
            :clearable="false"
          ></v-select>
        </div>
        <div class="col-md-3 mb-2">
          <label class="m-0">Optional Detail</label>
          <v-select
            :class="errorField.whsCode ? 'input-error' : ''"
            :options="optDetailOptions"
            v-model="tmp_optDetail"
            @update:modelValue="mySelectEvent4()"
            :clearable="false"
            :disabled="cboOptDetail_status"
          ></v-select>
        </div>
        <div class="col-md-3 mb-2">
          <label class="m-0">View</label>
          <select v-model="picked" class="form-select" aria-label="Default select example">
            <option value="" selected>Select View</option>
            <option value="unit">Unit</option>
            <option value="unit_value">Value Parice</option>
            <option value="value_cost">Value Cost</option>
          </select>
          <!-- <div>
            <input type="radio" value="unit" v-model="picked" />
            <span> Unit</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" value="unit_value" v-model="picked" />
            <span> Value</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" value="value_cost" v-model="picked" />
            <span> Unit Value</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div> -->
        </div>
        <div class="col-md-3 mb-2">
          <button class="btn btn-primary" type="button" @click="prosesDataMutasi()">
            Process <span class="fas fa-search"></span>
          </button>
        </div>
        <div class="col-md-12 mb-2">
          <button v-if="flagDownloadPDF == 1" class="btn btn-info ms-3" type="button" @click="exportToPDF()">
            Download PDF<span class="fas fa-file-pdf"></span>
          </button>
          <download-excel
            class="btn btn-default"
            :data="json_data"
            :fields="json_fields"
            :worksheet="nama_sheetnya"
            :name="nama_excelnya"
          >
            <button class="btn btn-sm btn-success">
              <i class="fas fa-file-excel"></i> Download Excel
            </button>
          </download-excel>
        </div>
      </div>

      <!-- <div class="mb-2">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <div class="row">
                <div class="col-md-2">
                  <label for="">Store Code</label>
                </div>
                <div class="col-md-4">
                  <v-select
                    :class="errorField.storeCode ? 'input-error' : ''"
                    :options="storeCodeOptions"
                    v-model="tmp_storeCode"
                    @update:modelValue="mySelectEvent()"
                    :clearable="false"
                  ></v-select>
                </div>

                <div class="col-md-2">
                  <label for="">WHS Code</label>
                </div>
                <div class="col-md-4">
                  <v-select
                    :class="errorField.whsCode ? 'input-error' : ''"
                    :options="whsCodeOptions"
                    v-model="tmp_whsCode"
                    @update:modelValue="mySelectEvent2()"
                    :clearable="false"
                  ></v-select>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col-md-2">
                  <label for="">Month/Year Period</label>
                </div>
                <div class="col-md-4">
                  <VueDatePicker
                    v-model="blth"
                    month-picker
                    disable-year-select
                  />
                </div>

                <div class="col-md-2">
                  <label for="">Price</label>
                </div>
                <div class="col-md-4">
                  <v-select
                    :class="errorField.priceCode ? 'input-error' : ''"
                    :options="priceCodeOptions"
                    v-model="tmp_priceCode"
                    @update:modelValue="mySelectEvent5()"
                    :clearable="false"
                  ></v-select>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col-md-2">
                  <label for="">Optional</label>
                </div>
                <div class="col-md-4">
                  <v-select
                    :class="errorField.optCode ? 'input-error' : ''"
                    :options="optCodeOptions"
                    v-model="tmp_optCode"
                    @update:modelValue="mySelectEvent3()"
                    :clearable="false"
                  ></v-select>
                </div>

                <div class="col-md-2">
                  <label for="">Optional Detail</label>
                </div>
                <div class="col-md-4">
                  <v-select
                    :class="errorField.whsCode ? 'input-error' : ''"
                    :options="optDetailOptions"
                    v-model="tmp_optDetail"
                    @update:modelValue="mySelectEvent4()"
                    :clearable="false"
                    :disabled="cboOptDetail_status"
                  ></v-select>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col-md-2">
                  <label for="">View</label>
                </div>
                <div class="col-md-4">
                  <input type="radio" value="unit" v-model="picked" />
                  <span> Unit</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="radio" value="value" v-model="picked" />
                  <span> Value</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="radio" value="unit_value" v-model="picked" />
                  <span> Unit Value</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-3">
                  <template v-if="!flagCheckGudang">
                    <Button type="button" @click="prosesDataMutasi()"
                      >Process</Button
                    >
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
  <Pages>
    <div>
      <hr />
      <!-- <template v-if="flagDownloadPDF == 1">
        <button class="btn btn-sm btn-info" @click="exportToPDF()">
          <i class="fas fa-file-pdf"></i> Download
        </button>
      </template>
      <hr v-if="flagDownloadPDF == 1"/> -->
      <!------------------------>
      <div class="block-content">
        <div id="wrapper2"></div>
        <div id="box"></div>
      </div>

      <!------------------------>
    </div>
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

import html2pdf from "html2pdf.js";
import JsonExcel from "vue-json-excel3";

export default {
  components: { Pages, FormInput, Button, FormModal, downloadExcel: JsonExcel },
  props: {
    params: {
      default: null,
    },
  },
  data() {
    return {
      master_code: this.$root.master_code,
      master_coll: this.$root.master_coll,
      local_storage: this.$root.local_storage,

      title: "Stock Mutation",
      showModal: false,
      showmodal_zindex: "z-index:1000",
      grid2: new Grid(),
      acuanEdit: null,
      startDate: "2023",

      storeCodeOptions: [],
      tmp_storeCode: [],
      yearx: "",
      blth: "",

      whsCodeOptions: [],
      tmp_whsCode: [],

      optCodeOptions: [],
      tmp_optCode: [],

      priceCodeOptions: [],
      tmp_priceCode: [],

      optDetailOptions: [],
      tmp_optDetail: [],

      todo: {
        storeCode: "",
        bulan: "",
        tahun: "",
        lastday: "",
        storeCodeName: "",
        optCode: "",
        optDetail: "",
        priceCode: "",
      },

      errorList: "",
      errorField: {
        storeCode: "",
        bulan: "",
        tahun: "",
        lastday: "",
        storeCodeName: "",
        optCode: "",
        optDetail: "",
        priceCode: "",
      },

      userid: "",
      flagProses: 0,

      gudangx: {},

      isCheckAll: false,
      langsdata: [],
      languages: [],
      selectedlang: "",
      flagCheckGudang: false,
      tombolUpdateStok: false,
      cboOptDetail_status: true,
      picked: "",

      flagDownloadPDF: 0,
      x_nomor_baris: 0,
      x_count: 0,

      limit_x: 100,
      nomor_x: 1,

      uObject: "",

      data_x_tabel: [],
      data_x_excel: [],
      nama_excelnya: "Mutasi_Stock",
      nama_sheetnya: "Mutasi_Stock",

      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],

      json_fields: {
        Nomor: "nomor",
        "Item Code": "itemcode",
        "Item Name": "itemname",
        "Stock Awal": "awalqty",
        "Gudang 15": "beliqty",
        "T.In": "tinqty",
        "In SO": "inso",
        "In Lain": "inlain",
        "Out POS": "posqty",
        "Out POS Promo": "posqty_promo",
        "Out POS NonPromo": "posqty_nonpromo",
        "T.Out": "toutqty",
        "SO Out": "soout",
        "Out Lain": "outlain",
        "IN Total": "intotal",
        "Out Total": "outtotal",
        "Stock Akhir": "akhirqty",
      },
    };
  },
  mounted() {
    const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
    //alert("AAAAA");
    // this.getTable();
    this.userid = cacheStoreAccess.user_uuid;
    //this.getBulan();
    this.getCbostoreCode();
    this.getCbowhsCode();

    this.getCbopriceCode();
    this.getCbooptCode();

    this.jqueryDelEdit();
    this.$root.hideLoading();
  },
  methods: {
    async getDataStokMutation_excel() {
      var mythis = this;
      mythis.$root.showLoading();

      var storeCode = mythis.todo.storeCode;
      var whsCode = mythis.todo.whsCode;
      var optCode = mythis.todo.optCode;
      var optDetail = mythis.todo.optDetail;
      var priceCode = mythis.todo.priceCode;
      var viewx = mythis.picked;

      var tanggal =
        mythis.todo.tahun + "-" + mythis.todo.bulan + "-" + mythis.todo.lastday;

      mythis.nomor_x = 1;
      var br_pdf = 0;
      var br_flag = 0;
      var br_string = "";

      var html = "";
      var nn = 0;
      var count = 1;
      var limitx = mythis.limit_x;
      var offsetx = 0;

      var baris = 0;

      while (count > 0) {
        offsetx = limitx * nn;

        /*
&storeCode=${storeCode}&whsCode=${whsCode}&tglCutOff=${tanggal}&priceCode=${priceCode}&optCode=${optCode}&optDetail=${optDetail}&viewx=${viewx}`


        */
        const reqData = await axios({
          method: "get",
          url:
            this.$root.API_ERP +
            "/wms/mutasiStokRincian/" +
            "?limit=" +
            limitx +
            "&offset=" +
            offsetx +
            "&storeCode=" +
            storeCode +
            "&whsCode=" +
            whsCode +
            "&tglCutOff=" +
            tanggal +
            "&priceCode=" +
            priceCode +
            "&optCode=" +
            optCode +
            "&optDetail=" +
            optDetail +
            "&viewx=" +
            viewx +
            "",
        });

        const resData = reqData.data;
        mythis.x_nomor_baris = parseInt(resData.nomorBaris);
        mythis.x_count = parseInt(resData.count);

        if (resData.results.length > 0) {
          Object.keys(resData.results).forEach(function (key) {
            const countries_x = {
              nomor: baris + 1,
              itemcode: resData.results[key].itemcode,
              itemname: resData.results[key].itemname,
              awalqty: resData.results[key].awalqty,
              beliqty: resData.results[key].beliqty,
              tinqty: resData.results[key].tinqty,
              inso: resData.results[key].inso,
              inlain: resData.results[key].inlain,
              posqty: resData.results[key].posqty,
              posqty_promo: resData.results[key].posqty_promo,
              posqty_nonpromo: resData.results[key].posqty_nonpromo,
              toutqty: resData.results[key].toutqty,
              soout: resData.results[key].soout,
              outlain: resData.results[key].outlain,
              intotal: resData.results[key].intotal,
              outtotal: resData.results[key].outtotal,
              akhirqty: resData.results[key].akhirqty,
            };
            mythis.data_x_excel[baris] = countries_x;
            baris = baris + 1;
          });
        }

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
      
      mythis.$root.hideLoading();

      mythis.json_data = mythis.data_x_excel;
      var a = new Date().toLocaleString("en-GB");
      mythis.nama_excelnya = "Mutasi_Stock_" + a + ".xls";
      mythis.nama_sheetnya = "Mutasi_Stock_" + a + ".xls";

      return html;
    },

    async getDataStokMutation() {
      var mythis = this;

      var storeCode = mythis.todo.storeCode;
      var whsCode = mythis.todo.whsCode;
      var optCode = mythis.todo.optCode;
      var optDetail = mythis.todo.optDetail;
      var priceCode = mythis.todo.priceCode;
      var viewx = mythis.picked;

      var tanggal =
        mythis.todo.tahun + "-" + mythis.todo.bulan + "-" + mythis.todo.lastday;

      mythis.nomor_x = 1;
      var br_pdf = 0;
      var br_flag = 0;
      var br_string = "";

      var html = "";
      var nn = 0;
      var count = 1;
      var limitx = mythis.limit_x;
      var offsetx = 0;
      while (count > 0) {
        offsetx = limitx * nn;

        /*
&storeCode=${storeCode}&whsCode=${whsCode}&tglCutOff=${tanggal}&priceCode=${priceCode}&optCode=${optCode}&optDetail=${optDetail}&viewx=${viewx}`


        */
        const reqData = await axios({
          method: "get",
          url:
            this.$root.API_ERP +
            "/wms/mutasiStokRincian/" +
            "?limit=" +
            limitx +
            "&offset=" +
            offsetx +
            "&storeCode=" +
            storeCode +
            "&whsCode=" +
            whsCode +
            "&tglCutOff=" +
            tanggal +
            "&priceCode=" +
            priceCode +
            "&optCode=" +
            optCode +
            "&optDetail=" +
            optDetail +
            "&viewx=" +
            viewx +
            "",
        });

        const resData = reqData.data;
        mythis.x_nomor_baris = parseInt(resData.nomorBaris);
        mythis.x_count = parseInt(resData.count);

        if (resData.results.length > 0) {
          Object.keys(resData.results).forEach(function (key) {
            if (
              resData.results[key].dscription == "Saldo Awal" ||
              resData.results[key].dscription == "Saldo Akhir"
            ) {
              resData.results[key].dscription =
                "<b><i>" + resData.results[key].dscription + "</i></b>";
            }

            ///////////////////////////////////////////////////////////
            br_string = "";
            if (br_pdf == 30 && br_flag == 0) {
              br_pdf = 0;
              br_flag = 1;
              br_string = 'class="newPage"';
              //mythis.html_pdf +='<tr id="newPage"><td colspan="8">&nbsp;</td></tr>';
            }
            if (br_pdf == 35 && br_flag == 1) {
              //mythis.html_pdf +='<tr id="newPage"><td colspan="8">&nbsp;</td></tr>';
              br_pdf = 0;
              br_string = 'class="newPage"';
            }

            if (br_string == 'class="newPage"') {
              html += '<tr ><td colspan="8">&nbsp;</td></tr>';
              html += '<tr ><td colspan="8">&nbsp;</td></tr>';
              html += '<tr ><td colspan="8">&nbsp;</td></tr>';
            }
            ///////////////////////////////////////////////////////////
            html +=
              "<tr " +
              br_string +
              'style="font-size: 8px"><th>' +
              mythis.nomor_x +
              "</th><th>" +
              resData.results[key].itemcode +
              "</th><th>" +
              resData.results[key].itemname +
              '</th><th style="text-align:right">' +
              resData.results[key].awalqty.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].beliqty.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].tinqty.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].inso.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].inlain.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].posqty.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].posqty_promo.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].posqty_nonpromo.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].toutqty.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].soout.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].outlain.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].intotal.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].outtotal.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].akhirqty.toLocaleString("en-US") +
              "</th></tr>";

            mythis.nomor_x++;
            br_pdf++;
          });
        }

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

      return html;
    },

    async getDataStokMutation_unit_value() {
      var mythis = this;

      var storeCode = mythis.todo.storeCode;
      var whsCode = mythis.todo.whsCode;
      var optCode = mythis.todo.optCode;
      var optDetail = mythis.todo.optDetail;
      var priceCode = mythis.todo.priceCode;
      var viewx = mythis.picked;

      var tanggal =
        mythis.todo.tahun + "-" + mythis.todo.bulan + "-" + mythis.todo.lastday;

      mythis.nomor_x = 1;
      var br_pdf = 0;
      var br_flag = 0;
      var br_string = "";

      var html = "";
      var nn = 0;
      var count = 1;
      var limitx = mythis.limit_x;
      var offsetx = 0;
      while (count > 0) {
        offsetx = limitx * nn;

        /*
&storeCode=${storeCode}&whsCode=${whsCode}&tglCutOff=${tanggal}&priceCode=${priceCode}&optCode=${optCode}&optDetail=${optDetail}&viewx=${viewx}`


        */
        const reqData = await axios({
          method: "get",
          url:
            this.$root.API_ERP +
            "/wms/mutasiStokRincian/" +
            "?limit=" +
            limitx +
            "&offset=" +
            offsetx +
            "&storeCode=" +
            storeCode +
            "&whsCode=" +
            whsCode +
            "&tglCutOff=" +
            tanggal +
            "&priceCode=" +
            priceCode +
            "&optCode=" +
            optCode +
            "&optDetail=" +
            optDetail +
            "&viewx=" +
            viewx +
            "",
        });

        const resData = reqData.data;
        mythis.x_nomor_baris = parseInt(resData.nomorBaris);
        mythis.x_count = parseInt(resData.count);

        if (resData.results.length > 0) {
          Object.keys(resData.results).forEach(function (key) {
            if (
              resData.results[key].dscription == "Saldo Awal" ||
              resData.results[key].dscription == "Saldo Akhir"
            ) {
              resData.results[key].dscription =
                "<b><i>" + resData.results[key].dscription + "</i></b>";
            }

            ///////////////////////////////////////////////////////////
            br_string = "";
            if (br_pdf == 25 && br_flag == 0) {
              br_pdf = 0;
              br_flag = 1;
              br_string = 'class="newPage"';
              //mythis.html_pdf +='<tr id="newPage"><td colspan="8">&nbsp;</td></tr>';
            }
            if (br_pdf == 25 && br_flag == 1) {
              //mythis.html_pdf +='<tr id="newPage"><td colspan="8">&nbsp;</td></tr>';
              br_pdf = 0;
              br_string = 'class="newPage"';
            }

            if (br_string == 'class="newPage"') {
              html += '<tr ><td colspan="8">&nbsp;</td></tr>';
              html += '<tr ><td colspan="8">&nbsp;</td></tr>';
              html += '<tr ><td colspan="8">&nbsp;</td></tr>';
            }
            ///////////////////////////////////////////////////////////
            html +=
              "<tr " +
              br_string +
              'style="font-size: 8px"><th>' +
              mythis.nomor_x +
              "</th><th>" +
              resData.results[key].itemcode +
              "</th><th>" +
              resData.results[key].itemname +
              '</th><th style="text-align:right">' +
              resData.results[key].awalqty.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].beliqty.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].tinqty.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].inlain.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].posqty.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].toutqty.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].outlain.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].intotal.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].outtotal.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].akhirqty.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].awalqtyval.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].beliqtyval.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].tinqtyval.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].inlainval.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].posqtyval.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].toutqtyval.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].outlainval.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].intotalval.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].outtotalval.toLocaleString("en-US") +
              '</th><th style="text-align:right">' +
              resData.results[key].akhirqtyval.toLocaleString("en-US") +
              "</th></tr>";

            mythis.nomor_x++;
            br_pdf++;
          });
        }

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

      return html;
    },

    async exportToPDF() {
      //alert("AAAA");
      var mythis = this;
      this.$root.showLoading();

      const tmp_storeCode = this.tmp_storeCode.label.split("-");
      //const tmp_itemCode = this.tmp_itemCode.label.split("-");
      const tmp_whsCode = this.tmp_whsCode.label.split("-");
      const tmp_optCode = this.tmp_optCode.label.split("-");
      const tmp_optDetail = this.tmp_optDetail.label.split("-");
      const tmp_priceCode = this.tmp_priceCode.label.split("-");

      var tanggal =
        mythis.todo.tahun + "-" + mythis.todo.bulan + "-" + mythis.todo.lastday;

      if (
        mythis.picked == "unit" ||
        mythis.picked == "value" ||
        mythis.picked == "value_cost"
      ) {
        var data_x = await this.getDataStokMutation();
        var judul =
          ' <tr> <th class="borderx">No.</th><th class="borderx">Item Code</th><th class="borderx">Item Name</th><th class="borderx" style="text-align:right">Qty Awal</th><th class="borderx" style="text-align:right">In Gudang15</th><th style="text-align:right" class="borderx">T.In</th><th style="text-align:right" class="borderx">In SO</th><th style="text-align:right" class="borderx">In Lain</th><th style="text-align:right" class="borderx">Out POS</th><th style="text-align:right" class="borderx">Out POS Promo</th><th style="text-align:right" class="borderx">Out POS NonPromo</th><th style="text-align:right" class="borderx">T.Out</th><th style="text-align:right" class="borderx">Out SO</th><th style="text-align:right" class="borderx">Out Lain</th><th style="text-align:right" class="borderx">In Total</th><th style="text-align:right" class="borderx">Out Total</th><th style="text-align:right" class="borderx">Qty Akhir</th></tr>';
      } else {
        var data_x = await this.getDataStokMutation_unit_value();
        var judul =
          '<tr> <th class="borderx">No.</th><th class="borderx">Item Code</th><th class="borderx">Item Name</th><th class="borderx" style="text-align:right">Qty Awal</th><th class="borderx" style="text-align:right">In Gudang15</th><th style="text-align:right" class="borderx">T.In</th><th style="text-align:right" class="borderx">In Lain</th><th style="text-align:right" class="borderx">Pos Qty</th><th style="text-align:right" class="borderx">Qty Out</th><th style="text-align:right" class="borderx">Out Lain</th><th style="text-align:right" class="borderx">In Total</th><th style="text-align:right" class="borderx">Out Total</th><th style="text-align:right" class="borderx">Qty Akhir</th><th class="borderx" style="text-align:right">Qty Awal Val</th><th class="borderx" style="text-align:right">In Gudang15 Val</th><th style="text-align:right" class="borderx">T.In Val</th><th style="text-align:right" class="borderx">In Lain Val</th><th style="text-align:right" class="borderx">Pos Qty Val</th><th style="text-align:right" class="borderx">Qty Out Val</th><th style="text-align:right" class="borderx">Out Lain Val</th><th style="text-align:right" class="borderx">In Total Val</th><th style="text-align:right" class="borderx">Out Total Val</th><th style="text-align:right" class="borderx">Qty Akhir Val</th></tr>';
      }

      var xxx =
        '<style> p, span, table { font-size: 9px } table { width: 100%; } .borderx { border-bottom: 1px solid black; border-top: 1px solid black; } .bordery { border-top: 1px solid black; } </style> <h5>STOCK MUTATION</h5><table cellpadding="0"><tr>            <th width="10%">Store Code</th> <th width="20%">: ' +
        tmp_storeCode[0] +
        '</th>         <th width="10%">WHS Code</th> <th width="20%">: ' +
        tmp_whsCode[0] +
        '</th>         <th width="10%">Store Name</th> <th width="20%">: ' +
        tmp_storeCode[1] +
        "</th>        </tr><tr>        <th>WHS Name</th> <th>: " +
        tmp_whsCode[1] +
        "</th>        <th>Price</th> <th>: " +
        tmp_priceCode[0] +
        "</th>         <th>Month/Year Period</th> <th>: " +
        tanggal +
        "</th>        </tr> <tr>          <th>Optional</th> <th>: " +
        tmp_optCode[0] +
        "</th>        <th>Optional Detail</th> <th>: " +
        this.tmp_optDetail.label +
        "</th>        <th>View</th> <th>: " +
        mythis.picked +
        "</th>        </tr>        <tr><th>Print Date</th> <th>: " +
        this.formatDate(new Date()) +
        ' </tr> </table>  <table id="tb-item" cellpadding="4" border="0">' +
        judul +
        data_x +
        '<tr> <th colspan="17" class="bordery"></th></tr> </table>';

      //'<tr> <th colspan="2" class="bordery">Mengetahui,</th> <th style="text-align:right" colspan="2" class="">Menyetujui,</th> <th style="text-align:right" colspan="2" class="">&nbsp</th> </tr>

      this.$root.hideLoading();

      var element = xxx;
      var opt = {
        margin: [5, 5, 0, 5], //top, left, buttom, right,
        filename:
          "STOCK_MUTATION_" +
          tmp_storeCode[0] +
          "_" +
          tmp_whsCode[0] +
          // "_" +
          // tmp_itemCode[0] +
          "_" +
          tanggal +
          ".pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { dpi: 300, letterRendering: true },
        //jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
        pagebreak: { before: ".newPage" },
      };

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
    getTable_unit_value() {
      var mythis = this;

      var storeCode = mythis.todo.storeCode;
      var whsCode = mythis.todo.whsCode;
      var optCode = mythis.todo.optCode;
      var optDetail = mythis.todo.optDetail;
      var priceCode = mythis.todo.priceCode;
      var viewx = mythis.picked;

      var tanggal =
        mythis.todo.tahun + "-" + mythis.todo.bulan + "-" + mythis.todo.lastday;

      //////////////////////////////
      $("#wrapper2").remove();
      var e = $('<div id="wrapper2"></div>');
      $("#box").append(e);
      this.grid2 = new Grid();
      //////////////////////////////
      this.grid2.updateConfig({
        //language: idID,
        pagination: {
          limit: mythis.limit_x,
          server: {
            url: (prev, page, limit) =>
              `${prev}${prev.includes("?") ? "&" : "?"}limit=${limit}&offset=${
                page * limit
              }&storeCode=${storeCode}&whsCode=${whsCode}&tglCutOff=${tanggal}&priceCode=${priceCode}&optCode=${optCode}&optDetail=${optDetail}&viewx=${viewx}`,
          },
        },
        search: {
          server: {
            url: (prev, keyword) => `${prev}?search=${keyword}`,
          },
        },
        columns: [
          // {
          //   id: "storecode",
          //   name: html(
          //     '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Kode Toko</b></div>'
          //   ),
          // },

          {
            id: "ItemCode",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Item Code</b></div>'
            ),
          },

          {
            id: "itemName",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Item Name</b></div>'
            ),
          },

          {
            id: "awalqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Qty Awal</b></div>'
            ),
          },

          {
            id: "beliqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>In Gudang15</b></div>'
            ),
          },

          {
            id: "tinqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>T.In</b></div>'
            ),
          },

          // {
          //   id: "inso",
          //   name: html(
          //     '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>In SO</b></div>'
          //   ),
          // },

          {
            id: "inlain",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>In Lain</b></div>'
            ),
          },

          {
            id: "posqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Pos</b></div>'
            ),
          },
          {
            id: "toutqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>T.Out</b></div>'
            ),
          },

          // {
          //   id: "soout",
          //   name: html(
          //     '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Out SO</b></div>'
          //   ),
          // },

          {
            id: "outlain",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Out Lain</b></div>'
            ),
          },

          {
            id: "intotal",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>In Total</b></div>'
            ),
          },
          {
            id: "outtotal",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Out Total</b></div>'
            ),
          },
          {
            id: "akhirqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Qty Akhir</b></div>'
            ),
          },
          /////////////////////////////////////////////////////////////////////////////////

          {
            id: "awalqtyval",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Qty Awal Value</b></div>'
            ),
          },

          {
            id: "beliqtyval",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>In Gudang15 Value</b></div>'
            ),
          },

          {
            id: "tinqtyval",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>T.In Value</b></div>'
            ),
          },

          // {
          //   id: "inso",
          //   name: html(
          //     '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>In SO</b></div>'
          //   ),
          // },

          {
            id: "inlainval",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>In Lain Value</b></div>'
            ),
          },

          {
            id: "posqtyval",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Pos Qty Value</b></div>'
            ),
          },
          {
            id: "toutqtyval",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Qty Out Value</b></div>'
            ),
          },

          // {
          //   id: "sooutval",
          //   name: html(
          //     '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Out SO Value</b></div>'
          //   ),
          // },

          {
            id: "outlainval",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Out Lain Value</b></div>'
            ),
          },

          {
            id: "intotalval",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>In Total Value</b></div>'
            ),
          },
          {
            id: "outtotalval",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Out Total Value</b></div>'
            ),
          },
          {
            id: "akhirqtyval",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Qty Akhir Value</b></div>'
            ),
          },
          /////////////////////////////////////////////////////////////////////////////////
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
          url: this.$root.API_ERP + "/wms/mutasiStokRincian",
          then: (data) =>
            data.results.map((card) => [
              card.itemcode,
              card.itemname,
              card.awalqty.toLocaleString("en-US"),
              card.beliqty.toLocaleString("en-US"),
              card.tinqty.toLocaleString("en-US"),
              //card.inso.toLocaleString("en-US"),
              card.inlain.toLocaleString("en-US"),
              card.posqty.toLocaleString("en-US"),
              card.toutqty.toLocaleString("en-US"),
              //card.soout.toLocaleString("en-US"),
              card.outlain.toLocaleString("en-US"),
              card.intotal.toLocaleString("en-US"),
              card.outtotal.toLocaleString("en-US"),
              card.akhirqty.toLocaleString("en-US"),

              card.awalqtyval.toLocaleString("en-US"),
              card.beliqtyval.toLocaleString("en-US"),
              card.tinqtyval.toLocaleString("en-US"),
              //card.insoval.toLocaleString("en-US"),
              card.inlainval.toLocaleString("en-US"),
              card.posqtyval.toLocaleString("en-US"),
              card.toutqtyval.toLocaleString("en-US"),
              //card.sooutval.toLocaleString("en-US"),
              card.outlainval.toLocaleString("en-US"),
              card.intotalval.toLocaleString("en-US"),
              card.outtotalval.toLocaleString("en-US"),
              card.akhirqtyval.toLocaleString("en-US"),
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

      $(document).off("click", "#editData");
      $(document).off("click", "#deleteData");
      mythis.jqueryDelEdit();

      mythis.flagDownloadPDF = 1;
    },
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
    getTable() {
      var mythis = this;

      var storeCode = mythis.todo.storeCode;
      var whsCode = mythis.todo.whsCode;
      var optCode = mythis.todo.optCode;
      var optDetail = mythis.todo.optDetail;
      var priceCode = mythis.todo.priceCode;
      var viewx = mythis.picked;

      var tanggal =
        mythis.todo.tahun + "-" + mythis.todo.bulan + "-" + mythis.todo.lastday;

      //////////////////////////////
      $("#wrapper2").remove();
      var e = $('<div id="wrapper2"></div>');
      $("#box").append(e);
      this.grid2 = new Grid();
      //////////////////////////////
      this.grid2.updateConfig({
        //language: idID,
        pagination: {
          limit: mythis.limit_x,
          server: {
            url: (prev, page, limit) =>
              `${prev}${prev.includes("?") ? "&" : "?"}limit=${limit}&offset=${
                page * limit
              }&storeCode=${storeCode}&whsCode=${whsCode}&tglCutOff=${tanggal}&priceCode=${priceCode}&optCode=${optCode}&optDetail=${optDetail}&viewx=${viewx}`,
          },
        },
        search: {
          server: {
            url: (prev, keyword) => `${prev}?search=${keyword}`,
          },
        },
        columns: [
          // {
          //   id: "storecode",
          //   name: html(
          //     '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Kode Toko</b></div>'
          //   ),
          // },

          {
            id: "ItemCode",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Item Code</b></div>'
            ),
          },

          {
            id: "itemName",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Item Name</b></div>'
            ),
          },

          {
            id: "awalqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Qty Awal</b></div>'
            ),
          },

          {
            id: "beliqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>In Gudang15</b></div>'
            ),
          },

          {
            id: "tinqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>T.In</b></div>'
            ),
          },

          {
            id: "inso",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>In SO</b></div>'
            ),
          },

          {
            id: "inlain",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>In Lain</b></div>'
            ),
          },

          {
            id: "posqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Total Out POS</b></div>'
            ),
          },
          {
            id: "posqty_promo",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Out POS Promo</b></div>'
            ),
          },
          {
            id: "posqty_nonpromo",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Out POS NonPromo</b></div>'
            ),
          },
          {
            id: "toutqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>T.Out</b></div>'
            ),
          },

          {
            id: "soout",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Out SO</b></div>'
            ),
          },

          {
            id: "outlain",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Out Lain</b></div>'
            ),
          },

          {
            id: "intotal",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>In Total</b></div>'
            ),
          },
          {
            id: "outtotal",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Out Total</b></div>'
            ),
          },
          {
            id: "akhirqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Qty Akhir</b></div>'
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
          url: this.$root.API_ERP + "/wms/mutasiStokRincian",
          then: (data) =>
            data.results.map((card) => [
              card.itemcode,
              card.itemname,
              card.awalqty.toLocaleString("en-US"),
              card.beliqty.toLocaleString("en-US"),
              card.tinqty.toLocaleString("en-US"),
              card.inso.toLocaleString("en-US"),
              card.inlain.toLocaleString("en-US"),
              card.posqty.toLocaleString("en-US"),
              card.posqty_promo.toLocaleString("en-US"),
              card.posqty_nonpromo.toLocaleString("en-US"),
              card.toutqty.toLocaleString("en-US"),
              card.soout.toLocaleString("en-US"),
              card.outlain.toLocaleString("en-US"),
              card.intotal.toLocaleString("en-US"),
              card.outtotal.toLocaleString("en-US"),
              card.akhirqty.toLocaleString("en-US"),
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

      $(document).off("click", "#editData");
      $(document).off("click", "#deleteData");
      mythis.jqueryDelEdit();

      mythis.flagDownloadPDF = 1;
    },
    async prosesDataMutasi() {
      var mythis = this;

      if (this.todo.storeCode == "" || this.todo.storeCode == undefined) {
        // toast.error("Silakan pilih Store terlebih dahulu", {
        //   theme: "colored",
        // });
        this.$root.showAlertFunction('warning', 'Pencarian Gagal!', 'Silakan pilih Store terlebih dahulu.');
        return false;
      }

      if (this.todo.whsCode == "" || this.todo.whsCode == undefined) {
        // toast.error("Silakan pilih Warehouse terlebih dahulu", {
        //   theme: "colored",
        // });
        this.$root.showAlertFunction('warning', 'Pencarian Gagal!', 'Silakan pilih Warehouse terlebih dahulu.');
        return false;
      }

      if (this.todo.priceCode == "" || this.todo.priceCode == undefined) {
        // toast.error("Silakan pilih Price Code terlebih dahulu", {
        //   theme: "colored",
        // });
        this.$root.showAlertFunction('warning', 'Pencarian Gagal!', 'Silakan pilih Price Code terlebih dahulu.');
        return false;
      }

      if (this.todo.optCode == "" || this.todo.optCode == undefined) {
        // toast.error("Silakan pilih Optional terlebih dahulu", {
        //   theme: "colored",
        // });
        this.$root.showAlertFunction('warning', 'Pencarian Gagal!', 'Silakan pilih Optional terlebih dahulu.');
        return false;
      }

      if (this.todo.optDetail == "" || this.todo.optDetail == undefined) {
        // toast.error("Silakan pilih Optional Detail terlebih dahulu", {
        //   theme: "colored",
        // });
        this.$root.showAlertFunction('warning', 'Pencarian Gagal!', 'Silakan pilih Optional Detail terlebih dahulu.');
        return false;
      }
      if (this.picked == "" || this.picked == undefined) {
        // toast.error("Silakan pilih Tipe View terlebih dahulu", {
        //   theme: "colored",
        // });
        this.$root.showAlertFunction('warning', 'Pencarian Gagal!', 'Silakan pilih Tipe View terlebih dahulu.');
        return false;
      }
      if (
        (this.blth.month == "" || this.blth.month == undefined) &&
        this.blth.month != 0
      ) {
        // toast.error("Silakan pilih Bulan Tahun terlebih dahulu", {
        //   theme: "colored",
        // });
        this.$root.showAlertFunction('warning', 'Pencarian Gagal!', 'Silakan pilih Bulan Tahun terlebih dahulu.');
        return false;
      }

      mythis.todo.bulan = mythis.blth.month + 1;
      mythis.todo.tahun = mythis.blth.year;

      mythis.todo.lastday = mythis.daysInMonth(
        mythis.todo.tahun,
        mythis.todo.bulan
      );

      mythis.todo.bulan = String(mythis.todo.bulan).padStart(2, "0");

      if (
        mythis.picked == "unit" ||
        mythis.picked == "value" ||
        mythis.picked == "value_cost"
      ) {
        mythis.getTable();
        var yyy = await mythis.getDataStokMutation_excel();
      } else {
        mythis.getTable_unit_value();
      }
    },

    getCbooptDetail(id) {
      //alert("AAA");
      var mythis = this;
      mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getCbooptDetail" + "?id=" + id)
        .then((res) => {
          //mythis.optDetailOptions = res.data.data;
          //console.log(res.data.data);

          const newFirstElement = {
            code: "all",
            label: "All Product",
          };

          const newArray = [newFirstElement].concat(res.data.data);

          mythis.optDetailOptions = newArray;

          mythis.$root.hideLoading();
        });
    },
    getCbopriceCode() {
      //alert("AAA");
      var mythis = this;
      //mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getCbopriceCode")
        .then((res) => {
          mythis.priceCodeOptions = res.data.data;
          //console.log(res.data.data);
          //mythis.$root.hideLoading();
        });
    },
    getCbooptCode() {
      //alert("AAA");
      var mythis = this;
      //mythis.$root.showLoading();
      axios.get(this.$root.API_ERP + "/wms/getCbooptCode").then((res) => {
        mythis.optCodeOptions = res.data.data;
        //console.log(res.data.data);
        //mythis.$root.hideLoading();
      });
    },
    mySelectEvent2() {
      this.todo.whsCode = this.tmp_whsCode.code;
    },
    mySelectEvent3() {
      this.todo.optCode = this.tmp_optCode.code;
      this.getCbooptDetail(this.todo.optCode);
      this.cboOptDetail_status = false;
    },
    mySelectEvent4() {
      this.todo.optDetail = this.tmp_optDetail.code;
    },
    mySelectEvent5() {
      this.todo.priceCode = this.tmp_priceCode.code;
    },
    getCbowhsCode() {
      //alert("AAA");
      var mythis = this;
      //mythis.$root.showLoading();
      axios.get(this.$root.API_ERP + "/wms/getCbowhsCode").then((res) => {
        mythis.whsCodeOptions = res.data.data;
        //console.log(res.data.data);
        //mythis.$root.hideLoading();
      });
    },
    daysInMonth(y, m) {
      return new Date(y, m, 0).getDate();
    },
    close: function () {
      this.showModal = false;
      this.todo = {};
      this.flagCheckGudang = false;
      this.tombolUpdateStok = false;
      this.tmp_storeCode = [];
      this.blth = "";
      this.langsdata = [];
      this.languages = [];
      this.flagProses = 0;
    },
    modal() {
      // binding data to form modal
      this.showModal = true;
    },
    checkAll: function () {
      this.isCheckAll = !this.isCheckAll;
      this.languages = [];
      if (this.isCheckAll) {
        // Check all
        for (var key in this.langsdata) {
          this.languages.push(this.langsdata[key]);
        }
      }
    },
    updateCheckall: function () {
      if (this.languages.length == this.langsdata.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
    },
    prosesDataStockUpdate() {
      var mythis = this;

      Swal.fire({
        title: "Proses Update Stok dari Recalculate",
        text: "Apakah kamu yakin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          //////////////////////////////////////

          mythis.$root.showLoading();
          axios
            .post(
              mythis.$root.API_ERP +
                "/wms/prosesRecalculateDataUpdateStok",
              {
                data: mythis.todo,
                whs: mythis.languages,
                fileUpload: "form satuan",
                userid: mythis.userid,
              }
            )
            .then((res) => {
              Swal.fire(
                "Proses Update Stok dari Recalculate Selesai!",
                res.data.message,
                "success"
              );
              mythis.$root.hideLoading();
              mythis.flagProses = 0;

              mythis.tombolUpdateStok = false;
            })
            .catch(function (error) {
              if (error.response) {
                //console.log(error.response.data);
                if (error.response.status == 422) {
                  mythis.errorList = error.response.data;
                  mythis.$root.hideLoading();
                  if (Object.keys(mythis.errorList).length > 0) {
                    //refresh semua menjadi false
                    Object.keys(mythis.errorField).forEach(function (key) {
                      mythis.errorField[key] = false;
                    });
                    //membuat jika error jadi true
                    Object.keys(mythis.errorList).forEach(function (key) {
                      // toast.error(mythis.errorList[key], { theme: "colored" });
                      mythis.$root.showAlertFunction('warning', 'Opss..!', mythis.errorList[key]);

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
          //////////////////////////////////////
        }
      });
    },

    prosesData() {
      var mythis = this;

      Swal.fire({
        title: "Proses Recalculate",
        text: "Apakah kamu yakin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          //////////////////////////////////////

          mythis.$root.showLoading();
          axios
            .post(mythis.$root.API_ERP + "/wms/prosesRecalculateData", {
              data: mythis.todo,
              whs: mythis.languages,
              fileUpload: "form satuan",
              userid: mythis.userid,
            })
            .then((res) => {
              Swal.fire(
                "Proses Recalculate Selesai!",
                res.data.message,
                "success"
              );
              mythis.$root.hideLoading();
              mythis.flagProses = 1;

              const date = new Date();

              let day = date.getDate();
              let month = date.getMonth() + 1;
              let year = date.getFullYear();

              if (mythis.todo.bulan == month && mythis.todo.tahun == year) {
                mythis.tombolUpdateStok = true;
              } else {
                mythis.tombolUpdateStok = false;
              }
            })
            .catch(function (error) {
              if (error.response) {
                //console.log(error.response.data);
                if (error.response.status == 422) {
                  mythis.errorList = error.response.data;
                  mythis.$root.hideLoading();
                  if (Object.keys(mythis.errorList).length > 0) {
                    //refresh semua menjadi false
                    Object.keys(mythis.errorField).forEach(function (key) {
                      mythis.errorField[key] = false;
                    });
                    //membuat jika error jadi true
                    Object.keys(mythis.errorList).forEach(function (key) {
                      // toast.error(mythis.errorList[key], { theme: "colored" });
                      mythis.$root.showAlertFunction('warning', 'Opss..!', mythis.errorList[key]);

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
          //////////////////////////////////////
        }
      });
    },
    Recalculate() {
      var mythis = this;
      //alert("AAA" + mythis.languages.length);

      if (mythis.languages.length == 0) {
        // toast.error("Silakan pilih warehouse terlebih dahulu", {
        //   theme: "colored",
        // });
        this.$root.showAlertFunction('warning', 'Pencarian Gagal!', 'Silakan pilih warehouse terlebih dahulu.');
        return false;
      }

      this.prosesData();
    },

    StockUpdate() {
      var mythis = this;
      //alert("AAA" + mythis.languages.length);

      if (mythis.languages.length == 0) {
        // toast.error("Silakan pilih warehouse terlebih dahulu", {
        //   theme: "colored",
        // });
        this.$root.showAlertFunction('warning', 'Pencarian Gagal!', 'Silakan pilih warehouse terlebih dahulu.');
        return false;
      }

      this.prosesDataStockUpdate();
    },

    mySelectEvent() {
      this.todo.storeCode = this.tmp_storeCode.code;
      this.todo.storeCodeName = this.tmp_storeCode.label;
    },
    getCbostoreCode() {
      var mythis = this;
      mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getCbostoreCode")
        .then((res) => {
          mythis.storeCodeOptions = res.data.data;
          
          const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
          this.tmp_storeCode = res.data.data.find(x => x.code == cacheStoreAccess.store_code);
          
          this.todo.storeCode = this.tmp_storeCode.code;
          this.todo.storeCodeName = this.tmp_storeCode.label;
          mythis.$root.hideLoading();
        });
    },

    jqueryDelEdit() {
      const mythis = this;

      // $(document).on("click", "#editData", function () {
      //   let id = $(this).data("id");
      //   mythis.idRincian = id;
      //   mythis.modal();
      //   mythis.$root.showLoading();
      //   axios
      //     .get(mythis.$root.API_ERP + `/wms/mdiscount/` + id)
      //     .then((res) => {
      //       //console.log(res.data.data);
      //       mythis.acuanEdit = id;
      //       mythis.todo2.discCode = res.data.data.discCode;
      //       mythis.todo2.discName = res.data.data.discName;

      //       document.getElementById("inputA").focus(); // sets the focus on the input

      //       mythis.$root.hideLoading();
      //     });
      // });
      // $(document).on("click", "#deleteData", function () {
      //   let id = $(this).data("id");
      //   mythis.deleteTodo(id);
      // });
    },

    /////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////
  },
};
</script>

<style scoped>
.input-error {
  border: red 1px solid;
}

input[type="checkbox"] {
  /* Double-sized Checkboxes */
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  transform: scale(2);
  padding: 10px;
}

/* Might want to wrap a span around your checkbox text */
.checkboxtext {
  /* Checkbox text */
  font-size: 110%;
  display: inline;
}

input[type="radio"] {
  transform: scale(1.5);
  margin-bottom: 15px; /* Apply some bottom margin */
}
</style>