<template>
  <div id="app">
    <NavBar v-if="!isLoginPage" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  setup() {
    const route = useRoute();
    
    // Computed property to check if the current route is the login page
    const isLoginPage = computed(() => route.path === "/" || route.path === "/register");

    return {
      isLoginPage,
    };
  },
};
</script>

<style scoped>
main {
  padding: 20px;
}
</style>
