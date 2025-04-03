<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-0">
                <h2 class="fw-bold mb-2 text-uppercase">Register</h2>
                <p class="text-white-50 mb-5">Please enter your first and last name, email, and password</p>

                <form @submit.prevent="register">
                  <div class="form-outline form-white mb-4">
                    <input v-model="name" type="text" class="form-control form-control-lg" required />
                    <label class="form-label">Name</label>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input v-model="email" type="email" class="form-control form-control-lg" required />
                    <label class="form-label">Email</label>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input v-model="password" type="password" class="form-control form-control-lg" required />
                    <label class="form-label">Password</label>
                  </div>

                  <button class="btn btn-outline-light btn-lg px-5" type="submit">Register</button>
                </form>

                <div v-if="error" class="text-danger mt-3">{{ error }}</div>
                <div v-if="success" class="text-success mt-3">{{ success }}</div>

              </div>
              <div>
                <p class="small pt-3 pb-lg-2">
                  <a class="text-white-50">Trouble registering? Please contact a manager.</a>
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
  name: "RegisterPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: null,
      success: null,
    };
  },
  methods: {
    async register() {
      this.error = null;
      this.success = null;
      try {
        const response = await axios.post("http://localhost:5000/api/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        console.log("Register response:", response.data);

        if (response.data.id) {
          this.success = "Registration successful! Redirecting...";
          setTimeout(() => this.$router.push("/"), 2000);
        } else {
          this.error = response.data.message || "Registration failed.";
        }
      } catch (err) {
        this.error = err.response?.data?.message || "An error occurred.";
      }
    },
  }
};
</script>