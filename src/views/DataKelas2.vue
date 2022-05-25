<template>
  <div class="card" style="background-color: transparent;">
    <div class="card-body" style="background-color: transparent;" >
      <a href="javascript:void(0)" class="btn btn-primary" v-on:click="showFormKelas(true)">Tambah Kelas</a>
    </div>
  </div>
  <div class="card" v-show="formAvailable" style="margin-top:20px;">
    <div class="card-body">
      <div class="card-title"><h3><span v-text="modeForm"></span> Kelas</h3></div>
      <div class="mb-3">
        <label class="form-label">Nama Kelas</label>
        <input type="text" class="form-control" placeholder="Nama Kelas" v-model="form.nama_jurusan">
      </div>
      <button type="button" class="btn btn-primary" @click="saveKelas">Simpan</button>
      <button type="button" class="btn btn-light" @click="showFormKelas(false)">Batal</button>
    </div>
  </div>
  <br>
  <div class="row">
    <div class="card mb-4">
      <div class="card-header pb-0">
        <h6>Data Kelas</h6>
      </div>
        <div class="card-body px-0 pt-0 pb-2">
          <div class="table-responsive p-0">
              <div class="row px-6 text-uppercase text-secondary text-xs font-weight-bolder opacity-7">
                <div class="col-lg-3">
                ID
                </div>
                <div class="col-lg-3">
                Nama Kelas
                </div>  
                <div class="col-lg-3">
                Edit 
                </div>  
                <div class="col-lg-3">
                Delete
                </div>  
              </div>
              <div class="row" v-for="(ju,index) in kelas" :key="index">
                <DatakelasTable
                  :kelas="ju" 
                  @edit-kelas="editKelas" 
                  @delete-kelas="deleteKelas" 
                  style="margin-top:10px;"
                />
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { onMounted, reactive, ref } from 'vue'

  import DatakelasTable from './components/DatakelasTable.vue'

  export default {
    components:{
      DatakelasTable
    },
    setup(){
      const kelas = ref([])
      const formAvailable = ref(false)
      const modeForm = ref("Add")
      const formState = reactive({
        form : {
          nama_kelas:"",
         
        }
      })

      const getKelas = async () => {
        const dataKelas = await axios.get("http://localhost:3334/kelas");
        kelas.value = dataKelas.data
        console.log(kelas.value)
      }


      const showFormKelas = (state) => {
        modeForm.value = "Add"
        formAvailable.value = state
      }

      const saveKelas = () => {
        if(modeForm.value=="Add"){
          axios.post("http://localhost:3334/kelas", {
            ...formState.form
          })
          .then( (result) => {
            clearAndRefreshForm(result)
          })
          .catch((error) => console.log('error', error))
        }else if (modeForm.value=="Edit"){
           axios.put("http://localhost:3334/kelas", {
            ...formState.form
          })
          .then( (result) => {
            clearAndRefreshForm(result)
          })
        }
      }

      const deleteKelas = (ju) => {
        axios.delete("http://localhost:3334/kelas/"+ju.id_kelas)
        .then((response) => {
          alert(response.data.message);

          getKelas()
          
        })
        .catch((error) => console.log('error', error))
      }

      const editKelas = (ju) => {
        modeForm.value = "Edit"
        formAvailable.value = true
        formState.form.nama_kelas = ju.nama_kelas
        formState.form.id_kelas = ju.id_kelas
      }
       const clearAndRefreshForm = (result) => {
        alert(result.data.message);
        showFormKelas(false)

        formState.form = {
          nama_kelas:"",
          
        }
        getKelas()
        
      }

      onMounted(()=>{
        getKelas()
        
      })

      return {
        kelas, formAvailable, ...formState, modeForm,
        getKelas, showFormKelas, saveKelas, deleteKelas, editKelas, clearAndRefreshForm
      }
    }
  }

</script>