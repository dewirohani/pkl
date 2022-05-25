<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title">
        <h3>Logbook</h3>
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
          v-model="form.siswa_id"
        />
      </div>
       <div class="mb-3">
        <label class="form-label">Kelas </label>
        <input
          type="text"
          class="form-control"
          placeholder=" Kelas"
          v-model="form.kelas_id"
        />
      </div>
       <div class="mb-3">
        <label class="form-label">Hari </label>
        <input
          type="text"
          class="form-control"
          placeholder="Hari"
          v-model="form.hari"
        />
      </div>
       <div class="mb-3">
        <label class="form-label">Tanggal </label>
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
          placeholder="Kegiatan"
          v-model="form.kegiatan"
        />
      </div>
       <button type="button" class="btn btn-dark" @click="saveLogbook">
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
                siswa_id:"",
                kelas_id:"",
                hari:"",
                tanggal:"",
                waktu_mulai:"",
                waktu_berakhir:"",
                kegiatan:"",
            }
        });
        const saveLogbook = () => {
        axios.post("http://localhost:3334/logbook", {
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
                 siswa_id:"",
                kelas_id:"",
                hari:"",
                tanggal:"",
                waktu_mulai:"",
                waktu_berakhir:"",
                kegiatan:"",
      };
     
    };

return {
    
      ...formState,
    
     
      saveLogbook,
      clearAndRefreshForm,
    };

    }
}
</script>
