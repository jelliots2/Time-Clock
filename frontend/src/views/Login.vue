<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-0">
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">Please enter your pin!</p>
                <form @submit.prevent="login">
                  <div class="form-outline form-white mb-4">
                    <input v-model="pinCode" type="text" id="typePinX" class="form-control form-control-lg" maxlength="4" required />
                    <label class="form-label" for="typePinX">Pin Code</label>
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
                <p class="small pt-3 pb-lg-2"><a class="text-white-50">Forgot pin? Loser... Please contact a manager.</a></p>
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
import { ref } from "vue";
import { useRouter } from "vue-router";  // For routing

export default {
  name: "Login",
  setup() {
    const pinCode = ref("");
    const error = ref("");
    const router = useRouter();  // Initialize Vue Router

    const login = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          pin_code: pinCode.value,  // Sending pin_code
        });

        // Store the token and user info in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to the home page using Vue Router
        router.push("/home");  // Use Vue Router to navigate to the home page
      } catch (err) {
        console.error("Login failed:", err);
        error.value = "Invalid pin code or user not found";
      }
    };

    return { pinCode, login, error };
  },
};
</script>
