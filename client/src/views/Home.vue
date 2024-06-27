<template>
  <div class="home-container">
    <div class="home-box">
      <balance-overview :transactions="transactions" />
      <transaction-list :transactions="transactions" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BalanceOverview from '../components/BalanceOverview.vue';
import TransactionList from '../components/TransactionList.vue';

export default {
  components: {
    BalanceOverview,
    TransactionList
  },
  data() {
    return {
      transactions: []
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/api/transactions');
      this.transactions = response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.$router.push('/login');
      } else {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Open Sans', sans-serif;
}

.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
}

.home-box {
  background: #fff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}
</style>
