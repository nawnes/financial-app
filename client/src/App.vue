<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/add-transaction">Add Transaction</router-link>
      <button v-if="isAuthenticated" @click="logout">Logout</button>
      <router-link v-else to="/login">Login</router-link>
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
nav {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: #333;
  color: white;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 10px;
}

nav a:hover {
  text-decoration: underline;
}

nav button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

nav button:hover {
  text-decoration: underline;
}
</style>
