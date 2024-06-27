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
  background-image: url('assets/gradient_1.jpg'); /* Chemin vers l'image d'arrière-plan */
  background-size: cover; /* Couvrir l'ensemble de la page */
  background-repeat: no-repeat; /* Ne pas répéter l'image */
  background-attachment: fixed; /* Image d'arrière-plan fixe */
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
  margin-right: 20px; /* Adjust the margin as needed */
  font-size: 14px; /* the size is applicated on Logout*/
}

nav button:hover {
  color : #000000;
}
</style>