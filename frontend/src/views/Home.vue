<template>
  <section class="d-flex flex-column align-items-center justify-content-center vh-100">
    <!-- Display Users Name -->
    <div class="mb-3">
      <h1>Welcome, {{ username }}!</h1>
    </div>
    <!-- Display Current Time -->
    <div class="mb-3"> 
      <h2>Current Time (EST): {{ currentTime }}</h2>
    </div>
    <!-- Clock In Button -->
    <div>
      <!-- :disabled="!isClockedIn" for the clock out button-->
      <button @click="clockIn" :disabled="isClockedIn" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-dark btn-lg px-5 uniform-btn clockin-btn" type="submit">
        Clock In
      </button>
    </div>
    <!-- Clock Out Button --><!-- :disabled="!isClockedIn" for the clock out button-->
    <div class="mt-3">
      <button @click="clockOut" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-dark btn-lg px-5 uniform-btn clockout-btn" type="submit">
        Clock Out
      </button>
    </div>
    <div v-if="clockedInTime" class="mt-4 clock-msg"><p>{{ clockedInTime }}</p></div>
  </section>
</template>

<script>
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "Home",
  setup() {
    const currentTime = ref("");
    const username = ref("");
    const isClockedIn = ref(false);
    const clockedInTime = ref("");
    
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

      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        username.value = user.name;
      }

      // Fetch clock-in status from the backend when the user returns to the page
      const fetchClockInStatus = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/api/time/status", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.clocked_in) {
      isClockedIn.value = true;

      // Get the actual timestamp from the backend
      const clockInRaw = response.data.time_entry.clock_in;
      const clockInTime = new Date(clockInRaw);

      // Format it nicely
      clockedInTime.value = `Clocked in at: ${clockInTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })}`;
    } else {
      isClockedIn.value = false;
      clockedInTime.value = "";
    }
  } catch (err) {
    console.error("Failed to fetch clock-in status", err);
  }
};

      fetchClockInStatus();
    });

    // Cleanup on unmount
    onUnmounted(() => clearInterval(interval));

    const clockIn = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post("http://localhost:5000/api/time/clockin", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      isClockedIn.value = true;
      clockedInTime.value = `Clocked in at: ${new Date(response.data.clock_in).toLocaleTimeString()}`;
    } else {
      console.error("Unexpected response:", response);
      clockedInTime.value = "Clock in failed.";
    }
  } catch (err) {
    console.error("Clock In Error:", err.response?.data || err);
    clockedInTime.value = `Clock in failed: ${err.response?.data?.error || err.message}`;
  }
};

const clockOut = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post("http://localhost:5000/api/time/clockout", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      isClockedIn.value = false;
      clockedInTime.value = `Clocked out at: ${new Date(response.data.clock_out).toLocaleTimeString()}`;
    } else {
      console.error("Unexpected response:", response);
      clockedInTime.value = "Clock out failed.";
    }
  } catch (err) {
    console.error("Clock Out Error:", err.response?.data || err);
    clockedInTime.value = `Clock out failed: ${err.response?.data?.error || err.message}`;
  }
};

    return { currentTime, username, clockIn, clockOut, isClockedIn, clockedInTime };
  },
};
</script>
