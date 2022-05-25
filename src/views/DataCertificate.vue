<template>
  <!--Card-->
  <div class="card" style="background-color: transparent">
    <div class="card-body">
      <a
        href="javascript:void(0)"
        class="btn btn-dark"
        v-on:click="showFormSertifikat(true)"
        >Tambah Sertifikat</a
      >
    </div>
  </div>

  <!--Add v-show-->
  <div class="card mb-4" v-show="formAvailable" style="margin-top: 20px">
    <div class="card-body">
      <div class="card-title">
        <h3><span v-text="modeForm"></span> Sertifikat</h3>
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
        <label class="form-label">Guru Pembimbing</label>
        <input
          type="text"
          class="form-control"
          placeholder="Nama Guru"
          v-model="form.guru_pembimbing"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Sertifikat</label>
        <input
          type="text"
          class="form-control"
          placeholder="Sertifikat"
          v-model="form.sertifikat"
        />
      </div>
      <button type="button" class="btn btn-dark" @click="saveSertifikat">
        Simpan
      </button>
      <button
        type="button"
        class="btn btn-light"
        @click="showFormSertifikat(false)"
      >
        Batal
      </button>
    </div>
  </div>

  <!--TABLE-->
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Data Sertifikat</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0 text-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama Siswa</th>
              <th scope="col">Guru Pembimbing</th>
              <th scope="col">Sertifikat</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(se, index) in sertifikat" :key="index">
              <DatacertificateTable
                :sertifikat="se"
                @edit-sertifikat="editSertifikat"
                @delete-sertifikat="deleteSertifikat"
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

import DatacertificateTable from "./components/DatacertificateTable.vue";

export default {
  components: {
    DatacertificateTable,
  },
  setup() {
    const sertifikat = ref([]);
    const formAvailable = ref(false);
    const modeForm = ref("Add");
    const formState = reactive({
      form: {
        nama_siswa: "",
        guru_pembimbing: "",
        sertifikat: "",
      },
    });

    const getSertifikat = async () => {
      const dataSertifikat = await axios.get(
        "http://localhost:3331/sertifikat"
      );
      sertifikat.value = dataSertifikat.data;
      console.log(sertifikat.value);
    };

    const showFormSertifikat = (state) => {
      modeForm.value = "Add";
      formAvailable.value = state;
    };

    const saveSertifikat = () => {
      if (modeForm.value == "Add") {
        axios
          .post("http://localhost:3331/sertifikat", {
            ...formState.form,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          })
          .catch((error) => console.log("error", error));
      } else if (modeForm.value == "Edit") {
        axios
          .put("http://localhost:3331/sertifikat", {
            ...formState.form,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          });
      }
    };

    const deleteSertifikat = (se) => {
      axios
        .delete("http://localhost:3331/sertifikat/" + se.id)
        .then((response) => {
          alert(response.data.message);

          getSertifikat();
        })
        .catch((error) => console.log("error", error));
    };

    const editSertifikat = (se) => {
      modeForm.value = "Edit";
      formAvailable.value = true;
      formState.form.nama_siswa = se.nama_siswa;
      formState.form.guru_pembimbing = se.guru_pembimbing;
      formState.form.sertifikat = se.sertifikat;
      formState.form.id = se.id;
    };
    const clearAndRefreshForm = (result) => {
      alert(result.data.message);
      showFormSertifikat(false);

      formState.form = {
        nama_siswa: "",
        guru_pembimbing: "",
        sertifikat: "",
      };
      getSertifikat();
    };

    onMounted(() => {
      getSertifikat();
    });

    return {
      sertifikat,
      formAvailable,
      ...formState,
      modeForm,
      getSertifikat,
      showFormSertifikat,
      saveSertifikat,
      deleteSertifikat,
      editSertifikat,
      clearAndRefreshForm,
    };
  },
};
</script>
