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
          <td>{{ entry.clock_out ? calculateTotalHours(entry.clock_in, entry.clock_out, entry.lunch_minutes || 0) : "—" }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
//This should be the right route
//http://localhost:5000/api/time/:userid
</script>
