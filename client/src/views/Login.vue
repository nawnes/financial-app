<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="username">Username</label>
          <input v-model="username" id="username" required placeholder="Type your username">
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" required placeholder="Type your password">
        </div>

        <div class="actions">
          <button type="submit" class="btn">LOGIN</button>
          <a href="#" class="forgot-password">Forgot password?</a>
        </div>
        <div class="social-login">
          <p>Or Sign Up Using</p>
          <div class="social-buttons">
            <button class="social-btn fb">f</button>
            <button class="social-btn tw">t</button>
            <button class="social-btn google">g</button>
          </div>
        </div>
        <div class="signup-link">
          <p>Or Sign Up Using</p>
          <button type="button" class="btn" @click="goToRegister">SIGN UP</button>
        </div>
      </form>
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
    async login() {
      this.error = null;
      this.success = null;
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem('token', response.data.token);
        this.success = "Login successful!";
        this.$router.push('/');
      } catch (error) {
        this.error = error.response.data;
      }
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
body {
  font-family: 'Open Sans', sans-serif;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
}

.login-box {
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
  justify-content: space-between;
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

.actions .forgot-password {
  color: #666;
  text-decoration: none;
}

.social-login {
  margin-top: 20px;
}

.social-login p {
  margin-bottom: 10px;
  color: #666;
}

.social-buttons {
  display: flex;
  justify-content: center;
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 5px;
  border: none;
  color: #fff;
  cursor: pointer;
}

.social-btn.fb {
  background: #3b5998;
}

.social-btn.tw {
  background: #1da1f2;
}

.social-btn.google {
  background: #db4437;
}

.signup-link {
  margin-top: 20px;
}

.signup-link p {
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
