<template>
  <td>{{ periode.id }}</td>
  <td>{{ periode.nama_periode }}</td>
  <td>{{ periode.tanggal_mulai }}</td>
  <td>{{ periode.tanggal_berakhir }}</td>
  <td>{{ periode.status }}</td>
  <td>
    <button
      type="button"
      class="btn-outline-warning"
      @click="$emit('edit-periode', periode)"
    >
      <ion-icon name="pencil-outline"></ion-icon>
    </button>
    &nbsp;
    <button
      type="button"
      class="btn-outline-danger"
      @click="$emit('delete-periode', periode)"
    >
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  </td>
</template>

<script>
export default {
  props: {
    periode: {
      type: Object,
      required: true,
    },
  },
};
</script>
