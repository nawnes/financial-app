<template>
  <div id="app">
    <nav>
      <div class="nav-items montserrat-font">
        <router-link to="/">Home</router-link>
        <router-link to="/add-transaction">Add Transaction</router-link>
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

#app {
  min-height: 100vh;
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
  padding: 20px;
  background: #212f49;
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  height: 30px;
  z-index: 1000;
  font-size: 14px;
}

  

nav a {
  color: white;
  text-decoration: none;
  margin-right: 20px; /* Adjust the margin as needed */
  font-family: 'Montserrat', sans-serif;
  
}

nav a:hover {
  color : #52b0a1;
}

nav button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-right: 20px; /* Adjust the margin as needed */
  font-family: 'Montserrat', sans-serif;
  font-size: 14px; /* the size is applicated on Logout*/
}

nav button:hover {
  color : #52b0a1;
}

.router-view-container {
  margin-top: 80px;
}
</style>