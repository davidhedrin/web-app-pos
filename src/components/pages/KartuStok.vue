<template>
  <Pages :title="title">
    <div class="container-fluid">
      <div class="mb-2">
        <div class="row">
          <div class="col-md-12">
            <!--------------------------------------------->
            <!-- <pre>{{ todo }}</pre> -->
            <div class="form-group">
              <div class="row">
                <div class="col-md-2">
                  <label for="">Store Code</label>
                </div>
                <div class="col-md-6">
                  <v-select
                    :class="errorField.storeCode ? 'input-error' : ''"
                    :options="storeCodeOptions"
                    v-model="tmp_storeCode"
                    @update:modelValue="mySelectEvent()"
                    :clearable="false"
                  ></v-select>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col-md-2">
                  <label for="">WHS Code</label>
                </div>
                <div class="col-md-6">
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
                  <label for="">Cut Off Date</label>
                </div>
                <div class="col-md-6">
                  <!-- <input class="form-control bg-transparent border-secondary-subtle" v-model="todo.tglCutOff" type="date"> -->
                  <VueDatePicker
                    v-model="todo.tglCutOff"
                    :enableTimePicker="false"
                    :format="format"
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col-md-2">
                  <label for="">Item Code</label>
                </div>
                <div class="col-md-6">
                  <v-select
                    :class="errorField.itemCode ? 'input-error' : ''"
                    :options="itemCodeOptions"
                    v-model="tmp_itemCode"
                    @update:modelValue="mySelectEvent3()"
                    :clearable="false"
                  ></v-select>
                </div>
              </div>
            </div>
            <!--------------------------------------------->

            <div class="form-group">
              <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-3">
                  <Button type="button" @click="getKartuStok"
                    >Stock Card Check</Button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <!------------------------>
      <div class="block-content">
        <div id="wrapper2"></div>
        <div id="box"></div>
      </div>

      <!------------------------>
    </div>

    <!-- modals -->
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <FormModal
        :show="showModal"
        :style="showmodal_zindex"
        @close="showModal = false"
      >
        <template #header>
          <h3>Edit Form</h3>
        </template>
        <template #body>
          <div style="width: 90vw">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-2">
                      <label for="">Discount Code</label>
                    </div>
                    <div class="col-md-6">
                      <FormInput
                        id="inputA"
                        :class="errorField.discCode ? 'input-error' : ''"
                        v-model="todo2.discCode"
                        @input="
                          (val) =>
                            (todo2.discCode = todo2.discCode
                              .toUpperCase()
                              .trim())
                        "
                        readonly
                      ></FormInput>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="row">
                    <div class="col-md-2">
                      <label for="">Discount Name</label>
                    </div>
                    <div class="col-md-6">
                      {{ storeCodeOptions }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <br />
            <br />
            <div class="text-center">
              <button class="btn btn-success btn-sm me-1" @click="editTodo()">
                Ubah Data
              </button>
            </div>
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
  data() {
    const format = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    };

    return {
      format: format,
      title: "Stock Card",
      showModal: false,
      showmodal_zindex: "z-index:1000",
      grid2: new Grid(),
      acuanEdit: null,
      startDate: "2023",

      storeCodeOptions: [],
      tmp_storeCode: [],
      yearx: "",

      whsCodeOptions: [],
      tmp_whsCode: [],

      itemCodeOptions: [],
      tmp_itemCode: [],

      todo: {
        storeCode: "",
        whsCode: "",
        tglCutOff: "",
        itemCode: "",
      },

      errorList: "",
      errorField: {
        storeCode: "",
        whsCode: "",
        tglCutOff: "",
        itemCode: "",
      },

      userid: "",
    };
  },
  mounted() {
    //this.getTable();
    this.userid = "9999";
    //this.getBulan();
    this.getCbostoreCode();
    this.getCbowhsCode();
    this.getCboitemCode();
    this.$root.hideLoading();
  },
  methods: {
    getKartuStok() {
      if (this.todo.storeCode == "" || this.todo.storeCode == undefined) {
        toast.error("Silakan pilih Store terlebih dahulu", {
          theme: "colored",
        });
        return false;
      }

      if (this.todo.whsCode == "" || this.todo.whsCode == undefined) {
        toast.error("Silakan pilih Gudang terlebih dahulu", {
          theme: "colored",
        });
        return false;
      }

      if (this.todo.tglCutOff == "" || this.todo.tglCutOff == undefined) {
        toast.error("Silakan pilih Tanggal Cut Off terlebih dahulu", {
          theme: "colored",
        });
        return false;
      }

      if (this.todo.itemCode == "" || this.todo.itemCode == undefined) {
        toast.error("Silakan pilih itemCode terlebih dahulu", {
          theme: "colored",
        });
        return false;
      }

      this.refreshTable();

      // if (
      //   this.todo.storeCode == "" ||
      //   this.todo.storeCode == undefined ||
      //   this.todo.whsCode == "" ||
      //   this.todo.whsCode == undefined ||
      //   this.todo.tglCutOff == "" ||
      //   this.todo.tglCutOff == undefined ||
      //   this.todo.itemCode == "" ||
      //   this.todo.itemCode == undefined
      // ) {
      //   toast.error("Silakan pilih store/gudang terlebih dahulu", {
      //     theme: "colored",
      //   });
      // } else {
      //   //this.refreshTable();
      // }
    },
    mySelectEvent3() {
      this.todo.itemCode = this.tmp_itemCode.code;
    },
    mySelectEvent2() {
      this.todo.whsCode = this.tmp_whsCode.code;
    },
    mySelectEvent() {
      this.todo.storeCode = this.tmp_storeCode.code;
    },
    getCbostoreCode() {
      var mythis = this;
      mythis.$root.loader = true;
      axios
        .get(this.$root.API_ERP + "/wms/getCbostoreCode")
        .then((res) => {
          mythis.storeCodeOptions = res.data.data;
          //console.log(res.data.data);
          mythis.$root.loader = false;
        });
    },
    getCbowhsCode() {
      var mythis = this;
      mythis.$root.loader = true;
      axios.get(this.$root.API_ERP + "/wms/getCbowhsCode").then((res) => {
        mythis.whsCodeOptions = res.data.data;
        //console.log(res.data.data);
        mythis.$root.loader = false;
      });
    },
    getCboitemCode() {
      var mythis = this;
      mythis.$root.loader = true;
      axios.get(this.$root.API_ERP + "/wms/getCboitemCode").then((res) => {
        mythis.itemCodeOptions = res.data.data;
        //console.log(res.data.data);
        mythis.$root.loader = false;
      });
    },
    resetForm() {
      var mythis = this;
      Object.keys(mythis.errorField).forEach(function (key) {
        mythis.errorField[key] = false;
        mythis.todo[key] = "";
        mythis.todo2[key] = "";
      });
      mythis.errorList = "";
    },
    getTable() {
      var mythis = this;

      var storeCode = mythis.todo.storeCode;
      var whsCode = mythis.todo.whsCode;
      var tglCutOff = mythis.todo.tglCutOff;
      var itemCode = mythis.todo.itemCode;

      const months = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
      };

      const d = tglCutOff;
      let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
      let month = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
      let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);

      var tanggal = `${year}` + "-" + months[month] + "-" + `${day}`;

      this.grid2.updateConfig({
        //language: idID,
        pagination: {
          limit: 50,
          server: {
            url: (prev, page, limit) =>
              `${prev}${prev.includes("?") ? "&" : "?"}limit=${limit}&offset=${
                page * limit
              }&storeCode=${storeCode}&whsCode=${whsCode}&tglCutOff=${tanggal}&itemCode=${itemCode}`,
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
            id: "docnum",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Document No</b></div>'
            ),
          },

          {
            id: "docdate",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Document Date</b></div>'
            ),
          },

          {
            id: "dscription",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Info</b></div>'
            ),
          },

          {
            id: "transdesc",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Transaction Type</b></div>'
            ),
          },

          {
            id: "whscode",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>WHS Code</b></div>'
            ),
          },

          {
            id: "itemcode",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Item Code</b></div>'
            ),
          },

          {
            id: "inqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>IN</b></div>'
            ),
          },

          {
            id: "outqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>OUT</b></div>'
            ),
          },
          {
            id: "balanceqty",
            name: html(
              '<div style="padding: 5px;border-radius: 5px;text-align: center;"><b>Balance</b></div>'
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
          url: this.$root.API_ERP + "/wms/kartuStokRincian",
          then: (data) =>
            data.results.map((card) => [
              // card.storecode,
              card.docnum,
              card.docdate,
              card.dscription,
              card.transdesc,
              card.whscode,
              card.itemcode,
              card.inqty,
              card.outqty,
              card.balanceqtyx,
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

      $(document).on("click", "#editData", function () {
        let id = $(this).data("id");
        mythis.idRincian = id;
        mythis.modal();
        mythis.$root.loader = true;
        axios
          .get(mythis.$root.API_ERP + `wms/mdiscount/` + id)
          .then((res) => {
            //console.log(res.data.data);
            mythis.acuanEdit = id;
            mythis.todo2.discCode = res.data.data.discCode;
            mythis.todo2.discName = res.data.data.discName;

            document.getElementById("inputA").focus(); // sets the focus on the input

            mythis.$root.loader = false;
          });
      });
      $(document).on("click", "#deleteData", function () {
        let id = $(this).data("id");
        mythis.deleteTodo(id);
      });
    },

    deleteTodo(todoid) {
      var mythis = this;
      Swal.fire({
        title: "Menghapus Data",
        text: "Apakah kamu yakin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          mythis.$root.loader = true;
          axios
            .delete(mythis.$root.API_ERP + `wms/mdiscount/${todoid}`, {
              data: {
                fileUpload: "form satuan",
                userid: mythis.userid,
              },
            })
            .then((res) => {
              //console.log(res.data.data);
              Swal.fire("Terhapus!", "Data telah sukses dihapus", "success");
              mythis.$root.loader = false;
              mythis.refreshTable();
              mythis.resetForm();
            });
        }
      });
    },

    saveTodo() {
      var mythis = this;
      mythis.$root.loader = true;

      axios
        .post(mythis.$root.API_ERP + "/wms/mdiscount", {
          data: mythis.todo,
          fileUpload: "form satuan",
          userid: mythis.userid,
        })
        .then((res) => {
          Swal.fire("Created!", res.data.message, "success");
          mythis.$root.loader = false;

          mythis.refreshTable();
          mythis.resetForm();
          mythis.close();
        })
        .catch(function (error) {
          if (error.response) {
            //console.log(error.response.data);
            if (error.response.status == 422) {
              mythis.errorList = error.response.data;
              mythis.$root.loader = false;
              if (Object.keys(mythis.errorList).length > 0) {
                //refresh semua menjadi false
                Object.keys(mythis.errorField).forEach(function (key) {
                  mythis.errorField[key] = false;
                });
                //membuat jika error jadi true
                Object.keys(mythis.errorList).forEach(function (key) {
                  toast.error(mythis.errorList[key], { theme: "colored" });

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

    close: function () {
      this.showModal = false;
      this.todo = {};
      this.todo2 = {};
      this.resetForm();
    },
    modal() {
      // binding data to form modal
      this.showModal = true;
      this.resetForm();
    },

    editTodo() {
      var mythis = this;
      mythis.$root.loader = true;
      axios
        .put(mythis.$root.API_ERP + "/wms/mdiscount/" + mythis.acuanEdit, {
          data: mythis.todo2,
          fileUpload: "form satuan",
          userid: mythis.userid,
        })
        .then((res) => {
          //console.log(res);
          //alert(res.data.message);
          Swal.fire("Updated!", res.data.message, "success");
          mythis.$root.loader = false;

          mythis.close();
          mythis.refreshTable();
        })
        .catch(function (error) {
          if (error.response) {
            //console.log(error.response.data);
            if (error.response.status == 422) {
              mythis.errorList = error.response.data;
              mythis.$root.loader = false;
              if (Object.keys(mythis.errorList).length > 0) {
                //refresh semua menjadi false
                Object.keys(mythis.errorField).forEach(function (key) {
                  mythis.errorField[key] = false;
                });
                //membuat jika error jadi true
                Object.keys(mythis.errorList).forEach(function (key) {
                  toast.error(mythis.errorList[key], { theme: "colored" });

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
</style>
