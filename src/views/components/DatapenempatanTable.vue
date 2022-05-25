<template>
  <td>{{ penempatan.id }}</td>
  <td>{{ penempatan.nama_siswa }}</td>
  <td>{{ penempatan.periode }}</td>
  <td>{{ penempatan.nama_guru }}</td>
  <td>{{ penempatan.kelas }}</td>
  <td>{{ penempatan.jurusan }}</td>
  <td>
    <button
      type="button"
      class="btn-outline-warning"
      @click="$emit('edit-penempatan', penempatan)"
    >
      <ion-icon name="pencil-outline"></ion-icon>
    </button>
    &nbsp;
    <button
      type="button"
      class="btn-outline-danger"
      @click="$emit('delete-penempatan', penempatan)"
    >
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  </td>
</template>

<script>
export default {
  props: {
    penempatan: {
      type: Object,
      required: true,
    },
  },
};
</script>
