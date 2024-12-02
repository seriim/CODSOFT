<template>
  <div class="home-page">
    <!-- Welcome Section -->
    <div class="welcome-section">
      <h1>Welcome to Quiztrix</h1>
      <p>Your go-to quiz platform for creating and taking quizzes!</p>
      <div class="actions">
        <router-link to="/create">
          <button class="create-quiz-btn">Create a Quiz</button>
        </router-link>
        <router-link to="/quizzes">
          <button class="browse-quizzes-btn">Browse Quizzes</button>
        </router-link>
      </div>
    </div>

    <!-- Featured Quizzes Section -->
    <div class="featured-quizzes">
      <h2>Featured Quizzes</h2>
      <!-- Display quizzes stored in the featuredQuizzes array -->
      <div v-for="quiz in featuredQuizzes" :key="quiz.id" class="quiz-item">
        <h3>{{ quiz.title }}</h3>
        <!-- "Take Quiz" button, navigating to the quiz-taking page -->
        <router-link :to="`/quiz/${quiz.id}/take`">
          <button class="take-quiz-btn">Take Quiz</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quizzes: [], // Array to store all quizzes
      featuredQuizzes: [], // Array to store featured quizzes
    };
  },
  created() {
    this.fetchQuizzes(); // Fetch quizzes when the component is created
  },
  methods: {
    // Fetch quizzes from localStorage or an API
    fetchQuizzes() {
      const quizzes = JSON.parse(localStorage.getItem('quizzes')) || []; // Fetch quizzes from localStorage
      this.quizzes = quizzes;

      // Select the first 3 quizzes as featured (you can customize this logic)
      this.featuredQuizzes = quizzes.slice(0, 3); // Select first 3 quizzes
    },
  },
};
</script>

<style scoped>
.home-page {
  width: 800px;
  margin: 30px auto;
  padding: 60px 30px;
  background-color: #ffffff;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.welcome-section {
  margin-bottom: 60px;
}

h1 {
  font-size: 3rem;
  color: #1e88e5;
  font-weight: 600;
}

p {
  font-size: 1.3rem;
  margin-top: 15px;
  color: #555;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
}

button {
  background-color: #1e88e5;
  color: white;
  padding: 14px 30px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.1rem;
  border: none;
  transition: background-color 0.3s, transform 0.2s ease;
}

button:hover {
  background-color: #1565c0;
  transform: translateY(-2px);
}

.featured-quizzes {
  margin-top: 60px;
}

.quiz-item {
  margin: 30px 0;
  padding: 25px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.quiz-item:hover {
  transform: translateY(-5px);
}

.quiz-item h3 {
  font-size: 2rem;
  color: #333;
  font-weight: 600;
}

.take-quiz-btn {
  background-color: #1e88e5;
  color: white;
  padding: 12px 25px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.take-quiz-btn:hover {
  background-color: #1565c0;
  transform: translateY(-2px);
}
  
/* Media Queries for Responsiveness */
  
/* Tablet (small screens) */
@media (max-width: 768px) {
    .home-page {
      width: 100%;
      padding: 40px 20px; /* Adjust padding for tablet */
    }
  
    h1 {
      font-size: 2.4rem;
    }
  
    p {
      font-size: 1.1rem;
    }
  
    .actions {
      flex-direction: column; /* Stack buttons vertically */
      gap: 20px;
    }
  
    .quiz-item {
      margin: 20px 0;
      padding: 20px;
    }
  
    .quiz-item h3 {
      font-size: 1.6rem;
    }
  
    button {
      padding: 12px 25px;
      font-size: 1rem;
    }
  
    .take-quiz-btn {
      padding: 10px 20px;
      font-size: 1rem;
    }
}
  
/* Mobile (very small screens) */
@media (max-width: 480px) {
    .home-page {
        width: 90%; /* Full width */
        padding: 30px 15px; /* Adjust padding for mobile */
    }

    h1 {
        font-size: 1.8rem;
    }

    p {
        font-size: 1rem;
    }

    .actions {
        flex-direction: column; /* Stack buttons vertically */
        gap: 15px;
    }

    button {
        padding: 12px 20px;
        font-size: 0.9rem;
        margin: 10px;
    }

    .quiz-item {
        margin: 15px 0;
        padding: 15px;
    }

    .quiz-item h3 {
        font-size: 1.3rem;
    }

    .take-quiz-btn {
        padding: 10px 20px;
        font-size: 0.9rem;
    }
}
  
</style>


