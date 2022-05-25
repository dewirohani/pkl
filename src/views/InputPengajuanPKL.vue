<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title">
        <h3>Pengajuan PKL</h3>
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
        <label class="form-label">Jurusan </label>
        <input
          type="text"
          class="form-control"
          placeholder="Jurusan"
          v-model="form.jurusan"
        />
      </div>
       <div class="mb-3">
        <label class="form-label">Nama Instansi </label>
        <input
          type="text"
          class="form-control"
          placeholder="Nama Instansi"
          v-model="form.nama_instansi"
        />
      </div>
          <div class="mb-3">
        <label class="form-label">Periode PKL</label>
        <input
          type="text"
          class="form-control"
          placeholder="Periode PKL"
          v-model="form.periode_pkl"
        />
      </div>
       <button type="button" class="btn btn-dark" @click="savePengajuanPKL">
        Simpan
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {reactive} from "vue";

export default{
    setup(){
      
        const formState = reactive({
            form:{
                nis:"",
                nama_siswa:"",
                kelas:"",
                jurusan:"",
                nama_instansi:"",
                periode_pkl:"",
                
            }
        });
        const savePengajuanPKL = () => {
        axios.post("http://localhost:3334/pengajuanPKL", {
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
              nis:"",
                nama_siswa:"",
                kelas:"",
                jurusan:"",
                nama_instansi:"",
                periode_pkl:"",
      };
     
    };

return {
      ...formState,
      savePengajuanPKL,
      clearAndRefreshForm,
    };

    }
}
</script>
