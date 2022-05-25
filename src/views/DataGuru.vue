<template>
  <!-- Card Input -->
  <div class="card" style="background-color: transparent">
    <div class="card-body">
      <a
        href="javascript:void(0)"
        class="btn btn-dark"
        v-on:click="showFormGuru(true)"
        >Tambah Guru</a
      >
    </div>
  </div>

  <!-- Add Jurusan v-show -->
  <div class="card mb-4" v-show="formAvailable" style="margin-top: 20px">
    <div class="card-body">
      <div class="card-title">
        <h3><span v-text="modeForm"></span> Guru</h3>
      </div>
      <div class="mb-3">
        <label class="form-label">NIP</label>
        <input
          type="text"
          class="form-control"
          placeholder="NIP"
          v-model="form.nip"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Nama Guru</label>
        <input
          type="text"
          class="form-control"
          placeholder="Nama Siswa"
          v-model="form.nama_guru"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Alamat</label>
        <input
          type="text"
          class="form-control"
          placeholder="Alamat"
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
      <button type="button" class="btn btn-dark" @click="saveGuru">
        Simpan
      </button>
      <button type="button" class="btn btn-light" @click="showFormGuru(false)">
        Batal
      </button>
    </div>
  </div>

  <!-- Table -->
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Data Guru</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0 text-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">NIP</th>
              <th scope="col">Nama Guru</th>
              <th scope="col">Alamat</th>
              <th scope="col">Tempat Lahir</th>
              <th scope="col">Tanggal Lahir</th>
              <th scope="col">Jenis Kelamin</th>
              <th scope="col">Agama</th>
              <th scope="col">No HP</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(gu, index) in guru" :key="index">
              <DataguruTable
                :guru="gu"
                @edit-guru="editGuru"
                @delete-guru="deleteGuru"
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

import DataguruTable from "./components/DataguruTable.vue";

export default {
  components: {
    DataguruTable,
  },
  setup() {
    const guru = ref([]);
    const formAvailable = ref(false);
    const modeForm = ref("Add");
    const formState = reactive({
      form: {
        nip: "",
        nama_guru: "",
        alamat: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        no_hp: "",
      },
      selected: {
        jenis_kelamin: "",
        agama: "",
      },
    });

    const getGuru = async () => {
      const dataGuru = await axios.get("http://localhost:3331/guru");
      guru.value = dataGuru.data;
    };

    const showFormGuru = (state) => {
      modeForm.value = "Add";
      formAvailable.value = state;
    };

    const saveGuru = () => {
      if (modeForm.value == "Add") {
        axios
          .post("http://localhost:3331/guru", {
            ...formState.form,
            ...formState.selected,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          })
          .catch((error) => console.log("error", error));
      } else if (modeForm.value == "Edit") {
        axios
          .put("http://localhost:3331/guru", {
            ...formState.form,
            ...formState.selected,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          });
      }
    };

    const deleteGuru = (gu) => {
      axios
        .delete("http://localhost:3331/guru/" + gu.id)
        .then((response) => {
          alert(response.data.message);

          getGuru();
        })
        .catch((error) => console.log("error", error));
    };

    const editGuru = (gu) => {
      modeForm.value = "Edit";
      formAvailable.value = true;
      formState.form.nip = gu.nip;
      formState.form.nama_guru = gu.nama_guru;
      formState.form.alamat = gu.alamat;
      formState.form.tempat_lahir = gu.tempat_lahir;
      formState.form.tanggal_lahir = gu.tanggal_lahir;
      formState.selected.jenis_kelamin = gu.jenis_kelamin;
      formState.selected.agama = gu.agama;
      formState.form.no_hp = gu.no_hp;
      formState.form.id = gu.id;
    };
    const clearAndRefreshForm = (result) => {
      alert(result.data.message);
      showFormGuru(false);

      (formState.form = {
        nip: "",
        nama_guru: "",
        alamat: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        agama: "",
        no_hp: "",
      }),
        (formState.selected = {
          jenis_kelamin: "",
          agama: "",
        });
      getGuru();
    };

    onMounted(() => {
      getGuru();
    });

    return {
      guru,
      formAvailable,
      ...formState,
      modeForm,
      getGuru,
      showFormGuru,
      saveGuru,
      deleteGuru,
      editGuru,
      clearAndRefreshForm,
    };
  },
};
</script>
