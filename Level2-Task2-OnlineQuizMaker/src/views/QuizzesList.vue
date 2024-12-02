<template>
  <div class="quizzes-list">
    <h1>Available Quizzes</h1>
    <div class="quiz-items-container">
      <div v-for="quiz in quizzes" :key="quiz.id" class="quiz-item">
        <div class="quiz-item-header">
          <h2>{{ quiz.title }}</h2>
          <router-link :to="`/quiz/${quiz.id}/take`">
            <button class="take-quiz-btn">Take Quiz</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      quizzes: [], // Array to hold quizzes
    };
  },
  created() {
    this.fetchQuizzes(); // Fetch quizzes when the component is created
  },
  methods: {
    fetchQuizzes() {
      const quizzes = JSON.parse(localStorage.getItem('quizzes')) || []; // Fetch quizzes from localStorage
      const uniqueQuizzes = [];

      quizzes.forEach((quiz) => {
        // Check if the quiz has a title and questions, and ensure no duplicates
        if (quiz.title && quiz.questions.length) {
          // Check if this quiz is already in the uniqueQuizzes array
          const isDuplicate = uniqueQuizzes.some(existingQuiz => existingQuiz.id === quiz.id);
          
          if (!isDuplicate) {
            uniqueQuizzes.push(quiz); // Add unique quiz to the list
          }
        }
      });

      this.quizzes = uniqueQuizzes; // Assign the filtered list of unique quizzes
    },
  },
};
</script>

<style scoped>
.quizzes-list {
    max-width: 100%;
    margin: 50px auto;
    padding: 30px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    overflow-x: hidden; /* Prevent horizontal scrolling */
  }
  
  h1 {
    font-size: 2rem;
    color: #1e88e5;
    margin-bottom: 30px;
    text-align: center;
  }
  
  .quiz-items-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two items per row */
    gap: 30px;
  }
  
  .quiz-item {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .quiz-item-header {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  
  .quiz-item-header h2 {
    font-size: 1.5rem;
    color: #333;
  }
  
  .take-quiz-btn {
    background-color: #1e88e5;
    color: white;
    padding: 12px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    text-align: center;
    transition: background-color 0.3s;
    margin-top: 20px; /* Ensure button is separated from the quiz item content */
  }
  
  .take-quiz-btn:hover {
    background-color: #1565c0;
  }
  
  /* Responsive Layout for Mobile and Tablets */
  @media (max-width: 768px) {
    .quizzes-list {
      padding: 40px 20px;
    }
  
    h1 {
      font-size: 2.4rem;
    }
  
    .quiz-items-container {
      grid-template-columns: 1fr; /* Stack items on smaller screens */
    }
  
    .take-quiz-btn {
      width: 80%; /* Ensure the button is more prominent on mobile */
    }
  }
  
  @media (max-width: 480px) {
    .quizzes-list {
      padding: 30px 15px;
    }
  
    h1 {
      font-size: 1.8rem;
    }
  
    .take-quiz-btn {
      width: 100%; /* Full-width button for very small screens */
    }
  }
</style>

