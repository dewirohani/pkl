<template>
  <td>{{ siswa.id }}</td>
  <td>{{ siswa.nis }}</td>
  <td>{{ siswa.nama_siswa }}</td>
  <td>{{ siswa.kelas }}</td>
  <td>{{ siswa.jurusan }}</td>
  <td>{{ siswa.alamat }}</td>
  <td>{{ siswa.tempat_lahir }}</td>
  <td>{{ siswa.tanggal_lahir }}</td>
  <td>{{ siswa.jenis_kelamin }}</td>
  <td>{{ siswa.agama }}</td>
  <td>{{ siswa.no_hp }}</td>
  <td>{{ siswa.tahun_masuk }}</td>
  <td>
    <button
      type="button"
      class="btn-outline-warning"
      @click="$emit('edit-siswa', siswa)"
    >
      <ion-icon name="pencil-outline"></ion-icon>
    </button>
    &nbsp;
    <button
      type="button"
      class="btn-outline-danger"
      @click="$emit('delete-siswa', siswa)"
    >
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  </td>
</template>

<script>
export default {
  props: {
    siswa: {
      type: Object,
      required: true,
    },
  },
};
</script>
