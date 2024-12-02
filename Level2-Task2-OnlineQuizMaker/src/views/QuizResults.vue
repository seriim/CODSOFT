<template>
  <div class="quiz-results">
    <div v-if="quizResults">
      <h1>Quiz Results</h1>
      <p>Score: {{ quizResults.score }} / {{ quizResults.totalQuestions }}</p>

      <div v-for="(result, index) in quizResults.answers" :key="index" class="result">
        <h3>{{ result.question }}</h3>
        <p>Your answer: <strong>{{ result.selectedAnswer }}</strong></p>
        <p v-if="result.isCorrect" class="correct">Correct</p>
        <p v-else class="incorrect">Incorrect. The correct answer is: <strong>{{ result.correctAnswer }}</strong></p>
      </div>

      <router-link to="/" class="back-home-btn">
        <button>Back to Home</button>
      </router-link>
    </div>

    <div v-else>
      <h2>No results found. Please take the quiz first.</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quizResults: null,
    };
  },
  created() {
    this.fetchResults();
    // Optionally clear results after viewing
    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('quizResults');
    });
  },
  methods: {
    fetchResults() {
      const results = localStorage.getItem('quizResults');
      if (results) {
        this.quizResults = JSON.parse(results);
      } else {
        console.error('No quiz results found');
        this.quizResults = null;
      }
    },
  },
};
</script>

<style scoped>

.quiz-results {
    max-width: 100%;
    margin: 50px auto;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    box-sizing: border-box;
  }
  
  h1 {
    font-size: 2.5rem;
    color: #1e88e5;
    font-weight: 600;
    margin-bottom: 20px;
  }
  
  .result {
    background-color: #f9f9f9;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .correct {
    color: green;
    font-weight: bold;
  }
  
  .incorrect {
    color: red;
    font-weight: bold;
  }
  
  button {
    background-color: #1e88e5;
    color: white;
    padding: 12px 25px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1.1rem;
    border: none;
    transition: background-color 0.3s, transform 0.2s ease;
    margin-top: 20px;
  }
  
  button:hover {
    background-color: #1565c0;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    .quiz-results {
      padding: 20px;
    }
  
    h1 {
      font-size: 2rem;
    }
  
    button {
      padding: 10px 20px;
    }
  }
  
  @media (max-width: 480px) {
    .quiz-results {
      padding: 20px 15px;
    }
  
    h1 {
      font-size: 1.8rem;
    }
  
    button {
      width: 90%; /* Full-width button for small screens */
    }
  }
  
</style>
