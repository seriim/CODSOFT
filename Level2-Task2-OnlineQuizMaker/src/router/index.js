import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import QuizCreation from '../views/QuizCreation.vue';
import QuizzesList from '../views/QuizzesList.vue';
import QuizTaking from '../views/QuizTaking.vue';
import QuizResults from '../views/QuizResults.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';

const routes = [
  { path: '/', name: 'home-page', component: HomePage }, // homepage that shows all quizzes
  { path: '/create',name: 'quiz-creation', component: QuizCreation },
  { path: '/quizzes', component: QuizzesList },
  { path: '/quiz/:id/take', component: QuizTaking },
  { path: '/quiz/:id/results', name: 'quiz-results', component: QuizResults },
  {path: '/:catchAll(.*)', redirect: '/',}, // Redirect to Home if the URL is not matched
  { path: '/login', name:'login', component: LoginPage },
  { path: '/register',name:'register', component: RegisterPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
