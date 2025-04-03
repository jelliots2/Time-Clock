<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg bg-secondary">
    <!-- Container wrapper -->
    <div class="container-fluid">
      <!-- Collapsible wrapper -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
        </ul>
        <!-- Left links -->
      </div>
      <!-- Collapsible wrapper -->

      <!-- Right elements -->
      <div class="d-flex align-items-center">
        <!-- Avatar -->
        <div v-if="isLoggedIn" class="dropdown">
          <a data-mdb-dropdown-init class="dropdown-toggle d-flex align-items-center hidden-arrow" href="#"
            id="navbarDropdownMenuAvatar" role="button" aria-expanded="false">
            <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" class="rounded-circle" height="25"
              alt="Black and White Portrait of a Man" loading="lazy" />
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
            <li>
              <a class="dropdown-item" href="#">My profile</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">Settings</a>
            </li>
            <li>
              <a class="dropdown-item" href="#" @click="logout">Logout</a>
            </li>
          </ul>
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
      <!-- Right elements -->
    </div>
    <!-- Container wrapper -->
  </nav>
  <!-- Navbar -->
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "NavBar",
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(localStorage.getItem("token") !== null);  // Check if user is logged in
    const showModal = ref(false); // Track if modal should be shown

    // Logout function to remove the token from localStorage
    const logout = () => {
      localStorage.removeItem("token");
      isLoggedIn.value = false;
      router.push("/login");
    };

    // Functions to open and close the modal
    const openLoginModal = () => {
      showModal.value = true;
      // Switch between login and register forms based on user choice
    };

    const openRegisterModal = () => {
      showModal.value = true;
      // Switch between login and register forms based on user choice
    };

    const closeModal = () => {
      showModal.value = false;
    };

    return {
      isLoggedIn,
      logout,
      openLoginModal,
      openRegisterModal,
      closeModal,
      showModal,
    };
  },
};
</script>


