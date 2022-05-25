import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Tables from "@/views/Tables.vue";
import Billing from "@/views/Billing.vue";
import VirtualReality from "@/views/VirtualReality.vue";
import Profile from "@/views/Profile.vue";
import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";

import DataSiswa from "@/views/DataSiswa.vue";
import DataGuru from "@/views/DataGuru.vue";
import DataJurusan from "@/views/DataJurusan.vue";
import DataKelas from "@/views/DataKelas.vue";
import DataInstansi from "@/views/DataInstansi.vue";
import DataLogbook from "@/views/DataLogbook.vue";
import InputPengajuanPKL from "@/views/InputPengajuanPKL.vue";
import InputCertificate from "@/views/InputCertificate.vue";
import DataCertificate from "@/views/DataCertificate.vue";
import DataAttandance from "@/views/DataAttandance.vue";
import DataPengajuanPKL from "@/views/DataPengajuanPKL.vue";
import DataPenempatan from "@/views/DataPenempatan.vue";
import DataPeriode from "@/views/DataPeriode.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/rtl-page",
    name: "Rtl",
    component: Rtl,
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
  {
    path: "/data-siswa",
    name: "DataSiswa",
    component: DataSiswa,
  },
  {
    path: "/data-guru",
    name: "DataGuru",
    component: DataGuru,
  },
  {
    path: "/data-jurusan",
    name: "DataJurusan",
    component: DataJurusan,
  },
  {
    path: "/data-kelas",
    name: "DataKelas",
    component: DataKelas,
  },
  {
    path: "/data-instansi",
    name: "DataInstansi",
    component: DataInstansi,
  },
  {
    path: "/data-logbook",
    name: "DataLogbook",
    component: DataLogbook,
  },
  {
    path: "/input-pengajuan-pkl",
    name: "InputPengajuanPKL",
    component: InputPengajuanPKL,
  },
  {
    path: "/input-sertifikat",
    name: "InputCertificate",
    component: InputCertificate,
  },
  {
    path: "/data-sertifikiat",
    name: "DataCertificate",
    component: DataCertificate,
  },
  {
    path: "/data-attandance",
    name: "DataAttandance",
    component: DataAttandance,
  },
  {
    path: "/data-pengajuan-pkl",
    name: "DataPengajuanPKL",
    component: DataPengajuanPKL,
  },
  {
    path: "/data-penempatan-pkl",
    name: "DataPenempatan",
    component: DataPenempatan,
  },
  {
    path: "/data-periode",
    name: "DataPeriode",
    component: DataPeriode,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
