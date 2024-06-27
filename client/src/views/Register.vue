<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div class="input-group">
          <label for="username">Username</label>
          <input v-model="username" id="username" required placeholder="Type your username">
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" required placeholder="Type your password">
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
      username: '',
      password: '',
      error: null,
      success: null
    };
  },
  methods: {
    async register() {
      this.error = null;
      this.success = null;
      try {
        await axios.post('http://localhost:3000/api/auth/register', {
          username: this.username,
          password: this.password,
        });
        this.success = "Registration successful! Redirecting to login...";
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000); // Redirige après 2 secondes
      } catch (error) {
        this.error = "Registration failed. Please try again.";
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
  background: linear-gradient(135deg, #6e8efb, #a777e3);
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
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: #fff;
  cursor: pointer;
}

.actions .btn:hover {
  background: linear-gradient(135deg, #5a77d7, #8958b4);
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
