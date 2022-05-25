<template>
  <td>{{ kelas.id }}</td>
  <td>{{ kelas.nama_kelas }}</td>
  <td>{{ kelas.jurusan }}</td>
  <td>{{ kelas.jumlah_siswa }}</td>
  <td>{{ kelas.keterangan }}</td>
  <td>
    <button
      type="button"
      class="btn-outline-warning"
      @click="$emit('edit-kelas', kelas)"
    >
      <ion-icon name="pencil-outline"></ion-icon>
    </button>
    &nbsp;
    <button
      type="button"
      class="btn-outline-danger"
      @click="$emit('delete-kelas', kelas)"
    >
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  </td>
</template>

<script>
export default {
  props: {
    kelas: {
      type: Object,
      required: true,
    },
  },
};
</script>
