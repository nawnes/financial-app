<template>
  <div class="router-view-container">
    <div class="home-container">
      <div class="home-box">
        <h2>About Our Project</h2>
        <p>Welcome to our Budget Management Application!</p>
        <p>This application is designed to help you manage your finances efficiently and effectively.</p>
        <p>With our application, you can:</p>
        <ul>
          <li>Track your income and expenses</li>
          <li>Visualize your spending habits with detailed charts</li>
          <li>Create and manage multiple transactions</li>
          <li>Set financial goals and monitor your progress</li>
          <li>Securely manage your data with user authentication</li>
        </ul>
        <p>We hope this application helps you achieve better financial control and reach your financial goals. Thank you for choosing our Budget Management Application!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
};
</script>

<style scoped>
body {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
}

.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.home-box {
  position: relative;
  margin-top: 35px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 40px;
  width: 75%;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: black;
}

p {
  font-size: 18px;
  color: rgb(32, 32, 32);
  margin-bottom: 20px;
  font-weight: 500;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
  text-align: left;
  margin: 0 auto;
  max-width: 600px;
}

li {
  font-size: 18px;
  color: rgb(32, 32, 32);
  margin-bottom: 10px;
  font-weight: 500;
  list-style-type : none;
}
</style>
