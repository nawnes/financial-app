<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div class="input-group">
          <label for="firstName">First Name</label>
          <input v-model="firstName" id="firstName" required placeholder="Type your first name">
          <div v-if="errors.firstName" class="error">{{ errors.firstName }}</div>
        </div>

        <div class="input-group">
          <label for="lastName">Last Name</label>
          <input v-model="lastName" id="lastName" required placeholder="Type your last name">
          <div v-if="errors.lastName" class="error">{{ errors.lastName }}</div>
        </div>

        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" required placeholder="Type your email">
          <div v-if="errors.email" class="error">{{ errors.email }}</div>
        </div>

        <div class="input-group">
          <label for="username">Username</label>
          <input v-model="username" id="username" required placeholder="Type your username">
          <div v-if="errors.username" class="error">{{ errors.username }}</div>
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" required placeholder="Type your password">
          <div v-if="errors.password" class="error">{{ errors.password }}</div>
        </div>

        <div class="input-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" v-model="confirmPassword" id="confirmPassword" required placeholder="Confirm your password">
          <div v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</div>
        </div>

        <div class="actions">
          <button type="submit" class="btn">SIGN UP</button>
        </div>
      </form>
      <div class="login-link">
        <p>Already have an account?</p>
        <button type="button" class="btn" @click="goToLogin">LOGIN</button>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">{{ success }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      errors: {},
      error: null,
      success: null
    };
  },
  watch: {
    firstName(value) {
      this.errors.firstName = !value ? 'First Name is required' : '';
    },
    lastName(value) {
      this.errors.lastName = !value ? 'Last Name is required' : '';
    },
    email(value) {
      this.errors.email = !this.validateEmail(value) ? 'Please enter a valid email address' : '';
    },
    username(value) {
      this.errors.username = !value ? 'Username is required' : '';
    },
    password(value) {
      this.errors.password = value.length < 8 ? 'Password must be at least 8 characters long' : '';
      this.errors.confirmPassword = this.password !== this.confirmPassword ? 'Passwords do not match' : '';
    },
    confirmPassword(value) {
      this.errors.confirmPassword = this.password !== value ? 'Passwords do not match' : '';
    }
  },
  methods: {
    validateEmail(email) {
      const re = /^\S+@\S+\.\S+$/;
      return re.test(email);
    },
    async register() {
      this.error = null;
      this.success = null;

      // Check if there are any validation errors
      if (Object.values(this.errors).some(error => error)) {
        this.error = 'Please fix the errors before submitting';
        return;
      }

      try {
        await axios.post('http://localhost:3000/api/auth/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          username: this.username,
          password: this.password,
          confirmPassword: this.confirmPassword,
        });
        this.success = "Registration successful! Redirecting to login...";
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
      } catch (error) {
        this.error = error.response.data || "Registration failed. Please try again.";
      }
    },
    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
body {
  font-family: 'Open Sans', sans-serif;
}

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* background: linear-gradient(135deg, #6e8efb, #a777e3); */
}

.register-box {
  background: #fff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.actions .btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: #bd93cf;
  color: #fff;
  cursor: pointer;
}

.actions .btn:hover {
  background: #bd93cf;
}

.login-link {
  margin-top: 20px;
}

.login-link p {
  margin-bottom: 10px;
  color: #666;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
