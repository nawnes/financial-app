<template>
  <div class="router-view-container">
    <div class="home-container">
      <div class="home-box">
        <h2>Welcome, {{ firstName }}!</h2>
        <balance-overview :transactions="transactions" />
        <div class="charts-container">
          <div class="chart-box">
            <h2>Expenses Distribution</h2>
            <div v-if="expensesData && expensesData.labels && expensesData.labels.length">
              <pie-chart :chartData="expensesData" />
            </div>
            <div v-else>
              <p>No expenses data available.</p>
            </div>
          </div>
          <div class="chart-box">
            <h2>Income Distribution</h2>
            <div v-if="incomeData && incomeData.labels && incomeData.labels.length">
              <pie-chart :chartData="incomeData" />
            </div>
            <div v-else>
              <p>No income data available.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BalanceOverview from '../components/BalanceOverview.vue';
import PieChart from '../components/PieChart.vue';

export default {
  components: {
    BalanceOverview,
    PieChart
  },
  data() {
    return {
      transactions: [],
      expensesData: null,
      incomeData: null,
      firstName: localStorage.getItem('firstName') || 'Guest'
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/api/transactions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("Transactions fetched:", response.data);
      const transactions = response.data;
      this.transactions = transactions;
      this.expensesData = this.getChartData(transactions, 'expense');
      this.incomeData = this.getChartData(transactions, 'income');
      console.log("Expenses Data:", this.expensesData);
      console.log("Income Data:", this.incomeData);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
      this.expensesData = { labels: [], datasets: [] };
      this.incomeData = { labels: [], datasets: [] };
    }
  },
  methods: {
    getChartData(transactions, type) {
      const filtered = transactions.filter(t => t.type === type && t.amount > 0 && t.category);
      const categories = [...new Set(filtered.map(t => t.category))];
      const data = categories.map(category => {
        return filtered.filter(t => t.category === category).reduce((sum, t) => sum + t.amount, 0);
      });
      return {
        labels: categories,
        datasets: [
          {
            data: data,
            backgroundColor: categories.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`)
          }
        ]
      };
    }
  }
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
  /* background: linear-gradient(135deg, #6e8efb, #a777e3); */
}

.home-box {
  position : relative;
  margin-top : 35px;
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

.charts-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}

.chart-box {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 45%;
  text-align: center;
}

h2 {
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
}
</style>
