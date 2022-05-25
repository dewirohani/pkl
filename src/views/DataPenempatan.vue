<template>
<!-- Card Input -->
  <div class="card" style="background-color:transparent">
    <div class="card-body">
      <a
        href="javascript:void(0)"
        class="btn btn-dark"
        v-on:click="showFormPenempatan(true)"
        >Tambah Penempatan</a
      >
    </div>
  </div>

<!-- Add Penempatan v-show -->
  
  <div class="card mb-4" v-show="formAvailable" style="margin-top: 20px">
    <div class="card-body">
      <div class="card-title">
        <h3><span v-text="modeForm"></span> Penempatan</h3>
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
        <label class="form-label">Nama Guru</label>
        <input
          type="text"
          class="form-control"
          placeholder="Nama Guru"
          v-model="form.nama_guru"
        />
      </div>
        <div class="mb-3">
          <label class="form-label">Kelas</label>
          <select class="form-control" v-model="selected.kelas">
            <option disabled value="">--Kelas--</option>
            <option v-for="(kelas, index) in kelas" :key="index">
              {{ kelas.nama_kelas }}
            </option>
          </select>
        </div>
       <div class="mb-3">
          <label class="form-label">Jurusan</label>
          <select class="form-control" v-model="selected.jurusan">
            <option disabled value="">--Jurusan--</option>
            <option v-for="(jurusan, index) in jurusan" :key="index">
              {{ jurusan.nama_jurusan }}
            </option>
          </select>
        </div>
      <button type="button" class="btn btn-dark" @click="savePenempatan">
        Simpan
      </button>
      <button
        type="button"
        class="btn btn-light"
        @click="showFormPenempatan(false)"
      >
        Batal
      </button>
    </div>
  </div>


  
  <!-- Table -->
<div class="card mb-4">
  <div class="card-header pb-0">
    <h6>Data Penempatan</h6>
  </div>
  <div class="card-body px-0 pt-0 pb-2">
    <div class="table-responsive p-0">
      <table class="table align-items-center mb-0 text-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nama Siswa</th>
            <th scope="col">Periode</th>
            <th scope="col">Nama Guru</th>
            <th scope="col">Kelas</th>
            <th scope="col">Jurusan</th>
            <th scope="col">Action</th>
           
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ju, index) in penempatan" :key="index">
            <DatapenempatanTable
              :penempatan="ju"
              @edit-penempatan="editPenempatan"
              @delete-penempatan="deletePenempatan"
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

import DatapenempatanTable from "./components/DatapenempatanTable.vue";

export default {
  components: {
    DatapenempatanTable,
  },
  setup() {
    const penempatan = ref([]);
    const periode = ref([]);
    const kelas = ref([]);
    const jurusan = ref([]);
    const formAvailable = ref(false);
    const modeForm = ref("Add");
    const formState = reactive({
      form: {
        nama_siswa: "",
        nama_guru: "",
      },
      selected: {
        periode: "",
        kelas: "",
        jurusan: "",
      }
    });

    const getPenempatan = async () => {
      const dataPenempatan = await axios.get("http://localhost:3331/penempatan");
      penempatan.value = dataPenempatan.data;
      console.log(penempatan.value);
    };

  const getPeriode = async () => {
      const dataperiode = await axios.get("http://localhost:3331/periode");
      periode.value = dataperiode.data;
    };

    const getKelas = async () => {
      const dataKelas = await axios.get("http://localhost:3331/kelas");
      kelas.value = dataKelas.data;
    };

    const getJurusan = async () => {
      const dataJurusan = await axios.get("http://localhost:3331/jurusan");
      jurusan.value = dataJurusan.data;
    };
    const showFormPenempatan = (state) => {
      modeForm.value = "Add";
      formAvailable.value = state;
    };

    const savePenempatan = () => {
      if (modeForm.value == "Add") {
        axios
          .post("http://localhost:3331/penempatan", {
            ...formState.form,
             ...formState.selected,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          })
          .catch((error) => console.log("error", error));
      } else if (modeForm.value == "Edit") {
        axios
          .put("http://localhost:3331/penempatan", {
            ...formState.form,
            ...formState.selected,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          });
      }
    };

    const deletePenempatan = (ju) => {
      axios
        .delete("http://localhost:3331/penempatan/" + ju.id)
        .then((response) => {
          alert(response.data.message);

          getPenempatan();
          getPeriode();
          getKelas();
          getJurusan();
        })
        .catch((error) => console.log("error", error));
    };

    const editPenempatan = (ju) => {
      modeForm.value = "Edit";
      formAvailable.value = true;
      formState.form.nama_siswa = ju.nama_siswa;
      formState.selected.periode = ju.periode;
      formState.form.nama_guru = ju.nama_guru;
      formState.selected.kelas = ju.kelas;
      formState.selected.jurusan = ju.jurusan;
      formState.form.id = ju.id;
    };
    const clearAndRefreshForm = (result) => {
      alert(result.data.message);
      showFormPenempatan(false);

      formState.form = {
        nama_siswa: "",
        nama_guru: "",
      },
      formState.selected = {
        periode: "",
        kelas: "",
        jurusan: "",

      };
      getPenempatan();
      getPeriode();
      getKelas();
          getJurusan();
    };

    onMounted(() => {
      getPenempatan();
      getPeriode();
      getKelas();
          getJurusan();
    });

    return {
      penempatan,
      periode,
      kelas,
      jurusan,
      formAvailable,
      ...formState,
      modeForm,
      getPenempatan,
      getPeriode,
      getKelas,
      getJurusan,
      showFormPenempatan,
      savePenempatan,
      deletePenempatan,
      editPenempatan,
      clearAndRefreshForm,
    };
  },
};
</script>
