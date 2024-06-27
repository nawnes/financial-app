<template>
  <div>
    <h2>Balance Overview</h2>
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
    }
  }
};
</script>

<style scoped>
div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

select {
  margin-bottom: 10px;
  padding: 5px;
  font-size: 16px;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> a0472b4150d99661a747c49d7a2b679968bc27de
