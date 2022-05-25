<template>
  <!-- <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
    
    </div>
  </div> -->
  <!-- <main class="mt-0 main-content main-content-bg">
    <section> -->
      <!-- <div class="page-header min-vh-75"> -->
      <div class="container">
        <!-- <div class="card mb-3 mt-5" style="background-color:aqua"> -->
        <div class="row">
          <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
            <div class="mt-6 card card-plain">
              <div class="pb-0 card-header text-start">
                <h3 class="font-weight-bolder text-dark text-gradient">
                  LOGIN
                </h3>
                <p class="mb-0">Enter your username and password to sign in</p>
                <div class="card-body">
                  <form role="form" class="text-start">
                    <label>Username</label>
                    <!-- <vsud-input
                      id="username"
                      type="text"
                      placeholder="username"
                      name="username"
                    /> -->
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control form-control-user"
                        id="username"
                        placeholder="Username"
                      />
                    </div>
                    <label>Password</label>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        id="password"
                        placeholder="Password"
                      />
                    </div>
                    <vsud-switch id="rememberMe" name="rememberMe" checked>
                      Remember me
                    </vsud-switch>
                    <div class="text-center">
                      <vsud-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="dark"
                        full-width
                        >Sign in
                      </vsud-button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
      <!-- </div> -->
    <!-- </section>
  </main> -->
</template>

<script>
// import VsudInput from "@/components/VsudInput.vue";
import VsudSwitch from "@/components/VsudSwitch.vue";
import VsudButton from "@/components/VsudButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";

export default {
  name: "SignIn",
  components: {
    // VsudInput,
    VsudSwitch,
    VsudButton,
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
  },
};
</script>
