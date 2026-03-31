 <template>
  <div class="bg-light min-vh-100">
    <Navbar />

    <main class="container my-4">
      <div class="card shadow-sm">
        <div class="card-body">
          <router-view />
          <h2 class="card-title mb-2">Daily Tasks</h2>
          <p class="text-muted mb-4">Manage your tasks efficiently</p>

          <TaskForm @task-added="refreshTasks"/>

          <TaskList ref="taskListRef"/> 
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import TaskList from './components/TaskList.vue'
import TaskForm from './components/TaskForm.vue'
import { ref } from 'vue'

 const taskListRef = ref(null)

function refreshTasks() {
   if (taskListRef.value) {
    taskListRef.value.fetchTasks()
  } else {
    console.error("Task list component not found or not loaded yet.")
  }
}
</script>