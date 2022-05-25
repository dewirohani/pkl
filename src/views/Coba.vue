<template>
  <div class="edit-form">
    <h4>Data Jurusan</h4>
    <form>
      <div class="form-group">
        <label for="title">Nama Jurusan</label>
        <input type="text" class="form-control" id="title"
          v-model="jurusan.title"
        />
      </div>
    </form>
    <button type="button" class="btn btn-sm btn-warning" @click="$emit(jurusan)">Edit</button>
            &nbsp;
    <button type="button" class="btn btn-sm btn-danger" @click="$emit(jurusan)">Hapus</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      jurusan: null,
     
    };
  },
  methods: {
    getJurusan(id) {
      TutorialDataService.get(id)
        .then(response => {
          this.jurusan = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
   
  mounted() {
    
    this.getJurusan(this.$route.params.id);
  }
}
}
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>