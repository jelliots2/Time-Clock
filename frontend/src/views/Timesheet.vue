<template>
  <section class="container py-5">
    <h2 class="mb-4">My Timesheet</h2>

    <div v-if="loading">Loading entries...</div>
    <div v-else-if="error" class="text-danger">{{ error }}</div>

    <table v-else class="table table-dark table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>Clock In</th>
          <th>Clock Out</th>
          <th>Total Hours</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry.id">
          <td>{{ formatDate(entry.clock_in) }}</td>
          <td>{{ formatTime(entry.clock_in) }}</td>
          <td>{{ entry.clock_out ? formatTime(entry.clock_out) : "—" }}</td>
          <td>{{ entry.clock_out ? calculateTotalHours(entry.clock_in, entry.clock_out || 0) : "—" }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      entries: [],
      loading: true,
      error: null,
    };
  },
  async mounted() {
    try {
      const token = localStorage.getItem("token"); // or however you're storing it

      // Decode token to get userId (optional if your backend uses token user ID)
      const userId = JSON.parse(atob(token.split(".")[1])).id;

      const response = await axios.get(`http://localhost:5000/api/time/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.entries = response.data;
    } catch (err) {
      this.error = err.response?.data?.error || "Failed to load time entries";
    } finally {
      this.loading = false;
    }
  },
  methods: {
    formatDate(datetime) {
      return new Date(datetime).toLocaleDateString();
    },
    formatTime(datetime) {
      return new Date(datetime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    calculateTotalHours(clockIn, clockOut) {
      const inTime = new Date(clockIn);
      const outTime = new Date(clockOut);
      const diffMs = outTime - inTime;
      return (diffMs / 3600000).toFixed(2); // hours to 2 decimal places
    },
  },
};
</script>
