<template>
  <div class="charts-container">
    <div class="chart-box">
      <h2>Expenses Distribution</h2>
      <div v-if="expensesData && expensesData.length">
        <pie-chart :chartData="expensesData" />
      </div>
      <div v-else>
        <p>No expenses data available.</p>
      </div>
    </div>
    <div class="chart-box">
      <h2>Income Distribution</h2>
      <div v-if="incomeData && incomeData.length">
        <pie-chart :chartData="incomeData" />
      </div>
      <div v-else>
        <p>No income data available.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PieChart from '../components/PieChart.vue';

export default {
  components: {
    PieChart
  },
  data() {
    return {
      expensesData: [],
      incomeData: []
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/api/transactions');
      console.log("Transactions fetched:", response.data);
      const transactions = response.data;
      this.expensesData = this.getChartData(transactions, 'expense');
      this.incomeData = this.getChartData(transactions, 'income');
      console.log("Expenses Data:", this.expensesData);
      console.log("Income Data:", this.incomeData);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
      this.expensesData = [];
      this.incomeData = [];
    }
  },
  methods: {
    getChartData(transactions, type) {
      const filtered = transactions.filter(t => t.type === type && t.amount > 0 && t.category);
      const categories = [...new Set(filtered.map(t => t.category))];
      const data = categories.map(category => ({
        value: filtered.filter(t => t.category === category).reduce((sum, t) => sum + t.amount, 0),
        name: category
      }));
      console.log(`Filtered ${type} Data:`, filtered);
      console.log(`${type} Categories:`, categories);
      console.log(`${type} Data:`, data);
      return data;
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Open Sans', sans-serif;
}

.charts-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
}

.chart-box {
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
</style>
