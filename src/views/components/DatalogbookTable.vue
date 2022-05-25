<template>
  <td>{{ logbook.id }}</td>
  <td>{{ logbook.nama_siswa }}</td>
  <td>{{ logbook.nama_guru }}</td>
  <td>{{ logbook.tanggal }}</td>
  <td>{{ logbook.waktu_mulai }}</td>
  <td>{{ logbook.waktu_berakhir }}</td>
  <td>{{ logbook.kegiatan }}</td>
  <td>
    <button
      type="button"
      class="btn-outline-warning"
      @click="$emit('edit-logbook', logbook)"
    >
      <ion-icon name="pencil-outline"></ion-icon>
    </button>
    &nbsp;
    <button
      type="button"
      class="btn-outline-danger"
      @click="$emit('delete-logbook', logbook)"
    >
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  </td>
</template>

<script>
export default {
  props: {
    logbook: {
      type: Object,
      required: true,
    },
  },
};
</script>
