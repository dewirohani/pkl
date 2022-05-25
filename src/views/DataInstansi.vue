<template>
  <!-- Card Input -->
  <div class="card" style="background-color: transparent">
    <div class="card-body">
      <a
        href="javascript:void(0)"
        class="btn btn-dark"
        v-on:click="showFormInstansi(true)"
        >Tambah Instansi</a
      >
    </div>
  </div>

  <!-- Add Jurusan v-show -->
  <div class="card mb-4" v-show="formAvailable" style="margin-top: 20px">
    <div class="card-body">
      <div class="card-title">
        <h3><span v-text="modeForm"></span> Instansi</h3>
      </div>
      <div class="mb-3">
        <label class="form-label">Nama Instansi</label>
        <input
          type="text"
          class="form-control"
          placeholder="Nama Instansi"
          v-model="form.nama_instansi"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Alamat </label>
        <input
          type="text"
          class="form-control"
          placeholder="Alamat"
          v-model="form.alamat"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Kecamatan</label>
        <input
          type="text"
          class="form-control"
          placeholder="Kecamatan"
          v-model="form.kecamatan"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Kota</label>
        <input
          type="text"
          class="form-control"
          placeholder="Kota"
          v-model="form.kota"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Nama Pembimbing</label>
        <input
          type="text"
          class="form-control"
          placeholder="Nama Pembimbing"
          v-model="form.nama_pembimbing"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Kontak</label>
        <input
          type="text"
          class="form-control"
          placeholder="Kontak"
          v-model="form.kontak"
        />
      </div>
      
      <div class="mb-3">
        <label class="form-label">Kuota</label>
        <input
          type="text"
          class="form-control"
          placeholder="Kuota"
          v-model="form.kuota"
        />
      </div>
        <div class="mb-3">
        <label class="form-label">Guru Pembimbing</label>
        <input
          type="text"
          class="form-control"
          placeholder="Guru Pembimbing"
          v-model="form.guru"
        />
      </div>
      <button type="button" class="btn btn-dark" @click="saveInstansi">
        Simpan
      </button>
      <button
        type="button"
        class="btn btn-light"
        @click="showFormInstansi(false)"
      >
        Batal
      </button>
    </div>
  </div>
  
    <!-- Table -->
    <div class="card mb-4">
      <div class="card-header pb-0">
        <h6>Data Instansi</h6>
      </div>
     <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0 text-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama Instansi</th>
              <th scope="col">Alamat</th>
              <th scope="col">Kecamatan</th>
              <th scope="col">Kota</th>
              <th scope="col">Nama Pembimbing</th>
              <th scope="col">Kontak</th>
              <th scope="col">Kuota</th>
              <th scope="col">Guru Pembimbing</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(ju, index) in instansi" :key="index">
            <DatainstansiTable
              :instansi="ju"
              @edit-instansi="editInstansi"
              @delete-instansi="deleteInstansi"
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

import DatainstansiTable from "./components/DatainstansiTable.vue";

export default {
  components: {
    DatainstansiTable,
  },
  setup() {
    const instansi = ref([]);
    const formAvailable = ref(false);
    const modeForm = ref("Add");
    const formState = reactive({
      form: {
        nama_instansi: "",
        alamat_instansi: "",
        kecamatan: "",
        kota: "",
        kontak: "",
        nama_pembimbing: "",
        kuota: "",
        guru: "",
      },
    });

    const getInstansi = async () => {
      const dataInstansi = await axios.get("http://localhost:3331/instansi");
      instansi.value = dataInstansi.data;
      console.log(instansi.value);
    };

    const showFormInstansi = (state) => {
      modeForm.value = "Add";
      formAvailable.value = state;
    };

    const saveInstansi = () => {
      if (modeForm.value == "Add") {
        axios
          .post("http://localhost:3331/instansi", {
            ...formState.form,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          })
          .catch((error) => console.log("error", error));
      } else if (modeForm.value == "Edit") {
        axios
          .put("http://localhost:3331/instansi", {
            ...formState.form,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          });
      }
    };

    const deleteInstansi = (ju) => {
      axios
        .delete("http://localhost:3331/instansi/" + ju.id)
        .then((response) => {
          alert(response.data.message);

          getInstansi();
        })
        .catch((error) => console.log("error", error));
    };

    const editInstansi = (ju) => {
      modeForm.value = "Edit";
      formAvailable.value = true;
      formState.form.nama_instansi = ju.nama_instansi;
      formState.form.alamat_instansi = ju.alamat_instansi;
      formState.form.kecamatan = ju.kecamatan;
      formState.form.kota = ju.kota;
      formState.form.nama_pembimbing = ju.nama_pembimbing;
      formState.form.kontak = ju.kontak;
      formState.form.kuota = ju.kuota;
      formState.form.guru = ju.guru;
      formState.form.id = ju.id;
    };
    const clearAndRefreshForm = (result) => {
      alert(result.data.message);
      showFormInstansi(false);

      formState.form = {
        nama_instansi: "",
        alamat_instansi: "",
        kecamatan: "",
        kota: "",
        nama_pembimbing: "",
        kontak: "",
        kuota: "",
        guru: "",
      };
      getInstansi();
    };

    onMounted(() => {
      getInstansi();
    });

    return {
      instansi,
      formAvailable,
      ...formState,
      modeForm,
      getInstansi,
      showFormInstansi,
      saveInstansi,
      deleteInstansi,
      editInstansi,
      clearAndRefreshForm,
    };
  },
};
</script>
