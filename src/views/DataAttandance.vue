<template>
  <!-- Card Input -->
  <div class="card" style="background-color: transparent">
    <div class="card-body">
      <a
        href="javascript:void(0)"
        class="btn btn-dark"
        v-on:click="showFormAttandance(true)"
        >Tambah Attandance</a
      >
    </div>
  </div>

  <!-- Add Jurusan v-show -->
  <div class="card mb-4" v-show="formAvailable" style="margin-top: 20px">
    <div class="card-body">
      <div class="card-title">
        <h3><span v-text="modeForm"></span> Attandance</h3>
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
        <label class="form-label">Tanggal</label>
        <input
          type="date"
          class="form-control"
          placeholder="Tanggal"
          v-model="form.tanggal"
        />
      </div>
        <div class="mb-3">
        <label class="form-label">Waktu</label>
        <input
          type="timestamp"
          class="form-control"
          placeholder="Waktu"
          v-model="form.waktu"
        
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Lokasi</label>
        <input
          type="text"
          class="form-control"
          placeholder="Lokasi"
          v-model="form.lokasi"
        />
      </div>
        <div class="mb-3">
        <label class="form-label">Foto</label>
        <input
          type="text"
          class="form-control"
          placeholder="Foto"
          v-model="form.foto"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Signature</label>
        <input
          type="text"
          class="form-control"
          placeholder="Signature"
          v-model="form.signature"
        />
      </div>
     
      <button type="button" class="btn btn-dark" @click="saveAttandance">
        Simpan
      </button>
      <button type="button" class="btn btn-light" @click="showFormAttandance(false)">
        Batal
      </button>
    </div>
  </div>
  
  <!-- Table -->
    <div class="card mb-4">
      <div class="card-header pb-0">
        <h6>Data Attandance</h6>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0 text-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama Siswa</th>
              <th scope="col">Tanggal</th>
              <th scope="col">Waktu</th>
              <th scope="col">Lokasi</th>
              <th scope="col">Foto</th>
              <th scope="col">Signature</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(at, index) in attandance" :key="index">
            <DataattandanceTable
              :attandance="at"
              @edit-attandance="editAttandance"
              @delete-attandance="deleteAttandance"
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

import DataattandanceTable from "./components/DataattandanceTable.vue";

export default {
  components: {
    DataattandanceTable,
  },
  setup() {
   
    const siswa = ref([]);
    const attandance = ref([]);
    const formAvailable = ref(false);
    const modeForm = ref("Add");
    const formState = reactive({
      form: {
        nama_siswa: "",
        tanggal: "",
          waktu: "",
          lokasi: "",
           foto: "",
           signature: "",
      }
    });

    const getAttandance = async () => {
      const dataAttandance = await axios.get("http://localhost:3331/attandance");
      attandance.value = dataAttandance.data;
    };

    const getSiswa = async () => {
      const dataSiswa = await axios.get("http://localhost:3331/attandance");
      siswa.value = dataSiswa.data;
    };

    const showFormAttandance = (state) => {
      modeForm.value = "Add";
      formAvailable.value = state;
    };

    const saveAttandance = () => {
      if (modeForm.value == "Add") {
        axios
          .post("http://localhost:3331/attandance", {
            ...formState.form,
            
          })
          .then((result) => {
            clearAndRefreshForm(result);
          })
          .catch((error) => console.log("error", error));
      } else if (modeForm.value == "Edit") {
        axios
          .put("http://localhost:3331/attandance", {
            ...formState.form,
  
          })
          .then((result) => {
            clearAndRefreshForm(result);
          });
      }
    };

    const deleteAttandance = (at) => {
      axios
        .delete("http://localhost:3331/attandance/" + at.id)
        .then((response) => {
          alert(response.data.message);

          getSiswa();
          getAttandance();
        
        })
        .catch((error) => console.log("error", error));
    };

    const editAttandance = (at) => {
      modeForm.value = "Edit";
      formAvailable.value = true;
    formState.form.tanggal = at.tanggal;
      formState.form.waktu = at.waktu;
      formState.form.lokasi = at.lokasi;
    formState.form.foto = at.foto;
       formState.form.signature = at.signature;
      formState.form.nama_siswa = at.nama_siswa;
      formState.form.id = at.id;
    };
    const clearAndRefreshForm = (result) => {
      alert(result.data.message);
      showFormAttandance(false);

      (formState.form = {
        nama_siswa: "",
        tanggal: "",
        waktu: "",
          lokasi: "",
           foto: "",
           signature: "",
      });
      
      getSiswa();
       getAttandance();
    };

    onMounted(() => {
       
      getSiswa();
       getAttandance();
    });

    return {
      attandance,
      formAvailable,
      ...formState,
      modeForm,
      getAttandance,
    getSiswa,
      showFormAttandance,
      saveAttandance,
      deleteAttandance,
      editAttandance,
      clearAndRefreshForm,
    };
  },
};
</script>
