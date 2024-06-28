<template>
  <div id="app">
    <nav>
      <div class="logo-container">
        <img src="@/assets/logo-projet.png" alt="Logo" class="logo">
      </div>
      <div class="nav-items montserrat-font">
        <router-link to="/about">About</router-link>
        <router-link v-if="isAuthenticated" to="/">Home</router-link>
        <router-link v-if="isAuthenticated" to="/add-transaction">Add Transaction</router-link>
        <router-link v-if="isAuthenticated" to="/profile">Profile</router-link>
        <router-link v-if="isAuthenticated" to="/about">About</router-link>
        <button v-if="isAuthenticated" @click="logout">Logout</button>
        <router-link v-else to="/login">Login</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
      location.reload();
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

body {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  background-image: url('assets/gradient_1.jpg');
  background-size: cover; 
  background-repeat: no-repeat; 
  background-attachment: fixed; 
}

.nav-items {
  display: flex;
  margin-left: auto;
  align-items: center;
}

.montserrat-font {
  font-family: 'Montserrat', sans-serif;
}

nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  background: #333;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 20px;
  font-family: 'Montserrat', sans-serif;
}

nav a:hover {
  color : #000000;
}

nav button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-right: 20px;
  font-size: 14px;
}

nav button:hover {
  color : #000000;
}

.logo-container {
  margin-right: 20px;
}

.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
