<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg">
    <!-- Container wrapper -->
    <div class="container-fluid">
      <!-- Navbar brand -->
      <a class="navbar-brand mt-2 mt-lg-0">
        <img src="C:\Users\jelli\TimeClock\Time-Clock\frontend\src\assets\STA_Logo1.png" height="50"
          alt="Sunken Treasure Aquatics Logo" loading="lazy" />
      </a>
      <!-- Left links -->
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/home">Home</router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/timesheet">Timesheet</router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/settings">Settings</router-link>
        </li>
        <li v-if="isAdmin">
          <router-link class="nav-link" to="/admin">Admin</router-link>
        </li>
      </ul>
      <!-- Right links -->
      <ul class="navbar-nav me-right mb-2 mb-lg-0">
        <li class="nav-item d-flex align-items-center pe-3">
          {{ username }}
        </li>
        <div class="d-flex align-items-center">
          <div v-if="isLoggedIn">
            <button @click="logout" class="btn btn-outline-dark logout-btn">Logout</button>
          </div>
          <div v-if="!isLoggedIn">
            <router-link to="/">
              <button class="btn">Login</button>
            </router-link>
            <router-link to="/register">
              <button class="btn">Register</button>
            </router-link>
          </div>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "NavBar",
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false);
    const isAdmin = ref(false);
    const username = ref("");

    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      isLoggedIn.value = !!token;

      if (user && user.is_admin) {
        isAdmin.value = true;
      } else {
        isAdmin.value = false;
      }
    };

    onMounted(() => {
      checkAuth();

      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        username.value = user.name;
      }
    });

    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      isLoggedIn.value = false;
      isAdmin.value = false;
      router.replace("/");
    };

    return {
      isLoggedIn,
      isAdmin,
      logout,
      username
    };
  },
};
</script>