<template>
  <td>{{ sertifikat.id }}</td>
  <td>{{ sertifikat.nama_siswa }}</td>
  <td>{{ sertifikat.guru_pembimbing }}</td>
  <td>{{ sertifikat.sertifikat }}</td>
  <td>
    <button
      type="button"
      class="btn-outline-warning"
      @click="$emit('edit-sertifikat', sertifikat)"
    >
      <ion-icon name="pencil-outline"></ion-icon>
    </button>
    &nbsp;
    <button
      type="button"
      class="btn-outline-danger"
      @click="$emit('delete-sertifikat', sertifikat)"
    >
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  </td>
</template>

<script>
export default {
  props: {
    sertifikat: {
      type: Object,
      required: true,
    },
  },
};
</script>
