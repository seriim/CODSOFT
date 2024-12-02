<template>
  <div class="register-page">
    <h1>Create an Account</h1>
    <form @submit.prevent="registerUser">
      <input
        type="email"
        v-model="email"
        placeholder="Enter a valid email"
        required
        :class="{'input-error': emailError}"
        @blur="validateEmail"
      />
      <span v-if="emailError" class="error-message">{{ emailError }}</span>

      <input
        type="password"
        v-model="password"
        placeholder="Enter a password (min. 8 characters)"
        required
        :class="{'input-error': passwordError}"
        @blur="validatePassword"
      />
      <span v-if="passwordError" class="error-message">{{ passwordError }}</span>

      <button type="submit" :disabled="emailError || passwordError || !email || !password">
        Register
      </button>
    </form>
    <p>
      Already have an account? <router-link to="/login">Login here</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      existingUsers: ['test@example.com', 'user1@example.com'], // Simulating existing users
      registrationError: '', // Error message for duplicate email
    };
  },
  methods: {
    validateEmail() {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      this.emailError = regex.test(this.email) ? '' : 'Please enter a valid email address.';
    },
    validatePassword() {
      this.passwordError = this.password.length >= 8 ? '' : 'Password must be at least 8 characters.';
    },
    registerUser() {
      if (this.emailError || this.passwordError) {
        return;
      }

      // Check if the email is already in use (simulate API call)
      if (this.existingUsers.includes(this.email)) {
        this.registrationError = 'This email is already registered. Please use a different email.';
        return; // Don't proceed with registration if email exists
      } else {
        this.registrationError = ''; // Clear error if email is unique
      }

      // Simulate registration logic (e.g., API call)
      console.log('Registering with', this.email, this.password);

      // Save login state after successful registration
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', this.email);

      // Add the new user to the "existing users" list (simulate saving to DB)
      this.existingUsers.push(this.email);

      // Redirect to login page after registration
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.register-page {
    width: 800px; /* Ensure it never exceeds the viewport width */
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
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center-align form elements */
  }
  
  input {
    width: 40%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    box-sizing: border-box;
  }
  
  input.input-error {
    border: 1px solid red;
  }
  
  button {
    background-color: #1e88e5;
    color: white;
    padding: 12px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
    margin-top: 10px;
    width: 40%;
    text-align: center;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #1565c0;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .error-message {
    color: red;
    font-size: 0.9rem;
    text-align: center;
  }
  
  p {
    text-align: center;
    font-size: 0.9rem;
    margin-top: 20px;
  }
  
  /* For registration-specific error */
  .registration-error {
    color: red;
    font-size: 1rem;
    margin-top: 20px;
  }
  
  /* Media Queries for Responsiveness */
  
  /* Tablet and Mobile Devices */
  @media (max-width: 768px) {
    .register-page {
      width: 100%; /* Full width for small screens */
      padding: 40px 20px;
    }
  
    h1 {
      font-size: 2.4rem;
    }
  
    input {
      width: 80%; /* Make inputs take up more space on smaller screens */
    }
  
    button {
      width: 80%; /* Make buttons take up more space on small screens */
    }
  
    .error-message,
    .registration-error {
      font-size: 0.8rem;
    }
  }
  
  @media (max-width: 480px) {
    .register-page {
      padding: 30px 15px; /* Further adjust padding for very small screens */
    }
  
    h1 {
      font-size: 1.8rem;
    }
  
    input {
      width: 90%; /* Make inputs almost full width */
    }
  
    button {
      width: 90%; /* Make buttons almost full width */
    }
  }
  
</style>
