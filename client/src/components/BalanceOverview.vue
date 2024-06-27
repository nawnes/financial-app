<template>
  <div>
    <h2>Balance Overview</h2>
    <div class="balance-container" ref="balanceContainer"></div>
    <div>
      <label for="currency-select">Select Currency:</label>
      <select id="currency-select" v-model="selectedCurrency" @change="updateCurrency">
        <option v-for="(rate, currency) in exchangeRates" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
    </div>
    <div class="balance-summary">
      <div class="balance-box">
        <strong>Income</strong>
        <div class="amount">{{ convertedTotalIncome }} {{ selectedCurrency }}</div>
      </div>
      <div class="balance-box">
        <strong>Net Balance</strong>
        <div class="amount">{{ convertedNetBalance }} {{ selectedCurrency }}</div>
      </div>
      <div class="balance-box">
        <strong>Expense</strong>
        <div class="amount">{{ convertedTotalExpense }} {{ selectedCurrency }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as d3 from 'd3';

export default {
  name: 'BalanceOverview',
  props: {
    transactions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedCurrency: 'USD',
      exchangeRates: {},
      baseCurrency: 'USD',
      conversionRates: {}
    };
  },
  computed: {
    totalIncome() {
      return this.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    },
    totalExpense() {
      return this.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    },
    netBalance() {
      return this.totalIncome - this.totalExpense;
    },
    convertedTotalIncome() {
      return (this.totalIncome * this.conversionRates[this.selectedCurrency]).toFixed(2);
    },
    convertedTotalExpense() {
      return (this.totalExpense * this.conversionRates[this.selectedCurrency]).toFixed(2);
    },
    convertedNetBalance() {
      return (this.netBalance * this.conversionRates[this.selectedCurrency]).toFixed(2);
    }
  },
  async created() {
    await this.fetchExchangeRates();
    this.createBalance();
  },
  methods: {
    async fetchExchangeRates() {
      try {
        const response = await axios.get('https://v6.exchangerate-api.com/v6/ff81c9652bd26e2508fef927/latest/USD');
        this.exchangeRates = response.data.conversion_rates;
        this.conversionRates = { ...this.exchangeRates, USD: 1 };
      } catch (error) {
        console.error("Failed to fetch exchange rates", error);
      }
    },
    async updateCurrency() {
      if (!this.exchangeRates[this.selectedCurrency]) {
        await this.fetchExchangeRates();
      }
      this.updateBalance();
    },
    createBalance() {
      const width = 400;
      const height = 200;
      const svg = d3.select(this.$refs.balanceContainer)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      // Create the balance group
      const balanceGroup = svg.append('g')
        .attr('class', 'balance-group')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      // Create the balance bar
      balanceGroup.append('rect')
        .attr('x', -100)
        .attr('y', -5)
        .attr('width', 200)
        .attr('height', 10)
        .attr('fill', '#333');

      // Create the pivot
      balanceGroup.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 10)
        .attr('fill', '#333');

      // Create the weights
      balanceGroup.append('path')
        .attr('class', 'weight left')
        .attr('d', 'M-120,0 A20,20 0 1,0 -80,0 Z')
        .attr('fill', '#7dead1');

      balanceGroup.append('path')
        .attr('class', 'weight right')
        .attr('d', 'M80,0 A20,20 0 1,0 120,0 Z')
        .attr('fill', '#7dead1');

      this.updateBalance();
    },
    updateBalance() {
      const tilt = Math.min(30, Math.abs(this.netBalance) / 100); // Adjust the divisor as needed
      const rotation = this.netBalance > 0 ? -tilt : tilt;

      d3.select(this.$refs.balanceContainer).select('svg').select('.balance-group')
        .transition()
        .duration(1000)
        .attr('transform', `translate(200, 100) rotate(${rotation})`);
    }
  }
};
</script>

<style scoped>
.balance-container {
  position: relative;
  height: 200px;
  margin-bottom: 20px;
}

.balance-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  gap: 20px; /* Add space between the boxes */
}

.balance-box {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 20px;
  width: 30%;
  text-align: center;
}

.amount {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-top: 5px;
}

strong {
  font-size: 18px;
  color: #333;
}

div {
  font-size: 16px;
  color: #333;
}
</style>
