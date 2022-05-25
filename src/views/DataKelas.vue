<template>
  <!-- Card Input -->
  <div class="card" style="background-color: transparent">
    <div class="card-body">
      <a
        href="javascript:void(0)"
        class="btn btn-dark"
        v-on:click="showFormKelas(true)"
        >Tambah Kelas</a
      >
    </div>
  </div>

  <!-- Add Jurusan v-show -->

  <div class="card mb-4" v-show="formAvailable" style="margin-top: 20px">
    <div class="card-body">
      <div class="card-title">
        <h3><span v-text="modeForm"></span> Kelas</h3>
      </div>      
      <div class="mb-3">
        <label class="form-label">Nama Kelas</label>
        <input
          type="text"
          class="form-control"
          placeholder="Nama Kelas"
          v-model="form.nama_kelas"
        />
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
       <div class="mb-3">
          <label class="form-label">Jumlah Siswa</label>
          <input
            type="text"
            class="form-control"
            placeholder="Jumlah Siswa"
            v-model="form.jumlah_siswa"
          />
        </div>
         <div class="mb-3">
          <label class="form-label">Keterangan</label>
          <input
            type="text"
            class="form-control"
            placeholder="Keterangan"
            v-model="form.keterangan"
          />
        </div>
      <button type="button" class="btn btn-dark" @click="saveKelas">
        Simpan
      </button>
      <button type="button" class="btn btn-light" @click="showFormKelas(false)">
        Batal
      </button>
    </div>
  </div>

  <!-- Table -->
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Data Kelas</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0 text-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama Kelas</th>
              <th scope="col">Jurusan</th>
              <th scope="col">Jumlah Siswa</th>
              <th scope="col">Keterangan</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ke, index) in kelas" :key="index">
              <DatakelasTable
                :kelas="ke"
                @edit-kelas="editKelas"
                @delete-kelas="deleteKelas"
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

import DatakelasTable from "./components/DatakelasTable.vue";

export default {
  components: {
    DatakelasTable,
  },
  setup() {
    const kelas = ref([]);
    const jurusan = ref([]);
    const formAvailable = ref(false);
    const modeForm = ref("Add");
    const formState = reactive({
      form: {
        nama_kelas: "",
        jumlah_siswa: "",
        keterangan: "",
      },
      selected: {
        jurusan: "",
      },
    });

    const getKelas = async () => {
      const dataKelas = await axios.get("http://localhost:3331/kelas");
      kelas.value = dataKelas.data;
    };

    const getJurusan = async () => {
      const dataJurusan = await axios.get("http://localhost:3331/jurusan");
      jurusan.value = dataJurusan.data;
    };

    const showFormKelas = (state) => {
      modeForm.value = "Add";
      formAvailable.value = state;
    };

    const saveKelas = () => {
      if (modeForm.value == "Add") {
        axios
          .post("http://localhost:3331/kelas", {
            ...formState.form,
            ...formState.selected,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          })
          .catch((error) => console.log("error", error));
      } else if (modeForm.value == "Edit") {
        axios
          .put("http://localhost:3331/kelas", {
            ...formState.form,
            ...formState.selected,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          });
      }
    };

    const deleteKelas = (ke) => {
      axios
        .delete("http://localhost:3331/kelas/" + ke.id)
        .then((response) => {
          alert(response.data.message);

          getKelas();
          getJurusan();
        })
        .catch((error) => console.log("error", error));
    };

    const editKelas = (ke) => {
      modeForm.value = "Edit";
      formAvailable.value = true;
      formState.form.nama_kelas = ke.nama_kelas;
      formState.selected.nama_jurusan = ke.nama_jurusan;
      formState.form.jumlah_siswa = ke.jumlah_siswa;
      formState.form.keterangan = ke.keterangan;
      formState.form.id = ke.id;
    };
    const clearAndRefreshForm = (result) => {
      alert(result.data.message);
      showFormKelas(false);

      (formState.form = {
        nama_kelas: "",
        jumlah_siswa: "",
        keterangan: "",
      }),
        (formState.selected = {
          jurusan: "",
        });
      getJurusan();
      getKelas();
    };

    onMounted(() => {
      getKelas();
      getJurusan();
    });

    return {
      kelas,
      formAvailable,
      ...formState,
      modeForm,
      getKelas,
      showFormKelas,
      saveKelas,
      deleteKelas,
      editKelas,
      clearAndRefreshForm,
      getJurusan,
      jurusan,
    };
  },
};
</script>
