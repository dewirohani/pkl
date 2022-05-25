<template>
  <!-- Card Input -->
  <div class="card" style="background-color: transparent">
    <div class="card-body">
      <a
        href="javascript:void(0)"
        class="btn btn-dark"
        v-on:click="showFormPengajuanPKL(true)"
        >Tambah Pengajuan PKL</a
      >
    </div>
  </div>
  <!-- Add Jurusan v-show -->

  <div class="card mb-4" v-show="formAvailable" style="margin-top: 20px">
    <div class="card-body">
      <div class="card-title">
        <h3><span v-text="modeForm"></span> Pengajuan PKL</h3>
      </div>
      <div class="mb-3">
        <label class="form-label">Nama Siswa</label>
        <input
          type="text"
          class="form-control"
          placeholder="Nama Siswa"
          v-model="form.nama_siswa"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Periode PKL</label>
        <select class="form-control" v-model="selected.periode">
          <option disabled value="">--Periode--</option>
          <option v-for="(periode, index) in periode" :key="index">
            {{ periode.nama_periode }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Nama Instansi</label>
        <select class="form-control" v-model="selected.nama_instansi">
          <option disabled value="">--Instansi--</option>
          <option v-for="(instansi, index) in instansi" :key="index">
            {{ instansi.nama_instansi }}
          </option>
        </select>
      </div>
      <button type="button" class="btn btn-dark" @click="savePengajuanPKL">
        Simpan
      </button>
      <button
        type="button"
        class="btn btn-light"
        @click="showFormPengajuanPKL(false)"
      >
        Batal
      </button>
    </div>
  </div>

  <!-- Table -->
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Data Pengajuan PKL</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0 text-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama Siswa</th>
              <th scope="col">Periode</th>
              <th scope="col">Nama Instansi</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(at, index) in pengajuan_pkl" :key="index">
              <DatapengajuanPKLTable
                :pengajuan_pkl="at"
                @edit-pengajuan-pkl="editPengajuanPKL"
                @delete-pengajuan-pkl="deletePengajuanPKL"
                style="margin-top: 10px"
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

import DatapengajuanPKLTable from "./components/DatapengajuanPKLTable.vue";

export default {
  components: {
    DatapengajuanPKLTable,
  },
  setup() {
    const pengajuan_pkl = ref([]);
    const instansi = ref([]);
    const periode = ref([]);
    const formAvailable = ref(false);
    const modeForm = ref("Add");
    const formState = reactive({
      form: {
        nama_siswa: "",
      },
      selected: {
        nama_instansi: "",
        periode: "",
      },
    });

    const getPengajuan_pkl = async () => {
      const dataPengajuan_pkl = await axios.get(
        "http://localhost:3331/pengajuan_pkl"
      );
      pengajuan_pkl.value = dataPengajuan_pkl.data;
    };

    const getInstansi = async () => {
      const dataInstansi = await axios.get("http://localhost:3331/instansi");
      instansi.value = dataInstansi.data;
    };

    const getPeriode = async () => {
      const dataperiode = await axios.get("http://localhost:3331/periode");
      periode.value = dataperiode.data;
    };

    const showFormPengajuanPKL = (state) => {
      modeForm.value = "Add";
      formAvailable.value = state;
    };

    const savePengajuanPKL = () => {
      if (modeForm.value == "Add") {
        axios
          .post("http://localhost:3331/pengajuan_pkl", {
            ...formState.form,
            ...formState.selected,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          })
          .catch((error) => console.log("error", error));
      } else if (modeForm.value == "Edit") {
        axios
          .put("http://localhost:3331/pengajuan_pkl", {
            ...formState.form,
            ...formState.selected,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          });
      }
    };

    const deletePengajuanPKL = (at) => {
      axios
        .delete("http://localhost:3331/pengajuan_pkl/" + at.id)
        .then((response) => {
          alert(response.data.message);

          getInstansi();
          getPeriode();
          getPengajuan_pkl();
        })
        .catch((error) => console.log("error", error));
    };

    const editPengajuanPKL = (at) => {
      modeForm.value = "Edit";
      formAvailable.value = true;
      formState.form.nama_siswa = at.nama_siswa;
      formState.selected.nama_instansi = at.nama_instansi;
      formState.selected.periode = at.periode;
      formState.form.id = at.id;
    };
    const clearAndRefreshForm = (result) => {
      alert(result.data.message);
      showFormPengajuanPKL(false);

      (formState.form = {
        nama_siswa: "",
      }),
        (formState.selected = {
          nama_instansi: "",
          periode: "",
        });

      getInstansi();
      getPeriode();
      getPengajuan_pkl();
    };

    onMounted(() => {
      getInstansi();
      getPeriode();
      getPengajuan_pkl();
    });

    return {
      pengajuan_pkl,
      instansi,
      periode,
      formAvailable,
      ...formState,
      modeForm,
      getInstansi,
      getPeriode,
      getPengajuan_pkl,
      showFormPengajuanPKL,
      savePengajuanPKL,
      deletePengajuanPKL,
      editPengajuanPKL,
      clearAndRefreshForm,
    };
  },
};
</script>
