<template>
  <div class="quiz-taking">
    <div v-if="quiz.title && quiz.questions.length">
      <h1>{{ quiz.title }}</h1>
      
      <div v-if="currentQuestionIndex < quiz.questions.length">
        <h2>{{ quiz.questions[currentQuestionIndex].text }}</h2>
        
        <!-- Display answers with improved label selection -->
        <div
          v-for="(answer, index) in quiz.questions[currentQuestionIndex].answers"
          :key="index"
          class="answer-option"
          :class="{
            'selected': answer.text === quiz.questions[currentQuestionIndex].userAnswer,
            'incorrect': answer.text !== quiz.questions[currentQuestionIndex].userAnswer && questionError && quiz.questions[currentQuestionIndex].userAnswer && !quiz.questions[currentQuestionIndex].userAnswer === answer.text
          }"
          @click="selectAnswer(answer.text)"
        >
          <input
            type="radio"
            :id="`question-${currentQuestionIndex}-answer-${index}`"
            :name="`question-${currentQuestionIndex}`"
            :value="answer.text"
            v-model="quiz.questions[currentQuestionIndex].userAnswer"
            :disabled="false"
            class="radio-input"
          />
          <label :for="`question-${currentQuestionIndex}-answer-${index}`">{{ answer.text }}</label>
        </div>

        <!-- Show error message if no answer is selected -->
        <p v-if="questionError" class="error-message">Please select an answer before proceeding.</p>
        
        <button @click="nextQuestion" :disabled="!quiz.questions[currentQuestionIndex].userAnswer">
          {{ currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question' }}
        </button>
      </div>
      
      <div v-else>
        <!-- Show results button after all questions are answered -->
        <router-link :to="`/quiz/${quiz.id}/results`">
          <button class="see-results-btn">See Results</button>
        </router-link>
      </div>
    </div>

    <!-- Error Handling for Missing Quiz Data -->
    <div v-else>
      <h2>Quiz not found or data is missing. Please try again later.</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quiz: {
        title: '',
        questions: [],
        id: null,
      },
      currentQuestionIndex: 0,
      questionError: false,
    };
  },
  created() {
    this.fetchQuizData();
  },
  methods: {
    fetchQuizData() {
      const quizId = this.$route.params.id; // Get quiz ID from the URL
      const quizzes = JSON.parse(localStorage.getItem('quizzes')) || []; // Fetch quizzes from local storage
      const quiz = quizzes.find(q => q.id === parseInt(quizId)); // Find the quiz by ID
      
      if (quiz) {
        this.quiz = quiz; // Set the quiz data
      } else {
        this.quiz = { title: '', questions: [] }; // If quiz not found, set to empty
        console.error('Quiz not found in localStorage');
      }
    },
    nextQuestion() {
      if (this.quiz.questions[this.currentQuestionIndex].userAnswer) {
        this.questionError = false; // Clear error message if an answer is selected
        if (this.currentQuestionIndex < this.quiz.questions.length - 1) {
          this.currentQuestionIndex++;
        } else {
          // Calculate the score and save to localStorage
          const score = this.calculateScore();
          const results = {
            quizId: this.quiz.id,
            score: score,
            totalQuestions: this.quiz.questions.length,
            answers: this.quiz.questions.map(question => ({
              question: question.text,
              selectedAnswer: question.userAnswer,
              correctAnswer: question.correctAnswer, // Ensure the correct answer is saved
              isCorrect: this.compareAnswers(question.userAnswer, question.correctAnswer)
            }))
          };
          // Save the results in localStorage
          localStorage.setItem('quizResults', JSON.stringify(results));

          // Redirect to the results page
          this.$router.push(`/quiz/${this.quiz.id}/results`);
        }
      } else {
        this.questionError = true; // Show error if no answer is selected
      }
    },
    selectAnswer(answer) {
      // If the selected answer is already the current one, deselect it
      if (this.quiz.questions[this.currentQuestionIndex].userAnswer === answer) {
        this.quiz.questions[this.currentQuestionIndex].userAnswer = null;
      } else {
        // Otherwise, select the answer
        this.quiz.questions[this.currentQuestionIndex].userAnswer = answer;
      }
    },
    calculateScore() {
      let correctAnswers = 0;
      this.quiz.questions.forEach(question => {
        if (this.compareAnswers(question.userAnswer, question.correctAnswer)) {
          correctAnswers++;
        }
      });
      return correctAnswers;
    },
    compareAnswers(userAnswer, correctAnswer) {
      // Ensure both answers are strings and trim any whitespace
      return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    }
  },
};
</script>
<style scoped>
.quiz-taking { 
    max-width: 100%;
    margin: 50px auto;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease-out;
    box-sizing: border-box;
  }
  
  .quiz-taking:hover {
    transform: scale(1.02);
  }
  
  h1 {
    font-size: 2.5rem;
    color: #1e88e5;
    font-weight: 600;
    margin-bottom: 20px;
  }
  
  h2 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 20px;
  }
  
  .answer-option {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
    font-size: 1.1rem;
    padding: 5px 10px;
    position: relative;
    transition: background-color 0.3s ease, transform 0.3s ease;
    background-color: #f9f9f9; /* Add a grey background */
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .answer-option.selected {
    background-color: #cce4ff;
    transform: scale(1.05);
  }
  
  .answer-option.incorrect {
    background-color: #f8d7da;
  }
  
  input[type="radio"] {
    margin-right: 10px;
    position: absolute;
    opacity: 0;
  }
  
  input[type="radio"]:checked + label {
    color: #1e88e5;
  }
  
  label {
    cursor: pointer;
    transition: color 0.3s ease;
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
    width: 100%; /* Ensure button spans the full width */
  }
  
  button:hover {
    background-color: #1565c0;
    transform: translateY(-2px);
  }
  
  button:disabled {
    background-color: #e1e1e1;
    cursor: not-allowed;
  }
  
  .error-message {
    color: red;
    font-size: 1rem;
    margin-top: 10px;
  }
  
  .see-results-btn {
    background-color: #1e88e5;
    color: white;
    padding: 12px 25px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1.1rem;
    transition: background-color 0.3s, transform 0.2s ease;
    margin-top: 20px;
    width: 100%; /* Full-width button */
  }
  
  .see-results-btn:hover {
    background-color: #1565c0;
    transform: translateY(-2px);
  }
  
  /* Mobile and Tablet Responsiveness */

@media (max-width: 768px) {
    .quiz-taking {
      padding: 20px; /* Adjust padding for mobile */
    }
  
    h1 {
      font-size: 2rem;
    }
  
    h2 {
      font-size: 1.6rem;
    }
  
    .answer-option {
      font-size: 1rem;
      padding: 15px; /* More padding for better readability */
      margin: 10px 0;
      width: 93%; /* Ensure answer options take up full width */
    }
  
    button {
      padding: 12px 20px;
      width: 100%; /* Full-width button */
    }
  
    .error-message {
      font-size: 0.9rem;
    }
  }
  
  @media (max-width: 480px) {
    .quiz-taking {
      padding: 30px 0px;
    }
  
    h1 {
      font-size: 1.1rem;
    }
  
    h2 {
      font-size: .9rem;
    }
  
    .answer-option {
      font-size: 0.9rem;
      padding: 12px; /* Less padding for very small screens */
      margin: 10px 20px;
      max-width: 80%;
    }
  
    button {
      margin: 20px 10px;
      padding: 10px 20px;
      width: 90%; /* Ensure full-width button on very small screens */
    }
  }
  
</style>
