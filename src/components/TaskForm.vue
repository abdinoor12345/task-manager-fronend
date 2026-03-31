 <template>
  <div class="card shadow-sm mb-4">
    <div class="card-body">
      <h5 class="card-title mb-3">Create New Task</h5>
      
      <form @submit.prevent="handleCreate">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label small fw-bold">Task Title</label>
            <input 
              type="text" 
              class="form-control" 
              :class="{ 'is-invalid': errors.title }"
              v-model="form.title" 
              placeholder="e.g., Update API Documentation"
            >
            <div v-if="errors.title" class="invalid-feedback">
              {{ errors.title[0] }}
            </div>
          </div>

          <div class="col-md-3">
            <label class="form-label small fw-bold">Due Date</label>
            <input 
              type="date" 
              class="form-control" 
              :class="{ 'is-invalid': errors.due_date }"
              v-model="form.due_date"
            >
            <div v-if="errors.due_date" class="invalid-feedback">
              {{ errors.due_date[0] }}
            </div>
          </div>

          <div class="col-md-3">
            <label class="form-label small fw-bold">Priority Level</label>
            <select 
              class="form-select" 
              :class="{ 'is-invalid': errors.priority }"
              v-model="form.priority"
            >
              <option value="" disabled>Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div v-if="errors.priority" class="invalid-feedback">
              {{ errors.priority[0] }}
            </div>
          </div>

          <div class="col-md-2 d-flex align-items-end">
            <button 
              type="submit" 
              class="btn btn-primary w-100" 
              :disabled="loading"
            >
              <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
              {{ loading ? 'Saving...' : 'Add Task' }}
            </button>
          </div>
        </div>
      </form>

      <div v-if="errorMessage" class="alert alert-danger mt-3 py-2 small">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

 <script>
import api from '../views/services/api'

export default {
  name: 'CreateTask',
  data() {
    return {
      form: {
        title: '',
        due_date: new Date().toISOString().split('T')[0],
        priority: ''
      },
      loading: false,
      errors: {},
      errorMessage: null
    }
  },
  methods: {
    async handleCreate() {
      this.loading = true;
      this.errors = {};
      this.errorMessage = null;

      try {
         await api.post('/tasks', this.form);
        
        this.$emit('task-added');
        this.resetForm();
      } catch (err) {
        if (err.response && err.response.status === 422) {
          this.errors = err.response.data.errors;
        } else {
          this.errorMessage = "Server connection failed. Check if Laravel is running.";
          console.error("Task Creation Error:", err);
        }
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.form.title = '';
      this.form.priority = '';
      this.form.due_date = new Date().toISOString().split('T')[0];
    }
  }
}
</script>