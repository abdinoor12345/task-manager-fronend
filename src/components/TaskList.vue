 <template>
  <div class="card shadow-sm mt-3">
    <div class="card-body">
      <div v-if="loading" class="text-center p-4 text-secondary">
        <div class="spinner-border spinner-border-sm me-2"></div> Loading tasks...
      </div>

      <div v-else-if="tasks.length === 0" class="alert alert-info">
        No tasks found.
      </div>

      <div v-else class="table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>Title</th>
              <th>Priority</th>
              <th>Status (Click to Edit)</th>
              <th>Due Date</th>
              <th class="text-center">Actions(only completed tasks)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.id">
              <td class="fw-bold">{{ task.title }}</td>
              <td>
                <span class="badge" 
                  :class="{
                    'bg-danger': task.priority === 'high',
                    'bg-warning text-dark': task.priority === 'medium',
                    'bg-success': task.priority === 'low'
                  }">
                  {{ task.priority }}
                </span>
              </td>
              <td>
                <button 
                  @click="advanceStatus(task)" 
                  class="btn btn-sm w-100"
                  :disabled="task.status === 'done'"
                  :class="{
                    'btn-outline-secondary': task.status === 'pending',
                    'btn-outline-primary': task.status === 'in_progress',
                    'btn-success text-white': task.status === 'done'
                  }">
                  {{ task.status.replace('_', ' ') }}
                </button>
              </td>
              <td>{{ formatDate(task.due_date) }}</td>
              <td class="text-center">
                <button 
                  @click="deleteTask(task.id)" 
                  class="btn btn-sm btn-outline-danger"
                  :disabled="task.status !== 'done'"
                  title="Only completed tasks can be deleted">
                  Delete
                </button>
                
              </td>
              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../views/services/api'

export default {
  data() {
    return {
      tasks: [],
      loading: true
    }
  },
  mounted() {
    this.fetchTasks()
  },
  methods: {
     fetchTasks() {
      this.loading = true;
      api.get('/tasks')
        .then(response => {
          this.tasks = response.data
        })
        .catch(error => console.error("Fetch Error:", error))
        .finally(() => this.loading = false)
    },

     async advanceStatus(task) {
      let nextStatus = '';
      if (task.status === 'pending') nextStatus = 'in_progress';
      else if (task.status === 'in_progress') nextStatus = 'done';
      else return;  
      try {
         await api.patch(`/tasks/${task.id}/status`, { status: nextStatus });
        this.fetchTasks(); // Refresh the UI
      } catch (error) {
        alert("Could not update status.");
        console.error(error);
      }
    },

     async deleteTask(id) {
      if (!confirm("Are you sure you want to delete this completed task?")) return;

      try {
        await api.delete(`/tasks/${id}`);
        this.fetchTasks(); 
        alert("Task deleted successfully.");
      } catch (error) {
         const msg = error.response?.data?.message || "Delete failed.";
        alert(msg);
      }
    },

     formatDate(dateString) {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      });
    }
  }
}
</script>