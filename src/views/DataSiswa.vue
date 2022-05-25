<template>
<!-- Card Input -->
  <div class="card" style="background-color: transparent">
    <div class="card-body">
      <a
        href="javascript:void(0)"
        class="btn btn-dark"
        v-on:click="showFormSiswa(true)"
        >Tambah Siswa</a
      >
    </div>
  </div>
  
  <!-- Add Jurusan v-show -->
    <div class="card mb-4" v-show="formAvailable" style="margin-top: 20px">
      <div class="card-body">
        <div class="card-title">
          <h3><span v-text="modeForm"></span> Siswa</h3>
        </div>
        <div class="mb-3">
          <label class="form-label">NIS</label>
          <input
            type="text"
            class="form-control"
            placeholder="NIS"
            v-model="form.nis"
          />
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
        <div class="mb-3">
          <label class="form-label">Alamat</label>
          <input
            type="text"
            class="form-control"
            placeholder="Alamat Siswa"
            v-model="form.alamat"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Tempat Lahir</label>
          <input
            type="text"
            class="form-control"
            placeholder="Tempat Lahir"
            v-model="form.tempat_lahir"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Tanggal Lahir</label>
          <input
            type="date"
            class="form-control"
            placeholder="Tanggal Lahir"
            v-model="form.tanggal_lahir"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Jenis Kelamin</label>
          <select class="form-control" v-model="selected.jenis_kelamin">
            <option disabled value="">--Jenis Kelamin--</option>
            <option>Laki-Laki</option>
            <option>Perempuan</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Agama</label>
          <select class="form-control" v-model="selected.agama">
            <option disabled value="">--Agama--</option>
            <option>Islam</option>
            <option>Kristen</option>
            <option>Katolik</option>
            <option>Hindu</option>
            <option>Budha</option>
            <option>Konghucu</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">No HP</label>
          <input
            type="text"
            class="form-control"
            placeholder="No HP"
            v-model="form.no_hp"
          />
        </div>
         <div class="mb-3">
          <label class="form-label">Tahun Masuk</label>
          <input
            type="text"
            class="form-control"
            placeholder="Tahun Masuk"
            v-model="form.tahun_masuk"
          />
        </div>
       
        <button type="button" class="btn btn-dark" @click="saveSiswa">
          Simpan
        </button>
        <button
          type="button"
          class="btn btn-light"
          @click="showFormSiswa(false)"
        >
          Batal
        </button>
      </div>
    </div>
  
  <!-- Table -->
      <div class="card mb-4">
        <div class="card-header pb-0">
          <h6>Data Siswa</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
          <div class="table-responsive p-0">
             <table class="table align-items-center mb-0 text-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">NIS</th>
              <th scope="col">Nama Siswa</th>
              <th scope="col">Kelas</th>
              <th scope="col">Jurusan</th>
              <th scope="col">Alamat</th>
              <th scope="col">Tempat Lahir</th>
              <th scope="col">Tanggal Lahir</th>
              <th scope="col">Jenis Kelamin</th>
              <th scope="col">Agama</th>
              <th scope="col">No HP</th>
              <th scope="col">Tahun Masuk</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(si, index) in siswa" :key="index">
              <DatasiswaTable
                :siswa="si"
                @edit-siswa="editSiswa"
                @delete-siswa="deleteSiswa"
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

import DatasiswaTable from "./components/DatasiswaTable.vue";

export default {
  components: {
    DatasiswaTable,
  },
  setup() {
    const siswa = ref([]);
    const kelas = ref([]);
    const jurusan = ref([]);
    const formAvailable = ref(false);
    const modeForm = ref("Add");
    const formState = reactive({
      form: {
        nis: "",
        nama_siswa: "",
        alamat: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        no_hp: "",
        tahun_masuk: "",
      },
      selected: {
        jenis_kelamin: "",
        agama: "",
        kelas: "",
        jurusan: "",
      },
    });

    const getSiswa = async () => {
      const dataSiswa = await axios.get("http://localhost:3331/siswa");
      siswa.value = dataSiswa.data;
    };

    const getKelas = async () => {
      const dataKelas = await axios.get("http://localhost:3331/kelas");
      kelas.value = dataKelas.data;
    };

    const getJurusan = async () => {
      const dataJurusan = await axios.get("http://localhost:3331/jurusan");
      jurusan.value = dataJurusan.data;
    };

    const showFormSiswa = (state) => {
      modeForm.value = "Add";
      formAvailable.value = state;
    };

    const saveSiswa = () => {
      if (modeForm.value == "Add") {
        axios
          .post("http://localhost:3331/siswa", {
            ...formState.form,
            ...formState.selected,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          })
          .catch((error) => console.log("error", error));
      } else if (modeForm.value == "Edit") {
        axios
          .put("http://localhost:3331/siswa", {
            ...formState.form,
            ...formState.selected,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          });
      }
    };

    const deleteSiswa = (si) => {
      axios
        .delete("http://localhost:3331/siswa/" + si.id)
        .then((response) => {
          alert(response.data.message);

          getSiswa();
        })
        .catch((error) => console.log("error", error));
    };

    const editSiswa = (si) => {
      modeForm.value = "Edit";
      formAvailable.value = true;
      formState.form.nis = si.nis;
      formState.form.nama_siswa = si.nama_siswa;
      formState.selected.nama_kelas = si.nama_kelas;
      formState.selected.nama_jurusan = si.nama_jurusan;
      formState.form.alamat = si.alamat;
      formState.form.tempat_lahir = si.tempat_lahir;
      formState.form.tanggal_lahir = si.tanggal_lahir;
      formState.selected.jenis_kelamin = si.jenis_kelamin;
      formState.selected.agama = si.agama;
      formState.form.no_hp = si.no_hp;
      formState.form.tahun_masuk = si.tahun_masuk;
      
      formState.form.id = si.id;
    };
    const clearAndRefreshForm = (result) => {
      alert(result.data.message);
      showFormSiswa(false);

      (formState.form = {
        nis: "",
        nama_siswa: "",
        alamat: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        no_hp: "",
        tahun_masuk: "",
      }),
        (formState.selected = {
          jenis_kelamin: "",
          agama: "",
          kelas: "",
          jurusan: "",
        });
      getJurusan();
      getKelas();
      getSiswa();
    };

    onMounted(() => {
      getKelas();
      getJurusan();
      getSiswa();
    });

    return {
      siswa,
      formAvailable,
      ...formState,
      modeForm,
      getSiswa,
      getKelas,
      showFormSiswa,
      saveSiswa,
      deleteSiswa,
      editSiswa,
      clearAndRefreshForm,
      getJurusan,
      jurusan,
      kelas,
    };
  },
};
</script>
