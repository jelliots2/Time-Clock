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
                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input type="email" id="typeEmailX" class="form-control form-control-lg" />
                  <label class="form-label" for="typeEmailX">Email</label>
                </div>
                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input type="password" id="typePasswordX" class="form-control form-control-lg" />
                  <label class="form-label" for="typePasswordX">Password</label>
                </div>
                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5"
                  type="submit">Login</button>
              </div>
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
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      // Handle login logic here
      console.log("Login attempted with", this.email, this.password);
    },
  },
};
</script>