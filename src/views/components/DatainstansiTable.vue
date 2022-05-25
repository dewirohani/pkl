<template>
  <td>{{ instansi.id }}</td>
  <td>{{ instansi.nama_instansi }}</td>
  <td>{{ instansi.alamat }}</td>
  <td>{{ instansi.kecamatan }}</td>
  <td>{{ instansi.kota }}</td>
  <td>{{ instansi.nama_pembimbing }}</td>
  <td>{{ instansi.kontak }}</td>
  <td>{{ instansi.kuota }}</td>
  <td>{{ instansi.guru }}</td>
  <td>
    <button
      type="button"
      class="btn-outline-warning"
      @click="$emit('edit-instansi', instansi)"
    >
      <ion-icon name="pencil-outline"></ion-icon>
    </button>
    &nbsp;
    <button
      type="button"
      class="btn-outline-danger"
      @click="$emit('delete-instansi', instansi)"
    >
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  </td>
</template>

<script>
export default {
  props: {
    instansi: {
      type: Object,
      required: true,
    },
  },
};
</script>
