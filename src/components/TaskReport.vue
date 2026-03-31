<template>
  <div class="card border-primary mb-4 shadow-sm">
    <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
      <h5 class="mb-0">Daily Performance Report</h5>
      <input type="date" v-model="reportDate" @change="getReport" class="form-control form-control-sm w-auto">
    </div>
    <div class="card-body">
    <div v-if="report" class="row text-center">
  <div class="col-md-4">
    <h4>High</h4>
    <p>Done: {{ report.summary.high.done }}</p>
    <p>Pending: {{ report.summary.high.pending }}</p>
        <p>In Progress: {{ report.summary.high.in_progress }}</p>

  </div>

  <div class="col-md-4">
    <h4>Medium</h4>
    <p>Done: {{ report.summary.medium.done }}</p>
    <p>Pending: {{ report.summary.medium.pending }}</p>
            <p>In Progress: {{ report.summary.medium.in_progress }}</p>

  </div>

  <div class="col-md-4">
    <h4>Low</h4>
    <p>Done: {{ report.summary.low.done }}</p>
    <p>Pending: {{ report.summary.low.pending }}</p>
    <p>In Progress: {{ report.summary.low.in_progress }}</p>
  </div>
</div>
      <div v-else class="text-center py-3">
        <span class="spinner-border spinner-border-sm text-primary"></span> Loading stats...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
 import api from '../views/services/api'

const reportDate = ref(new Date().toISOString().split('T')[0]);
const report = ref(null);
  const getReport = async () => {
  try {
    const res = await api.get('/tasks/report', {
      params: {
        date: reportDate.value
      }
    });

    report.value = res.data;
  } catch (err) {
    console.error("Report Error:", err);
  }
};
onMounted(getReport);
</script>