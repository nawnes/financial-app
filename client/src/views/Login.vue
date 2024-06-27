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
        </div>
      </form>
      <div class="register-link">
        <p>Don't have an account?</p>
        <button type="button" class="btn" @click="goToRegister">REGISTER</button>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
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
      error: null
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          username: this.username,
          password: this.password,
        });
        const { token, firstName } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('firstName', firstName);
        this.$router.push('/');
      } catch (error) {
        this.error = error.response.data || "Login failed. Please try again.";
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
  /* background: linear-gradient(135deg, #6e8efb, #a777e3); */
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

.register-link {
  margin-top: 20px;
}

.register-link .btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background: #bd93cf;
  color: #fff;
  cursor: pointer;
}

.register-link .btn:hover {
  background: #bd93cf;
}
.register-link p {
  margin-bottom: 10px;
  color: #666;
}

.error {
  color: red;
}
</style>
