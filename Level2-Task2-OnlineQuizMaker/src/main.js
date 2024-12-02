import { createApp } from 'vue'
import App from './App.vue'
import './styles/styles.css';
import './styles/homePage.css';
import './styles/loginPage.css';
import './styles/registerPage.css';
import './styles/quizCreation.css';
import './styles/quizResults.css';
import './styles/quizTaking.css';
import './styles/quizzesList.css';


import router from './router';

createApp(App)
    .use(router)
    .mount('#app');
