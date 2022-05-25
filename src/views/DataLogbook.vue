<template>
  <!-- Card Input -->
  <div class="card" style="background-color: transparent">
    <div class="card-body">
      <a
        href="javascript:void(0)"
        class="btn btn-dark"
        v-on:click="showFormLogbook(true)"
        >Tambah Logbook</a
      >
    </div>
  </div>

  <!-- Add Jurusan v-show -->
  <div class="card mb-4" v-show="formAvailable" style="margin-top: 20px">
    <div class="card-body">
      <div class="card-title">
        <h3><span v-text="modeForm"></span> Logbook</h3>
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
        <label class="form-label">Nama Guru</label>
        <input
          type="text"
          class="form-control"
          placeholder="Nama Guru"
          v-model="form.nama_guru"
        />
      </div>
     <div class="mb-3">
        <label class="form-label">Tanggal</label>
        <input
          type="date"
          class="form-control"
          placeholder="Tanggal"
          v-model="form.tanggal"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Waktu Mulai</label>
        <input
          type="time"
          class="form-control"
          placeholder="Waktu Mulai"
          v-model="form.waktu_mulai"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Waktu Berakhir</label>
        <input
          type="time"
          class="form-control"
          placeholder="Waktu Berakhir"
          v-model="form.waktu_berakhir"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Kegiatan</label>
        <input
          type="text"
          class="form-control"
          placeholder="Isi Kegiatan"
          v-model="form.kegiatan"
        />
      </div>
      <button type="button" class="btn btn-dark" @click="saveLogbook">
        Simpan
      </button>
      <button
        type="button"
        class="btn btn-light"
        @click="showFormLogbook(false)"
      >
        Batal
      </button>
    </div>
  </div>

  <!-- Table -->
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Data Logbook</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0 text-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama Siswa</th>              
              <th scope="col">Nama Guru</th>
              <th scope="col">Tanggal</th>
              <th scope="col">Waktu Mulai</th>
              <th scope="col">Waktu Berakhir</th>
              <th scope="col">Kegiatan</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(lo, index) in logbook" :key="index">
              <DatalogbookTable
                :logbook="lo"
                @edit-logbook="editLogbook"
                @delete-logbook="deleteLogbook"
                style="margin-top: 10px"
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
*/

<script>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";

import DatalogbookTable from "./components/DatalogbookTable.vue";

export default {
  components: {
    DatalogbookTable,
  },
  setup() {
    const logbook = ref([]);
    const siswa = ref([]);
    const guru = ref([]);
    const attandance = ref([]);
    const formAvailable = ref(false);
    const modeForm = ref("Add");
    const formState = reactive({
      form: {
        nama_siswa: "",
        nama_guru: "",
        tanggal: "",
        waktu_mulai: "",
        waktu_berakhir: "",
      }
    });

    const getLogbook = async () => {
      const dataLogbook = await axios.get("http://localhost:3331/logbook");
      logbook.value = dataLogbook.data;
    };

    const getSiswa = async () => {
      const dataSiswa = await axios.get("http://localhost:3331/logbook");
      siswa.value = dataSiswa.data;
    };

    const getGuru = async () => {
      const dataGuru = await axios.get("http://localhost:3331/logbook");
      guru.value = dataGuru.data;
    };

    const getAttandance = async () => {
      const dataAttandance = await axios.get("http://localhost:3331/logbook");
      attandance.value = dataAttandance.data;
    };

    const showFormLogbook = (state) => {
      modeForm.value = "Add";
      formAvailable.value = state;
    };

    const saveLogbook = () => {
      if (modeForm.value == "Add") {
        axios
          .post("http://localhost:3331/logbook", {
            ...formState.form,
            ...formState.selected,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          })
          .catch((error) => console.log("error", error));
      } else if (modeForm.value == "Edit") {
        axios
          .put("http://localhost:3331/logbook", {
            ...formState.form,
            ...formState.selected,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          });
      }
    };

    const deleteLogbook = (lo) => {
      axios
        .delete("http://localhost:3331/logbook/" + lo.id)
        .then((response) => {
          alert(response.data.message);

          getLogbook();
          getGuru();
          getSiswa();
          getAttandance();
        })
        .catch((error) => console.log("error", error));
    };

    const editLogbook = (lo) => {
      modeForm.value = "Edit";
      formAvailable.value = true;
      formState.form.nama_siswa = lo.nama_siswa;
      formState.form.nama_guru = lo.nama_guru;
      formState.form.tanggal = lo.tanggal;
      formState.form.waktu_mulai = lo.waktu_mulai;
      formState.form.waktu_berakhir = lo.waktu_berakhir;
      formState.form.kegiatan = lo.kegiatan;
      formState.form.id = lo.id;
    };
    const clearAndRefreshForm = (result) => {
      alert(result.data.message);
      showFormLogbook(false);

      (formState.form = {
        nama_siswa: "",
        nama_guru: "",
        tanggal: "",
        waktu_mulai: "",
        waktu_berakhir: "",      
      });

      getLogbook();
      getSiswa();
      getGuru();
      getAttandance();
    };

    onMounted(() => {
      getLogbook();
      getSiswa();
      getGuru();
      getAttandance();
    });

    return {
      logbook,
      formAvailable,
      ...formState,
      modeForm,
      getAttandance,
      getLogbook,
      getGuru,
      getSiswa,
      showFormLogbook,
      saveLogbook,
      deleteLogbook,
      editLogbook,
      clearAndRefreshForm,
    };
  },
};
</script>
