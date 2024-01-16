<template>
  <div class="d-flex align-items-center mb-3 mt-1">
    <span class="badge rounded me-3 ms-1 badge-subtle-primary">
      <span class="fas fa-receipt fs-2 text-primary"></span>
    </span>
    <div class="col">
      <h5 class="mb-0 text-primary position-relative">
        <span class="bg-200 dark__bg-1100 pe-3 fs-2">Entry Cycle Count</span>
        <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
      </h5>
      <p class="mb-0 fs--1"><a href="javascript:void(0)" class="text-dark">Martha Tilaar Shop</a> / Entry Cycle Count</p>
    </div>
  </div>
  
  <div class="card shadow-none border mb-3">
    <div class="bg-holder bg-card d-none d-md-block" style="background-image:url('assets/img/illustration/reports-bg.png');"></div><!--/.bg-holder-->
    <div class="card-header z-1">
      <div class="row flex-between-center gx-0">
        <div class="col-lg-auto d-flex align-items-center"><img class="img-fluid" src="@/assets/img/illustration/reports-greeting.png" alt="">
          <div class="ms-x1">
            <h6 class="mb-1 text-primary">Martha Tilaar Shop</h6>
            <h4 class="mb-0 text-primary fw-bold"><span class="text-info fw-medium">Entry Cycle Count (CC)</span></h4>
          </div>
        </div>
        <!-- <div class="col-lg-auto pt-3 pt-lg-0">
          <button class="btn btn-primary" type="button" @click="clickNew()">
            New
          </button>
        </div> -->
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
        :show="showModal88"
        :style="showmodal88_zindex"
        @close2="showModal88 = false"
      >
        <template #header>
          <h3>Batch Number and Expired Date</h3>
        </template>
        <template #body>
          <div style="width: 90vw">
            <!-- <pre>{{ var_SO_awal_batch }}var_SO_awal_batch</pre>
            <pre>{{ var_so_d2 }}var_so_d2</pre> -->

            <h3>
              Total Qty:
              {{ var_SO_awal[key_total_sum_batch_awal] }}
            </h3>

            <br />
            <button
              id="tambah_batch"
              class="btn btn-sm btn-success text-white"
              @click="tambah_batch"
            >
              <i class="fa fa-list" aria-hidden="true"></i>&nbsp;&nbsp;Add Batch
            </button>
            <br />
            <br />
            <table
              class="table table-bordered table-striped table-vcenter"
              style="padding: 0; margin: 0; font-size: 13px"
            >
              <thead>
                <tr>
                  <td class="text-center"><strong>No</strong></td>
                  <td class="text-center"><strong>Optional</strong></td>
                  <td class="text-center"><strong>Optional Name</strong></td>
                  <td class="text-center"><strong>Item Code</strong></td>
                  <td class="text-center"><strong>Item Name</strong></td>
                  <td class="text-center"><strong>Batch No</strong></td>
                  <td class="text-center"><strong>Expired Date</strong></td>
                  <td class="text-center"><strong>Admin Qty</strong></td>
                  <td class="text-center"><strong>SO Qty</strong></td>
                  <td class="text-center"><strong>#</strong></td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in var_so_d2" :key="key">
                  <td>{{ value[1] }}</td>
                  <td>{{ value[2] }}</td>
                  <td>{{ value[3] }}</td>
                  <td>{{ value[4] }}</td>
                  <td>{{ value[5] }}</td>

                  <td>
                    <input
                      :id="
                        'd2_batch_' +
                        value[0] +
                        'AABBCC' +
                        value[4] +
                        'AABBCC' +
                        value[6]
                      "
                      :name="
                        'd2_batch_' +
                        value[0] +
                        'AABBCC' +
                        value[4] +
                        'AABBCC' +
                        value[6]
                      "
                      :data-id="
                        'd2_batch_' +
                        value[0] +
                        'AABBCC' +
                        value[4] +
                        'AABBCC' +
                        value[6]
                      "
                      :value="
                        var_SO_awal_batch[
                          value[0] + 'AABBCC' + value[4] + 'AABBCC' + value[6]
                        ].batch
                      "
                      type="text"
                      style="width: 10em"
                      :disabled="
                        var_SO_awal_batch[
                          value[0] + 'AABBCC' + value[4] + 'AABBCC' + value[6]
                        ].batch == '000000'
                      "
                    />
                  </td>
                  <td>
                    <VueDatePicker
                      v-model="
                        var_SO_awal_batch[
                          value[0] + 'AABBCC' + value[4] + 'AABBCC' + value[6]
                        ].expiredDate
                      "
                      :enableTimePicker="false"
                      :clearable="false"
                      :format="format"
                      :disabled="
                        var_SO_awal_batch[
                          value[0] + 'AABBCC' + value[4] + 'AABBCC' + value[6]
                        ].batch == '000000'
                      "
                    />
                  </td>
                  <td class="text-center">
                    {{ value[8] }}
                  </td>
                  <td class="text-center">
                    <input
                      :id="
                        'd2_soqty_' +
                        value[0] +
                        'AABBCC' +
                        value[4] +
                        'AABBCC' +
                        value[6]
                      "
                      :name="
                        'd2_soqty_' +
                        value[0] +
                        'AABBCC' +
                        value[4] +
                        'AABBCC' +
                        value[6]
                      "
                      :data-id="
                        'd2_soqty_' +
                        value[0] +
                        'AABBCC' +
                        value[4] +
                        'AABBCC' +
                        value[6]
                      "
                      :value="
                        var_SO_awal_batch[
                          value[0] + 'AABBCC' + value[4] + 'AABBCC' + value[6]
                        ].stockOpnameQty
                      "
                      type="number"
                      pattern="[0-9]"
                      onkeydown="javascript: return
                      event.keyCode == 69 ? false : true"
                      style="width: 6em"
                      min="0"
                    />
                  </td>
                  <td class="text-center">
                    <template
                      v-if="
                        var_SO_awal_batch[
                          value[0] + 'AABBCC' + value[4] + 'AABBCC' + value[6]
                        ].batch != '000000' && typeof value[0] === 'string'
                      "
                    >
                      <a
                        @click="
                          deleteItemTmp(
                            key,
                            value[0] + 'AABBCC' + value[4] + 'AABBCC' + value[6]
                          )
                        "
                        href="javascript:void(0)"
                        data-toggle="tooltip"
                        title=""
                        class="btn btn-danger btn-sm me-1"
                        data-original-title="Delete"
                        ><i class="fa fa-times"></i
                      ></a>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <br />
            <div class="text-center">
              <button
                type="button"
                class="btn btn-success"
                @click="saveQtyBatch()"
              >
                Save Qty Batch
              </button>
            </div>
          </div>
        </template>
        <template #footer>
          <button
            class="modal-default-button btn btn-secondary btn-sm me-1"
            @click="close88"
          >
            Close
          </button>
        </template>
      </FormModal>
      <!-------------------------------------------------------->
      <FormModal
        :show="showModal11"
        :style="showmodal11_zindex"
        @close2="showModal11 = false"
      >
        <template #header>
          <h3>Browse Data From Ticket CC</h3>
        </template>
        <template #body>
          <div style="width: 90vw">
            <template v-if="flagGetHeaderDN == false">
              <button
                class="btn btn-success btn-sm me-1"
                @click="getpagingTransOutfromTicket()"
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
            Close
          </button>
        </template>
      </FormModal>
      <!-------------------------------------------------------->

      <FormModal
        :show="showModal"
        :style="showmodal_zindex"
        @close="showModal = false"
      >
        <template #header>
          <h3>Entry Cycle Count (CC)</h3>
        </template>
        <template #body>
          <div style="width: 90vw">
            <!-- <pre>{{ var_SO_awal_batch }}</pre>
            <pre>{{ var_SO_awal_batch_final }}var_SO_awal_batch_final</pre> -->
            <!-- <pre>{{ dataTr104 }}</pre> -->
            <!-- <pre>{{ dataTr104 }}</pre>
            <pre>{{ tabel_ticket_so.length }}</pre> -->
            <!-- <pre>{{ flagSaveAwal }}</pre>
            <pre>{{ flagDownloadPDF }}</pre>
            <pre>{{ tabel_ticket_so }}</pre> -->

            <!-- <pre>{{ var_so_d1 }}</pre>
            <pre>{{ var_so_d2 }}var_so_d2</pre>
           
            <pre>{{ var_SO_awal_batch }}</pre>
            <pre>{{ var_SO_awal_batch_final }}var_SO_awal_batch_final</pre>
            <pre>{{ tabel_ticket_so_final }}tabel_ticket_so_final</pre> -->

            <!-- <pre>{{ var_SO_awal }}var_SO_awal</pre>
            <pre
              >{{ tabel_ticket_so_final_batch }}tabel_ticket_so_final_batch</pre
            >
            <pre>{{ var_so_variant }}var_so_variant</pre>
            <pre>{{ var_so_variant_fix }}var_so_variant_fix</pre>

            <pre>{{ API_split_var_SO_awal }}API_split_var_SO_awal</pre>
            <pre
              >{{
                API_split_tabel_ticket_so_final_batch
              }}API_split_tabel_ticket_so_final_batch</pre
            >
            <pre>{{ API_split_var_so_variant }}API_split_var_so_variant</pre>
            <pre>{{ var_SO_awal_qty_batch }}var_SO_awal_qty_batch</pre>
            <pre
              >{{ tabel_ticket_so_final_batch }}tabel_ticket_so_final_batch</pre
            >
            <pre
              >{{
                API_split_tabel_ticket_so_final_batch
              }}API_split_tabel_ticket_so_final_batch</pre
            > -->
            <div class="table-responsive">
              <table
                class="table table-borderless"
                style="background-color: #f5f7fa"
              >
                <tbody>
                  <tr>
                    <td class="text-left" width="10">Doc No</td>
                    <td class="text-left" width="1">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{ dataTr104.docNum == "" ? "-" : dataTr104.docNum }}
                      </strong>
                    </td>
                    <td class="text-left" width="10">Doc Status</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr104.docStatus == undefined
                            ? "-"
                            : dataTr104.docStatus == "O"
                            ? "Open"
                            : dataTr104.docStatus == "D"
                            ? "Draft"
                            : "Close"
                        }}</strong
                      >
                    </td>

                    <td class="text-left" width="10">Doc Date</td>
                    <td class="text-left" width="1">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr104.docDate == undefined
                            ? "-"
                            : dataTr104.docDate
                        }}
                      </strong>
                    </td>
                  </tr>

                  <tr>
                    <td class="text-left">Remarks</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left" width="10">
                      <template v-if="flagclickFromStore == true">
                        <textarea
                          id="w3review"
                          name="w3review"
                          rows="3"
                          cols="40"
                          v-model="dataTr104.comments"
                          placeholder=""
                          :disabled="
                            dataTr104.docStatus == 'O' ||
                            dataTr104.docStatus == 'C'
                          "
                        ></textarea>
                      </template>
                    </td>

                    <td class="text-left" width="10">Description</td>
                    <td class="text-left" width="1">:</td>
                    <td class="text-success text-left" width="10">
                      <template v-if="flagclickFromStore == true">
                        <textarea
                          id="w3review"
                          name="w3review"
                          rows="3"
                          cols="40"
                          v-model="dataTr104.description"
                          placeholder=""
                          :disabled="
                            dataTr104.docStatus == 'O' ||
                            dataTr104.docStatus == 'C'
                          "
                        ></textarea>
                      </template>
                    </td>

                    <td class="text-left" width="10">Reference</td>
                    <td class="text-left" width="1">:</td>
                    <td class="text-success text-left" width="10">
                      <template v-if="idRincian == ''">
                        <button
                          class="btn btn-success btn-sm me-1"
                          @click="clickReffNo"
                        >
                          Browse
                        </button>
                      </template>
                      <template v-if="flagclickFromStore == true">
                        <textarea
                          id="w3review"
                          name="w3review"
                          rows="3"
                          cols="40"
                          v-model="dataTr104.reference"
                          placeholder=""
                          :disabled="
                            dataTr104.docStatus == 'O' ||
                            dataTr104.docStatus == 'C'
                          "
                        ></textarea>
                      </template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="">
              <table
                class="table table-borderless"
                style="background-color: #f5f7fa"
              >
                <tbody>
                  <tr>
                    <td class="text-left" colspan="3">
                      <strong>Store CC ( Cycle Count)</strong>&nbsp;&nbsp;
                      <template
                        v-if="dataTr104.docStatus == 'D' && flagViewSO == false"
                      >
                        <button
                          class="btn btn-success btn-sm me-1"
                          @click="clickFromStore()"
                        >
                          Browse
                        </button>
                      </template>
                    </td>
                    <td class="text-left">From Store ID</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr104.storeCodeFrm == undefined
                            ? "-"
                            : dataTr104.storeCodeFrm
                        }}
                      </strong>
                    </td>
                    <td class="text-left">From Store Name</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr104.storeNameFrm == undefined
                            ? "-"
                            : dataTr104.storeNameFrm
                        }}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">WHS Code</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <template v-if="flagclickFromStore == true">
                        <v-select
                          :options="getCboWhsCodeOptions_from"
                          v-model="tmp_getCboWhsCodeOptions_from"
                          @update:modelValue="mySelectEvent51()"
                          :clearable="false"
                          :disabled="cboOptDetail2_status"
                        ></v-select>
                      </template>
                    </td>
                    <!-- <td class="text-left" colspan="6">&nbsp;</td> -->
                    <td class="text-left">Price Code</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <template v-if="flagclickFromStore == true">
                        <v-select
                          :options="getCboPriceCodeOptions_from"
                          v-model="tmp_getCboPriceCodeOptions_from"
                          @update:modelValue="mySelectEvent52()"
                          :clearable="false"
                          :disabled="true"
                        ></v-select>
                      </template>
                    </td>

                    <td class="text-left">Discount Code</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <template v-if="flagclickFromStore == true">
                        <v-select
                          :options="getCboDiscCodeOptions_from"
                          v-model="tmp_getCboDiscCodeOptions_from"
                          @update:modelValue="mySelectEvent53()"
                          :clearable="false"
                          :disabled="true"
                        ></v-select>
                      </template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <template v-if="flagSOCriteria">
              <div class="">
                <table
                  class="table table-borderless"
                  style="background-color: #f5f7fa"
                >
                  <tbody>
                    <tr>
                      <td class="text-left">
                        <strong>SO Criteria</strong>
                      </td>
                      <td class="text-left">&nbsp;</td>
                      <td class="text-success text-left">&nbsp;</td>
                      <td class="text-left">
                        <input
                          type="checkbox"
                          v-bind:value="1"
                          v-model="dataTr104.adminsamaso"
                          :disabled="cboOptDetail2_status"
                        />&nbsp;&nbsp;&nbsp;AdminQty=SOpnameQty
                      </td>
                      <td class="text-left">&nbsp;</td>
                      <td class="text-success text-left">&nbsp;</td>
                      <td class="text-left">
                        <input
                          type="checkbox"
                          v-bind:value="1"
                          v-model="dataTr104.activeproduct"
                          :disabled="cboOptDetail2_status"
                        />&nbsp;&nbsp;&nbsp;Active Product
                      </td>
                      <td class="text-left">&nbsp;</td>
                      <td class="text-success text-left">&nbsp;</td>
                    </tr>

                    <tr>
                      <td class="text-left">Optional</td>
                      <td class="text-left">:</td>
                      <td class="text-success text-left">
                        <v-select
                          :options="optCodeOptions"
                          v-model="tmp_optCode"
                          @update:modelValue="mySelectEvent3()"
                          :clearable="false"
                          :disabled="cboOptDetail2_status"
                        ></v-select>
                      </td>
                      <!-- <td class="text-left" colspan="6">&nbsp;</td> -->

                      <td class="text-left">Optional Detail</td>
                      <td class="text-left">:</td>
                      <td class="text-success text-left">
                        <v-select
                          :options="optDetailOptions"
                          v-model="tmp_optDetail"
                          @update:modelValue="mySelectEvent4()"
                          :clearable="false"
                          :disabled="cboOptDetail_status"
                        ></v-select>
                      </td>

                      <td class="text-left">&nbsp;</td>
                      <td class="text-left">&nbsp;</td>
                      <td class="text-success text-left">&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>

            <br />
            <template v-if="flagGetDataSO">
              <button
                type="button"
                class="btn btn-success"
                @click="getDataCCTableRincian()"
              >
                Get Data Cycle Count
              </button>
            </template>

            <!-- <template v-if="flagDownloadPDF == 1 && trSO_update == 1">
              <input
                type="checkbox"
                v-bind:value="1"
                v-model="status_qty_admin"
              />&nbsp;&nbsp;&nbsp;Status Qty Admin
              <br />
              <br />

              <button class="btn btn-sm btn-info" @click="exportToPDFConfirm()">
                <i class="fas fa-file-pdf"></i> Download CC NON BATCH
              </button>
              <br />
              <br />
              <button
                class="btn btn-sm btn-info"
                @click="exportToPDFConfirm_batch()"
              >
                <i class="fas fa-file-pdf"></i> Download CC WITH BATCH
              </button>
              <br />
              <br />
            </template> -->

            <div class="block-content">
              <div id="wrapper3"></div>
              <div id="box3"></div>
            </div>

            <template v-if="flagGetDataSO == false">
              <br />
              <div class="text-left">
                <template v-if="tabel_ticket_so.length > 0">
                  <!-- <template v-if="flagSaveAwal == 0"> -->
                  <template v-if="trSO_update == 1">
                    <template v-if="dataTr104.docStatus == 'O'">
                      <button
                        type="button"
                        class="btn btn-success"
                        @click="saveData()"
                      >
                        Save Data
                      </button>
                    </template>
                  </template>
                  <!-- </template> -->
                </template>
              </div>
              <div class="text-center">
                <template v-if="tabel_ticket_so.length > 0">
                  <template v-if="flagSaveAwal == 1">
                    <template v-if="trSO_update == 1">
                      <button
                        type="button"
                        class="btn btn-success"
                        @click="confirmTicket()"
                      >
                        Confirm CC Entry
                      </button>
                    </template></template
                  >
                </template>
              </div>

              <!-- <div class="text-center">
                <template
                  v-if="
                    dataTr104.docStatus == 'O' &&
                    tabel_ticket_so.length > 0 &&
                    dataTr104.approval_at == null
                  "
                >
                  <button
                    type="button"
                    class="btn btn-success"
                    @click="approveTicket()"
                  >
                    Approve Ticket
                  </button>
                </template>
              </div> -->
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
    const format = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      //return `Selected date is ${day}/${month}/${year}`;
      return `${year}-${month}-${day}`;
    };

    return {
      master_code: this.$root.master_code,
      master_coll: this.$root.master_coll,
      local_storage: this.$root.local_storage,

      format: format,
      title: "Entry Cycle Count (CC)",
      showModal: false,
      showmodal_zindex: "z-index:1030",
      grid2: new Grid(),
      dataTr104: {},

      showModal11: false,
      showmodal11_zindex: "z-index:1031",
      grid11: new Grid(),

      flagGetHeaderDN: false,

      showModal2: false,
      showmodal2_zindex: "z-index:1031;",

      showModal88: false,
      showmodal88_zindex: "z-index:1031",

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

      tmp_getCboWhsCodeOptions_to: "",
      tmp_getCboPriceCodeOptions_to: "",
      tmp_getCboDiscCodeOptions_to: "",

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
      dataTr104_comments: "",

      x_nomor_baris: 0,
      x_count: 0,

      limit_x: 100,
      nomor_x: 1,
      html_pdf: "",
      flagDownloadPDF: 0,

      uObject: "",

      /////////////////////////////////////
      flagclickFromStore: false,
      flagclickFromStore_tombol: false,

      flagclickToStore: false,
      flagclickToStore_tombol: false,

      flagclickInputItem: false,
      flagclickInputItem_tombol: false,

      flagSOCriteria: false,
      optDetailOptions: [],
      tmp_optDetail: [],
      optCodeOptions: [],
      tmp_optCode: [],
      cboOptDetail_status: true,
      cboOptDetail2_status: false,
      getdataSO: false,
      flagGetDataSO: false,
      flagViewSO: false,

      //uObject: "",
      tabel_ticket_so: [],
      tabel_ticket_so_split: [],
      tabel_ticket_so_split_all: [],
      dataTr104: {
        adminsamaso: false,
        activeproduct: false,
      },

      flagSaveAwal: 0,
      trSO_update: 0,
      html_non_batch: "",
      status_qty_admin: false,

      var_SO_awal: {},
      var_SO_awal_qty_batch: {},
      var_SO_awal_batch: {},
      var_SO_awal_batch_final: {},
      var_so_variant: {},
      var_so_variant_fix: {},

      var_so_d1: {},
      var_so_d2: {},
      key_total_sum_batch: "",
      key_total_sum_batch_awal: "",
      tabel_ticket_so_final: {},
      tabel_ticket_so_final_batch: {},
      itemcode_data: "",

      API_split_var_SO_awal: [],
      API_split_tabel_ticket_so_final_batch: [],
      API_split_var_so_variant: [],

      API_split_temp_var_SO_awal: {},
      API_split_temp_tabel_ticket_so_final_batch: {},
      API_split_temp_var_so_variant: {},

      total_a: 0,
      total_b: 0,
      total_c: 0,

      var_warna_item: "",
    };
  },
  mounted() {
    this.getTable();
    //this.userid = "9999";
    const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
    this.userStoreCode = cacheStoreAccess.store_code;

    // this.uObject = JSON.parse(localStorage.getItem("auth"));
    this.userid = cacheStoreAccess.user_uuid;
    this.$root.hideLoading();
  },
  methods: {
    ///////////////////////////////////////////////////
    async kalkulasiTotal() {
      var mythis = this;
      var a = 0;
      var b = 0;
      var c = 0;
      console.log(mythis.var_SO_awal);
      Object.keys(mythis.var_SO_awal).forEach(function (key) {
        if (mythis.var_SO_awal[key] == undefined) {
          return;
        }
        a += parseInt(mythis.var_SO_awal[key]);
        b += parseInt(mythis.var_so_variant[key]);
        c += parseInt(mythis.var_SO_awal_qty_batch[key]);
      });

      console.log(a);
      console.log(b);
      console.log(c);
      this.total_a = a;
      this.total_b = b;
      this.total_c = c;

      $("#total_a").val(a);
      $("#total_b").val(b);
      $("#total_c").val(c);
    },
    ///////////////////////////////////////////////////
    deleteItemTmp(key, x) {
      //alert(index);

      Swal.fire({
        title: "Hapus Batch?",
        text: "Apakah Anda ingin Menghapus batch ini?",
        icon: "question",

        //showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: `Batal`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          //this.tableTmpBphp.slice(index); //OR   this.$delete(this.items,index)
          //both will do the same
          this.var_so_d2.splice(key, 1);
          //this.var_SO_awal_batch.splice(key, 1);

          delete this.var_SO_awal_batch[x];

          Swal.fire("Batch Terhapus!", "", "success");
        }
      });
    },
    ///////////////////////////////////////////////////
    async saveQtyBatch() {
      //save qty
      var mythis = this;

      var n = 0;
      var double_batch = 0;

      var doublex = {}; //kz

      Object.keys(mythis.var_SO_awal_batch).forEach(async function (key) {
        n += parseInt(mythis.var_SO_awal_batch[key].stockOpnameQty);

        var cc = mythis.var_SO_awal_batch[key].batch;
        var output2 = doublex.hasOwnProperty(cc);
        console.log(cc);
        console.log(output2);
        if (output2 == true) {
          double_batch = 1;
        }

        doublex[cc] = 1;
      });

      console.log("a");

      console.log(doublex);
      console.log("a");
      //alert("A");

      if (double_batch == 1) {
        Swal.fire(
          "Failed!",
          "Terdapat double entry Batch, silakan cek kembali",
          "error"
        );
        return false;
      }

      var totalx = mythis.var_SO_awal[mythis.key_total_sum_batch_awal];
      console.log(n);
      console.log(mythis.key_total_sum_batch_awal);
      console.log(totalx);

      n = parseInt(n);
      totalx = parseInt(totalx);
      if (n != totalx) {
        Swal.fire(
          "Failed!",
          "Total Qty Batch yang Anda input : " +
            n +
            " ,tidak sama dengan jumlah total : " +
            totalx,
          "error"
        );
        return false;
      }

      Swal.fire({
        title: "Confirm?",
        text: "Apakah Anda ingin mengkonfirmasi inputan Batch ini?",
        icon: "question",

        //showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: `Batal`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          mythis.$root.loader = true;
          mythis.tabel_ticket_so_final_batch = {};
          await Object.keys(mythis.var_SO_awal_batch).forEach(async function (
            key
          ) {
            console.log("key " + key);
            mythis.var_SO_awal_qty_batch[mythis.key_total_sum_batch_awal] =
              totalx;

            if (mythis.var_SO_awal_batch_final.hasOwnProperty(key)) {
              mythis.var_SO_awal_batch_final[key] =
                mythis.var_SO_awal_batch[key];

              const myArray = key.split("AABBCC");
              mythis.tabel_ticket_so_final[myArray[1]] = mythis.var_so_d2;
              mythis.tabel_ticket_so_final_batch[myArray[1]] =
                mythis.var_SO_awal_batch;

              mythis.var_warna_item = myArray[1];
            } else {
              mythis.var_SO_awal_batch_final[key] =
                mythis.var_SO_awal_batch[key];

              const myArray = key.split("AABBCC");
              mythis.tabel_ticket_so_final[myArray[1]] = mythis.var_so_d2;
              mythis.tabel_ticket_so_final_batch[myArray[1]] =
                mythis.var_SO_awal_batch;

              mythis.var_warna_item = myArray[1];
            }
          });
          await mythis.sleep(1000);

          mythis.postSplitDataSO_batch();

          Object.keys(mythis.tabel_ticket_so).forEach(function (key) {
            if (mythis.tabel_ticket_so[key][4] == mythis.var_warna_item) {
              mythis.tabel_ticket_so[key][9] = true;
              //kz1
            }
          });
          mythis.var_warna_item = "";
          mythis.$root.loader = false;
          mythis.close88();
          mythis.getDataSOTable();
        }
      });
    },
    ///////////////////////////////////////////////////

    async tambah_batch() {
      var mythis = this;

      mythis.$root.loader = true;

      console.log(mythis.var_so_d2[0][2]);
      console.log(mythis.var_so_d2[0][3]);
      console.log(mythis.var_so_d2[0][4]);
      console.log(mythis.var_so_d2[0][5]);
      // var_so_d2
      // var_SO_awal_batch

      var a = 0;
      var n = 0;
      Object.keys(mythis.var_SO_awal_batch).forEach(function (key) {
        n++;
        if (mythis.var_SO_awal_batch[key].batch == "XXXXXX") {
          a = 1;
        }
      });

      console.log(a);
      if (a == 0) {
        console.log(
          "XXXXXX" +
            (n + 1) +
            "AABBCC" +
            mythis.var_so_d2[0][4] +
            "AABBCC" +
            "XXXXXX" +
            (n + 1)
        );

        //////////////////////////////////////////
        const countries = [
          "XXXXXX" + (n + 1),
          "-",
          mythis.var_so_d2[0][2],
          mythis.var_so_d2[0][3],
          mythis.var_so_d2[0][4],
          mythis.var_so_d2[0][5],
          "XXXXXX" + (n + 1),
          "2024-01-31",
          0,
          0,
          0,
        ];
        //console.log(mythis.var_so_d2.length + 1);
        mythis.var_so_d2[n] = countries;
        //////////////////////////////////////////
        mythis.var_SO_awal_batch[
          "XXXXXX" +
            (n + 1) +
            "AABBCC" +
            mythis.var_so_d2[0][4] +
            "AABBCC" +
            "XXXXXX" +
            (n + 1)
        ] = {
          batch: "XXXXXX" + (n + 1),
          expiredDate: "2024-01-31",
          stockOpnameQty: 0,
        };
        //////////////////////////////////////////

        await mythis.sleep(1000);
      }

      mythis.$root.loader = false;
    },
    ///////////////////////////////////////////////////
    async getDataCCTableRincian_D2(idx) {
      var mythis = this;
      console.log("AAGBABAGWEGEEBEBE");
      mythis.var_SO_awal_batch = {};
      mythis.var_so_d2 = [];
      mythis.$root.loader = true;
      var nn = 0;
      var count = 1;
      var limitx = 500;
      var offsetx = 0;
      var baris = 0;

      var nomor_x = 1;
      var br_pdf = 0;
      var br_flag = 0;
      var br_string = "";
      var html = "";

      while (count > 0) {
        offsetx = limitx * nn;

        const reqData = await axios({
          method: "put",
          url:
            mythis.$root.API_ERP +
            "/wms/getDataCCTableRincian_with_batch_byid/" +
            mythis.dataTr104.id,
          data: {
            data: mythis.dataTr104,
            limit: limitx,
            offset: offsetx,
            idx: idx,
          },
        });

        console.log("VVV");
        console.log(reqData);

        const resData = reqData.data;
        console.log(resData.data.length);
        if (resData.data.length == 0) {
          count = 0;
        }

        Object.keys(resData.data).forEach(function (key) {
          mythis.key_total_sum_batch = "XXYYZZ" + resData.data[key].itemCode;
          //var itemcode_data = resData.data[key].itemCode;
          mythis.itemcode_data = resData.data[key].itemCode.trim();

          const countries = [
            resData.data[key].id,
            baris + 1,
            resData.data[key].optional,
            resData.data[key].optionalname,
            resData.data[key].itemCode,
            resData.data[key].itemName,
            resData.data[key].batchNo,
            resData.data[key].expiredDate,
            resData.data[key].adminQty1,
            resData.data[key].stockOpnameQty,
            resData.data[key].varianceQty,
          ];

          mythis.var_so_d2[baris] = countries;

          mythis.var_SO_awal_batch[
            resData.data[key].id +
              "AABBCC" +
              resData.data[key].itemCode +
              "AABBCC" +
              resData.data[key].batchNo
          ] = {
            batch: resData.data[key].batchNo,
            expiredDate: resData.data[key].expiredDate,
            stockOpnameQty: resData.data[key].stockOpnameQty,
          };

          baris = baris + 1;

          /*
          if (resData.data[key].optional != "Jumlah Item") {
            mythis.var_so_d1[
              resData.data[key].id + "XXYYZZ" + resData.data[key].itemCode
            ] = resData.data[key].stockOpnameQty1;
            mythis.var_SO_awal[
              resData.data[key].id + "XXYYZZ" + resData.data[key].itemCode
            ] = resData.data[key].adminQty1;

            mythis.var_so_variant[
              resData.data[key].id + "XXYYZZ" + resData.data[key].itemCode
            ] = resData.data[key].varianceQty1;
          }
          */
        });
        console.log(mythis.var_so_d1);
        ///////////////////////////////////////////////////////////////////
        // if (resData.data.length > 0) {
        //   Object.keys(resData.data).forEach(function (key) {

        //   });
        // }
        ///////////////////////////////////////////////////////////////////

        nn = nn + 1;
        // if (mythis.x_count < mythis.x_nomor_baris) {
        //   count = 0;
        // }
        if (nn >= 30) {
          count = 0;
        }

        //mythis.html_non_batch = html;
        //await mythis.sleep(1000);
      }
      console.log("total ticket CC " + mythis.tabel_ticket_so.length);
      mythis.$root.loader = false;
      mythis.flagGetDataSO = false;

      // if (mythis.tabel_ticket_so_final.hasOwnProperty(mythis.itemcode_data)) {
      //   mythis.var_so_d2 = mythis.tabel_ticket_so_final[mythis.itemcode_data];
      //   mythis.var_SO_awal_batch =
      //     mythis.tabel_ticket_so_final_batch[mythis.itemcode_data];
      // }

      if (
        mythis.dataTr104.approval_at == "" ||
        mythis.dataTr104.approval_at == null
      ) {
        mythis.flagDownloadPDF = 0;
      } else {
        mythis.flagDownloadPDF = 1;
      }

      mythis.getDataSOTable();
    },
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    confirmTicket() {
      var mythis = this;
      Swal.fire({
        title: "Confirm?",
        text: "Apakah Anda ingin mengkonfirmasi CC ini? dan tidak bisa mengulang CC Entry?",
        icon: "question",

        //showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: `Batal`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          //////////////////////////////////////////////////////
          mythis.saveData();
          //////////////////////////////////////////////////////
          mythis.$root.loader = true;
          axios
            .put(
              mythis.$root.API_ERP +
                "/wms/confirmTicket_SO_CC_Entry/" +
                mythis.dataTr104.id,
              {
                dataTr104: mythis.dataTr104,
                userid: mythis.userid,
              }
            )
            .then((res) => {
              //console.log(res);
              //toast.success("Data telah berhasil di approve");
              Swal.fire(
                "Update Success!",
                "CC Entry telah dikonfirmasi sesuai. Silakan lanjutkan proses Adjustment CC",
                "success"
              );
              mythis.$root.loader = false;
              mythis.dataTr104.docStatus = "O";
              mythis.close();
              mythis.close21();
              mythis.refreshTable();
            })
            .catch(function (error) {
              console.log(error);
              mythis.$root.loader = false;
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
    ///////////////////////////////////////////////////
    async sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async postSplitDataSO_batch() {
      var mythis = this;
      //kz
      mythis.$root.loader = true;
      var limitx = 100;
      var count = 1;
      var key_split = 1;
      //var a = mythis.var_SO_awal.length / limitx;
      try {
        var i = 0;

        Object.entries(mythis.var_SO_awal).forEach((entry) => {
          const [key, value] = entry;
          console.log(key, value);
          i++;

          mythis.API_split_temp_var_SO_awal[key] = value;
          if (i >= limitx) {
            key_split++;
            i = 0;
            mythis.API_split_var_SO_awal[key_split - 2] =
              mythis.API_split_temp_var_SO_awal;
            mythis.API_split_temp_var_SO_awal = {};
          }
        });

        key_split++;
        i = 0;
        mythis.API_split_var_SO_awal[key_split - 2] =
          mythis.API_split_temp_var_SO_awal;
        mythis.API_split_temp_var_SO_awal = {};
        //////////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////////
        key_split = 1;
        Object.entries(mythis.var_so_variant).forEach((entry) => {
          const [key, value] = entry;
          console.log(key, value);
          i++;

          //mythis.API_split_temp_var_so_variant.push({ key: value });
          mythis.API_split_temp_var_so_variant[key] = value;
          if (i >= limitx) {
            key_split++;
            i = 0;
            mythis.API_split_var_so_variant[key_split - 2] =
              mythis.API_split_temp_var_so_variant;
            mythis.API_split_temp_var_so_variant = {};
          }
        });

        key_split++;
        i = 0;
        mythis.API_split_var_so_variant[key_split - 2] =
          mythis.API_split_temp_var_so_variant;
        mythis.API_split_temp_var_so_variant = {};
        //////////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////////
        key_split = 1;
        Object.entries(mythis.tabel_ticket_so_final_batch).forEach((entry) => {
          const [key, value] = entry;
          console.log(key, value);
          i++;

          mythis.API_split_temp_tabel_ticket_so_final_batch[key] = value;
          if (i >= limitx) {
            key_split++;
            i = 0;
            mythis.API_split_tabel_ticket_so_final_batch[key_split - 2] =
              mythis.API_split_temp_tabel_ticket_so_final_batch;
            mythis.API_split_temp_tabel_ticket_so_final_batch = {};
          }
        });

        key_split++;
        i = 0;
        mythis.API_split_tabel_ticket_so_final_batch[key_split - 2] =
          mythis.API_split_temp_tabel_ticket_so_final_batch;
        mythis.API_split_temp_tabel_ticket_so_final_batch = {};
        //////////////////////////////////////////////////////////////
        //mythis.$root.loader = false;
        //return false;
        //kz
        var a = Object.keys(mythis.var_SO_awal).length / limitx;
        let d = Math.ceil(a);

        for (let i = 0; i < d; i++) {
          const reqData = await axios({
            method: "post",
            url: mythis.$root.API_ERP + "/wms/saveData_SO_CC/",
            data: {
              dataTr104: mythis.dataTr104,
              API_split_var_SO_awal: mythis.API_split_var_SO_awal[i],
              API_split_var_so_variant: mythis.API_split_var_so_variant[i],
              userid: mythis.userid,
            },
          });
          //const resData = reqData.data;
          //await mythis.sleep(1000);
        }

        var aaa =
          Object.keys(mythis.tabel_ticket_so_final_batch).length / limitx;
        let ddd = Math.ceil(aaa);

        for (let i = 0; i < ddd; i++) {
          const reqData = await axios({
            method: "post",
            url: mythis.$root.API_ERP + "/wms/saveData_SO_CC_batch/",
            data: {
              dataTr104: mythis.dataTr104,
              API_split_tabel_ticket_so_final_batch:
                mythis.API_split_tabel_ticket_so_final_batch[i],
              userid: mythis.userid,
            },
          });
          //const resData = reqData.data;
          //await mythis.sleep(1000);
        }

        //await mythis.sleep(2000);
        mythis.$root.loader = false;

        // count++;
      } catch (error) {
        console.log(error);
        mythis.$root.loader = false;
        //Swal.fire("Failed!", error.response.data.message, "error");
        Swal.fire("Failed!", error.response.data.message, "error");
        return false;
      }
      console.log(mythis.tabel_ticket_so_split_all);
      mythis.$root.loader = false;
    },
    async postSplitDataSO() {
      var mythis = this;
      //kz
      mythis.$root.loader = true;
      var limitx = 100;
      var count = 1;
      var key_split = 1;
      //var a = mythis.var_SO_awal.length / limitx;

      console.log(mythis.var_SO_awal);
      console.log(Object.keys(mythis.var_SO_awal).length);
      console.log(limitx);

      //return false;
      //console.log(mythis.tabel_ticket_so);

      try {
        var i = 0;

        Object.entries(mythis.var_SO_awal).forEach((entry) => {
          const [key, value] = entry;
          console.log(key, value);
          i++;

          mythis.API_split_temp_var_SO_awal[key] = value;
          if (i >= limitx) {
            key_split++;
            i = 0;
            mythis.API_split_var_SO_awal[key_split - 2] =
              mythis.API_split_temp_var_SO_awal;
            mythis.API_split_temp_var_SO_awal = {};
          }
        });

        key_split++;
        i = 0;
        mythis.API_split_var_SO_awal[key_split - 2] =
          mythis.API_split_temp_var_SO_awal;
        mythis.API_split_temp_var_SO_awal = {};
        //////////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////////
        key_split = 1;
        Object.entries(mythis.var_so_variant).forEach((entry) => {
          const [key, value] = entry;
          console.log(key, value);
          i++;

          //mythis.API_split_temp_var_so_variant.push({ key: value });
          mythis.API_split_temp_var_so_variant[key] = value;
          if (i >= limitx) {
            key_split++;
            i = 0;
            mythis.API_split_var_so_variant[key_split - 2] =
              mythis.API_split_temp_var_so_variant;
            mythis.API_split_temp_var_so_variant = {};
          }
        });

        key_split++;
        i = 0;
        mythis.API_split_var_so_variant[key_split - 2] =
          mythis.API_split_temp_var_so_variant;
        mythis.API_split_temp_var_so_variant = {};
        //////////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////////
        key_split = 1;
        Object.entries(mythis.tabel_ticket_so_final_batch).forEach((entry) => {
          const [key, value] = entry;
          console.log(key, value);
          i++;

          mythis.API_split_temp_tabel_ticket_so_final_batch[key] = value;
          if (i >= limitx) {
            key_split++;
            i = 0;
            mythis.API_split_tabel_ticket_so_final_batch[key_split - 2] =
              mythis.API_split_temp_tabel_ticket_so_final_batch;
            mythis.API_split_temp_tabel_ticket_so_final_batch = {};
          }
        });

        key_split++;
        i = 0;
        mythis.API_split_tabel_ticket_so_final_batch[key_split - 2] =
          mythis.API_split_temp_tabel_ticket_so_final_batch;
        mythis.API_split_temp_tabel_ticket_so_final_batch = {};
        //////////////////////////////////////////////////////////////
        //mythis.$root.loader = false;
        //return false;
        //kz
        var a = Object.keys(mythis.var_SO_awal).length / limitx;
        let d = Math.ceil(a);

        for (let i = 0; i < d; i++) {
          const reqData = await axios({
            method: "post",
            url: mythis.$root.API_ERP + "/wms/saveData_SO_CC/",
            data: {
              dataTr104: mythis.dataTr104,
              API_split_var_SO_awal: mythis.API_split_var_SO_awal[i],
              API_split_var_so_variant: mythis.API_split_var_so_variant[i],
              userid: mythis.userid,
            },
          });
          //const resData = reqData.data;
          await mythis.sleep(1000);
        }

        /*
        //kasino dimatikan dulu karena pindah tombol
        var aaa =
          Object.keys(mythis.tabel_ticket_so_final_batch).length / limitx;
        let ddd = Math.ceil(aaa);

        for (let i = 0; i < ddd; i++) {
          const reqData = await axios({
            method: "post",
            url: mythis.$root.API_ERP + "/wms/saveData_SO_CC_batch/",
            data: {
              dataTr104: mythis.dataTr104,
              API_split_tabel_ticket_so_final_batch:
                mythis.API_split_tabel_ticket_so_final_batch[i],
              userid: mythis.userid,
            },
          });
          //const resData = reqData.data;
          await mythis.sleep(1000);
        }
        */

        await mythis.sleep(2000);
        mythis.$root.loader = false;

        // count++;
      } catch (error) {
        console.log(error);
        mythis.$root.loader = false;
        //Swal.fire("Failed!", error.response.data.message, "error");
        Swal.fire("Failed!", error.response.data.message, "error");
        return false;
      }
      console.log(mythis.tabel_ticket_so_split_all);
      mythis.$root.loader = false;

      Swal.fire(
        "Update Success!",
        "Data telah disimpan sementara. Silakan lanjutkan proses Confirm CC untuk dapat melanjutkan proses Adjustment",
        "success"
      );

      mythis.flagSaveAwal = 1;

      if (
        mythis.dataTr104.id == "" ||
        mythis.dataTr104.id == null ||
        mythis.dataTr104.id == undefined
      ) {
        mythis.close();
        mythis.close21();
      }
    },

    isEmpty(obj) {
      for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
          return false;
        }
      }

      return true;
    },
    saveData() {
      var mythis = this;
      var a = 0;
      var variant_beda = 0;
      // if (mythis.isEmpty(mythis.tabel_ticket_so_final_batch)) {
      //   Swal.fire(
      //     "Failed!",
      //     "Tidak ada perubahan pada Batch, silakan input dahulu",
      //     "error"
      //   );
      //   return false;
      // }

      console.log(mythis.var_SO_awal);
      console.log(mythis.tabel_ticket_so_final_batch);
      console.log(mythis.var_so_variant);
      console.log(mythis.var_so_variant_fix);

      var beda = 0;
      mythis.tabel_ticket_so.forEach((value) => {
        //kasino
        //variant_3080XXYYZZBE0613000281S
        var a = "txt_" + value[0] + "XXYYZZ" + value[4];
        var b = "qtyBatch_" + value[0] + "XXYYZZ" + value[4];
        var c = "variant_" + value[0] + "XXYYZZ" + value[4];

        let x_value = $("#" + a).val();
        let x_value2 = $("#" + b).val();
        let x_value3 = $("#" + c).val();

        if (x_value == undefined) {
          return;
        }
        console.log(x_value + "!=" + x_value2 + "!=" + x_value3);
        if (parseInt(x_value) != parseInt(x_value2)) {
          beda = 1;

          console.log("beda " + x_value + "!=" + x_value2 + "!=" + x_value3);

          $("#" + b).css("background-color", "#ff0303");
        } else {
          $("#" + b).css("background-color", "#ffffff");
        }

        if (parseInt(x_value3) != 0) {
          variant_beda = 1;
        }
      });

      // if (variant_beda == 0) {
      //   Swal.fire(
      //     "Failed!",
      //     "Tidak ada perubahan pada Batch, silakan input dahulu",
      //     "error"
      //   );
      //   return false;
      // }

      if (beda == 1) {
        Swal.fire(
          "Failed!",
          "Ada perbedaan antara Total Qty CC dengan Total Qty Batch, silakan periksa kembali",
          "error"
        );
        return false;
      }

      // alert("AAA");
      // return false;

      Swal.fire({
        title: "Simpan?",
        text: "Apakah Anda ingin menyimpan input CC ini?",
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

          //////////////////////////////////////////////////////
          mythis.postSplitDataSO();
          //////////////////////////////////////////////////////

          //Swal.fire("Saved!", "", "success");
        }
      });
    },
    ///////////////////////////////////////////////////
    async getDataCCTableRincian() {
      var mythis = this;
      mythis.$root.loader = true;
      var nn = 0;
      var count = 1;
      var limitx = 500;
      var offsetx = 0;
      var baris = 0;

      var nomor_x = 1;
      var br_pdf = 0;
      var br_flag = 0;
      var br_string = "";
      var html = "";

      while (count > 0) {
        offsetx = limitx * nn;

        const reqData = await axios({
          method: "put",
          url:
            mythis.$root.API_ERP +
            "/wms/getDataCCTableRincian_non_batch/" +
            mythis.dataTr104.id,
          data: {
            data: mythis.dataTr104,
            limit: limitx,
            offset: offsetx,
          },
        });

        console.log("AAA");
        console.log(reqData);

        const resData = reqData.data;
        console.log(resData.data.length);
        if (resData.data.length == 0) {
          count = 0;
        }

        Object.keys(resData.data).forEach(function (key) {
          const countries = [
            resData.data[key].id,
            baris + 1,
            resData.data[key].optional,
            resData.data[key].optionalname,
            resData.data[key].itemCode,
            resData.data[key].itemName,
            //resData.data[key].batchno,
            //resData.data[key].expireddate,
            resData.data[key].adminQty1,
            resData.data[key].stockOpnameQty1,
            resData.data[key].varianceQty1,
            resData.data[key].adjustment,
          ];

          mythis.tabel_ticket_so[baris] = countries;

          baris = baris + 1;

          if (resData.data[key].optional != "Jumlah Item") {
            mythis.var_so_d1[
              resData.data[key].id + "XXYYZZ" + resData.data[key].itemCode
            ] = resData.data[key].adminQty1;

            mythis.var_SO_awal[
              resData.data[key].id + "XXYYZZ" + resData.data[key].itemCode
            ] = resData.data[key].stockOpnameQty1;

            mythis.var_SO_awal_qty_batch[
              resData.data[key].id + "XXYYZZ" + resData.data[key].itemCode
            ] = resData.data[key].stockOpnameQty1;

            mythis.var_so_variant[
              resData.data[key].id + "XXYYZZ" + resData.data[key].itemCode
            ] = resData.data[key].varianceQty1;

            mythis.var_so_variant_fix[
              resData.data[key].id + "XXYYZZ" + resData.data[key].itemCode
            ] =
              resData.data[key].stockOpnameQty1 -
              resData.data[key].stockOpnameQty1;
          }
        });
        console.log(mythis.var_so_d1);
        ///////////////////////////////////////////////////////////////////
        // if (resData.data.length > 0) {
        //   Object.keys(resData.data).forEach(function (key) {

        //   });
        // }
        ///////////////////////////////////////////////////////////////////

        nn = nn + 1;
        // if (mythis.x_count < mythis.x_nomor_baris) {
        //   count = 0;
        // }
        if (nn >= 30) {
          count = 0;
        }

        //mythis.html_non_batch = html;
        //await mythis.sleep(1000);
      }
      console.log("total ticket CC " + mythis.tabel_ticket_so.length);
      mythis.$root.loader = false;
      mythis.flagGetDataSO = false;

      if (
        mythis.dataTr104.approval_at == "" ||
        mythis.dataTr104.approval_at == null
      ) {
        mythis.flagDownloadPDF = 0;
      } else {
        mythis.flagDownloadPDF = 1;
      }

      mythis.getDataSOTable();
    },
    getDataSOTable() {
      var mythis = this;

      //return false;

      //////////////////////////////
      $("#wrapper3").remove();
      var e = $('<div id="wrapper3"></div>');
      $("#box3").append(e);
      this.grid4 = new Grid();
      //////////////////////////////
      //////////////////////////////
      this.grid4.updateConfig({
        search: true,
        pagination: {
          limit: 20,
        },
        columns: [
          {
            hidden: true,
            id: "id",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>ID</b></div>'
            ),
          },
          {
            id: "no",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>No</b></div>'
            ),
          },
          {
            id: "optional",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Optional</b></div>'
            ),
          },
          {
            id: "optionalname",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Optional Name</b></div>'
            ),
          },
          {
            id: "itemcode",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Item Code</b></div>'
            ),
          },
          {
            id: "itemname",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Item Name</b></div>'
            ),
          },
          // {
          //   id: "batchno",
          //   name: html(
          //     '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Batch No</b></div>'
          //   ),
          // },
          // {
          //   id: "expireddate",
          //   name: html(
          //     '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Exp Date</b></div>'
          //   ),
          // },
          {
            id: "adminqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Admin Qty</b></div>'
            ),
          },
          {
            id: "stockopnameqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>SO Qty</b></div>'
            ),
            formatter: (_, row) =>
              row.cells[3].data == "Jumlah Item"
                ? html(
                    `<input id="total_a" type="number" value="` +
                      this.total_a +
                      `" pattern="[0-9]" style="width: 6em" readonly>`
                  )
                : html(
                    "<strong>" +
                      '<input id="txt_' +
                      row.cells[0].data +
                      "XXYYZZ" +
                      row.cells[4].data +
                      '" name="' +
                      row.cells[0].data +
                      "XXYYZZ" +
                      row.cells[4].data +
                      '"value="' +
                      // row.cells[7].data +
                      this.var_SO_awal[
                        row.cells[0].data + "XXYYZZ" + row.cells[4].data
                      ] +
                      '" type="number" pattern="[0-9]" onkeydown="javascript: return event.keyCode == 69 ? false : true" style="width: 6em" min="0" ' +
                      ' data-id="' +
                      row.cells[0].data +
                      "XXYYZZ" +
                      row.cells[4].data +
                      '" ' +
                      (this.dataTr104.docStatus == "C" ? " readonly" : "") +
                      " readonly>" +
                      "</strong>"
                  ),
          },
          {
            id: "varianceqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Variant Qty</b></div>'
            ),
            formatter: (_, row) =>
              row.cells[3].data == "Jumlah Item"
                ? html(
                    `<input id="total_b" type="number" value="` +
                      this.total_b +
                      `" pattern="[0-9]" style="width: 6em" readonly>`
                  )
                : this.var_so_variant[
                    row.cells[0].data + "XXYYZZ" + row.cells[4].data
                  ] != 0
                ? html(
                    "<div'>" +
                      '<input id="variant_' +
                      row.cells[0].data +
                      "XXYYZZ" +
                      row.cells[4].data +
                      '" type="number" value="' +
                      //row.cells[8].data +
                      this.var_so_variant[
                        row.cells[0].data + "XXYYZZ" + row.cells[4].data
                      ] +
                      '" pattern="[0-9]" style="width: 6em;background-color:#ffccf2" readonly />' +
                      "</div>"
                  )
                : html(
                    "<div'>" +
                      '<input id="variant_' +
                      row.cells[0].data +
                      "XXYYZZ" +
                      row.cells[4].data +
                      '" type="number" value="' +
                      //row.cells[8].data +
                      this.var_so_variant[
                        row.cells[0].data + "XXYYZZ" + row.cells[4].data
                      ] +
                      '" pattern="[0-9]" style="width: 6em" readonly />' +
                      "</div>"
                  ),
          },

          {
            id: "QtyBatch",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Total Qty Batch</b></div>'
            ),
            formatter: (_, row) =>
              row.cells[3].data == "Jumlah Item"
                ? html(
                    `<input id="total_c" type="number" value="` +
                      this.total_c +
                      `" pattern="[0-9]" style="width: 6em" readonly>`
                  )
                : html(
                    "<div'>" +
                      '<input id="qtyBatch_' +
                      row.cells[0].data +
                      "XXYYZZ" +
                      row.cells[4].data +
                      '" type="number" value="' +
                      //row.cells[8].data +//var_SO_awal_qty_batch
                      this.var_SO_awal_qty_batch[
                        row.cells[0].data + "XXYYZZ" + row.cells[4].data
                      ] +
                      '" pattern="[0-9]" style="width: 6em" readonly /><input style="display:none" id="variant_fix_' +
                      row.cells[0].data +
                      "XXYYZZ" +
                      row.cells[4].data +
                      '" type="text" value="' +
                      parseInt(
                        this.var_so_variant_fix[
                          row.cells[0].data + "XXYYZZ" + row.cells[4].data
                        ]
                      ) +
                      '" readonly />' +
                      "</div>"
                  ),
          },

          {
            id: "batch",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Input Batch</b></div>'
            ),
            formatter: (_, row) =>
              row.cells[3].data == "Jumlah Item"
                ? ""
                : this.var_so_variant[
                    row.cells[0].data + "XXYYZZ" + row.cells[4].data
                  ] == 0
                ? /* html(
                    `
                    <div style="display:none" id="input_batch_` +
                      row.cells[0].data +
                      "XXYYZZ" +
                      row.cells[4].data +
                      `" >
                    <button
                      id="input_batch"
                  data-id="${row.cells[0].data}XXYYZZ${row.cells[4].data}" class="btn btn-sm btn-warning text-white" data-toggle="tooltip" title="View" > <i  class="fa fa-list" aria-hidden="true"></i></button>` +
                      `</div>`
                  )
                  */
                  html(
                    `
                    <div ` +
                      (row.cells[9].data == true
                        ? 'style="background-color:#c2ffcb"'
                        : "") +
                      ` id="input_batch_` +
                      row.cells[0].data +
                      "XXYYZZ" +
                      row.cells[4].data +
                      `" >
                    <button
                      id="input_batch"
                  data-id="${row.cells[0].data}XXYYZZ${row.cells[4].data}" class="btn btn-sm btn-warning text-white" data-toggle="tooltip" title="View" > <i  class="fa fa-list" aria-hidden="true"></i></button>` +
                      `</div>`
                  )
                : html(
                    `
                    <div id="input_batch_` +
                      row.cells[0].data +
                      "XXYYZZ" +
                      row.cells[4].data +
                      `" >
                    <button
                      id="input_batch"
                  data-id="${row.cells[0].data}XXYYZZ${row.cells[4].data}" class="btn btn-sm btn-warning text-white" data-toggle="tooltip" title="View" > <i  class="fa fa-list" aria-hidden="true"></i></button>` +
                      `</div>`
                  ),
          },
        ],
        className: {
          table: "table table-hover",
        },
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
            "background-color": "#ffccf2",
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
        data: mythis.tabel_ticket_so,
      });

      console.log("total ticket CC tabel " + mythis.tabel_ticket_so.length);
      // DOM instead of vue selector because we are using vanilla JS
      this.grid4.render(document.getElementById("wrapper3"));
      //////////////////////////////

      mythis.kalkulasiTotal();
    },
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
    async getDataTO_pdf_batch() {
      var mythis = this;
      mythis.$root.loader = true;
      var nn = 0;
      var count = 1;
      var limitx = 500;
      var offsetx = 0;
      var baris = 0;

      var nomor_x = 1;
      var br_pdf = 0;
      var br_flag = 0;
      var br_string = "";
      var html = "";

      while (count > 0) {
        offsetx = limitx * nn;

        const reqData = await axios({
          method: "put",
          url:
            mythis.$root.API_ERP +
            "/wms/getDataCCTableRincian_with_batch/" +
            mythis.dataTr104.id,
          data: {
            data: mythis.dataTr104,
            limit: limitx,
            offset: offsetx,
          },
        });

        console.log(reqData);

        const resData = reqData.data;
        console.log(resData.data.length);
        if (resData.data.length == 0) {
          count = 0;
        }

        Object.keys(resData.data).forEach(function (key) {
          ////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////

          ///////////////////////////////////////////////////////////
          br_string = "";
          if (br_pdf == 20 && br_flag == 0) {
            br_pdf = 0;
            br_flag = 1;
            br_string = 'class="newPage"';
            //mythis.html_pdf +='<tr id="newPage"><td colspan="8">&nbsp;</td></tr>';
          }
          if (br_pdf == 30 && br_flag == 1) {
            //mythis.html_pdf +='<tr id="newPage"><td colspan="8">&nbsp;</td></tr>';
            br_pdf = 0;
            br_string = 'class="newPage"';
          }

          if (br_string == 'class="newPage"') {
            //html += '<tr ><td colspan="8">&nbsp;</td></tr>';
            //html += '<tr ><td colspan="8">&nbsp;</td></tr>';
            html +=
              "<tr " +
              br_string +
              '><td colspan="8">&nbsp;</td></tr><tr> <th class="borderx">No.</th><th class="borderx">Optional</th><th class="borderx">Optional Name</th><th class="borderx">Item Code</th><th class="borderx">Item Name</th><th class="borderx">Batch No</th><th class="borderx">Exp Date</th><th class="borderx" style="text-align:right" >Admin Qty</th><th style="text-align:right" class="borderx">Actual Qty</th><th style="text-align:right" class="borderx">Variant</th></tr>';
          }
          ///////////////////////////////////////////////////////////

          if (resData.data[key].optionalname != "-") {
            var borderyd = 'class="borderyd"';
            var borderyd2 = "";
          } else {
            var borderyd = "";
            var borderyd2 = "";
          }

          html +=
            "<tr " +
            borderyd +
            "" +
            'style="font-size: 9px"><th>' +
            (resData.data[key].optionalname == "Jumlah Item"
              ? ""
              : resData.data[key].optionalname == "-"
              ? ""
              : nomor_x) +
            "</th><th>" +
            borderyd2 +
            (resData.data[key].optionalname == "Jumlah Item"
              ? ""
              : resData.data[key].optional) +
            "</th><th>" +
            resData.data[key].optionalname +
            "</th><th >" +
            resData.data[key].itemCode +
            "</th><th >" +
            (resData.data[key].optionalname == "-"
              ? resData.data[key].itemName
              : resData.data[key].itemName) +
            "</th><th >" +
            resData.data[key].batchNo +
            "</th><th >" +
            resData.data[key].expiredDate +
            '</th><th style="text-align:right">' +
            (mythis.status_qty_admin == true
              ? resData.data[key].adminQty1
              : "-") +
            '</th><th style="text-align:right">' +
            (resData.data[key].optionalname == "Jumlah Item"
              ? ""
              : "___________") +
            '</th><th style="text-align:right">' +
            (resData.data[key].optionalname == "Jumlah Item"
              ? ""
              : "___________") +
            "</th></tr>";

          if (resData.data[key].optionalname != "-") {
            nomor_x++;
          }

          br_pdf++;
          ////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////
        });

        nn = nn + 1;
        // if (mythis.x_count < mythis.x_nomor_baris) {
        //   count = 0;
        // }
        if (nn >= 30) {
          count = 0;
        }
      }

      return html;
    },
    async getDataTO_pdf() {
      var mythis = this;
      mythis.$root.loader = true;
      var nn = 0;
      var count = 1;
      var limitx = 500;
      var offsetx = 0;
      var baris = 0;

      var nomor_x = 1;
      var br_pdf = 0;
      var br_flag = 0;
      var br_string = "";
      var html = "";

      while (count > 0) {
        offsetx = limitx * nn;

        const reqData = await axios({
          method: "put",
          url:
            mythis.$root.API_ERP +
            "/wms/getDataCCTableRincian_non_batch/" +
            mythis.dataTr104.id,
          data: {
            data: mythis.dataTr104,
            limit: limitx,
            offset: offsetx,
          },
        });

        console.log(reqData);

        const resData = reqData.data;
        console.log(resData.data.length);
        if (resData.data.length == 0) {
          count = 0;
        }

        Object.keys(resData.data).forEach(function (key) {
          ////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////

          ///////////////////////////////////////////////////////////
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
            //html += '<tr ><td colspan="8">&nbsp;</td></tr>';
            //html += '<tr ><td colspan="8">&nbsp;</td></tr>';
            html +=
              "<tr " +
              br_string +
              '><td colspan="8">&nbsp;</td></tr><tr> <th class="borderx">No.</th><th class="borderx">Optional</th><th class="borderx">Optional Name</th><th class="borderx">Item Code</th><th class="borderx">Item Name</th><th class="borderx" style="text-align:right" >Admin Qty</th><th style="text-align:right" class="borderx">Actual Qty</th><th style="text-align:right" class="borderx">Variant</th></tr>';
          }
          ///////////////////////////////////////////////////////////
          html +=
            "<tr " +
            "" +
            'style="font-size: 9px"><th>' +
            (resData.data[key].optionalname == "Jumlah Item" ? "" : nomor_x) +
            "</th><th>" +
            (resData.data[key].optionalname == "Jumlah Item"
              ? ""
              : resData.data[key].optional) +
            "</th><th>" +
            resData.data[key].optionalname +
            "</th><th >" +
            resData.data[key].itemCode +
            "</th><th >" +
            resData.data[key].itemName +
            '</th><th style="text-align:right">' +
            (mythis.status_qty_admin == true
              ? resData.data[key].adminQty1
              : "-") +
            '</th><th style="text-align:right">' +
            (resData.data[key].optionalname == "Jumlah Item"
              ? ""
              : "___________") +
            '</th><th style="text-align:right">' +
            (resData.data[key].optionalname == "Jumlah Item"
              ? ""
              : "___________") +
            "</th></tr>";

          nomor_x++;
          br_pdf++;
          ////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////
        });

        nn = nn + 1;
        // if (mythis.x_count < mythis.x_nomor_baris) {
        //   count = 0;
        // }
        if (nn >= 30) {
          count = 0;
        }
      }

      return html;
    },
    async exportToPDFConfirm_batch() {
      //alert("AAAA");
      this.$root.loader = true;

      //await this.sleep(5000);

      //var tanggal = `${year}` + "-" + months[month] + "-" + `${day}`;
      var data_x = "";
      var data_x = await this.getDataTO_pdf_batch();
      //console.log(data_x);
      //var data_x = this.html_non_batch;

      var xxx =
        '<style> p, span, table { font-size: 10px } table { width: 100%; } .borderx { border-bottom: 1px solid black; border-top: 1px solid black; } .bordery { border-top: 1px solid black; } .borderyd { border-top: 1px dotted black;}</style> <h4>Cycle Count WITH BATCH</h4><table cellpadding="0"> <tr> <th width="10%">Doc Num</th> <th width="25%">: ' +
        this.dataTr104.docNum +
        '</th> <th width="10%">Doc Status</th> <th width="20%">: ' +
        (this.dataTr104.docStatus == "O" ? "Open" : "Close") +
        '</th> <th width="12%">Description</th> <th width="30%">: ' +
        this.dataTr104.description +
        "</th> </tr> <tr> <th>Remarks</th> <th>: " +
        this.dataTr104.comments +
        "</th> <th>Reference</th> <th>: " +
        this.dataTr104.reference +
        "</th> <th>Doc Date</th> <th>: " +
        this.dataTr104.docDate +
        // '</th> </tr> <tr> <th colspan="7" class="bordery"><br/></th></tr><tr> <th>From Store</th> <th> ' +
        // "&nbsp;" +
        // "</th> <th>From Store ID</th> <th>: " +
        // this.dataTr104.storeCode +
        // "</th> <th>From Store Name</th> <th>: " +
        // this.dataTr104.storeName +
        // "</th> </tr> <tr> <th>WHS Code</th> <th>: " +
        // this.tmp_getCboWhsCodeInventoryOptions +
        // "</th> <th>Price Code</th> <th>: " +
        // this.tmp_getCboPriceCodeInventoryOptions +
        // "</th> <th>Discount Code</th> <th>: " +
        // this.tmp_getCboDiscCodeInventoryOptions +
        '</th> </tr> <tr> <th colspan="7" class="bordery"><br/></th></tr><tr> <th>SO Store</th> <th> ' +
        "&nbsp;" +
        "</th> <th>SO Store ID</th> <th>: " +
        this.dataTr104.storeCodeTo +
        "</th> <th>SO Store Name</th> <th>: " +
        this.dataTr104.storeNameTo +
        "</th> </tr> <tr> <th>WHS Code</th> <th>: " +
        this.tmp_getCboWhsCodeOptions_to +
        "</th> <th>Price Code</th> <th>: " +
        this.tmp_getCboPriceCodeOptions_to +
        "</th> <th>Discount Code</th> <th>: " +
        this.tmp_getCboDiscCodeOptions_to +
        '</th> </tr> <tr> <th colspan="7" class="bordery"><br/></th></tr><tr> <th>Print Date</th> <th>: ' +
        this.formatDate(new Date()) +
        ' </tr> </table> <br> <table id="tb-item" cellpadding="4" border="0"> <tr> <th class="borderx">No.</th><th class="borderx" width="12%">Optional</th><th class="borderx" width="12%">Optional Name</th><th class="borderx">Item Code</th><th class="borderx" width="30%">Item Name</th><th class="borderx">Batch No</th><th class="borderx">Exp Date</th><th class="borderx" style="text-align:right" >Admin Qty</th><th style="text-align:right" class="borderx">Actual Qty</th><th style="text-align:right" class="borderx">Variant</th></tr>' +
        data_x +
        '<tr> <th colspan="10" class="bordery"></th></tr> <tr> <th colspan="2" class="">Mengetahui,</th> <th style="text-align:right" colspan="2" class="">Menyetujui,</th> <th style="text-align:right" colspan="2" class="">&nbsp</th> </tr></table>';

      //'<tr> <th colspan="2" class="bordery">Mengetahui,</th> <th style="text-align:right" colspan="2" class="">Menyetujui,</th> <th style="text-align:right" colspan="2" class="">&nbsp</th> </tr>

      this.$root.loader = false;

      var element = xxx;
      var opt = {
        //margin: 10,
        margin: [10, 10, 0, 10], //top, left, buttom, right,
        //margin: [0, -0.1, 0, 0],
        filename:
          "SO_WITH_BATCH_" +
          this.dataTr104.docNum +
          "_" +
          this.dataTr104.docStatus +
          ".pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { dpi: 300, letterRendering: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
        //jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
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
    async exportToPDFConfirm() {
      //alert("AAAA");
      this.$root.loader = true;

      //await this.sleep(5000);

      //var tanggal = `${year}` + "-" + months[month] + "-" + `${day}`;
      var data_x = "";
      var data_x = await this.getDataTO_pdf();
      //var data_x = this.html_non_batch;

      var xxx =
        '<style> p, span, table { font-size: 10px } table { width: 100%; } .borderx { border-bottom: 1px solid black; border-top: 1px solid black; } .bordery { border-top: 1px solid black; } </style> <h4>Cycle Count NON BATCH</h4><table cellpadding="0"> <tr> <th width="10%">Doc Num</th> <th width="25%">: ' +
        this.dataTr104.docNum +
        '</th> <th width="10%">Doc Status</th> <th width="20%">: ' +
        (this.dataTr104.docStatus == "O" ? "Open" : "Close") +
        '</th> <th width="12%">Description</th> <th width="30%">: ' +
        this.dataTr104.description +
        "</th> </tr> <tr> <th>Remarks</th> <th>: " +
        this.dataTr104.comments +
        "</th> <th>Reference</th> <th>: " +
        this.dataTr104.reference +
        "</th> <th>Doc Date</th> <th>: " +
        this.dataTr104.docDate +
        // '</th> </tr> <tr> <th colspan="7" class="bordery"><br/></th></tr><tr> <th>From Store</th> <th> ' +
        // "&nbsp;" +
        // "</th> <th>From Store ID</th> <th>: " +
        // this.dataTr104.storeCode +
        // "</th> <th>From Store Name</th> <th>: " +
        // this.dataTr104.storeName +
        // "</th> </tr> <tr> <th>WHS Code</th> <th>: " +
        // this.tmp_getCboWhsCodeInventoryOptions +
        // "</th> <th>Price Code</th> <th>: " +
        // this.tmp_getCboPriceCodeInventoryOptions +
        // "</th> <th>Discount Code</th> <th>: " +
        // this.tmp_getCboDiscCodeInventoryOptions +
        '</th> </tr> <tr> <th colspan="7" class="bordery"><br/></th></tr><tr> <th>SO Store</th> <th> ' +
        "&nbsp;" +
        "</th> <th>SO Store ID</th> <th>: " +
        this.dataTr104.storeCodeTo +
        "</th> <th>SO Store Name</th> <th>: " +
        this.dataTr104.storeNameTo +
        "</th> </tr> <tr> <th>WHS Code</th> <th>: " +
        this.tmp_getCboWhsCodeOptions_to +
        "</th> <th>Price Code</th> <th>: " +
        this.tmp_getCboPriceCodeOptions_to +
        "</th> <th>Discount Code</th> <th>: " +
        this.tmp_getCboDiscCodeOptions_to +
        '</th> </tr> <tr> <th colspan="7" class="bordery"><br/></th></tr><tr> <th>Print Date</th> <th>: ' +
        this.formatDate(new Date()) +
        ' </tr> </table> <br> <table id="tb-item" cellpadding="4" border="0"> <tr> <th class="borderx">No.</th><th class="borderx" width="12%">Optional</th><th class="borderx" width="12%">Optional Name</th><th class="borderx">Item Code</th><th class="borderx">Item Name</th><th class="borderx" style="text-align:right" >Admin Qty</th><th style="text-align:right" class="borderx">Actual Qty</th><th style="text-align:right" class="borderx">Variant</th></tr>' +
        data_x +
        '<tr> <th colspan="8" class="bordery"></th></tr> <tr> <th colspan="2" class="">Mengetahui,</th> <th style="text-align:right" colspan="2" class="">Menyetujui,</th> <th style="text-align:right" colspan="2" class="">&nbsp</th> </tr></table>';

      //'<tr> <th colspan="2" class="bordery">Mengetahui,</th> <th style="text-align:right" colspan="2" class="">Menyetujui,</th> <th style="text-align:right" colspan="2" class="">&nbsp</th> </tr>

      this.$root.loader = false;

      var element = xxx;
      var opt = {
        //margin: 10,
        margin: [10, 10, 0, 10], //top, left, buttom, right,
        //margin: [0, -0.1, 0, 0],
        filename:
          "SO_NON_BATCH_" +
          this.dataTr104.docNum +
          "_" +
          this.dataTr104.docStatus +
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
    ///////////////////////////////////////////////////
    doSendNotifFirebase() {
      var mythis = this;
      var header = "Notifikasi Transfer IN";
      var body =
        "Nomor Dokumen TO (" +
        mythis.dataTr104.docNum +
        "), dari " +
        mythis.dataRincianHeaderID.storeCodeFrm +
        " (" +
        mythis.dataRincianHeaderID.storeCodeFrmTxt +
        ") ==> TIN ke " +
        mythis.dataRincianHeaderID.storeCodeTo +
        " (" +
        mythis.dataRincianHeaderID.storeCodeToTxt +
        ") [" +
        new Date().toLocaleString("en-GB") +
        "]";
      mythis.$root.sendNotifFirebase(header, body);
    },
    ///////////////////////////////////////////////////
    getTableRincianDataUpdate(id) {
      var mythis = this;
      axios
        .get(
          this.$root.API_ERP +
            "/wms/pagingRincianTOUpdate/" +
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

          mythis.flagDownloadPDF = 1;
        });
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
          // {
          //   id: "docEntry",
          //   name: html(
          //     '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Doc Entry</b></div>'
          //   ),
          // },

          {
            id: "itemCode",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b> Item Code</b></div>'
            ),
          },

          {
            id: "itemName",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b> Item Name</b></div>'
            ),
          },

          {
            id: "batchNo",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Batch No</b></div>'
            ),
          },

          {
            id: "expiredDate1",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Exp Date</b></div>'
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
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Ticket TO Qty</b></div>'
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
          // {
          //   id: "updatedAt",
          //   name: html(
          //     '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b> Updated Date</b></div>'
          //   ),
          // },
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
            "background-color": "#ffccf2",
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
            "/wms/pagingRincianTOUpdate/" +
            this.idRincianUpdate,
          then: (data) =>
            data.results.map((card) => [
              card.id,
              card.itemCode1,
              (data.nomorBaris += 1),
              //card.docEntry,

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
    getRincianHeaderTR_NON_Update(id) {
      //alert("BBBB");
      var mythis = this;
      mythis.$root.loader = true;
      axios
        .get(this.$root.API_ERP + "/wms/getRincianheaderIDUpdate_CC/" + id)
        .then((res) => {
          //   mythis.dataRincianHeaderID = res.data.data[0];
          //   mythis.dataRincianHeaderIDTR = res.data.data[0];
          mythis.dataTr104.id = res.data.data[0].id;
          mythis.dataTr104.docNum = res.data.data[0].docNum;
          //mythis.dataTr104.docNum_SO = null;

          mythis.dataTr104.approval_at = res.data.data[0].approval_at;

          mythis.dataTr104.docStatus = res.data.data[0].docStatus;
          mythis.dataTr104.docDate = res.data.data[0].docDate1;
          mythis.dataTr104.reference = res.data.data[0].reference;
          mythis.dataTr104.description = res.data.data[0].description;
          mythis.dataTr104.comments = res.data.data[0].comments;

          mythis.dataTr104.storeCodeFrm = res.data.data[0].storeCodeFrm;
          mythis.dataTr104.whsCodeFrm = res.data.data[0].whsCodeFrm;
          mythis.dataTr104.priceCodeFrm = res.data.data[0].priceCodeFrm;
          mythis.dataTr104.discCodeFrm = res.data.data[0].discCodeFrm;

          mythis.dataTr104.storeCodeTo = res.data.data[0].storeCodeTo;
          mythis.dataTr104.whsCodeTo = res.data.data[0].whsCodeTo;
          mythis.dataTr104.priceCodeTo = res.data.data[0].priceCodeTo;
          mythis.dataTr104.discCodeTo = res.data.data[0].discCodeTo;

          mythis.dataTr104.outSts = res.data.data[0].outSts;
          mythis.dataTr104.inSts = res.data.data[0].inSts;

          mythis.dataTr104.itemCount = res.data.data[0].itemCount;
          mythis.dataTr104.quantityAmont = res.data.data[0].quantityAmont;

          mythis.dataTr104.storeNameFrm = res.data.data[0].storeCodeFrm1;
          mythis.dataTr104.storeNameTo = res.data.data[0].storeCodeTo1;

          mythis.dataTr104.adminsamaso = res.data.data[0].adminsamaso;
          mythis.dataTr104.activeproduct = res.data.data[0].activeproduct;

          mythis.dataTr104.optCode = res.data.data[0].optCode;
          mythis.dataTr104.optDetail = res.data.data[0].optDetail;

          mythis.tmp_optCode = res.data.data[0].optCode1;
          mythis.tmp_optDetail = res.data.data[0].optDetail1;

          mythis.tmp_getCboWhsCodeOptions_from =
            res.data.data[0].whsCodeFrm + " - " + res.data.data[0].whsCodeFrm1;

          mythis.tmp_getCboWhsCodeOptions_to =
            res.data.data[0].whsCodeTo + " - " + res.data.data[0].whsCodeTo1;

          mythis.tmp_getCboPriceCodeOptions_from =
            res.data.data[0].priceCodeFrm1;
          mythis.tmp_getCboPriceCodeOptions_to = res.data.data[0].priceCodeTo1;

          mythis.tmp_getCboDiscCodeOptions_from = res.data.data[0].discCodeFrm1;
          mythis.tmp_getCboDiscCodeOptions_to = res.data.data[0].discCodeTo1;

          mythis.flagclickFromStore = true;
          mythis.flagclickToStore = true;
          mythis.flagGetData = false;
          mythis.cboOptDetail2_status = true;
          mythis.cboOptDetail_status = true;

          mythis.trSO_update = 0;
          mythis.flagDownloadPDF = 0;

          mythis.$root.loader = false;
          //console.log(this.dataRincianDetailID);
        });
    },
    ///////////////////////////////////////////////////
    getRincianHeaderTR_Update(id) {
      //alert("AAAA");
      var mythis = this;
      mythis.$root.loader = true;
      axios
        .get(
          this.$root.API_ERP +
            "/wms/getRincianheaderIDUpdate_SO_TrCC/" +
            id
        )
        .then((res) => {
          //   mythis.dataRincianHeaderID = res.data.data[0];
          //   mythis.dataRincianHeaderIDTR = res.data.data[0];
          mythis.dataTr104.id = res.data.data[0].id;
          mythis.dataTr104.docNum = res.data.data[0].docNum;
          mythis.dataTr104.docNum_SO = res.data.data[0].docNum;

          mythis.dataTr104.approval_at = res.data.data[0].approval_at;

          mythis.dataTr104.docStatus = res.data.data[0].docStatus;
          mythis.dataTr104.docDate = res.data.data[0].docDate1;
          mythis.dataTr104.reference = res.data.data[0].reference;
          mythis.dataTr104.description = res.data.data[0].description;
          mythis.dataTr104.comments = res.data.data[0].comments;

          mythis.dataTr104.storeCodeFrm = res.data.data[0].storeCodeFrm;
          mythis.dataTr104.whsCodeFrm = res.data.data[0].whsCodeFrm;
          mythis.dataTr104.priceCodeFrm = res.data.data[0].priceCodeFrm;
          mythis.dataTr104.discCodeFrm = res.data.data[0].discCodeFrm;

          mythis.dataTr104.storeCodeTo = res.data.data[0].storeCodeTo;
          mythis.dataTr104.whsCodeTo = res.data.data[0].whsCodeTo;
          mythis.dataTr104.priceCodeTo = res.data.data[0].priceCodeTo;
          mythis.dataTr104.discCodeTo = res.data.data[0].discCodeTo;

          mythis.dataTr104.outSts = res.data.data[0].outSts;
          mythis.dataTr104.inSts = res.data.data[0].inSts;

          mythis.dataTr104.itemCount = res.data.data[0].itemCount;
          mythis.dataTr104.quantityAmont = res.data.data[0].quantityAmont;

          mythis.dataTr104.storeNameFrm = res.data.data[0].storeCodeFrm1;
          mythis.dataTr104.storeNameTo = res.data.data[0].storeCodeTo1;

          mythis.dataTr104.adminsamaso = res.data.data[0].adminsamaso;
          mythis.dataTr104.activeproduct = res.data.data[0].activeproduct;

          mythis.dataTr104.optCode = res.data.data[0].optCode;
          mythis.dataTr104.optDetail = res.data.data[0].optDetail;

          mythis.tmp_optCode = res.data.data[0].optCode1;
          mythis.tmp_optDetail = res.data.data[0].optDetail1;

          mythis.tmp_getCboWhsCodeOptions_from =
            res.data.data[0].whsCodeFrm + " - " + res.data.data[0].whsCodeFrm1;

          mythis.tmp_getCboWhsCodeOptions_to =
            res.data.data[0].whsCodeTo + " - " + res.data.data[0].whsCodeTo1;

          mythis.tmp_getCboPriceCodeOptions_from =
            res.data.data[0].priceCodeFrm1;
          mythis.tmp_getCboPriceCodeOptions_to = res.data.data[0].priceCodeTo1;

          mythis.tmp_getCboDiscCodeOptions_from = res.data.data[0].discCodeFrm1;
          mythis.tmp_getCboDiscCodeOptions_to = res.data.data[0].discCodeTo1;

          mythis.flagclickFromStore = true;
          mythis.flagclickToStore = true;
          mythis.flagGetData = false;
          mythis.cboOptDetail2_status = true;
          mythis.cboOptDetail_status = true;

          console.log(mythis.dataTr104.approval_at);
          if (
            mythis.dataTr104.approval_at == "" ||
            mythis.dataTr104.approval_at == null
          ) {
            mythis.trSO_update = 0;
          } else {
            mythis.trSO_update = 1;
          }

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
      this.flagSdataTr104_commentsave = "";
    },
    modal88() {
      this.showModal88 = true;
    },
    close88: function () {
      this.showModal88 = false;
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
      this.dataTr104 = {};
      this.var_penerimaan_DN = {};
      this.var_penerimaan_DN_Qty = {};
      this.var_penerimaan_Actual = {};
      this.data_CboWhs = "";
      this.dataRincianHeaderIDTR = {};
      this.total_bpitem_null = null;

      this.flagSave = 0;
      this.flagDownloadPDF = 0;
      ///////////////////////////////////////////
      this.dataTr104.adminsamaso = false;
      this.dataTr104.activeproduct = false;
      this.flagSOCriteria = false;
      this.flagGetDataSO = false;
      this.cboOptDetail_status = false;
      this.tmp_optCode = "";
      this.tmp_optDetail = "";
      this.tabel_ticket_so = [];
      this.tabel_ticket_so_split = [];
      this.tabel_ticket_so_final = {};
      this.tabel_ticket_so_final_batch = {};
      this.flagViewSO = false;
      this.dataTr104 = {};

      this.flagclickFromStore = false;
      this.flagclickFromStore_tombol = false;

      this.flagclickToStore = false;
      this.flagclickToStore_tombol = false;

      this.flagclickInputItem = false;
      this.flagclickInputItem_tombol = false;

      this.getCboWhsCodeOptions_from = [];
      this.tmp_getCboWhsCodeOptions_from = "";

      this.getCboPriceCodeOptions_from = [];
      this.tmp_getCboPriceCodeOptions_from = "";

      this.getCboDiscCodeOptions_from = [];
      this.tmp_getCboDiscCodeOptions_from = "";

      this.getCboWhsCodeOptions_to = [];
      this.tmp_getCboWhsCodeOptions_to = "";

      this.getCboPriceCodeOptions_to = [];
      this.tmp_getCboPriceCodeOptions_to = "";

      this.getCboDiscCodeOptions_to = [];
      this.tmp_getCboDiscCodeOptions_to = "";

      this.myArrayItemBarang = [];
      this.myArrayItemBarang_onHand = {};
      this.flagGetData = true;

      this.flagSave = 0;
      this.status_save_PenerimaanBarang = 0;
      this.flagSaveAwal = 0;
      ///////////////////////////////////////////

      this.var_SO_awal = {};
      this.var_SO_awal_qty_batch = {};
      this.var_so_d1 = {};
      this.var_so_d2 = {};
      this.var_so_variant = {};
      this.var_so_variant_fix = {};
      this.key_total_sum_batch = "";
      this.key_total_sum_batch_awal = "";
      this.var_SO_awal_batch = {};
      this.var_SO_awal_batch_final = {};
      this.itemcode_data = "";
      ///////////////////////////////////////////

      this.API_split_var_SO_awal = [];
      this.API_split_tabel_ticket_so_final_batch = [];
      this.API_split_var_so_variant = [];

      this.API_split_temp_var_SO_awal = {};
      this.API_split_temp_tabel_ticket_so_final_batch = {};
      this.API_split_temp_var_so_variant = {};

      ///////////////////////////////////////////
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

    getCbooptCode() {
      //alert("AAA");
      var mythis = this;
      //mythis.$root.loader = true;
      axios.get(this.$root.API_ERP + "/wms/getCbooptCode").then((res) => {
        mythis.optCodeOptions = res.data.data;

        //console.log(res.data.data);
        //mythis.$root.loader = false;
      });
    },

    getCboWhsCodeInventory_from() {
      var mythis = this;
      //mythis.$root.loader = true;
      axios
        .get(this.$root.API_ERP + "/wms/getCboWhsCodeInventory")
        .then((res) => {
          console.log(res);
          mythis.getCboWhsCodeOptions_from = res.data.data;
          //mythis.$root.loader = false;
        });
    },
    getCboPriceCodeInventory_from() {
      var mythis = this;
      //mythis.$root.loader = true;
      axios
        .get(this.$root.API_ERP + "/wms/getCbopriceCode")
        .then((res) => {
          console.log(res);
          mythis.getCboPriceCodeOptions_from = res.data.data;
          //mythis.$root.loader = false;
        });
    },
    getCboDiscCodeInventory_from() {
      var mythis = this;
      //mythis.$root.loader = true;
      axios.get(this.$root.API_ERP + "/wms/getCbodiscCode").then((res) => {
        console.log(res);
        mythis.getCboDiscCodeOptions_from = res.data.data;
        //mythis.$root.loader = false;
      });
    },

    jqueryDelEdit() {
      const mythis = this;

      $(document).on("click", "#input_batch", function () {
        let id = $(this).data("id");
        //alert(id);

        mythis.key_total_sum_batch_awal = id;
        mythis.getDataCCTableRincian_D2(id);
        mythis.modal88();
      });

      $(document).on("change", "input", function () {
        let id = $(this).data("id");

        let result = id.includes("XXYYZZ");
        let result2 = id.includes("AABBCC");
        console.log(result);
        console.log(result2);
        if (result == true) {
          //non batch
          let x_value = $("#txt_" + id).val();
          let x_value2 = $("#txt_" + id).val();
          //alert(id + x_value);
          console.log(x_value + " " + x_value2);
          console.log(mythis.var_so_d1[id]);
          var variantx = x_value - mythis.var_so_d1[id];
          var variantx_fix = x_value - mythis.var_SO_awal_qty_batch[id]; //kz
          $("#variant_" + id).val(variantx);

          mythis.var_so_variant[id] = variantx;
          mythis.var_SO_awal[id] = x_value; // set value hasil SO

          mythis.var_so_variant_fix[id] = variantx_fix;
          $("#variant_fix_" + id).val(variantx_fix);
          if (variantx_fix != 0) {
            $("#input_batch_" + id).show();
          } else {
            $("#input_batch_" + id).hide();
          }
        } else if (result2 == true) {
          //batch

          let x_value = $("#" + id).val();
          console.log("masuk " + id);
          console.log("masuk " + x_value);
          //let x_value2 = $(id).val();
          //alert(id + x_value);

          if (id.includes("d2_batch_")) {
            let idx = id.replace("d2_batch_", "");

            mythis.var_SO_awal_batch[idx].batch = x_value;
          } else if (id.includes("d2_soqty_")) {
            let idx = id.replace("d2_soqty_", "");
            mythis.var_SO_awal_batch[idx].stockOpnameQty = x_value;
          }
        }

        //alert(mythis.var_penerimaan_DN[id]);
        //alert(mythis.var_penerimaan_Actual[id]);
        // var_penerimaan_DN: {},
        // var_penerimaan_Actual: {},

        // if (x_value > mythis.var_penerimaan_DN_Qty[id]) {
        //   Swal.fire(
        //     "Ubah Qty gagal!",
        //     "Actual Qty (" +
        //       x_value +
        //       ") melebihi onHand Qty (" +
        //       mythis.var_penerimaan_DN_Qty[id] +
        //       ") value otomatis dirubah menjadi (" +
        //       mythis.var_penerimaan_DN_Qty[id] +
        //       ")",
        //     "error"
        //   );

        //   x_value = mythis.var_penerimaan_DN_Qty[id];
        //   $("#txt_" + id).val(x_value);
        //   mythis.var_penerimaan_Actual[id] = x_value;
        //   var variantx = mythis.var_penerimaan_DN_Qty[id] - x_value;
        //   $("#variant_" + id).val(variantx);
        // }

        // if (x_value > mythis.var_penerimaan_DN[id]) {
        //   Swal.fire(
        //     "Ubah Qty gagal!",
        //     "Actual Qty (" +
        //       x_value2 +
        //       ") melebihi Ticket TO Qty (" +
        //       mythis.var_penerimaan_DN[id] +
        //       ") value otomatis dirubah menjadi (" +
        //       mythis.var_penerimaan_DN[id] +
        //       ")",
        //     "error"
        //   );

        //   x_value = mythis.var_penerimaan_DN[id];
        //   $("#txt_" + id).val(x_value);
        //   mythis.var_penerimaan_Actual[id] = x_value;
        //   var variantx = mythis.var_penerimaan_DN[id] - x_value;
        //   $("#variant_" + id).val(variantx);
        // } else {
        //   var variantx = mythis.var_penerimaan_DN[id] - x_value;
        //   $("#variant_" + id).val(variantx);
        //   mythis.var_penerimaan_Actual[id] = x_value;
        // }

        mythis.kalkulasiTotal();
      });

      $(document).on("click", "#viewTicketTOUpdate", function () {
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
        //mythis.getRincianHeaderIDTR_TO();
        //mythis.$root.loader = true;
      });

      $(document).on("click", "#viewToTinUpdate", function () {
        let id = $(this).data("id");
        //alert(id);

        mythis.modal();

        mythis.flagUpdate = true;

        // mythis.getCboWhsCodeInventory_from();
        // mythis.getCboPriceCodeInventory_from();
        // mythis.getCboDiscCodeInventory_from();

        // mythis.getCboWhsCodeInventory_to();
        // mythis.getCboPriceCodeInventory_to();
        // mythis.getCboDiscCodeInventory_to();
        mythis.idRincian = id;
        mythis.flagSOCriteria = true;

        mythis.getCbooptCode();

        mythis.getCboWhsCodeInventory_from();
        mythis.getCboPriceCodeInventory_from();
        mythis.getCboDiscCodeInventory_from();

        mythis.getRincianHeaderTR_Update(id);

        mythis.flagViewSO = true;

        mythis.flagGetDataSO = true;
      });

      $(document).on("click", "#viewTicketTO", function () {
        let id = $(this).data("id");
        // alert("ABCD");
        mythis.idRincian = id;
        mythis.close11();
        //mythis.$root.loader = true;
        // mythis.getTableRincian();
        // mythis.getRincianHeaderID(id);

        // mythis.getTableRincianData();
        // mythis.getRincianHeaderIDTR_TO();
        // mythis.flagGetData = false;

        // mythis.getCboWhsCodeInventory();
        // mythis.getCboPriceCodeInventory();
        // mythis.getCboDiscCodeInventory();

        ////////////////////////////////////////////////
        mythis.flagUpdate = true;

        mythis.flagSOCriteria = true;

        mythis.getCbooptCode();

        mythis.getCboWhsCodeInventory_from();
        mythis.getCboPriceCodeInventory_from();
        mythis.getCboDiscCodeInventory_from();

        mythis.getRincianHeaderTR_NON_Update(id);

        mythis.flagViewSO = true;

        mythis.flagGetDataSO = true;
        ////////////////////////////////////////////////
      });
      $(document).on("click", "#updateDeliveryNoteD1", function () {
        let id = $(this).data("id");
        //alert("view " + id);
        mythis.getRincianDetailID(id);
        mythis.modal2();
      });
      $(document).on("click", "#changeLock", function () {
        let id = $(this).data("id");

        if (mythis.dataTr104.docStatus == "C") return false;

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
        //language: idID
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
            //   <button data-id="${row.cells[0].data}" class="btn btn-sm btn-info text-white" id="viewToTinUpdate" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> Update</button>
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
            id: "storeCodeFrm",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>SO Store</b></div>'
            ),
          },

          // {
          //   id: "storeCodeFrm",
          //   name: html(
          //     '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>From Store</b></div>'
          //   ),
          // },

          // {
          //   id: "storeCodeTo",
          //   name: html(
          //     '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>To Store</b></div>'
          //   ),
          // },

          {
            id: "docDate",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Doc Date</b></div>'
            ),
          },

          {
            id: "itemCount",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Item Total</b></div>'
            ),
          },

          {
            id: "quantityAmont",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Qty Total</b></div>'
            ),
          },
        ],
        className: {
          table: "table table-hover",
        },
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
            "background-color": "#ffccf2",
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
          url: this.$root.API_ERP + "/wms/pagingTransOut_CC_Entry",
          then: (data) =>
            data.results.map((card) => [
              card.id,
              //"",
              card.docStatus == "D"
                ? html(
                    `
              <button data-id="${card.id}" class="btn btn-sm btn-warning text-white" id="viewToTinUpdate" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> Confirm</button>
              `
                  )
                : card.docStatus == "O" && card.inSts == null
                ? html(
                    `
              <button data-id="${card.id}" class="btn btn-sm btn-info text-white" id="viewToTinUpdate" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> Entry Data</button>
              `
                  )
                : html(
                    `
              <button data-id="${card.id}" class="btn btn-sm btn-success text-white" id="viewToTinUpdate" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> Done</button>
              `
                  ),

              card.docStatus,
              card.docNum,
              card.storeCodeFrm,
              //card.storeCodeTo,
              card.docDate1,
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
      this.grid2.render(document.getElementById("wrapper2"));
      this.number = 0;

      $(document).off("change", "input");
      $(document).off("click", "#chooseStock");
      $(document).off("click", "#getStoreFrom");
      $(document).off("click", "#getStoreTo");
      $(document).off("click", "#viewToTinUpdate");
      mythis.jqueryDelEdit();
    },

    getpagingTransOutfromTicket() {
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
              <button data-id="${row.cells[0].data}" class="btn btn-sm btn-info text-white" id="viewTicketTO" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> Pilih</button>
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
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Doc Date</b></div>'
            ),
          },

          {
            id: "docStatus",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Doc Status</b></div>'
            ),
          },

          {
            id: "storeCodeFrm",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>SO Store</b></div>'
            ),
          },
          // {
          //   id: "storeCodeFrm",
          //   name: html(
          //     '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>From Store</b></div>'
          //   ),
          // },

          // {
          //   id: "storeCodeTo",
          //   name: html(
          //     '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>To Store</b></div>'
          //   ),
          // },

          {
            id: "totalItem",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Item Total</b></div>'
            ),
          },

          {
            id: "quantityAmont",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Qty Total</b></div>'
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
            "background-color": "#ffccf2",
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
          url: this.$root.API_ERP + "/wms/pagingTransOutfromTicket_CC",
          then: (data) =>
            data.results.map((card) => [
              card.id,
              "",
              card.docNum,
              card.docDate1,
              card.docStatus,
              card.storeCodeFrm,
              //card.storeCodeTo,
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
          // {
          //   id: "docEntry",
          //   name: html(
          //     '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Doc Entry</b></div>'
          //   ),
          // },

          {
            id: "itemCode",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b> Item Code</b></div>'
            ),
          },

          {
            id: "itemName",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b> Item Name</b></div>'
            ),
          },

          {
            id: "onHand",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>On Hand</b></div>'
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
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Ticket TO Qty</b></div>'
            ),
          },
          {
            id: "actualQty",
            name: html(
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Actual Qty </b></div>'
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
          // {
          //   id: "updatedAt",
          //   name: html(
          //     '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b> Updated Date</b></div>'
          //   ),
          // },
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
            "background-color": "#ffccf2",
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
            this.$root.API_ERP + "/wms/pagingRincianTO/" + this.idRincian,
          then: (data) =>
            data.results.map((card) => [
              card.id,
              card.itemCode1,
              (data.nomorBaris += 1),
              //card.docEntry,

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
        .get(this.$root.API_ERP + "/wms/getRincianheaderIDNew_TO/" + id)
        .then((res) => {
          mythis.dataRincianHeaderID = res.data.data[0];
          mythis.dataTr104.storeCode = res.data.data[0].storeCode;
          mythis.dataTr104.storeName = res.data.data[0].storeName;
          mythis.dataTr104.docStatus = "O";
          mythis.dataTr104.reference = res.data.data[0].docNum;
          mythis.dataTr104.comments = res.data.data[0].comments;
          mythis.dataTr104.docDate = new Date().toISOString().slice(0, 10);
          //mythis.dataTr104.reference = res.data.data[0].poNo;
          mythis.dataTr104.whsCode = res.data.data[0].whsCode;
          mythis.tmp_getCboWhsCodeInventoryOptions =
            res.data.data[0].whsCode + " - " + res.data.data[0].whsName;
          mythis.dataTr104.comments = "";
          mythis.dataTr104.whsName = "";
          mythis.dataTr104.priceCode = res.data.data[0].priceCode;
          mythis.tmp_getCboPriceCodeInventoryOptions =
            res.data.data[0].priceName;
          mythis.dataTr104.priceName = "";
          mythis.dataTr104.discCode = res.data.data[0].discCode;
          mythis.tmp_getCboDiscCodeInventoryOptions = res.data.data[0].discName;
          mythis.dataTr104.discName = "";
          mythis.$root.loader = false;

          mythis.dataTr104.storeCodeTo = res.data.data[0].storeCodeTo;
          mythis.dataTr104.storeNameTo = res.data.data[0].storeName2;
          mythis.dataTr104.priceCodeTo = res.data.data[0].priceCodeTo;
          mythis.dataTr104.discCodeTo = res.data.data[0].discCodeTo;
          mythis.dataTr104.whsCodeTo = res.data.data[0].whsCodeTo;

          mythis.tmp_getCboWhsCodeOptions_to =
            res.data.data[0].whsCodeTo + " - " + res.data.data[0].whsName2;
          mythis.tmp_getCboDiscCodeOptions_to = res.data.data[0].discName2;
          mythis.tmp_getCboPriceCodeOptions_to = res.data.data[0].priceName2;

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
      this.dataTr104.whsCode = this.tmp_getCboWhsCodeInventoryOptions.code;
    },

    mySelectEvent22() {
      this.dataTr104.priceCode = this.tmp_getCboPriceCodeInventoryOptions.code;
    },

    mySelectEvent222() {
      this.dataTr104.discCode = this.tmp_getCboDiscCodeInventoryOptions.code;
    },
    savePenerimaanBarang() {
      var mythis = this;

      if (
        mythis.dataTr104.discCode == null ||
        mythis.dataTr104.discCode == "" ||
        mythis.dataTr104.discCode == undefined
      ) {
        // toast.error("Silakan pilih kode diskon terlebih dahulu");
        mythis.$root.showAlertFunction('warning', 'Gagal Melanjutkan!', 'Silakan pilih kode diskon terlebih dahulu.');
        return false;
      }

      if (
        mythis.dataTr104.whsCode == null ||
        mythis.dataTr104.whsCode == "" ||
        mythis.dataTr104.whsCode == undefined
      ) {
        // toast.error("Silakan pilih warehouse terlebih dahulu");
        mythis.$root.showAlertFunction('warning', 'Gagal Melanjutkan!', 'Silakan pilih warehouse terlebih dahulu.');
        return false;
      }

      if (
        mythis.dataTr104.priceCode == null ||
        mythis.dataTr104.priceCode == "" ||
        mythis.dataTr104.priceCode == undefined
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
          mythis.$root.loader = true;
          axios
            .put(
              mythis.$root.API_ERP +
                "/wms/savePenerimaanBarang_TO/" +
                mythis.idRincian,
              {
                var_penerimaan_DN: mythis.var_penerimaan_DN,
                var_penerimaan_Actual: mythis.var_penerimaan_Actual,
                docEntry: mythis.idRincian,
                userid: mythis.userid,
                dataHeader: mythis.dataTr104,
                dataHeaderSave: mythis.dataRincianHeaderIDTR,
              }
            )
            .then((res) => {
              //console.log(res);
              //toast.success("Data telah berhasil di approve");
              Swal.fire(
                "Update Success!",
                "Data telah disimpan sementara, silakan konfirmasi untuk melanjutkan proses TI di Toko Tujuan",
                "success"
              );
              mythis.$root.loader = false;
              mythis.flagSave = 1;
              mythis.status_save_PenerimaanBarang = 1;
              mythis.getRincianHeaderIDTR_TO();
              //mythis.close();
              // mythis.close2();
            })
            .catch(function (error) {
              mythis.$root.loader = false;
              if (error.response) {
                //console.log(error.response.data);
                //mythis.insertModalSukses = false;
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
        text: "Apakah Anda ingin mengkonfirmasi TO Barang ini?",
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
                "/wms/confirmPenerimaanBarang_TO/" +
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
                "Transfer Out Barang telah dikonfirmasi sesuai",
                "success"
              );
              mythis.$root.loader = false;
              mythis.doSendNotifFirebase();
              mythis.close();
              mythis.close2();
              mythis.refreshTable();
            })
            .catch(function (error) {
              mythis.$root.loader = false;
              if (error.response) {
                //console.log(error.response.data);
                //mythis.insertModalSukses = false;
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
          mythis.$root.showAlertFunction('success', 'Berhasil Dirubah', 'Data Qty berhasil diubah.');
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
                  mythis.$root.showAlertFunction('warning', 'Gagal melanjutkan!', mythis.errorList[key]);

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

    getRincianHeaderIDTR_TO() {
      var mythis = this;
      mythis.$root.loader = true;
      axios
        .get(
          this.$root.API_ERP +
            "/wms/getRincianHeaderIDTR_TO/" +
            this.idRincian
        )
        .then((res) => {
          console.log(res.data.data);
          if (res.data.data.length > 0) {
            mythis.dataRincianHeaderIDTR = res.data.data[0];
            mythis.dataTr104.docNum = res.data.data[0].docNum;
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
            "/wms/pagingRincianTO/" +
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
      this.getRincianHeaderIDTR_TO();
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

input[type="checkbox"] {
  /* Double-sized Checkboxes */
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  transform: scale(2);
  padding: 10px;
}
.checkboxtext {
  /* Checkbox text */
  font-size: 110%;
  display: inline;
}
</style>
