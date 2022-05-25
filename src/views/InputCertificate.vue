<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title">
        <h3>Sertifikat PKL</h3>
      </div>
      <div class="mb-3">
        <label class="form-label">Nama Siswa </label>
        <input
          type="text"
          class="form-control"
          placeholder="Nama Siswa"
          v-model="form.nama_siswa"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Kelas </label>
        <input
          type="text"
          class="form-control"
          placeholder=" Kelas"
          v-model="form.kelas"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Sertifikat </label>
        <input
          type="text"
          class="form-control"
          placeholder="Jurusan"
          v-model="form.jurusan"
        />
      </div>
      <button type="button" class="btn btn-dark" @click="saveCertificate">
        Simpan
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";

export default {
  setup() {
    const formState = reactive({
      form: {
        nama_siswa: "",
        kelas: "",
        sertifikat: "",
      },
    });
    const saveCertificate = () => {
      axios
        .post("http://localhost:3334/Certificate", {
          ...formState.form,
        })
        .then((result) => {
          clearAndRefreshForm(result);
        })
        .catch((error) => console.log("error", error));
    };

    const clearAndRefreshForm = (result) => {
      alert(result.data.message);

      formState.form = {
        nama_siswa: "",
        kelas: "",
        sertifikat: "",
      };
    };

    return {
      ...formState,
      saveCertificate,
      clearAndRefreshForm,
    };
  },
};
</script>
