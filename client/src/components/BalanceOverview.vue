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
    <div>
      <strong>Total Income:</strong> {{ convertedTotalIncome }} {{ selectedCurrency }}
    </div>
    <div>
      <strong>Total Expense:</strong> {{ convertedTotalExpense }} {{ selectedCurrency }}
    </div>
    <div>
      <strong>Net Balance:</strong> {{ convertedNetBalance }} {{ selectedCurrency }}
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

      // Create the balance bar
      svg.append('rect')
        .attr('x', width / 2 - 100)
        .attr('y', height / 2 - 5)
        .attr('width', 200)
        .attr('height', 10)
        .attr('fill', '#333');

      // Create the pivot
      svg.append('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('r', 10)
        .attr('fill', '#333');

      // Create the weights
      svg.append('circle')
        .attr('class', 'weight left')
        .attr('cx', width / 2 - 100)
        .attr('cy', height / 2 + 50)
        .attr('r', 20)
        .attr('fill', '#ffcc00');

      svg.append('circle')
        .attr('class', 'weight right')
        .attr('cx', width / 2 + 100)
        .attr('cy', height / 2 + 50)
        .attr('r', 20)
        .attr('fill', '#ffcc00');

      this.updateBalance();
    },
    updateBalance() {
      const tilt = Math.min(30, Math.abs(this.netBalance) / 100); // Adjust the divisor as needed
      const rotation = this.netBalance > 0 ? tilt : -tilt;

      d3.select(this.$refs.balanceContainer).select('svg').selectAll('.weight')
        .transition()
        .duration(1000)
        .attr('transform', `rotate(${rotation}, 200, 100)`);
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
</style>
