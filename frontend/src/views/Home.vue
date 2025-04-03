<template>
  <section class="d-flex flex-column align-items-center justify-content-center vh-100">
    <!-- Display Current Time -->
    <div class="mb-3">
      <h2>Current Time (EST): {{ currentTime }}</h2>
    </div>

    <!-- Clock In Button -->
    <div>
      <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">
        Clock In
      </button>
    </div>

    <!-- Clock Out Button -->
    <div class="mt-3">
      <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">
        Clock Out
      </button>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "Home",
  setup() {
    const currentTime = ref("");

    // Function to update time
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: "America/New_York", hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" };
      currentTime.value = new Intl.DateTimeFormat("en-US", options).format(now);
    };

    // Update time every second
    let interval;
    onMounted(() => {
      updateTime();
      interval = setInterval(updateTime, 1000);
    });

    // Cleanup on unmount
    onUnmounted(() => {
      clearInterval(interval);
    });

    return { currentTime };
  },
};
</script>

