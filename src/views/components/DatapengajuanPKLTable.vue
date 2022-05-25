<template>
  <td>{{ pengajuan_pkl.id }}</td>
  <td>{{ pengajuan_pkl.nama_siswa }}</td>
  <td>{{ pengajuan_pkl.periode }}</td>
  <td>{{ pengajuan_pkl.nama_instansi }}</td>
  <td>
    <button
      type="button"
      class="btn-outline-warning"
      @click="$emit('edit-pengajuan-pkl', pengajuan_pkl)"
    >
      <ion-icon name="pencil-outline"></ion-icon>
    </button>
    &nbsp;
    <button
      type="button"
      class="btn-outline-danger"
      @click="$emit('delete-pengajuan-pkl', pengajuan_pkl)"
    >
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  </td>
</template>

<script>
export default {
  props: {
    pengajuan_pkl: {
      type: Object,
      required: true,
    },
  },
};
</script>
