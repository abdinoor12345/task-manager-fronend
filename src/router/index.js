import { createRouter, createWebHistory } from 'vue-router'
  import TaskReport from '@/components/TaskReport.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   
    {
     path: '/tasklist',
    name: 'tasklist',
      component: ()=>import('../components/TaskList.vue')

    },
    {
      path: '/taskreport',
      name: 'taskreport',
      component: TaskReport
      
    }
    
  ],
})

export default router
