<template>
<!-- Card Input -->
  <div class="card" style="background-color:transparent">
    <div class="card-body">
      <a
        href="javascript:void(0)"
        class="btn btn-dark"
        v-on:click="showFormPeriode(true)"
        >Tambah Periode</a
      >
    </div>
  </div>

<!-- Add Periode v-show -->
  
  <div class="card mb-4" v-show="formAvailable" style="margin-top: 20px">
    <div class="card-body">
      <div class="card-title">
        <h3><span v-text="modeForm"></span> Periode</h3>
      </div>
      <div class="mb-3">
        <label class="form-label">Nama Periode</label>
        <input
          type="text"
          class="form-control"
          placeholder="Nama Periode"
          v-model="form.nama_periode"
        />
      </div>
        <div class="mb-3">
        <label class="form-label">Tanggal Mulai</label>
        <input
          type="text"
          class="form-control"
          placeholder="Tangal Mulai"
          v-model="form.tanggal_mulai"
        />
      </div>
         <div class="mb-3">
        <label class="form-label">Tanggal Berakhir</label>
        <input
          type="text"
          class="form-control"
          placeholder="Tanggal Berakhir"
          v-model="form.tanggal_berakhir"
        />
      </div>
         <div class="mb-3">
        <label class="form-label">Status</label>
        <input
          type="text"
          class="form-control"
          placeholder="Status"
          v-model="form.status"
        />
      </div>
      <button type="button" class="btn btn-dark" @click="savePeriode">
        Simpan
      </button>
      <button
        type="button"
        class="btn btn-light"
        @click="showFormPeriode(false)"
      >
        Batal
      </button>
    </div>
  </div>


  
  <!-- Table -->
<div class="card mb-4">
  <div class="card-header pb-0">
    <h6>Data Periode</h6>
  </div>
  <div class="card-body px-0 pt-0 pb-2">
    <div class="table-responsive p-0">
      <table class="table align-items-center mb-0 text-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nama Periode</th>
            <th scope="col">Tanggal Mulai</th>
            <th scope="col">Tanggal Berakhir</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
           
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ju, index) in periode" :key="index">
            <DataperiodeTable
              :periode="ju"
              @edit-periode="editPeriode"
              @delete-periode="deletePeriode"
            />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";

import DataperiodeTable from "./components/DataperiodeTable.vue";

export default {
  components: {
    DataperiodeTable,
  },
  setup() {
    const periode = ref([]);
    const formAvailable = ref(false);
    const modeForm = ref("Add");
    const formState = reactive({
      form: {
        nama_periode: "",
        tanggal_mulai: "",
        tanggal_berakhir: "",
        status: "",
      },
    });

    const getPeriode = async () => {
      const dataPeriode = await axios.get("http://localhost:3331/periode");
      periode.value = dataPeriode.data;
    };

    const showFormPeriode = (state) => {
      modeForm.value = "Add";
      formAvailable.value = state;
    };

    const savePeriode = () => {
      if (modeForm.value == "Add") {
        axios
          .post("http://localhost:3331/periode", {
            ...formState.form,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          })
          .catch((error) => console.log("error", error));
      } else if (modeForm.value == "Edit") {
        axios
          .put("http://localhost:3331/periode", {
            ...formState.form,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          });
      }
    };

    const deletePeriode = (ju) => {
      axios
        .delete("http://localhost:3331/periode/" + ju.id)
        .then((response) => {
          alert(response.data.message);
          getPeriode();
        })
        .catch((error) => console.log("error", error));
    };

    const editPeriode = (ju) => {
      modeForm.value = "Edit";
      formAvailable.value = true;
      formState.form.nama_periode = ju.nama_periode;
      formState.form.tanggal_mulai = ju.tanggal_mulai;
      formState.form.tanggal_berakhir = ju.tanggal_berakhir;
      formState.form.status = ju.status;
      formState.form.id = ju.id;
    };
    const clearAndRefreshForm = (result) => {
      alert(result.data.message);
      showFormPeriode(false);

      formState.form = {
        nama_periode: "",
        tanggal_mulai: "",
        tanggal_berakhir: "",
        status: "",
      };
      getPeriode();
    };

    onMounted(() => {
      getPeriode();
    });

    return {
      periode,
      formAvailable,
      ...formState,
      modeForm,
      getPeriode,
      showFormPeriode,
      savePeriode,
      deletePeriode,
      editPeriode,
      clearAndRefreshForm,
    };
  },
};
</script>
