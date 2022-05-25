<template>
  <td>{{ attandance.id }}</td>
  <td>{{ attandance.nama_siswa }}</td>
  <td>{{ attandance.tanggal }}</td>
  <td>{{ attandance.waktu }}</td>
  <td>{{ attandance.lokasi }}</td>
  <td>{{ attandance.foto }}</td>
  <td>{{ attandance.signature }}</td>
  <td>
    <button
      type="button"
      class="btn-outline-warning"
      @click="$emit('edit-attandance', attandance)"
    >
      <ion-icon name="pencil-outline"></ion-icon>
    </button>
    &nbsp;
    <button
      type="button"
      class="btn-outline-danger"
      @click="$emit('delete-attandance', attandance)"
    >
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  </td>
</template>

<script>
export default {
  props: {
    attandance: {
      type: Object,
      required: true,
    },
  },
};
</script>
