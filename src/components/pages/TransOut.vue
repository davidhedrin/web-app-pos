<template>
  <div class="d-flex align-items-center mb-3 mt-1">
    <span class="badge rounded me-3 ms-1 badge-subtle-primary">
      <span class="fas fa-file-upload fs-2 text-primary"></span>
    </span>
    <div class="col">
      <h5 class="mb-0 text-primary position-relative">
        <span class="bg-200 dark__bg-1100 pe-3 fs-2">Transfer Out</span>
        <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
      </h5>
      <p class="mb-0 fs--1"><a href="javascript:void(0)" class="text-dark">Martha Tilaar Shop</a> / Transfer Out</p>
    </div>
  </div>
  
  <div class="card shadow-none border mb-3">
    <div class="bg-holder bg-card d-none d-md-block" style="background-image:url('assets/img/illustration/reports-bg.png');"></div><!--/.bg-holder-->
    <div class="card-header z-1">
      <div class="row flex-between-center gx-0">
        <div class="col-lg-auto d-flex align-items-center"><img class="img-fluid" src="@/assets/img/illustration/reports-greeting.png" alt="">
          <div class="ms-x1">
            <h6 class="mb-1 text-primary">Martha Tilaar Shop</h6>
            <h4 class="mb-0 text-primary fw-bold"><span class="text-info fw-medium">Transfer Out</span></h4>
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
          <h4>Browse Data From Ticket To Tin</h4>
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

      <!-- use the modal component, pass in the prop -->

      <FormModal
        :show="showModal"
        :style="showmodal_zindex"
        @close="showModal = false"
      >
        <template #header>
          <h4>Form Transfer Out</h4>
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
                    <td class="text-left" width="10">docNum</td>
                    <td class="text-left" width="1">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{ dataTr302.docNum == "" ? "-" : dataTr302.docNum }}
                      </strong>
                    </td>
                    <td class="text-left" width="10">docStatus</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr302.docStatus == undefined
                            ? "-"
                            : dataTr302.docStatus == "O"
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
                          dataTr302.reffNo == undefined ? "-" : dataTr302.reffNo
                        }}
                      </strong>
                    </td>
                    <td class="text-left" width="10">docDate</td>
                    <td class="text-left" width="1">:</td>
                    <td class="text-success text-left">
                      <strong>
                        {{
                          dataTr302.docDate == undefined
                            ? "-"
                            : dataTr302.docDate
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
                          dataTr302.storeCode == undefined
                            ? "-"
                            : dataTr302.storeCode
                        }}
                      </strong>
                    </td>
                    <td class="text-left">storeName</td>
                    <td class="text-left">:</td>
                    <td class="text-success text-left">
                      <strong
                        >{{
                          dataTr302.storeName == undefined
                            ? "-"
                            : dataTr302.storeName
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
                          dataTr302.reference == undefined
                            ? "-"
                            : dataTr302.reference
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
                            dataTr302.docStatus == 'C' ||
                            dataTr302.docStatus == 'O'
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
                            dataTr302.docStatus == 'C' ||
                            dataTr302.docStatus == 'O'
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
                            dataTr302.docStatus == 'C' ||
                            dataTr302.docStatus == 'O'
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
                          v-model="dataTr302.comments"
                          placeholder="Kosongkan jika tidak ada selisih"
                          :disabled="dataTr302.docStatus == 'C'"
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

            <div class="card mb-4">
              <div class="card-header">
                <div class="row align-items-start">
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Doc No</u></span>
                    <h5>
                      {{ dataTr302.docNum == undefined || dataTr302.docNum == "" ? "-" : dataTr302.docNum }}
                    </h5>
                  </div>
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Doc Status</u></span>
                    <h5>
                      {{
                        dataTr302.docStatus == undefined
                          ? "-"
                          : dataTr302.docStatus == "O"
                          ? "Open"
                          : "Close"
                      }}
                    </h5>
                  </div>
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Reff No</u></span>
                    <h5>
                      {{
                        dataTr302.reffNo == undefined ? "-" : dataTr302.reffNo
                      }}
                    </h5>
                  </div>
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Doc Date</u></span>
                    <h5>
                      {{
                        dataTr302.docDate == undefined
                          ? "-"
                          : dataTr302.docDate
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
                        dataTr302.reference == undefined
                          ? "-"
                          : dataTr302.reference
                      }}
                    </h5>
                  </div>
                  <div class="col-md-9 text-center mb-2">
                    <span class="fs--1"><u>Remarks</u></span>
                    <h5>
                      <template v-if="idRincian != ''">
                        <textarea
                          class="form-control"
                          id="w3review"
                          name="w3review"
                          rows="1"
                          cols="60"
                          v-model="dataTr302.comments"
                          placeholder="Kosongkan jika tidak ada selisih"
                          :disabled="dataTr302.docStatus == 'C'"
                        ></textarea>
                      </template>
                      <h5 v-else>-</h5>
                    </h5>
                  </div>

                  <!-- <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Store Code</u></span>
                    <h5>
                      {{
                        dataTr302.storeCode == undefined
                          ? "-"
                          : dataTr302.storeCode
                      }}
                    </h5>
                  </div>
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Store Name</u></span>
                    <h5>
                      {{
                        dataTr302.storeName == undefined
                          ? "-"
                          : dataTr302.storeName
                      }}
                    </h5>
                  </div>
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Warehouse Code</u></span>
                    <template v-if="idRincian != ''">
                      <v-select
                        :options="getCboWhsCodeInventoryOptions"
                        v-model="tmp_getCboWhsCodeInventoryOptions"
                        @update:modelValue="mySelectEvent2()"
                        :clearable="false"
                        :disabled="
                          dataTr302.docStatus == 'C' ||
                          dataTr302.docStatus == 'O'
                        "
                      ></v-select>
                    </template>
                    <h5 v-else>-</h5>
                  </div>
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Price Code</u></span>
                    <template v-if="idRincian != ''">
                      <v-select
                        :options="getCboPriceCodeInventoryOptions"
                        v-model="tmp_getCboPriceCodeInventoryOptions"
                        @update:modelValue="mySelectEvent22()"
                        :clearable="false"
                        :disabled="
                          dataTr302.docStatus == 'C' ||
                          dataTr302.docStatus == 'O'
                        "
                      ></v-select>
                    </template>
                    <h5 v-else>-</h5>
                  </div>
                  <div class="col-md-3 text-center mb-2">
                    <span class="fs--1"><u>Discount Code</u></span>
                    <template v-if="idRincian != ''">
                      <v-select
                        :options="getCboDiscCodeInventoryOptions"
                        v-model="tmp_getCboDiscCodeInventoryOptions"
                        @update:modelValue="mySelectEvent222()"
                        :clearable="false"
                        :disabled="
                          dataTr302.docStatus == 'C' ||
                          dataTr302.docStatus == 'O'
                        "
                      ></v-select>
                    </template>
                    <h5 v-else>-</h5>
                  </div> -->
                </div>
              </div>
            </div>

            <div class="card mb-4">
              <div class="card-header">
                <h5 class="text-center"><strong>From Store</strong></h5>
                <div class="row align-items-start">
                  <div class="col-md-6 text-center mb-2">
                    <span class="fs--1"><u>From Store ID</u></span>
                    <h5>
                      {{
                        dataTr302.storeCode == undefined
                          ? "-"
                          : dataTr302.storeCode
                      }}
                    </h5>
                  </div>
                  <div class="col-md-6 text-center mb-2">
                    <span class="fs--1"><u>From Store Name</u></span>
                    <h5>
                      {{
                        dataTr302.storeName == undefined
                          ? "-"
                          : dataTr302.storeName
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
                        :disabled="
                          dataTr302.docStatus == 'C' ||
                          dataTr302.docStatus == 'O'
                        "
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
                        :disabled="
                          dataTr302.docStatus == 'C' ||
                          dataTr302.docStatus == 'O'
                        "
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
                        :disabled="
                          dataTr302.docStatus == 'C' ||
                          dataTr302.docStatus == 'O'
                        "
                      ></v-select>
                    </template>
                    <h5 v-else>-</h5>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h5 class="text-center"><strong>To Store</strong></h5>
                <div class="row align-items-start">
                  <div class="col-md-6 text-center mb-2">
                    <span class="fs--1"><u>To Store ID</u></span>
                    <h5>
                      {{
                        dataTr302.storeCodeTo == undefined
                          ? "-"
                          : dataTr302.storeCodeTo
                      }}
                    </h5>
                  </div>
                  <div class="col-md-6 text-center mb-2">
                    <span class="fs--1"><u>To Store Name</u></span>
                    <h5>
                      {{
                        dataTr302.storeNameTo == undefined
                          ? "-"
                          : dataTr302.storeNameTo
                      }}
                    </h5>
                  </div>
                  <div class="col-md-4 text-center mb-2">
                    <span class="fs--1"><u>WHS Code</u></span>
                    <template v-if="idRincian != ''">
                      <v-select
                        :options="getCboWhsCodeInventoryOptions"
                        v-model="tmp_getCboWhsCodeOptions_to"
                        @update:modelValue="mySelectEvent2()"
                        :clearable="false"
                        :disabled="
                          dataTr302.docStatus == 'C' ||
                          dataTr302.docStatus == 'O'
                        "
                      ></v-select>
                    </template>
                    <h5 v-else>-</h5>
                  </div>
                  <div class="col-md-4 text-center mb-2">
                    <span class="fs--1"><u>Price Code</u></span>
                    <template v-if="idRincian != ''">
                      <v-select
                        :options="getCboPriceCodeInventoryOptions"
                        v-model="tmp_getCboPriceCodeOptions_to"
                        @update:modelValue="mySelectEvent22()"
                        :clearable="false"
                        :disabled="
                          dataTr302.docStatus == 'C' ||
                          dataTr302.docStatus == 'O'
                        "
                      ></v-select>
                    </template>
                    <h5 v-else>-</h5>
                  </div>
                  <div class="col-md-4 text-center mb-2">
                    <span class="fs--1"><u>Discount Code</u></span>
                    <template v-if="idRincian != ''">
                      <v-select
                        :options="getCboDiscCodeInventoryOptions"
                        v-model="tmp_getCboDiscCodeOptions_to"
                        @update:modelValue="mySelectEvent222()"
                        :clearable="false"
                        :disabled="
                          dataTr302.docStatus == 'C' ||
                          dataTr302.docStatus == 'O'
                        "
                      ></v-select>
                    </template>
                    <h5 v-else>-</h5>
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
            <template v-if="flagDownloadPDF == 1">
              <button class="btn btn-sm btn-info" @click="exportToPDFConfirm()">
                <i class="fas fa-file-pdf"></i> Download
              </button>
              <br />
              <br />
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
                      Confirm TO
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

      <!--------------------------------------------------------------------------------------->
      <FormModal
        :show="showModal88"
        :style="showmodal88_zindex"
        @close88="showModal88 = false"
      >
        <template #header>
          <h3>TRANS OUT - Batch Number and Expired Date</h3>
        </template>
        <template #body>
          <div style="width: 90vw">
            <h3>Total Qty: {{ acuanAddBatch_value }}</h3>
            <!-- <pre>{{ acuanAddBatch }}</pre>
            <pre>{{ idRincian }}</pre>
            <pre>{{ dataTr302 }}</pre>
            <pre>{{ dataRincianHeaderIDTR }}</pre> -->

            <br />
            <template v-if="dataTr302.docStatus == 'O'">
              <button
                id="tambah_batch"
                class="btn btn-sm btn-success text-white"
                @click="tambah_batch"
              >
                <i class="fa fa-list" aria-hidden="true"></i>&nbsp;&nbsp;Add
                Batch
              </button>
            </template>
            <br />
            <br />
            <!-- <pre>{{ var_penerimaan_Actual_rev }} var_penerimaan_Actual_rev</pre>
            <pre>{{ var_penerimaan_Actual }} var_penerimaan_Actual</pre>
            <pre> {{ var_batch }}var_batch</pre>
            <pre> {{ var_to_variant_fix }}var_to_variant_fix</pre>
            <pre> {{ idRincianUpdate }}idRincianUpdate</pre> -->
            <table
              class="table table-bordered table-striped table-vcenter"
              style="padding: 0; margin: 0; font-size: 13px"
            >
              <thead>
                <tr>
                  <td class="text-center"><strong>No</strong></td>
                  <td class="text-center"><strong>Item Code</strong></td>
                  <td class="text-center"><strong>Item Name</strong></td>
                  <td class="text-center"><strong>Batch No</strong></td>
                  <td class="text-center"><strong>Expired Date</strong></td>
                  <td class="text-center"><strong>Qty Max</strong></td>
                  <td class="text-center"><strong>Qty</strong></td>
                  <td class="text-center"><strong>#</strong></td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in var_to_variant_fix" :key="key">
                  <td>{{ number_batch }}</td>
                  <td>{{ value.itemCode }}</td>
                  <td>{{ value.itemNameFull }}</td>
                  <td>{{ value.batchNo }}</td>
                  <td>{{ value.expiredDate1 }}</td>
                  <td>{{ value.onHand }}</td>

                  <td>
                    <input
                      :id="
                        'd2_toqty_' +
                        key +
                        'XXAAYYBBZZ' +
                        value.itemCode +
                        'XXAAYYBBZZ' +
                        value.batchNo
                      "
                      :name="
                        'd2_toqty_' +
                        key +
                        'XXAAYYBBZZ' +
                        value.itemCode +
                        'XXAAYYBBZZ' +
                        value.batchNo
                      "
                      :data-id="
                        'd2_toqty_' +
                        key +
                        'XXAAYYBBZZ' +
                        value.itemCode +
                        'XXAAYYBBZZ' +
                        value.batchNo
                      "
                      :value="value.inputBatch"
                      type="number"
                      pattern="[0-9]"
                      onkeydown="javascript: return
                      event.keyCode == 69 ? false : true"
                      style="width: 6em"
                      :readonly="dataTr302.docStatus == 'C'"
                      min="0"
                    />
                  </td>
                  <td class="text-center">
                    <template v-if="dataTr302.docStatus == 'O'">
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
            <br />
            <br />
            <br />
            <template v-if="dataTr302.docStatus == 'O'">
              <div class="text-center">
                <button
                  type="button"
                  class="btn btn-success"
                  @click="saveQtyBatch()"
                >
                  Save Qty Batch
                </button>
              </div>
            </template>
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
      <!--------------------------------------------------------------------------------------->
      <!--------------------------------------------------------------------------------------->
      <FormModal
        :show="showModal99"
        :style="showmodal99_zindex"
        @close88="showModal99 = false"
      >
        <template #header>
          <h3>TRANS OUT - Batch Number and Expired Date</h3>
          <!-- {{ var_batch }} -->
        </template>
        <template #body>
          <div style="width: 90vw">
            <div class="row">
              <template v-for="(value, key) in var_batch" :key="key">
                <div class="col-md-3">
                  <div
                    class="card border-success mb-3"
                    style="max-width: 18rem"
                  >
                    <div class="card-header bg-transparent border-success">
                      <h5 class="card-title">Qty: {{ value.onHand }}</h5>
                    </div>
                    <div class="card-body text-success">
                      <h5 class="card-title">{{ value.itemCode }}</h5>
                      <p class="card-text">
                        {{ value.itemNameFull }}<br />
                        Batch : <h5 class="card-title">{{ value.batchNo }}</h5>
                        Exp Date : <h5 class="card-title">{{ value.expiredDate1 }}</h5>
                      </p>
                    </div>
                    <div class="card-footer bg-transparent border-success">
                      <button
                        type="button"
                        class="btn btn-info text-white"
                        @click="getBatchToArray(key)"
                      >
                        Pilih Batch
                      </button>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
        <template #footer>
          <button
            class="modal-default-button btn btn-secondary btn-sm me-1"
            @click="close99"
          >
            Close
          </button>
        </template>
      </FormModal>
      <!--------------------------------------------------------------------------------------->
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
    return {
      master_code: this.$root.master_code,
      master_coll: this.$root.master_coll,
      local_storage: this.$root.local_storage,
      
      title: "Transfer Out",
      showModal: false,
      showmodal_zindex: "z-index:1030",
      grid2: new Grid(),
      dataTr302: {},

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
      var_penerimaan_Actual_rev: {},
      var_penerimaan_Actual_rev_updated_at: {},
      status_save_PenerimaanBarang: 0,
      data_CboWhs: "",
      flagSave: 0,
      txtareaBA: "",
      userid: "",

      dataRincianHeaderIDTR: {},
      flagUpdate: false,
      dataTr302_comments: "",

      x_nomor_baris: 0,
      x_count: 0,

      limit_x: 100,
      nomor_x: 1,
      html_pdf: "",
      flagDownloadPDF: 0,

      uObject: "",

      var_to_variant: {},
      var_to_variant_fix: {},

      showModal88: false,
      showmodal88_zindex: "z-index:1002",

      showModal99: false,
      showmodal99_zindex: "z-index:1003",

      acuanAddBatch: "",
      acuanAddBatch_value: "",

      var_batch: {},
      number_batch: 1,

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
    ///////////////////////////////////////////////////
    saveQtyBatch() {
      //save qty
      var mythis = this;

      var n = 0;
      var double_batch = 0;

      var doublex = {}; //kz

      Object.keys(mythis.var_to_variant_fix).forEach(async function (key) {
        n += parseInt(mythis.var_to_variant_fix[key].inputBatch);

        var cc =
          mythis.var_to_variant_fix[key].batchNo +
          "_" +
          mythis.var_to_variant_fix[key].expiredDate1;
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

      var totalx = mythis.acuanAddBatch_value;
      console.log(n);
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
          //////////////////////////////////////////////////////
          mythis.$root.showLoading();
          axios
            .put(
              mythis.$root.API_ERP +
                "/wms/saveBatchQty_TO/" +
                mythis.idRincianUpdate,
              {
                userid: mythis.userid,
                var_to_variant_fix: mythis.var_to_variant_fix,
                acuanAddBatch: mythis.acuanAddBatch,
                acuanAddBatch_value: mythis.acuanAddBatch_value,
              }
            )
            .then((res) => {
              //console.log(res);
              //toast.success("Data telah berhasil di approve");
              Swal.fire(
                "Update Success!",
                "Data Batch telah disimpan",
                "success"
              );
              mythis.$root.hideLoading();
              //kasinokz
              mythis.var_penerimaan_DN = {};
              mythis.var_penerimaan_Actual = {};

              mythis.getTableRincianUpdate();

              mythis.getTableRincianDataUpdate();
              mythis.getTableRincianDataUpdate_rev();


      
              mythis.close88();
            })
            .catch(function (error) {
              mythis.$root.hideLoading();
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
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

    getBatchFromTO() {
      var mythis = this;

      mythis.$root.showLoading();
      axios
        .put(
          mythis.$root.API_ERP +
            "/wms/getBatchFromTO/" +
            mythis.acuanAddBatch,
          {
            docEntry: mythis.idRincian,
            userid: mythis.userid,
            dataHeaderSave: mythis.dataRincianHeaderIDTR,
          }
        )
        .then((res) => {
          mythis.$root.hideLoading();
          console.log(res);

          var xxxx = res.data.data;
          var n = 0;
          xxxx.forEach((val) => {
            //mythis.var_batch[n] = val;
            mythis.var_to_variant_fix[n] = val;
            //mythis.var_batch[n].inputBatch = 0;

            n++;
          });

          /*
          var flag_ada_double = false;
          var a = 0;
          var n = 0;
          Object.keys(mythis.var_to_variant_fix).forEach(function (key) {
            if (
              mythis.var_batch[key_array].batchNo ==
                mythis.var_to_variant_fix[key_array].batchNo &&
              mythis.var_batch[key_array].expiredDate1 ==
                mythis.var_to_variant_fix[key_array].expiredDate1
            ) {
              flag_ada_double = true;
            }

            if (flag_ada_double == false) {
              mythis.var_batch[n].inputBatch = 0;
              mythis.var_to_variant_fix[n] = mythis.var_batch[key_array];
            } else {
              Swal.fire("Failed!", "batch telah dipilih sebelumnya!", "error");
            }

            n++;
          });
          */

          //mythis.close();
          // mythis.close2();
        })
        .catch(function (error) {
          mythis.$root.hideLoading();
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
    },
    ///////////////////////////////////////////////////
    deleteItemTmp(key) {
      //alert(key);

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
          // this.var_to_variant_fix.splice(key, 1);
          //this.var_SO_awal_batch.splice(key, 1);

          delete this.var_to_variant_fix[key];

          Swal.fire("Batch Terhapus!", "", "success");
        }
      });
    },
    ///////////////////////////////////////////////////
    getBatchToArray(key_array) {
      var mythis = this;
      //alert(key_array);
      var flag_ada_double = false;
      var a = 0;
      var n = 0;
      Object.keys(mythis.var_to_variant_fix).forEach(function (key) {
        if (
          mythis.var_batch[key_array].batchNo ==
            mythis.var_to_variant_fix[n].batchNo &&
          mythis.var_batch[key_array].expiredDate1 ==
            mythis.var_to_variant_fix[n].expiredDate1
        ) {
          flag_ada_double = true;
        }

        n++;
      });
      mythis.close99();
      if (flag_ada_double == false) {
        mythis.var_batch[key_array].inputBatch = 0;
        mythis.var_to_variant_fix[n] = mythis.var_batch[key_array];
      } else {
        Swal.fire("Failed!", "batch telah dipilih sebelumnya!", "error");
      }
    },
    tambah_batch() {
      var mythis = this;
      mythis.$root.showLoading();
      axios
        .get(
          this.$root.API_ERP +
            "/wms/getBatchData?itemCode=" +
            mythis.acuanAddBatch +
            "&whsCode=" +
            mythis.dataTr302.whsCode +
            "&storeCode=" +
            mythis.dataTr302.storeCode
        )
        .then((res) => {
          console.log(res);
          //mythis.var_batch = res.data.data;

          var xxxx = res.data.data;
          var n = 0;
          xxxx.forEach((val) => {
            mythis.var_batch[n] = val;

            n++;
          });

          mythis.$root.hideLoading();

          mythis.modal99();
        });
    },
    ///////////////////////////////////////////////////
    modal99() {
      this.showModal99 = true;
    },
    close99: function () {
      this.showModal99 = false;
    },
    modal88() {
      this.showModal88 = true;
    },
    close88: function () {
      this.var_to_variant_fix = {};
      this.number_batch = 1;
      this.showModal88 = false;
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
    async getDataTO_pdf() {
      var mythis = this;

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

        const reqData = await axios({
          method: "get",
          url:
            this.$root.API_ERP +
            "/wms/pagingRincianTOUpdate/" +
            this.idRincianUpdate +
            "?limit=" +
            limitx +
            "&offset=" +
            offsetx +
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
                '><td colspan="8">&nbsp;</td></tr><tr> <th class="borderx">No.</th> <th class="borderx">Item Code</th> <th class="borderx">Item Name</th> <th class="borderx" style="text-align:right" >Batch</th> <th class="borderx" style="text-align:right" >Expired Date</th> <th class="borderx" style="text-align:right" >Ticket TO Qty</th> <th style="text-align:right" class="borderx">Actual Qty</th> <th style="text-align:right" class="borderx">Variant</th></tr>';
            }
            ///////////////////////////////////////////////////////////
            html +=
              "<tr " +
              "" +
              'style="font-size: 9px"><th>' +
              mythis.nomor_x +
              "</th><th>" +
              resData.results[key].itemCode1 +
              "</th><th>" +
              resData.results[key].itemName +
              '</th><th style="text-align:right">' +
              resData.results[key].batchNo +
              '</th><th style="text-align:right">' +
              resData.results[key].expiredDate1 +
              '</th><th style="text-align:right">' +
              resData.results[key].baseQty1 +
              '</th><th style="text-align:right">' +
              resData.results[key].openQty1 +
              '</th><th style="text-align:right">' +
              (resData.results[key].baseQty1 - resData.results[key].openQty1) +
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
    async exportToPDFConfirm() {
      //alert("AAAA");
      this.$root.showLoading();

      //var tanggal = `${year}` + "-" + months[month] + "-" + `${day}`;
      var data_x = "";
      var data_x = await this.getDataTO_pdf();

      var xxx =
        '<style> p, span, table { font-size: 10px } table { width: 100%; } .borderx { border-bottom: 1px solid black; border-top: 1px solid black; } .bordery { border-top: 1px solid black; } </style> <h4>TRANS OUT</h4><table cellpadding="0"> <tr> <th width="10%">Doc Num</th> <th width="25%">: ' +
        this.dataTr302.docNum +
        '</th> <th width="10%">Doc Status</th> <th width="20%">: ' +
        (this.dataTr302.docStatus == "O" ? "Open" : "Close") +
        '</th> <th width="12%">Reff No</th> <th width="30%">: ' +
        this.dataTr302.reffNo +
        "</th> </tr> <tr> <th>Remarks</th> <th>: " +
        this.dataTr302.comments +
        "</th> <th>Reference</th> <th>: " +
        this.dataTr302.reference +
        "</th> <th>Doc Date</th> <th>: " +
        this.dataTr302.docDate +
        '</th> </tr> <tr> <th colspan="7" class="bordery"><br/></th></tr><tr> <th>From Store</th> <th> ' +
        "&nbsp;" +
        "</th> <th>From Store ID</th> <th>: " +
        this.dataTr302.storeCode +
        "</th> <th>From Store Name</th> <th>: " +
        this.dataTr302.storeName +
        "</th> </tr> <tr> <th>WHS Code</th> <th>: " +
        this.tmp_getCboWhsCodeInventoryOptions +
        "</th> <th>Price Code</th> <th>: " +
        this.tmp_getCboPriceCodeInventoryOptions +
        "</th> <th>Discount Code</th> <th>: " +
        this.tmp_getCboDiscCodeInventoryOptions +
        '</th> </tr> <tr> <th colspan="7" class="bordery"><br/></th></tr><tr> <th>To Store</th> <th> ' +
        "&nbsp;" +
        "</th> <th>To Store ID</th> <th>: " +
        this.dataTr302.storeCodeTo +
        "</th> <th>To Store Name</th> <th>: " +
        this.dataTr302.storeNameTo +
        "</th> </tr> <tr> <th>WHS Code</th> <th>: " +
        this.tmp_getCboWhsCodeOptions_to +
        "</th> <th>Price Code</th> <th>: " +
        this.tmp_getCboPriceCodeOptions_to +
        "</th> <th>Discount Code</th> <th>: " +
        this.tmp_getCboDiscCodeOptions_to +
        '</th> </tr> <tr> <th colspan="7" class="bordery"><br/></th></tr><tr> <th>Print Date</th> <th>: ' +
        this.formatDate(new Date()) +
        ' </tr> </table> <br> <table id="tb-item" cellpadding="4" border="0"> <tr> <th class="borderx">No.</th> <th class="borderx">Item Code</th> <th class="borderx">Item Name</th> <th class="borderx" style="text-align:right" >Batch</th> <th class="borderx" style="text-align:right" >Expired Date</th> <th class="borderx" style="text-align:right" >Ticket TO Qty</th> <th style="text-align:right" class="borderx">Actual Qty</th> <th style="text-align:right" class="borderx">Variant</th></tr>' +
        data_x +
        '<tr> <th colspan="8" class="bordery"></th></tr> <tr> <th colspan="2" class="">Mengetahui,</th> <th style="text-align:right" colspan="2" class="">Menyetujui,</th> <th style="text-align:right" colspan="2" class="">&nbsp</th> </tr></table>';

      //'<tr> <th colspan="2" class="bordery">Mengetahui,</th> <th style="text-align:right" colspan="2" class="">Menyetujui,</th> <th style="text-align:right" colspan="2" class="">&nbsp</th> </tr>

      this.$root.hideLoading();

      var element = xxx;
      var opt = {
        //margin: 10,
        margin: [10, 10, 0, 10], //top, left, buttom, right,
        //margin: [0, -0.1, 0, 0],
        filename:
          "TRANS_OUT_" +
          this.dataTr302.docNum +
          "_" +
          this.dataTr302.docStatus +
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
        mythis.dataTr302.docNum +
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
    getTableRincianDataUpdate_rev(id) {
      var mythis = this;
      axios
        .get(
          this.$root.API_ERP +
            "/wms/pagingRincianTOUpdate_rev/" +
            this.idRincianUpdate +
            "?limit=1000&offset=0"
        )
        .then((res) => {
          console.log(res);

          //console.log(res.data.results);
          Object.keys(res.data.results).forEach(function (key) {
            mythis.var_penerimaan_Actual_rev[
              res.data.results[key].id +
                "XXYYZZ" +
                res.data.results[key].itemCode
            ] =
              res.data.results[key].openQty_save == null
                ? res.data.results[key].openQty1
                : res.data.results[key].openQty_save;



                 mythis.var_penerimaan_Actual_rev_updated_at[
              res.data.results[key].id +
                "XXYYZZ" +
                res.data.results[key].itemCode
            ] =
              res.data.results[key].updated_at;


          });
        });
    },
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
          // console.log(res);
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
          // {
          //   id: "docEntry",
          //   name: html(
          //     '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Doc Entry</b></div>'
          //   ),
          // },

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
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Ticket TO Qty a</b></div>'
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
            id: "batch",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Input Batch</b></div>'
            ),
            formatter: (_, row) =>
              row.cells[3].data == "Jumlah Item"
                ? ""
                : row.cells[10].data != null
                ? html(
                    `
                    <div ` +
                         'style="background-color:#c2ffcb"'
                         +
                      ` id="input_batch_` +
                      row.cells[0].data +
                      "XXYYZZ" +
                      row.cells[1].data +
                      `" >
                    <button
                      id="input_batch"
                  data-id="${row.cells[0].data}XXYYZZ${row.cells[1].data}" class="btn btn-sm btn-warning text-white" data-toggle="tooltip" title="View" > <i  class="fa fa-list" aria-hidden="true"></i></button>` +
                      `</div>`
                  )
                : html(
                    `
                    <div id="input_batch_` +
                      row.cells[0].data +
                      "XXYYZZ" +
                      row.cells[1].data +
                      `" >
                    <button
                      id="input_batch"
                  data-id="${row.cells[0].data}XXYYZZ${row.cells[1].data}" class="btn btn-sm btn-warning text-white" data-toggle="tooltip" title="View" > <i  class="fa fa-list" aria-hidden="true"></i></button>` +
                      `</div>`
                  ),
          },

          { name: "updated", hidden: true },
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
            "/wms/pagingRincianTOUpdate/" +
            this.idRincianUpdate,
          then: (data) =>
            data.results.map((card) => [
              card.id,
              card.itemCode1,
              (data.nomorBaris += 1),
              // card.docEntry,

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
              card.updated_at,
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


      $(document).off("change", "input");
      $(document).off("click", "#input_batch");
      $(document).off("click", "#viewTicketTOUpdate");
      $(document).off("click", "#updateDeliveryNoteD1");
      $(document).off("click", "#changeLock");
      this.jqueryDelEdit();

    },
    getTableRincianUpdate_OLD() {
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
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Ticket TO Qty a</b></div>'
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
            id: "batch",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Input Batch</b></div>'
            ),
            formatter: (_, row) =>
              row.cells[3].data == "Jumlah Item"
                ? ""
                : this.var_to_variant[
                    row.cells[0].data + "XXYYZZ" + row.cells[1].data
                  ] == 0
                ? html(
                    `
                    <div ` +
                      (row.cells[9].data == true
                        ? 'style="background-color:#c2ffcb"'
                        : "") +
                      ` id="input_batch_` +
                      row.cells[0].data +
                      "XXYYZZ" +
                      row.cells[1].data +
                      `" >
                    <button
                      id="input_batch"
                  data-id="${row.cells[0].data}XXYYZZ${row.cells[1].data}" class="btn btn-sm btn-warning text-white" data-toggle="tooltip" title="View" > <i  class="fa fa-list" aria-hidden="true"></i></button>` +
                      `</div>`
                  )
                : html(
                    `
                    <div id="input_batch_` +
                      row.cells[0].data +
                      "XXYYZZ" +
                      row.cells[1].data +
                      `" >
                    <button
                      id="input_batch"
                  data-id="${row.cells[0].data}XXYYZZ${row.cells[1].data}" class="btn btn-sm btn-warning text-white" data-toggle="tooltip" title="View" > <i  class="fa fa-list" aria-hidden="true"></i></button>` +
                      `</div>`
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
    getRincianHeaderTR_Update(id) {
      var mythis = this;
      mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getRincianheaderIDUpdate_TO/" + id)
        .then((res) => {
          mythis.dataRincianHeaderID = res.data.data[0];
          mythis.dataRincianHeaderIDTR = res.data.data[0];
          mythis.dataTr302.docNum = res.data.data[0].docNum;

          mythis.dataTr302.storeCode = res.data.data[0].storeCode;
          mythis.dataTr302.storeName = res.data.data[0].storeName;
          mythis.dataTr302.docStatus = res.data.data[0].docStatus;
          mythis.dataTr302.reffNo = res.data.data[0].reffNo;
          mythis.dataTr302.reference = res.data.data[0].reference;
          mythis.dataTr302.comments = res.data.data[0].comments;
          mythis.dataTr302_comments = mythis.dataTr302.comments;
          mythis.dataTr302.docDate = res.data.data[0].docDate1;
          mythis.dataTr302.whsCode = res.data.data[0].whsCode;
          mythis.tmp_getCboWhsCodeInventoryOptions =
            res.data.data[0].whsCode + " - " + res.data.data[0].whsName;
          mythis.dataTr302.whsName = "";
          mythis.dataTr302.priceCode = res.data.data[0].priceCode;
          mythis.tmp_getCboPriceCodeInventoryOptions =
            res.data.data[0].priceName;
          mythis.dataTr302.priceName = "";
          mythis.dataTr302.discCode = res.data.data[0].discCode;
          mythis.tmp_getCboDiscCodeInventoryOptions = res.data.data[0].discName;
          mythis.dataTr302.discName = "";

          mythis.idRincian = res.data.data[0].baseEntry;

          mythis.dataTr302.storeCodeTo = res.data.data[0].storeCodeTo;
          mythis.dataTr302.storeNameTo = res.data.data[0].storeName2;
          mythis.dataTr302.priceCodeTo = res.data.data[0].priceCodeTo;
          mythis.dataTr302.discCodeTo = res.data.data[0].discCodeTo;
          mythis.dataTr302.whsCodeTo = res.data.data[0].whsCodeTo;

          mythis.tmp_getCboWhsCodeOptions_to =
            res.data.data[0].whsCodeTo + " - " + res.data.data[0].whsName2;
          mythis.tmp_getCboDiscCodeOptions_to = res.data.data[0].discName2;
          mythis.tmp_getCboPriceCodeOptions_to = res.data.data[0].priceName2;

          mythis.$root.hideLoading();
          mythis.flagDownloadPDF = 0;

          //console.log(this.dataRincianDetailID);
        });
    },
    ///////////////////////////////////////////////////
    getFlagUpdate() {
      this.getTableRincianUpdate();

      this.getTableRincianDataUpdate();
      this.getTableRincianDataUpdate_rev();
      this.flagGetData = false;
      this.flagUpdate = false;
      this.flagSave = 0;
      this.flagSdataTr302_commentsave = "";
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
      this.dataTr302 = {};
      this.var_penerimaan_DN = {};
      this.var_penerimaan_DN_Qty = {};
      this.var_penerimaan_Actual = {};
      this.data_CboWhs = "";
      this.dataRincianHeaderIDTR = {};
      this.total_bpitem_null = null;


      this.var_penerimaan_Actual_rev = {};
      this.var_penerimaan_Actual_rev_updated_at = {};


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

      $(document).on("click", "#input_batch", function () {
        let id = $(this).data("id");

        //alert(id);
        //alert(mythis.var_penerimaan_Actual[id]);

        mythis.acuanAddBatch = id;
        //mythis.acuanAddBatch_value = mythis.var_penerimaan_Actual[id];
        mythis.acuanAddBatch_value = mythis.var_penerimaan_Actual_rev[id];
        mythis.getBatchFromTO();
        mythis.modal88();
      });

      $(document).on("change", "input", function () {
        let id = $(this).data("id");

        let result2 = id.includes("XXAAYYBBZZ");
        if (result2 == true) {
          //alert("input batch " + id);

          let x_value = $("#" + id).val();
          //alert(x_value);
          if (id.includes("d2_toqty_")) {
            let idx = id.replace("d2_toqty_", "");
            const myArray = idx.split("XXAAYYBBZZ");
            const keynya = myArray[0];

            if (
              parseInt(x_value) >
              parseInt(mythis.var_to_variant_fix[keynya].onHand)
            ) {
              Swal.fire(
                "Failed!",
                "Inputan Batch melebihi Max Qty Batch",
                "error"
              );

              x_value = mythis.var_to_variant_fix[keynya].inputBatch;
              $("#" + id).val(x_value);
              return false;
            }
            mythis.var_to_variant_fix[keynya].inputBatch = x_value;
          }
        } else {
          /////////////////////////////////////////

          let x_value = $("#txt_" + id).val();
          let x_value2 = $("#txt_" + id).val();
          //console.log(mythis.var_penerimaan_DN);
          //alert(mythis.var_penerimaan_DN[id]);
          //alert(id +'---'+ x_value);
          //alert(mythis.var_penerimaan_DN[id]);
          //alert(mythis.var_penerimaan_Actual[id]);
          // var_penerimaan_DN: {},
          // var_penerimaan_Actual: {},

          if (parseInt(x_value) > parseInt(mythis.var_penerimaan_DN_Qty[id])) {
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

          if (parseInt(x_value) > parseInt(mythis.var_penerimaan_DN[id])) {
            Swal.fire(
              "Ubah Qty gagal!",
              "Actual Qty (" +
                x_value2 +
                ") melebihi Ticket TO Qty (" +
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
            mythis.var_penerimaan_Actual_rev[id] = x_value;
          }
          /////////////////////////////////////////
        }
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
        //mythis.$root.showLoading();
      });

      $(document).on("click", "#viewTicketTO", function () {
        let id = $(this).data("id");
        //alert("ABCD");
        mythis.idRincian = id;
        mythis.close11();
        //mythis.$root.showLoading();
        mythis.getTableRincian();
        mythis.getRincianHeaderID(id);

        mythis.getTableRincianData();
        mythis.getRincianHeaderIDTR_TO();
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

        if (mythis.dataTr302.docStatus == "C") return false;

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
        // language: idID,
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
            //   <button data-id="${row.cells[0].data}" class="btn btn-sm btn-info text-white" id="viewTicketTOUpdate" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> Update</button>
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
          url: this.$root.API_ERP + "/wms/pagingTransOut",
          then: (data) =>
            data.results.map((card) => [
              card.id,
              //"",

              card.docStatus == "O"
                ? html(
                    `
              <button data-id="${card.id}" class="btn btn-sm btn-info text-white" id="viewTicketTOUpdate" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> Update</button>
              `
                  )
                : html(
                    `
              <button data-id="${card.id}" class="btn btn-sm btn-success text-white" id="viewTicketTOUpdate" data-toggle="tooltip" title="View" ><i class="fa-solid fa-pen-to-square"></i> View</button>
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
      $(document).off("click", "#viewTicketTOUpdate");
      $(document).off("click", "#viewTicketTO");
      $(document).off("click", "#updateDeliveryNoteD1");
      $(document).off("click", "#changeLock");
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
        // language: idID,
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
          url: this.$root.API_ERP + "/wms/pagingTransOutfromTicket",
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
      //////////////////////////////
      $("#wrapper3").remove();
      var e = $('<div id="wrapper3"></div>');
      $("#box3").append(e);
      this.grid3 = new Grid();
      //////////////////////////////

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
          // {
          //   id: "docEntry",
          //   name: html(
          //     '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Doc Entry</b></div>'
          //   ),
          // },

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
              '<div style="border: 1px solid #ccc;padding: 5px;border-radius: 5px;text-align: center;"><b>Ticket TO Qty b</b></div>'
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
            this.$root.API_ERP + "/wms/pagingRincianTO/" + this.idRincian,
          then: (data) =>
            data.results.map((card) => [
              card.id,
              card.itemCode1,
              (data.nomorBaris += 1),
              // card.docEntry,

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
      mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getRincianheaderIDNew_TO/" + id)
        .then((res) => {
          mythis.dataRincianHeaderID = res.data.data[0];
          mythis.dataTr302.storeCode = res.data.data[0].storeCode;
          mythis.dataTr302.storeName = res.data.data[0].storeName;
          mythis.dataTr302.docStatus = "O";
          mythis.dataTr302.reference = res.data.data[0].docNum;
          mythis.dataTr302.comments = res.data.data[0].comments;
          mythis.dataTr302.docDate = new Date().toISOString().slice(0, 10);
          //mythis.dataTr302.reference = res.data.data[0].poNo;
          mythis.dataTr302.whsCode = res.data.data[0].whsCode;
          mythis.tmp_getCboWhsCodeInventoryOptions =
            res.data.data[0].whsCode + " - " + res.data.data[0].whsName;
          mythis.dataTr302.comments = "";
          mythis.dataTr302.whsName = "";
          mythis.dataTr302.priceCode = res.data.data[0].priceCode;
          mythis.tmp_getCboPriceCodeInventoryOptions =
            res.data.data[0].priceName;
          mythis.dataTr302.priceName = "";
          mythis.dataTr302.discCode = res.data.data[0].discCode;
          mythis.tmp_getCboDiscCodeInventoryOptions = res.data.data[0].discName;
          mythis.dataTr302.discName = "";
          mythis.$root.hideLoading();

          mythis.dataTr302.storeCodeTo = res.data.data[0].storeCodeTo;
          mythis.dataTr302.storeNameTo = res.data.data[0].storeName2;
          mythis.dataTr302.priceCodeTo = res.data.data[0].priceCodeTo;
          mythis.dataTr302.discCodeTo = res.data.data[0].discCodeTo;
          mythis.dataTr302.whsCodeTo = res.data.data[0].whsCodeTo;

          mythis.tmp_getCboWhsCodeOptions_to =
            res.data.data[0].whsCodeTo + " - " + res.data.data[0].whsName2;
          mythis.tmp_getCboDiscCodeOptions_to = res.data.data[0].discName2;
          mythis.tmp_getCboPriceCodeOptions_to = res.data.data[0].priceName2;

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
      this.dataTr302.whsCode = this.tmp_getCboWhsCodeInventoryOptions.code;
    },

    mySelectEvent22() {
      this.dataTr302.priceCode = this.tmp_getCboPriceCodeInventoryOptions.code;
    },

    mySelectEvent222() {
      this.dataTr302.discCode = this.tmp_getCboDiscCodeInventoryOptions.code;
    },
    savePenerimaanBarang() {
      var mythis = this;

      if (
        mythis.dataTr302.discCode == null ||
        mythis.dataTr302.discCode == "" ||
        mythis.dataTr302.discCode == undefined
      ) {
        // toast.error("Silakan pilih kode diskon terlebih dahulu");
        mythis.$root.showAlertFunction('warning', 'Gagal Melanjutkan!', 'Silakan pilih kode diskon terlebih dahulu.');
        return false;
      }

      if (
        mythis.dataTr302.whsCode == null ||
        mythis.dataTr302.whsCode == "" ||
        mythis.dataTr302.whsCode == undefined
      ) {
        // toast.error("Silakan pilih warehouse terlebih dahulu");
        mythis.$root.showAlertFunction('warning', 'Gagal Melanjutkan!', 'Silakan pilih warehouse terlebih dahulu.');
        return false;
      }

      if (
        mythis.dataTr302.priceCode == null ||
        mythis.dataTr302.priceCode == "" ||
        mythis.dataTr302.priceCode == undefined
      ) {
        // toast.error("Silakan pilih kode harga terlebih dahulu");
        mythis.$root.showAlertFunction('warning', 'Gagal Melanjutkan!', 'Silakan pilih kode harga terlebih dahulu.');
        return false;
      }

      //alert(mythis.idRincianUpdate);
      var n_updated_at = 0;
      if (
                mythis.idRincianUpdate == null ||
                mythis.idRincianUpdate == undefined ||
                mythis.idRincianUpdate == ""
              ) {
                ////
              }else{
                
                ////////////////////////////////////////////////
                Object.keys(mythis.var_penerimaan_Actual_rev_updated_at).forEach(function (key) {

                  if ( mythis.var_penerimaan_Actual_rev_updated_at[key] == null)
                  {
                    n_updated_at++;
                  }
                });
                ////////////////////////////////////////////////
              }

    
              if (n_updated_at!=0) {
        Swal.fire("Failed!", 'Data batch belum diupdate', "error");
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
                "/wms/savePenerimaanBarang_TO/" +
                mythis.idRincian,
              {
                var_penerimaan_DN: mythis.var_penerimaan_DN,
                var_penerimaan_Actual: mythis.var_penerimaan_Actual,
                docEntry: mythis.idRincian,
                userid: mythis.userid,
                dataHeader: mythis.dataTr302,
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
              mythis.$root.hideLoading();
              mythis.flagSave = 1;
              mythis.status_save_PenerimaanBarang = 1;
              mythis.getRincianHeaderIDTR_TO();
              //alert(mythis.idRincianUpdate);

              if (
                mythis.idRincianUpdate == null ||
                mythis.idRincianUpdate == undefined ||
                mythis.idRincianUpdate == ""
              ) {
                mythis.close();
                // mythis.close2();
              }
            })
            .catch(function (error) {
              mythis.$root.hideLoading();
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
          mythis.$root.showLoading();
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
              mythis.$root.hideLoading();
              mythis.doSendNotifFirebase();
              mythis.close();
              mythis.close2();
              mythis.refreshTable();
            })
            .catch(function (error) {
              mythis.$root.hideLoading();
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
          mythis.$root.showAlertFunction('success', 'Berhasil Mengubah!', 'Data Qty berhasil diubah');
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
      mythis.$root.showLoading();
      axios
        .get(this.$root.API_ERP + "/wms/getRincianDetailID/" + id)
        .then((res) => {
          mythis.dataRincianDetailID = res.data.data[0];
          mythis.$root.hideLoading();
          //console.log(this.dataRincianDetailID);
        });
    },

    getRincianHeaderIDTR_TO() {
      var mythis = this;
      mythis.$root.showLoading();
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
            mythis.dataTr302.docNum = res.data.data[0].docNum;
            //mythis.txtareaBA = res.data.data[0].comments;
            //mythis.tmp_getCboWhsCodeInventoryOptions = res.data.data[0].whsCode;
            //mythis.data_CboWhs = res.data.data[0].whsCode;
          }

          mythis.$root.hideLoading();
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
</style>
