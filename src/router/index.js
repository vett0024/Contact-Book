import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactDetailView from '../views/ContactDetailView.vue'
import NewContactView from '../views/NewContactView.vue'
import EditContactView from '../views/EditContactView.vue'

const routes = [
  { path: '/',            component: HomeView },
  { path: '/contact/:id', component: ContactDetailView },
  { path: '/new',         component: NewContactView },
  { path: '/edit/:id',    component: EditContactView },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
