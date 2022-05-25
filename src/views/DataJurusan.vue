<template>
<!-- Card Input -->
  <div class="card" style="background-color:transparent">
    <div class="card-body">
      <a
        href="javascript:void(0)"
        class="btn btn-dark"
        v-on:click="showFormJurusan(true)"
        >Tambah Jurusan</a
      >
    </div>
  </div>

<!-- Add Jurusan v-show -->
  
  <div class="card mb-4" v-show="formAvailable" style="margin-top: 20px">
    <div class="card-body">
      <div class="card-title">
        <h3><span v-text="modeForm"></span> Jurusan</h3>
      </div>
      <div class="mb-3">
        <label class="form-label">Nama Jurusan</label>
        <input
          type="text"
          class="form-control"
          placeholder="Nama Jurusan"
          v-model="form.nama_jurusan"
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
      <button type="button" class="btn btn-dark" @click="saveJurusan">
        Simpan
      </button>
      <button
        type="button"
        class="btn btn-light"
        @click="showFormJurusan(false)"
      >
        Batal
      </button>
    </div>
  </div>


  
  <!-- Table -->
<div class="card mb-4">
  <div class="card-header pb-0">
    <h6>Data Jurusan</h6>
  </div>
  <div class="card-body px-0 pt-0 pb-2">
    <div class="table-responsive p-0">
      <table class="table align-items-center mb-0 text-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nama Jurusan</th>
            <th scope="col">Keterangan</th>
            <th scope="col">Action</th>
           
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ju, index) in jurusan" :key="index">
            <DatajurusanTable
              :jurusan="ju"
              @edit-jurusan="editJurusan"
              @delete-jurusan="deleteJurusan"
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

import DatajurusanTable from "./components/DatajurusanTable.vue";

export default {
  components: {
    DatajurusanTable,
  },
  setup() {
    const jurusan = ref([]);
    const formAvailable = ref(false);
    const modeForm = ref("Add");
    const formState = reactive({
      form: {
        nama_jurusan: "",
        keterangan: "",
      },
    });

    const getJurusan = async () => {
      const dataJurusan = await axios.get("http://localhost:3331/jurusan");
      jurusan.value = dataJurusan.data;
      console.log(jurusan.value);
    };

    const showFormJurusan = (state) => {
      modeForm.value = "Add";
      formAvailable.value = state;
    };

    const saveJurusan = () => {
      if (modeForm.value == "Add") {
        axios
          .post("http://localhost:3331/jurusan", {
            ...formState.form,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          })
          .catch((error) => console.log("error", error));
      } else if (modeForm.value == "Edit") {
        axios
          .put("http://localhost:3331/jurusan", {
            ...formState.form,
          })
          .then((result) => {
            clearAndRefreshForm(result);
          });
      }
    };

    const deleteJurusan = (ju) => {
      axios
        .delete("http://localhost:3331/jurusan/" + ju.id)
        .then((response) => {
          alert(response.data.message);

          getJurusan();
        })
        .catch((error) => console.log("error", error));
    };

    const editJurusan = (ju) => {
      modeForm.value = "Edit";
      formAvailable.value = true;
      formState.form.nama_jurusan = ju.nama_jurusan;
      formState.form.keterangan = ju.keterangan;
      formState.form.id = ju.id;
    };
    const clearAndRefreshForm = (result) => {
      alert(result.data.message);
      showFormJurusan(false);

      formState.form = {
        nama_jurusan: "",
        keterangan: "",
      };
      getJurusan();
    };

    onMounted(() => {
      getJurusan();
    });

    return {
      jurusan,
      formAvailable,
      ...formState,
      modeForm,
      getJurusan,
      showFormJurusan,
      saveJurusan,
      deleteJurusan,
      editJurusan,
      clearAndRefreshForm,
    };
  },
};
</script>
