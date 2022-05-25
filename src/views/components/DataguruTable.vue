<template>
  <td>{{ guru.id }}</td>
  <td>{{ guru.nip }}</td>
  <td>{{ guru.nama_guru }}</td>
  <td>{{ guru.alamat }}</td>
  <td>{{ guru.tempat_lahir }}</td>
  <td>{{ guru.tanggal_lahir }}</td>
  <td>{{ guru.jenis_kelamin }}</td>
  <td>{{ guru.agama }}</td>
  <td>{{ guru.no_hp }}</td>
  <td>
    <button
      type="button"
      class="btn-outline-warning"
      @click="$emit('edit-guru', guru)"
    >
      <ion-icon name="pencil-outline"></ion-icon>
    </button>
    &nbsp;
    <button
      type="button"
      class="btn-outline-danger"
      @click="$emit('delete-guru', guru)"
    >
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  </td>
</template>

<script>
export default {
  props: {
    guru: {
      type: Object,
      required: true,
    },
  },
};
</script>
