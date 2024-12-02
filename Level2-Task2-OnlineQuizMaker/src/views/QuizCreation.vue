<template>
  <div class="quiz-creation-container">
    <div class="quiz-creation">
      <h1>Create Quiz</h1>
      <form @submit.prevent="submitQuiz">
        
        <!-- Quiz Title Input -->
        <div class="form-group">
          <label for="quiz-title">Quiz Title</label>
          <input
            id="quiz-title"
            type="text"
            v-model="quiz.title"
            placeholder="Enter quiz title"
            required
          />
        </div>

        <!-- Questions Section -->
        <div v-for="(question, index) in quiz.questions" :key="index" class="question-group" :class="{'error': !question.correctAnswer}">
          <h2>Question {{ index + 1 }}</h2>

          <!-- Question Text -->
          <div class="form-group">
            <label for="question-text">Question</label>
            <input
              id="question-text"
              v-model="question.text"
              type="text"
              placeholder="Enter question"
              required
            />
          </div>

          <!-- Answer Options -->
          <div class="answers-group">
            <h3>Answer Options</h3>
            <div v-for="(answer, aIndex) in question.answers" :key="aIndex" class="answer-option">
              <div class="form-group">
                <label :for="'answer-' + aIndex">Enter Answer</label>
                <input
                  :id="'answer-' + aIndex"
                  v-model="answer.text"
                  type="text"
                  placeholder="Enter answer"
                  required
                />
              </div>
            </div>

            <!-- Correct Answer Selection (Clickable Labels) -->
            <div class="form-group correct-answer">
              <h4>Select Correct Answer</h4>
              <div v-for="(answer, aIndex) in question.answers" :key="aIndex" class="correct-answer-option">
                <label 
                  :class="{'selected': question.correctAnswer === answer.text}" 
                  class="answer-label"
                  @click="setCorrectAnswer(question, answer)"
                >
                  {{ answer.text }}
                </label>
              </div>
            </div>
          </div>

          <!-- Add Answer and Remove Answer Buttons on the Same Line -->
          <div class="button-group">
            <button type="button" @click="addAnswer(index)" class="add-answer-btn">Add Answer</button>
            <button type="button" @click="removeAnswer(index)" class="remove-answer-btn">Remove Answer</button>
          </div>
        </div>

        <!-- Add Question and Remove Question Buttons on the Same Line -->
        <div class="button-group">
          <button type="button" @click="addQuestion" class="add-question-btn">Add Question</button>
          <button type="button" @click="removeQuestion" class="remove-question-btn">Remove Question</button>
        </div>

        <!-- Submit Quiz Button (Centered) -->
        <button type="submit" class="submit-quiz-btn">Save Quiz</button>
      </form>
    </div>
  </div>
</template>


<script>
  export default {
  data() {
    return {
      quiz: {
        title: '',
        questions: [
          {
            text: '',
            answers: [{ text: '', correct: false }],
            correctAnswer: '',
          },
        ],
      },
      errorMessage: '',
    };
  },
  methods: {
    // Method to add a new question
    addQuestion() {
      this.quiz.questions.push({
        text: '',
        answers: [{ text: '', correct: false }],
        correctAnswer: '',
      });
    },

    // Method to remove a question
    removeQuestion() {
      if (this.quiz.questions.length > 1) {
        this.quiz.questions.pop();  // Removes the last question edited
      }
    },

    // Method to add an answer to a specific question
    addAnswer(questionIndex) {
      this.quiz.questions[questionIndex].answers.push({
        text: '',
        correct: false,
      });
    },

    // Method to remove an answer from a specific question
    removeAnswer(questionIndex) {
      if (this.quiz.questions[questionIndex].answers.length > 1) {
        this.quiz.questions[questionIndex].answers.pop();
      }
    },

    // Method to set the correct answer for a question
    setCorrectAnswer(question, answer) {
      if (question.correctAnswer === answer.text) {
        question.correctAnswer = ''; // Deselect if it's already the selected one
      } else {
        question.correctAnswer = answer.text; // Set new correct answer
      }
    },  

    // Method to handle quiz submission with validation
    submitQuiz() {
      // Reset error message
      this.errorMessage = '';

      // Check if all questions have a selected correct answer
      const incompleteQuestions = this.quiz.questions.filter(
        (question) => !question.correctAnswer
      );

      if (incompleteQuestions.length > 0) {
        this.errorMessage = 'Please select a correct answer for all questions.';
        return; // Stop submission if there's a missing correct answer
      }

      

      // Save the quiz to localStorage (you can use JSON.stringify to convert the object to a string)
      const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
      const quizId = Date.now(); // Generate a unique ID for each quiz using the current timestamp
      this.quiz.id = quizId;
      
      quizzes.push(this.quiz);
      localStorage.setItem('quizzes', JSON.stringify(quizzes));  // Save to localStorage

      console.log('Quiz saved to localStorage', this.quiz);

      this.$router.push('/'); // Redirect to home page or quiz list after submission
    },
  },
};

</script>

<style scoped>

