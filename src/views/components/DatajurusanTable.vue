<template>
  <td>{{ jurusan.id }}</td>
  <td>{{ jurusan.nama_jurusan }}</td>
  <td>{{ jurusan.keterangan }}</td>
  <td>
    <button
      type="button"
      class="btn-outline-warning"
      @click="$emit('edit-jurusan', jurusan)"
    >
      <ion-icon name="pencil-outline"></ion-icon>
    </button>
    &nbsp;
    <button
      type="button"
      class="btn-outline-danger"
      @click="$emit('delete-jurusan', jurusan)"
    >
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  </td>
</template>

<script>
export default {
  props: {
    jurusan: {
      type: Object,
      required: true,
    },
  },
};
</script>
