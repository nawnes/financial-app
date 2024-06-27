<template>
  <div>
    <h1>Add Transaction</h1>
    <form @submit.prevent="submitTransaction">
      <label for="type">Type:</label>
      <select v-model="type" id="type" required>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <label for="amount">Amount:</label>
      <input type="number" v-model="amount" id="amount" required>

      <label for="category">Category:</label>
      <input type="text" v-model="category" id="category" required>

      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      type: '',
      amount: 0,
      category: '',
    };
  },
  methods: {
    async submitTransaction() {
      const newTransaction = {
        type: this.type,
        amount: this.amount,
        category: this.category,
      };
      try {
        await axios.post('http://localhost:3000/api/transactions', newTransaction);
        this.$router.push('/');
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
/* Ajoutez des styles selon vos besoins */
</style>
