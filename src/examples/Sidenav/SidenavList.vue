<template>

  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-200 h-200"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav ">
      <li class="nav-item">
    
        <sidenav-collapse navText="Dashboard" :to="{ name: 'Dashboard' }">
          <template #icon>
            <shop />
          </template>
        </sidenav-collapse>
      </li>
       <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          MASTER
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Data Siswa" :to="{ name: 'DataSiswa' }">
          <template #icon>
            <box3d />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Data Guru" :to="{ name: 'DataGuru' }">
          <template #icon>
            <Box3d />
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse
          navText="Data Instansi"
          :to="{ name: 'DataInstansi' }"
        >
          <template #icon>
            <box3d />
          </template>
        </sidenav-collapse>
      </li>
       <li class="nav-item">
        <sidenav-collapse navText="Data Kelas" :to="{ name: 'DataKelas' }">
          <template #icon>
            <box3d />
          </template>
        </sidenav-collapse>
      </li>
       <li class="nav-item">
        <sidenav-collapse navText="Data Jurusan" :to="{ name: 'DataJurusan' }">
          <template #icon>
            <box3d />
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          PKL
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Periode PKL" :to="{ name: 'DataPeriode' }">
          <template #icon>
            <box3d />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Data PKL" :to="{ name: 'DataPengajuanPKL' }">
          <template #icon>
            <Box3d />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Data Penempatan" :to="{ name: 'DataPenempatan' }">
          <template #icon>
            <box3d />
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          ATTANDANCE
        </h6>
      </li>
        
      <li class="nav-item">
        <sidenav-collapse navText="Data Attandance" :to="{ name: 'DataAttandance' }">
          <template #icon>
            <box3d />
          </template>
        </sidenav-collapse>
      </li>
       <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          LOGBOOK
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Data Logbook" :to="{ name: 'DataLogbook' }">
          <template #icon>
            <box3d />
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          REPORT CERTIFICATE
        </h6>
      </li>
      
      <li class="nav-item">
        <sidenav-collapse navText="Data Certificate" :to="{ name: 'DataCertificate' }">
          <template #icon>
            <box3d />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Profile" :to="{ name: 'Profile' }">
          <template #icon>
            <customer-support />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Sign In" :to="{ name: 'Sign In' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Sign Up" :to="{ name: 'Sign Up' }">
          <template #icon>
            <spaceship />
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>

</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
import Shop from "../../components/Icon/Shop.vue";
// import Office from "../../components/Icon/Office.vue";
// import CreditCard from "../../components/Icon/CreditCard.vue";
import Box3d from "../../components/Icon/Box3d.vue";
import CustomerSupport from "../../components/Icon/CustomerSupport.vue";
import Document from "../../components/Icon/Document.vue";
import Spaceship from "../../components/Icon/Spaceship.vue";


export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "PKL SMKN 3 PAMEKASAN",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavCollapse,
    Shop,
    // Office,
    // CreditCard,
    Box3d,
    CustomerSupport,
    Document,
    Spaceship,
    
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
};
</script>
