<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-0">
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">Please enter your login and password!</p>
                <form @submit.prevent="login">
                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input v-model="email" type="email" id="typeEmailX" class="form-control form-control-lg" />
                  <label class="form-label" for="typeEmailX">Email</label>
                </div>
                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input v-model="password" type="password" id="typePasswordX" class="form-control form-control-lg" />
                  <label class="form-label" for="typePasswordX">Password</label>
                </div>
                <button type="submit" class="btn btn-outline-light btn-lg px-5">Login</button>
              </form>
              </div>
              <p v-if="error" class="text-danger mt-3">{{ error }}</p>
              <div>
                <p class="mb-0">Don't have an account?
                  <router-link to="/register" class="text-white-50 fw-bold">Register</router-link>
                </p>
              </div>
              <div>
                <p class="small pt-3 pb-lg-2"><a class="text-white-50">Forgot password? Please contact a manager.</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      this.error = null;

      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email: this.email,
          password: this.password,
        });
        //Save token to local storage. Can change to sessionStorage if needed.
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        this.$router.push("/home");
      } catch (err) {
        this.error =
          err.response?.data?.error || "Login failed. Please try again.";
        console.error("Login Error:", this.error);
      }
    },
  },
};

</script>