.quiz-creation-container {
  width: 800px; /* Container width */
  display: flex;
  justify-content: center;
  padding: 50px 0;
}

.quiz-creation {
  width: 800px;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #1e88e5;
  margin-bottom: 30px;
}

h2 {
  font-size: 1.5rem;
  color: #333;
  margin-top: 20px;
}

h3, h4 {
  font-size: 1.1rem;
  color: #555;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 0.85rem;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 12px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}

button {
  background-color: #1e88e5;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 10px;
  text-align: center;
}

button:hover {
  background-color: #1565c0;
}

.answers-group {
  margin-top: 20px;
}

.answer-option {
  width: 70%;
  background-color: #f5f5f5;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.answer-option:hover {
  background-color: #f1f1f1;
  border-radius: 5px;
}

.answer-option.selected {
  background-color: #e3f2fd; /* Ensure only the selected answer gets the highlight */
  border: 2px solid #1e88e5; /* Highlight border */
}

.answer-option label {
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 15px 30px;
  width: 100%; /* Ensure label takes the full width */
}

.correct-answer {
  margin-top: 15px;
}

.correct-answer-option {
  margin-bottom: 10px;
}

button[type="button"] {
  background-color: #1565c0;
  margin-top: 5px;
}

button[type="button"]:hover {
  background-color: #0d47a1;
}

button[type="button"]:not(:last-child) {
  margin-right: 10px;
}

input[type="text"] {
  padding: 12px;
  font-size: 0.9rem;
  color: #333;
}

button[type="submit"] {
  margin-top: 30px;
  width: 100%;
}

/* Styling for the answer options, flexbox applied for alignment */
.correct-answer-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.correct-answer-option label {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.correct-answer-option label:hover {
  background-color: #f1f1f1;
  border-radius: 5px;
}

/* .correct-answer-option label {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
} */


/* .correct-answer-option .radio-btn {
  width: 10px;
  margin-left: 10px;
  margin-right: 15px;
} */

.selected {
  border: 2px solid #1e88e5;
  background-color: #e3f2fd;
  padding: 8px;
  cursor: pointer;
}

.selected input {
  margin-right: 10px;
}

/* Add some spacing for better visual appearance */
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Align the Add Answer and Remove Answer buttons in a separate line */
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

button.add-answer-btn,
button.remove-answer-btn {
  width: 48%;
}


button.add-question-btn,
button.remove-question-btn {
  width: 50%;
}

/* Center the Submit Button */
button.submit-quiz-btn {
  width: 50%;
  margin-top: 20px;
  align-self: center; /* This centers the button horizontally */
}

label.answer-label {
  cursor: pointer;
  padding: 15px 30px;
}
  
/* Media Queries for Mobile and Tablet Devices */
@media (max-width: 768px) {
    .quiz-creation-container {
      width: 100%; /* Take full width on smaller screens */
      padding: 30px 0;
    }
  
    .quiz-creation {
      width: 100%; /* Ensure form takes up full width */
      padding: 20px;
    }
  
    h1 {
      font-size: 1.8rem;
    }
  
    h2 {
      font-size: 1.3rem;
    }
  
    h3, h4 {
      font-size: 1rem;
    }
  
    label {
      font-size: 0.75rem;
    }
  
    input {
      font-size: 0.9rem;
    }
  
    button {
      padding: 10px 15px;
      font-size: 0.9rem;
    }
  
    /* Adjust form layout for smaller screens */
    .form-group {
      margin-bottom: 10px;
    }
  
    .answer-option {
      width: 100%; /* Take full width */
      padding: 10px;
    }
  
    .button-group {
      flex-direction: column; /* Stack buttons vertically */
      gap: 10px;
    }
  
    button.add-answer-btn,
    button.remove-answer-btn,
    button.add-question-btn,
    button.remove-question-btn {
      width: 100%; /* Full width for buttons */
    }
  
    button.submit-quiz-btn {
      width: 100%; /* Full width for submit button */
    }
  }
  
  /* For very small screens (smartphones) */
  @media (max-width: 480px) {
  .quiz-creation {
    padding: 15px;
  }

  h1 {
    font-size: 1.6rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3, h4 {
    font-size: 0.9rem;
  }

  label {
    font-size: 0.7rem;
  }

  input {
    font-size: 0.85rem;
  }

  button {
    padding: 8px 12px;
    font-size: 0.85rem;
  }

  .answer-option {
    width: 100%;
    padding: 7px;
  }

  /* Center buttons and stack them vertically */
  .button-group {
    display: flex;
    flex-direction: column; /* Stack buttons vertically */
   /* Center buttons horizontally */
    align-items: center;
    width: 100%; /* Ensure the buttons take up full width for mobile screens */
  }

  /* Ensure individual buttons inside button-group are centered and take up full width */
  button.add-answer-btn,
  button.remove-answer-btn,
  button.add-question-btn,
  button.remove-question-btn,
  button.submit-quiz-btn {
    width: 100%; /* Allow buttons to resize */
    margin: 0 auto; /* Center the buttons horizontally */
  }
}
</style>