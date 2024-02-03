<template>
  <div class="d-flex align-items-center mb-3 mt-1">
    <span class="badge rounded me-3 ms-1 badge-subtle-primary">
      <span class="far fa-file-archive fs-2 text-primary"></span>
    </span>
    <div class="col">
      <h5 class="mb-0 text-primary position-relative">
        <span class="bg-200 dark__bg-1100 pe-3 fs-2">Ticket TO - TIN</span>
        <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
      </h5>
      <p class="mb-0 fs--1"><a href="javascript:void(0)" class="text-dark">Martha Tilaar Shop</a> / Ticket TO - TIN</p>
    </div>
  </div>
  
  <div class="card shadow-none border mb-3">
    <div class="bg-holder bg-card d-none d-md-block" style="background-image:url('assets/img/illustration/reports-bg.png');"></div><!--/.bg-holder-->
    <div class="card-header z-1">
      <div class="row flex-between-center gx-0">
        <div class="col-lg-auto d-flex align-items-center"><img class="img-fluid" src="@/assets/img/illustration/reports-greeting.png" alt="">
          <div class="ms-x1">
            <h6 class="mb-1 text-primary">Martha Tilaar Shop</h6>
            <h4 class="mb-0 text-primary fw-bold"><span class="text-info fw-medium">Ticket TO - TIN</span></h4>
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
        @close21="showModal11 = false"
      >
        <template #header>
          <h3>Browse From Store</h3>
        </template>
        <template #body>
          <div style="width: 90vw">
            <template v-if="flagclickFromStore_tombol == false">
              <button
                class="btn btn-success btn-sm me-1"
                @click="getStoreFrom()"
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
      <!-------------------------------------------------------->
      <FormModal
        :show="showModal21"
        :style="showmodal21_zindex"
        @close21="showModal21 = false"
      >
        <template #header>
          <h3>Browse To Store</h3>
        </template>
        <template #body>
          <div style="width: 90vw">
            <template v-if="flagclickFromStore == true">
              <template v-if="flagclickToStore_tombol == false">
                <button
                  class="btn btn-success btn-sm me-1"
                  @click="getStoreTo()"
                >
                  Get data
                </button>
              </template>
            </template>
            <div class="block-content">
              <div class="block-content">
                <div id="wrapper21"></div>
                <div id="box21"></div>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <button
            class="modal-default-button btn btn-secondary btn-sm me-1"
            @click="close21"
          >
            Close
          </button>
        </template>
      </FormModal>
      <!-------------------------------------------------------->
      <!-------------------------------------------------------->
      <FormModal
        :show="showModal81"
        :style="showmodal81_zindex"
        @close21="showModal81 = false"
      >
        <template #header>
          <h3>Browse Item From Store</h3>
        </template>
        <template #body>
          <div style="width: 90vw">
            <div class="">
              <table
                class="table table-borderless"
                style="background-color: #f5f7fa"
              >
                <tbody>
                  <tr>
                    <td class="text-left">
                      <strong>From Store</strong>
                    </td>
                    <td class="text-left">&nbsp;</td>
                    <td class="text-success text-left">&nbsp;</td>
                    <td class="text-left">From Store ID</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr102.storeCodeFrm == undefined
                            ? "-"
                            : dataTr102.storeCodeFrm
                        }}
                      </strong>
                    </td>
                    <td class="text-left">From Store Name</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr102.storeNameFrm == undefined
                            ? "-"
                            : dataTr102.storeNameFrm
                        }}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">WHS Code</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>{{
                        tmp_getCboWhsCodeOptions_from.label == undefined
                          ? tmp_getCboWhsCodeOptions_from
                          : tmp_getCboWhsCodeOptions_from.label
                      }}</strong>
                    </td>
                    <td class="text-left" colspan="6">&nbsp;</td>
                    <!-- <td class="text-left">priceCode</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>{{ tmp_getCboPriceCodeOptions_from }}</strong>
                    </td>

                    <td class="text-left">discCode</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>{{ tmp_getCboDiscCodeOptions_from }}</strong>
                    </td> -->
                  </tr>
                </tbody>
              </table>
            </div>

            <template v-if="flagclickToStore == true">
              <template v-if="flagclickInputItem_tombol == false">
                <button
                  class="btn btn-success btn-sm me-1"
                  @click="getItemFromStoreData()"
                >
                  Get data from Inventory
                </button>
              </template>
            </template>
            <div class="block-content">
              <div class="block-content">
                <div id="wrapper81"></div>
                <div id="box81"></div>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <button
            class="modal-default-button btn btn-secondary btn-sm me-1"
            @click="close81"
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
          <h3>Form Pembuatan Ticket To Tin</h3>
        </template>
        <template #body>
          <div style="width: 90vw">
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
                        {{ dataTr102.docNum == "" ? "-" : dataTr102.docNum }}
                      </strong>
                    </td>
                    <td class="text-left" width="10">Doc Status</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr102.docStatus == undefined
                            ? "-"
                            : dataTr102.docStatus == "O"
                            ? "Open"
                            : dataTr102.docStatus == "D"
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
                          dataTr102.docDate == undefined
                            ? "-"
                            : dataTr102.docDate
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
                          v-model="dataTr102.comments"
                          placeholder=""
                          :disabled="dataTr102.docStatus == 'O'"
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
                          v-model="dataTr102.description"
                          placeholder=""
                          :disabled="dataTr102.docStatus == 'O'"
                        ></textarea>
                      </template>
                    </td>

                    <td class="text-left" width="10">Reference</td>
                    <td class="text-left" width="1">:</td>
                    <td class="text-success text-left" width="10">
                      <template v-if="flagclickFromStore == true">
                        <textarea
                          id="w3review"
                          name="w3review"
                          rows="3"
                          cols="40"
                          v-model="dataTr102.reference"
                          placeholder=""
                          :disabled="dataTr102.docStatus == 'O'"
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
                    <td class="text-left">
                      <strong>From Store</strong>&nbsp;&nbsp;
                      <template v-if="dataTr102.docStatus == 'D'">
                        <button
                          class="btn btn-success btn-sm me-1"
                          @click="clickFromStore()"
                        >
                          Browse
                        </button>
                      </template>
                    </td>
                    <td class="text-left">&nbsp;</td>
                    <td class="text-success text-left">&nbsp;</td>
                    <td class="text-left">From Store ID</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr102.storeCodeFrm == undefined
                            ? "-"
                            : dataTr102.storeCodeFrm
                        }}
                      </strong>
                    </td>
                    <td class="text-left">From Store Name</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr102.storeNameFrm == undefined
                            ? "-"
                            : dataTr102.storeNameFrm
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
                          :disabled="dataTr102.docStatus == 'O'"
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
                          :disabled="dataTr102.docStatus == 'O'"
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
                          :disabled="dataTr102.docStatus == 'O'"
                        ></v-select>
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
                    <td class="text-left">
                      <strong>To Store</strong>&nbsp;&nbsp;
                      <template v-if="flagclickFromStore == true">
                        <template v-if="dataTr102.docStatus == 'D'">
                          <button
                            class="btn btn-success btn-sm me-1"
                            @click="clickToStore"
                          >
                            Browse
                          </button>
                        </template>
                      </template>
                    </td>
                    <td class="text-left">&nbsp;</td>
                    <td class="text-success text-left">&nbsp;</td>
                    <td class="text-left">To Store ID</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr102.storeCodeTo == undefined
                            ? "-"
                            : dataTr102.storeCodeTo
                        }}
                      </strong>
                    </td>
                    <td class="text-left">To Store Name</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr102.storeNameTo == undefined
                            ? "-"
                            : dataTr102.storeNameTo
                        }}
                      </strong>
                    </td>
                  </tr>

                  <tr>
                    <td class="text-left">WHS Code</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <template v-if="flagclickToStore == true">
                        <v-select
                          :options="getCboWhsCodeOptions_to"
                          v-model="tmp_getCboWhsCodeOptions_to"
                          @update:modelValue="mySelectEvent71()"
                          :clearable="false"
                          :disabled="dataTr102.docStatus == 'O'"
                        ></v-select>
                      </template>
                    </td>
                    <!-- <td class="text-left" colspan="6">&nbsp;</td> -->

                    <td class="text-left">Price Code</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <template v-if="flagclickToStore == true">
                        <v-select
                          :options="getCboPriceCodeOptions_to"
                          v-model="tmp_getCboPriceCodeOptions_to"
                          @update:modelValue="mySelectEvent72()"
                          :clearable="false"
                          :disabled="dataTr102.docStatus == 'O'"
                        ></v-select>
                      </template>
                    </td>

                    <td class="text-left">Discount Code</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <template v-if="flagclickToStore == true">
                        <v-select
                          :options="getCboDiscCodeOptions_to"
                          v-model="tmp_getCboDiscCodeOptions_to"
                          @update:modelValue="mySelectEvent73()"
                          :clearable="false"
                          :disabled="dataTr102.docStatus == 'O'"
                        ></v-select>
                      </template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- <pre>{{ dataTr102 }} </pre>
            <pre>{{ myArrayItemBarang }} </pre>
            <pre>{{ myArrayItemBarang_onHand }} </pre> -->

            <!-- <pre>{{ idRincian }} rincian DN</pre>
            <pre>{{ idRincianUpdate }} rincian TR</pre>
            <pre>{{ dataRincianHeaderID }} </pre>
            <pre>{{ dataTr102 }} </pre>
            <pre>{{ var_penerimaan_DN }}</pre>
            <pre>{{ var_penerimaan_Actual }}</pre>
            <pre>{{ data_CboWhs }}</pre>
            <pre>{{ dataRincianHeaderIDTR }}</pre> -->
            <br />
            <template v-if="flagclickToStore == true">
              <template v-if="dataTr102.docStatus == 'D'">
                <button
                  class="btn btn-success btn-sm me-1"
                  @click="getItemFrom()"
                >
                  Input Item
                </button>

                <br />
                <br />
              </template>
              <!-- <pre> {{ dataTr102 }}</pre> -->
              <table
                class="table table-bordered table-striped table-vcenter"
                style="padding: 0; margin: 0; font-size: 13px"
              >
                <thead>
                  <tr>
                    <template
                      v-if="
                        dataTr102.docStatus == 'O' || dataTr102.docStatus == 'C'
                      "
                    >
                      <td class="text-center" colspan="8">
                        <strong>List Item</strong>
                      </td>
                    </template>
                    <template v-else>
                      <td class="text-center" colspan="7">
                        <strong>List Item</strong>
                      </td>
                    </template>
                  </tr>
                  <tr>
                    <td class="text-center"><strong>NO</strong></td>
                    <td class="text-center"><strong>Item Code</strong></td>
                    <td class="text-center"><strong>Item Name</strong></td>
                    <td class="text-center"><strong>on Hand</strong></td>
                    <td class="text-center"><strong>Qty To Tin</strong></td>
                    <template v-if="dataTr102.approval_at != null">
                      <td class="text-center">
                        <strong>Qty Store From</strong>
                      </td>
                      <td class="text-center"><strong>Qty Store To</strong></td>
                    </template>
                    <td class="text-center">#</td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(value, key, index) in myArrayItemBarang"
                    :key="key"
                  >
                    <td>{{ key + 1 }}</td>
                    <td>{{ value.itemcode }}</td>
                    <td>{{ value.itemname }}</td>
                    <td>{{ value.onhand }}</td>
                    <td>
                      <input
                        :id="'txt_' + value.id"
                        :value="value.qty_kirim"
                        type="number"
                        pattern="[0-9]"
                        style="width: 8em"
                        min="0"
                        :max="value.onhand"
                        :data-id="value.id"
                        :disabled="dataTr102.docStatus == 'O'"
                      />
                    </td>
                    <template v-if="dataTr102.approval_at != null">
                      <td class="text-center">
                        <strong>{{
                          dataTr102.outSts == "C" ? value.quantityFrm1 : "-"
                        }}</strong>
                      </td>
                      <td class="text-center">
                        <strong>{{
                          dataTr102.inSts == "C" ? value.quantityTo1 : "-"
                        }}</strong>
                      </td>
                    </template>

                    <td class="text-center">
                      <template v-if="dataTr102.docStatus == 'D'">
                        <a
                          @click="deleteItemTmp(key)"
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
            </template>
            <br />
            <br />

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
                <template
                  v-if="
                    dataTr102.docStatus == 'D' && myArrayItemBarang.length > 0
                  "
                >
                  <template v-if="flagSaveAwal == 0">
                    <button
                      type="button"
                      class="btn btn-success"
                      @click="saveData()"
                    >
                      Save Data
                    </button>
                  </template>
                </template>
              </div>
              <div class="text-center">
                <template
                  v-if="
                    dataTr102.docStatus == 'D' && myArrayItemBarang.length > 0
                  "
                >
                  <template v-if="flagSaveAwal == 1">
                    <button
                      type="button"
                      class="btn btn-success"
                      @click="confirmTicket()"
                    >
                      Confirm Ticket
                    </button>
                  </template>
                </template>
              </div>

              <div class="text-center">
                <template
                  v-if="
                    dataTr102.docStatus == 'O' &&
                    myArrayItemBarang.length > 0 &&
                    dataTr102.approval_at == null
                  "
                >
                  <!-- <button
                    type="button"
                    class="btn btn-success"
                    @click="approveTicket()"
                  >
                    Approve Ticket
                  </button> -->

                  <div class="alert alert-info border-0 d-flex align-items-center" role="alert">
                    <div class="bg-info me-3 icon-item">
                      <span class="fas fa-info-circle text-white fs-3"></span>
                    </div>
                    <p class="mb-0 flex-1">Mengunggu Approve Ticket Dari Pusat!</p>
                  </div>
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

      title: "Ticket To Tin",
      showModal: false,
      showmodal_zindex: "z-index:1030",
      grid2: new Grid(),
      dataTr102: {},

      showModal11: false,
      showmodal11_zindex: "z-index:1031",
      grid11: new Grid(),

      showModal21: false,
      showmodal21_zindex: "z-index:1031",
      grid21: new Grid(),

      showModal81: false,
      showmodal81_zindex: "z-index:1031",
      grid81: new Grid(),

      flagclickFromStore: false,
      flagclickFromStore_tombol: false,

      flagclickToStore: false,
      flagclickToStore_tombol: false,

      flagclickInputItem: false,
      flagclickInputItem_tombol: false,

      getCboWhsCodeOptions_from: [],
      tmp_getCboWhsCodeOptions_from: "",

      getCboPriceCodeOptions_from: [],
      tmp_getCboPriceCodeOptions_from: "",

      getCboDiscCodeOptions_from: [],
      tmp_getCboDiscCodeOptions_from: "",

      getCboWhsCodeOptions_to: [],
      tmp_getCboWhsCodeOptions_to: "",

      getCboPriceCodeOptions_to: [],
      tmp_getCboPriceCodeOptions_to: "",

      getCboDiscCodeOptions_to: [],
      tmp_getCboDiscCodeOptions_to: "",

      myArrayItemBarang: [],
      myArrayItemBarang_onHand: {},

      ///////////////////////////////////////////
      ///////////////////////////////////////////

      flagGetHeaderDN: false,

      showModal2: false,
      showmodal2_zindex: "z-index:1031;",

      grid3: new Grid(),
      idRincian: "",
      idRincianUpdate: "",
      dataDocNumTRDN: "",

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
      dataTr102_comments: "",

      dataTr102_comments: "",
      dataInputUpdate: [],
      flagSaveAwal: 0,

      uObject: "",
    };
  },
  mounted() {
    const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
    this.userStoreCode = cacheStoreAccess.store_code;
    this.userid = cacheStoreAccess.user_uuid;
    this.getTable();
    this.$root.hideLoading();
  },
  methods: {
    ///////////////////////////////////////////////////
    doSendNotifFirebase() {
      var mythis = this;
      var header = "Notifikasi Transfer OUT";
      var body =
        "Nomor Dokumen Ticket TO TIN (" +
        mythis.dataTr102.docNum +
        "), TO dari " +
        mythis.dataTr102.storeCodeFrm +
        " (" +
        mythis.dataTr102.storeNameFrm +
        ") ==> TIN ke " +
        mythis.dataTr102.storeCodeTo +
        " (" +
        mythis.dataTr102.storeNameTo +
        ") [" +
        new Date().toLocaleString("en-GB") +
        "]";
      mythis.$root.sendNotifFirebase(header, body);
    },
    ///////////////////////////////////////////////////

    saveData() {
      var mythis = this;
      var a = 0;
      Object.keys(mythis.myArrayItemBarang).forEach(function (key) {
        if (mythis.myArrayItemBarang[key].qty_kirim == 0) {
          //toast.error("Qty tidak boleh kosong");
          //return false;
          a = 1;
        }
      });

      if (a == 1) {
        // toast.error("Qty tidak boleh kosong");
        mythis.$root.showAlertFunction('warning', 'Gagal Melanjutkan!', 'Qty tidak boleh kosong');
      } else {
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
              .post(mythis.$root.API_ERP + "/wms/saveDataTicketToTin/", {
                dataTr102: mythis.dataTr102,
                myArrayItemBarang: mythis.myArrayItemBarang,
                userid: mythis.userid,
              })
              .then((res) => {
                //console.log(res);
                //toast.success("Data telah berhasil di approve");
                Swal.fire(
                  "Update Success!",
                  "Data telah disimpan sementara (Draft). Silakan lanjutkan proses Confirm dan Approval",
                  "success"
                );
                mythis.$root.hideLoading();
                mythis.flagSave = 1;
                mythis.status_save_PenerimaanBarang = 1;
                mythis.dataTr102.docNum = res.data.data;

                mythis.flagSaveAwal = 1;

                if (
                  mythis.dataTr102.id == "" ||
                  mythis.dataTr102.id == null ||
                  mythis.dataTr102.id == undefined
                ) {
                  mythis.close();
                  mythis.close21();
                }
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
      }
    },
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //getItemFrom
    deleteItemTmp(key) {
      //alert(index);
      //this.tableTmpBphp.slice(index); //OR   this.$delete(this.items,index)
      //both will do the same
      this.myArrayItemBarang.splice(key, 1);
    },
    getItemFromStoreData() {
      var mythis = this;

      mythis.flagclickInputItem_tombol = true;

      // mythis.flagclickInputItem = true;

      // mythis.flagclickToStore_tombol = false;

      //////////////////////////////
      $("#wrapper81").remove();
      var e = $('<div id="wrapper81"></div>');
      $("#box81").append(e);
      this.grid81 = new Grid();
      //////////////////////////////

      this.grid81.updateConfig({
        //language: idID
        fixedHeader: true,
        height: "10",
        pagination: {
          limit: 20,
          server: {
            url: (prev, page, limit) =>
              `${prev}${prev.includes("?") ? "&" : "?"}limit=${limit}&offset=${
                page * limit
              }&storeCodeFrm=${this.dataTr102.storeCodeFrm}&whsCodeFrm=${
                this.dataTr102.whsCodeFrm
              }`,
          },
        },
        search: {
          debounceTimeout: 1000,
          server: {
            url: (prev, keyword) => `${prev}?search=${keyword}`,
          },
        },

        // search: {
        //   server: {
        //     url: (prev, keyword) => `${prev}?search=${keyword}`,
        //   },
        // },
        columns: [
          { name: "ID", hidden: true },
          {
            name: "---- # ----",
            formatter: (_, row) =>
              html(
                `
              <button data-id="${row.cells[0].data}XXYYZZ${row.cells[3].data}XXYYZZ${row.cells[4].data}XXYYZZ${row.cells[7].data}" class="btn btn-sm btn-info text-white" id="chooseStock" data-toggle="tooltip" title="View" > <i class="fa-solid fa-pen-to-square"></i> Pilih</button>
              `
              ),
          },
          {
            id: "storeCode",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Kode Toko</b></div>'
            ),
          },

          {
            id: "itemCode",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Kode Item</b></div>'
            ),
          },

          {
            id: "itemNameFull",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Nama Item</b></div>'
            ),
          },

          {
            id: "whsCode",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Kode Warehouse</b></div>'
            ),
          },
          {
            id: "whsName",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Nama Warehouse</b></div>'
            ),
          },
          {
            id: "onHand",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>onHand</b></div>'
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
          url: this.$root.API_ERP + "/wms/getItemFromStoreData",
          then: (data) =>
            data.results.map((card) => [
              card.id,
              "",
              card.storeCode,
              card.itemCode,
              card.itemNameFull,
              card.whsCode,
              card.whsName,
              card.onHand,
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
      this.grid81.render(document.getElementById("wrapper81"));

      this.number = 0;
    },
    getItemFrom() {
      this.modal81();
    },
    modal81() {
      this.showModal81 = true;
    },
    close81: function () {
      this.showModal81 = false;
      this.flagclickInputItem_tombol = false;
    },

    close: function () {
      //alert("AAA");
      this.showModal = false;
      this.refreshTable();

      this.dataTr102 = {};
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
    },
    mySelectEvent71() {
      this.dataTr102.whsCodeTo = this.tmp_getCboWhsCodeOptions_to.code;
    },

    mySelectEvent72() {
      this.dataTr102.priceCodeTo = this.tmp_getCboPriceCodeOptions_to.code;
    },

    mySelectEvent73() {
      this.dataTr102.discCodeTo = this.tmp_getCboDiscCodeOptions_to.code;
    },

    getCboWhsCodeInventory_to() {
      var mythis = this;
      //mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getCboWhsCodeInventory")
        .then((res) => {
          console.log(res);
          mythis.getCboWhsCodeOptions_to = res.data.data;
          //mythis.$root.hideLoading();
        });
    },
    getCboPriceCodeInventory_to() {
      var mythis = this;
      //mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getCbopriceCode")
        .then((res) => {
          console.log(res);
          mythis.getCboPriceCodeOptions_to = res.data.data;
          //mythis.$root.hideLoading();
        });
    },
    getCboDiscCodeInventory_to() {
      var mythis = this;
      //mythis.$root.showLoading();
      axios.get(this.$root.API_ERP + "/wms/getCbodiscCode").then((res) => {
        console.log(res);
        mythis.getCboDiscCodeOptions_to = res.data.data;
        //mythis.$root.hideLoading();
      });
    },

    mySelectEvent51() {
      this.dataTr102.whsCodeFrm = this.tmp_getCboWhsCodeOptions_from.code;
      this.myArrayItemBarang = [];
      this.myArrayItemBarang_onHand = {};
      this.flagGetData = true;
    },

    mySelectEvent52() {
      this.dataTr102.priceCodeFrm = this.tmp_getCboPriceCodeOptions_from.code;
    },

    mySelectEvent53() {
      this.dataTr102.discCodeFrm = this.tmp_getCboDiscCodeOptions_from.code;
    },
    getCboWhsCodeInventory_from() {
      var mythis = this;
      //mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getCboWhsCodeInventory")
        .then((res) => {
          console.log(res);
          mythis.getCboWhsCodeOptions_from = res.data.data;
          //mythis.$root.hideLoading();
        });
    },
    getCboPriceCodeInventory_from() {
      var mythis = this;
      //mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getCbopriceCode")
        .then((res) => {
          console.log(res);
          mythis.getCboPriceCodeOptions_from = res.data.data;
          //mythis.$root.hideLoading();
        });
    },
    getCboDiscCodeInventory_from() {
      var mythis = this;
      //mythis.$root.showLoading();
      axios.get(this.$root.API_ERP + "/wms/getCbodiscCode").then((res) => {
        console.log(res);
        mythis.getCboDiscCodeOptions_from = res.data.data;
        //mythis.$root.hideLoading();
      });
    },
    getStoreFromID(id) {
      var mythis = this;
      mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getStoreTicketToTinID/" + id)
        .then((res) => {
          mythis.dataTr102.docStatus = "D";
          mythis.dataTr102.docDate = new Date().toISOString().slice(0, 10);

          mythis.dataTr102.storeNameFrm = res.data.data[0].storeName;

          mythis.dataTr102.storeCodeFrm = res.data.data[0].storeCode;
          mythis.dataTr102.whsCodeFrm = res.data.data[0].whsCode;
          mythis.dataTr102.priceCodeFrm = res.data.data[0].priceCode;
          mythis.dataTr102.discCodeFrm = res.data.data[0].discCode;

          mythis.dataTr102.outSts = res.data.data[0].outSts;
          mythis.dataTr102.inSts = res.data.data[0].inSts;

          mythis.tmp_getCboWhsCodeOptions_from =
            res.data.data[0].whsCode + " - " + res.data.data[0].whsName;
          mythis.tmp_getCboPriceCodeOptions_from = res.data.data[0].priceName;
          mythis.tmp_getCboDiscCodeOptions_from = res.data.data[0].discName;

          mythis.$root.hideLoading();
          //console.log(this.dataRincianDetailID);
        });
    },
    getStoreToID(id) {
      var mythis = this;
      mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getStoreTicketToTinID/" + id)
        .then((res) => {
          mythis.dataTr102.storeNameTo = res.data.data[0].storeName;

          mythis.dataTr102.storeCodeTo = res.data.data[0].storeCode;
          mythis.dataTr102.whsCodeTo = res.data.data[0].whsCode;
          mythis.dataTr102.priceCodeTo = res.data.data[0].priceCode;
          mythis.dataTr102.discCodeTo = res.data.data[0].discCode;

          mythis.tmp_getCboWhsCodeOptions_to =
            res.data.data[0].whsCode + " - " + res.data.data[0].whsName;
          mythis.tmp_getCboPriceCodeOptions_to = res.data.data[0].priceName;
          mythis.tmp_getCboDiscCodeOptions_to = res.data.data[0].discName;

          mythis.$root.hideLoading();
          //console.log(this.dataRincianDetailID);
        });
    },
    clickFromStore() {
      this.modal11();
    },
    clickToStore() {
      this.modal21();
    },
    modal11() {
      this.showModal11 = true;
    },
    modal21() {
      this.showModal21 = true;
    },
    close11: function () {
      this.showModal11 = false;
      this.flagclickFromStore_tombol = false;
    },
    close21: function () {
      this.showModal21 = false;
      this.flagclickToStore_tombol = false;
    },
    getStoreFrom() {
      var mythis = this;

      mythis.flagclickFromStore_tombol = true;

      //////////////////////////////
      $("#wrapper11").remove();
      var e = $('<div id="wrapper11"></div>');
      $("#box11").append(e);
      this.grid11 = new Grid();
      //////////////////////////////

      this.grid11.updateConfig({
        //language: idID
        fixedHeader: true,
        height: "10",
        pagination: {
          limit: 20,
          server: {
            url: (prev, page, limit) =>
              `${prev}${prev.includes("?") ? "&" : "?"}limit=${limit}&offset=${
                page * limit
              }&search=${mythis.userStoreCode}`,
          },
        },
        // search: {
        //   server: {
        //     url: (prev, keyword) => `${prev}?search=${keyword}`,
        //   },
        // },
        columns: [
          { name: "ID", hidden: true },
          {
            name: "---- # ----",
            formatter: (_, row) =>
              html(
                `
              <button data-id="${row.cells[0].data}" class="btn btn-sm btn-info text-white" id="getStoreFrom" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> Pilih</button>
              `
              ),
          },

          {
            id: "storeCode",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Store Code</b></div>'
            ),
          },

          {
            id: "storeName",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Store Name</b></div>'
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
          url: this.$root.API_ERP + "/wms/pagingStoreTicketToTin",
          then: (data) =>
            data.results.map((card) => [
              card.id,
              "",
              card.storeCode,
              card.storeName,
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
    getStoreTo() {
      var mythis = this;
      //mythis.myArrayItemBaran = [];
      //mythis.flagclickToStore = true;
      //mythis.flagclickToStore_tombol = true;

      mythis.flagclickToStore_tombol = true;

      //////////////////////////////
      $("#wrapper21").remove();
      var e = $('<div id="wrapper21"></div>');
      $("#box21").append(e);
      this.grid21 = new Grid();
      //////////////////////////////

      this.grid21.updateConfig({
        //language: idID
        fixedHeader: true,
        height: "10",
        pagination: {
          limit: 20,
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
            name: "---- # ----",
            formatter: (_, row) =>
              html(
                `
              <button data-id="${row.cells[0].data}" class="btn btn-sm btn-info text-white" id="getStoreTo" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> Pilih</button>
              `
              ),
          },

          {
            id: "storeCode",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Store Code</b></div>'
            ),
          },

          {
            id: "storeName",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Store Name</b></div>'
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
          url: this.$root.API_ERP + "/wms/pagingStoreTicketToTin",
          then: (data) =>
            data.results.map((card) => [
              card.id,
              "",
              card.storeCode,
              card.storeName,
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
      this.grid21.render(document.getElementById("wrapper21"));
      this.number = 0;
      this.flagGetHeaderDN = true;
    },
    clickNew() {
      this.modal();
      this.dataTr102.docStatus = "D";
    },
    modal() {
      this.showModal = true;
    },

    refreshTable() {
      var mythis = this;
      //////////////////////////////
      $("#wrapper2").remove();
      var e = $('<div id="wrapper2"></div>');
      $("#box").append(e);
      mythis.getTable();
      //////////////////////////////
    },
    jqueryDelEdit() {
      const mythis = this;

      ////////////////////////////////////////////////////////////
      $(document).on("change", "input", function () {
        let id = $(this).data("id");
        let x_value = $("#txt_" + id).val();
        var number = parseInt(x_value);
        //alert(id + number);
        //alert(mythis.myArrayItemBarang_onHand[id]);
        //alert(mythis.var_penerimaan_DN[id]);
        //alert(mythis.var_penerimaan_Actual[id]);
        // var_penerimaan_DN: {},
        // var_penerimaan_Actual: {},

        if (number > mythis.myArrayItemBarang_onHand[id]) {
          Swal.fire(
            "Ubah Qty gagal!",
            "Actual Qty (" +
              number +
              ") melebihi onHand (" +
              mythis.myArrayItemBarang_onHand[id] +
              ") value otomatis dirubah menjadi (" +
              mythis.myArrayItemBarang_onHand[id] +
              ")",
            "error"
          );
          $("#txt_" + id).val(mythis.myArrayItemBarang_onHand[id]);
          Object.keys(mythis.myArrayItemBarang).forEach(function (key) {
            if (mythis.myArrayItemBarang[key].id == id) {
              mythis.myArrayItemBarang[key].qty_kirim =
                mythis.myArrayItemBarang_onHand[id];
            }
          });
        } else {
          Object.keys(mythis.myArrayItemBarang).forEach(function (key) {
            if (mythis.myArrayItemBarang[key].id == id) {
              mythis.myArrayItemBarang[key].qty_kirim = number;
            }
          });
        }
      });

      $(document).on("click", "#chooseStock", function () {
        let id = $(this).data("id");
        //alert(id);
        mythis.flagGetData = false;
        var splitString = id.split("XXYYZZ");
        let myObject = {
          id: splitString[0],
          itemcode: splitString[1],
          itemname: splitString[2],
          onhand: splitString[3],
          qty_kirim: 0,
        }; // create an object

        mythis.close81();
        mythis.flagclickInputItem_tombol = false;
        mythis.flagclickInputItem = false;

        var cek = false;
        Object.keys(mythis.myArrayItemBarang).forEach(function (key) {
          if (mythis.myArrayItemBarang[key].itemcode == splitString[1]) {
            cek = true;
            return false;
          }
        });

        if (cek == false) {
          mythis.myArrayItemBarang.push(myObject); // add the object to the array
          mythis.myArrayItemBarang_onHand[splitString[0]] = splitString[3];
        }
      });

      $(document).on("click", "#getStoreFrom", function () {
        let id = $(this).data("id");

        mythis.flagclickFromStore = true;
        mythis.flagclickFromStore_tombol = false;
        mythis.myArrayItemBarang = [];
        mythis.myArrayItemBarang_onHand = {};
        mythis.flagGetData = true;

        //alert(id);
        mythis.getStoreFromID(id);
        mythis.close11();

        mythis.getCboWhsCodeInventory_from();
        mythis.getCboPriceCodeInventory_from();
        mythis.getCboDiscCodeInventory_from();
      });

      $(document).on("click", "#getStoreTo", function () {
        let id = $(this).data("id");
        //alert(id);

        mythis.flagclickToStore = true;
        mythis.flagclickToStore_tombol = false;
        mythis.myArrayItemBarang = [];
        mythis.myArrayItemBarang_onHand = {};
        mythis.flagGetData = true;

        mythis.getStoreToID(id);
        mythis.close21();

        mythis.getCboWhsCodeInventory_to();
        mythis.getCboPriceCodeInventory_to();
        mythis.getCboDiscCodeInventory_to();
      });

      $(document).on("click", "#viewToTinUpdate", function () {
        let id = $(this).data("id");
        // alert(id);

        mythis.modal();

        mythis.flagUpdate = true;

        mythis.getCboWhsCodeInventory_from();
        mythis.getCboPriceCodeInventory_from();
        mythis.getCboDiscCodeInventory_from();

        mythis.getCboWhsCodeInventory_to();
        mythis.getCboPriceCodeInventory_to();
        mythis.getCboDiscCodeInventory_to();

        mythis.getRincianHeaderTR_Update(id);
      });
      ////////////////////////////////////////////////////////////
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
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>From Store</b></div>'
            ),
          },

          {
            id: "storeCodeTo",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>To Store</b></div>'
            ),
          },

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
          url: this.$root.API_ERP + "/wms/pagingTicketToTin",
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
                : card.docStatus == "O" && card.approval_at == null
                ? html(
                    `
              <button data-id="${card.id}" class="btn btn-sm btn-info text-white" id="viewToTinUpdate" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> Approve</button>
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
              card.storeCodeTo,
              card.docDate,
              card.itemCount,
              card.quantityAmont,
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

    getRincianHeaderTR_Update(id) {
      var mythis = this;
      mythis.$root.showLoading();
      axios
        .get(
          this.$root.API_ERP + "/wms/getRincianheaderIDUpdate_ToTin/" + id
        )
        .then((res) => {
          //   mythis.dataRincianHeaderID = res.data.data[0];
          //   mythis.dataRincianHeaderIDTR = res.data.data[0];
          mythis.dataTr102.id = res.data.data[0].id;
          mythis.dataTr102.docNum = res.data.data[0].docNum;

          mythis.dataTr102.approval_at = res.data.data[0].approval_at;

          mythis.dataTr102.docStatus = res.data.data[0].docStatus;
          mythis.dataTr102.docDate = res.data.data[0].docDate1;
          mythis.dataTr102.reference = res.data.data[0].reference;
          mythis.dataTr102.description = res.data.data[0].description;
          mythis.dataTr102.comments = res.data.data[0].comments;

          mythis.dataTr102.storeCodeFrm = res.data.data[0].storeCodeFrm;
          mythis.dataTr102.whsCodeFrm = res.data.data[0].whsCodeFrm;
          mythis.dataTr102.priceCodeFrm = res.data.data[0].priceCodeFrm;
          mythis.dataTr102.discCodeFrm = res.data.data[0].discCodeFrm;

          mythis.dataTr102.storeCodeTo = res.data.data[0].storeCodeTo;
          mythis.dataTr102.whsCodeTo = res.data.data[0].whsCodeTo;
          mythis.dataTr102.priceCodeTo = res.data.data[0].priceCodeTo;
          mythis.dataTr102.discCodeTo = res.data.data[0].discCodeTo;

          mythis.dataTr102.outSts = res.data.data[0].outSts;
          mythis.dataTr102.inSts = res.data.data[0].inSts;

          mythis.dataTr102.itemCount = res.data.data[0].itemCount;
          mythis.dataTr102.quantityAmont = res.data.data[0].quantityAmont;

          mythis.dataTr102.storeNameFrm = res.data.data[0].storeCodeFrm1;
          mythis.dataTr102.storeNameTo = res.data.data[0].storeCodeTo1;

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

          Object.keys(res.data.data2).forEach(function (key) {
            let myObject = {
              id: res.data.data2[key].id,
              itemcode: res.data.data2[key].itemCode,
              itemname: res.data.data2[key].itemName1,
              onhand: res.data.data2[key].onHand1,
              qty_kirim: res.data.data2[key].quantity1,
              quantityFrm1: res.data.data2[key].quantityFrm1,
              quantityTo1: res.data.data2[key].quantityTo1,
            }; // create an object

            mythis.myArrayItemBarang.push(myObject); // add the object to the array
            mythis.myArrayItemBarang_onHand[res.data.data2[key].id] =
              res.data.data2[key].onHand1;

            // $("#txt_" + res.data.data2[key].id).val(
            //   res.data.data2[key].quantity1
            // );
          });

          mythis.$root.hideLoading();
          //console.log(this.dataRincianDetailID);
        });
    },

    confirmTicket() {
      var mythis = this;
      Swal.fire({
        title: "Confirm?",
        text: "Apakah Anda ingin mengkonfirmasi Draft Ticket ini?",
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
          mythis.$root.showLoading();
          axios
            .put(
              mythis.$root.API_ERP +
                "/wms/confirmTicket/" +
                mythis.dataTr102.id,
              {
                data: mythis.dataTr102,

                dataTr102: mythis.dataTr102,
                myArrayItemBarang: mythis.myArrayItemBarang,

                userid: mythis.userid,
              }
            )
            .then((res) => {
              //console.log(res);
              //toast.success("Data telah berhasil di approve");
              Swal.fire(
                "Update Success!",
                "Draft To Tin telah dikonfirmasi sesuai. Silakan lanjutkan proses Approval",
                "success"
              );
              mythis.$root.hideLoading();
              mythis.dataTr102.docStatus = "O";
              mythis.close();
              mythis.close21();
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

    approveTicket() {
      var mythis = this;
      Swal.fire({
        title: "Confirm?",
        text: "Apakah Anda ingin mengapprove Ticket ini?",
        icon: "question",

        //showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: `Batal`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          //////////////////////////////////////////////////////
          //////////////////////////////////////////////////////
          mythis.$root.showLoading();
          axios
            .put(
              mythis.$root.API_ERP +
                "/wms/approveTicket/" +
                mythis.dataTr102.id,
              {
                data: mythis.dataTr102,
                userid: mythis.userid,
              }
            )
            .then((res) => {
              //console.log(res);
              //toast.success("Data telah berhasil di approve");
              Swal.fire(
                "Update Success!",
                "Ticket telah berhasil di approve, dan diteruskan ke Toko",
                "success"
              );
              mythis.$root.hideLoading();
              mythis.doSendNotifFirebase();
              mythis.dataTr102.approval_at = new Date()
                .toISOString()
                .slice(0, 10);
              mythis.close();
              mythis.close21();
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

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

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
